import 'server-only'
import { google } from 'googleapis';

const oauth2Client = new google.auth.OAuth2(
    process.env.GOOGLE_CLIENT_ID!,
    process.env.GOOGLE_CLIENT_SECRET!,
    process.env.GOOGLE_REDIRECT_URI!
);

export async function getUserChannelInfo(accessToken: string) {

    oauth2Client.setCredentials({ access_token: accessToken });
    const youtube = google.youtube({ version: 'v3', auth: oauth2Client });

    const channelInfo = await youtube.channels.list({
        part: ['snippet', 'contentDetails', 'status'],
        mine: true,
    });

    if (channelInfo.data.items && channelInfo.data.items.length > 0) {
        const channel = channelInfo.data.items[0];
        const userInfo = {
            title: channel.snippet?.title,
            channelId: channel.id,
            customUrl: channel.snippet?.customUrl,
            imageUrl: channel.snippet?.thumbnails?.default?.url,
        };

        return userInfo;
    } else {
        return null
    }

}
