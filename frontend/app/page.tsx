'use client';
import { ConnectButton } from '@rainbow-me/rainbowkit';

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-900 text-white font-sans">
      <header className="flex justify-between items-center p-6 border-b border-gray-800">
        <h1 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500">
          PrizeVault
        </h1>
        <ConnectButton />
      </header>

      <main className="flex flex-col items-center justify-center p-10 text-center">
        <div className="max-w-2xl">
          <h2 className="text-5xl font-extrabold mb-6">
            Win Daily Rewards. <br /> Keep Your Principal.
          </h2>
          <p className="text-xl text-gray-400 mb-8">
            The first no-loss prize savings game on Base. Deposit USDC, earn tickets for the daily draw, withdraw anytime.
          </p>

          <div className="bg-gray-800 p-8 rounded-2xl shadow-xl border border-gray-700">
            <div className="grid grid-cols-2 gap-8 mb-8 text-left">
              <div>
                <p className="text-gray-400 text-sm">Next Draw In</p>
                <p className="text-3xl font-mono font-bold text-white">14:02:45</p>
              </div>
              <div>
                <p className="text-gray-400 text-sm">Prize Pool</p>
                <p className="text-3xl font-mono font-bold text-green-400">$1,250.00</p>
              </div>
            </div>

            <div className="flex flex-col gap-4">
              <input
                type="number"
                placeholder="0.00"
                className="w-full bg-gray-900 border border-gray-600 rounded-lg p-4 text-2xl text-white focus:outline-none focus:border-blue-500"
              />
              <button className="w-full bg-blue-600 hover:bg-blue-500 text-white font-bold py-4 rounded-lg transition-all transform hover:scale-105">
                Deposit USDC & Enter
              </button>
              <p className="text-xs text-gray-500">By depositing, you agree to the protocol terms.</p>
            </div>
          </div>
        </div>
      </main>

      {/* How it Works Section */}
      <section className="py-16 bg-gray-900 border-t border-gray-800">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h3 className="text-3xl font-bold mb-12">How It Works</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-6 bg-gray-800 rounded-xl">
              <div className="text-4xl mb-4">💰</div>
              <h4 className="text-xl font-bold mb-2">1. Deposit USDC</h4>
              <p className="text-gray-400">Your deposit is your ticket. 1 USDC = 1 Ticket. Withdraw your principal anytime.</p>
            </div>
            <div className="p-6 bg-gray-800 rounded-xl">
              <div className="text-4xl mb-4">⏳</div>
              <h4 className="text-xl font-bold mb-2">2. Wait for Draw</h4>
              <p className="text-gray-400">Every 24 hours, a smart contract randomly selects a winner to receive the prize pool.</p>
            </div>
            <div className="p-6 bg-gray-800 rounded-xl">
              <div className="text-4xl mb-4">🎉</div>
              <h4 className="text-xl font-bold mb-2">3. Win Rewards</h4>
              <p className="text-gray-400">If you win, you get the pot! If you lose, you keep your money and play again tomorrow.</p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 bg-gray-800">
        <div className="max-w-3xl mx-auto px-6">
          <h3 className="text-3xl font-bold mb-12 text-center">Frequently Asked Questions</h3>
          <div className="space-y-6">
            <div>
              <h4 className="font-bold text-lg mb-2">Is my money safe?</h4>
              <p className="text-gray-400">Yes. Your principal is stored in the PrizeVault smart contract and can be withdrawn at any time. Only the yield/prize is distributed.</p>
            </div>
            <div>
              <h4 className="font-bold text-lg mb-2">How is the winner picked?</h4>
              <p className="text-gray-400">We use Chainlink VRF (Verifiable Random Function) to ensure the winner selection is provably fair and tamper-proof.</p>
            </div>
            <div>
              <h4 className="font-bold text-lg mb-2">What is the cost?</h4>
              <p className="text-gray-400">There is no entry fee. You just deposit USDC. The protocol takes a small fee from the *prize* itself, never your principal.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
