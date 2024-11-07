/** @type {import('next').NextConfig} */

const nextConfig = {

    images: {
        remotePatterns: [
            {
                protocol: "https",
                hostname: "**",
            },
        ],
    },

    async headers() {
        return [
            {
                // Routes this applies to
                source: "/api/youtube/monthly-playlist/add",
                // Headers
                headers: [
                    // Allow for specific domains to have access or * for all
                    {
                        key: "Access-Control-Allow-Origin",
                        value: "https://www.youtube.com",
                        // DOES NOT WORK
                        // value: process.env.ALLOWED_ORIGIN,
                    },
                    // Allows for specific methods accepted
                    {
                        key: "Access-Control-Allow-Methods",
                        value: "POST, OPTIONS",
                    },
                    // Allows for specific headers accepted (These are a few standard ones)
                    {
                        key: "Access-Control-Allow-Headers",
                        value: "Content-Type, Authorization",
                    },
                    {
                        key: "Access-Control-Allow-Credentials",
                        value: "true", // Allow credentials like cookies to be sent
                    },
                ],
            },
        ];
    },

};

export default nextConfig;
