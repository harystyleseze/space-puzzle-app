import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Rocket, Gamepad2, Trophy, Coins } from "lucide-react"

export default function GamePage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Space Puzzle Game</h1>
        <p className="text-muted-foreground">Play the game and earn rewards.</p>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <div className="md:col-span-2">
          <Card className="h-full">
            <CardHeader>
              <CardTitle>Game Area</CardTitle>
              <CardDescription>Launch the game to start playing.</CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col items-center justify-center h-80">
              <div className="bg-muted rounded-lg p-8 w-full h-full flex flex-col items-center justify-center">
                <Rocket className="h-16 w-16 text-primary mb-4" />
                <h3 className="text-xl font-bold mb-2">Ready to Play?</h3>
                <p className="text-center text-muted-foreground mb-4">
                  Launch the game to start your space puzzle adventure.
                </p>
                <Button size="lg">
                  <Gamepad2 className="mr-2 h-4 w-4" />
                  Launch Game
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Recent Achievements</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center">
                  <div className="h-9 w-9 rounded-full bg-primary/10 flex items-center justify-center mr-3">
                    <Trophy className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm font-medium">First Steps</p>
                    <p className="text-xs text-muted-foreground">Completed tutorial</p>
                  </div>
                </div>
                <div className="flex items-center">
                  <div className="h-9 w-9 rounded-full bg-primary/10 flex items-center justify-center mr-3">
                    <Trophy className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm font-medium">Tokenizer</p>
                    <p className="text-xs text-muted-foreground">First tokenization</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Game Stats</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="h-9 w-9 rounded-full bg-primary/10 flex items-center justify-center mr-3">
                      <Coins className="h-5 w-5 text-primary" />
                    </div>
                    <p className="text-sm font-medium">In-Game Keys</p>
                  </div>
                  <p className="font-bold">25</p>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="h-9 w-9 rounded-full bg-primary/10 flex items-center justify-center mr-3">
                      <Trophy className="h-5 w-5 text-primary" />
                    </div>
                    <p className="text-sm font-medium">Puzzles Completed</p>
                  </div>
                  <p className="font-bold">3</p>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="h-9 w-9 rounded-full bg-primary/10 flex items-center justify-center mr-3">
                      <Rocket className="h-5 w-5 text-primary" />
                    </div>
                    <p className="text-sm font-medium">Current Level</p>
                  </div>
                  <p className="font-bold">2</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

