"use client";
import React, { useState, useEffect } from "react";
import { useAccount, useConnect, useContractWrite } from "wagmi";
import { coinbaseWallet } from "wagmi/connectors";
import { parseEther } from "viem";
import Link from "next/link";

export default function Home() {
  const [isMounted, setIsMounted] = useState(false);
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [currentMessage, setCurrentMessage] = useState("INITIALIZING...");
  const { isConnected, address } = useAccount();
  const { connect } = useConnect(); // Use useConnect for connecting

  useEffect(() => {
    setIsMounted(true);
    const messages = [
      "QUANTUM HEALING INITIALIZED...",
      "CELLULAR MATRIX ALIGNING...",
      "BIOENERGETIC FIELD ACTIVATING...",
      "DNA STRANDS HARMONIZING...",
      "MITOCHONDRIAL RESONANCE PEAKS...",
      "TELOMERE RESTORATION SEQUENCE...",
      "STEM CELL AWAKENING PROTOCOL...",
      "BIOFIELD HARMONICS STABILIZING...",
    ];
    const interval = setInterval(() => {
      setLoadingProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + 1;
      });
      setCurrentMessage(messages[Math.floor(Math.random() * messages.length)]);
    }, 50);

    return () => clearInterval(interval);
  }, []);

  const { write } = useContractWrite({
    address: "YOUR_CONTRACT_ADDRESS", // Replace with your actual contract address
    abi: [
      {
        inputs: [],
        name: "purchaseItem",
        outputs: [],
        stateMutability: "payable",
        type: "function",
      },
    ],
    functionName: "purchaseItem",
    value: parseEther("0.01"),
  });

  if (!isMounted) {
    return (
      <div className="min-h-screen bg-[#000] text-[#C0C0C0] font-mono relative overflow-hidden">
        <div className="fixed inset-0">
        <div className="absolute inset-0 bg-[#ffffff]/5"></div> {/* Match practitioner page background */}
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#000]/90"></div>
        </div>
        <div className="relative z-10">
          <div className="fixed top-0 left-0 w-full p-4">
            <div className="flex justify-between items-center">
              <div className="text-xs tracking-[0.5em] chrome-text">HEALPASS::QUANTUM</div>
              <div className="flex items-center space-x-8">
                <a href="/classes" className="text-xs tracking-[0.5em] chrome-text hover:text-white transition-colors">OFFERINGS</a>
                <a href="/practitioners" className="text-xs tracking-[0.5em] chrome-text hover:text-white transition-colors">PRACTITIONERS</a>
                <div className="text-xs tracking-[0.5em] chrome-text">0%</div>
              </div>
            </div>
          </div>
          <div className="container mx-auto px-4 pt-32">
            <div className="text-center mb-32">
              <div className="text-xs tracking-[0.5em] mb-4 animate-pulse chrome-text">INITIALIZING...</div>
              <div className="chrome-blob-container mb-12">
                <h1 className="chrome-blob text-8xl md:text-9xl tracking-[0.2em] transform">HEAL<br />PASS</h1>
              </div>
              <p className="text-sm tracking-[0.5em] max-w-2xl mx-auto chrome-text mb-12">QUANTUM HEALING PROTOCOL :: 2025</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-24 mb-32 max-w-6xl mx-auto">
              <div className="text-center transform hover:scale-105 transition-transform duration-500">
                <h3 className="tracking-[0.5em] mb-4 chrome-text text-xl">REGENERATE</h3>
                <p className="text-xs tracking-[0.3em] chrome-text leading-loose">CELLULAR REPAIR<br />MITOCHONDRIAL BOOST<br />TELOMERE EXTENSION</p>
              </div>
              <div className="text-center transform hover:scale-105 transition-transform duration-500">
                <h3 className="tracking-[0.5em] mb-4 chrome-text text-xl">REVITALIZE</h3>
                <p className="text-xs tracking-[0.3em] chrome-text leading-loose">STEM CELL ACTIVATION<br />DNA OPTIMIZATION<br />QUANTUM HEALING</p>
              </div>
              <div className="text-center transform hover:scale-105 transition-transform duration-500">
                <h3 className="tracking-[0.5em] mb-4 chrome-text text-xl">TRANSCEND</h3>
                <p className="text-xs tracking-[0.3em] chrome-text leading-loose">CONSCIOUSNESS EXPANSION<br />BIOFIELD HARMONICS<br />ENERGY ALIGNMENT</p>
              </div>
            </div>
            <div className="text-center">
              <Link href="/practitioners" className="inline-block chrome-button px-12 py-4 tracking-[0.5em] text-sm">EXPLORE OFFERINGS</Link>
            </div>
          </div>
          <div className="fixed bottom-0 left-0 w-full p-4">
            <div className="flex justify-between items-center text-xs tracking-[0.5em] chrome-text">
              <div>BIOFIELD::ACTIVE</div>
              <div className="animate-pulse">QUANTUM::ALIGNED</div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#000] text-[#C0C0C0] font-mono relative overflow-hidden">
      <div className="fixed inset-0">
      <div className="absolute inset-0 bg-[#ffffff]/5"></div> {/* Match practitioner page background */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#000]/90"></div>
      </div>
      <div className="relative z-10">
        <div className="fixed top-0 left-0 w-full p-4">
          <div className="flex justify-between items-center">
            <div className="text-xs tracking-[0.5em] chrome-text">HEALPASS::QUANTUM</div>
            <div className="flex items-center space-x-8">
              <a href="/classes" className="text-xs tracking-[0.5em] chrome-text hover:text-white transition-colors">OFFERINGS</a>
              <a href="/practitioners" className="text-xs tracking-[0.5em] chrome-text hover:text-white transition-colors">PRACTITIONERS</a>
              <div className="text-xs tracking-[0.5em] chrome-text">{loadingProgress}%</div>
            </div>
          </div>
        </div>
        <div className="container mx-auto px-4 pt-32">
          <div className="text-center mb-32">
            <div className="text-xs tracking-[0.5em] mb-4 animate-pulse chrome-text">{currentMessage}</div>
            <div className="chrome-blob-container mb-12">
              <h1 className="chrome-blob text-8xl md:text-9xl tracking-[0.2em] transform">HEAL<br />PASS</h1>
            </div>
            <p className="text-sm tracking-[0.5em] max-w-2xl mx-auto chrome-text mb-12">QUANTUM HEALING PROTOCOL :: 2025</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-24 mb-32 max-w-6xl mx-auto">
            <div className="text-center transform hover:scale-105 transition-transform duration-500">
              <h3 className="tracking-[0.5em] mb-4 chrome-text text-xl">REGENERATE</h3>
              <p className="text-xs tracking-[0.3em] chrome-text leading-loose">CELLULAR REPAIR<br />MITOCHONDRIAL BOOST<br />TELOMERE EXTENSION</p>
            </div>
            <div className="text-center transform hover:scale-105 transition-transform duration-500">
              <h3 className="tracking-[0.5em] mb-4 chrome-text text-xl">REVITALIZE</h3>
              <p className="text-xs tracking-[0.3em] chrome-text leading-loose">STEM CELL ACTIVATION<br />DNA OPTIMIZATION<br />QUANTUM HEALING</p>
            </div>
            <div className="text-center transform hover:scale-105 transition-transform duration-500">
              <h3 className="tracking-[0.5em] mb-4 chrome-text text-xl">TRANSCEND</h3>
              <p className="text-xs tracking-[0.3em] chrome-text leading-loose">CONSCIOUSNESS EXPANSION<br />BIOFIELD HARMONICS<br />ENERGY ALIGNMENT</p>
            </div>
          </div>
          <div className="text-center">
          <a href="/practitioners" className="inline-block chrome-button px-12 py-4 tracking-[0.5em] text-sm">EXPLORE OFFERINGS</a>
            <div className="mt-8">
              {isConnected ? (
                <div>
                  <p className="text-sm mb-2">Connected as {address}</p>
                  <button onClick={() => write?.()} className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition">Purchase Item</button>
                </div>
              ) : (
                <button onClick={() => connect({ connector: coinbaseWallet() })} className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition">Connect Coinbase Smart Wallet</button>
              )}
            </div>
          </div>
        </div>
        <div className="fixed bottom-0 left-0 w-full p-4">
          <div className="flex justify-between items-center text-xs tracking-[0.5em] chrome-text">
            <div>BIOFIELD::ACTIVE</div>
            <div className="animate-pulse">QUANTUM::ALIGNED</div>
          </div>
        </div>
      </div>
    </div>
  );
}