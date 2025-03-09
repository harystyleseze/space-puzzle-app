"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useWallet } from "@/hooks/use-wallet"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useState } from "react"
import { useContracts } from "@/hooks/use-contracts"

export default function AdminPage() {
  const { isConnected } = useWallet()
  const { contracts } = useContracts()
  const [mintAddress, setMintAddress] = useState("")
  const [mintAmount, setMintAmount] = useState("")
  const [baseReward, setBaseReward] = useState("")
  const [maxConsecutiveDays, setMaxConsecutiveDays] = useState("")

  if (!isConnected) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Connect Wallet</CardTitle>
          <CardDescription>Please connect your wallet to access admin functions.</CardDescription>
        </CardHeader>
      </Card>
    )
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Admin Dashboard</h1>
        <p className="text-muted-foreground">Manage game tokens, rewards, and achievements.</p>
      </div>

      <Tabs defaultValue="tokens" className="space-y-6">
        <TabsList>
          <TabsTrigger value="tokens">Token Management</TabsTrigger>
          <TabsTrigger value="rewards">Reward Configuration</TabsTrigger>
          <TabsTrigger value="achievements">Achievements</TabsTrigger>
          <TabsTrigger value="users">User Management</TabsTrigger>
        </TabsList>

        <TabsContent value="tokens" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Token Management</CardTitle>
              <CardDescription>Mint and burn tokens, manage token supply.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium">Mint Tokens</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="mint-address">Player Address</Label>
                        <Input
                          id="mint-address"
                          placeholder="0x..."
                          value={mintAddress}
                          onChange={(e) => setMintAddress(e.target.value)}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="mint-amount">Amount</Label>
                        <Input
                          id="mint-amount"
                          type="number"
                          placeholder="Enter amount"
                          value={mintAmount}
                          onChange={(e) => setMintAmount(e.target.value)}
                          min="1"
                        />
                      </div>
                      <Button className="w-full" disabled={!contracts || !mintAddress || !mintAmount}>
                        Mint Tokens
                      </Button>
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium">Burn Tokens</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="burn-address">Player Address</Label>
                        <Input id="burn-address" placeholder="0x..." />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="burn-amount">Amount</Label>
                        <Input id="burn-amount" type="number" placeholder="Enter amount" min="1" />
                      </div>
                      <Button className="w-full" disabled={!contracts}>
                        Burn Tokens
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="rewards" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Reward Configuration</CardTitle>
              <CardDescription>Configure daily rewards and consecutive day multipliers.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium">Base Reward</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="base-reward">Base Reward Amount</Label>
                        <Input
                          id="base-reward"
                          type="number"
                          placeholder="Enter amount"
                          value={baseReward}
                          onChange={(e) => setBaseReward(e.target.value)}
                          min="1"
                        />
                      </div>
                      <Button className="w-full" disabled={!contracts || !baseReward}>
                        Set Base Reward
                      </Button>
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium">Max Consecutive Days</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="max-days">Maximum Days</Label>
                        <Input
                          id="max-days"
                          type="number"
                          placeholder="Enter number of days"
                          value={maxConsecutiveDays}
                          onChange={(e) => setMaxConsecutiveDays(e.target.value)}
                          min="1"
                        />
                      </div>
                      <Button className="w-full" disabled={!contracts || !maxConsecutiveDays}>
                        Set Max Days
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="achievements" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Achievement Management</CardTitle>
              <CardDescription>Create and manage achievements.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium">Create Achievement</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="achievement-name">Name</Label>
                        <Input id="achievement-name" placeholder="Achievement name" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="achievement-description">Description</Label>
                        <Input id="achievement-description" placeholder="Achievement description" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="achievement-rarity">Rarity (1-5)</Label>
                        <Input id="achievement-rarity" type="number" placeholder="Enter rarity level" min="1" max="5" />
                      </div>
                      <Button className="w-full" disabled={!contracts}>
                        Create Achievement
                      </Button>
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium">Unlock Achievement</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="unlock-address">Player Address</Label>
                        <Input id="unlock-address" placeholder="0x..." />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="achievement-id">Achievement ID</Label>
                        <Input id="achievement-id" type="number" placeholder="Enter achievement ID" min="1" />
                      </div>
                      <Button className="w-full" disabled={!contracts}>
                        Unlock Achievement
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="users" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>User Management</CardTitle>
              <CardDescription>Manage user roles and permissions.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium">Grant Role</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="grant-address">User Address</Label>
                        <Input id="grant-address" placeholder="0x..." />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="role-type">Role</Label>
                        <select
                          id="role-type"
                          className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                        >
                          <option value="admin">Admin</option>
                          <option value="game">Game</option>
                          <option value="minter">Minter</option>
                        </select>
                      </div>
                      <Button className="w-full" disabled={!contracts}>
                        Grant Role
                      </Button>
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium">Revoke Role</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="revoke-address">User Address</Label>
                        <Input id="revoke-address" placeholder="0x..." />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="revoke-role">Role</Label>
                        <select
                          id="revoke-role"
                          className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                        >
                          <option value="admin">Admin</option>
                          <option value="game">Game</option>
                          <option value="minter">Minter</option>
                        </select>
                      </div>
                      <Button className="w-full" disabled={!contracts}>
                        Revoke Role
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

