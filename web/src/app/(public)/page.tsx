
import Link from "next/link";
import Image from "next/image";
import { Blocks, CheckCircle2, Twitter, Youtube } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function page() {
  return (

    <>

      <div className="w-full flex flex-col items-center justify-center bg-gray-50">

        <section className="py-20 w-full">
          <div className="container max-w-7xl mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
              <div className="text-center lg:px-10 md:text-left ">
                <h1 className="text-4xl font-bold mb-4 font-montserrat tracking-wide leading-[3rem]"><span className="text-[#6c2ced] block">Simplify and Optimize</span> Your Browsing Experience</h1>
                <p className="text-lg mb-8 tracking-normal">One extension to elevate your browsing, packed with powerful tools that simplify and optimize every task.</p>
                <Button size="lg" asChild>
                  <Link href={'https://chromewebstore.google.com/detail/browser-power-toys-extens/iogkcmekkebgahbbfinglfcgifchfbla'} target="_blank">
                    Get Extension
                  </Link>
                </Button>
              </div>
              <div className="flex justify-center">
                <Image
                  src={'/extention-icon.png'}
                  width={500}
                  height={250}
                  className="aspect-video object-cover rounded-md"
                  alt="extension installed image"
                />
              </div>
            </div>
          </div>
        </section>

        <section id="features" className="py-20 w-full">
          <div className="container max-w-7xl mx-auto px-4">
            <div className="mb-12 text-center space-y-3">
              <h2 className="text-3xl font-bold">Powerful Tools, One Extension</h2>
              <p className="text-lg mb-8 tracking-normal">Elevate your online experience with essential tools in one place.</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

              {/* YouTube Power Tools */}
              <div className="flex flex-col items-center text-center p-6 bg-red-50 rounded-lg shadow-md">
                <div className="bg-red-100 p-3 rounded-full mb-4">
                  <Youtube className="h-8 w-8 text-red-600" />
                </div>
                <h3 className="text-xl font-semibold mb-2 text-gray-800">YouTube Toolkit</h3>
                <p className="text-gray-600">Discover a better way to <br /> organize and enjoy YouTube.</p>
                <Button asChild variant={'youtube'} className="mt-4 w-full">
                  <a href={'/tools/youtube'}>
                    Read More
                  </a>
                </Button>
              </div>

              <div className="flex flex-col items-center text-center p-6 bg-blue-50 rounded-lg shadow-md relative">
                <div className="bg-blue-100 p-3 rounded-full mb-4">
                  <Blocks className="h-8 w-8 text-blue-600" />
                </div>
                <h3 className="text-xl font-semibold mb-2 text-gray-800">Productivity Suite</h3>
                <p className="text-gray-600">Save as many videos as you want without worrying about limits. <br /> Your watch later list, your way.</p>
                <Button variant="outline" className="w-full" disabled>
                  Coming Soon
                </Button>
                <div className="absolute inset-0 bg-white bg-opacity-30 backdrop-blur-sm flex items-center justify-center rounded-lg">
                  <span className="text-xl font-semibold text-gray-700">Coming Soon</span>
                </div>
              </div>

              <div className="flex flex-col items-center text-center p-6 bg-green-50 rounded-lg shadow-md relative">
                <div className="bg-green-100 p-3 rounded-full mb-4">
                  <Blocks className="h-8 w-8 text-green-600" />
                </div>
                <h3 className="text-xl font-semibold mb-2 text-gray-800">Productivity Suite</h3>
                <p className="text-gray-600">Save as many videos as you want without worrying about limits. <br /> Your watch later list, your way.</p>
                <Button variant="outline" className="w-full" disabled>
                  Coming Soon
                </Button>
                <div className="absolute inset-0 bg-white bg-opacity-30 backdrop-blur-sm flex items-center justify-center rounded-lg">
                  <span className="text-xl font-semibold text-gray-700">Coming Soon</span>
                </div>
              </div>
            </div>
          </div>
        </section>

      </div >

    </>

  )
}