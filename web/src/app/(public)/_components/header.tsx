import { getCurrentUser } from '@/actions/user.actions'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Blocks } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

export default async function Header() {

    const user = await getCurrentUser()

    return (

        <header className="z-10 bg-background">
            <div className="container mx-auto px-4 py-4 flex items-center justify-between">

                <div className='flex gap-2'>
                    <Link href={'/'} className="flex items-center space-x-2">
                        <Blocks className="h-8 w-8 text-[#6c2ced]" />
                    </Link>
                    {/* <Badge variant={'outline'} className='text-[#6c2ced] w-fit h-fit'>Beta</Badge> */}
                </div>

                <nav className="flex gap-3">
                    <Button  variant={'outline'} className="text-primary hover:text-primary" asChild>
                        <Link href={'https://chromewebstore.google.com/detail/browser-power-toys-extens/iogkcmekkebgahbbfinglfcgifchfbla'} target="_blank">
                            Get Extension
                        </Link>
                    </Button>
                    {/* <Button variant={'outline'} className='text-primary hover:text-primary' asChild>
                        <a href='/tools'>
                            Explore Tools
                        </a>
                    </Button> */}
                    {
                        user ? (
                            <Button asChild>
                                <a href='/console'>
                                    Console
                                </a>
                            </Button>
                        ) : (
                            <Button asChild>
                                <a href='/signin'>
                                    Sign In
                                </a>
                            </Button>
                        )
                    }
                </nav>

            </div>
        </header>
    )
}
