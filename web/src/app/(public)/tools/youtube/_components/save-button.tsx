// SomeComponent.tsx
'use client';

import { useYouTubeToast } from "@/components/youtube/youtube-toast-provider";
import Image from "next/image";


export default function YouTubeSaveButton() {
    const { showToast } = useYouTubeToast();

    const handleClick = () => {
        const date = new Date();
        const month = date.toLocaleString('default', { month: 'long' });
        const year = date.getFullYear();

        // Call showToast with dynamic date message
        showToast(`Saved to ${month} ${year}`);
    };

    return (
        <Image
            src={'/save-image.png'}
            width={600}
            height={600}
            className="absolute opacity-80 left-2 top-2 w-8 h-8 hover:cursor-pointer"
            alt="extension installed image"
            onClick={handleClick}
        />
    );
}
