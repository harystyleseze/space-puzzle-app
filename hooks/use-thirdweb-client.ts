"use client"

import { createThirdwebClient } from "thirdweb"

// Create a singleton client instance
const client = createThirdwebClient({
  clientId: process.env.NEXT_PUBLIC_THIRDWEB_CLIENT_ID || "",
})

export function useThirdwebClient() {
  return client
}

