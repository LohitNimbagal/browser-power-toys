import React from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { CheckCircle, HelpCircle, Infinity, Clock, Zap } from "lucide-react"

export default function page() {
    return (
        <div className="w-full min-h-screen flex flex-col items-center justify-center bg-gray-50">

            <section className="bg-red-600 text-white py-20 w-full">
                <div className="container max-w-7xl mx-auto px-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                        <div className="text-center md:text-left">
                            <h1 className="text-4xl font-bold mb-4">Unlimited Watch Later for YouTube Power Users</h1>
                            <p className="text-xl mb-8">Never lose track of videos you want to watch later.</p>
                            <Button size="lg" variant="default" className="">Get Entension</Button>
                        </div>
                        <div className="flex justify-center">
                            <iframe width="560" height="315" src="https://www.youtube.com/embed/p_FFgo7eYEQ?si=u7kZZzjKsRe4EqyB" title="YouTube video player" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"></iframe>
                        </div>
                    </div>
                </div>
            </section>

            <section className="py-20 w-full bg-white">
                <div className="container max-w-7xl mx-auto px-4">
                    <h2 className="text-3xl font-bold text-center mb-12">Understanding the Power User&apos;s Dilemma</h2>
                    <div className="max-w-3xl mx-auto space-y-8">
                        <Card className="overflow-hidden transition-all duration-300 hover:shadow-lg">
                            <CardContent className="p-6">
                                <div className="flex flex-col items-center text-center md:text-start gap-3 md:gap-0 md:flex-row md:items-start md:space-x-4">
                                    <div className="bg-red-100 p-3 rounded-full">
                                        <HelpCircle className="w-6 h-6 text-red-600" />
                                    </div>
                                    <div>
                                        <h3 className="text-xl font-semibold mb-2">What&apos;s the problem with YouTube&apos;s &quot;Watch Later&quot; feature?</h3>
                                        <p className="text-gray-600">
                                            YouTube&apos;s &quot;Watch Later&quot; feature has a limit of 5,000 videos. For power users, this limit is often exceeded, leading to lost content and frustration.
                                        </p>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                        <Card className="overflow-hidden transition-all duration-300 hover:shadow-lg bg-red-50 border-red-200">
                            <CardContent className="p-6">
                                <div className="flex flex-col items-center text-center md:text-start gap-3 md:gap-0 md:flex-row md:items-start md:space-x-4">
                                    <div className="bg-red-100 p-3 rounded-full">
                                        <HelpCircle className="w-6 h-6 text-red-600" />
                                    </div>
                                    <div>
                                        <h3 className="text-xl font-semibold mb-2">How does this affect power users?</h3>
                                        <p className="text-red-700 mb-4">
                                            Power users often find themselves unable to save new videos, missing out on content they want to watch later. Don&apos;t let YouTube&apos;s limitations hold you back!
                                        </p>
                                        <p className="text-gray-700">
                                            Before YouTube Power Tools, power users had to go through the frustrating process of selecting &quot;Add to playlist&quot; from YouTube and then choosing a specific playlist. This extra step added unnecessary friction to their workflow.
                                        </p>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </section>

            <section className="py-20 w-full  bg-gray-100">
                <div className="container max-w-7xl mx-auto px-4">
                    <h2 className="text-3xl font-bold text-center mb-12">Our Innovative Solution</h2>
                    <div className="max-w-3xl mx-auto space-y-8">
                        <Card className="overflow-hidden transition-all duration-300 hover:shadow-lg">
                            <CardContent className="p-6">
                                <div className="flex flex-col items-center text-center md:text-start gap-3 md:gap-0 md:flex-row md:items-start md:space-x-4">
                                    <div className="bg-green-100 p-3 rounded-full">
                                        <CheckCircle className="w-6 h-6 text-green-600" />
                                    </div>
                                    <div>
                                        <h3 className="text-xl font-semibold mb-2">How does YouTube Power Tools work?</h3>
                                        <p className="text-gray-600 mb-4">
                                            After installing the YouTube Power Tools extension, you&apos;ll see a new icon on every video. Clicking this icon automates everything:
                                        </p>
                                        <ul className="list-disc list-inside text-gray-600 space-y-2">
                                            <li>Automatically saves the video to a new monthly playlist</li>
                                            <li>No need to manually select playlists</li>
                                            <li>Ensures you never lose track of videos you want to watch later</li>
                                        </ul>
                                        <p className="text-gray-600 mt-4">
                                            More powerful features are coming soon to enhance your YouTube experience even further!
                                        </p>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                        <Card className="overflow-hidden transition-all duration-300 hover:shadow-lg bg-green-50 border-green-200">
                            <CardContent className="p-6">
                                <div className="flex flex-col items-center text-center md:text-start gap-3 md:gap-0 md:flex-row md:items-start md:space-x-4">
                                    <div className="bg-green-100 p-3 rounded-full">
                                        <CheckCircle className="w-6 h-6 text-green-600" />
                                    </div>
                                    <div>
                                        <h3 className="text-xl font-semibold mb-2">What are the benefits for users?</h3>
                                        <ul className="list-disc list-inside text-gray-600 space-y-2">
                                            <li>Unlimited storage for your Watch Later videos</li>
                                            <li>Automatic monthly playlist creation</li>
                                            <li>Seamless integration with YouTube&apos;s interface</li>
                                            <li>Never miss a video you want to watch later</li>
                                        </ul>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </section>

            <section id="features" className="py-20 w-full  bg-white">
                <div className="container max-w-7xl mx-auto px-4">
                    <h2 className="text-3xl font-bold text-center mb-12">Powerful Features for Power Users</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <div className="flex flex-col items-center text-center p-6 bg-red-50 rounded-lg shadow-md transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
                            <div className="bg-red-100 p-3 rounded-full mb-4">
                                <Infinity className="h-8 w-8 text-red-600" />
                            </div>
                            <h3 className="text-xl font-semibold mb-2">Unlimited Storage</h3>
                            <p className="text-gray-600">Save as many videos as you want without worrying about limits. Your watch later list, your way.</p>
                        </div>
                        <div className="flex flex-col items-center text-center p-6 bg-blue-50 rounded-lg shadow-md transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
                            <div className="bg-blue-100 p-3 rounded-full mb-4">
                                <Clock className="h-8 w-8 text-blue-600" />
                            </div>
                            <h3 className="text-xl font-semibold mb-2">Auto-Playlists</h3>
                            <p className="text-gray-600">New playlists are automatically created each month for easy organization and browsing.</p>
                        </div>
                        <div className="flex flex-col items-center text-center p-6 bg-green-50 rounded-lg shadow-md transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
                            <div className="bg-green-100 p-3 rounded-full mb-4">
                                <Zap className="h-8 w-8 text-green-600" />
                            </div>
                            <h3 className="text-xl font-semibold mb-2">Seamless Integration</h3>
                            <p className="text-gray-600">Works flawlessly with YouTube&apos;s existing &quot;Save to Watch Later&quot; functionality. No learning curve.</p>
                        </div>
                    </div>
                    <div className="mt-12 text-center">
                        <p className="text-lg text-gray-600 flex items-center justify-center">
                            <Zap className="w-5 h-5 text-red-600 mr-2" />
                            More power user features coming soon!
                        </p>
                    </div>
                </div>
            </section>

            <section id="pricing" className="py-20 w-full  bg-gray-100">
                <div className="container max-w-7xl mx-auto px-4">
                    <h2 className="text-3xl font-bold text-center mb-12">Simple, Transparent Pricing</h2>
                    <div className="max-w-md mx-auto">
                        <Card className="overflow-hidden">
                            <div className="bg-red-600 p-6 text-white text-center">
                                <h3 className="text-2xl font-bold mb-2">Lifetime Access</h3>
                                <p className="text-5xl font-bold">$10</p>
                                <p className="text-sm mt-2">One-time payment</p>
                            </div>
                            <CardContent className="p-6">
                                <ul className="space-y-4">
                                    <li className="flex items-center">
                                        <CheckCircle className="h-5 w-5 text-green-500 mr-2 flex-shrink-0" />
                                        <span>Unlimited video storage</span>
                                    </li>
                                    <li className="flex items-center">
                                        <CheckCircle className="h-5 w-5 text-green-500 mr-2 flex-shrink-0" />
                                        <span>Automatic monthly playlist creation</span>
                                    </li>
                                    <li className="flex items-center">
                                        <CheckCircle className="h-5 w-5 text-green-500 mr-2 flex-shrink-0" />
                                        <span>Seamless YouTube integration</span>
                                    </li>
                                    <li className="flex items-center">
                                        <CheckCircle className="h-5 w-5 text-green-500 mr-2 flex-shrink-0" />
                                        <span>Access to all future features</span>
                                    </li>
                                    <li className="flex items-center">
                                        <CheckCircle className="h-5 w-5 text-green-500 mr-2 flex-shrink-0" />
                                        <span>Priority customer support</span>
                                    </li>
                                </ul>
                                <Button className="w-full mt-6" size="lg">Get Lifetime Access Now</Button>
                            </CardContent>
                        </Card>
                        {/* <p className="text-center mt-4 text-sm text-gray-600">30-day money-back guarantee. No questions asked.</p> */}
                    </div>
                </div>
            </section>

            <section className="bg-red-600 text-white py-20 w-full ">
                <div className="container max-w-7xl mx-auto px-4 text-center">
                    <h2 className="text-3xl font-bold mb-4">Ready to Supercharge Your YouTube Experience?</h2>
                    <p className="text-xl mb-8">Join thousands of power users who never miss a video they want to watch later.</p>
                    <Button size="lg" variant="default" >Get YouTube Power Tools Now</Button>
                </div>
            </section>
        </div>
    )
}