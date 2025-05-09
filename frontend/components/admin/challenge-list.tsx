"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Edit, Trash2, Users, Award } from "lucide-react"
import Link from "next/link"
import { Badge } from "../ui/badge"

interface Challenge {
  id: string
  title: string
  description: string
  category: string
  entryFee: number
  startDate: string | Date
  endDate: string | Date
  adminCommission: number
  status: string
  createdAt: string | Date
  submissions?: number
}

export default function ChallengeList() {
  const [challenges, setChallenges] = useState<Challenge[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchChallenges = () => {
      try {
        const storedChallenges = JSON.parse(localStorage.getItem("challenges") || "[]")
        const formattedChallenges = storedChallenges.map((challenge: any) => ({
          ...challenge,
          startDate: new Date(challenge.startDate),
          endDate: new Date(challenge.endDate),
          createdAt: new Date(challenge.createdAt),
          submissions: Math.floor(Math.random() * 10),
        }))

        setChallenges(formattedChallenges)
      } catch (error) {
        console.error("Failed to fetch challenges:", error)
        setChallenges([])
      } finally {
        setLoading(false)
      }
    }

    fetchChallenges()
  }, [])

  const handleDeleteChallenge = (id: string) => {
    if (confirm("Are you sure you want to delete this challenge?")) {
      const updatedChallenges = challenges.filter((challenge) => challenge.id !== id)
      localStorage.setItem("challenges", JSON.stringify(updatedChallenges))
      setChallenges(updatedChallenges)
    }
  }

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "music":
        return "bg-blue-100 text-blue-800"
      case "photography":
        return "bg-green-100 text-green-800"
      case "video":
        return "bg-purple-100 text-purple-800"
      case "art":
        return "bg-orange-100 text-orange-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-100 text-green-800"
      case "upcoming":
        return "bg-blue-100 text-blue-800"
      case "completed":
        return "bg-gray-100 text-gray-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const formatDate = (date: Date | string) => {
    const d = new Date(date)
    return `${d.getMonth() + 1}/${d.getDate()}/${d.getFullYear()}`
  }

  if (loading) {
    return <div className="text-center py-8">Loading challenges...</div>
  }

  if (challenges.length === 0) {
    return (
      <Card>
        <CardContent className="p-6">
          <div className="text-center py-8">
            <p className="text-gray-500 mb-4">No challenges created yet.</p>
            <p className="text-gray-500">Create your first challenge to get started!</p>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="space-y-6">
      {challenges.map((challenge) => (
        <Card key={challenge.id} className="overflow-hidden">
          <div className="border-l-4 border-primary p-6">
            <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-4">
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <h3 className="text-xl font-semibold">{challenge.title}</h3>
                  <Badge className={getCategoryColor(challenge.category)}>
                    {challenge.category.charAt(0).toUpperCase() + challenge.category.slice(1)}
                  </Badge>
                  <Badge className={getStatusColor(challenge.status)}>
                    {challenge.status.charAt(0).toUpperCase() + challenge.status.slice(1)}
                  </Badge>
                </div>
                <p className="text-gray-600 line-clamp-2">{challenge.description}</p>
                <div className="flex flex-wrap gap-4 text-sm text-gray-500">
                  <div className="flex items-center">
                    <span className="font-medium">Entry Fee:</span>
                    <span className="ml-1">${challenge.entryFee.toFixed(2)}</span>
                  </div>
                  <div className="flex items-center">
                    <span className="font-medium">Commission:</span>
                    <span className="ml-1">{challenge.adminCommission}%</span>
                  </div>
                  <div className="flex items-center">
                    <span className="font-medium">Duration:</span>
                    <span className="ml-1">
                      {formatDate(challenge.startDate)} - {formatDate(challenge.endDate)}
                    </span>
                  </div>
                </div>
              </div>
              <div className="flex flex-wrap gap-2">
                <Link href={`/admin/challenges/${challenge.id}/submissions`}>
                  <Button variant="outline" size="sm" className="flex items-center gap-1">
                    <Users className="h-4 w-4" />
                    <span>Submissions ({challenge.submissions})</span>
                  </Button>
                </Link>
                <Link href={`/admin/challenges/${challenge.id}/results`}>
                  <Button variant="outline" size="sm" className="flex items-center gap-1">
                    <Award className="h-4 w-4" />
                    <span>Results</span>
                  </Button>
                </Link>
                <Button variant="outline" size="sm" className="flex items-center gap-1">
                  <Edit className="h-4 w-4" />
                  <span>Edit</span>
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="flex items-center gap-1 text-red-600 hover:text-red-700 hover:bg-red-50"
                  onClick={() => handleDeleteChallenge(challenge.id)}
                >
                  <Trash2 className="h-4 w-4" />
                  <span>Delete</span>
                </Button>
              </div>
            </div>
          </div>
        </Card>
      ))}
    </div>
  )
}
