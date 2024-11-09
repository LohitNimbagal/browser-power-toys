import { google } from 'googleapis';
import { addToPlaylist, refreshAccessToken } from '@/queries/youtube';
import { TokenEncryption } from '@/utils/encription';
import { createSessionClient } from '@/config/appwrite';
import { NextRequest, NextResponse } from 'next/server';
import { getCurrentUserYouTubeInfo } from '@/queries/appwrite';
import { getCurrentUser } from '@/actions/user.actions';

// Initialize OAuth2 and encryption utilities
const oauth2Client = new google.auth.OAuth2(
    process.env.GOOGLE_CLIENT_ID!,
    process.env.GOOGLE_CLIENT_SECRET!,
    process.env.GOOGLE_REDIRECT_URI!
);

const tokenEncryption = new TokenEncryption(process.env.ENCRYPTION_KEY!);

export async function POST(req: NextRequest) {

    // Handle CORS preflight request
    if (req.method === 'OPTIONS') {
        return new NextResponse(null, {
            status: 204,
            headers: {
                'Access-Control-Allow-Origin': 'https://www.youtube.com',  // Set your domain or * for all
                'Access-Control-Allow-Methods': 'POST, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type, Authorization',
                'Access-Control-Allow-Credentials': 'true',
            },
        });
    }

    // CORS headers for actual request
    const headers = {
        'Access-Control-Allow-Origin': 'https://www.youtube.com',  // Set your domain or * for all
        'Access-Control-Allow-Methods': 'POST, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type, Authorization',
        'Access-Control-Allow-Credentials': 'true',
    };

    // const { videoId } = await req.json();

    // if (!videoId) {
    //     return NextResponse.json({
    //         error: 'Failed to get video info',
    //         code: 'VIDEO_ID_MISSING'
    //     }, { status: 400, headers });
    // }

    // const authHeader = req.headers.get('authorization');

    // if (!authHeader || !authHeader.startsWith('Bearer ')) {
    //     return NextResponse.json({
    //         error: 'Authorization header missing or invalid',
    //         code: 'AUTH_HEADER_INVALID'
    //     }, { status: 401, headers });
    // }

    // const sessionFromExtension = authHeader.split(' ')[1];

    // if (!sessionFromExtension) {
    //     console.log('No user session found');
    //     return NextResponse.json({
    //         error: 'Session token missing in authorization header',
    //         code: 'SESSION_TOKEN_MISSING'
    //     }, { status: 401, headers });
    // }

    // const { account, databases } = await createSessionClient(sessionFromExtension)

    // const user = await account.get();

    // if (!user) {
    //     console.log('No user found');
    //     return NextResponse.json({
    //         error: 'No user associated with this session',
    //         code: 'USER_NOT_FOUND'
    //     }, { status: 404, headers });
    // }

    // if (!user.labels.includes('ytt')) {
    //     return NextResponse.json({
    //         error: 'User lacks required YTT authorization',
    //         code: 'YTT_ACCESS_REQUIRED'
    //     }, { status: 403, headers });
    // }

    try {
        const { videoId } = await req.json();
        if (!videoId) {
            return createErrorResponse('VIDEO_ID_MISSING', 'Failed to get video info', 400, headers);
        }

        const authHeader = req.headers.get('authorization');
        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            return createErrorResponse('AUTH_HEADER_INVALID', 'Authorization header missing or invalid', 401, headers);
        }

        const sessionFromExtension = authHeader.split(' ')[1];

        const user = await getCurrentUser(sessionFromExtension)

        if (!user || !user.labels.includes('ytt')) {
            return createErrorResponse('USER_NOT_FOUND_OR_NO_YTT_ACCESS', 'No user found or lacks YTT access', 403, headers);
        }

        const userYouTubeInfo = await getCurrentUserYouTubeInfo(user.$id, sessionFromExtension);

        if (!userYouTubeInfo.success || !userYouTubeInfo.userYouTubeInfo) {
            return createErrorResponse('YOUTUBE_TOKENS_NOT_FOUND', 'No YouTube tokens found for the user', 404, headers);
        }

        let { accessToken, refreshToken, expiresAt } = decryptUserTokens(userYouTubeInfo.userYouTubeInfo);

        const isTokenExpired = Date.now() >= Number(expiresAt);

        if (isTokenExpired) {

            const refreshedTokenData = await refreshAccessToken(refreshToken, userYouTubeInfo.userYouTubeInfo.$id, sessionFromExtension);

            if (!refreshedTokenData.success || !refreshedTokenData.credentials) {
                return createErrorResponse('TOKEN_REFRESH_FAILED', 'Failed to refresh access token', 500, headers);
            }
            accessToken = refreshedTokenData.credentials.access_token!;

        }

        const savedVideoInfo = await addToPlaylist(accessToken, videoId);

        return NextResponse.json({ success: true, savedVideoInfo }, { headers });

    } catch (error) {
        console.error("Error handling request:", error);
        return createErrorResponse('UNKNOWN_ERROR', 'An unexpected error occurred', 500, headers);
    }

    // try {

    //     const userYoutubeTokensFromDB = await getCurrentUserYouTubeInfo(user.$id, sessionFromExtension)

    //     if (!userYoutubeTokensFromDB.success || !userYoutubeTokensFromDB.userYouTubeInfo) {
    //         return NextResponse.json({
    //             error: 'No YouTube tokens found for the user',
    //             code: 'YOUTUBE_TOKENS_NOT_FOUND'
    //         }, { status: 404, headers });
    //     }

    //     let { accessToken: encryptedAccessToken, refreshToken: encryptedRefreshToken, expiresAt } = userYoutubeTokensFromDB.userYouTubeInfo;

    //     // Decrypt tokens
    //     const accessToken = tokenEncryption.decrypt(encryptedAccessToken);
    //     const refreshToken = tokenEncryption.decrypt(encryptedRefreshToken);

    //     const isTokenExpired = Date.now() >= Number(expiresAt);

    //     if (isTokenExpired) {

    //         try {

    //             const { credentials, success } = await refreshAccessToken(refreshToken, user.$id)

    //             if (!success || !credentials) {
    //                 console.error("Error refreshing token:");
    //                 return NextResponse.json({
    //                     error: 'Failed to refresh access token',
    //                     code: 'TOKEN_REFRESH_FAILED'
    //                 }, { status: 500, headers });
    //             }

    //             const newAccessToken = credentials!.access_token!;

    //             const savedVideoInfo = await addToPlaylist(newAccessToken, videoId);

    //             return NextResponse.json({
    //                 success: true,
    //                 savedVideoInfo: savedVideoInfo
    //             }, { headers });

    //         } catch (error) {
    //             console.error("Error refreshing token:", error);
    //             return NextResponse.json({
    //                 error: 'Failed to refresh access token',
    //                 code: 'TOKEN_REFRESH_FAILED'
    //             }, { status: 500, headers });
    //         }
    //     }

    //     const savedVideoInfo = await addToPlaylist(accessToken, videoId);

    //     return NextResponse.json({
    //         success: true,
    //         savedVideoInfo: savedVideoInfo
    //     }, { headers });

    // } catch (error) {

    //     console.error("Error handling request:", error);

    //     if (error) {
    //         return NextResponse.json({
    //             error: 'Database query error or invalid input',
    //             code: 'DB_QUERY_FAILED'
    //         }, { status: 500, headers });
    //     }

    //     return NextResponse.json({
    //         error: 'An unexpected error occurred',
    //         code: 'UNKNOWN_ERROR'
    //     }, { status: 500, headers });
    // }
}

function createErrorResponse(code: string, message: string, status: number, headers: Record<string, string>) {
    return NextResponse.json({ error: message, code }, { status, headers });
}

function decryptUserTokens(userYouTubeInfo: any) {
    return {
        accessToken: tokenEncryption.decrypt(userYouTubeInfo.accessToken),
        refreshToken: tokenEncryption.decrypt(userYouTubeInfo.refreshToken),
        expiresAt: userYouTubeInfo.expiresAt,
    };
}