import { randomBytes } from 'crypto';
import { google } from 'googleapis';
import { NextResponse } from 'next/server';

const oauth2Client = new google.auth.OAuth2(
    process.env.GOOGLE_CLIENT_ID!,
    process.env.GOOGLE_CLIENT_SECRET!,
    process.env.GOOGLE_REDIRECT_URI!
);

const scopes = [
    'https://www.googleapis.com/auth/youtube.readonly',
    'https://www.googleapis.com/auth/youtubepartner'
];

export async function GET() {

    try {
        const state = randomBytes(32).toString('hex');

        // Generate the OAuth2 authorization URL
        const authorizationUrl = oauth2Client.generateAuthUrl({
            access_type: 'offline',
            scope: scopes,
            include_granted_scopes: true,
            state: state,
        });

        // Set the state in the cookies for later verification
        const response = NextResponse.redirect(authorizationUrl);
        response.cookies.set('oauth_state', state, { httpOnly: true, secure: true, maxAge: 600 });

        return response;

    } catch (error) {
        console.error('Error generating authorization URL:', error);
        return NextResponse.json({ error: 'Failed to generate authorization URL' }, { status: 500 });
    }

}
