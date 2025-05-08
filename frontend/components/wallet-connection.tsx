"use client"

import { useState } from "react"

// Extend the Window interface to include the ethereum property
declare global {
  interface Window {
    ethereum?: {
      isMetaMask?: boolean
      isCoinbaseWallet?: boolean
      request: (request: { method: string; params?: any[] }) => Promise<any>
      on: (event: string, callback: (...args: any[]) => void) => void
      removeListener: (event: string, callback: (...args: any[]) => void) => void
      selectedAddress?: string
    }
  }
}
import { Button } from "@/components/ui/button"
import { Loader2 } from "lucide-react"

interface WalletConnectionProps {
  onConnect: (address: string) => void
}

export function WalletConnection({ onConnect }: WalletConnectionProps) {
  const [isConnecting, setIsConnecting] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const connectWallet = async () => {
    setIsConnecting(true)
    setError(null)

    try {
      // Check if window.ethereum exists (MetaMask, Coinbase Wallet, etc.)
      if (typeof window !== "undefined" && window.ethereum) {
        // Request account access
        const accounts = await window.ethereum.request({ method: "eth_requestAccounts" })

        if (accounts.length > 0) {
          // Get the first account
          const address = accounts[0]
          onConnect(address)
        } else {
          setError("No accounts found. Please create an account in your wallet.")
        }
      } else {
        // If window.ethereum is not found, suggest installing Coinbase Wallet
        setError("Coinbase Wallet not detected. Please install the extension or mobile app.")
        window.open("https://www.coinbase.com/wallet", "_blank")
      }
    } catch (err: any) {
      console.error("Error connecting wallet:", err)
      setError(err.message || "Failed to connect wallet. Please try again.")
    } finally {
      setIsConnecting(false)
    }
  }

  return (
    <div className="space-y-4">
      <Button onClick={connectWallet} className="w-full flex items-center justify-center gap-2" disabled={isConnecting}>
        {isConnecting ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin" />
            Connecting...
          </>
        ) : (
          "Connect Coinbase Wallet"
        )}
      </Button>

      {error && <div className="text-sm text-red-500 text-center">{error}</div>}
    </div>
  )
}
