"use client";
import React, { useState } from 'react';

const mockTransactions = [
    { id: 1, type: 'RENTAL_PAYOUT', amount: 840.50, status: 'CREDITED', date: '2 hours ago', property: 'Luxury Apartment in HSR Layout' },
    { id: 2, type: 'RENTAL_PAYOUT', amount: 320.00, status: 'CREDITED', date: 'Yesterday', property: 'Sunset Villa - Goa' },
    { id: 3, type: 'INVESTMENT', amount: -5250.00, status: 'COMPLETED', date: '2 days ago', property: 'Cyber City Office Hub' },
    { id: 4, type: 'WITHDRAWAL', amount: -2000.00, status: 'PENDING', date: '3 days ago', property: 'Bank Transfer' },
];

import { useApp } from '@/context/AppContext';

export default function WalletPage() {
    const { balance, setBalance } = useApp();
    const [withdrawing, setWithdrawing] = useState(false);
    const [withdrawAmount, setWithdrawAmount] = useState("");

    const handleWithdraw = () => {
        const amount = parseFloat(withdrawAmount);
        if (amount > balance) {
            alert("Insufficient balance in wallet!");
            return;
        }
        alert(`Withdrawal of ₹${amount.toLocaleString()} initiated to your linked bank account. It will reflect in 24-48 hours.`);
        setBalance(prev => prev - amount);
        setWithdrawing(false);
        setWithdrawAmount("");
    };

    return (
        <div className="min-h-screen bg-[#050505] text-white pb-32">
            <div className="max-w-4xl mx-auto px-6 pt-12">
                <div className="flex justify-between items-end mb-12">
                    <div>
                        <p className="text-accent font-black uppercase tracking-[0.3em] text-[10px] mb-2">My Funds</p>
                        <h1 className="text-5xl md:text-6xl font-black tracking-tighter">Wallet</h1>
                    </div>
                    <div className="text-right">
                        <span className="bg-accent/10 text-accent px-4 py-1 rounded-full text-[10px] font-black uppercase tracking-widest border border-accent/20">KYC Verified</span>
                    </div>
                </div>

                {/* Main Card */}
                <div className="glass p-12 rounded-[48px] border border-white/5 mb-12 relative overflow-hidden group">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-accent/5 rounded-full blur-3xl -mr-32 -mt-32"></div>
                    <div className="relative z-10">
                        <p className="text-muted text-sm font-bold uppercase tracking-widest mb-4">Available Balance</p>
                        <div className="flex items-baseline gap-4 mb-10">
                            <span className="text-7xl font-black tracking-tighter text-white">₹{balance.toLocaleString()}</span>
                            <span className="text-accent font-bold">INR</span>
                        </div>

                        <div className="flex flex-col sm:flex-row gap-4">
                            <button className="flex-1 py-5 bg-accent text-black font-black rounded-3xl text-lg uppercase tracking-widest hover:shadow-[0_0_40px_rgba(0,208,156,0.3)] transition-all">
                                Add Money
                            </button>
                            <button
                                onClick={() => setWithdrawing(true)}
                                className="flex-1 py-5 glass border border-white/5 text-white font-black rounded-3xl text-lg uppercase tracking-widest hover:bg-white/5 transition-all"
                            >
                                Withdraw to Bank
                            </button>
                        </div>
                    </div>
                </div>

                {/* Stats Breakdown */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-12">
                    <div className="glass p-8 rounded-[32px] border border-white/5">
                        <p className="text-muted text-[10px] font-black uppercase tracking-widest mb-2">Total Rental Earned</p>
                        <p className="text-3xl font-black text-white">₹4,250.00</p>
                    </div>
                    <div className="glass p-8 rounded-[32px] border border-white/5">
                        <p className="text-muted text-[10px] font-black uppercase tracking-widest mb-2">Upcoming Payouts</p>
                        <p className="text-3xl font-black text-accent">₹1,120.50</p>
                    </div>
                </div>

                {/* Recent Transactions */}
                <div>
                    <h3 className="text-xl font-bold mb-8 px-4">Transaction History</h3>
                    <div className="space-y-4">
                        {mockTransactions.map(tx => (
                            <div key={tx.id} className="glass p-6 rounded-[32px] border border-white/5 flex justify-between items-center">
                                <div className="flex gap-6 items-center">
                                    <div className={`w-12 h-12 rounded-2xl flex items-center justify-center text-xl ${tx.amount > 0 ? 'bg-accent/10 text-accent' : 'bg-white/5 text-white'}`}>
                                        {tx.type === 'RENTAL_PAYOUT' ? '💰' : tx.type === 'WITHDRAWAL' ? '🏦' : '🏗️'}
                                    </div>
                                    <div>
                                        <p className="font-bold text-white">{tx.type.replace('_', ' ')}</p>
                                        <p className="text-[10px] text-muted uppercase font-black tracking-tighter">{tx.property} • {tx.date}</p>
                                    </div>
                                </div>
                                <div className="text-right">
                                    <p className={`text-lg font-black ${tx.amount > 0 ? 'text-accent' : 'text-white'}`}>
                                        {tx.amount > 0 ? '+' : ''}₹{Math.abs(tx.amount).toLocaleString()}
                                    </p>
                                    <p className="text-[8px] font-black uppercase tracking-widest text-muted">{tx.status}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Withdraw Modal */}
            {withdrawing && (
                <div className="fixed inset-0 z-[110] flex items-center justify-center p-4">
                    <div className="absolute inset-0 bg-black/90 backdrop-blur-xl" onClick={() => setWithdrawing(false)}></div>
                    <div className="relative w-full max-w-md glass p-10 rounded-[48px] border border-white/10 shadow-2xl animate-in zoom-in-95 duration-300">
                        <h2 className="text-3xl font-black mb-2">Withdraw</h2>
                        <p className="text-muted text-sm mb-8 font-bold uppercase tracking-widest">To: HDFC Bank •••• 4291</p>

                        <div className="mb-10">
                            <label className="text-[10px] font-black text-muted uppercase tracking-[0.2em] mb-4 block">Amount to withdraw</label>
                            <div className="flex items-center gap-4 bg-white/5 p-6 rounded-3xl border border-white/5 focus-within:border-accent/40 transition-all">
                                <span className="text-3xl font-black text-accent">₹</span>
                                <input
                                    type="number"
                                    value={withdrawAmount}
                                    onChange={(e) => setWithdrawAmount(e.target.value)}
                                    className="bg-transparent border-none outline-none text-4xl font-black w-full"
                                    placeholder="0"
                                    autoFocus
                                />
                            </div>
                        </div>

                        <div className="space-y-4">
                            <button
                                onClick={handleWithdraw}
                                className="w-full py-5 bg-accent text-black font-black rounded-[32px] text-lg uppercase tracking-widest hover:shadow-[0_0_40px_rgba(0,208,156,0.3)] transition-all"
                            >
                                Confirm Withdrawal
                            </button>
                            <button
                                onClick={() => setWithdrawing(false)}
                                className="w-full py-4 text-muted font-bold hover:text-white transition-all"
                            >
                                Cancel
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
