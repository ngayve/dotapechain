
'use client';
import { getDefaultConfig } from '@rainbow-me/rainbowkit';

import {
  apeChain,
  arbitrum,
  base,
  mainnet,
  optimism,
  polygon,
  sepolia,
} from 'wagmi/chains';

export const config = getDefaultConfig({
    appName: 'DotApeChain',
    projectId: '5f6bf76cfac6d18848dc728a298a3f05',
    chains: [
      apeChain,
      mainnet,
      polygon,
      optimism,
      arbitrum,
      base,
      ...(process.env.NEXT_PUBLIC_ENABLE_TESTNETS === 'true' ? [sepolia] : []),
    ],
    ssr: false,
  });