import 'server-only'

import { google } from "googleapis";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createSessionClient } from "./appwrite";

const oauth2Client = new google.auth.OAuth2(
    process.env.GOOGLE_CLIENT_ID!,
    process.env.GOOGLE_CLIENT_SECRET!,
    process.env.GOOGLE_REDIRECT_URI!
);

export async function refreshAccessTokenAndUpdateDB(refreshToken: string, docId: string) {

    try {

        oauth2Client.setCredentials({ refresh_token: refreshToken });
        const { credentials } = await oauth2Client.refreshAccessToken();
        const accessToken = credentials.access_token!;
        const expiresAt = (credentials.expiry_date ?? Date.now()).toString();

        const sessionClient = await createSessionClient();

        if (!sessionClient) {
            console.error("Session client could not be created.");
            redirect('/signin');
        }

        const { databases } = sessionClient;

        // Update Appwrite with new access token and expiration date
        const response = await databases.updateDocument(
            process.env.APPWRITE_DATABASE_ID!,
            process.env.APPWRITE_COLLECTION_YOUTUBE_ID!,
            docId,
            { accessToken, expiresAt }
        );

        revalidatePath('/welcome')
        return { success: true, response: response }

    } catch (error) {
        console.log(error);
        return { success: false }
    }
}

export async function getPlaylists(accessToken: string) {

    oauth2Client.setCredentials({ access_token: accessToken });
    const youtube = google.youtube({ version: 'v3', auth: oauth2Client });

    const playlistsResponse = await youtube.playlists.list({
        part: ['snippet', 'contentDetails'],
        mine: true,
        maxResults: 50,
    });

    const playlists = playlistsResponse.data.items;

    return playlists
}

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