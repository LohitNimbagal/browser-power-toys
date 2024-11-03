import { TokenEncryption } from '@/utils/encription';
import { getUserChannelInfo } from '@/server/youtube';
import { google } from 'googleapis';
import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';
import { Account, Client, Databases, ID, Query } from 'node-appwrite';

export const dynamic = 'force-dynamic'

// Initialize OAuth2 client
const oauth2Client = new google.auth.OAuth2(
    process.env.GOOGLE_CLIENT_ID!,
    process.env.GOOGLE_CLIENT_SECRET!,
    process.env.GOOGLE_REDIRECT_URI!
);

const baseUrl = process.env.BASE_URL || 'http://localhost:3000';
const tokenEncryption = new TokenEncryption(process.env.ENCRYPTION_KEY!)

export async function GET(request: NextRequest) {
    
    try {
        // Validate OAuth state and session
        const storedState = cookies().get('oauth_state')?.value;
        const session = cookies().get('bpt-session')?.value;

        if (!session) {
            return NextResponse.json({ error: "No authenticated user session" }, { status: 401 });
        }

        // Parse and validate request parameters
        const { searchParams } = new URL(request.url);
        const code = searchParams.get('code');
        const state = searchParams.get('state');

        if (!state || state !== storedState) {
            return NextResponse.json({ error: 'Invalid OAuth state' }, { status: 400 });
        }

        if (!code) {
            return NextResponse.json({ error: 'Authorization code required' }, { status: 400 });
        }

        // Exchange code for tokens
        const { tokens } = await oauth2Client.getToken(code);

        if (!tokens.access_token || !tokens.refresh_token) {
            throw new Error('Invalid token response');
        }

        // Get user channel information
        const userChannelInfo = await getUserChannelInfo(tokens.access_token);

        if (!userChannelInfo) {
            throw new Error('Failed to fetch channel information');
        }

        // Initialize Appwrite client
        const client = new Client()
            .setEndpoint(process.env.APPWRITE_ENDPOINT_ID!)
            .setProject(process.env.APPWRITE_PROJECT_ID!)
            .setSession(session);

        const account = new Account(client);
        const databases = new Databases(client);

        // Get current user
        const user = await account.get();

        // Encrypt tokens
        const encryptedAccessToken = tokenEncryption.encrypt(tokens.access_token);
        const encryptedRefreshToken = tokenEncryption.encrypt(tokens.refresh_token);

        // Check for existing tokens
        const userYoutubeTokens = await databases.listDocuments(
            process.env.APPWRITE_DATABASE_ID!,
            process.env.APPWRITE_COLLECTION_YOUTUBE_ID!,
            [Query.equal("userId", user.$id)]
        );

        // Prepare response
        const response = NextResponse.redirect(`${baseUrl}/console`);
        response.cookies.delete('oauth_state');

        if (userYoutubeTokens.total === 0) {
            // Create new token document
            await databases.createDocument(
                process.env.APPWRITE_DATABASE_ID!,
                process.env.APPWRITE_COLLECTION_YOUTUBE_ID!,
                ID.unique(),
                {
                    userId: user.$id,
                    accessToken: encryptedAccessToken,
                    refreshToken: encryptedRefreshToken,
                    expiresAt: tokens.expiry_date?.toString(),
                    channelTitle: userChannelInfo.title,
                    channelId: userChannelInfo.channelId,
                    customUrl: userChannelInfo.customUrl,
                    imageUrl: userChannelInfo.imageUrl,
                }
            );
        } else {
            // Update existing token document
            await databases.updateDocument(
                process.env.APPWRITE_DATABASE_ID!,
                process.env.APPWRITE_COLLECTION_YOUTUBE_ID!,
                userYoutubeTokens.documents[0].$id,
                {
                    accessToken: encryptedAccessToken,
                    refreshToken: encryptedRefreshToken,  // Fixed typo in property name
                    expiresAt: tokens.expiry_date?.toString(),  // Ensure consistent string format
                }
            );
        }

        return response;

    } catch (error) {
        console.error('OAuth handler error:', error);
        return NextResponse.json(
            { error: 'Authentication failed', details: error instanceof Error ? error.message : 'Unknown error' },
            { status: 500 }
        );
    }
}