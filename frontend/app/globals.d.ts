// Type definitions for Ethereum provider
interface Window {
    ethereum?: {
      isMetaMask?: boolean
      isCoinbaseWallet?: boolean
      request: (request: { method: string; params?: any[] }) => Promise<any>
      on: (event: string, callback: (...args: any[]) => void) => void
      removeListener: (event: string, callback: (...args: any[]) => void) => void
      selectedAddress: string | null
      chainId: string
    }
  }
  