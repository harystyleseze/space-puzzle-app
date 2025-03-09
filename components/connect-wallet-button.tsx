"use client"

import { Button } from "@/components/ui/button"
import { useWallet } from "@/hooks/use-wallet"
import { Loader2, Wallet } from "lucide-react"

export function ConnectWalletButton() {
  const { isConnected, isConnecting, connect, disconnect, address } = useWallet()

  return isConnected ? (
    <div className="flex items-center gap-2">
      <span className="text-sm hidden md:inline-block">
        {address?.slice(0, 6)}...{address?.slice(-4)}
      </span>
      <Button variant="outline" onClick={disconnect} size="sm">
        Disconnect
      </Button>
    </div>
  ) : (
    <Button onClick={connect} disabled={isConnecting}>
      {isConnecting ? (
        <>
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          Connecting...
        </>
      ) : (
        <>
          <Wallet className="mr-2 h-4 w-4" />
          Connect Wallet
        </>
      )}
    </Button>
  )
}

