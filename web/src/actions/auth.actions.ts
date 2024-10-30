'use server'

import { createAdminClient, createSessionClient } from "@/server/appwrite";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
import { ID } from "node-appwrite";
import { getCurrentUser } from "./user.actions";
import { redirect } from "next/navigation";

export async function signInWithEmail(formData: FormData) {

    const data = Object.fromEntries(formData.entries()) as {
        email: string;
        password: string;
    };

    const { email, password } = data;

    try {
        const { account } = await createAdminClient()

        const session = await account.createEmailPasswordSession(
            email,
            password
        )

        cookies().set("bpt-session", session.secret, {
            httpOnly: true,
            // sameSite: "strict",
            expires: new Date(session.expire),
            secure: true,
            path: "/",
        });

        return (
            { success: true, message: 'Sign In Successfull' }
        )

    } catch (error: any) {
        console.log(error);
        return (
            { success: false, message: error.type }
        )
    }
}

export async function signUpWithEmail(formData: FormData) {

    const data = Object.fromEntries(formData.entries()) as {
        name: string;
        email: string;
        password: string;
    };

    const { name, email, password } = data;

    try {
        const { account } = await createAdminClient();

        await account.create(ID.unique(), email, password, name);

        const session = await account.createEmailPasswordSession(email, password);

        cookies().set("bpt-session", session.secret, {
            httpOnly: true,
            sameSite: "strict",
            secure: true,
            expires: new Date(session.expire),
            path: "/",
        });

        return (
            { success: true, message: 'Sign Up Successfull' }
        )

    } catch (error: any) {
        console.log(error);
        return (
            { success: false, message: error.type }
        )
    }
}

export async function signOut() {

    await cookies().delete('bpt-session')

    redirect('/signin')

}

export async function addToWaitlist(previousState: any, formData: FormData) {

    const name = formData.get('name') as string
    const email = formData.get('email') as string

    if (!name || !email) {
        return { success: false, message: 'Name and email are required' }
    }

    const { databases } = await createAdminClient();

    try {
        await databases.createDocument(
            process.env.APPWRITE_DATABASE_ID!,
            process.env.APPWRITE_COLLECTION_WAITINGLIST_ID!,
            ID.unique(),
            { name, email }
        )

        return { success: true, message: 'Successfully added to the waitlist!' }
    } catch (error) {
        console.error('Error adding to waitlist:', error)
        return { success: false, message: 'Failed to add to waitlist. Please try again.' }
    }
}