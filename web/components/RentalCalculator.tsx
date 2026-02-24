"use client";
import React, { useState } from 'react';

export default function RentalCalculator({ totalValuation, rentalYield }: { totalValuation: number, rentalYield: number }) {
    const [investment, setInvestment] = useState(50000);

    const totalAnnualRent = totalValuation * (rentalYield / 100);
    const totalMonthlyRent = totalAnnualRent / 12;

    // User's stake calculation
    const stakePercentage = (investment / totalValuation) * 100;
    const userMonthlyIncome = (investment / totalValuation) * totalMonthlyRent;
    const userAnnualIncome = userMonthlyIncome * 12;

    return (
        <div className="glass p-8 rounded-[32px] border border-white/5 mt-10">
            <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
                <span className="text-accent text-2xl">💰</span> Rental Payout Estimator
            </h3>

            <div className="space-y-8">
                <div>
                    <div className="flex justify-between mb-4">
                        <label className="text-[10px] font-black text-muted uppercase tracking-[0.2em]">Your Investment</label>
                        <span className="text-accent font-black text-2xl tracking-tighter">₹{investment.toLocaleString()}</span>
                    </div>
                    <input
                        type="range"
                        min="500"
                        max={Math.min(totalValuation, 1000000)}
                        step="500"
                        value={investment}
                        onChange={(e) => setInvestment(parseInt(e.target.value))}
                        className="w-full h-1.5 bg-white/10 rounded-full appearance-none cursor-pointer accent-accent"
                    />
                    <div className="flex justify-between mt-2 text-[10px] font-bold text-muted uppercase">
                        <span>Min: ₹500</span>
                        <span>Stake: {stakePercentage.toFixed(4)}%</span>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-white/5 p-6 rounded-2xl border border-white/5">
                        <p className="text-muted text-[10px] font-black uppercase tracking-widest mb-2">Estimated Monthly Rent</p>
                        <p className="text-3xl font-black text-white leading-none">₹{userMonthlyIncome.toLocaleString(undefined, { maximumFractionDigits: 0 })}</p>
                        <p className="text-[10px] text-muted mt-2 uppercase font-bold">Direct to wallet</p>
                    </div>
                    <div className="bg-accent/10 p-6 rounded-2xl border border-accent/20">
                        <p className="text-accent text-[10px] font-black uppercase tracking-widest mb-2">Estimated Annual Rent</p>
                        <p className="text-3xl font-black text-accent leading-none">₹{userAnnualIncome.toLocaleString(undefined, { maximumFractionDigits: 0 })}</p>
                        <p className="text-[10px] text-accent/60 mt-2 uppercase font-bold">Yield: {rentalYield}%</p>
                    </div>
                </div>

                <div className="p-4 rounded-2xl bg-white/5 border border-white/5">
                    <div className="flex justify-between items-center text-xs">
                        <span className="text-muted font-bold uppercase tracking-widest">Total Property Monthly Rent</span>
                        <span className="text-white font-black">₹{totalMonthlyRent.toLocaleString(undefined, { maximumFractionDigits: 0 })}</span>
                    </div>
                </div>
            </div>
        </div>
    );
}

