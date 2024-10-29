import React from 'react'
import { redirect } from 'next/navigation';
import { CheckCircle, Youtube } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { getCurrentUser } from '@/actions/user.actions';
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { getCurrentUserYouTubeInfo } from '@/server/appwrite';
import Link from 'next/link';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Label } from '@radix-ui/react-label';

const allTools = [
    { id: 'ypt', name: "Youtube Power Tools", description: "Supercharge your YouTube Experience." },
    { id: 'pg', name: "Password Generator", description: "Create strong, unique passwords for your accounts." },
    { id: 'qn', name: "Quick Notes", description: "Jot down ideas and information while browsing." },
]

export default async function page() {

    const user = await getCurrentUser()

    if (!user) redirect('/signin')

    if (!user.labels.includes('betaUser')) {
        redirect('/waitinglist')
    }

    const ownedByUsers = allTools.filter(tool => user.labels.includes(tool.id));

    const userYouTubeInfo = await getCurrentUserYouTubeInfo(user.$id)

    const channelInfo = {
        title: userYouTubeInfo.userYouTubeInfo?.channelTitle,
        customUrl: userYouTubeInfo.userYouTubeInfo?.customUrl,
        imageUrl: userYouTubeInfo.userYouTubeInfo?.imageUrl
    }

    return (
        <div className='space-y-4'>
            <p className='font-semibold'>Owned by You</p>
            <div className='flex items-center gap-4'>
                {
                    ownedByUsers.map((tool) => (
                        <Card key={tool.id}>
                            <CardHeader>
                                <CardTitle className="flex items-center justify-between">
                                    {tool.name}
                                    <Badge variant="secondary"><CheckCircle className="w-4 h-4 mr-1" />Owned</Badge>
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
                                        <Button className="w-full">
                                            <Link href={'/api/youtube-auth/init'}>
                                                Connect to Youtube Account
                                            </Link>
                                        </Button>
                                    )
                                }
                            </CardFooter>
                        </Card>
                    ))
                }
            </div>
        </div>
    )
}
