interface Window {
  ethereum?: any
}

interface CustomEventMap {
  walletConnected: CustomEvent<{ address: string }>
  walletDisconnected: CustomEvent
}

declare global {
  interface Window {
    ethereum?: any
    addEventListener<K extends keyof CustomEventMap>(
      type: K,
      listener: (this: Window, ev: CustomEventMap[K]) => void,
    ): void
    removeEventListener<K extends keyof CustomEventMap>(
      type: K,
      listener: (this: Window, ev: CustomEventMap[K]) => void,
    ): void
  }
}

export {}

