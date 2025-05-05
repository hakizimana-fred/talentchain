import Link from "next/link"
import Image from "next/image"
import { ArrowUpRight } from "lucide-react"

// Mock data for featured content
const featuredItems = [
  {
    id: 1,
    title: "Summer Vibes",
    creator: "Alex Johnson",
    type: "Music",
    image: "/placeholder.svg?height=400&width=600",
    votes: 245,
  },
  {
    id: 2,
    title: "Urban Landscapes",
    creator: "Maria Garcia",
    type: "Photography",
    image: "/placeholder.svg?height=400&width=600",
    votes: 189,
  },
  {
    id: 3,
    title: "Digital Dreams",
    creator: "Jamal Wilson",
    type: "Digital Art",
    image: "/placeholder.svg?height=400&width=600",
    votes: 312,
  },
  {
    id: 4,
    title: "City Life",
    creator: "Sarah Chen",
    type: "Video",
    image: "/placeholder.svg?height=400&width=600",
    votes: 276,
  },
]

const FeaturedContent = () => {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold text-white">Featured Content</h2>
          <Link href="/explore" className="text-gray-600 hover:text-gray-900 flex items-center gap-1">
            View all <ArrowUpRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredItems.map((item) => (
            <div key={item.id} className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="relative h-48">
                <Image src={item.image || "/placeholder.svg"} alt={item.title} fill className="object-cover" />
              </div>
              <div className="p-4">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-semibold text-lg">{item.title}</h3>
                    <p className="text-sm text-gray-600">by {item.creator}</p>
                  </div>
                  <span className="bg-gray-100 text-gray-800 text-xs px-2 py-1 rounded-full">{item.type}</span>
                </div>
                <div className="mt-4 flex justify-between items-center">
                  <div className="flex items-center gap-1">
                    <span className="text-sm font-medium">{item.votes}</span>
                    <span className="text-sm text-gray-500">votes</span>
                  </div>
                  <Link href={`/content/${item.id}`} className="text-sm font-medium text-gray-800 hover:underline">
                    View details
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default FeaturedContent
