"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import ContentGrid from "@/components/content-grid"

export default function ProfilePage() {
  const router = useRouter()
  const [walletAddress, setWalletAddress] = useState<string | null>(null)

  useEffect(() => {
    // Check if wallet is connected
    const savedWallet = localStorage.getItem("walletAddress")
    if (savedWallet) {
      setWalletAddress(savedWallet)
    } else {
      // Redirect to login if not connected
      router.push("/login")
    }
  }, [router])

  if (!walletAddress) {
    return (
      <div className="container mx-auto px-4 py-8 flex justify-center items-center min-h-[60vh]">
        <p>Loading profile...</p>
      </div>
    )
  }

  const truncateAddress = (address: string) => {
    return `${address.slice(0, 6)}...${address.slice(-4)}`
  }

  return (
    <div className="container mx-auto px-4 py-8 md:py-12">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-1">
          <Card>
            <CardHeader>
              <div className="flex justify-center mb-4">
                <div className="relative w-24 h-24 rounded-full overflow-hidden bg-gray-100">
                  <Image src="/placeholder.svg?height=96&width=96" alt="Profile" fill className="object-cover" />
                </div>
              </div>
              <CardTitle className="text-center">Your Profile</CardTitle>
              <CardDescription className="text-center">Manage your account and content</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="p-3 bg-gray-50 rounded-lg">
                  <p className="text-sm text-gray-500 mb-1">Wallet Address</p>
                  <p className="font-mono text-sm break-all">{walletAddress}</p>
                </div>

                <div className="grid grid-cols-2 gap-4 text-center">
                  <div className="p-3 bg-gray-50 rounded-lg">
                    <p className="text-sm text-gray-500">Submissions</p>
                    <p className="text-xl font-semibold">3</p>
                  </div>
                  <div className="p-3 bg-gray-50 rounded-lg">
                    <p className="text-sm text-gray-500">Votes Received</p>
                    <p className="text-xl font-semibold">127</p>
                  </div>
                </div>

                <Button className="w-full">Edit Profile</Button>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="md:col-span-2">
          <Tabs defaultValue="submissions">
            <TabsList className="w-full grid grid-cols-3">
              <TabsTrigger value="submissions">My Submissions</TabsTrigger>
              <TabsTrigger value="votes">My Votes</TabsTrigger>
              <TabsTrigger value="rewards">Rewards</TabsTrigger>
            </TabsList>

            <TabsContent value="submissions" className="mt-6">
              <h3 className="text-xl font-semibold mb-4">Your Submissions</h3>
              <ContentGrid category="profile" />
            </TabsContent>

            <TabsContent value="votes" className="mt-6">
              <h3 className="text-xl font-semibold mb-4">Content You've Voted For</h3>
              <p className="text-gray-500">You haven't voted for any content yet.</p>
            </TabsContent>

            <TabsContent value="rewards" className="mt-6">
              <h3 className="text-xl font-semibold mb-4">Your Rewards</h3>
              <Card>
                <CardContent className="p-6">
                  <div className="text-center py-8">
                    <p className="text-gray-500 mb-4">You haven't received any rewards yet.</p>
                    <Button variant="outline" asChild>
                      <a href="/explore">Explore Content</a>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  )
}
