"use client"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import React, { useState, useEffect } from "react"

import { Contract, ethers } from 'ethers';
import { talentChainAbi } from "../constants/ABI"
import { CONTRACT_ADDRESS } from "../constants"

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

interface IProps  {
  name: string
  description: string
  url: string,
  entryFee: number
  endDate: string
}

export default function UploadPage() {
  const [challenge, setChallenge] = React.useState<IProps>({name: '', description: '', url: '', entryFee: 0, endDate: ''});

  const handleChallengeChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setChallenge({...challenge, [event.target.name]: event.target.value});
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

  const {name, description, url } = challenge

  const handleSubmit = async(event: React.FormEvent<HTMLFormElement>) => {
     
    event.preventDefault();
    // const formData = new FormData(event.currentTarget);
    // const selectedChallengeId = formData.get("challenge");
    // const title = formData.get("title");
    // const description = formData.get("description");
    // const file = formData.get("file");

    // Handle the submission logic here
    if (!challenge.name || !challenge.description || !challenge.url) {
      alert("Please fill in all fields");
      return;
    }

    try {
    const contract = await getContract();
    const tx = await contract.createCompetition(name, description, url);
    await tx.wait(); // Wait for it to be mined
    alert("Competition created!");
    setChallenge({})
    }catch(e)  {
      console.error("Error creating competition:", e);
    }
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
                  <Input name="name" value={name} onChange={handleChallengeChange} id="name" placeholder="Enter a title for your content" />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea name="description" onChange={handleChallengeChange} value={description} id="description" placeholder="Describe your content" rows={4} />
                </div>

                {/* <div className="space-y-2">
                  <Label htmlFor="file">Upload File</Label>
                  <Input id="file" type="file" />
                </div> */}
                 <div className="space-y-2">
                  <Label htmlFor="url">URL</Label>
                  <Input name="url" value={url} onChange={handleChallengeChange} id="title" placeholder="Enter URL for your content" />
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
