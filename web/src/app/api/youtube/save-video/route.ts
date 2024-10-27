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

    const authHeader = req.headers.get('authorization');

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return NextResponse.json({ error: 'Failed to get authHeader' }, { status: 500 });
    }

    const sessionFromExtension = authHeader.split(' ')[1];

    if (!sessionFromExtension) {
        console.log('No access token found');
        return NextResponse.json({ error: 'Failed to get session from Extension' }, { status: 500 });
    }

    const client = new Client()
        .setEndpoint(process.env.APPWRITE_ENDPOINT_ID!)
        .setProject(process.env.APPWRITE_PROJECT_ID!);

    client.setSession(sessionFromExtension);

    const account = new Account(client)
    const databases = new Databases(client);

    const user = await account.get()

    if (!videoId) {
        return NextResponse.json({ error: 'Failed to get video info' }, { status: 500 });
    }

    try {

        const userYoutubeTokens = await databases.listDocuments(
            process.env.APPWRITE_DATABASE_ID!,
            process.env.APPWRITE_COLLECTION_YOUTUBE_ID!,
            [Query.equal("userId", user.$id)]
        );

        let { accessToken, refreshToken, expiresAt } = userYoutubeTokens.documents[0];
        const isTokenExpired = Date.now() >= Number(expiresAt);

        if (isTokenExpired) {
            try {

                oauth2Client.setCredentials({ refresh_token: refreshToken });
                const { credentials } = await oauth2Client.refreshAccessToken();
                accessToken = credentials.access_token!;
                expiresAt = (credentials.expiry_date ?? Date.now()).toString();

                // Update Appwrite with new access token and expiration date
                await databases.updateDocument(
                    process.env.APPWRITE_DATABASE_ID!,
                    process.env.APPWRITE_COLLECTION_YOUTUBE_ID!,
                    userYoutubeTokens.documents[0].$id,
                    { accessToken, expiresAt }
                );

                const savedVideoInfo = await addToPlaylist(accessToken, videoId)

                return NextResponse.json({ success: true, savedVideoInfo: savedVideoInfo })

            } catch (error) {
                console.error("Error refreshing token:", error);
                return NextResponse.json({ error: 'Failed to refresh access token' });
            }
        }

        const savedVideoInfo = await addToPlaylist(accessToken, videoId)

        return NextResponse.json({ success: true, savedVideoInfo: savedVideoInfo })

    } catch (error) {
        console.error("Error handling request:", error);
        return NextResponse.json({ error: 'An error occurred' });
    }
}
