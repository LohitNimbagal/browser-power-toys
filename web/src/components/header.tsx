import { Youtube } from 'lucide-react'
import React from 'react'

export default function Header() {
    return (
        <header className="bg-white shadow-sm sticky top-0 z-10">
            <div className="container mx-auto px-4 py-4 flex items-center justify-between">
                <div className="flex items-center space-x-2">
                    <Youtube className="h-8 w-8 text-red-600" />
                    <span className="text-xl font-bold">YouTube Power Tools</span>
                </div>
                <nav>
                    <ul className="flex space-x-4">
                        <li><a href="#features" className="text-gray-600 hover:text-red-600 transition-colors">Features</a></li>
                        <li><a href="#pricing" className="text-gray-600 hover:text-red-600 transition-colors">Pricing</a></li>
                    </ul>
                </nav>
            </div>
        </header>
    )
}