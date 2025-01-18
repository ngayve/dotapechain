import { connectorsForWallets } from "@rainbow-me/rainbowkit";
import {
  coinbaseWallet,
  ledgerWallet,
  metaMaskWallet,
  rainbowWallet,
  safeWallet,
  walletConnectWallet,
} from "@rainbow-me/rainbowkit/wallets";

const wallets = [
    metaMaskWallet,
    walletConnectWallet,
    ledgerWallet,
    coinbaseWallet,
    rainbowWallet,
    safeWallet,
  ];

export const wagmiConnectors = connectorsForWallets(
[
    {
    groupName: "Supported Wallets",
    wallets,
    }
],
{
  appName: "DOT",
  projectId: "5f6bf76cfac6d18848dc728a298a3f05",
}
);