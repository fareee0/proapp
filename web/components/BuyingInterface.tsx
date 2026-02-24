"use client";
import React, { useState } from 'react';
import { useApp } from '@/context/AppContext';

export default function BuyingInterface({ onClose, property }: { onClose: () => void, property: any }) {
    const { balance, setBalance } = useApp();
    const [amount, setAmount] = useState<string>("500");
    const [isSip, setIsSip] = useState(false);
    const [isPressed, setIsPressed] = useState<string | null>(null);
    const platformFee = 20;

    const totalPropertyValuation = property?.totalValuation || 10000000;
    const investmentAmount = parseFloat(amount) || 0;
    const stakePercentage = (investmentAmount / totalPropertyValuation) * 100;

    const totalRequired = investmentAmount + platformFee;

    const handleKeypad = (val: string) => {
        setIsPressed(val);
        setTimeout(() => setIsPressed(null), 100);

        setAmount(prev => {
            if (val === '⌫') {
                if (prev.length <= 1) return "0";
                return prev.slice(0, -1);
            }
            if (val === '.') {
                if (prev.includes('.')) return prev;
                return prev + '.';
            }
            if (val === 'C') return "0";

            // Handle number insertion
            if (prev === "0") return val;
            if (prev.length >= 9) return prev; // Limit
            return prev + val;
        });
    };

    const addQuickAmount = (val: number) => {
        setAmount(prev => {
            const current = parseFloat(prev) || 0;
            return (current + val).toString();
        });
    };

    const handleConfirm = async () => {
        if (investmentAmount < (property?.minInvestment || 500)) {
            alert(`Minimum investment is ₹${property?.minInvestment || 500}`);
            return;
        }

        if (balance < totalRequired) {
            alert("Insufficient balance in your wallet.");
            return;
        }

        // Update global balance
        setBalance(prev => prev - totalRequired);

        // Simulating the Groww-style "Invested" success state
        alert(isSip
            ? `SIP of ₹${investmentAmount}/mo started for ${property.title}`
            : `Invested ₹${investmentAmount.toLocaleString()} successfully! Funds will be settled in T+2 days.`);

        onClose();
    };

    return (
        <div className="fixed inset-0 z-[100] flex items-end sm:items-center justify-center p-0 sm:p-4">
            <div className="absolute inset-0 bg-black/90 backdrop-blur-md" onClick={onClose}></div>

            <div className="relative w-full max-w-lg bg-[#0A0A0A] rounded-t-[40px] sm:rounded-[48px] border-t sm:border border-white/10 overflow-hidden shadow-[0_-20px_60px_rgba(0,0,0,0.8)] animate-in slide-in-from-bottom duration-500">
                <div className="p-8 pb-12">
                    <div className="flex justify-between items-center mb-10">
                        <div className="flex items-center gap-4">
                            <div className="w-12 h-12 rounded-2xl bg-accent/10 flex items-center justify-center text-2xl">🏢</div>
                            <div>
                                <h2 className="text-xl font-black text-white">{property.title}</h2>
                                <p className="text-muted text-[10px] font-bold uppercase tracking-widest">{isSip ? 'Monthly SIP' : 'One-time Investment'}</p>
                            </div>
                        </div>
                        <button className="w-10 h-10 flex items-center justify-center bg-white/5 rounded-full text-muted hover:text-white transition-all" onClick={onClose}>✕</button>
                    </div>

                    {/* Mode Toggle */}
                    <div className="flex gap-2 p-1.5 bg-white/5 rounded-3xl mb-12 border border-white/5">
                        <button
                            onClick={() => setIsSip(false)}
                            className={`flex-1 py-3.5 rounded-2xl text-[10px] font-black uppercase tracking-[0.2em] transition-all duration-300 ${!isSip ? 'bg-white/10 text-white shadow-xl' : 'text-muted hover:text-white'}`}
                        >
                            One-Time
                        </button>
                        <button
                            onClick={() => setIsSip(true)}
                            className={`flex-1 py-3.5 rounded-2xl text-[10px] font-black uppercase tracking-[0.2em] transition-all duration-300 ${isSip ? 'bg-accent text-black shadow-[0_0_20px_rgba(0,208,156,0.4)]' : 'text-muted hover:text-white'}`}
                        >
                            Monthly SIP
                        </button>
                    </div>

                    {/* Amount Input Display */}
                    <div className="text-center mb-10 relative">
                        <p className="text-muted text-[10px] font-black uppercase tracking-[0.3em] mb-4">{isSip ? 'Installment Amount' : 'Investment Amount'}</p>
                        <div className="flex items-center justify-center gap-3 h-20">
                            <span className="text-4xl font-black text-accent/50">₹</span>
                            <span className="text-7xl font-black tracking-tighter text-white animate-in zoom-in duration-200">{parseFloat(amount).toLocaleString()}</span>
                            <div className="w-1 h-12 bg-accent opacity-50 animate-pulse ml-2"></div>
                        </div>
                        <div className="mt-4 flex flex-col items-center gap-2">
                            <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-white/5 rounded-full border border-white/5">
                                <span className="text-accent text-xs font-black">{stakePercentage.toFixed(5)}%</span>
                                <span className="text-[10px] text-muted font-bold uppercase tracking-widest">Equity Stake</span>
                            </div>
                            {investmentAmount < (property?.minInvestment || 500) && (
                                <p className="text-[10px] text-red-500 font-bold uppercase mt-2">Min. Investment ₹{property?.minInvestment || 500}</p>
                            )}
                        </div>
                    </div>

                    {/* Quick Add Chips */}
                    <div className="flex justify-center gap-3 mb-12">
                        {[1000, 5000, 10000].map(val => (
                            <button
                                key={val}
                                onClick={() => addQuickAmount(val)}
                                className="px-5 py-2.5 rounded-2xl bg-white/5 border border-white/10 text-xs font-bold text-white hover:bg-white/10 active:scale-95 transition-all"
                            >
                                +₹{val.toLocaleString()}
                            </button>
                        ))}
                    </div>

                    {/* Numeric Keypad */}
                    <div className="grid grid-cols-3 gap-y-4 gap-x-8 mb-12 max-w-sm mx-auto">
                        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 'C', 0, '⌫'].map(k => (
                            <button
                                key={k.toString()}
                                onClick={() => handleKeypad(k.toString())}
                                className={`h-16 flex items-center justify-center font-black text-2xl rounded-3xl transition-all relative group
                                    ${isPressed === k.toString() ? 'bg-accent/20 text-accent scale-90' : 'bg-transparent text-white hover:bg-white/5'}
                                    ${k === '⌫' ? 'text-xl' : ''}
                                `}
                            >
                                {k}
                                {isPressed === k.toString() && <div className="absolute inset-0 rounded-3xl bg-accent/20 animate-ping opacity-20"></div>}
                            </button>
                        ))}
                    </div>

                    {/* Summary & Action */}
                    <div className="space-y-6">
                        <div className="flex justify-between items-center px-4">
                            <div className="flex flex-col">
                                <span className="text-muted text-[10px] font-black uppercase tracking-widest">Wallet Balance</span>
                                <span className="text-white font-black">₹{balance.toLocaleString()}</span>
                            </div>
                            <div className="text-right flex flex-col">
                                <span className="text-muted text-[10px] font-black uppercase tracking-widest">Total Payable</span>
                                <span className="text-white font-black">₹{totalRequired.toLocaleString()}</span>
                            </div>
                        </div>

                        <button
                            onClick={handleConfirm}
                            disabled={balance < totalRequired || investmentAmount < (property?.minInvestment || 500)}
                            className={`w-full py-6 rounded-[32px] text-xl font-black uppercase tracking-[0.2em] transition-all relative overflow-hidden group
                                ${balance >= totalRequired && investmentAmount >= (property?.minInvestment || 500)
                                    ? 'bg-accent text-black hover:shadow-[0_0_50px_rgba(0,208,156,0.4)] active:scale-[0.98]'
                                    : 'bg-white/10 text-muted cursor-not-allowed'}
                            `}
                        >
                            <span className="relative z-10">
                                {balance < totalRequired ? 'INSUFFICIENT BALANCE' : (isSip ? 'START MONTHLY SIP' : 'INVEST NOW')}
                            </span>
                            {balance >= totalRequired && (
                                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:animate-shimmer"></div>
                            )}
                        </button>
                        <p className="text-[10px] text-center text-muted font-bold uppercase tracking-widest">Secure 128-bit Encrypted Transaction</p>
                    </div>
                </div>
            </div>
        </div>
    );
}
