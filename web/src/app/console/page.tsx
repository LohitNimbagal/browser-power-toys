import React from 'react';
import { redirect } from 'next/navigation';
import { Badge } from '@/components/ui/badge';
import { getCurrentUser } from '@/actions/user.actions';
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { getCurrentUserYouTubeInfo } from '@/queries/appwrite';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Label } from '@/components/ui/label';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { ExternalLink, Youtube } from 'lucide-react';

interface Tool {
    id: string;
    name: string;
    description: string;
    paymentLink: string;
    requiredLabels: string[];
}

interface User {
    $id: string;
    labels: string[];
}

interface ChannelInfo {
    title?: string;
    customUrl?: string;
    imageUrl?: string;
}

const allTools: Tool[] = [
    {
        id: 'ytt',
        name: "Youtube Power Tools",
        description: "Supercharge your YouTube Experience.",
        paymentLink: process.env.YTT_PAYMENTLINK!,
        requiredLabels: ['ytt']
    },
];

export default async function Page() {
    const user: User | null = await getCurrentUser();
    if (!user) redirect('/signin');

    const userLabels = user.labels || [];
    const userYouTubeInfo = await getCurrentUserYouTubeInfo(user.$id);
    const channelInfo: ChannelInfo = {
        title: userYouTubeInfo?.userYouTubeInfo?.channelTitle,
        customUrl: userYouTubeInfo?.userYouTubeInfo?.customUrl,
        imageUrl: userYouTubeInfo?.userYouTubeInfo?.imageUrl
    };

    const accessibleTools = allTools.filter(tool =>
        tool.requiredLabels.some(label => userLabels.includes(label))
    );
    const inaccessibleTools = allTools.filter(tool =>
        !tool.requiredLabels.some(label => userLabels.includes(label))
    );

    const renderToolCard = (tool: Tool, hasAccess: boolean) => (
        <Card key={tool.id} className='w-[350px]'>
            <CardHeader>
                <CardTitle className="flex items-center justify-between">
                    {tool.name}
                    {hasAccess && <Badge variant={'outline'}>Owned</Badge>}
                </CardTitle>
                <CardDescription>{tool.description}</CardDescription>
            </CardHeader>
            <CardFooter>
                {hasAccess ? (
                    userYouTubeInfo.success ? (
                        <div className='w-full space-y-2'>
                            <Label className='text-sm font-semibold'>Youtube Channel:</Label>
                            <div className="w-full flex items-center justify-between gap-2 px-2 py-2 text-left text-sm border rounded-md">
                                <div className='flex items-center gap-2'>
                                    <Avatar className="h-8 w-8 rounded-lg">
                                        <AvatarImage
                                            src={channelInfo.imageUrl}
                                            alt={channelInfo.title || 'YouTube Channel'}
                                        />
                                        <AvatarFallback className="rounded-lg">
                                            <Youtube className='size-4' />
                                        </AvatarFallback>
                                    </Avatar>
                                    <div className="grid flex-1 text-left text-sm leading-tight">
                                        <span className="truncate font-semibold">
                                            {channelInfo.title || 'YouTube Channel'}
                                        </span>
                                        <span className="truncate text-xs">
                                            {channelInfo.customUrl || ''}
                                        </span>
                                    </div>
                                </div>
                            </div>
                            <Button className="w-full" asChild>
                                <Link href={'https://youtube.com'} className='flex items-center gap-2' target='_blank'>
                                    Open YouTube
                                    <ExternalLink className='size-4' />
                                </Link>
                            </Button>
                        </div>
                    ) : (
                        <Button className="w-full" asChild>
                            <a href={'/api/youtube-auth/init'}>
                                Connect to Youtube Account
                            </a>
                        </Button>
                    )
                ) : (
                    <Button className='w-full' asChild>
                        <Link href={`${tool.paymentLink}?checkout[custom][user_id]=${user.$id}&checkout[custom][tool]=${tool.id}`} target="_blank" className='w-full'>
                            Get Started
                        </Link>
                    </Button>
                )}
            </CardFooter>
        </Card>
    );

    return (
        <div className='w-full flex flex-col items-center justify-center space-y-4'>
            <div className='w-full space-y-4 max-w-7xl'>
                <p className='font-semibold'>My Tools</p>
                {accessibleTools.length > 0 ? (
                    <div className='w-full grid grid-cols-3 gap-3'>
                        {accessibleTools.map(tool => renderToolCard(tool, true))}
                    </div>
                ) : (
                    <p>Your tools list is currently empty. Browse and add tools to your collection.</p>
                )}
            </div>
            <div className='w-full space-y-4 max-w-7xl text-left'>
                <p className='font-semibold'>All Tools</p>
                {inaccessibleTools.length > 0 ? (
                    <div className='w-full grid grid-cols-3 gap-3'>
                        {inaccessibleTools.map(tool => renderToolCard(tool, false))}
                    </div>
                ) : (
                    <p>We&apos;re working on new tools for you. Stay tuned for updates!</p>
                )}
            </div>
        </div>
    );
}
