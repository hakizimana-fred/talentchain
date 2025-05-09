import Link from "next/link"
import Image from "next/image"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

// Mock data for challenges
const challengesData = {
  challenge1: {
    id: "challenge1",
    title: "Summer Music Challenge",
    category: "Music",
    entryFee: 5,
    adminCommission: 10,
  },
  challenge2: {
    id: "challenge2",
    title: "Urban Photography",
    category: "Photography",
    entryFee: 5,
    adminCommission: 10,
  },
  challenge3: {
    id: "challenge3",
    title: "Digital Art Showcase",
    category: "Art",
    entryFee: 5,
    adminCommission: 10,
  },
  challenge4: {
    id: "challenge4",
    title: "Short Film Contest",
    category: "Video",
    entryFee: 10,
    adminCommission: 10,
  },
}

// Mock submissions
const submissionsData = {
  challenge1: [
    {
      id: "sub1",
      title: "Summer Vibes",
      creator: "Alex Johnson",
      image: "/placeholder.svg?height=400&width=600&text=Music+Submission",
      votes: 45,
    },
    {
      id: "sub2",
      title: "Beach Party",
      creator: "Maria Garcia",
      image: "/placeholder.svg?height=400&width=600&text=Music+Submission",
      votes: 38,
    },
    {
      id: "sub3",
      title: "Sunset Melody",
      creator: "Jamal Wilson",
      image: "/placeholder.svg?height=400&width=600&text=Music+Submission",
      votes: 29,
    },
    {
      id: "sub4",
      title: "Ocean Waves",
      creator: "Sarah Chen",
      image: "/placeholder.svg?height=400&width=600&text=Music+Submission",
      votes: 22,
    },
    {
      id: "sub5",
      title: "Summer Nights",
      creator: "David Lee",
      image: "/placeholder.svg?height=400&width=600&text=Music+Submission",
      votes: 18,
    },
  ],
  challenge2: [
    {
      id: "sub6",
      title: "City Lights",
      creator: "Emma White",
      image: "/placeholder.svg?height=400&width=600&text=Photography+Submission",
      votes: 52,
    },
    {
      id: "sub7",
      title: "Urban Jungle",
      creator: "Michael Brown",
      image: "/placeholder.svg?height=400&width=600&text=Photography+Submission",
      votes: 47,
    },
  ],
  challenge3: [
    {
      id: "sub8",
      title: "Future City",
      creator: "James Taylor",
      image: "/placeholder.svg?height=400&width=600&text=Art+Submission",
      votes: 33,
    },
  ],
  challenge4: [
    {
      id: "sub9",
      title: "The Journey",
      creator: "Olivia Martinez",
      image: "/placeholder.svg?height=400&width=600&text=Video+Submission",
      votes: 21,
    },
  ],
}

export default function ChallengeResultsPage({ params }: { params: { id: string } }) {
  // Get challenge data
  const challenge = challengesData[params.id as keyof typeof challengesData] || {
    id: params.id,
    title: "Challenge",
    category: "General",
    entryFee: 5,
    adminCommission: 10,
  }

  // Get submissions
  const submissions = submissionsData[params.id as keyof typeof submissionsData] || []

  // Calculate rewards
  const totalParticipants = submissions.length
  const totalPrizePool = challenge.entryFee * totalParticipants
  const adminFee = totalPrizePool * (challenge.adminCommission / 100)
  const remainingPool = totalPrizePool - adminFee

  // Distribution: 60% for 1st, 30% for 2nd, 10% for 3rd
  const firstPlaceReward = remainingPool * 0.6
  const secondPlaceReward = remainingPool * 0.3
  const thirdPlaceReward = remainingPool * 0.1

  return (
    <div className="container mx-auto px-4 py-8 md:py-12">
      <div className="mb-6">
        <Link href="/admin/challenges" className="text-gray-600 hover:text-gray-900">
          ← Back to Challenges
        </Link>
      </div>

      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold">{challenge.title} - Results</h1>
          <p className="text-gray-600">Challenge in {challenge.category} category</p>
        </div>
        <Button className="mt-4 md:mt-0">Distribute Rewards</Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Submissions Ranking</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {submissions.map((submission, index) => (
                  <div key={submission.id} className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg">
                    <div className="flex-shrink-0">
                      <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center">
                        <span className="text-gray-500 font-medium">{index + 1}</span>
                      </div>
                    </div>

                    <div className="flex-shrink-0 w-12 h-12 relative rounded overflow-hidden">
                      <Image
                        src={submission.image || "/placeholder.svg"}
                        alt={submission.title}
                        fill
                        className="object-cover"
                      />
                    </div>

                    <div className="flex-grow">
                      <h3 className="font-medium">{submission.title}</h3>
                      <p className="text-sm text-gray-500">by {submission.creator}</p>
                    </div>

                    <div className="flex-shrink-0 text-right">
                      <div className="font-medium">{submission.votes} votes</div>
                      {index < 3 && (
                        <div className="text-sm text-green-600">
                          $
                          {index === 0
                            ? firstPlaceReward.toFixed(2)
                            : index === 1
                              ? secondPlaceReward.toFixed(2)
                              : thirdPlaceReward.toFixed(2)}
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        <div>
          <Card className="mb-6">
            <CardHeader>
              <CardTitle>Challenge Summary</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="p-3 bg-gray-50 rounded-lg">
                <p className="text-sm text-gray-500 mb-1">Total Participants</p>
                <p className="font-medium">{totalParticipants}</p>
              </div>

              <div className="p-3 bg-gray-50 rounded-lg">
                <p className="text-sm text-gray-500 mb-1">Total Prize Pool</p>
                <p className="font-medium">${totalPrizePool.toFixed(2)}</p>
              </div>

              <div className="p-3 bg-gray-50 rounded-lg">
                <p className="text-sm text-gray-500 mb-1">Admin Commission ({challenge.adminCommission}%)</p>
                <p className="font-medium">${adminFee.toFixed(2)}</p>
              </div>

              <div className="p-3 bg-gray-50 rounded-lg">
                <p className="text-sm text-gray-500 mb-1">Remaining Prize Pool</p>
                <p className="font-medium">${remainingPool.toFixed(2)}</p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Reward Distribution</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <div className="flex items-center">
                    <span>1st Place (60%)</span>
                  </div>
                  <span className="font-medium">${firstPlaceReward.toFixed(2)}</span>
                </div>

                <div className="flex justify-between items-center">
                  <div className="flex items-center">
                    <span>2nd Place (30%)</span>
                  </div>
                  <span className="font-medium">${secondPlaceReward.toFixed(2)}</span>
                </div>

                <div className="flex justify-between items-center">
                  <div className="flex items-center">
                    <span>3rd Place (10%)</span>
                  </div>
                  <span className="font-medium">${thirdPlaceReward.toFixed(2)}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
