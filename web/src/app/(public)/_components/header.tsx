import { Button } from '@/components/ui/button'
import { ModeToggle } from '@/components/ui/mode-toggle'
import { Blocks } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

export default function Header() {
    return (

        <header className="z-10 bg-background">
            <div className="container mx-auto px-4 py-4 flex items-center justify-between">

                <Link href={'/'} className="flex items-center space-x-2">
                    <Blocks className="h-8 w-8 text-[#6c2ced]" />
                </Link>

                <nav className="flex gap-3">
                    <ul className="flex items-center space-x-4">
                        <li><a href="#features" className="text-gray-600 hover:text-red-600 transition-colors">Features</a></li>
                        <li><a href="#pricing" className="text-gray-600 hover:text-red-600 transition-colors">Pricing</a></li>
                        <li>
                            <Button asChild>
                                <Link href='/signin'>
                                    Sign In
                                </Link>
                            </Button>
                        </li>
                    </ul>

                    <ModeToggle />
                </nav>

            </div>
        </header>
    )
}
