
import Link from "next/link";
import Image from "next/image";
import { Youtube } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function page() {
  return (

    <>

      <div className="w-full flex flex-col items-center justify-center">

        <section className="py-20 w-full bg-gray-100">
          <div className="container max-w-7xl mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
              <div className="text-center md:text-left">
                <h1 className="text-4xl font-bold mb-4 font-montserrat tracking-wide">The Ultimate Toolkit for <br /> <span className="text-[#6c2ced]">Super Users</span></h1>
                <p className="text-xl mb-8 font-roboto tracking-wider">Upgrade your workflow with essential tools tailored for serious internet users. <br /> Say goodbye to limitations and hello to powerful possibilities.</p>
                <Button size="lg" asChild>
                  <Link href={'/https://chromewebstore.google.com/detail/browser-power-toys-extens/iogkcmekkebgahbbfinglfcgifchfbla'} target="_blank">
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

        <section id="features" className="py-20 w-full bg-white">
          <div className="container max-w-7xl mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">Powerful Tools for Power Users</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

              <div className="flex flex-col items-center text-center p-6 bg-red-50 rounded-lg shadow-md">
                <div className="bg-red-100 p-3 rounded-full mb-4">
                  <Youtube className="h-8 w-8 text-red-600" />
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

      </div >

    </>

  )
}