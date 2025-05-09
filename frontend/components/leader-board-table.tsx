import Image from "next/image"
import Link from "next/link"
import { Trophy, Medal } from "lucide-react"
import { Button } from "@/components/ui/button"

// Mock data for leaderboard
const weeklyLeaders = [
  {
    id: 1,
    rank: 1,
    title: "Summer Vibes",
    creator: "Alex Johnson",
    type: "Music",
    image: "/summer-vibes.jpg",
    votes: 1245,
    reward: "$500",
  },
  {
    id: 2,
    rank: 2,
    title: "Urban Landscapes",
    creator: "Maria Garcia",
    type: "Photography",
    image: "/urban-style.jpg",
    votes: 1089,
    reward: "$300",
  },
  {
    id: 3,
    rank: 3,
    title: "Digital Dreams",
    creator: "Jamal Wilson",
    type: "Digital Art",
    image: "/digital-art.jpg",
    votes: 912,
    reward: "$200",
  },
  {
    id: 4,
    rank: 4,
    title: "City Life",
    creator: "Sarah Chen",
    type: "Video",
    image: "/urban.jpg",
    votes: 876,
    reward: "$100",
  },
  {
    id: 5,
    rank: 5,
    title: "Midnight Jazz",
    creator: "David Lee",
    type: "Music",
    image: "/nature.jpg",
    votes: 798,
    reward: "$50",
  },
]

const monthlyLeaders = [
  {
    id: 6,
    rank: 1,
    title: "Ocean Waves",
    creator: "Emma White",
    type: "Photography",
    image: "/nature.jpg",
    votes: 3245,
    reward: "$1000",
  },
  {
    id: 7,
    rank: 2,
    title: "Electronic Beats",
    creator: "Michael Brown",
    type: "Music",
    image: "/summer.jpg",
    votes: 2967,
    reward: "$750",
  },
  {
    id: 8,
    rank: 3,
    title: "Abstract Thoughts",
    creator: "James Taylor",
    type: "Digital Art",
    image: "/digital-art.jpg",
    votes: 2567,
    reward: "$500",
  },
  {
    id: 9,
    rank: 4,
    title: "Street Stories",
    creator: "Olivia Martinez",
    type: "Video",
    image: "/vibes.jpg",
    votes: 2234,
    reward: "$250",
  },
  {
    id: 10,
    rank: 5,
    title: "Mountain Views",
    creator: "Daniel Kim",
    type: "Photography",
    image: "/nature.jpg",
    votes: 1998,
    reward: "$100",
  },
]

const alltimeLeaders = [
  {
    id: 11,
    rank: 1,
    title: "Eternal Sunshine",
    creator: "Sophia Rodriguez",
    type: "Video",
    image: "/placeholder.svg?height=400&width=600",
    votes: 15245,
    reward: "$5000",
  },
  {
    id: 12,
    rank: 2,
    title: "Cosmic Journey",
    creator: "William Johnson",
    type: "Music",
    image: "/placeholder.svg?height=400&width=600",
    votes: 12967,
    reward: "$3000",
  },
  {
    id: 13,
    rank: 3,
    title: "Nature's Beauty",
    creator: "Ava Thompson",
    type: "Photography",
    image: "/placeholder.svg?height=400&width=600",
    votes: 10567,
    reward: "$2000",
  },
  {
    id: 14,
    rank: 4,
    title: "Digital Universe",
    creator: "Noah Garcia",
    type: "Digital Art",
    image: "/placeholder.svg?height=400&width=600",
    votes: 9234,
    reward: "$1000",
  },
  {
    id: 15,
    rank: 5,
    title: "Urban Symphony",
    creator: "Isabella Chen",
    type: "Music",
    image: "/placeholder.svg?height=400&width=600",
    votes: 8998,
    reward: "$500",
  },
]

interface LeaderboardTableProps {
  period: "weekly" | "monthly" | "alltime"
}

const LeaderboardTable = ({ period }: LeaderboardTableProps) => {
  // Select data based on period
  const data = period === "weekly" ? weeklyLeaders : period === "monthly" ? monthlyLeaders : alltimeLeaders

  return (
    <div className="mt-6">
      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-gray-100">
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">Rank</th>
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">Content</th>
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">Creator</th>
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">Type</th>
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">Votes</th>
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">Reward</th>
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">Action</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item) => (
              <tr key={item.id} className="border-b border-gray-200 hover:bg-gray-50">
                <td className="px-4 py-4">
                  {item.rank === 1 ? (
                    <div className="flex items-center justify-center w-8 h-8 bg-yellow-100 rounded-full">
                      <Trophy className="h-4 w-4 text-yellow-500" />
                    </div>
                  ) : item.rank === 2 ? (
                    <div className="flex items-center justify-center w-8 h-8 bg-gray-100 rounded-full">
                      <Medal className="h-4 w-4 text-gray-500" />
                    </div>
                  ) : item.rank === 3 ? (
                    <div className="flex items-center justify-center w-8 h-8 bg-orange-100 rounded-full">
                      <Medal className="h-4 w-4 text-orange-500" />
                    </div>
                  ) : (
                    <span className="text-gray-600 font-medium">{item.rank}</span>
                  )}
                </td>
                <td className="px-4 py-4">
                  <div className="flex items-center">
                    <div className="h-10 w-10 flex-shrink-0 mr-3">
                      <Image
                        src={item.image || "/placeholder.svg"}
                        alt={item.title}
                        width={40}
                        height={40}
                        className="rounded-md object-cover"
                      />
                    </div>
                    <div>
                      <div className="font-medium text-gray-900">{item.title}</div>
                    </div>
                  </div>
                </td>
                <td className="px-4 py-4 text-sm text-gray-600">{item.creator}</td>
                <td className="px-4 py-4">
                  <span className="px-2 py-1 text-xs font-medium rounded-full bg-gray-100">{item.type}</span>
                </td>
                <td className="px-4 py-4 text-sm font-medium">{item.votes.toLocaleString()}</td>
                <td className="px-4 py-4 text-sm font-medium text-green-600">{item.reward}</td>
                <td className="px-4 py-4">
                  <Link href={`/content/${item.id}`}>
                    <Button variant="outline" size="sm">
                      View
                    </Button>
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default LeaderboardTable
