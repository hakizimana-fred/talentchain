import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import FeaturedContent from "@/components/featured-content"

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="bg-gray-50 py-12 md:py-24">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div className="space-y-6">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight">
                Discover and Support New Creative Talent
              </h1>
              <p className="text-lg md:text-xl text-gray-600 max-w-md">
                A platform where upcoming musicians, artists, photographers, and videographers can showcase their work
                and get rewarded.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/explore">
                  <Button className="w-full sm:w-auto bg-gray-800 hover:bg-gray-700 text-white">Vote Your Favorites</Button>
                </Link>
                <Link href="/upload">
                  <Button variant="outline" className="w-full sm:w-auto">
                    Upload Your Work
                  </Button>
                </Link>
              </div>
            </div>
            <div className="relative h-64 md:h-96 rounded-lg overflow-hidden">
              <Image
                src="/hero-img.jpg"
                width={800}
                height={800}
                alt="Creative content showcase"
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Featured Content Section */}
      <FeaturedContent />

      {/* Community Section - call to action*/}

      <section className="bg-gray-800 text-white py-16">
        <div className="container mx-auto px-4 md:px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Showcase Your Talent?</h2>
          <p className="text-lg md:text-xl mb-8 max-w-2xl mx-auto">
            Join our community of creators and get the exposure your work deserves.
          </p>
          <Link href="/login">
            <Button className="bg-white text-gray-800 hover:bg-gray-100">Sign Up Now</Button>
          </Link>
        </div>
      </section>
    </div>
  )
}
