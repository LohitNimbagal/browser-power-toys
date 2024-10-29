import { Command } from 'lucide-react'
import React from 'react'

export default function ConsoleFooter() {
    return (
        <footer className="border-t border-gray-800 p-4 text-sm text-gray-400" >
            <div className="flex justify-between items-center">
                <div className="flex items-center space-x-2">
                    <span>© 2024</span>
                    <span className="text-blue-400">• All systems normal</span>
                </div>
                <div className="flex items-center space-x-4">
                    <Command className="h-4 w-4" />
                    <span>K</span>
                </div>
            </div>
        </footer >
    )
}
