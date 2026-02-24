"use client";
import React, { useState } from 'react';
import CertificateGenerator from '@/components/CertificateGenerator';

import { mockProperties } from '@/constants/mockData';

const mockInvestments = [
    {
        id: '1',
        property: mockProperties[0].title,
        equity: 0.0525, // 0.0525%
        invested: 5250,
        currentValue: 5850,
        roi: '+11.4%',
        nextPayout: 'March 15, 2026',
        status: mockProperties[0].status,
        location: mockProperties[0].location
    },
    {
        id: '2',
        property: mockProperties[1].title,
        equity: 0.1250, // 0.125%
        invested: 12500,
        currentValue: 14200,
        roi: '+13.6%',
        nextPayout: 'March 10, 2026',
        status: mockProperties[1].status,
        location: mockProperties[1].location
    },
    {
        id: '3',
        property: mockProperties[2].title,
        equity: 0.0200, // 0.02%
        invested: 2000,
        currentValue: 2150,
        roi: '+7.5%',
        nextPayout: 'April 05, 2026',
        status: mockProperties[2].status,
        location: mockProperties[2].location
    }
];


export default function PortfolioPage() {
    const [selectedCert, setSelectedCert] = useState<any>(null);

    const totalInvested = mockInvestments.reduce((acc, inv) => acc + inv.invested, 0);
    const currentValue = mockInvestments.reduce((acc, inv) => acc + inv.currentValue, 0);
    const totalGain = currentValue - totalInvested;
    const avgRoi = ((totalGain / totalInvested) * 100).toFixed(1);

    return (
        <div className="min-h-screen bg-[#050505] text-white pb-32">
            <div className="max-w-7xl mx-auto px-6 pt-12">
                <div className="flex justify-between items-end mb-12">
                    <div>
                        <p className="text-accent font-black uppercase tracking-[0.3em] text-[10px] mb-2">Investor Dashboard</p>
                        <h1 className="text-5xl md:text-6xl font-black tracking-tighter">Portfolio</h1>
                    </div>
                    <div className="text-right">
                        <p className="text-muted text-xs font-bold uppercase tracking-widest mb-1">Total Assets</p>
                        <p className="text-3xl font-black">₹{currentValue.toLocaleString()}</p>
                    </div>
                </div>

                {/* Summary Grid */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-12">
                    <SummaryCard label="Total Invested" value={`₹${totalInvested.toLocaleString()}`} />
                    <SummaryCard label="Net Profit" value={`+₹${totalGain.toLocaleString()}`} subValue={`${avgRoi}% Total ROI`} color="text-accent" />
                    <SummaryCard label="Monthly Yield" value="₹1,450" subValue="Next payout in 12 days" />
                    <SummaryCard label="Active Assets" value={mockInvestments.length.toString()} subValue={`${mockInvestments.filter(i => i.status === 'FUNDED').length} Fully Funded`} />
                </div>

                {/* Main Content Split */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Left: Performance & Asset List */}
                    <div className="lg:col-span-2 space-y-8">
                        <div className="glass p-8 rounded-[40px] border border-white/5 relative overflow-hidden group">
                            <div className="absolute top-0 right-0 p-8">
                                <span className="bg-accent/10 border border-accent/20 text-accent px-4 py-1 rounded-full text-[10px] font-black uppercase tracking-widest">Live Growth</span>
                            </div>
                            <h3 className="text-xl font-bold mb-8">Performance Trajectory</h3>
                            <div className="h-64 flex items-end gap-2 relative">
                                {[30, 45, 35, 55, 65, 45, 75, 85, 60, 90, 85, 95].map((h, i) => (
                                    <div key={i} className="flex-1 bg-gradient-to-t from-accent to-accent/20 rounded-t-lg transition-all duration-500 group-hover:opacity-80" style={{ height: `${h}%` }}></div>
                                ))}
                            </div>
                            <div className="flex justify-between mt-4 px-2 text-[10px] font-black text-muted uppercase tracking-widest">
                                <span>Jan 2025</span>
                                <span>Present</span>
                            </div>
                        </div>

                        <div className="space-y-4">
                            <h3 className="text-xl font-bold px-4 mb-6">Active Holdings</h3>
                            {mockInvestments.map(inv => (
                                <div key={inv.id} className="glass p-6 rounded-[32px] border border-white/5 flex flex-col md:flex-row justify-between items-start md:items-center hover:bg-white/5 transition-all group gap-4">
                                    <div className="flex gap-6 items-center">
                                        <div className={`w-14 h-14 rounded-2xl flex items-center justify-center text-2xl ${inv.status === 'FUNDED' ? 'bg-accent/10 text-accent' : 'bg-blue-500/10 text-blue-500'}`}>
                                            {inv.status === 'FUNDED' ? '🏢' : '🏗️'}
                                        </div>
                                        <div>
                                            <h4 className="text-xl font-black group-hover:text-accent transition-colors">{inv.property}</h4>
                                            <div className="flex gap-3 text-[10px] font-bold text-muted uppercase tracking-widest mt-1">
                                                <span>{inv.location}</span>
                                                <span className="opacity-30">•</span>
                                                <span>Equity: {inv.equity.toFixed(4)}%</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="flex gap-12 items-center w-full md:w-auto justify-between md:justify-end">
                                        <div className="text-right">
                                            <p className="text-sm text-muted font-bold tracking-widest uppercase mb-1">ROI</p>
                                            <p className="text-xl font-black text-accent">{inv.roi}</p>
                                        </div>
                                        <div className="text-right">
                                            <p className="text-sm text-muted font-bold tracking-widest uppercase mb-1">Current Value</p>
                                            <p className="text-xl font-black">₹{inv.currentValue.toLocaleString()}</p>
                                        </div>
                                        <div className="flex flex-col gap-2">
                                            <button
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    alert(`Listing your ${inv.equity.toFixed(4)}% stake in ${inv.property} for ₹${(inv.currentValue * 1.05).toLocaleString()} on the secondary market.`);
                                                }}
                                                className="px-6 py-2 bg-white/5 border border-white/10 text-white font-bold rounded-xl text-xs uppercase tracking-widest hover:bg-white/10 transition-all active:scale-95"
                                            >
                                                Sell Stake
                                            </button>
                                            <p className="text-[8px] text-muted text-center uppercase font-black">Secondary Market</p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>


                    {/* Right: Digital Certificates */}
                    <div className="lg:col-span-1 space-y-6">
                        <div className="glass p-8 rounded-[40px] border border-white/5 bg-gradient-to-br from-white/[0.02] to-transparent">
                            <div className="flex items-center gap-3 mb-8">
                                <span className="text-2xl">📜</span>
                                <h3 className="text-xl font-bold">Ownership Certificates</h3>
                            </div>

                            <p className="text-muted text-sm mb-8 leading-relaxed">
                                Once a property is 100% funded, your digital ownership certificates are generated with a unique barcode for legal verification.
                            </p>

                            <div className="space-y-4">
                                {mockInvestments.filter(i => i.status === 'FUNDED').map(inv => (
                                    <button
                                        key={inv.id}
                                        onClick={() => setSelectedCert(inv)}
                                        className="w-full p-4 rounded-2xl border border-white/5 bg-white/5 hover:bg-white/10 transition-all text-left flex justify-between items-center group"
                                    >
                                        <div>
                                            <p className="text-xs font-black uppercase tracking-widest text-accent mb-1">Fully Funded</p>
                                            <p className="text-sm font-bold truncate max-w-[150px]">{inv.property}</p>
                                        </div>
                                        <span className="text-muted group-hover:text-white transition-colors">→</span>
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Recent Transactions Mock */}
                        <div className="glass p-8 rounded-[40px] border border-white/5">
                            <h3 className="text-lg font-bold mb-6">Recent Activity</h3>
                            <div className="space-y-6">
                                {[
                                    { type: 'Buy', amount: '₹5,250', date: '2 days ago' },
                                    { type: 'Rental Payout', amount: '+₹840', date: '1 week ago' },
                                    { type: 'Buy', amount: '₹12,500', date: '2 weeks ago' },
                                ].map((t, i) => (
                                    <div key={i} className="flex justify-between items-center">
                                        <div>
                                            <p className="text-sm font-bold">{t.type}</p>
                                            <p className="text-[10px] text-muted uppercase font-black">{t.date}</p>
                                        </div>
                                        <p className={`text-sm font-black ${t.amount.startsWith('+') ? 'text-accent' : 'text-white'}`}>{t.amount}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Certificate Modal */}
            {selectedCert && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
                    <div className="absolute inset-0 bg-black/90 backdrop-blur-xl" onClick={() => setSelectedCert(null)}></div>
                    <div className="relative w-full max-w-2xl animate-in fade-in zoom-in duration-300">
                        <CertificateGenerator propertyName={selectedCert.property} stake={selectedCert.equity} />
                    </div>
                </div>
            )}
        </div>
    );
}

function SummaryCard({ label, value, subValue, color = "text-white" }: { label: string, value: string, subValue?: string, color?: string }) {
    return (
        <div className="glass p-8 rounded-[32px] border border-white/5 hover:border-white/10 transition-all">
            <p className="text-muted text-[10px] font-black uppercase tracking-[0.2em] mb-3">{label}</p>
            <p className={`text-3xl font-black ${color} tracking-tighter`}>{value}</p>
            {subValue && <p className="text-muted text-[10px] mt-2 font-bold uppercase tracking-widest">{subValue}</p>}
        </div>
    );
}
