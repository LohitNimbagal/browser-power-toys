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