"use client"

import { ThirdwebProvider, ConnectButton } from "thirdweb/react"
import { inAppWallet } from "thirdweb/wallets"
import { createThirdwebClient } from "thirdweb"

// Create the client
const client = createThirdwebClient({
  clientId: process.env.NEXT_PUBLIC_THIRDWEB_CLIENT_ID || "",
})

export default function StandaloneConnectPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-24">
      <h1 className="text-4xl font-bold mb-8">Standalone Connect</h1>
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
    </div>
  )
}

