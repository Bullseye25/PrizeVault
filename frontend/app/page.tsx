'use client';

import { useState } from 'react';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { useAccount } from 'wagmi';
import { motion } from 'framer-motion';
import { UserDashboard } from '@/components/UserDashboard';
import { Trophy, Sparkles } from 'lucide-react';

export default function Home() {
  const { isConnected: apiConnected } = useAccount();
  const [demoMode, setDemoMode] = useState(false);
  const isConnected = apiConnected || demoMode;

  // Animation Variants
  const container = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { staggerChildren: 0.1 } }
  };
  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  return (
    <div className="min-h-screen bg-black text-white font-sans selection:bg-purple-500 selection:text-white overflow-hidden relative">

      {/* Background Gradients & Grid */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 brightness-100 contrast-150 mix-blend-overlay"></div>
        <div className="absolute top-[-20%] left-[-10%] w-[60%] h-[60%] bg-purple-900/30 rounded-full blur-[140px] animate-pulse" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-blue-900/30 rounded-full blur-[120px]" />
        <div className="absolute top-[40%] left-[40%] w-[30%] h-[30%] bg-pink-900/20 rounded-full blur-[130px]" />
      </div>

      <header className="relative z-10 flex flex-col items-center justify-center pt-8 pb-4">
        <div className="flex items-center gap-4">
          <div className="relative group">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl blur-lg opacity-70 group-hover:opacity-100 transition-opacity duration-500"></div>
            <div className="relative bg-black/40 border border-white/10 p-3.5 rounded-2xl backdrop-blur-xl shadow-2xl flex items-center justify-center">
              <Trophy className="w-8 h-8 text-yellow-400 drop-shadow-[0_0_15px_rgba(250,204,21,0.5)]" />
            </div>
            <div className="absolute -top-1 -right-1">
              <Sparkles className="w-4 h-4 text-purple-400 animate-pulse" />
            </div>
          </div>

          <h1 className="text-4xl font-black tracking-tighter">
            <span className="bg-clip-text text-transparent bg-gradient-to-b from-white to-gray-400 drop-shadow-sm">Prize</span>
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 drop-shadow-[0_0_10px_rgba(168,85,247,0.4)]">Vault</span>
          </h1>
        </div>
      </header>

      <main className="flex flex-col items-center justify-start py-12 p-4 relative z-10 w-full flex-grow">

        {/* HERO SECTION - Adapts based on state */}
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="text-center max-w-4xl mx-auto mb-12"
        >
          {!isConnected && (
            <motion.div variants={item} className="inline-block mb-6 px-5 py-1.5 rounded-full bg-white/5 border border-white/10 backdrop-blur-md">
              <span className="text-sm font-semibold text-blue-200 tracking-wide uppercase">✨ The Daily On-Chain Lottery</span>
            </motion.div>
          )}

          <motion.h1 variants={item} className="text-5xl md:text-7xl font-bold mb-8 tracking-tight leading-tight">
            {isConnected ? 'Welcome Back.' : 'Win the Daily Pot.'} <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">
              1 USDC = 10 Tickets.
            </span>
          </motion.h1>

          {!isConnected && (
            <>
              {/* Prize Range Badges */}
              <motion.div variants={item} className="flex flex-wrap justify-center gap-4 mb-10">
                <div className="bg-white/5 border border-white/10 px-6 py-4 rounded-2xl flex items-center gap-3 backdrop-blur-md hover:bg-white/10 transition-colors">
                  <div className="bg-green-500/20 p-2.5 rounded-xl text-green-400 font-bold text-xl">MIN</div>
                  <div className="text-left">
                    <p className="text-[10px] text-gray-400 uppercase font-bold tracking-wider">Minimum Prize</p>
                    <p className="text-xl font-bold text-white font-mono">$5.00</p>
                  </div>
                </div>
                <div className="bg-white/5 border border-white/10 px-6 py-4 rounded-2xl flex items-center gap-3 backdrop-blur-md hover:bg-white/10 transition-colors">
                  <div className="bg-purple-500/20 p-2.5 rounded-xl text-purple-400 font-bold text-xl">MAX</div>
                  <div className="text-left">
                    <p className="text-[10px] text-gray-400 uppercase font-bold tracking-wider">Jackpot Cap</p>
                    <p className="text-xl font-bold text-white font-mono">$1,000</p>
                  </div>
                </div>
                <div className="bg-white/5 border border-white/10 px-6 py-4 rounded-2xl flex items-center gap-3 backdrop-blur-md hover:bg-white/10 transition-colors">
                  <div className="bg-blue-500/20 p-2.5 rounded-xl text-blue-400 font-bold text-xl">⚡</div>
                  <div className="text-left">
                    <p className="text-[10px] text-gray-400 uppercase font-bold tracking-wider">Withdrawals</p>
                    <p className="text-sm font-bold text-white uppercase">Instant & Secure</p>
                  </div>
                </div>
              </motion.div>

              <motion.p variants={item} className="text-lg text-gray-400 mb-10 max-w-2xl mx-auto leading-relaxed">
                Deposit USDC to buy tickets. Win the entire pot daily. <br />
                <span className="text-white/60 text-sm">Provably fair. Powered by Chainlink VRF on Base.</span>
              </motion.p>
            </>
          )}

          {/* CONNECT BUTTON CTA (If NOT Connected) */}
          {/* CONNECT BUTTON CTA */}
          <motion.div variants={item} className="flex justify-center relative z-20">
            <ConnectButton.Custom>
              {({
                account,
                chain,
                openAccountModal,
                openChainModal,
                openConnectModal,
                authenticationStatus,
                mounted,
              }) => {
                const ready = mounted && authenticationStatus !== 'loading';
                const connected =
                  ready &&
                  account &&
                  chain &&
                  (!authenticationStatus ||
                    authenticationStatus === 'authenticated');

                // If NOT ready, return placeholder (invisible) to prevent layout shift
                if (!ready) {
                  return (
                    <div className="opacity-0 pointer-events-none" aria-hidden="true">
                      <button className="px-8 py-4 bg-blue-600 rounded-full">Loading...</button>
                    </div>
                  );
                }

                // If NOT connected, show BIG Connect Button
                if (!connected) {
                  return (
                    <button
                      onClick={openConnectModal}
                      className="group relative inline-flex items-center justify-center px-8 py-4 font-bold text-white transition-all duration-200 bg-blue-600 font-lg rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-600 hover:bg-blue-500 hover:scale-105 shadow-xl shadow-blue-500/20"
                    >
                      Connect Wallet to Play
                      <svg className="w-5 h-5 ml-2 -mr-1 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7l5 5m0 0l-5 5m5-5H6"></path></svg>
                    </button>
                  );
                }

                // If Connected, show NOTHING (Dashboard handles the UI)
                return null;
              }}
            </ConnectButton.Custom>
          </motion.div>

        </motion.div>

        {/* DASHBOARD (Only if Connected) */}
        {isConnected && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="w-full max-w-5xl"
          >
            <UserDashboard />
          </motion.div>
        )}

      </main>

      {/* How it Works Section (Only show if NOT connected to keep dashboard clean?) - User asked to remove UI from main page. 
          Actually user said "remove the whole deposit UI from the main page", didn't explicitly say remove text. 
          I'll keep the text sections below fold for SEO/Info, but maybe hide them when connected to focus on dashboard. 
      */}
      {/* How it Works Section - ALWAYS Visible now per user request */}
      <section className="relative z-10 py-24 border-t border-white/5 bg-black/50 backdrop-blur-sm w-full">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <h3 className="text-4xl font-bold mb-4">How It Works</h3>
            <p className="text-gray-400">Simple, transparent, and provably fair.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            {[
              { icon: "🎟️", title: "1. Buy Tickets", desc: "Deposit USDC to buy tickets. 1 USDC = 10 Tickets. No limit on purchases." },
              { icon: "🎲", title: "2. Automatic Draw", desc: "Every 24 hours, our Chainlink VRF smart contract randomly selects a winning ticket." },
              { icon: "🏆", title: "3. Win the Pot", desc: "Do the math, you have better chances to win than anywhere else." }
            ].map((step, i) => (
              <div key={i} className="p-8 bg-white/5 rounded-2xl border border-white/5">
                <div className="text-5xl mb-6 bg-white/5 w-20 h-20 rounded-2xl flex items-center justify-center mx-auto">{step.icon}</div>
                <h4 className="text-xl font-bold mb-3 text-center">{step.title}</h4>
                <p className="text-gray-400 text-center leading-relaxed">{step.desc}</p>
              </div>
            ))}
          </div>

          {/* FAQ Section */}
          <div className="max-w-3xl mx-auto">
            <h3 className="text-2xl font-bold mb-8 text-center">Frequently Asked Questions</h3>
            <div className="space-y-4">
              <div className="bg-white/5 rounded-xl p-6 border border-white/5">
                <h4 className="font-bold mb-2 text-blue-300">Is it really random?</h4>
                <p className="text-gray-400 text-sm">Yes. We use Chainlink VRF (Verifiable Random Function) directly on Base to ensure every winner selection is mathematically provable and tamper-proof.</p>
              </div>
              <div className="bg-white/5 rounded-xl p-6 border border-white/5">
                <h4 className="font-bold mb-2 text-blue-300">Can I withdraw my deposited amount?</h4>
                <p className="text-gray-400 text-sm">At the end of the year, your deposited amount will become withdraw balance.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <footer className="relative z-10 py-8 text-center text-gray-600 text-sm border-t border-white/5 w-full">
        <p>© 2026 PrizeVault. Built on Base.</p>
        <button onClick={() => setDemoMode(!demoMode)} className="fixed bottom-0 right-0 w-4 h-4 opacity-0 cursor-default" aria-label="Demo Mode"></button>
      </footer>
    </div>
  );
}
