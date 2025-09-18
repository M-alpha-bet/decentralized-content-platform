"use client";

import "@rainbow-me/rainbowkit/styles.css";
import { getDefaultConfig, RainbowKitProvider } from "@rainbow-me/rainbowkit";
import { Config, WagmiProvider } from "wagmi";
import { mainnet, polygon, optimism, arbitrum, base } from "wagmi/chains";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";

declare global {
  var wagmiConfig: Config | undefined;
}

export const wagmiConfig =
  globalThis.wagmiConfig ??
  getDefaultConfig({
    appName: "Decentralized Content Platform",
    projectId: process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID!,
    chains: [mainnet, polygon, optimism, arbitrum, base],
    ssr: true,
  });

if (process.env.NODE_ENV !== "production") {
  (globalThis as any).wagmiConfig = wagmiConfig;
}

const queryClient = new QueryClient();

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <WagmiProvider config={wagmiConfig}>
      <QueryClientProvider client={queryClient}>
        <RainbowKitProvider>{children}</RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
}
