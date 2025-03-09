export const CORE_TESTNET = {
  chainId: "0x45A", // 1114 in hex
  chainName: "Core Blockchain Testnet 2",
  nativeCurrency: {
    name: "tCORE",
    symbol: "tCORE2",
    decimals: 18,
  },
  rpcUrls: ["https://rpc.test2.btcs.network"],
  blockExplorerUrls: ["https://scan.test2.btcs.network"],
};

export const isCoreTestnet = (chainId: number) => chainId === 1114;
