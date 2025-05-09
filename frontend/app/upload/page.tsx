import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"

// Mock data for challenges
const challenges = [
  {
    id: "challenge1",
    title: "Summer Music Challenge",
    category: "music",
    entryFee: 5,
  },
  {
    id: "challenge2",
    title: "Urban Photography",
    category: "photography",
    entryFee: 5,
  },
  {
    id: "challenge3",
    title: "Digital Art Showcase",
    category: "art",
    entryFee: 5,
  },
  {
    id: "challenge4",
    title: "Short Film Contest",
    category: "video",
    entryFee: 10,
  },
]

export default function UploadPage() {
  return (
    <div className="container mx-auto px-4 py-8 md:py-12">
      <h1 className="text-3xl font-bold mb-8">Upload Your Content</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-2">
          <Card>
            <form>
              <CardHeader>
                <CardTitle>Content Details</CardTitle>
                <CardDescription>Fill in the details about your content and upload your file.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="challenge">Select Challenge</Label>
                  <select
                    id="challenge"
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    <option value="">Select a challenge</option>
                    {challenges.map((challenge) => (
                      <option key={challenge.id} value={challenge.id}>
                        {challenge.title}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="title">Title</Label>
                  <Input id="title" placeholder="Enter a title for your content" />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea id="description" placeholder="Describe your content" rows={4} />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="file">Upload File</Label>
                  <Input id="file" type="file" />
                </div>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button type="button" variant="outline">
                  Cancel
                </Button>
                <Button type="submit">Submit Entry</Button>
              </CardFooter>
            </form>
          </Card>
        </div>

        <div>
          <Card className="mb-6">
            <CardHeader>
              <CardTitle>Challenge Information</CardTitle>
              <CardDescription>Details about the selected challenge</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="text-center py-4">
                <p className="text-gray-500">Select a challenge to see details</p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Submission Guidelines</CardTitle>
              <CardDescription>Please review our guidelines before submitting.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <h4 className="font-medium">Accepted Formats</h4>
                <ul className="list-disc pl-5 text-sm text-gray-600 space-y-1">
                  <li>Music: SoundCloud, Spotify, or other streaming links</li>
                  <li>Photography: JPG, PNG, GIF (max 10MB)</li>
                  <li>Video: MP4, MOV (max 100MB)</li>
                  <li>Art: JPG, PNG, GIF (max 10MB)</li>
                </ul>
              </div>

              <div className="space-y-2">
                <h4 className="font-medium">Content Rules</h4>
                <ul className="list-disc pl-5 text-sm text-gray-600 space-y-1">
                  <li>All content must be original and created by you</li>
                  <li>Content must be relevant to the challenge theme</li>
                  <li>No explicit or offensive material</li>
                  <li>No copyright infringement</li>
                  <li>Submissions are reviewed within 24 hours</li>
                </ul>
              </div>

              <div className="space-y-2">
                <h4 className="font-medium">Voting & Rewards</h4>
                <ul className="list-disc pl-5 text-sm text-gray-600 space-y-1">
                  <li>Voting period lasts until the challenge end date</li>
                  <li>Top 3 submissions with the most votes win rewards</li>
                  <li>Rewards are distributed within 48 hours of challenge end</li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
