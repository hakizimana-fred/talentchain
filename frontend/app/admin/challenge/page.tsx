import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"

// Mock data for challenges
const challenges = [
  {
    id: "challenge1",
    title: "Summer Music Challenge",
    category: "Music",
    description: "Create a summer-themed track that captures the essence of the season.",
    entryFee: 5,
    adminCommission: 10,
    startDate: "June 1, 2023",
    endDate: "June 30, 2023",
    status: "active",
    submissions: 12,
  },
  {
    id: "challenge2",
    title: "Urban Photography",
    category: "Photography",
    description: "Capture the beauty and complexity of urban environments through your lens.",
    entryFee: 5,
    adminCommission: 10,
    startDate: "May 15, 2023",
    endDate: "June 15, 2023",
    status: "active",
    submissions: 24,
  },
  {
    id: "challenge3",
    title: "Digital Art Showcase",
    category: "Art",
    description: "Create digital artwork that explores the theme of 'Future Worlds'.",
    entryFee: 5,
    adminCommission: 10,
    startDate: "June 10, 2023",
    endDate: "July 10, 2023",
    status: "active",
    submissions: 18,
  },
]

export default function AdminChallengesPage() {
  return (
    <div className="container mx-auto px-4 py-8 md:py-12">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Manage Challenges</h1>
        <Button>Create Challenge</Button>
      </div>

      <div className="space-y-6">
        {challenges.map((challenge) => (
          <Card key={challenge.id} className="overflow-hidden">
            <div className="border-l-4 border-primary p-6">
              <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-4">
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <h3 className="text-xl font-semibold">{challenge.title}</h3>
                    <span className="bg-gray-100 text-gray-800 text-xs px-2 py-1 rounded-full">
                      {challenge.category}
                    </span>
                    <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">
                      {challenge.status.charAt(0).toUpperCase() + challenge.status.slice(1)}
                    </span>
                  </div>
                  <p className="text-gray-600 line-clamp-2">{challenge.description}</p>
                  <div className="flex flex-wrap gap-4 text-sm text-gray-500">
                    <div className="flex items-center">
                      <span className="font-medium">Entry Fee:</span>
                      <span className="ml-1">${challenge.entryFee.toFixed(2)}</span>
                    </div>
                    <div className="flex items-center">
                      <span className="font-medium">Commission:</span>
                      <span className="ml-1">{challenge.adminCommission}%</span>
                    </div>
                    <div className="flex items-center">
                      <span className="font-medium">Duration:</span>
                      <span className="ml-1">
                        {challenge.startDate} - {challenge.endDate}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="flex flex-wrap gap-2">
                  <Link href={`/admin/challenges/${challenge.id}/submissions`}>
                    <Button variant="outline" size="sm">
                      Submissions ({challenge.submissions})
                    </Button>
                  </Link>
                  <Link href={`/admin/challenges/${challenge.id}/results`}>
                    <Button variant="outline" size="sm">
                      Results
                    </Button>
                  </Link>
                  <Button variant="outline" size="sm">
                    Edit
                  </Button>
                  <Button variant="outline" size="sm" className="text-red-600 hover:text-red-700 hover:bg-red-50">
                    Delete
                  </Button>
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  )
}
