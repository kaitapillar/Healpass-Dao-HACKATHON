"use client";
import React from "react";
import "../app/global.css";
import { WagmiConfig, createConfig, http } from "wagmi";
import { base } from "wagmi/chains";
import { RainbowKitProvider, getDefaultWallets } from "@rainbow-me/rainbowkit";
import { coinbaseWallet } from "wagmi/connectors";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

// Create a QueryClient instance
const queryClient = new QueryClient();

// Setup Wagmi Config with Coinbase Smart Wallet
const { connectors } = getDefaultWallets({
  appName: "HealPass",
  projectId: "1a51d12a-59d5-4180-83fc-f73f7fac64ed",
  chains: [base],
});

const wagmiConfig = createConfig({
  autoConnect: true,
  connectors: [
    coinbaseWallet({
      appName: "HealPass",
      preference: "smartWalletOnly",
    }),
    ...connectors,
  ],
  chains: [base],
  transports: {
    [base.id]: http(),
  },
});

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <QueryClientProvider client={queryClient}>
          <WagmiConfig config={wagmiConfig}>
            <RainbowKitProvider chains={[base]}>
              {children}
            </RainbowKitProvider>
          </WagmiConfig>
        </QueryClientProvider>
      </body>
    </html>
  );
}