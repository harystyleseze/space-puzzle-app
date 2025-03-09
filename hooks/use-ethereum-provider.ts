import { useEffect, useState } from "react";

interface EthereumProviderState {
  isAvailable: boolean;
  provider: any | null;
  isLoading: boolean;
  shouldAutoConnect: boolean;
}

export function useEthereumProvider(): EthereumProviderState {
  const [state, setState] = useState<EthereumProviderState>({
    isAvailable: false,
    provider: null,
    isLoading: true,
    shouldAutoConnect: false,
  });

  useEffect(() => {
    const checkProvider = () => {
      if (typeof window === "undefined") {
        setState({
          isAvailable: false,
          provider: null,
          isLoading: true,
          shouldAutoConnect: false,
        });
        return;
      }

      const shouldAutoConnect =
        localStorage.getItem("walletConnected") === "true";

      if (window.ethereum) {
        setState({
          isAvailable: true,
          provider: window.ethereum,
          isLoading: false,
          shouldAutoConnect,
        });
      } else {
        setState({
          isAvailable: false,
          provider: null,
          isLoading: false,
          shouldAutoConnect: false,
        });
      }
    };

    checkProvider();
  }, []);

  return state;
}
