'use client';

import { useState, useEffect } from 'react';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { useAccount } from 'wagmi';
import { motion, AnimatePresence } from 'framer-motion';
import { TermsModal } from '@/components/TermsModal';
import { OnboardingGuide } from '@/components/OnboardingGuide';
import { Loader2 } from 'lucide-react';

export default function Home() {
  const { isConnected } = useAccount();
  const [showTerms, setShowTerms] = useState(false);
  const [agreed, setAgreed] = useState(false);

  // Game State (Demo Mode)
  const [depositAmount, setDepositAmount] = useState('');
  const [principalBalance, setPrincipalBalance] = useState(0);
  const [bonusBalance, setBonusBalance] = useState(0);
  const [isDepositing, setIsDepositing] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);

  // Animation Variants
  const container = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { staggerChildren: 0.1 } }
  };
  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  const handleDeposit = async () => {
    if (!isConnected) {
      alert("Please connect your wallet first!");
      return;
    }
    if (!depositAmount || Number(depositAmount) <= 0) {
      alert("Please enter a valid amount.");
      return;
    }

    setIsDepositing(true);

    // Simulate Blockchain Transaction
    await new Promise(resolve => setTimeout(resolve, 2000));

    const amount = Number(depositAmount);
    setPrincipalBalance(prev => prev + amount);

    // Bonus Logic: 5% if > 100
    if (amount >= 100) {
      const bonus = amount * 0.05;
      setBonusBalance(prev => prev + bonus);
    }

    setIsDepositing(false);
    setShowConfetti(true);
    setDepositAmount('');
    setTimeout(() => setShowConfetti(false), 3000);
  };

  const handleWithdraw = async () => {
    if (principalBalance <= 0) {
      alert("No principal to withdraw.");
      return;
    }
    if (window.confirm(`Withdraw ${principalBalance} USDC? (Bonus funds cannot be withdrawn)`)) {
      setIsDepositing(true);
      await new Promise(resolve => setTimeout(resolve, 1500));
      setPrincipalBalance(0);
      // Bonus remains or resets? Usually bonus is forfeited on full withdraw, but let's keep it simple for now or reset it.
      // Rule: "Bonus money cannot be withdrawn". 
      // Let's leave bonus there to "play" with, or Reset it if they leave. 
      // User didn't specify forfeit, so we'll just zero the principal.
      setIsDepositing(false);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white font-sans selection:bg-purple-500 selection:text-white overflow-hidden relative">

      {/* Confetti / Success Overlay */}
      <AnimatePresence>
        {showConfetti && (
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center pointer-events-none"
          >
            <div className="bg-green-500/90 text-white px-8 py-4 rounded-full text-2xl font-bold backdrop-blur-md shadow-2xl items-center flex gap-3">
              🎉 Deposit Successful!
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Background Gradients */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-purple-900/20 rounded-full blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-blue-900/20 rounded-full blur-[120px]" />
      </div>

      <header className="relative z-10 flex justify-between items-center p-6 border-b border-white/10 backdrop-blur-md">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center font-bold text-lg">
            P
          </div>
          <h1 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-purple-400 to-pink-500">
            PrizeVault
          </h1>
        </div>
        <ConnectButton />
      </header>

      <main className="relative z-10 flex flex-col items-center justify-center pt-10 pb-32 px-4 text-center">
        <motion.div
          initial="hidden"
          animate="show"
          variants={container}
          className="max-w-4xl w-full"
        >
          {/* USER DASHBOARD (Visible if deposited or just always visible for demo) */}
          {(principalBalance > 0 || bonusBalance > 0) && (
            <motion.div variants={item} className="mb-8 grid grid-cols-2 md:grid-cols-4 gap-4 p-4 bg-white/5 rounded-2xl border border-white/10 backdrop-blur-md">
              <div className="text-left">
                <p className="text-gray-400 text-xs uppercase">Principal (Safe)</p>
                <p className="text-2xl font-bold font-mono">{principalBalance.toFixed(2)}</p>
              </div>
              <div className="text-left">
                <p className="text-yellow-400 text-xs uppercase">Bonus (Locked)</p>
                <p className="text-2xl font-bold font-mono text-yellow-500">{bonusBalance.toFixed(2)}</p>
              </div>
              <div className="text-left">
                <p className="text-blue-400 text-xs uppercase">Total Tickets</p>
                <p className="text-2xl font-bold font-mono text-blue-400">{(principalBalance + bonusBalance).toFixed(2)}</p>
              </div>
              <div className="flex items-center justify-end">
                <button onClick={handleWithdraw} className="text-xs bg-red-500/20 text-red-400 hover:bg-red-500/30 px-4 py-2 rounded-lg transition-colors border border-red-500/30">
                  Withdraw Principal
                </button>
              </div>
            </motion.div>
          )}

          <motion.div variants={item} className="mb-10">
            <span className="inline-block py-1 px-3 rounded-full bg-white/5 border border-white/10 text-blue-300 text-sm mb-6 backdrop-blur-sm">
              ✨ The Future of No-Loss Savings
            </span>
            <h2 className="text-5xl md:text-6xl font-extrabold mb-6 tracking-tight leading-tight">
              Win Daily Rewards. <br />
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-600">
                Keep Your Principal.
              </span>
            </h2>
          </motion.div>

          <motion.div
            variants={item}
            className="bg-gray-900/50 backdrop-blur-xl p-8 rounded-3xl shadow-2xl border border-white/10 max-w-xl mx-auto hover:border-purple-500/30 transition-colors duration-500"
          >
            <div className="grid grid-cols-2 gap-8 mb-8 text-left relative overflow-hidden">
              <div className="z-10">
                <p className="text-gray-400 text-xs uppercase tracking-wider font-semibold">Next Draw In</p>
                <p className="text-4xl font-mono font-bold text-white tracking-tighter">14:02:45</p>
              </div>
              <div className="z-10 text-right">
                <p className="text-gray-400 text-xs uppercase tracking-wider font-semibold">Prize Pool</p>
                <p className="text-4xl font-mono font-bold text-green-400 tracking-tighter">$1,250.00</p>
              </div>
            </div>

            <div className="flex flex-col gap-4">
              <div className="relative">
                <input
                  type="number"
                  value={depositAmount}
                  onChange={(e) => setDepositAmount(e.target.value)}
                  placeholder="0.00"
                  className="w-full bg-black/40 border border-white/10 rounded-xl p-4 text-2xl text-white focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all font-mono"
                />
                <span className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 font-bold">USDC</span>
              </div>

              <div className="flex items-start gap-3 my-2 text-left bg-black/20 p-3 rounded-lg border border-white/5">
                <input
                  type="checkbox"
                  id="agree"
                  checked={agreed}
                  onChange={(e) => setAgreed(e.target.checked)}
                  className="mt-1.5 w-4 h-4 rounded border-gray-600 bg-gray-700 text-blue-600 focus:ring-blue-500 cursor-pointer"
                />
                <label htmlFor="agree" className="text-sm text-gray-400">
                  I agree to the <button onClick={() => setShowTerms(true)} className="text-blue-400 hover:text-blue-300 underline underline-offset-2">Terms & Conditions</button>.
                  I understand I am responsible for my own private keys.
                </label>
              </div>

              <button
                onClick={handleDeposit}
                disabled={!agreed || isDepositing}
                className={`w-full font-bold py-4 rounded-xl transition-all transform duration-200 border border-white/10 flex items-center justify-center gap-2
                  ${agreed
                    ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:scale-[1.02] hover:shadow-lg hover:shadow-blue-500/25 cursor-pointer'
                    : 'bg-gray-800 text-gray-500 cursor-not-allowed'}`}
              >
                {isDepositing ? <Loader2 className="animate-spin" /> : (agreed ? 'Deposit USDC & Enter' : 'Agree to Terms to Enter')}
              </button>

              {/* Bonus Banner */}
              <div className="mt-4 p-4 rounded-xl bg-gradient-to-r from-yellow-500/20 to-orange-500/20 border border-yellow-500/30 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="text-2xl">🎁</span>
                  <div className="text-left">
                    <p className="text-yellow-200 font-bold text-sm">Special Offer</p>
                    <p className="text-white text-xs">Deposit 100+ USDC & get <span className="text-yellow-400 font-bold">5% Bonus</span> tickets!</p>
                  </div>
                </div>
                <span className="text-xs bg-yellow-500/20 text-yellow-200 px-2 py-1 rounded">Limited Time</span>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </main>

      <OnboardingGuide />

      {/* How it Works Section */}
      <section className="relative z-10 py-24 border-t border-white/5 bg-black/50 backdrop-blur-sm">
        <div className="max-w-6xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h3 className="text-4xl font-bold mb-4">How It Works</h3>
            <p className="text-gray-400">Simple, transparent, and provably fair.</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { icon: "💎", title: "1. Deposit USDC", desc: "Your deposit is your ticket. 1 USDC = 1 Ticket. Withdraw your principal anytime." },
              { icon: "🎲", title: "2. Automatic Draw", desc: "Every 24 hours, our Chainlink VRF smart contract randomly selects a winner." },
              { icon: "🏆", title: "3. Win Actions", desc: "If you win, you get the pot! (Less protocol fee). If you lose, you keep your money." }
            ].map((step, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.2 }}
                className="p-8 bg-white/5 rounded-2xl border border-white/5 hover:bg-white/10 transition-colors"
              >
                <div className="text-5xl mb-6 bg-white/5 w-20 h-20 rounded-2xl flex items-center justify-center mx-auto">{step.icon}</div>
                <h4 className="text-xl font-bold mb-3 text-center">{step.title}</h4>
                <p className="text-gray-400 text-center leading-relaxed">{step.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="relative z-10 py-24 bg-gradient-to-b from-black to-gray-900 border-t border-white/5">
        <div className="max-w-3xl mx-auto px-6">
          <motion.h3
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="text-3xl font-bold mb-12 text-center"
          >
            Frequently Asked Questions
          </motion.h3>
          <div className="space-y-6">
            {[
              { q: "Is my money safe?", a: "Yes. Your principal is stored in the PrizeVault smart contract and can be withdrawn at any time. Only the yield/prize is distributed." },
              { q: "How is the winner picked?", a: "We use Chainlink VRF (Verifiable Random Function) to ensure the winner selection is provably fair and tamper-proof." },
              { q: "What is the cost?", a: "There is no entry fee. You just deposit USDC. The protocol takes a small fee from the *prize* itself, never your principal." }
            ].map((faq, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.1 }}
                className="p-6 rounded-xl bg-white/5 border border-white/5 hover:border-white/10 transition-all"
              >
                <h4 className="font-bold text-lg mb-2 text-blue-200">{faq.q}</h4>
                <p className="text-gray-400">{faq.a}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <footer className="relative z-10 py-8 text-center text-gray-600 text-sm border-t border-white/5">
        <p>© 2026 PrizeVault. Built on Base.</p>
      </footer>

      <TermsModal isOpen={showTerms} onClose={() => setShowTerms(false)} />
    </div>
  );
}
