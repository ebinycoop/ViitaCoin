"use client";

import React, { FC, ReactNode, useMemo } from 'react';
import { ConnectionProvider, WalletProvider } from '@solana/wallet-adapter-react';
import { WalletAdapterNetwork } from '@solana/wallet-adapter-base';
import { 
  PhantomWalletAdapter, 
  SolflareWalletAdapter,
  TrustWalletAdapter,
  BackpackWalletAdapter,
} from '@solana/wallet-adapter-wallets';
import { WalletModalProvider } from '@solana/wallet-adapter-react-ui';
import { clusterApiUrl } from '@solana/web3.js';

// Import default styling parameters directly for the wallet selection popup modal
import '@solana/wallet-adapter-react-ui/styles.css';

interface SolanaProviderProps {
  children: ReactNode;
}

export const SolanaProvider: FC<SolanaProviderProps> = ({ children }) => {
  // Configured to point directly to Devnet for stable test deployment conditions
  const network = WalletAdapterNetwork.Devnet;

  // Establish our dedicated connection endpoint to the Solana network RPC
  const endpoint = useMemo(() => clusterApiUrl(network), [network]);

  /**
   * Initialize a comprehensive array of supportive user wallet adapters.
   * This handles standalone software installations, hardware bridges, 
   * and mobile-first secure interfaces like Edge via the generic Mobile Wallet Standard.
   */
  const wallets = useMemo(
    () => [
      new PhantomWalletAdapter(),
      new SolflareWalletAdapter(),
      new TrustWalletAdapter(),
      new BackpackWalletAdapter(),
    ],
    [network]
  );

  return (
    <ConnectionProvider endpoint={endpoint}>
      {/* Setting autoConnect to true lets mobile app wrappers (like Edge or Phantom Mobile) 
        remember the connection securely without forcing the user to log in every single time.
      */}
      <WalletProvider wallets={wallets} autoConnect>
        <WalletModalProvider>
          {children}
        </WalletModalProvider>
      </WalletProvider>
    </ConnectionProvider>
  );
};
