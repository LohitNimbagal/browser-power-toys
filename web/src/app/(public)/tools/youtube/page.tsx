import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Youtube, Infinity, Zap, Star, MessageSquarePlus, DollarSign, CheckCircle } from "lucide-react"
import Link from "next/link"

export default function YouTubeToolsReadMore() {
    return (
        <div className="min-h-screen bg-red-50">
            <main className="container mx-auto px-4 py-12">
                <div className="max-w-4xl mx-auto">

                    {/* Hero Section */}
                    <div className="text-center mb-16">
                        <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-red-100 mb-6 ">
                            <Youtube className="h-10 w-10 text-red-600" />
                        </div>
                        <h1 className="text-4xl font-bold mb-4">YouTube Toolkit</h1>
                        <p className="text-xl text-gray-600 mb-8">Enhance your YouTube experience beyond its limits.</p>
                        {/* <p className="text-xl text-gray-600 mb-8">Your content, your control, your way.</p> */}
                        <p className="max-w-2xl mx-auto text-gray-600">
                            Unlock the full potential of YouTube with our powerful browser extension.
                            Break free from platform restrictions and customize your viewing experience
                            with advanced features designed for power users.
                        </p>
                    </div>

                    {/* Redesigned Unlimited and Organized Watch Later Card */}
                    <Card className="mb-12 bg-white border border-red-100">
                        <CardHeader>
                            <CardTitle className="text-2xl font-bold flex items-center flex-wrap gap-4">
                                <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-red-100">
                                    <Infinity className="h-6 w-6 text-red-600" />
                                </div>
                                Unlimited and Organized Watch Later
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-gray-600 mb-4">
                                Break free from YouTube&apos;s 5,000 video limit. Our solution provides unlimited storage and better organization for power users.
                            </p>
                            <h3 className="font-semibold mb-2 text-xl text-gray-800">How it works:</h3>
                            <ul className="list-disc list-inside text-gray-600 space-y-2 mb-6">
                                <li>One Click - Auto Save videos to monthly playlists</li>
                                <li>No manual playlist selection needed</li>
                                <li>Never lose track of your favorite content</li>
                            </ul>
                            <div className="hidden lg:flex flex-row items-start gap-1 justify-between lg:px-20 lg:pr-28 relative">
                                <Image
                                    src="/video.jpeg"
                                    alt="Unlimited Watch Later Feature"
                                    width={300}
                                    height={150}
                                    className="rounded-lg shadow-md w-80"
                                />
                                <Image
                                    src="/playlist.jpeg"
                                    alt="Organized Playlists Feature"
                                    width={300}
                                    height={150}
                                    className="rounded-lg shadow-md w-80"
                                />
                                <Image
                                    src="/oneclick.svg"
                                    alt="Organized Playlists Feature"
                                    width={300}
                                    height={150}
                                    className="w-28 absolute -left-1 top-1"
                                />
                                <Image
                                    src="/monthly.svg"
                                    alt="Organized Playlists Feature"
                                    width={600}
                                    height={150}
                                    className="w-80 absolute -right-4 -bottom-4"
                                />
                            </div>
                            <Image
                                src="/mobile-image.jpeg"
                                alt="Organized Playlists Feature"
                                width={1920}
                                height={1080}
                                className="w-full lg:hidden"
                            />
                        </CardContent>
                    </Card>

                    {/* Additional Features */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
                        <Card className="bg-white border border-yellow-100">
                            <CardHeader>
                                <CardTitle className="text-xl font-semibold flex items-center flex-wrap gap-4">
                                    <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-yellow-100">
                                        <Star className="h-6 w-6 text-yellow-600" />
                                    </div>
                                    More Features Coming Soon
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="text-gray-600">Stay tuned for exciting new features to enhance your YouTube experience even further.</p>
                            </CardContent>
                        </Card>
                        <Card className="bg-white border border-purple-100">
                            <CardHeader>
                                <CardTitle className="text-xl font-semibold flex items-center flex-wrap gap-4">
                                    <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-purple-100">
                                        <MessageSquarePlus className="h-6 w-6 text-purple-600" />
                                    </div>
                                    Request a Feature
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="text-gray-600">Have an idea for a new feature? Let us know, and we might add it in a future update!</p>
                            </CardContent>
                        </Card>
                    </div>

                    {/* Pricing */}
                    <Card className="mb-12 bg-white border border-red-100">
                        <CardHeader>
                            <CardTitle className="text-xl font-semibold flex items-center">
                                <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-red-100 mr-4">
                                    <DollarSign className="h-6 w-6 text-red-600" />
                                </div>
                                Pricing
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-4">
                                <div className="flex justify-between items-center">
                                    <span className="text-lg font-medium">Lifetime Access</span>
                                    <span className="text-3xl font-bold text-youtube">$10</span>
                                </div>
                                <ul className="space-y-2">
                                    <li className="flex items-center">
                                        <CheckCircle className="h-5 w-5 mr-2 flex-shrink-0 text-red-500" />
                                        <span className="text-gray-600">Auto-playlist organization</span>
                                    </li>
                                    <li className="flex items-center">
                                        <CheckCircle className="h-5 w-5 mr-2 flex-shrink-0 text-red-500" />
                                        <span className="text-gray-600">Seamless YouTube integration</span>
                                    </li>
                                    <li className="flex items-center">
                                        <CheckCircle className="h-5 w-5 mr-2 flex-shrink-0 text-red-500" />
                                        <span className="text-gray-600">Access to all future features</span>
                                    </li>
                                    <li className="flex items-center">
                                        <CheckCircle className="h-5 w-5 mr-2 flex-shrink-0 text-red-500" />
                                        <span className="text-gray-600">Lifetime support</span>
                                    </li>
                                </ul>
                                <p className="text-gray-600 mt-4">
                                    Pay once and enjoy YouTube Tools forever. Get unlimited Watch Later storage and access to all future updates.
                                </p>
                            </div>
                            <Button variant={'youtube'} size="lg" className="w-full mt-4" asChild>
                                <Link href='/signin' prefetch={true}>
                                    Get Lifetime Access Now
                                </Link>
                            </Button>
                        </CardContent>
                    </Card>

                </div>
            </main>
        </div>
    )
}