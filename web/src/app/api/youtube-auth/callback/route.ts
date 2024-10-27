
import { getCurrentUser } from '@/actions/user.actions';
import { google } from 'googleapis';
import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';
import { Client, Databases, ID } from 'node-appwrite';

const oauth2Client = new google.auth.OAuth2(
    process.env.GOOGLE_CLIENT_ID!,
    process.env.GOOGLE_CLIENT_SECRET!,
    process.env.GOOGLE_REDIRECT_URI!
);

const baseUrl = process.env.BASE_URL || 'http://localhost:3000';

export async function GET(request: NextRequest) {

    const storedState = cookies().get('oauth_state')?.value;
    const session = cookies().get('ypt-session')?.value;

    const user = await getCurrentUser()

    const { searchParams } = new URL(request.url);
    const code = searchParams.get('code');
    const state = searchParams.get('state');

    if (!state || state !== storedState) {
        return NextResponse.json({ error: 'State mismatch' }, { status: 400 });
    }

    if (!code) {
        return NextResponse.json({ error: 'Authorization code not found' }, { status: 400 });
    }

    try {

        const { tokens } = await oauth2Client.getToken(code as string);
        oauth2Client.setCredentials(tokens);

        const redirectUrl = `${baseUrl}/`;

        const response = NextResponse.redirect(redirectUrl);

        const client = new Client()
            .setEndpoint(process.env.APPWRITE_ENDPOINT_ID!)
            .setProject(process.env.APPWRITE_PROJECT_ID!);

        if (!session) return NextResponse.json({ error: "No YPT User" }, { status: 400 })

        client.setSession(session);

        const databases = new Databases(client)

        await databases.createDocument(
            process.env.APPWRITE_DATABASE_ID!,
            process.env.APPWRITE_COLLECTION_YOUTUBE_ID!,
            ID.unique(),{
                accessToken: tokens.access_token,
                refreshToken: tokens.refresh_token,
                expiresAt: tokens.expiry_date?.toString(),
                userId: user?.$id
            }
        )

        response.cookies.delete('oauth_state');

        return response;

    } catch (error) {
        console.error('Error exchanging authorization code:', error);
        return NextResponse.json({ error: 'Failed to exchange authorization code' }, { status: 500 });
    }
}
