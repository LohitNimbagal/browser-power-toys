'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Youtube, Plus, Settings, LogOut, ChevronDown } from "lucide-react"
import Image from "next/image"
import Link from 'next/link'

// Mock data for demonstration
const mockPlaylists = [
    {
        id: '1',
        title: 'Favorite Music',
        thumbnail: '/placeholder.svg?height=90&width=120',
        videoCount: 15
    },
    {
        id: '2',
        title: 'Coding Tutorials',
        thumbnail: '/placeholder.svg?height=90&width=120',
        videoCount: 8
    },
    {
        id: '3',
        title: 'Travel Vlogs',
        thumbnail: '/placeholder.svg?height=90&width=120',
        videoCount: 12
    },
]

export default function PlaylistComp({ playlists, userChannelInfo }: any) {

    return (
        <div className="bg-background">

            <section className="container mx-auto p-4 px-20 space-y-6">

                <div className='flex items-center justify-between px-2'>
                    <h5 className='font-semibold text-2xl'>Playlists</h5>

                    <div className='flex items-center justify-between gap-2 p-2'>
                        <div className='space-y-1'>
                            <p className='font-semibold text-sm'>{userChannelInfo.name}</p>
                            {/* <p className='text-xs text-muted-foreground'>{userChannelInfo.customUrl}</p> */}
                        </div>
                        <Image
                            src={userChannelInfo.imageUrl}
                            width={60}
                            height={60}
                            className='w-10 h-10 rounded-full'
                            alt={userChannelInfo.name}
                        />
                    </div>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-10 mb-4">
                    {playlists.map((playlist: any) => (
                        <Card key={playlist.id} className="overflow-hidden">
                            <CardContent className="p-0">
                                <div className="relative aspect-video">
                                    <Image
                                        src={playlist.snippet.thumbnails.medium.url}
                                        alt={`${playlist.snippet.title} thumbnail`}
                                        fill
                                        className="object-cover aspect-video"
                                    />
                                </div>
                                <div className="p-2">
                                    <h3 className="font-medium text-sm truncate">{playlist.snippet.title}</h3>
                                    <p className="text-xs text-muted-foreground">{playlist.contentDetails.itemCount} videos</p>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </section>
        </div>
    )
}