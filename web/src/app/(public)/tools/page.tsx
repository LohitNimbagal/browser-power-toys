import { Button } from '@/components/ui/button'
import { Youtube } from 'lucide-react'
import React from 'react'

export default function page() {
    return (
        <section className="w-full min-h-screen py-20 bg-white">
            <div className="container max-w-7xl mx-auto px-4">
                <h2 className="text-3xl font-bold text-center mb-12">Powerful Tools for Power Users</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

                    <div className="flex flex-col items-center text-center p-6 bg-red-50 rounded-lg shadow-md">
                        <div className="bg-red-100 p-3 rounded-full mb-4">
                            <Youtube className="h-8 w-8 text-youtube" />
                        </div>
                        <h3 className="text-xl font-semibold mb-2 text-gray-800">Youtube Power Tools</h3>
                        <p className="text-gray-600">Save as many videos as you want without worrying about limits. <br /> Your watch later list, your way.</p>
                        <Button asChild variant={'youtube'} className="mt-4 w-full">
                            <a href={'/tools/youtube'}>
                                Read More
                            </a>
                        </Button>
                    </div>

                    <div className="relative flex flex-col items-center text-center p-6 bg-blue-50 rounded-lg shadow-md transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
                        <div className="bg-blue-100 p-3 rounded-full mb-4">
                            <Youtube className="h-8 w-8 text-blue-600" />
                        </div>
                        <h3 className="text-xl font-semibold mb-2 text-gray-800">YouTube Power Tools</h3>
                        <p className="text-gray-600">Save as many videos as you want without worrying about limits. <br /> Your watch later list, your way.</p>

                        {/* Coming Soon Overlay */}
                        <div className="absolute inset-0 bg-white bg-opacity-5 backdrop-blur-md flex items-center justify-center rounded-lg">
                            <span className="text-xl font-semibold text-gray-700">Coming Soon</span>
                        </div>
                    </div>

                    <div className="relative flex flex-col items-center text-center p-6 bg-green-50 rounded-lg shadow-md transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
                        <div className="bg-green-100 p-3 rounded-full mb-4">
                            <Youtube className="h-8 w-8 text-green-600" />
                        </div>
                        <h3 className="text-xl font-semibold mb-2 text-gray-800">YouTube Power Tools</h3>
                        <p className="text-gray-600">Save as many videos as you want without worrying about limits. <br /> Your watch later list, your way.</p>

                        {/* Coming Soon Overlay */}
                        <div className="absolute inset-0 bg-white bg-opacity-5 backdrop-blur-md flex items-center justify-center rounded-lg">
                            <span className="text-xl font-semibold text-gray-700">Coming Soon</span>
                        </div>
                    </div>

                </div>
            </div>
        </section>
    )
}
