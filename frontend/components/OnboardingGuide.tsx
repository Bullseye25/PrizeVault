'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ArrowRight, Wallet, Clock, Trophy, LogOut } from 'lucide-react';
import { cn } from '@/lib/utils';

const steps = [
    {
        icon: <Wallet className="w-12 h-12 text-blue-400" />,
        title: "How to Play",
        desc: "Connect your wallet and deposit USDC. 1 USDC = 10 Tickets. The more tickets you have, the higher your chances."
    },
    {
        icon: <Clock className="w-12 h-12 text-purple-400" />,
        title: "Daily Draws",
        desc: "Every 24 hours, the smart contract randomly selects a winning ticket using Chainlink VRF."
    },
    {
        icon: <Trophy className="w-12 h-12 text-yellow-400" />,
        title: "Win the Pot",
        desc: "If you win, you take the entire prize pool! If you lose, your ticket purchase contributes to the next pot."
    },
    {
        icon: <LogOut className="w-12 h-12 text-green-400" />,
        title: "Fair Play",
        desc: "Provably fair and transparent. All funds go into the smart contract prize pool."
    }
];

export function OnboardingGuide() {
    const [isOpen, setIsOpen] = useState(false);
    const [currentStep, setCurrentStep] = useState(0);

    useEffect(() => {
        const hasSeenGuide = localStorage.getItem('hasSeenOnboarding');
        if (!hasSeenGuide) {
            setTimeout(() => setIsOpen(true), 1000); // Delay for effect
        }
    }, []);

    const handleNext = () => {
        if (currentStep < steps.length - 1) {
            setCurrentStep(curr => curr + 1);
        } else {
            handleClose();
        }
    };

    const handleClose = () => {
        setIsOpen(false);
        localStorage.setItem('hasSeenOnboarding', 'true');
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 z-[60] flex items-center justify-center bg-black/80 backdrop-blur-sm p-4"
                >
                    <motion.div
                        initial={{ scale: 0.9, y: 20 }}
                        animate={{ scale: 1, y: 0 }}
                        exit={{ scale: 0.9, opacity: 0 }}
                        className="bg-gray-900 border border-gray-700 rounded-2xl max-w-md w-full overflow-hidden shadow-2xl relative"
                    >
                        {/* Progress Bar */}
                        <div className="absolute top-0 left-0 h-1 bg-gray-800 w-full">
                            <motion.div
                                className="h-full bg-gradient-to-r from-blue-500 to-purple-500"
                                initial={{ width: 0 }}
                                animate={{ width: `${((currentStep + 1) / steps.length) * 100}%` }}
                            />
                        </div>

                        <button
                            onClick={handleClose}
                            className="absolute top-4 right-4 text-gray-500 hover:text-white transition-colors"
                        >
                            <X size={20} />
                        </button>

                        <div className="p-8 text-center flex flex-col items-center h-[400px]">
                            <div className="flex-1 flex flex-col items-center justify-center">
                                <motion.div
                                    key={currentStep}
                                    initial={{ opacity: 0, x: 20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: -20 }}
                                    transition={{ duration: 0.3 }}
                                    className="flex flex-col items-center"
                                >
                                    <div className="mb-6 p-4 bg-gray-800 rounded-full">
                                        {steps[currentStep].icon}
                                    </div>
                                    <h3 className="text-2xl font-bold mb-4">{steps[currentStep].title}</h3>
                                    <p className="text-gray-400 leading-relaxed">
                                        {steps[currentStep].desc}
                                    </p>
                                </motion.div>
                            </div>

                            <div className="w-full flex items-center justify-between mt-8 pt-4 border-t border-gray-800">
                                <button
                                    onClick={handleClose}
                                    className="text-sm text-gray-500 hover:text-white transition-colors font-medium px-4 py-2"
                                >
                                    Skip
                                </button>

                                <button
                                    onClick={handleNext}
                                    className="flex items-center gap-2 bg-white text-black px-6 py-2 rounded-full font-bold hover:bg-gray-200 transition-colors"
                                >
                                    {currentStep === steps.length - 1 ? 'Get Started' : 'Next'}
                                    {currentStep !== steps.length - 1 && <ArrowRight size={16} />}
                                </button>
                            </div>
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
