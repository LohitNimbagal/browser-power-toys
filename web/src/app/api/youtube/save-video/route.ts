import { google } from 'googleapis';
import { NextRequest, NextResponse } from 'next/server';
import { Account, Client, Databases, Query } from 'node-appwrite';

const oauth2Client = new google.auth.OAuth2(
    process.env.GOOGLE_CLIENT_ID!,
    process.env.GOOGLE_CLIENT_SECRET!,
    process.env.GOOGLE_REDIRECT_URI!
);

async function addToPlaylist(accessToken: string, videoId: string) {

    oauth2Client.setCredentials({ access_token: accessToken });
    const youtube = google.youtube({ version: 'v3', auth: oauth2Client });

    const playlistsResponse = await youtube.playlists.list({
        part: ['snippet', 'contentDetails'],
        mine: true,
        maxResults: 50,
    });

    const playlists = playlistsResponse.data.items;

    if (!playlists) {
        return NextResponse.json({ error: 'Failed to get Playlists' }, { status: 500 });
    }

    const month = new Date().toLocaleString('default', { month: 'long', year: 'numeric' });
    let monthlyPlaylist = playlists.find((playlist) => playlist.snippet?.title === month);

    if (!monthlyPlaylist) {
        // Create a new playlist for the current month if it doesn't exist
        const newPlaylistResponse = await youtube.playlists.insert({
            part: ['snippet', 'status'],
            requestBody: {
                snippet: {
                    title: month,
                    description: `Playlist for ${month}`,
                },
                status: {
                    privacyStatus: 'private',
                },
            },
        });
        monthlyPlaylist = newPlaylistResponse.data;

    }

    // Add the video to the monthly playlist
    const response = await youtube.playlistItems.insert({
        part: ['snippet'],
        requestBody: {
            snippet: {
                playlistId: monthlyPlaylist.id!,
                resourceId: {
                    kind: 'youtube#video',
                    videoId,
                },
            },
        },
    });

    const videoInfo = {
        title: response.data.snippet?.title,
        thumbnail: response.data.snippet?.thumbnails?.medium,
        videoOwnerChannelTitle: response.data.snippet?.videoOwnerChannelTitle,
        videoOwnerChannelId: response.data.snippet?.videoOwnerChannelId
    }

    return { videoInfo: videoInfo, addedToPlaylist: monthlyPlaylist.snippet?.title }

}

export async function POST(req: NextRequest) {

    const { videoId } = await req.json();

    if (!videoId) {
        return NextResponse.json({
            error: 'Failed to get video info',
            code: 'VIDEO_ID_MISSING'
        }, { status: 400 });
    }

    const authHeader = req.headers.get('authorization');

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return NextResponse.json({
            error: 'Authorization header missing or invalid',
            code: 'AUTH_HEADER_INVALID'
        }, { status: 401 });
    }

    const sessionFromExtension = authHeader.split(' ')[1];

    if (!sessionFromExtension) {
        console.log('No user session found');
        return NextResponse.json({
            error: 'Session token missing in authorization header',
            code: 'SESSION_TOKEN_MISSING'
        }, { status: 401 });
    }

    const client = new Client()
        .setEndpoint(process.env.APPWRITE_ENDPOINT_ID!)
        .setProject(process.env.APPWRITE_PROJECT_ID!);

    client.setSession(sessionFromExtension);

    const account = new Account(client);
    const databases = new Databases(client);

    const user = await account.get();

    if (!user) {
        console.log('No user found');
        return NextResponse.json({
            error: 'No user associated with this session',
            code: 'USER_NOT_FOUND'
        }, { status: 404 });
    }

    if (!user.labels.includes('betaUser')) {
        return NextResponse.json({
            error: 'User lacks required beta access',
            code: 'BETA_ACCESS_REQUIRED'
        }, { status: 403 });
    }

    if (!user.labels.includes('ypt')) {
        return NextResponse.json({
            error: 'User lacks required YPT authorization',
            code: 'YPT_ACCESS_REQUIRED'
        }, { status: 403 });
    }

    try {
        
        const userYoutubeTokens = await databases.listDocuments(
            process.env.APPWRITE_DATABASE_ID!,
            process.env.APPWRITE_COLLECTION_YOUTUBE_ID!,
            [Query.equal("userId", user.$id)]
        );

        if (!userYoutubeTokens.documents.length) {
            return NextResponse.json({
                error: 'No YouTube tokens found for the user',
                code: 'YOUTUBE_TOKENS_NOT_FOUND'
            }, { status: 404 });
        }

        let { accessToken, refreshToken, expiresAt } = userYoutubeTokens.documents[0];
        const isTokenExpired = Date.now() >= Number(expiresAt);

        if (isTokenExpired) {
            try {
                oauth2Client.setCredentials({ refresh_token: refreshToken });
                const { credentials } = await oauth2Client.refreshAccessToken();

                accessToken = credentials.access_token!;
                expiresAt = (credentials.expiry_date ?? Date.now()).toString();

                // Update Appwrite with the new access token and expiration date
                await databases.updateDocument(
                    process.env.APPWRITE_DATABASE_ID!,
                    process.env.APPWRITE_COLLECTION_YOUTUBE_ID!,
                    userYoutubeTokens.documents[0].$id,
                    { accessToken, expiresAt }
                );

                const savedVideoInfo = await addToPlaylist(accessToken, videoId);

                return NextResponse.json({
                    success: true,
                    savedVideoInfo: savedVideoInfo
                });

            } catch (error) {
                console.error("Error refreshing token:", error);
                return NextResponse.json({
                    error: 'Failed to refresh access token',
                    code: 'TOKEN_REFRESH_FAILED'
                }, { status: 500 });
            }
        }

        const savedVideoInfo = await addToPlaylist(accessToken, videoId);

        return NextResponse.json({
            success: true,
            savedVideoInfo: savedVideoInfo
        });

    } catch (error) {
        console.error("Error handling request:", error);

        if (error) {
            return NextResponse.json({
                error: 'Database query error or invalid input',
                code: 'DB_QUERY_FAILED'
            }, { status: 500 });
        }

        return NextResponse.json({
            error: 'An unexpected error occurred',
            code: 'UNKNOWN_ERROR'
        }, { status: 500 });
    }

}
