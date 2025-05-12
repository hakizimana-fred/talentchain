"use client"

import { useEffect, useRef, useState } from "react"
import Link from "next/link"
import { Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  useConnectModal,
  useAccountModal,
  useChainModal,
} from "@rainbow-me/rainbowkit"
import { useAccount, useDisconnect } from "wagmi"
import { emojiAvatarForAddress } from "@/lib/emojiAvatarForAddress"

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const isMounted = useRef(false)

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen)

  const { isConnecting, address, isConnected, chain } = useAccount()
  const { openConnectModal } = useConnectModal()
  const { openAccountModal } = useAccountModal()
  const { openChainModal } = useChainModal()
  const { disconnect } = useDisconnect()

  const { emoji, color: backgroundColor } = emojiAvatarForAddress(address ?? "")

  useEffect(() => {
    isMounted.current = true
  }, [])

  const handleConnectClick = async () => {
    if (isConnected) disconnect()
    openConnectModal?.()
  }

  return (
    <nav className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link href="/" className="flex-shrink-0 flex items-center">
              <span className="text-xl font-bold text-gray-800">CreatorSpot</span>
            </Link>
          </div>

          {/* Desktop menu */}
          <div className="hidden sm:ml-6 sm:flex sm:items-center sm:space-x-8">
            <Link href="/" className="text-gray-600 hover:text-gray-900 px-3 py-2 text-sm font-medium">
              Home
            </Link>
            <Link href="/challenges" className="text-gray-600 hover:text-gray-900 px-3 py-2 text-sm font-medium">
              Challenges
            </Link>
            <Link href="/explore" className="text-gray-600 hover:text-gray-900 px-3 py-2 text-sm font-medium">
              Vote
            </Link>
            <Link href="/upload" className="text-gray-600 hover:text-gray-900 px-3 py-2 text-sm font-medium">
              Upload
            </Link>
            <Link href="/leaderboard" className="text-gray-600 hover:text-gray-900 px-3 py-2 text-sm font-medium">
              Leaderboard
            </Link>

            {isConnected ? (
              <div className="flex items-center space-x-2">
                <button
                  onClick={openAccountModal}
                  className="flex items-center px-3 py-2 rounded-md text-sm font-medium bg-gray-100 text-gray-800 hover:bg-gray-200"
                >
                  <span
                    className="h-6 w-6 rounded-full flex items-center justify-center text-lg"
                    style={{ backgroundColor, marginRight: '8px' }}
                  >
                    {emoji}
                  </span>
                  Account
                </button>
                <Button onClick={openChainModal}>
                  {chain?.name ?? 'Wrong Network'}
                </Button>
              </div>
            ) : (
              <Button onClick={handleConnectClick} disabled={isConnecting}>
                {isConnecting ? "Connecting..." : "Connect Wallet"}
              </Button>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="flex items-center sm:hidden">
            <button
              type="button"
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-600 hover:text-gray-900 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-gray-500"
              aria-controls="mobile-menu"
              aria-expanded={isMenuOpen}
              onClick={toggleMenu}
            >
              <span className="sr-only">Open main menu</span>
              {isMenuOpen ? (
                <X className="block h-6 w-6" aria-hidden="true" />
              ) : (
                <Menu className="block h-6 w-6" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="sm:hidden" id="mobile-menu">
          <div className="px-2 pt-2 pb-3 space-y-1">
            {["Home", "Challenges", "Vote", "Upload", "Leaderboard"].map((label) => (
              <Link
                key={label}
                href={`/${label.toLowerCase() === "home" ? "" : label.toLowerCase()}`}
                className="block px-3 py-2 rounded-md text-base font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-100"
                onClick={toggleMenu}
              >
                {label}
              </Link>
            ))}

            <div className="px-3 py-2">
              <Button
                className="w-full"
                onClick={() => {
                  toggleMenu()
                  handleConnectClick()
                }}
              >
                {isConnected ? "Connected" : "Connect Wallet"}
              </Button>
            </div>
          </div>
        </div>
      )}
    </nav>
  )
}

export default Navbar
