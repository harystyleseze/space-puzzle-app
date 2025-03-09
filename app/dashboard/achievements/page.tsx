"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { useContracts } from "@/hooks/use-contracts"
import { useWallet } from "@/hooks/use-wallet"
import { Loader2, Trophy, Lock } from "lucide-react"

// Sample achievement data (would come from the contract in production)
const sampleAchievements = [
  {
    id: 1,
    name: "First Steps",
    description: "Complete the tutorial",
    rarity: 1,
    unlocked: true,
    image: "/placeholder.svg?height=100&width=100",
  },
  {
    id: 2,
    name: "Puzzle Master",
    description: "Complete 10 puzzles",
    rarity: 2,
    unlocked: false,
    image: "/placeholder.svg?height=100&width=100",
  },
  {
    id: 3,
    name: "Key Collector",
    description: "Collect 100 keys",
    rarity: 2,
    unlocked: false,
    image: "/placeholder.svg?height=100&width=100",
  },
  {
    id: 4,
    name: "Daily Devotee",
    description: "Claim rewards for 7 consecutive days",
    rarity: 3,
    unlocked: false,
    image: "/placeholder.svg?height=100&width=100",
  },
  {
    id: 5,
    name: "Space Explorer",
    description: "Explore all game areas",
    rarity: 4,
    unlocked: false,
    image: "/placeholder.svg?height=100&width=100",
  },
  {
    id: 6,
    name: "Tokenizer",
    description: "Tokenize keys for the first time",
    rarity: 1,
    unlocked: true,
    image: "/placeholder.svg?height=100&width=100",
  },
]

// Helper function to get rarity label and color
function getRarityInfo(rarity: number) {
  switch (rarity) {
    case 1:
      return { label: "Common", color: "bg-green-100 text-green-800" }
    case 2:
      return { label: "Uncommon", color: "bg-blue-100 text-blue-800" }
    case 3:
      return { label: "Rare", color: "bg-purple-100 text-purple-800" }
    case 4:
      return { label: "Epic", color: "bg-yellow-100 text-yellow-800" }
    case 5:
      return { label: "Legendary", color: "bg-red-100 text-red-800" }
    default:
      return { label: "Unknown", color: "bg-gray-100 text-gray-800" }
  }
}

export default function AchievementsPage() {
  const { address, isConnected } = useWallet()
  const { contracts, isLoading, error } = useContracts()
  const [achievements, setAchievements] = useState(sampleAchievements)
  const [isLoadingAchievements, setIsLoadingAchievements] = useState(false)

  // In a real app, this would fetch achievements from the contract
  useEffect(() => {
    const fetchAchievements = async () => {
      if (!contracts || !address || !isConnected) return

      try {
        setIsLoadingAchievements(true)
        // This would be replaced with actual contract calls
        // const playerAchievements = await contracts.getPlayerAchievements(address);
        // Process the achievements data

        // For now, we'll use the sample data
        setTimeout(() => {
          setIsLoadingAchievements(false)
        }, 1000)
      } catch (err) {
        console.error("Failed to fetch achievements:", err)
        setIsLoadingAchievements(false)
      }
    }

    fetchAchievements()
  }, [contracts, address, isConnected])

  if (isLoading || isLoadingAchievements) {
    return (
      <div className="flex justify-center items-center h-64">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    )
  }

  if (error) {
    return <div className="p-4 border border-destructive text-destructive rounded-md">{error}</div>
  }

  if (!isConnected) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Connect Wallet</CardTitle>
          <CardDescription>Please connect your wallet to view achievements.</CardDescription>
        </CardHeader>
      </Card>
    )
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Achievements</h1>
        <p className="text-muted-foreground">View your unlocked achievements and progress.</p>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {achievements.map((achievement) => {
          const rarityInfo = getRarityInfo(achievement.rarity)

          return (
            <Card key={achievement.id} className={achievement.unlocked ? "" : "opacity-75"}>
              <CardHeader className="pb-2">
                <div className="flex justify-between items-start">
                  <CardTitle className="text-lg">{achievement.name}</CardTitle>
                  <Badge className={rarityInfo.color}>{rarityInfo.label}</Badge>
                </div>
                <CardDescription>{achievement.description}</CardDescription>
              </CardHeader>
              <CardContent className="flex justify-center py-4">
                <div className="relative w-24 h-24 flex items-center justify-center bg-muted rounded-lg">
                  {achievement.unlocked ? (
                    <Trophy className="h-12 w-12 text-primary" />
                  ) : (
                    <>
                      <Trophy className="h-12 w-12 text-muted-foreground opacity-50" />
                      <div className="absolute inset-0 flex items-center justify-center bg-background/50 rounded-lg">
                        <Lock className="h-8 w-8 text-muted-foreground" />
                      </div>
                    </>
                  )}
                </div>
              </CardContent>
              <CardFooter className="pt-0">
                <div className="w-full text-center text-sm">
                  {achievement.unlocked ? (
                    <span className="text-green-600 font-medium">Unlocked</span>
                  ) : (
                    <span className="text-muted-foreground">Locked</span>
                  )}
                </div>
              </CardFooter>
            </Card>
          )
        })}
      </div>
    </div>
  )
}

