import 'server-only'
import { google } from 'googleapis';
import { TokenEncryption } from '@/utils/encription';
import { deleteAccessTokenInDatabase, updateAccessTokenInDatabase } from '@/actions/user.actions';

const oauth2Client = new google.auth.OAuth2(
    process.env.GOOGLE_CLIENT_ID!,
    process.env.GOOGLE_CLIENT_SECRET!,
    process.env.GOOGLE_REDIRECT_URI!
);

const tokenEncryption = new TokenEncryption(process.env.ENCRYPTION_KEY!);

export async function getUserChannelInfo(accessToken: string) {

    oauth2Client.setCredentials({ access_token: accessToken });
    const youtube = google.youtube({ version: 'v3', auth: oauth2Client });

    const channelInfo = await youtube.channels.list({
        part: ['snippet', 'contentDetails', 'status'],
        mine: true,
    });

    if (channelInfo.data.items && channelInfo.data.items.length > 0) {
        const channel = channelInfo.data.items[0];
        const userInfo = {
            title: channel.snippet?.title,
            channelId: channel.id,
            customUrl: channel.snippet?.customUrl,
            imageUrl: channel.snippet?.thumbnails?.default?.url,
        };

        return userInfo;
    } else {
        return null
    }

}

export async function refreshAccessToken(refreshToken: string, userYouTubeInfoId: string, session?: string) {

    try {
        // Set OAuth2 client credentials using the provided refresh token
        oauth2Client.setCredentials({ refresh_token: refreshToken });

        // Refresh the access token
        const { credentials } = await oauth2Client.refreshAccessToken();
        const newAccessToken = credentials.access_token;
        const expiryDate = credentials.expiry_date || Date.now();

        if (!newAccessToken) {
            throw new Error("Failed to obtain a new access token.");
        }

        // Encrypt the new access token
        const encryptedNewAccessToken = tokenEncryption.encrypt(newAccessToken);
        const expiresAt = expiryDate.toString();

        // Update the encrypted access token and expiration date in the database
        await updateAccessTokenInDatabase(userYouTubeInfoId, encryptedNewAccessToken, expiresAt, session);

        return {
            success: true,
            credentials,
        };

    } catch (error: any) {

        console.error("Error refreshing token:", error);

        if (error?.response?.data?.error === 'invalid_grant') {
            await deleteAccessTokenInDatabase(userYouTubeInfoId, session)
        }

        return {
            success: false,
            credentials: null,
            error: 'Failed to refresh access token or add to playlist',
            code: 'TOKEN_REFRESH_OR_PLAYLIST_ADD_FAILED',
        };
    }
}

export async function addToPlaylist(accessToken: string, videoId: string) {

    try {
        // Set OAuth2 credentials
        oauth2Client.setCredentials({ access_token: accessToken });
        const youtube = google.youtube({ version: 'v3', auth: oauth2Client });

        // Fetch the user's playlists, up to 50 results
        const playlistsResponse = await youtube.playlists.list({
            part: ['snippet', 'contentDetails'],
            mine: true,
            maxResults: 50,
        });

        const playlists = playlistsResponse.data.items;

        // Ensure playlists were retrieved successfully
        if (!playlists || playlists.length === 0) {
            throw new Error('Failed to retrieve playlists');
        }

        // Generate the title for the monthly playlist based on the current month and year
        const month = new Date().toLocaleString('default', { month: 'long', year: 'numeric' });
        let monthlyPlaylist = playlists.find((playlist) => playlist.snippet?.title === month);

        // Create a new playlist if the monthly playlist doesn't exist
        if (!monthlyPlaylist) {
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

            // Ensure new playlist was created
            if (!monthlyPlaylist || !monthlyPlaylist.id) {
                throw new Error('Failed to create monthly playlist');
            }
        }

        // Add the video to the monthly playlist
        const response = await youtube.playlistItems.insert({
            part: ['snippet'],
            requestBody: {
                snippet: {
                    playlistId: monthlyPlaylist.id,
                    resourceId: {
                        kind: 'youtube#video',
                        videoId,
                    },
                },
            },
        });

        // Retrieve and format video information for the response
        const videoInfo = {
            title: response.data.snippet?.title || 'No title available',
            thumbnail: response.data.snippet?.thumbnails?.medium,
            videoOwnerChannelTitle: response.data.snippet?.videoOwnerChannelTitle || 'Unknown channel',
            videoOwnerChannelId: response.data.snippet?.videoOwnerChannelId || 'Unknown channel ID',
        };

        return {
            success: true,
            videoInfo,
            addedToPlaylist: monthlyPlaylist.snippet?.title || 'Untitled Playlist',
        };

    } catch (error) {
        console.error("Error adding video to playlist:", error);
        return {
            success: false,
            error: error instanceof Error ? error.message : 'An unknown error occurred',
        };
    }
}
