import Link from "next/link"
import Image from "next/image"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"

// Mock data for challenges
const challenges = [
  {
    id: "challenge1",
    title: "Summer Music Challenge",
    category: "music",
    description: "Create a summer-themed track that captures the essence of the season.",
    entryFee: 5,
    participants: 12,
    image: "/summer-vibes.jpg",
  },
  {
    id: "challenge2",
    title: "Urban Photography",
    category: "photography",
    description: "Capture the beauty and complexity of urban environments through your lens.",
    entryFee: 5,
    participants: 24,
    image: "/urban.jpg",
  },
  {
    id: "challenge3",
    title: "Digital Art Showcase",
    category: "art",
    description: "Create digital artwork that explores the theme of 'Future Worlds'.",
    entryFee: 5,
    participants: 18,
    image: "/digital-art.jpg",
  },
  {
    id: "challenge4",
    title: "Short Film Contest",
    category: "video",
    description: "Produce a short film under 5 minutes that tells a compelling story.",
    entryFee: 10,
    participants: 8,
    image: "/citylife.gif",
  },
]

export default function ChallengesPage() {
  return (
    <div className="container mx-auto px-4 py-8 md:py-12">
      <h1 className="text-3xl font-bold mb-8">Challenges</h1>

      <Tabs defaultValue="all" className="w-full">
        <TabsList className="grid w-full md:w-auto md:inline-grid grid-cols-5 h-auto">
          <TabsTrigger value="all">All</TabsTrigger>
          <TabsTrigger value="music">Music</TabsTrigger>
          <TabsTrigger value="photography">Photography</TabsTrigger>
          <TabsTrigger value="video">Video</TabsTrigger>
          <TabsTrigger value="art">Art</TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="mt-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {challenges.map((challenge) => (
              <div
                key={challenge.id}
                className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-100 flex flex-col"
              >
                <div className="relative h-48">
                  <Image
                    src={challenge.image || "/placeholder.svg"}
                    alt={challenge.title}
                    fill
                    className="object-cover"
                  />
                  <div className="absolute top-2 right-2">
                    <span className="bg-gray-100 text-gray-800 text-xs px-2 py-1 rounded-full capitalize">
                      {challenge.category}
                    </span>
                  </div>
                </div>
                <div className="p-4 flex-grow">
                  <h3 className="font-semibold text-lg mb-2">{challenge.title}</h3>
                  <p className="text-gray-600 text-sm line-clamp-3 mb-4">{challenge.description}</p>

                  <div className="space-y-2 text-sm">
                    <div className="flex items-center text-gray-500">
                      <span>Entry Fee: ${challenge.entryFee.toFixed(2)}</span>
                    </div>
                    <div className="flex items-center text-gray-500">
                      <span>{challenge.participants} Participants</span>
                    </div>
                  </div>
                </div>
                <div className="p-4 pt-0">
                  <Link href={`/challenges/${challenge.id}`}>
                    <Button className="w-full">View Challenge</Button>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="music" className="mt-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {challenges
              .filter((c) => c.category === "music")
              .map((challenge) => (
                <div
                  key={challenge.id}
                  className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-100 flex flex-col"
                >
                  <div className="relative h-48">
                    <Image
                      src={challenge.image || "/placeholder.svg"}
                      alt={challenge.title}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="p-4 flex-grow">
                    <h3 className="font-semibold text-lg mb-2">{challenge.title}</h3>
                    <p className="text-gray-600 text-sm line-clamp-3 mb-4">{challenge.description}</p>
                  </div>
                  <div className="p-4 pt-0">
                    <Link href={`/challenges/${challenge.id}`}>
                      <Button className="w-full">View Challenge</Button>
                    </Link>
                  </div>
                </div>
              ))}
          </div>
        </TabsContent>

        <TabsContent value="photography" className="mt-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {challenges
              .filter((c) => c.category === "photography")
              .map((challenge) => (
                <div
                  key={challenge.id}
                  className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-100 flex flex-col"
                >
                  <div className="relative h-48">
                    <Image
                      src={challenge.image || "/placeholder.svg"}
                      alt={challenge.title}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="p-4 flex-grow">
                    <h3 className="font-semibold text-lg mb-2">{challenge.title}</h3>
                    <p className="text-gray-600 text-sm line-clamp-3 mb-4">{challenge.description}</p>
                  </div>
                  <div className="p-4 pt-0">
                    <Link href={`/challenges/${challenge.id}`}>
                      <Button className="w-full">View Challenge</Button>
                    </Link>
                  </div>
                </div>
              ))}
          </div>
        </TabsContent>

        <TabsContent value="video" className="mt-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {challenges
              .filter((c) => c.category === "video")
              .map((challenge) => (
                <div
                  key={challenge.id}
                  className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-100 flex flex-col"
                >
                  <div className="relative h-48">
                    <Image
                      src={challenge.image || "/placeholder.svg"}
                      alt={challenge.title}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="p-4 flex-grow">
                    <h3 className="font-semibold text-lg mb-2">{challenge.title}</h3>
                    <p className="text-gray-600 text-sm line-clamp-3 mb-4">{challenge.description}</p>
                  </div>
                  <div className="p-4 pt-0">
                    <Link href={`/challenges/${challenge.id}`}>
                      <Button className="w-full">View Challenge</Button>
                    </Link>
                  </div>
                </div>
              ))}
          </div>
        </TabsContent>

        <TabsContent value="art" className="mt-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {challenges
              .filter((c) => c.category === "art")
              .map((challenge) => (
                <div
                  key={challenge.id}
                  className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-100 flex flex-col"
                >
                  <div className="relative h-48">
                    <Image
                      src={challenge.image || "/placeholder.svg"}
                      alt={challenge.title}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="p-4 flex-grow">
                    <h3 className="font-semibold text-lg mb-2">{challenge.title}</h3>
                    <p className="text-gray-600 text-sm line-clamp-3 mb-4">{challenge.description}</p>
                  </div>
                  <div className="p-4 pt-0">
                    <Link href={`/challenges/${challenge.id}`}>
                      <Button className="w-full">View Challenge</Button>
                    </Link>
                  </div>
                </div>
              ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
