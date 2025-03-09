"use client"

import { ThirdwebProvider, ConnectButton } from "thirdweb/react"
import { inAppWallet } from "thirdweb/wallets"
import { createThirdwebClient } from "thirdweb"

export function StandaloneConnect() {
  // Create the client with a hardcoded client ID for testing
  const client = createThirdwebClient({
    clientId: process.env.NEXT_PUBLIC_THIRDWEB_CLIENT_ID || "your-client-id",
  })

  return (
    <ThirdwebProvider client={client}>
      <ConnectButton
        client={client}
        wallets={[
          inAppWallet({
            auth: {
              options: ["google", "email", "phone", "telegram", "discord"],
            },
          }),
        ]}
      />
    </ThirdwebProvider>
  )
}

