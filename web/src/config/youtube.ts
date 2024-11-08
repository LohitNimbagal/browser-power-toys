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

