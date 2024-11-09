'use server'

import { createAdminClient, createSessionClient } from "@/config/appwrite";
import { revalidatePath } from "next/cache";

export async function getCurrentUser(session?: string) {

    try {
        const { account } = await createSessionClient(session)

        return await account.get()

    } catch {
        return null
    }
}

export async function updateAccessTokenInDatabase(userYouTubeInfoId: string, accessToken: string, expiresAt: string, session?: string) {

    try {
        const { databases } = await createSessionClient(session);

        const updatedDocument = await databases.updateDocument(
            process.env.APPWRITE_DATABASE_ID!,
            process.env.APPWRITE_COLLECTION_YOUTUBE_ID!,
            userYouTubeInfoId,
            {
                accessToken,
                expiresAt,
            }
        );

        return {
            success: true,
            updatedDocument,
        };

    } catch (error) {
        console.error("Error updating access token in database:", error);

        return {
            success: false,
            error: error instanceof Error ? error.message : "An unknown error occurred",
        };
    }
}

export async function assignToolAccess(label: string, userId: string) {

    try {
        const { users } = await createAdminClient()

        const user = await users.get(
            userId
        );

        await users.updateLabels(
            userId,
            [...user.labels, label]
        );

        revalidatePath('/console')

    } catch (error) {

        console.error('Error updating to label:', error)
        return { success: false, message: 'Failed to assign the access' }
    }

}