'use client';

import { useState, useEffect } from 'react';

interface YoutubeToastProps {
    message: string;
    actionText?: string; // Optional prop with default in the component
    actionCallback: () => void;
}

const YoutubeToast: React.FC<YoutubeToastProps> = ({ message, actionText = "Undo", actionCallback }) => {
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        // Show the toast after a small delay
        setVisible(true);

        // Hide the toast after 3 seconds
        const timer = setTimeout(() => setVisible(false), 3000);

        // Cleanup timer on component unmount
        return () => clearTimeout(timer);
    }, []);

    // const handleActionClick = () => {
    //     actionCallback();
    //     setVisible(false); // Hide toast on action click
    // };

    return (
        <div
            className={`fixed left-32 border border-red-500 transform -translate-x-1/2 bottom-5 flex items-center justify-between bg-white text-gray-800 py-3 px-4 min-w-[200px] max-w-[300px] rounded-lg shadow-lg transition-transform duration-300 z-50
                ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'}`}
        >
            <span className="text-sm">{message}</span>
            {/* <button
                onClick={handleActionClick}
                className="ml-3 text-blue-600 font-semibold hover:underline focus:outline-none"
            >
                {actionText}
            </button> */}
        </div>
    );
};

export default YoutubeToast;
