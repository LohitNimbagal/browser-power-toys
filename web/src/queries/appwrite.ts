import 'server-only'
import { Query } from 'node-appwrite';
import { createSessionClient } from '@/config/appwrite';

export async function getCurrentUserYouTubeInfo(userId: string) {

    const { databases } = await createSessionClient()

    const userYouTubeInfo = await databases.listDocuments(
        process.env.APPWRITE_DATABASE_ID!,
        process.env.APPWRITE_COLLECTION_YOUTUBE_ID!,
        [Query.equal("userId", userId)]
    );

    if (userYouTubeInfo.total === 1) {
        return {
            success: true,
            userYouTubeInfo: userYouTubeInfo.documents[0]
        }

    } else return {
        success: false,
        userYouTubeInfo: null
    }

}