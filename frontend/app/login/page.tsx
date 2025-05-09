"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import WalletConnect from "@/components/wallet-connection"

export default function LoginPage() {
  const [isConnected, setIsConnected] = useState(false)
  const [walletAddress, setWalletAddress] = useState("")

  useEffect(() => {
    const checkConnection = async () => {
      try {
        const savedWallet = localStorage.getItem("walletAddress")
        if (savedWallet) {
          setIsConnected(true)
          setWalletAddress(savedWallet)
        }
      } catch (error) {
        console.error("Failed to check wallet connection:", error)
      }
    }

    checkConnection()
  }, [])

  const handleDisconnect = () => {
    localStorage.removeItem("walletAddress")
    setIsConnected(false)
    setWalletAddress("")
  }

  return (
    <div className="container mx-auto flex items-center justify-center min-h-[calc(100vh-200px)] px-4 py-8">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-center">Welcome to CreatorSpot</CardTitle>
          <CardDescription className="text-center">Connect your Coinbase Wallet to join our community</CardDescription>
        </CardHeader>

        <CardContent className="space-y-6">
          {isConnected ? (
            <div className="space-y-4 text-center">
              <div className="flex justify-center">
                <div className="bg-green-100 text-green-700 rounded-full px-4 py-2 flex items-center">
                  <div className="w-3 h-3 bg-green-500 rounded-full mr-2"></div>
                  Connected
                </div>
              </div>

              <div className="p-4 bg-gray-50 rounded-lg">
                <p className="text-sm text-gray-600 mb-1">Wallet Address</p>
                <p className="font-mono text-sm break-all">{walletAddress}</p>
              </div>

              <Button onClick={handleDisconnect} variant="outline" className="w-full">
                Disconnect Wallet
              </Button>

              <div className="pt-4">
                <Link href="/explore">
                  <Button className="w-full">Continue to Platform</Button>
                </Link>
              </div>
            </div>
          ) : (
            <div className="space-y-6">
              <div className="flex justify-center">
                <Image
                  src="/placeholder.svg?height=100&width=100"
                  alt="Coinbase Wallet"
                  width={100}
                  height={100}
                  className="rounded-lg"
                />
              </div>

              <div className="space-y-2">
                <WalletConnect                  
                />

                <p className="text-xs text-center text-gray-500 mt-2">
                  You'll be prompted to connect your Coinbase Wallet
                </p>
              </div>
            </div>
          )}
        </CardContent>

        <div className="px-6 pb-6 pt-2 text-center text-sm text-gray-600">
          By connecting your wallet, you agree to our{" "}
          <Link href="/terms" className="underline hover:text-gray-900">
            Terms of Service
          </Link>{" "}
          and{" "}
          <Link href="/privacy" className="underline hover:text-gray-900">
            Privacy Policy
          </Link>
        </div>
      </Card>
    </div>
  )
}
