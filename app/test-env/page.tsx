"use client"

import { useEffect } from "react"

export default function TestEnvPage() {
  useEffect(() => {
    console.log("NEXT_PUBLIC_THIRDWEB_CLIENT_ID:", process.env.NEXT_PUBLIC_THIRDWEB_CLIENT_ID)
  }, [])

  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-24">
      <h1 className="text-4xl font-bold mb-8">Test Environment Variables</h1>
      <p>Check the console for environment variable values.</p>
      <p className="mt-4">
        NEXT_PUBLIC_THIRDWEB_CLIENT_ID: {process.env.NEXT_PUBLIC_THIRDWEB_CLIENT_ID || "Not available"}
      </p>
    </div>
  )
}

