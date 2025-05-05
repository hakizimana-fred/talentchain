"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Upload, Info } from "lucide-react"
import { Alert, AlertDescription } from "@/components/ui/alert"

export default function UploadPage() {
  const [contentType, setContentType] = useState<string>("")
  const [title, setTitle] = useState<string>("")
  const [description, setDescription] = useState<string>("")
  const [file, setFile] = useState<File | null>(null)
  const [audioLink, setAudioLink] = useState<string>("")

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0])
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle form submission logic here
    console.log({ contentType, title, description, file, audioLink })
    // Reset form
    setContentType("")
    setTitle("")
    setDescription("")
    setFile(null)
    setAudioLink("")
    alert("Content submitted successfully!")
  }

  return (
    <div className="container mx-auto px-4 py-8 md:py-12">
      <h1 className="text-3xl font-bold mb-8">Upload Your Content</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-2">
          <Card>
            <form onSubmit={handleSubmit}>
              <CardHeader>
                <CardTitle>Content Details</CardTitle>
                <CardDescription>Fill in the details about your content and upload your file.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="content-type">Content Type</Label>
                  <Select value={contentType} onValueChange={setContentType}>
                    <SelectTrigger id="content-type">
                      <SelectValue placeholder="Select content type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="music">Music</SelectItem>
                      <SelectItem value="photography">Photography</SelectItem>
                      <SelectItem value="video">Video</SelectItem>
                      <SelectItem value="art">Art</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="title">Title</Label>
                  <Input
                    id="title"
                    placeholder="Enter a title for your content"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    placeholder="Describe your content"
                    rows={4}
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    required
                  />
                </div>

                {contentType === "music" ? (
                  <div className="space-y-2">
                    <Label htmlFor="audio-link">Audio Link</Label>
                    <Input
                      id="audio-link"
                      placeholder="Enter a link to your audio (SoundCloud, Spotify, etc.)"
                      value={audioLink}
                      onChange={(e) => setAudioLink(e.target.value)}
                      required
                    />
                  </div>
                ) : (
                  <div className="space-y-2">
                    <Label htmlFor="file">Upload File</Label>
                    <div className="border-2 border-dashed border-gray-200 rounded-lg p-6 text-center">
                      <Input
                        id="file"
                        type="file"
                        className="hidden"
                        onChange={handleFileChange}
                        accept={
                          contentType === "photography" || contentType === "art"
                            ? "image/*"
                            : contentType === "video"
                              ? "video/*"
                              : undefined
                        }
                      />
                      <label htmlFor="file" className="flex flex-col items-center justify-center cursor-pointer">
                        <Upload className="h-10 w-10 text-gray-400 mb-2" />
                        <span className="text-sm font-medium">
                          {file ? file.name : "Click to upload or drag and drop"}
                        </span>
                        <span className="text-xs text-gray-500 mt-1">
                          {contentType === "photography" || contentType === "art"
                            ? "PNG, JPG or GIF up to 10MB"
                            : contentType === "video"
                              ? "MP4 or MOV up to 100MB"
                              : "Select a content type first"}
                        </span>
                      </label>
                    </div>
                  </div>
                )}
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button type="button" variant="outline">
                  Cancel
                </Button>
                <Button type="submit">Submit Content</Button>
              </CardFooter>
            </form>
          </Card>
        </div>

        <div>
          <Card>
            <CardHeader>
              <CardTitle>Submission Guidelines</CardTitle>
              <CardDescription>Please review our guidelines before submitting.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Alert>
                <Info className="h-4 w-4" />
                <AlertDescription>A flat fee of $5 will be charged for each submission.</AlertDescription>
              </Alert>

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
                  <li>No explicit or offensive material</li>
                  <li>No copyright infringement</li>
                  <li>Submissions are reviewed within 24 hours</li>
                </ul>
              </div>

              <div className="space-y-2">
                <h4 className="font-medium">Voting & Rewards</h4>
                <ul className="list-disc pl-5 text-sm text-gray-600 space-y-1">
                  <li>Voting period lasts for 7 days</li>
                  <li>Winners receive rewards in stablecoin</li>
                  <li>Rewards are distributed within 48 hours of contest end</li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
