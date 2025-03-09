"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { useWallet } from "@/hooks/use-wallet"
import { Gamepad2, Rocket, Trophy } from "lucide-react"
import Link from "next/link"
import { useState } from "react"

export default function GamePage() {
  const { isConnected } = useWallet()
  const [isLoading, setIsLoading] = useState(false)
  const [gameStarted, setGameStarted] = useState(false)

  const handleStartGame = () => {
    if (!isConnected) return

    setIsLoading(true)
    // Simulate game loading
    setTimeout(() => {
      setIsLoading(false)
      setGameStarted(true)
    }, 2000)
  }

  return (
    <div className="flex flex-col min-h-screen">
      <header className="border-b">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <Link href="/" className="flex items-center gap-2">
            <Rocket className="h-8 w-8 text-primary" />
            <span className="text-xl font-bold">Space Puzzle</span>
          </Link>
          <Link href="/dashboard">
            <Button variant="outline">Dashboard</Button>
          </Link>
        </div>
      </header>

      <main className="flex-1 container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">Space Puzzle Game</h1>

        {!isConnected ? (
          <Card>
            <CardHeader>
              <CardTitle>Connect Your Wallet</CardTitle>
              <CardDescription>Please connect your wallet to play the game.</CardDescription>
            </CardHeader>
            <CardContent className="flex justify-center">
              <Link href="/">
                <Button>Back to Home</Button>
              </Link>
            </CardContent>
          </Card>
        ) : gameStarted ? (
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Game Canvas</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="bg-muted rounded-lg aspect-video flex items-center justify-center">
                  <div className="text-center">
                    <Gamepad2 className="h-16 w-16 mx-auto mb-4 text-primary" />
                    <h3 className="text-xl font-bold mb-2">Game Started!</h3>
                    <p className="text-muted-foreground mb-4">This is a placeholder for the actual game canvas.</p>
                    <div className="flex justify-center gap-4">
                      <Button onClick={() => setGameStarted(false)}>Exit Game</Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="grid md:grid-cols-3 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-sm">Keys</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">25</div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle className="text-sm">Level</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">3</div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle className="text-sm">Score</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">1,250</div>
                </CardContent>
              </Card>
            </div>
          </div>
        ) : (
          <Card>
            <CardHeader>
              <CardTitle>Start Game</CardTitle>
              <CardDescription>Click the button below to start playing Space Puzzle.</CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col items-center">
              <div className="bg-muted rounded-lg p-8 w-full max-w-md flex flex-col items-center justify-center mb-6">
                <Trophy className="h-16 w-16 text-primary mb-4" />
                <h3 className="text-xl font-bold mb-2">Ready to Play?</h3>
                <p className="text-center text-muted-foreground mb-4">
                  Start your space puzzle adventure and earn rewards!
                </p>
              </div>
              <Button size="lg" onClick={handleStartGame} disabled={isLoading}>
                {isLoading ? (
                  <>Loading Game...</>
                ) : (
                  <>
                    <Gamepad2 className="mr-2 h-4 w-4" />
                    Start Game
                  </>
                )}
              </Button>
            </CardContent>
          </Card>
        )}
      </main>

      <footer className="border-t py-8">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center gap-2 mb-4 md:mb-0">
              <Rocket className="h-6 w-6 text-primary" />
              <span className="font-bold">Space Puzzle</span>
            </div>
            <div className="text-sm text-muted-foreground">
              &copy; {new Date().getFullYear()} Space Puzzle Game. All rights reserved.
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}

