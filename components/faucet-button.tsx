"use client";

import { Button } from "@/components/ui/button";
import { useFaucet } from "@/hooks/use-faucet";
import { useWallet } from "@/hooks/use-wallet";
import { Loader2, Droplets } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export function FaucetButton() {
  const { isConnected } = useWallet();
  const {
    requestFaucet,
    isRequesting,
    canRequest,
    timeRemaining,
    balance,
    isLoadingBalance,
  } = useFaucet();

  if (!isConnected) {
    return null;
  }

  const tooltipContent = isRequesting
    ? "Requesting tokens..."
    : !canRequest
    ? `Wait ${timeRemaining} before next request`
    : `Request test tokens (Current Balance: ${Number(balance).toFixed(
        4
      )} tCORE2)`;

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            onClick={requestFaucet}
            disabled={isRequesting || !canRequest}
            variant={canRequest ? "default" : "secondary"}
            size="icon"
            className="h-9 w-9 relative"
          >
            {isRequesting || isLoadingBalance ? (
              <Loader2 className="h-5 w-5 animate-spin" />
            ) : (
              <Droplets className="h-5 w-5" />
            )}
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          <p>{tooltipContent}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
