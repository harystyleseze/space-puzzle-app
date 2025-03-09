"use client"

import { ConnectButton } from "thirdweb/react"
import { inAppWallet } from "thirdweb/wallets"

export default function TestConnectPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-24">
      <h1 className="text-4xl font-bold mb-8">Test Connect</h1>
      <ConnectButton
        wallets={[
          inAppWallet({
            auth: {
              options: ["google", "email", "phone", "telegram", "discord"],
            },
          }),
        ]}
      />
    </div>
  )
}

