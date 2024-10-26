
import { google } from 'googleapis';
import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';

const oauth2Client = new google.auth.OAuth2(
    process.env.GOOGLE_CLIENT_ID!,
    process.env.GOOGLE_CLIENT_SECRET!,
    process.env.GOOGLE_REDIRECT_URI!
);

const baseUrl = process.env.BASE_URL || 'http://localhost:3000';

export async function GET(request: NextRequest) {

    const storedState = cookies().get('oauth_state')?.value;

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

        response.cookies.set('accessToken', tokens.access_token as string, {
            httpOnly: true,
            secure: true,
            maxAge: 3600, // 1 hour
        });

        response.cookies.set('refreshToken', tokens.refresh_token as string, {
            httpOnly: true,
            secure: true,
            maxAge: 3600 * 24 * 30, // 30 days
        });

        response.cookies.set('expiryDate', tokens.expiry_date?.toString() as string, {
            httpOnly: true,
            secure: true,
            maxAge: 3600 * 24 * 30, // 30 days
        });

        response.cookies.delete('oauth_state');

        return response;

    } catch (error) {
        console.error('Error exchanging authorization code:', error);
        return NextResponse.json({ error: 'Failed to exchange authorization code' }, { status: 500 });
    }
}
