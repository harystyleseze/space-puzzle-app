"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useContracts } from "@/hooks/use-contracts"
import { useWallet } from "@/hooks/use-wallet"
import { Loader2 } from "lucide-react"

export default function TokensPage() {
  const { address, isConnected } = useWallet()
  const { contracts, isLoading, error } = useContracts()

  const [tokenizeAmount, setTokenizeAmount] = useState<string>("")
  const [detokenizeAmount, setDetokenizeAmount] = useState<string>("")
  const [isTokenizing, setIsTokenizing] = useState(false)
  const [isDetokenizing, setIsDetokenizing] = useState(false)
  const [isClaiming, setIsClaiming] = useState(false)
  const [keyBalance, setKeyBalance] = useState<string>("0")
  const [canClaim, setCanClaim] = useState(false)
  const [nextReward, setNextReward] = useState<string>("0")
  const [consecutiveDays, setConsecutiveDays] = useState<string>("0")

  useEffect(() => {
    if (contracts && address && isConnected) {
      updateKeyBalance()
      updateRewardData()
    }
  }, [contracts, address, isConnected])

  const handleTokenize = async () => {
    if (!contracts || !address || !tokenizeAmount) return

    try {
      setIsTokenizing(true)
      const tx = await contracts.tokenizeKeys(Number.parseInt(tokenizeAmount))
      await tx.wait()
      // Update balance after tokenizing
      await updateKeyBalance()
      setTokenizeAmount("")
    } catch (err) {
      console.error("Failed to tokenize keys:", err)
    } finally {
      setIsTokenizing(false)
    }
  }

  const handleDetokenize = async () => {
    if (!contracts || !address || !detokenizeAmount) return

    try {
      setIsDetokenizing(true)
      const tx = await contracts.detokenizeKeys(Number.parseInt(detokenizeAmount))
      await tx.wait()
      // Update balance after detokenizing
      await updateKeyBalance()
      setDetokenizeAmount("")
    } catch (err) {
      console.error("Failed to detokenize keys:", err)
    } finally {
      setIsDetokenizing(false)
    }
  }

  const handleClaimReward = async () => {
    if (!contracts || !address) return

    try {
      setIsClaiming(true)
      const tx = await contracts.claimDailyReward()
      await tx.wait()
      // Update data after claiming
      await updateRewardData()
      await updateKeyBalance()
    } catch (err) {
      console.error("Failed to claim reward:", err)
    } finally {
      setIsClaiming(false)
    }
  }

  const updateKeyBalance = async () => {
    if (!contracts || !address) return

    try {
      const balance = await contracts.getKeyBalance(address)
      setKeyBalance(balance.toString())
    } catch (err) {
      console.error("Failed to get key balance:", err)
    }
  }

  const updateRewardData = async () => {
    if (!contracts || !address) return

    try {
      const canClaimReward = await contracts.canClaimReward(address)
      setCanClaim(canClaimReward)

      const nextRewardAmount = await contracts.getNextRewardAmount(address)
      setNextReward(nextRewardAmount.toString())

      const days = await contracts.getConsecutiveDays(address)
      setConsecutiveDays(days.toString())
    } catch (err) {
      console.error("Failed to get reward data:", err)
    }
  }

  if (isLoading) {
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
          <CardDescription>Please connect your wallet to manage tokens.</CardDescription>
        </CardHeader>
      </Card>
    )
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Token Management</h1>
        <p className="text-muted-foreground">Manage your KEY tokens and claim daily rewards.</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Tokenize Keys</CardTitle>
            <CardDescription>Convert your in-game keys to KEY tokens.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="tokenize-amount">Amount</Label>
                <Input
                  id="tokenize-amount"
                  type="number"
                  placeholder="Enter amount (1-100)"
                  value={tokenizeAmount}
                  onChange={(e) => setTokenizeAmount(e.target.value)}
                  min="1"
                  max="100"
                />
                <p className="text-sm text-muted-foreground">Limits: 1-100 keys per transaction. Cooldown: 1 hour.</p>
              </div>
              <Button onClick={handleTokenize} disabled={isTokenizing || !tokenizeAmount} className="w-full">
                {isTokenizing ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Tokenizing...
                  </>
                ) : (
                  "Tokenize Keys"
                )}
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Detokenize Keys</CardTitle>
            <CardDescription>Convert your KEY tokens back to in-game keys.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="detokenize-amount">Amount</Label>
                <Input
                  id="detokenize-amount"
                  type="number"
                  placeholder="Enter amount"
                  value={detokenizeAmount}
                  onChange={(e) => setDetokenizeAmount(e.target.value)}
                  min="1"
                />
                <p className="text-sm text-muted-foreground">Current balance: {keyBalance} KEY</p>
              </div>
              <Button onClick={handleDetokenize} disabled={isDetokenizing || !detokenizeAmount} className="w-full">
                {isDetokenizing ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Detokenizing...
                  </>
                ) : (
                  "Detokenize Keys"
                )}
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Daily Rewards</CardTitle>
          <CardDescription>Claim your daily rewards and build your consecutive day streak.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <div className="grid gap-4 md:grid-cols-3">
              <div className="bg-muted p-4 rounded-lg">
                <div className="text-sm font-medium text-muted-foreground mb-1">Current Streak</div>
                <div className="text-2xl font-bold">{consecutiveDays} days</div>
              </div>
              <div className="bg-muted p-4 rounded-lg">
                <div className="text-sm font-medium text-muted-foreground mb-1">Next Reward</div>
                <div className="text-2xl font-bold">{nextReward} KEY</div>
              </div>
              <div className="bg-muted p-4 rounded-lg">
                <div className="text-sm font-medium text-muted-foreground mb-1">Status</div>
                <div className="text-2xl font-bold">{canClaim ? "Available" : "Claimed"}</div>
              </div>
            </div>

            <Button onClick={handleClaimReward} disabled={isClaiming || !canClaim} className="w-full">
              {isClaiming ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Claiming...
                </>
              ) : (
                "Claim Daily Reward"
              )}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

