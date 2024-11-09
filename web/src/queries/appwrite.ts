import 'server-only'
import { Query } from 'node-appwrite';
import { createSessionClient } from '@/config/appwrite';

// export async function getCurrentUserYouTubeInfo(userId: string, session?: string) {

//     const { databases } = await createSessionClient(session)

//     const userYouTubeInfo = await databases.listDocuments(
//         process.env.APPWRITE_DATABASE_ID!,
//         process.env.APPWRITE_COLLECTION_YOUTUBE_ID!,
//         [Query.equal("userId", userId)]
//     );

//     if (userYouTubeInfo.total === 1) {
//         return {
//             success: true,
//             userYouTubeInfo: userYouTubeInfo.documents[0]
//         }

//     } else return {
//         success: false,
//         userYouTubeInfo: null
//     }

// }

export async function getCurrentUserYouTubeInfo(userId: string, session?: string) {

    try {

        const { databases } = await createSessionClient(session);

        const userYouTubeInfo = await databases.listDocuments(
            process.env.APPWRITE_DATABASE_ID!,
            process.env.APPWRITE_COLLECTION_YOUTUBE_ID!,
            [Query.equal("userId", userId)]
        );

        const document = userYouTubeInfo.documents[0];

        return {
            success: !!document,
            userYouTubeInfo: document || null,
        };

    } catch (error) {
        console.error("Error fetching user YouTube info:", error);
        return {
            success: false,
            userYouTubeInfo: null,
        };
    }
}