import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import WagmiWrapper from "@/components/providers"

const inter = Inter({ subsets: ["latin"] })
export const metadata: Metadata = {
  title: "CreatorSpot - Discover New Talent",
  description:
    "Platform for upcoming content creators, musicians, artists, photographers and videographers",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
      <WagmiWrapper>
            <div className="flex flex-col min-h-screen">
              <Navbar />
              <main className="flex-grow">{children}</main>
              <Footer />
            </div>
            </WagmiWrapper>
      </body>
    </html>
  )
}
