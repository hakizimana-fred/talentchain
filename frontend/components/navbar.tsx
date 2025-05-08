"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Menu, X, User } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isConnected, setIsConnected] = useState(false)
  const [walletAddress, setWalletAddress] = useState("")

  useEffect(() => {
    // Check if wallet is connected on component mount
    const savedWallet = localStorage.getItem("walletAddress")
    if (savedWallet) {
      setIsConnected(true)
      setWalletAddress(savedWallet)
    }

    // Listen for wallet connection changes
    const checkWalletConnection = () => {
      const savedWallet = localStorage.getItem("walletAddress")
      setIsConnected(!!savedWallet)
      setWalletAddress(savedWallet || "")
    }

    window.addEventListener("storage", checkWalletConnection)

    return () => {
      window.removeEventListener("storage", checkWalletConnection)
    }
  }, [])

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  const handleDisconnect = () => {
    localStorage.removeItem("walletAddress")
    setIsConnected(false)
    setWalletAddress("")
  }

  const truncateAddress = (address: string) => {
    if (!address) return ""
    return `${address.slice(0, 6)}...${address.slice(-4)}`
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
            <Link href="/explore" className="text-gray-600 hover:text-gray-900 px-3 py-2 text-sm font-medium">
              Explore
            </Link>
            <Link href="/upload" className="text-gray-600 hover:text-gray-900 px-3 py-2 text-sm font-medium">
              Upload
            </Link>
            <Link href="/leaderboard" className="text-gray-600 hover:text-gray-900 px-3 py-2 text-sm font-medium">
              Leaderboard
            </Link>

            {isConnected ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span>{truncateAddress(walletAddress)}</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem asChild>
                    <Link href="/profile" className="cursor-pointer">
                      <User className="mr-2 h-4 w-4" />
                      Profile
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={handleDisconnect} className="cursor-pointer">
                    Disconnect
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Link href="/login">
                <Button className="bg-gray-800 text-white hover:bg-gray-700">Connect Wallet</Button>
              </Link>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="flex items-center sm:hidden">
            <button
              type="button"
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-600 hover:text-gray-900 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-gray-500"
              aria-controls="mobile-menu"
              aria-expanded="false"
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

      {/* Mobile menu, show/hide based on menu state */}
      {isMenuOpen && (
        <div className="sm:hidden" id="mobile-menu">
          <div className="px-2 pt-2 pb-3 space-y-1">
            <Link
              href="/"
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-100"
              onClick={toggleMenu}
            >
              Home
            </Link>
            <Link
              href="/explore"
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-100"
              onClick={toggleMenu}
            >
              Explore
            </Link>
            <Link
              href="/upload"
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-100"
              onClick={toggleMenu}
            >
              Upload
            </Link>
            <Link
              href="/leaderboard"
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-100"
              onClick={toggleMenu}
            >
              Leaderboard
            </Link>

            {isConnected ? (
              <div className="px-3 py-2">
                <div className="flex items-center gap-2 text-sm font-medium mb-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span>{truncateAddress(walletAddress)}</span>
                </div>
                <div className="flex flex-col space-y-2">
                  <Link
                    href="/profile"
                    className="block px-3 py-2 rounded-md text-sm font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-100"
                    onClick={toggleMenu}
                  >
                    Profile
                  </Link>
                  <button
                    onClick={() => {
                      handleDisconnect()
                      toggleMenu()
                    }}
                    className="block px-3 py-2 rounded-md text-sm font-medium text-red-600 hover:text-red-700 hover:bg-red-50 text-left"
                  >
                    Disconnect
                  </button>
                </div>
              </div>
            ) : (
              <Link
                href="/login"
                className="block px-3 py-2 rounded-md text-base font-medium bg-gray-800 text-white hover:bg-gray-700"
                onClick={toggleMenu}
              >
                Connect Wallet
              </Link>
            )}
          </div>
        </div>
      )}
    </nav>
  )
}

export default Navbar
