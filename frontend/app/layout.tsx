import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import Providers from "./Providers"
import { headers } from "next/headers";

const inter = Inter({ subsets: ["latin"] })
export const metadata: Metadata = {
  title: "CreatorSpot - Discover New Talent",
  description:
    "Platform for upcoming content creators, musicians, artists, photographers and videographers",
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const headersList = await headers();
  const cookie = headersList.get("cookie");

  return (
    <html lang="en">
      <body className={inter.className}>
            <div className="flex flex-col min-h-screen">
              <Navbar />
              <main className="flex-grow">
                <Providers cookie={cookie}>
                  {children}
                </Providers>
              </main>
              <Footer />
            </div>
      </body>
    </html>
  )
}
