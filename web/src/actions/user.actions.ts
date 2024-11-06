'use server'

import { createAdminClient } from "@/server/appwrite";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { Account, Client, ID } from "node-appwrite";

export async function getCurrentUser() {

    try {
        const client = new Client()
            .setEndpoint(process.env.APPWRITE_ENDPOINT_ID!)
            .setProject(process.env.APPWRITE_PROJECT_ID!);

        const session = await cookies().get("bpt-session")

        if (!session) return null

        client.setSession(session.value);

        const account = new Account(client)

        return await account.get()

    } catch {
        return null
    }
}

export async function requestAccess() {

    const user = await getCurrentUser()

    if (!user) {
        redirect('/singin')
    }

    const { databases } = await createAdminClient();

    try {
        await databases.createDocument(
            process.env.APPWRITE_DATABASE_ID!,
            process.env.APPWRITE_COLLECTION_WAITINGLIST_ID!,
            ID.unique(),
            {
                userId: user.$id,
                name: user.name,
                email: user.email
            }
        )

        return { success: true, message: 'Successfully added to the waitlist!' }

    } catch (error) {

        console.error('Error adding to waitlist:', error)
        return { success: false, message: 'Failed to add to waitlist. Please try again.' }
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