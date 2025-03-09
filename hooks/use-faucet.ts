import { useState, useEffect, ReactNode } from "react";
import { useWallet } from "./use-wallet";
import { useToast } from "./use-toast";
import { formatEther } from "ethers";
import { CORE_TESTNET, isCoreTestnet } from "@/lib/network";

interface UseFaucetReturn {
  requestFaucet: () => Promise<void>;
  isRequesting: boolean;
  canRequest: boolean;
  timeRemaining: string | null;
  balance: string;
  isLoadingBalance: boolean;
  fetchBalance: () => Promise<void>;
}

export function useFaucet(): UseFaucetReturn {
  const { address, provider, chainId } = useWallet();
  const { toast } = useToast();
  const [isRequesting, setIsRequesting] = useState(false);
  const [lastRequestTime, setLastRequestTime] = useState<number | null>(null);
  const [balance, setBalance] = useState("0");
  const [isLoadingBalance, setIsLoadingBalance] = useState(false);

  // Load last request time from localStorage on mount
  useEffect(() => {
    if (address) {
      const storedTime = localStorage.getItem(`lastFaucetRequest_${address}`);
      if (storedTime) {
        setLastRequestTime(parseInt(storedTime));
      }
      // Fetch initial balance
      fetchBalance();
    } else {
      setBalance("0");
    }
  }, [address]);

  // Check if user can request tokens (24-hour cooldown)
  const canRequest =
    !lastRequestTime || Date.now() - lastRequestTime >= 24 * 60 * 60 * 1000;

  // Calculate time remaining for cooldown
  const getTimeRemaining = () => {
    if (!lastRequestTime || canRequest) return null;
    const timeLeft = 24 * 60 * 60 * 1000 - (Date.now() - lastRequestTime);
    const hours = Math.floor(timeLeft / (60 * 60 * 1000));
    const minutes = Math.floor((timeLeft % (60 * 60 * 1000)) / (60 * 1000));
    return `${hours}h ${minutes}m`;
  };

  const fetchBalance = async () => {
    if (!address || !provider) return;

    try {
      setIsLoadingBalance(true);
      const balance = await provider.getBalance(address);
      setBalance(formatEther(balance));
    } catch (error) {
      console.error("Failed to fetch balance:", error);
    } finally {
      setIsLoadingBalance(false);
    }
  };

  const switchNetwork = async () => {
    if (!window.ethereum) return false;

    try {
      // Try to switch to Core Testnet
      await window.ethereum.request({
        method: "wallet_switchEthereumChain",
        params: [{ chainId: CORE_TESTNET.chainId }],
      });
      return true;
    } catch (switchError: any) {
      // If the chain hasn't been added to MetaMask
      if (switchError.code === 4902) {
        try {
          await window.ethereum.request({
            method: "wallet_addEthereumChain",
            params: [CORE_TESTNET],
          });
          return true;
        } catch (addError) {
          console.error("Failed to add network:", addError);
          return false;
        }
      }
      console.error("Failed to switch network:", switchError);
      return false;
    }
  };

  const requestFaucet = async () => {
    if (!address) {
      toast({
        title: "Error",
        description: "Please connect your wallet first",
        variant: "destructive",
      });
      return;
    }

    if (!chainId || !isCoreTestnet(chainId)) {
      toast({
        title: "Wrong Network",
        description: "Switching to Core Blockchain Testnet...",
      });

      const switched = await switchNetwork();
      if (!switched) {
        toast({
          title: "Error",
          description:
            "Failed to switch network. Please switch manually to Core Blockchain Testnet.",
          variant: "destructive",
        });
        return;
      }
      return; // Return here as the page will refresh after network switch
    }

    if (!canRequest) {
      const timeLeft = getTimeRemaining();
      toast({
        title: "Error",
        description: `Please wait ${timeLeft} before requesting tokens again`,
        variant: "destructive",
      });
      return;
    }

    try {
      setIsRequesting(true);
      toast({
        title: "Requesting Tokens",
        description: "Submitting request to faucet...",
      });

      const response = await fetch("/api/faucet", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ address }),
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
            `lastFaucetRequest_${address}`,
            cooldownTime.toString()
          );
        } else {
          setLastRequestTime(Date.now());
          localStorage.setItem(
            `lastFaucetRequest_${address}`,
            Date.now().toString()
          );
        }
        toast({
          title: "Cooldown Active",
          description: data.error,
          variant: "destructive",
        });
        return;
      }

      if (!response.ok) {
        throw new Error(data.error || "Failed to request faucet");
      }

      if (data.success && data.txHash) {
        // Update last request time
        setLastRequestTime(Date.now());
        localStorage.setItem(
          `lastFaucetRequest_${address}`,
          Date.now().toString()
        );

        toast({
          title: "Request Successful",
          description: `Faucet request submitted! TX: ${data.txHash.slice(
            0,
            6
          )}...${data.txHash.slice(-4)}`,
        });

        // Start monitoring the transaction
        let attempts = 0;
        const maxAttempts = 20; // 20 attempts * 3 seconds = 60 seconds max
        const initialBalance = balance;

        const interval = setInterval(async () => {
          attempts++;
          await fetchBalance();

          // If balance changed or max attempts reached
          if (balance !== initialBalance || attempts >= maxAttempts) {
            clearInterval(interval);
            if (balance !== initialBalance) {
              toast({
                title: "Success",
                description: "Tokens received successfully!",
              });
            } else {
              toast({
                title: "Transaction Pending",
                description:
                  "Transaction submitted but may take a few more minutes to complete",
              });
            }
          }
        }, 3000);
      }
    } catch (error) {
      toast({
        title: "Error",
        description:
          error instanceof Error ? error.message : "Failed to request faucet",
        variant: "destructive",
      });
      console.error("Faucet request error:", error);
    } finally {
      setIsRequesting(false);
    }
  };

  return {
    requestFaucet,
    isRequesting,
    canRequest,
    timeRemaining: getTimeRemaining(),
    balance,
    isLoadingBalance,
    fetchBalance,
  };
}
