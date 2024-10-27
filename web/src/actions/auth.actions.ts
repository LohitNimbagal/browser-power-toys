'use server'

import { createAdminClient } from "@/server/appwrite";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
import { ID } from "node-appwrite";

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

        cookies().set("ypt-session", session.secret, {
            httpOnly: true,
            sameSite: "strict",
            expires: new Date(session.expire),
            secure: true,
            path: "/",
        });

        revalidatePath('/signin')

    } catch (error: any) {
        console.log(error);
        // return {
        //     status: "error",
        //     message: error.message
        // }
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

        cookies().set("ypt-session", session.secret, {
            httpOnly: true,
            sameSite: "strict",
            secure: true,
            expires: new Date(session.expire),
            path: "/",
        });

        revalidatePath('/signup')

    } catch (error: any) {
        console.log(error);
        // return {
        //     status: 'error',
        //     message: error.message
        // }
    }
}