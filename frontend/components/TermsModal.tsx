'use client';

import { X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface TermsModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export function TermsModal({ isOpen, onClose }: TermsModalProps) {
    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4"
                >
                    <motion.div
                        initial={{ scale: 0.95, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0.95, opacity: 0 }}
                        className="bg-gray-900 border border-gray-700 rounded-2xl max-w-2xl w-full max-h-[80vh] overflow-hidden flex flex-col shadow-2xl"
                    >
                        <div className="p-6 border-b border-gray-800 flex justify-between items-center bg-gray-900">
                            <h2 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500">
                                Terms & Conditions
                            </h2>
                            <button
                                onClick={onClose}
                                className="p-2 hover:bg-gray-800 rounded-full transition-colors text-gray-400 hover:text-white"
                            >
                                <X size={24} />
                            </button>
                        </div>

                        <div className="p-6 overflow-y-auto text-gray-300 space-y-4 leading-relaxed">
                            <p className="text-sm text-gray-500 uppercase tracking-wider font-semibold">Last Updated: January 2026</p>

                            <section>
                                <h3 className="text-white font-bold text-lg mb-2">1. Acceptance of Terms</h3>
                                <p>By connecting your wallet and depositing funds into PrizeVault, you agree to be bound by these Terms and Conditions. If you do not agree, please do not use the protocol.</p>
                            </section>

                            <section>
                                <h3 className="text-white font-bold text-lg mb-2">2. No-Loss Mechanic & Risk</h3>
                                <p>PrizeVault is designed as a "no-loss" prize savings game where your principal is preserved. However, smart contract risks exist. While we audit our code, we cannot guarantee total immunity from hacks or bugs.</p>
                            </section>

                            <section>
                                <h3 className="text-white font-bold text-lg mb-2">3. User Responsibility</h3>
                                <ul className="list-disc pl-5 space-y-2">
                                    <li><strong className="text-red-400">Lost Keys / Access:</strong> You are solely responsible for safeguarding your private keys and wallet access. PrizeVault has <strong>no control</strong> over your wallet and <strong>cannot recover funds</strong> if you lose access. We are not responsible for any loss of funds due to lost private keys.</li>
                                    <li><strong className="text-red-400">Shared Accounts:</strong> If you share your wallet or device with others, you assume all risks. PrizeVault is not responsible for unauthorized transactions or withdrawals made from your wallet.</li>
                                </ul>
                            </section>

                            <section>
                                <h3 className="text-white font-bold text-lg mb-2">4. Disclaimers</h3>
                                <p>The protocol is provided "as is" without warranty of any kind. We disclaim all liability for any damages arising from your use of the service, including but not limited to direct, indirect, incidental, or consequential damages.</p>
                            </section>
                        </div>

                        <div className="p-6 border-t border-gray-800 bg-gray-900 flex justify-end">
                            <button
                                onClick={onClose}
                                className="px-6 py-3 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-lg transition-all"
                            >
                                I Understand & Agree
                            </button>
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
