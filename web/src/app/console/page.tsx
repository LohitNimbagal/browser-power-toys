import React from 'react'
import { Youtube } from 'lucide-react';
import { redirect } from 'next/navigation';
import { Badge } from '@/components/ui/badge';
import { getCurrentUser } from '@/actions/user.actions';
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { getCurrentUserYouTubeInfo, getRequestStatus } from '@/server/appwrite';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Label } from '@radix-ui/react-label';
import { RequestAccessDialog } from './_components/requestaccess-dialog';
import { Button } from '@/components/ui/button';
import { TokenEncryption } from '@/utils/encription';

const allTools = [
    { id: 'ypt', name: "Youtube Power Tools", description: "Supercharge your YouTube Experience." },
]

export default async function page() {

    const user = await getCurrentUser()

    if (!user) redirect('/signin')

    let hasAccess = null

    if (user.labels.includes('betaUser') && user.labels.includes('ypt')) {
        hasAccess = true
    }

    const requestStatus = await getRequestStatus(user.$id)

    const userYouTubeInfo = await getCurrentUserYouTubeInfo(user.$id)

    const channelInfo = {
        title: userYouTubeInfo?.userYouTubeInfo?.channelTitle,
        customUrl: userYouTubeInfo?.userYouTubeInfo?.customUrl,
        imageUrl: userYouTubeInfo?.userYouTubeInfo?.imageUrl
    }

    return (

        <div className='max-w-4xl'>
            <div className='space-y-4'>
                <p className='font-semibold'>Owned by You</p>
                <div className='flex items-center gap-4'>
                    {
                        allTools.map((tool) => (
                            <Card key={tool.id}>
                                <CardHeader>
                                    <CardTitle className="flex items-center justify-between">
                                        {tool.name}
                                        <Badge variant="destructive">Beta</Badge>
                                    </CardTitle>
                                    <CardDescription>{tool.description}</CardDescription>
                                </CardHeader>
                                <CardFooter>
                                    {
                                        userYouTubeInfo.success ? (
                                            <div className='w-full space-y-2'>
                                                <Label className='text-sm font-semibold'>Youtube Channel:</Label>
                                                <div className="w-full flex items-center justify-between gap-2 px-2 py-2 text-left text-sm border rounded-md">
                                                    <div className='flex items-center gap-2'>
                                                        <Avatar className="h-8 w-8 rounded-lg">
                                                            <AvatarImage
                                                                src={channelInfo.imageUrl}
                                                                alt={channelInfo.title}
                                                            />
                                                            <AvatarFallback className="rounded-lg">
                                                                <Youtube className='size-4' />
                                                            </AvatarFallback>
                                                        </Avatar>
                                                        <div className="grid flex-1 text-left text-sm leading-tight">
                                                            <span className="truncate font-semibold">
                                                                {channelInfo.title}
                                                            </span>
                                                            <span className="truncate text-xs">
                                                                {channelInfo.customUrl}
                                                            </span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        ) : (
                                            hasAccess ? (
                                                <Button className="w-full">
                                                    <a href={'/api/youtube-auth/init'}>
                                                        Connect to Youtube Account
                                                    </a>
                                                </Button>
                                            ) : (
                                                requestStatus ? (
                                                    <Button variant={'outline'} className='w-full text-primary' disabled>Access Requested</Button>
                                                ) : (
                                                    <RequestAccessDialog email={user.email} />
                                                )
                                            )
                                        )
                                    }
                                </CardFooter>
                            </Card>
                        ))
                    }
                </div>
            </div>
        </div>

    )
}
