'use server'

import { createAdminClient } from "@/config/appwrite";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
import { Account, Client } from "node-appwrite";

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