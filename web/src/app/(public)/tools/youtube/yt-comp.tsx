'use client'

import React, { useState } from 'react';
import { Bookmark } from 'lucide-react';  // Assuming lucide-react is installed

// Type definitions for video and playlist
type Video = {
    id: number;
    thumbnail: string;
    title: string;
    channel: {
        name: string;
        image: string;
    };
    views: string;
    time_uploaded: string;
};

// Sample JSON Data for Videos
const videoData: Video[] = [
    {
        id: 1,
        thumbnail: "https://picsum.photos/1920/1080?1",
        title: "Full Stack Web Development Tutorial",
        channel: {
            name: "DevMaster",
            image: "https://picsum.photos/40/40"
        },
        views: "1.2M views",
        time_uploaded: "1 week ago"
    },
    {
        id: 2,
        thumbnail: "https://picsum.photos/1920/1080?2",
        title: "JavaScript Crash Course",
        channel: {
            name: "CodeTuts",
            image: "https://picsum.photos/40/40"
        },
        views: "900K views",
        time_uploaded: "3 days ago"
    },
    {
        id: 3,
        thumbnail: "https://picsum.photos/1920/1080?3",
        title: "React Essentials",
        channel: {
            name: "TechGuru",
            image: "https://picsum.photos/40/40"
        },
        views: "500K views",
        time_uploaded: "2 weeks ago"
    }
];

const initialPlaylist: Video = {
    id: 0,
    thumbnail: "https://picsum.photos/1920/1080",
    title: "Full Stack Web Development Tutorial",
    channel: {
        name: "DevMaster",
        image: "https://picsum.photos/40/40"
    },
    views: "1.2M views",
    time_uploaded: "1 week ago"
};

interface PlaylistCardProps {
    video: Video;
}

const PlaylistCard: React.FC<PlaylistCardProps> = ({ video }) => {

    const currentMonth = new Date().toLocaleString('default', { month: 'long', year: 'numeric' });

    return (
        <div className="max-w-xs bg-white border border-gray-200 rounded-lg shadow-md overflow-hidden">
            <img src={video.thumbnail} alt={video.title} className="w-full h-40 object-cover" />
            <div className="p-4">
                <h3 className="font-semibold text-md text-gray-800 truncate">{currentMonth}</h3>
                <div className="flex flex-col items-start mt-2 space-y-1">
                    <p className="text-sm text-gray-600">Private • Playlist</p>
                    <p className="text-sm text-gray-600">Updated today</p>
                    <p className="text-sm text-gray-600 font-semibold">View full playlist</p>
                </div>
            </div>
        </div>
    );
};

interface VideoCardProps {
    video: Video;
    addToPlaylist: (video: Video) => void;
}

const VideoCard: React.FC<VideoCardProps> = ({ video, addToPlaylist }) => {
    return (
        <div className="max-w-xs bg-white border border-gray-200 rounded-lg shadow-md overflow-hidden relative">
            <img src={video.thumbnail} alt={video.title} className="w-full h-40 object-cover" />
            <Bookmark
                onClick={() => addToPlaylist(video)}
                className="absolute top-2 left-2 text-white bg-black/40 p-1 rounded-full cursor-pointer"
            />
            <div className="p-4">
                <h3 className="font-semibold text-xl text-gray-800 truncate">{video.title}</h3>
                <div className="flex items-center mt-2">
                    <img src={video.channel.image} alt={video.channel.name} className="w-8 h-8 rounded-full" />
                    <div className="ml-2">
                        <p className="text-sm text-gray-600">{video.channel.name}</p>
                        <p className="text-xs text-gray-500">{video.views} • {video.time_uploaded}</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

const VideoAndPlaylist: React.FC = () => {
    const [selectedVideo, setSelectedVideo] = useState<Video>(initialPlaylist);

    const addToPlaylist = (video: Video) => {
        setSelectedVideo(video);  // Replace the playlist thumbnail with selected video
    };

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Video Card */}
            <div>
                {videoData.map((video) => (
                    <VideoCard key={video.id} video={video} addToPlaylist={addToPlaylist} />
                ))}
            </div>

            {/* Playlist Section */}
            <div>
                <h2 className="text-xl font-semibold mb-4">Playlist</h2>
                <PlaylistCard video={selectedVideo} />
            </div>
        </div>
    );
};

export default VideoAndPlaylist;
