"use client"

import { useEffect, useState } from "react"
import { GameContracts } from "@/lib/contracts"
import { useWallet } from "./use-wallet"

export function useContracts() {
  const { provider, address, isConnected } = useWallet()
  const [contracts, setContracts] = useState<GameContracts | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const initContracts = async () => {
      if (!provider || !address || !isConnected) {
        setContracts(null)
        setIsLoading(false)
        return
      }

      try {
        setIsLoading(true)
        const gameContracts = new GameContracts(provider)
        setContracts(gameContracts)
        setError(null)
      } catch (err) {
        console.error("Failed to initialize contracts:", err)
        setError("Failed to initialize contracts. Please try again.")
        setContracts(null)
      } finally {
        setIsLoading(false)
      }
    }

    initContracts()
  }, [provider, address, isConnected])

  return { contracts, isLoading, error }
}

