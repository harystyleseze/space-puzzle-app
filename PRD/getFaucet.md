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

    // Handle cooldown case (when code is 00000 but success is false)
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

const handleFaucetRequest = async () => {
if (!activeAccount?.address) {
toast.error("Please connect your wallet first");
return;
}

    if (!canRequestTokens) {
      const hoursLeft = Math.ceil(
        (24 * 60 * 60 * 1000 - (Date.now() - lastRequestTime!)) /
          (60 * 60 * 1000)
      );
      toast.error(
        `Please wait ${hoursLeft} hours before requesting tokens again`
      );
      return;
    }

    try {
      setIsRequestingFaucet(true);

      const response = await fetch("/api/faucet", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          address: activeAccount.address,
        }),
      });

      const data = await response.json();

      // Handle cooldown case
      if (response.status === 429) {
        const timeMatch = data.error.match(/(\d+)h(\d+)m(\d+)s/);
        if (timeMatch) {
          const [_, hours, minutes] = timeMatch;
          const cooldownTime =
            Date.now() -
            (parseInt(hours) * 60 * 60 * 1000 + parseInt(minutes) * 60 * 1000);
          setLastRequestTime(cooldownTime);
          localStorage.setItem(
            `lastFaucetRequest_${activeAccount.address}`,
            cooldownTime.toString()
          );
        } else {
          setLastRequestTime(Date.now());
          localStorage.setItem(
            `lastFaucetRequest_${activeAccount.address}`,
            Date.now().toString()
          );
        }
        throw new Error(data.error);
      }

      if (!response.ok) {
        throw new Error(data.error || "Failed to request faucet");
      }

      if (data.success && data.txHash) {
        toast.success(`Successfully requested faucet! TX: ${data.txHash}`);
        // Update last request time
        setLastRequestTime(Date.now());
        localStorage.setItem(
          `lastFaucetRequest_${activeAccount.address}`,
          Date.now().toString()
        );

        // Wait for transaction to be mined and update balance
        toast.promise(
          new Promise((resolve) => {
            // Check balance every 5 seconds for up to 2 minutes
            let attempts = 0;
            const interval = setInterval(async () => {
              attempts++;
              await fetchBalance();
              if (attempts >= 24) {
                // 2 minutes (24 * 5 seconds)
                clearInterval(interval);
                resolve(true);
              }
            }, 5000);
          }),
          {
            loading: "Waiting for transaction to be mined...",
            success: "Balance updated successfully!",
            error: "Balance may take a few more minutes to update",
          }
        );
      } else {
        throw new Error(data.error || "Failed to request faucet");
      }
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "Failed to request faucet"
      );
      console.error("Faucet request error:", error);
    } finally {
      setIsRequestingFaucet(false);
    }

};

// Calculate time remaining for cooldown
const getTimeRemaining = () => {
if (!lastRequestTime || canRequestTokens) return null;
const timeLeft = 24 _ 60 _ 60 _ 1000 - (Date.now() - lastRequestTime);
const hours = Math.floor(timeLeft / (60 _ 60 _ 1000));
const minutes = Math.floor((timeLeft % (60 _ 60 _ 1000)) / (60 _ 1000));
return `${hours}h ${minutes}m`;
};

const timeRemaining = getTimeRemaining();
// Check if user can request tokens (24-hour cooldown)
const canRequestTokens =
!lastRequestTime || Date.now() - lastRequestTime >= 24 _ 60 _ 60 \* 1000;
