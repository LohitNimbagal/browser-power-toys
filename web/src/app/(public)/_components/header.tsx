import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Blocks } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

export default function Header() {

    const betaTesting = process.env.BETA_TESTING
    
    return (

        <header className="z-10 bg-background">
            <div className="container mx-auto px-4 py-4 flex items-center justify-between">

                <div className='flex gap-2'>
                    <Link href={'/'} className="flex items-center space-x-2">
                        <Blocks className="h-8 w-8 text-[#6c2ced]" />
                    </Link>
                    <Badge variant={'outline'} className='text-[#6c2ced] w-fit h-fit'>Beta</Badge>
                </div>

                <nav className="flex gap-3">
                    {
                        betaTesting === 'testing' ? (
                            <Button asChild>
                                <Link href='/waitinglist'>
                                    Join Waiting List
                                </Link>
                            </Button>
                        ) : (
                            <Button asChild>
                                <Link href='/signin'>
                                    Sign In
                                </Link>
                            </Button>
                        )
                    }
                </nav>

            </div>
        </header>
    )
}
