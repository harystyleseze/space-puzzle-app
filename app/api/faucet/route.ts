import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { address } = body;

    if (!address) {
      return NextResponse.json(
        { error: "Wallet address is required" },
        { status: 400 }
      );
    }

    const response = await fetch(
      "https://scan.test2.btcs.network/api/chain/faucet",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "bearer _p0eWHWyiCZjNSa8TdHPNIRkp3s",
        },
        body: JSON.stringify({ address }),
      }
    );

    const data = await response.json();
    console.log("Faucet API Response:", data);

    // Handle specific error cases
    if (data.code === "10001") {
      return NextResponse.json(
        {
          success: false,
          error:
            "You've already requested tokens in the last 24 hours. Please wait before requesting again.",
          code: data.code,
        },
        { status: 429 }
      );
    }

    // Handle cooldown case
    if (
      data.code === "00000" &&
      data.data?.success === false &&
      data.data?.msg
    ) {
      return NextResponse.json(
        {
          success: false,
          error: data.data.msg,
          code: "COOLDOWN",
        },
        { status: 429 }
      );
    }

    // Handle successful case
    if (
      data.code === "00000" &&
      data.data?.success === true &&
      data.data?.txHash
    ) {
      return NextResponse.json({
        success: true,
        txHash: data.data.txHash,
        message: "Successfully requested faucet tokens",
      });
    }

    // Handle any other error cases
    return NextResponse.json(
      {
        success: false,
        error: data.data?.msg || data.message || "Failed to request faucet",
        code: data.code,
      },
      { status: 400 }
    );
  } catch (error) {
    console.error("Faucet request error:", error);
    return NextResponse.json(
      {
        success: false,
        error: "Failed to request faucet. Please try again later.",
      },
      { status: 500 }
    );
  }
}
