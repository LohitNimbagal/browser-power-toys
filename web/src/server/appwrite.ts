import 'server-only'

import { Client, Account, Databases, Query } from "node-appwrite";
import { cookies } from "next/headers";
import { google } from 'googleapis';
import { redirect } from 'next/navigation';
import { revalidatePath } from 'next/cache';

export async function createAdminClient() {

    const client = new Client()
        .setEndpoint(process.env.APPWRITE_ENDPOINT_ID!)
        .setProject(process.env.APPWRITE_PROJECT_ID!)
        .setKey(process.env.APPWRITE_KEY!);

    return {
        get account() {
            return new Account(client);
        },
        get databases() {
            return new Databases(client);
        },
    };
}

export async function createSessionClient() {

    const client = new Client()
        .setEndpoint(process.env.APPWRITE_ENDPOINT_ID!)
        .setProject(process.env.APPWRITE_PROJECT_ID!);

    const session = await cookies().get("bpt-session")

    if (!session) redirect('/signin')

    client.setSession(session.value);

    return {
        get account() {
            return new Account(client);
        },
        get databases() {
            return new Databases(client);
        },
    };
}

export async function getCurrentUserYouTubeInfo(userId: string) {

    const { databases } = await createSessionClient()

    const userYouTubeInfo = await databases.listDocuments(
        process.env.APPWRITE_DATABASE_ID!,
        process.env.APPWRITE_COLLECTION_YOUTUBE_ID!,
        [Query.equal("userId", userId)]
    );

    if (userYouTubeInfo.total === 1) {
        return {
            success: true,
            userYouTubeInfo: userYouTubeInfo.documents[0]
        }
    } else return {
        success: false,
        userYouTubeInfo: null
    }

}

export async function getRequestStatus(userId: string) {

    try {
        const { databases } = await createSessionClient()

        const response = await databases.listDocuments(
            process.env.APPWRITE_DATABASE_ID!,
            process.env.APPWRITE_COLLECTION_WAITINGLIST_ID!,
            [Query.equal("userId", userId)]
        );

        if (response.total > 0) return true

        return false

    } catch (error) {
        console.log(error);
        return false
    }
}