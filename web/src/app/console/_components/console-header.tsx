import { ThemeToggle } from '@/components/theme-toggle'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Bell, Blocks, HelpCircle, User } from 'lucide-react'
import Link from 'next/link'
import React from 'react'
import UserAvatarMenu from './user-avatar-menu'
import { getCurrentUser } from '@/actions/user.actions'
import { redirect } from 'next/navigation'

export default async function ConsoleHeader() {

    const user = await getCurrentUser()

    if (!user) {
        redirect('/signin')
    }

    const userInfo = {
        name: user?.name,
        email: user?.email
    }

    return (
        <header className="p-4 border-b" >
            <div className="flex items-center justify-between">
                <div className='flex gap-2'>
                    <Link href={'/'} className="flex items-center space-x-2">
                        <Blocks className="h-8 w-8 text-primary" />
                    </Link>
                    <Badge variant={'outline'} className='text-primary w-fit h-fit'>Beta</Badge>
                </div>

                <div className="flex items-center space-x-4">
                    <ThemeToggle />
                    <UserAvatarMenu user={userInfo}/>
                </div>
            </div>
        </header >
    )
}


