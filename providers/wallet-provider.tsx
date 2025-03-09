"use client";

import { createContext, type ReactNode, useEffect, useState } from "react";
import { BrowserProvider } from "ethers";
import { useEthereumProvider } from "@/hooks/use-ethereum-provider";

interface WalletContextType {
  address: string | null;
  isConnected: boolean;
  isConnecting: boolean;
  connect: () => Promise<void>;
  disconnect: () => void;
  provider: BrowserProvider | null;
  chainId: number | null;
  isLoading: boolean;
  isProviderAvailable: boolean;
}

export const WalletContext = createContext<WalletContextType>({
  address: null,
  isConnected: false,
  isConnecting: false,
  connect: async () => {},
  disconnect: () => {},
  provider: null,
  chainId: null,
  isLoading: true,
  isProviderAvailable: false,
});

export function WalletProvider({ children }: { children: ReactNode }) {
  const {
    isAvailable,
    provider: ethereumProvider,
    isLoading,
    shouldAutoConnect,
  } = useEthereumProvider();
  const [address, setAddress] = useState<string | null>(null);
  const [isConnected, setIsConnected] = useState(false);
  const [isConnecting, setIsConnecting] = useState(false);
  const [provider, setProvider] = useState<BrowserProvider | null>(null);
  const [chainId, setChainId] = useState<number | null>(null);

  // Initialize provider and check if already connected
  useEffect(() => {
    const checkConnection = async () => {
      if (isAvailable && ethereumProvider && shouldAutoConnect) {
        try {
          const provider = new BrowserProvider(ethereumProvider);
          setProvider(provider);

          const network = await provider.getNetwork();
          setChainId(Number(network.chainId));

          const accounts = await provider.listAccounts();
          if (accounts.length > 0) {
            setAddress(accounts[0].address);
            setIsConnected(true);
            localStorage.setItem("walletConnected", "true");
          }
        } catch (error) {
          console.error("Failed to check wallet connection:", error);
          localStorage.removeItem("walletConnected");
        }
      }
    };

    if (!isLoading) {
      checkConnection();
    }
  }, [isAvailable, ethereumProvider, isLoading, shouldAutoConnect]);

  // Listen for account and chain changes
  useEffect(() => {
    if (isAvailable && ethereumProvider) {
      const handleAccountsChanged = (accounts: string[]) => {
        if (accounts.length === 0) {
          setAddress(null);
          setIsConnected(false);
          localStorage.removeItem("walletConnected");
        } else {
          setAddress(accounts[0]);
          setIsConnected(true);
          localStorage.setItem("walletConnected", "true");
        }
      };

      const handleChainChanged = (chainIdHex: string) => {
        const chainId = Number.parseInt(chainIdHex, 16);
        setChainId(chainId);
        window.location.reload();
      };

      ethereumProvider.on("accountsChanged", handleAccountsChanged);
      ethereumProvider.on("chainChanged", handleChainChanged);

      return () => {
        ethereumProvider.removeListener(
          "accountsChanged",
          handleAccountsChanged
        );
        ethereumProvider.removeListener("chainChanged", handleChainChanged);
      };
    }
  }, [isAvailable, ethereumProvider]);

  const connect = async () => {
    if (isAvailable && ethereumProvider) {
      try {
        setIsConnecting(true);
        const provider = new BrowserProvider(ethereumProvider);

        // Request accounts - this will prompt for sign-in
        const accounts = await provider.send("eth_requestAccounts", []);
        const network = await provider.getNetwork();
        setChainId(Number(network.chainId));

        if (Number(network.chainId) !== 1114) {
          try {
            await ethereumProvider.request({
              method: "wallet_switchEthereumChain",
              params: [{ chainId: "0x45A" }],
            });
          } catch (switchError: any) {
            if (switchError.code === 4902) {
              await ethereumProvider.request({
                method: "wallet_addEthereumChain",
                params: [
                  {
                    chainId: "0x45A",
                    chainName: "Core Blockchain Testnet 2",
                    nativeCurrency: {
                      name: "tCORE",
                      symbol: "tCORE2",
                      decimals: 18,
                    },
                    rpcUrls: ["https://rpc.test2.btcs.network"],
                    blockExplorerUrls: ["https://scan.test2.btcs.network"],
                  },
                ],
              });
            } else {
              throw switchError;
            }
          }

          const updatedNetwork = await provider.getNetwork();
          setChainId(Number(updatedNetwork.chainId));
        }

        setProvider(provider);
        const signer = await provider.getSigner();
        const address = await signer.getAddress();
        setAddress(address);
        setIsConnected(true);
        localStorage.setItem("walletConnected", "true");
      } catch (error) {
        console.error("Failed to connect wallet:", error);
        localStorage.removeItem("walletConnected");
      } finally {
        setIsConnecting(false);
      }
    } else {
      window.open("https://metamask.io/download/", "_blank");
    }
  };

  const disconnect = () => {
    setAddress(null);
    setIsConnected(false);
    setProvider(null);
    localStorage.removeItem("walletConnected");
  };

  return (
    <WalletContext.Provider
      value={{
        address,
        isConnected,
        isConnecting,
        connect,
        disconnect,
        provider,
        chainId,
        isLoading,
        isProviderAvailable: isAvailable,
      }}
    >
      {children}
    </WalletContext.Provider>
  );
}
