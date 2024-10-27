import 'server-only'

import { Client, Account, Databases } from "node-appwrite";
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

    const session = await cookies().get("ypt-session")

    if (!session) return null

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