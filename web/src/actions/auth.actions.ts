'use server'

import { ID } from "node-appwrite";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { createAdminClient, createSessionClient } from "@/config/appwrite";

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
            sameSite: "lax",
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
            sameSite: "lax",
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

    const { account } = await createSessionClient()

    await account.deleteSession(
        'current'
    );

    await cookies().delete('bpt-session')

    redirect('/signin')
}