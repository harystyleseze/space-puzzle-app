"use client"

import type { ReactNode } from "react"
import { ThirdwebProvider } from "thirdweb/react"
import { createThirdwebClient } from "thirdweb"

// Create the client
const client = createThirdwebClient({
  clientId: process.env.NEXT_PUBLIC_THIRDWEB_CLIENT_ID || "",
})

export function ThirdwebProviderWrapper({ children }: { children: ReactNode }) {
  return <ThirdwebProvider client={client}>{children}</ThirdwebProvider>
}

