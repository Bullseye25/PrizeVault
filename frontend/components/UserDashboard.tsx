'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { TermsModal } from './TermsModal';
import { Ticket, History, PlusCircle, Trophy, Wallet, LogOut, Loader2, DollarSign, Sparkles } from 'lucide-react';
import { useState } from 'react';
import { useAccount } from 'wagmi';

export function UserDashboard() {
    const { isConnected } = useAccount();

    // Game State (Demo Simulation)
    const [usdcBalance, setUsdcBalance] = useState(0); // Principal Wallet
    const [bonusBalance, setBonusBalance] = useState(0); // Bonus Wallet
    const [ticketBalance, setTicketBalance] = useState(0);
    const [winnings, setWinnings] = useState(0);

    // UI State
    const [isDepositModalOpen, setIsDepositModalOpen] = useState(false);
    const [isBuyTicketModalOpen, setIsBuyTicketModalOpen] = useState(false);
    const [isTermsOpen, setIsTermsOpen] = useState(false);
    const [amountInput, setAmountInput] = useState('');
    const [paymentSource, setPaymentSource] = useState<'principal' | 'bonus'>('principal');
    const [isLoading, setIsLoading] = useState(false);
    const [showConfetti, setShowConfetti] = useState(false);

    // Transaction History Logic
    interface Transaction {
        id: string;
        type: 'DEPOSIT' | 'BUY_TICKET' | 'WITHDRAW' | 'CONVERT' | 'BONUS';
        amount: number;
        timestamp: Date;
        status: 'COMPLETED' | 'PENDING';
        details?: string;
    }

    const [transactions, setTransactions] = useState<Transaction[]>([]);

    const addTransaction = (type: Transaction['type'], amount: number, details?: string) => {
        const newTx: Transaction = {
            id: Math.random().toString(36).substr(2, 9),
            type,
            amount,
            timestamp: new Date(),
            status: 'COMPLETED',
            details
        };
        setTransactions(prev => [newTx, ...prev]);
    };

    // 1. ADD FUNDS ACTION
    const handleAddFunds = async () => {
        if (!amountInput || Number(amountInput) <= 0) return;
        setIsLoading(true);
        await new Promise(r => setTimeout(r, 1500)); // Sim network

        const amount = Number(amountInput);
        setUsdcBalance(prev => prev + amount);
        addTransaction('DEPOSIT', amount, 'Added Test USDC');

        // Bonus Rule: If depositing 20+, get 5% bonus straight to Bonus Wallet
        if (amount >= 20) {
            const bonus = amount * 0.05;
            setBonusBalance(prev => prev + bonus);
            addTransaction('BONUS', bonus, '5% Deposit Bonus');
        }

        setIsLoading(false);
        setAmountInput('');
        setIsDepositModalOpen(false);
        alert(`Funds Added! +$${amount} USDC`);
    };

    // 2. BUY TICKETS ACTION
    const handleBuyTickets = async () => {
        if (!amountInput || Number(amountInput) <= 0) return;
        const cost = Number(amountInput);

        if (paymentSource === 'principal' && usdcBalance < cost) {
            alert("Insufficient USDC Balance!");
            return;
        }
        if (paymentSource === 'bonus' && bonusBalance < cost) {
            alert("Insufficient Bonus Balance!");
            return;
        }

        setIsLoading(true);
        await new Promise(r => setTimeout(r, 1000));

        // Deduct
        if (paymentSource === 'principal') setUsdcBalance(prev => prev - cost);
        else setBonusBalance(prev => prev - cost);

        // Add Tickets
        setTicketBalance(prev => prev + (cost * 10));

        addTransaction('BUY_TICKET', cost, `${(cost * 10).toLocaleString()} Tickets (${paymentSource.toUpperCase()})`);

        setIsLoading(false);
        setAmountInput('');
        setIsBuyTicketModalOpen(false);
        setShowConfetti(true);
        setTimeout(() => setShowConfetti(false), 3000);
    };

    // 3. WITHDRAW ACTION
    const handleWithdraw = async () => {
        if (winnings <= 0) return alert("You can only withdraw winnings!");
        if (confirm(`Withdraw $${winnings.toFixed(2)} to wallet?`)) {
            const amount = winnings;
            setWinnings(0);
            addTransaction('WITHDRAW', amount, 'Winnings Withdrawal');
            alert("Withdrawal Processed!");
        }
    };

    const totalBalance = usdcBalance + bonusBalance;

    return (
        <div className="w-full mb-12 relative">
            <AnimatePresence>
                {showConfetti && (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-50 flex items-center justify-center pointer-events-none">
                        <div className="bg-green-500 text-white px-6 py-3 rounded-full font-bold shadow-2xl">🎉 Tickets Purchased Successfully!</div>
                    </motion.div>
                )}

                <TermsModal isOpen={isTermsOpen} onClose={() => setIsTermsOpen(false)} />
            </AnimatePresence>

            <div className="bg-gray-900/80 backdrop-blur-xl border border-white/10 rounded-3xl overflow-hidden shadow-2xl">
                {/* Header */}
                <div className="p-6 border-b border-white/10 flex flex-col md:flex-row justify-between items-center bg-white/5 gap-4">
                    <div className="flex items-center gap-4">
                        <div className="bg-gradient-to-br from-blue-500 to-purple-600 p-3 rounded-xl shadow-lg">
                            <Wallet className="text-white w-6 h-6" />
                        </div>
                        <div className="text-left">
                            <h2 className="text-2xl font-bold text-white">My Vault</h2>
                            <div className="flex items-center gap-2">
                                {/* Standard RainbowKit Button for Disconnect/Switch Chain */}
                                <div className="scale-90 origin-left">
                                    <ConnectButton accountStatus="avatar" chainStatus="icon" showBalance={false} />
                                </div>
                                <button
                                    onClick={() => setIsTermsOpen(true)}
                                    className="text-xs text-gray-400 underline hover:text-white transition-colors"
                                >
                                    Terms & Rules
                                </button>
                            </div>
                        </div>
                    </div>

                    <div className="flex gap-3">
                        <button
                            onClick={() => setIsDepositModalOpen(true)}
                            className="flex items-center gap-2 bg-blue-600 hover:bg-blue-500 text-white px-6 py-2.5 rounded-xl text-sm font-bold transition-all shadow-lg"
                        >
                            <PlusCircle size={18} />
                            Add Funds
                        </button>
                        <button
                            onClick={() => setIsBuyTicketModalOpen(true)}
                            className="flex items-center gap-2 bg-purple-600 hover:bg-purple-500 text-white px-6 py-2.5 rounded-xl text-sm font-bold transition-all shadow-lg"
                        >
                            <Ticket size={18} />
                            Buy Tickets
                        </button>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-white/10">

                    {/* 1. WALLET BALANCES */}
                    <div className="p-8 space-y-6">
                        <p className="text-gray-400 text-xs uppercase font-bold mb-2 flex items-center gap-2">
                            <DollarSign size={12} /> Available Balance
                        </p>
                        <p className="text-5xl font-mono font-bold text-white tracking-tighter">${totalBalance.toFixed(2)}</p>

                        <div className="space-y-3 pt-4 border-t border-white/5">
                            <div className="flex justify-between items-center text-sm">
                                <span className="text-gray-500">Principal (Test USDC)</span>
                                <span className="font-mono text-white">${usdcBalance.toFixed(2)}</span>
                            </div>
                            <div className="flex justify-between items-center text-sm">
                                <span className="text-yellow-500">Bonus (Test USDC)</span>
                                <span className="font-mono text-yellow-400">${bonusBalance.toFixed(2)}</span>
                            </div>
                        </div>
                    </div>

                    {/* 2. TICKET STATION */}
                    <div className="p-8 bg-gradient-to-b from-blue-900/10 to-transparent">
                        <div className="text-center mb-6">
                            <p className="text-gray-400 text-xs uppercase font-bold mb-2">My Active Tickets</p>
                            <p className="text-4xl font-mono font-bold text-blue-400 tracking-tighter">{ticketBalance.toLocaleString()} 🎟️</p>
                        </div>
                        <div className="bg-black/40 rounded-xl p-4 border border-white/5 text-center">
                            <p className="text-xs text-gray-500 mb-2">Next Draw Pot: <span className="text-green-400 font-bold">$1,250.00</span></p>
                            <div className="w-full bg-gray-700 h-1.5 rounded-full overflow-hidden mb-2">
                                <div className="w-[65%] h-full bg-blue-500" />
                            </div>
                            <p className="text-[10px] text-gray-500 flex justify-between">
                                <span>Time left: 14:02:45</span>
                                <span>Win Chance: {(ticketBalance > 0 ? (ticketBalance / 12500) * 100 : 0).toFixed(4)}%</span>
                            </p>
                        </div>
                    </div>

                    {/* 3. WINNINGS & WITHDRAW */}
                    <div className="p-8 flex flex-col justify-between">
                        <div>
                            <p className="text-gray-400 text-xs uppercase font-bold mb-2 flex items-center gap-2">
                                <Trophy size={12} className="text-green-500" /> Total Winnings
                            </p>
                            <p className="text-4xl font-mono font-bold text-green-400 tracking-tighter">${winnings.toFixed(2)}</p>
                        </div>

                        <div className="flex flex-col gap-2 mt-6">
                            <button
                                onClick={handleWithdraw}
                                disabled={winnings <= 0}
                                className={`w-full py-3 rounded-xl border border-white/10 flex items-center justify-center gap-2 transition-colors ${winnings > 0 ? 'hover:bg-red-500/20 text-red-300' : 'text-gray-600 cursor-not-allowed'}`}
                            >
                                <LogOut size={16} /> Withdraw Winnings
                            </button>
                            <button
                                onClick={() => {
                                    if (winnings <= 0) return;
                                    if (confirm(`Convert $${winnings} winnings to Principal?`)) {
                                        const amount = winnings;
                                        setUsdcBalance(prev => prev + amount);
                                        setWinnings(0);
                                        addTransaction('CONVERT', amount, 'Winnings to Principal');
                                        alert("Winnings Converted to Deposit!");
                                    }
                                }}
                                disabled={winnings <= 0}
                                className={`w-full py-3 rounded-xl border border-white/10 flex items-center justify-center gap-2 transition-colors ${winnings > 0 ? 'bg-green-600 hover:bg-green-500 text-white font-bold' : 'text-gray-600 cursor-not-allowed'}`}
                            >
                                <PlusCircle size={16} /> Convert to Deposit
                            </button>
                        </div>
                    </div>

                </div>

                {/* 4. TRANSACTION HISTORY */}
                <div className="border-t border-white/10 bg-black/20 p-6">
                    <h3 className="text-sm font-bold text-gray-400 uppercase mb-4 flex items-center gap-2">
                        <History size={14} /> Recent Transactions
                    </h3>

                    {transactions.length === 0 ? (
                        <p className="text-gray-500 text-sm text-center py-4">No transactions yet.</p>
                    ) : (
                        <div className="space-y-3">
                            {transactions.map((tx) => (
                                <div key={tx.id} className="flex items-center justify-between p-3 rounded-xl bg-white/5 border border-white/5 hover:bg-white/10 transition-colors">
                                    <div className="flex items-center gap-3">
                                        <div className={`p-2 rounded-lg ${tx.type === 'DEPOSIT' ? 'bg-blue-500/20 text-blue-400' :
                                            tx.type === 'BUY_TICKET' ? 'bg-purple-500/20 text-purple-400' :
                                                tx.type === 'WITHDRAW' ? 'bg-red-500/20 text-red-400' :
                                                    tx.type === 'BONUS' ? 'bg-yellow-500/20 text-yellow-400' :
                                                        'bg-green-500/20 text-green-400'
                                            }`}>
                                            {tx.type === 'DEPOSIT' && <PlusCircle size={16} />}
                                            {tx.type === 'BUY_TICKET' && <Ticket size={16} />}
                                            {tx.type === 'WITHDRAW' && <LogOut size={16} />}
                                            {tx.type === 'CONVERT' && <DollarSign size={16} />}
                                            {tx.type === 'BONUS' && <Sparkles size={16} />}
                                        </div>
                                        <div>
                                            <p className="text-sm font-bold text-white capitalize">{tx.type.replace('_', ' ').toLowerCase()}</p>
                                            <p className="text-xs text-gray-500">{tx.timestamp.toLocaleTimeString()}</p>
                                        </div>
                                    </div>
                                    <div className="text-right">
                                        <p className={`font-mono text-sm font-bold ${['DEPOSIT', 'CONVERT', 'BONUS'].includes(tx.type) ? 'text-green-400' : 'text-white'
                                            }`}>
                                            {['DEPOSIT', 'CONVERT', 'BONUS'].includes(tx.type) ? '+' : '-'}${tx.amount.toFixed(2)}
                                        </p>
                                        {tx.details && <p className="text-xs text-gray-500">{tx.details}</p>}
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>

            {/* MODAL: ADD FUNDS */}
            {isDepositModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
                    <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="bg-gray-900 border border-white/10 p-6 rounded-2xl w-full max-w-md">
                        <h3 className="text-xl font-bold mb-4">Add Test Funds (USDC)</h3>
                        <input
                            type="number"
                            autoFocus
                            placeholder="Amount"
                            value={amountInput}
                            onChange={e => setAmountInput(e.target.value)}
                            className="w-full bg-black/40 border border-white/20 rounded-xl p-4 text-2xl text-white mb-4 focue:outline-none"
                        />
                        <div className="flex gap-2">
                            <button onClick={() => setIsDepositModalOpen(false)} className="flex-1 py-3 rounded-xl bg-white/5 hover:bg-white/10">Cancel</button>
                            <button onClick={handleAddFunds} className="flex-1 py-3 rounded-xl bg-blue-600 hover:bg-blue-500 font-bold">
                                {isLoading ? 'Processing...' : 'Deposit'}
                            </button>
                        </div>
                        <p className="text-xs text-gray-500 mt-4 text-center">Simulates `approve` + `transferFrom`</p>
                    </motion.div>
                </div>
            )}

            {/* MODAL: BUY TICKETS */}
            {isBuyTicketModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
                    <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="bg-gray-900 border border-white/10 p-6 rounded-2xl w-full max-w-md">
                        <h3 className="text-xl font-bold mb-4">Buy Tickets</h3>

                        <div className="flex gap-2 mb-4 p-1 bg-black/40 rounded-xl">
                            <button
                                onClick={() => setPaymentSource('principal')}
                                className={`flex-1 py-2 rounded-lg text-sm font-bold transition-all ${paymentSource === 'principal' ? 'bg-blue-600 text-white' : 'text-gray-500 hover:text-white'}`}
                            >
                                Principal (${usdcBalance})
                            </button>
                            <button
                                onClick={() => setPaymentSource('bonus')}
                                className={`flex-1 py-2 rounded-lg text-sm font-bold transition-all ${paymentSource === 'bonus' ? 'bg-yellow-600 text-white' : 'text-gray-500 hover:text-white'}`}
                            >
                                Bonus (${bonusBalance})
                            </button>
                        </div>

                        <div className="relative mb-4">
                            <input
                                type="number"
                                autoFocus
                                placeholder="Cost in USDC"
                                value={amountInput}
                                onChange={e => setAmountInput(e.target.value)}
                                className="w-full bg-black/40 border border-white/20 rounded-xl p-4 text-2xl text-white focue:outline-none"
                            />
                            <div className="absolute right-4 top-1/2 -translate-y-1/2 text-right">
                                <p className="text-xs text-gray-500 uppercase">You Get</p>
                                <p className="text-lg font-bold text-blue-400">{(Number(amountInput) * 10).toLocaleString()} Tickets</p>
                            </div>
                        </div>

                        <div className="flex gap-2">
                            <button onClick={() => setIsBuyTicketModalOpen(false)} className="flex-1 py-3 rounded-xl bg-white/5 hover:bg-white/10">Cancel</button>
                            <button onClick={handleBuyTickets} className="flex-1 py-3 rounded-xl bg-purple-600 hover:bg-purple-500 font-bold">
                                {isLoading ? 'Processing...' : 'Confirm Usage'}
                            </button>
                        </div>
                    </motion.div>
                </div>
            )}
        </div>
    );
}
