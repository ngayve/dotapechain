import { http, createConfig } from 'wagmi'
import { apeChain } from 'wagmi/chains'
import { wagmiConnectors } from './wagmiConnector'

export const wagmiConfig = createConfig({
  chains: [apeChain],
  connectors: wagmiConnectors,
  ssr: false,
  transports: {
    [apeChain.id]: http(),
  },
})