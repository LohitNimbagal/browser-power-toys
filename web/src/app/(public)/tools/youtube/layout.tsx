import { YouTubeToastProvider } from '@/components/youtube/youtube-toast-provider'
import React, { Children, ReactNode } from 'react'

export default function YoutubeLayout({ children }: { children: ReactNode }) {
    return (
        <YouTubeToastProvider>
            {children}
        </YouTubeToastProvider>
    )
}
