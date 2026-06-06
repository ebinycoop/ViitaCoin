"use client";

import React, { useState } from 'react';
import { SolanaProvider } from '../components/SolanaProvider';
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';
import { useWallet } from '@solana/wallet-adapter-react';
import { Wallet, Shield, Home, RefreshCw, Layers } from 'lucide-react';

function DashboardContent() {
  const { publicKey, connected } = useWallet();
  const [syncing, setSyncing] = useState(false);
  const [tokensAllocated, setTokensAllocated] = useState<number | null>(null);
  const [vaultStrategy, setVaultStrategy] = useState<string | null>(null);

  // Simulates connecting to our secure backend routing engine (Step 4)
  const handleBankSync = async () => {
    setSyncing(true);
    // Explicitly emulating a secure fetch from our Plaid processing service pipeline
    setTimeout(() => {
      setSyncing(false);
      setTokensAllocated(8750); // Sample baseline tracking token calculation
      setVaultStrategy("HomeBuilder Unified 50/50 Split Triggered");
    }, 2500);
  };

  return (
    <div className="space-y-8">
      {/* Upper Branding Header Panel */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center border-b border-stone-800 pb-6 gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-stone-100">VIITACOIN</h1>
          <p className="text-stone-400 text-sm mt-1">Individual Wealth Reclamation & Secure Asset Allocation</p>
        </div>
        <div className="bg-stone-900 p-2 rounded-xl border border-stone-800 self-stretch md:self-auto flex justify-center">
          <WalletMultiButton className="!bg-emerald-800 hover:!bg-emerald-700 !py-2 !px-4 !rounded-lg !font-medium !text-sm !transition-colors" />
        </div>
      </div>

      {/* Main Multi-Column Metric Framework */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Connection Control Terminal */}
        <div className="bg-stone-900 border border-stone-800 rounded-2xl p-6 space-y-6 flex flex-col justify-between">
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-emerald-950 text-emerald-400 rounded-lg border border-emerald-800">
                <Layers className="h-5 w-5" />
              </div>
              <h2 className="text-xl font-semibold">Data Link Control</h2>
            </div>
            <p className="text-stone-400 text-sm leading-relaxed">
              Link your non-custodial banking access keys to evaluate real-world expenditures against Section 5 protocol curves.
            </p>
          </div>

          <div className="pt-4 space-y-3">
            {connected ? (
              <button
                onClick={handleBankSync}
                disabled={syncing}
                className="w-full bg-emerald-800 hover:bg-emerald-700 disabled:bg-stone-800 disabled:text-stone-600 text-stone-100 font-medium py-3 px-4 rounded-xl flex items-center justify-center gap-2 transition-all"
              >
                <RefreshCw className={`h-4 w-4 ${syncing ? 'animate-spin' : ''}`} />
                {syncing ? 'Analyzing Outlays...' : 'Synchronize Banking Data'}
              </button>
            ) : (
              <div className="text-center p-4 bg-stone-950 border border-stone-800 rounded-xl text-stone-500 text-sm">
                Connect your decentralized wallet above to establish non-custodial interface permissions.
              </div>
            )}
          </div>
        </div>

        {/* HomeBuilder Allocation Vault Display */}
        <div className="vault-gradient-home border border-emerald-900/30 rounded-2xl p-6 space-y-6 flex flex-col justify-between shadow-lg shadow-emerald-950/10">
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-emerald-900/40 text-emerald-300 rounded-lg border border-emerald-700/30">
                <Home className="h-5 w-5" />
              </div>
              <h2 className="text-xl font-semibold text-stone-100">HomeBuilder Vault</h2>
            </div>
            <p className="text-emerald-200/70 text-sm leading-relaxed">
              Programmatic allocation pool targeting stable foundational investments. Controlled exclusively by your on-chain signatures.
            </p>
          </div>

          <div className="space-y-1">
            <span className="text-xs font-semibold text-emerald-400 tracking-wider uppercase">Vault Balance</span>
            <div className="text-3xl font-mono font-bold text-stone-100">
              {tokensAllocated !== null ? (tokensAllocated * 0.50).toLocaleString() : '0.00'} <span className="text-sm font-sans font-normal text-emerald-300">$VITA</span>
            </div>
          </div>
        </div>

        {/* Life Security Time-Locked Vault Display */}
        <div className="vault-gradient-security border border-slate-800 rounded-2xl p-6 space-y-6 flex flex-col justify-between shadow-lg shadow-black/20">
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-slate-800 text-slate-300 rounded-lg border border-slate-700">
                <Shield className="h-5 w-5" />
              </div>
              <h2 className="text-xl font-semibold text-stone-100">Life Security Vault</h2>
            </div>
            <p className="text-slate-400 text-sm leading-relaxed">
              Protected by a strict 90-day execution time-lock to reinforce individual continuity. Non-custodial survival reserve.
            </p>
          </div>

          <div className="space-y-1">
            <span className="text-xs font-semibold text-slate-400 tracking-wider uppercase">Vault Balance</span>
            <div className="text-3xl font-mono font-bold text-stone-100">
              {tokensAllocated !== null ? (tokensAllocated * 0.50).toLocaleString() : '0.00'} <span className="text-sm font-sans font-normal text-slate-400">$VITA</span>
            </div>
          </div>
        </div>

      </div>

      {/* Dynamic Processing Status Alert Box */}
      {vaultStrategy && (
        <div className="bg-stone-900 border border-emerald-800/40 rounded-xl p-4 flex items-center justify-between animate-fade-in">
          <div className="flex items-center gap-3">
            <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-sm text-stone-300 font-medium">Active Processing Strategy:</span>
            <span className="text-sm font-mono text-emerald-400 font-semibold bg-emerald-950/50 px-2 py-0.5 rounded border border-emerald-900/30">{vaultStrategy}</span>
          </div>
          <span className="text-xs text-stone-500 font-mono">Target Wallet: {publicKey?.toBase58().substring(0, 6)}...</span>
        </div>
      )}
    </div>
  );
}

export default function DashboardPage() {
  return (
    <SolanaProvider>
      <DashboardContent />
    </SolanaProvider>
  );
}
