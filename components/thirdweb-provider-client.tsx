"use client"

import type { ReactNode } from "react"
import { ThirdwebProvider } from "thirdweb/react"
import { createThirdwebClient } from "thirdweb"

export function ThirdwebProviderClient({ children }: { children: ReactNode }) {
  // Create the client with the environment variable directly
  const client = createThirdwebClient({
    clientId: process.env.NEXT_PUBLIC_THIRDWEB_CLIENT_ID,
  })

  // Log the client ID to verify it's available
  console.log("Client ID:", process.env.NEXT_PUBLIC_THIRDWEB_CLIENT_ID)

  return <ThirdwebProvider client={client}>{children}</ThirdwebProvider>
}

