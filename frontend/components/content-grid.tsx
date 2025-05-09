import Image from "next/image"
import { ThumbsUp } from "lucide-react"
import { Button } from "@/components/ui/button"

// Mock data for content
const allContent = [
  {
    id: 1,
    title: "Summer Vibes",
    creator: "Alex Johnson",
    type: "music",
    image: "/nature.jpg",
    votes: 245,
  },
  {
    id: 2,
    title: "Urban Landscapes",
    creator: "Maria Garcia",
    type: "photography",
    image: "/nature.jpg",
    votes: 189,
  },
  {
    id: 3,
    title: "Digital Dreams",
    creator: "Jamal Wilson",
    type: "art",
    image: "/nature.jpg",
    votes: 312,
  },
  {
    id: 4,
    title: "City Life",
    creator: "Sarah Chen",
    type: "video",
    image: "/nature.jpg",
    votes: 276,
  },
  {
    id: 5,
    title: "Midnight Jazz",
    creator: "David Lee",
    type: "music",
    image: "/nature.jpg",
    votes: 198,
  },
  {
    id: 6,
    title: "Nature's Beauty",
    creator: "Emma White",
    type: "photography",
    image: "/nature.jpg",
    votes: 221,
  },
  {
    id: 7,
    title: "Abstract Thoughts",
    creator: "Michael Brown",
    type: "art",
    image: "/nature.jpg",
    votes: 167,
  },
  {
    id: 8,
    title: "Street Stories",
    creator: "James Taylor",
    type: "video",
    image: "/nature.jpg",
    votes: 234,
  },
]

interface ContentGridProps {
  category: string
}

const ContentGrid = ({ category }: ContentGridProps) => {
  // Filter content based on category
  const filteredContent = category === "all" ? allContent : allContent.filter((item) => item.type === category)

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mt-6">
      {filteredContent.map((item) => (
        <div key={item.id} className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-100">
          <div className="relative h-48">
            <Image src={item.image || "/placeholder.svg"} alt={item.title} fill className="object-cover" />
          </div>
          <div className="p-4">
            <div className="flex justify-between items-start mb-2">
              <h3 className="font-semibold text-lg">{item.title}</h3>
              <span className="bg-gray-100 text-gray-800 text-xs px-2 py-1 rounded-full capitalize">{item.type}</span>
            </div>
            <p className="text-sm text-gray-600 mb-4">by {item.creator}</p>

            <div className="flex justify-between items-center">
              <div className="flex items-center gap-2">
                <span className="text-sm font-medium">{item.votes}</span>
                <span className="text-sm text-gray-500">votes</span>
              </div>
              <Button variant="outline" size="sm" className="flex items-center gap-1">
                <ThumbsUp className="h-4 w-4" />
                Vote
              </Button>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

export default ContentGrid
