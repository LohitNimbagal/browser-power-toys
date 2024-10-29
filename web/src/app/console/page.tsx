import React from 'react'
import { redirect } from 'next/navigation';
import { CheckCircle } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { getCurrentUser } from '@/actions/user.actions';
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';

const userTools = [
    { id: 1, name: "Tab Manager", description: "Efficiently manage and organize your browser tabs." },
    { id: 2, name: "Password Generator", description: "Create strong, unique passwords for your accounts." },
    { id: 3, name: "Quick Notes", description: "Jot down ideas and information while browsing." },
]

export default async function page() {

    const user = await getCurrentUser()

    if (!user) redirect('/signin')

    if (!user.labels.includes('betaUser')) {
        redirect('/waitinglist')
    }

    return (
        <div className='space-y-4'>
            <p className='font-semibold'>Owned by You</p>
            <div className='flex items-center gap-4'>
                {
                    userTools.map((tool) => (
                        <Card key={tool.id}>
                            <CardHeader>
                                <CardTitle className="flex items-center justify-between">
                                    {tool.name}
                                    <Badge variant="secondary"><CheckCircle className="w-4 h-4 mr-1" />Owned</Badge>
                                </CardTitle>
                                <CardDescription>{tool.description}</CardDescription>
                            </CardHeader>
                            <CardFooter>
                                <Button className="w-full">Launch Tool</Button>
                            </CardFooter>
                        </Card>
                    ))
                }
            </div>
        </div>
    )
}
