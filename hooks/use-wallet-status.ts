"use client"

import { useState, useEffect } from "react"

export function useWalletStatus() {
  const [address, setAddress] = useState<string | null>(null)
  const [isConnected, setIsConnected] = useState(false)

  useEffect(() => {
    // Check if wallet is connected on mount
    const checkConnection = () => {
      const storedAddress = localStorage.getItem("connectedWalletAddress")
      if (storedAddress) {
        setAddress(storedAddress)
        setIsConnected(true)
      }
    }

    checkConnection()

    // Listen for wallet connection events from thirdweb
    const handleConnect = (event: Event) => {
      const customEvent = event as CustomEvent<{ address: string }>
      if (customEvent.detail && customEvent.detail.address) {
        const walletAddress = customEvent.detail.address
        setAddress(walletAddress)
        setIsConnected(true)
        localStorage.setItem("connectedWalletAddress", walletAddress)
      }
    }

    const handleDisconnect = () => {
      setAddress(null)
      setIsConnected(false)
      localStorage.removeItem("connectedWalletAddress")
    }

    // Add event listeners
    window.addEventListener("wallet-connected", handleConnect as EventListener)
    window.addEventListener("wallet-disconnected", handleDisconnect)

    return () => {
      window.removeEventListener("wallet-connected", handleConnect as EventListener)
      window.removeEventListener("wallet-disconnected", handleDisconnect)
    }
  }, [])

  return { address, isConnected }
}

