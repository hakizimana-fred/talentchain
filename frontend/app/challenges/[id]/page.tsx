"use client"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useEffect, useState } from "react"
import { CONTRACT_ADDRESS } from "@/app/constants"
import { talentChainAbi } from "@/app/constants/ABI"
import { ethers } from "ethers"

// Mock data for challenges
const challengesData = {
  challenge1: {
    id: "challenge1",
    title: "Summer Music Challenge",
    category: "Music",
    description:
      "Create a summer-themed track that captures the essence of the season. Your submission should evoke the feelings of warmth, relaxation, and joy that are associated with summer. You can use any musical style or genre, but the theme should be clearly represented in your work. Be creative and original!",
    entryFee: 5,
    participants: 12,
    adminCommission: 10,
    image: "/urban-style.jpg",
    startDate: "June 1, 2023",
    endDate: "June 30, 2023",
    timeLeft: "5 days remaining",
  },
  challenge2: {
    id: "challenge2",
    title: "Urban Photography",
    category: "Photography",
    description:
      "Capture the beauty and complexity of urban environments through your lens. Look for unique perspectives, interesting architecture, street life, or any aspect of the city that tells a compelling story. Your submission should showcase your technical skills and creative vision.",
    entryFee: 5,
    participants: 24,
    adminCommission: 10,
    image: "/urban.jpg",
    startDate: "May 15, 2023",
    endDate: "June 15, 2023",
    timeLeft: "2 days remaining",
  },
  challenge3: {
    id: "challenge3",
    title: "Digital Art Showcase",
    category: "Art",
    description:
      "Create digital artwork that explores the theme of 'Future Worlds'. Imagine and visualize what our world might look like in the future - it could be utopian, dystopian, or somewhere in between. Your submission should demonstrate your digital art skills and creative imagination.",
    entryFee: 5,
    participants: 18,
    adminCommission: 10,
    image: "/urban-style.jpg",
    startDate: "June 10, 2023",
    endDate: "July 10, 2023",
    timeLeft: "15 days remaining",
  },
  challenge4: {
    id: "challenge4",
    title: "Short Film Contest",
    category: "Video",
    description:
      "Produce a short film under 5 minutes that tells a compelling story. The theme is open, but your film should have a clear narrative structure with a beginning, middle, and end. Your submission will be judged on storytelling, cinematography, editing, and overall production quality.",
    entryFee: 10,
    participants: 8,
    adminCommission: 10,
    image: "/urban.jpg",
    startDate: "June 5, 2023",
    endDate: "July 5, 2023",
    timeLeft: "10 days remaining",
  },
}

// Mock submissions
const submissionsData = {
  challenge1: [
    {
      id: "sub1",
      title: "Summer Vibes",
      creator: "Alex Johnson",
      image: "/summer.jpg",
      votes: 45,
    },
    {
      id: "sub2",
      title: "Beach Party",
      creator: "Maria Garcia",
      image: "/summer.jpg",
      votes: 38,
    },
    {
      id: "sub3",
      title: "Sunset Melody",
      creator: "Jamal Wilson",
      image: "/summer.jpg",
      votes: 29,
    },
  ],
  challenge2: [
    {
      id: "sub4",
      title: "City Lights",
      creator: "Sarah Chen",
      image: "/citylife.jpg",
      votes: 52,
    },
    {
      id: "sub5",
      title: "Urban Jungle",
      creator: "David Lee",
      image: "/citylife.jpg",
      votes: 47,
    },
  ],
  challenge3: [
    {
      id: "sub6",
      title: "Future City",
      creator: "Emma White",
      image: "/digital-art.jpg",
      votes: 33,
    },
  ],
  challenge4: [
    {
      id: "sub7",
      title: "The Journey",
      creator: "Michael Brown",
      image: "urban-style",
      votes: 21,
    },
  ],
}

export default function ChallengePage({ params }: { params: { id: string } }) {
  const [competition, setCompetition] = useState<any>({})
  // Get challenge data
  const challenge = challengesData[params.id as keyof typeof challengesData] || {
    id: params.id,
    title: "Challenge",
    category: "General",
    description: "This challenge is not available.",
    entryFee: 5,
    participants: 0,
    adminCommission: 10,
    image: "/vibes.jpg",
    startDate: "January 1, 2023",
    endDate: "December 31, 2023",
    timeLeft: "Unknown",
  }


   async function getContract() {
    if (typeof window.ethereum === "undefined") {
      throw new Error("MetaMask is not installed");
    }
  
    await window.ethereum.request({ method: "eth_requestAccounts" });
  
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
  
    const contract = new ethers.Contract(CONTRACT_ADDRESS, talentChainAbi, signer);
  
    return contract;
}


  useEffect(() => {
    async function fetchChallenge() {
      const contract = await getContract();
      const competition = await contract.getCompetitionDetails(params.id);
      console.log(competition, 'competition' )
      setCompetition(competition)
    }
  
    fetchChallenge();
  }, [])

  // Get submissions
  const submissions = submissionsData[params.id as keyof typeof submissionsData] || []

  // Calculate potential rewards
  const totalPrizePool = challenge.entryFee * challenge.participants
  const adminFee = totalPrizePool * (challenge.adminCommission / 100)
  const remainingPool = totalPrizePool - adminFee

  // Distribution: 60% for 1st, 30% for 2nd, 10% for 3rd
  const firstPlaceReward = remainingPool * 0.6
  const secondPlaceReward = remainingPool * 0.3
  const thirdPlaceReward = remainingPool * 0.1

  return (
    <div className="container mx-auto px-4 py-8 md:py-12">
      <div className="mb-6">
        <Link href="/challenges" className="text-gray-600 hover:text-gray-900">
          ← Back to Challenges
        </Link>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <div className="relative h-64 md:h-96 rounded-lg overflow-hidden mb-6">
            <img src={competition?.photoUrl || "/placeholder.svg"} alt={competition?.name}  className="object-cover" />
            <div className="absolute top-4 right-4">
              <span className="bg-gray-100 text-gray-800 text-xs px-2 py-1 rounded-full">{competition?.name}</span>
            </div>
          </div>

          <h1 className="text-3xl font-bold mb-4">{competition?.name}</h1>

          {/* <div className="flex flex-wrap gap-4 mb-6">
            <div className="flex items-center text-gray-600">
              <span>
                {challenge.startDate} - {challenge.endDate}
              </span>
            </div>
            <div className="flex items-center text-gray-600">
              <span>{challenge.timeLeft}</span>
            </div>
            <div className="flex items-center text-gray-600">
              <span>{challenge.participants} Participants</span>
            </div>
          </div> */}

          <div className="prose max-w-none mb-8">
            {/* <h2 className="text-xl font-semibold mb-2">Challenge Description</h2> */}
            <p className="text-gray-700 whitespace-pre-line">{competition?.description}</p>
          </div>

          <div className="flex justify-center mb-8">
            <Link href={`/upload?challenge=${challenge.id}`}>
              <Button size="lg" className="px-8">
                Submit Your Entry
              </Button>
            </Link>
          </div>

          <Tabs defaultValue="submissions">
            <TabsList className="w-full grid grid-cols-2">
              <TabsTrigger value="submissions">Submissions</TabsTrigger>
              <TabsTrigger value="rules">Rules & Guidelines</TabsTrigger>
            </TabsList>
            <TabsContent value="submissions" className="mt-6">
              {submissions.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {submissions.map((submission) => (
                    <div
                      key={submission.id}
                      className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-100"
                    >
                      <div className="relative h-48">
                        <Image
                          src={submission.image || "/placeholder.svg"}
                          alt={submission.title}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div className="p-4">
                        <div className="flex justify-between items-start mb-2">
                          <h3 className="font-semibold text-lg">{submission.title}</h3>
                        </div>
                        <p className="text-sm text-gray-600 mb-4">by {submission.creator}</p>

                        <div className="flex justify-between items-center">
                          <div className="flex items-center gap-2">
                            <span className="text-sm font-medium">{submission.votes}</span>
                            <span className="text-sm text-gray-500">votes</span>
                          </div>
                          <Button variant="outline" size="sm">
                            Vote
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <p className="text-gray-500 mb-4">No submissions yet.</p>
                  <p className="text-gray-500">Be the first to submit your content!</p>
                </div>
              )}
            </TabsContent>
            <TabsContent value="rules" className="mt-6">
              <Card>
                <CardContent className="p-6 space-y-4">
                  <div>
                    <h3 className="font-semibold mb-2">Submission Guidelines</h3>
                    <ul className="list-disc pl-5 text-gray-600 space-y-1">
                      <li>All content must be original and created by you</li>
                      <li>Content must be relevant to the challenge theme</li>
                      <li>No explicit or offensive material</li>
                      <li>No copyright infringement</li>
                      <li>Submissions are reviewed within 24 hours</li>
                    </ul>
                  </div>

                  <div>
                    <h3 className="font-semibold mb-2">Voting Process</h3>
                    <ul className="list-disc pl-5 text-gray-600 space-y-1">
                      <li>Voting begins immediately after submission approval</li>
                      <li>Each user gets one vote per submission</li>
                      <li>You cannot vote for your own submission</li>
                      <li>Voting ends when the challenge deadline is reached</li>
                    </ul>
                  </div>

                  <div>
                    <h3 className="font-semibold mb-2">Reward Distribution</h3>
                    <ul className="list-disc pl-5 text-gray-600 space-y-1">
                      <li>Admin fee of {challenge.adminCommission}% is deducted from the total prize pool</li>
                      <li>Remaining funds are distributed to the top 3 winners</li>
                      <li>1st place: 60% of the remaining prize pool</li>
                      <li>2nd place: 30% of the remaining prize pool</li>
                      <li>3rd place: 10% of the remaining prize pool</li>
                      <li>Rewards are distributed within 48 hours of challenge end</li>
                    </ul>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>

        <div>
          <Card className="mb-6">
            <CardHeader>
              <CardTitle>Challenge Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="p-3 bg-gray-50 rounded-lg">
                <p className="text-sm text-gray-500 mb-1">Entry Fee</p>
                <p className="font-medium">${challenge.entryFee.toFixed(2)}</p>
              </div>

              <div className="p-3 bg-gray-50 rounded-lg">
                <p className="text-sm text-gray-500 mb-1">Current Prize Pool</p>
                <p className="font-medium">${totalPrizePool.toFixed(2)}</p>
                <p className="text-xs text-gray-500 mt-1">Based on {challenge.participants} participants</p>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <div className="flex items-center">
                    <span>1st Place</span>
                  </div>
                  <span className="font-medium">${firstPlaceReward.toFixed(2)}</span>
                </div>

                <div className="flex justify-between items-center">
                  <div className="flex items-center">
                    <span>2nd Place</span>
                  </div>
                  <span className="font-medium">${secondPlaceReward.toFixed(2)}</span>
                </div>

                <div className="flex justify-between items-center">
                  <div className="flex items-center">
                    <span>3rd Place</span>
                  </div>
                  <span className="font-medium">${thirdPlaceReward.toFixed(2)}</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Timeline</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-start">
                <div className="w-2 h-2 bg-green-500 rounded-full mt-2 mr-3"></div>
                <div>
                  <p className="font-medium">Challenge Started</p>
                  <p className="text-sm text-gray-500">{challenge.startDate}</p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="w-2 h-2 bg-yellow-500 rounded-full mt-2 mr-3"></div>
                <div>
                  <p className="font-medium">Submission Deadline</p>
                  <p className="text-sm text-gray-500">{challenge.endDate}</p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3"></div>
                <div>
                  <p className="font-medium">Winners Announced</p>
                  <p className="text-sm text-gray-500">1 day after deadline</p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="w-2 h-2 bg-purple-500 rounded-full mt-2 mr-3"></div>
                <div>
                  <p className="font-medium">Rewards Distribution</p>
                  <p className="text-sm text-gray-500">2 days after deadline</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
