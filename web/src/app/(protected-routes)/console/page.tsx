import { getCurrentUser } from '@/actions/user.actions';
import { Button } from '@/components/ui/button';
import { createSessionClient } from '@/server/appwrite';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import { Query } from 'node-appwrite';
import React from 'react'
import PlaylistComp from './playlist-comp';
import { Blocks, Youtube } from 'lucide-react';
import { getUserChannelInfo, getPlaylists, refreshAccessTokenAndUpdateDB } from '@/server/youtube';
import { signOut } from '@/actions/auth.actions';

export default async function page() {

    const user = await getCurrentUser()

    if (!user) redirect('/signin')

    if (!user.labels.includes('betaUser')) {
       redirect('/waitinglist') 
    }

    return (
        <h1>Welcome Beta User</h1>
    )

    // const sessionClient = await createSessionClient();

    // if (!sessionClient) {
    //     console.error("Session client could not be created.");
    //     redirect('/signin');
    // }

    // const { databases } = sessionClient; // Destructure databases from sessionClient

    // const userYoutubeTokens = await databases.listDocuments(
    //     process.env.APPWRITE_DATABASE_ID!,
    //     process.env.APPWRITE_COLLECTION_YOUTUBE_ID!,
    //     [Query.equal("userId", user.$id)]
    // );

    // if (userYoutubeTokens.total === 0) {

    //     return (
    //         <div className="text-center py-8">
    //             <p className="mb-4">Connect to YouTube to view your playlists</p>
    //             <Button asChild>
    //                 <Link href={'/api/youtube-auth/init'}>
    //                     <Youtube className="mr-2 h-4 w-4" />
    //                     Connect to YouTube
    //                 </Link>
    //             </Button>
    //         </div>
    //     )

    // } else {

    //     const isTokenExpired = Date.now() >= Number(userYoutubeTokens.documents[0].expiresAt);

    //     if (isTokenExpired) {
    //         const response = await refreshAccessTokenAndUpdateDB(userYoutubeTokens.documents[0].refreshToken, userYoutubeTokens.documents[0].$id)
    //     }

    //     const playlists = await getPlaylists(userYoutubeTokens.documents[0].accessToken)
    //     const channelInfo = await getUserChannelInfo(userYoutubeTokens.documents[0].accessToken)

    //     const userChannelInfo = {
    //         name: channelInfo?.data?.items !== undefined ? channelInfo?.data?.items[0]?.snippet?.title : null,
    //         imageUrl: channelInfo?.data?.items !== undefined ? channelInfo?.data?.items[0]?.snippet?.thumbnails?.medium?.url : null,
    //         customUrl: channelInfo?.data?.items !== undefined ? channelInfo.data?.items[0]?.snippet?.customUrl : null,
    //     }

    //     return (
    //         <>
    //             <header className="border-b">
    //                 <div className="container mx-auto px-4 py-3 flex items-center justify-between">
    //                     <Link href={'/'} className="flex items-center space-x-2">
    //                         <Blocks className="h-8 w-8 text-[#6c2ced]" />
    //                     </Link>
    //                     <form action={signOut}>
    //                         <Button type='submit'>
    //                             Sign Out
    //                         </Button>
    //                     </form>
    //                 </div>
    //             </header>
    //             <PlaylistComp playlists={playlists} userChannelInfo={userChannelInfo} />
    //         </>
    //     )
    // }


}
