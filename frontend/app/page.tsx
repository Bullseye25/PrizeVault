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
    </div>
  );
}
