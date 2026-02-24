"use client";
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { useParams } from 'next/navigation';
import { mockProperties } from '@/constants/mockData';
import BuyingInterface from '@/components/BuyingInterface';
import RentalCalculator from '@/components/RentalCalculator';
import CertificateGenerator from '@/components/CertificateGenerator';

export default function PropertyDetailPage() {
    const params = useParams();
    const [isBuying, setIsBuying] = useState(false);
    const [activeTab, setActiveTab] = useState<'OVERVIEW' | 'HOW_IT_WORKS' | 'LEGAL' | 'FINANCIALS'>('OVERVIEW');
    const [liveProperty, setLiveProperty] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    const propertyId = params.id as string;

    useEffect(() => {
        async function fetchProperty() {
            try {
                const res = await fetch(`http://localhost:5000/api/properties`);
                if (res.ok) {
                    const data = await res.json();
                    const found = data.find((p: any) => p.id === propertyId);
                    if (found) {
                        setLiveProperty({
                            ...found,
                            roi: found.expectedROI,
                            fundingProgress: found.totalShares > 0 ? (found.fundedShares / found.totalShares) * 100 : 0
                        });
                    }
                }
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        }
        fetchProperty();
    }, [propertyId]);

    const property = liveProperty || mockProperties.find(p => p.id === propertyId) || mockProperties[0];

    return (
        <div className="min-h-screen bg-[#050505] text-white pb-32">
            {/* Photo Gallery Mock */}
            <div className="grid grid-cols-4 gap-2 h-[400px] p-4">
                <div className="col-span-3 rounded-3xl overflow-hidden relative group">
                    <Image
                        src={property.imageUrl}
                        alt="main"
                        fill
                        priority
                        sizes="(max-width: 768px) 100vw, 75vw"
                        className="object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                </div>
                <div className="flex flex-col gap-2">
                    <div className="h-1/2 rounded-3xl overflow-hidden relative">
                        <Image src="https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=600&q=80" alt="sub1" fill sizes="25vw" className="object-cover" />
                    </div>
                    <div className="h-1/2 rounded-3xl overflow-hidden relative">
                        <Image src="https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=600&q=80" alt="sub2" fill sizes="25vw" className="object-cover" />
                    </div>
                </div>
            </div>

            {/* Content */}
            <div className="max-w-7xl mx-auto px-6 mt-8 grid grid-cols-1 lg:grid-cols-3 gap-12">
                <div className="lg:col-span-2">
                    <div className="flex justify-between items-start mb-6">
                        <div>
                            <h1 className="text-4xl md:text-5xl font-black mb-2 tracking-tight">{property.title}</h1>
                            <p className="text-muted flex items-center text-lg">
                                <span className="mr-2">📍</span> {property.location}
                            </p>
                        </div>
                        <div className="text-right">
                            <span className={`px-4 py-1.5 rounded-full text-sm font-bold border ${property.fundingProgress >= 100 ? 'bg-accent/10 text-accent border-accent/20' : 'bg-blue-500/10 text-blue-500 border-blue-500/20'}`}>
                                {property.fundingProgress >= 100 ? 'FULLY FUNDED' : 'AVAILABLE'}
                            </span>
                        </div>
                    </div>

                    {/* Tabs */}
                    <div className="flex gap-8 border-b border-white/5 mb-8 overflow-x-auto no-scrollbar whitespace-nowrap">
                        <button
                            onClick={() => setActiveTab('OVERVIEW')}
                            className={`pb-4 font-bold transition-all ${activeTab === 'OVERVIEW' ? 'border-b-2 border-accent text-accent' : 'text-muted hover:text-white'}`}
                        >Overview</button>
                        <button
                            onClick={() => setActiveTab('HOW_IT_WORKS')}
                            className={`pb-4 font-bold transition-all ${activeTab === 'HOW_IT_WORKS' ? 'border-b-2 border-accent text-accent' : 'text-muted hover:text-white'}`}
                        >How it works</button>
                        <button
                            onClick={() => setActiveTab('LEGAL')}
                            className={`pb-4 font-bold transition-all ${activeTab === 'LEGAL' ? 'border-b-2 border-accent text-accent' : 'text-muted hover:text-white'}`}
                        >Legal Documents</button>
                        <button
                            onClick={() => setActiveTab('FINANCIALS')}
                            className={`pb-4 font-bold transition-all ${activeTab === 'FINANCIALS' ? 'border-b-2 border-accent text-accent' : 'text-muted hover:text-white'}`}
                        >Financial Projections</button>
                    </div>

                    {/* Tab Content */}
                    {activeTab === 'OVERVIEW' && (
                        <div className="animate-in fade-in duration-500">
                            {/* Description */}
                            <div className="prose prose-invert max-w-none mb-12">
                                <h3 className="text-2xl font-bold mb-4">Property Description</h3>
                                <p className="text-muted leading-relaxed text-lg">
                                    {property.description}
                                </p>
                            </div>

                            {/* New Features! */}
                            <RentalCalculator totalValuation={property.totalValuation} rentalYield={property.rentalYield} />

                            <div className="mt-10">
                                <h3 className="text-xl font-bold mb-4">Investment Verification</h3>
                                {property.fundingProgress >= 100 ? (
                                    <>
                                        <p className="text-muted mb-6">Funding is complete! You can now view and download your ownership certificate with unique barcode.</p>
                                        <CertificateGenerator propertyName={property.title} stake={0.05} />
                                    </>
                                ) : (
                                    <div className="p-10 bg-white/[0.02] border border-white/5 rounded-3xl group">
                                        <div className="flex flex-col items-center text-center">
                                            <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center text-3xl mb-4 group-hover:scale-110 transition-transform">📜</div>
                                            <h4 className="text-lg font-black mb-2 uppercase tracking-wide">Locked Certificate</h4>
                                            <p className="text-muted text-sm max-w-sm mb-6">Ownership certificates are minted automatically once the funding reaches 100%. Secure your stake now to be included in the distribution.</p>
                                            <div className="w-full max-w-xs bg-white/5 h-1.5 rounded-full overflow-hidden">
                                                <div className="bg-accent h-full shadow-[0_0_10px_rgba(0,208,156,0.5)]" style={{ width: `${property.fundingProgress}%` }}></div>
                                            </div>
                                            <p className="text-[10px] text-accent font-black mt-3 uppercase tracking-widest">{property.fundingProgress}% PROGRESS</p>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    )}

                    {activeTab === 'HOW_IT_WORKS' && (
                        <div className="animate-in slide-in-from-bottom-4 duration-500">
                            <h3 className="text-2xl font-bold mb-8">Investment Lifecycle</h3>
                            <div className="space-y-12 relative before:absolute before:left-8 before:top-2 before:bottom-2 before:w-0.5 before:bg-white/5">
                                {[
                                    { step: 1, title: 'Choose Asset', desc: 'Browse curated, high-yield properties vetted by experts.', icon: '🏢' },
                                    { step: 2, title: 'Invest Stake', desc: 'Buy any amount starting from ₹500 via UPI or Bank Transfer.', icon: '💰' },
                                    { step: 3, title: 'Funding Phase', desc: 'The property stays in primary funding until 100% total value is raised.', icon: '🏗️' },
                                    { step: 4, title: 'Asset Acquisition', desc: 'Once funded, the SPV acquires the asset and executes the registration.', icon: '🔑' },
                                    { step: 5, title: 'Certificate Minting', desc: 'Digital ownership certificates with unique barcodes are issued to all holders.', icon: '📜' },
                                    { step: 6, title: 'Rental Yields', desc: 'Monthly rent is collected and credited directly to your BrickStake wallet.', icon: '📊' }
                                ].map((item) => (
                                    <div key={item.step} className="flex gap-8 relative z-10 group">
                                        <div className="w-16 h-16 rounded-2xl bg-[#0A0A0A] border border-white/10 flex items-center justify-center text-2xl group-hover:border-accent/40 group-hover:shadow-[0_0_20px_rgba(0,208,156,0.1)] transition-all">
                                            {item.icon}
                                        </div>
                                        <div className="flex-1 pt-2">
                                            <p className="text-accent text-[10px] font-black uppercase tracking-widest mb-1">Step {item.step}</p>
                                            <h4 className="text-xl font-bold mb-2">{item.title}</h4>
                                            <p className="text-muted text-sm leading-relaxed">{item.desc}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {activeTab === 'LEGAL' && (
                        <div className="animate-in fade-in duration-500">
                            <h3 className="text-2xl font-bold mb-8">Asset Documentation</h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {[
                                    { name: 'NOC (No Objection Certificate)', status: 'Verified', type: 'Certificate' },
                                    { name: 'BDA/BBMP Approvals', status: 'Approved', type: 'Plan' },
                                    { name: 'Khata Certificate (A Khata)', status: 'Active', type: 'Property Tax' },
                                    { name: 'Sale Deed / Registration', status: 'SPV Backed', type: 'Legal' },
                                    { name: 'Encumbrance Certificate (EC)', status: 'Clear', type: 'History' },
                                    { name: 'Parent Deed (30 years)', status: 'Vetted', type: 'Chain' }
                                ].map((doc, i) => (
                                    <div key={i} className="glass p-6 rounded-3xl border border-white/5 flex justify-between items-center hover:bg-white/5 transition-all group">
                                        <div>
                                            <h4 className="font-bold mb-1 group-hover:text-accent transition-colors">{doc.name}</h4>
                                            <p className="text-[10px] text-muted font-black uppercase tracking-widest">{doc.type}</p>
                                        </div>
                                        <div className="text-right">
                                            <span className="text-[10px] font-black text-accent bg-accent/10 px-3 py-1 rounded-full border border-accent/20">
                                                {doc.status}
                                            </span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <div className="mt-8 p-6 bg-accent/5 border border-accent/10 rounded-3xl">
                                <p className="text-xs text-muted leading-relaxed">
                                    <span className="text-accent font-bold">Disclaimer:</span> All legal documents are digitized and will be shared with investors upon successful investment. You can verify these details with our legal partner SPV structure.
                                </p>
                            </div>
                        </div>
                    )}

                    {activeTab === 'FINANCIALS' && (
                        <div className="animate-in fade-in duration-500">
                            <h3 className="text-2xl font-bold mb-8">Financial Projections</h3>
                            <div className="glass p-8 rounded-[40px] border border-white/5 overflow-hidden relative">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                                    <div className="space-y-6">
                                        <div>
                                            <p className="text-muted text-xs font-bold uppercase tracking-widest mb-2">Target Appreciation</p>
                                            <p className="text-4xl font-black text-white">12-15% <span className="text-muted text-lg font-medium inline-block ml-1">p.a.</span></p>
                                        </div>
                                        <div>
                                            <p className="text-muted text-xs font-bold uppercase tracking-widest mb-2">Monthly Rental Yield</p>
                                            <p className="text-4xl font-black text-accent">5-7% <span className="text-accent/60 text-lg font-medium inline-block ml-1">yield</span></p>
                                        </div>
                                        <p className="text-xs text-muted leading-relaxed italic">
                                            *Projections are based on historical market data in HSR Layout and Cyber City areas.
                                        </p>
                                    </div>
                                    <div className="bg-white/5 rounded-3xl p-6 border border-white/5 flex items-center justify-center">
                                        <div className="text-center">
                                            <div className="text-4xl mb-4">📈</div>
                                            <p className="text-sm font-bold text-white mb-2">ROI Probability</p>
                                            <div className="flex gap-1 justify-center">
                                                {[1, 2, 3, 4, 5].map(i => (
                                                    <div key={i} className={`w-8 h-8 rounded-lg flex items-center justify-center font-black ${i <= 4 ? 'bg-accent text-black' : 'bg-white/10 text-muted'}`}>
                                                        {i * 20}%
                                                    </div>
                                                ))}
                                            </div>
                                            <p className="text-[10px] text-muted font-bold mt-4 uppercase">Very High Confidence</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>


                {/* Sidebar Stats */}
                <div className="lg:col-span-1 space-y-8">
                    <div className="glass p-8 rounded-[32px] border border-white/5 sticky top-28">
                        <div className="flex justify-between items-end mb-4">
                            <div>
                                <p className="text-muted text-[10px] font-black uppercase tracking-widest mb-1">Target Funding</p>
                                <h2 className="text-3xl font-black">₹{(property.totalValuation / 10000000).toFixed(1)} Cr</h2>
                            </div>
                            <div className="text-right">
                                <p className="text-accent font-bold text-xl leading-none">{property.fundingProgress}% funded</p>
                                <p className="text-muted text-[10px] uppercase tracking-widest">{property.fundingProgress >= 100 ? 'Sold Out' : `Only ${100 - property.fundingProgress}% left`}</p>
                            </div>
                        </div>

                        <div className="w-full bg-white/5 h-3 rounded-full overflow-hidden mb-8">
                            <div
                                className="bg-accent h-full rounded-full shadow-[0_0_20px_rgba(0,208,156,0.6)]"
                                style={{ width: `${property.fundingProgress}%` }}
                            ></div>
                        </div>

                        <div className="grid grid-cols-2 gap-6 mb-8">
                            <div className="flex flex-col">
                                <span className="text-muted text-[10px] font-black uppercase tracking-widest mb-1">Min. Invest</span>
                                <span className="text-white font-black text-xl">₹{property.minInvestment}</span>
                            </div>
                            <div className="flex flex-col">
                                <span className="text-muted text-[10px] font-black uppercase tracking-widest mb-1">Est. ROI</span>
                                <span className="text-accent font-black text-xl">{property.roi}%</span>
                            </div>
                        </div>

                        {property.fundingProgress < 100 ? (
                            <button
                                onClick={() => setIsBuying(true)}
                                className="w-full py-5 bg-accent text-black font-black rounded-3xl text-xl uppercase tracking-widest hover:shadow-[0_0_40px_rgba(0,208,156,0.4)] transition-all hover:scale-[1.02] active:scale-[0.98]"
                            >
                                BUY NOW
                            </button>
                        ) : (
                            <button
                                disabled
                                className="w-full py-5 bg-white/10 text-muted font-black rounded-3xl text-xl uppercase tracking-widest cursor-not-allowed"
                            >
                                SOLD OUT
                            </button>
                        )}

                        <button className="w-full py-4 mt-4 glass border border-[#333] text-white font-bold rounded-2xl hover:bg-[#1a1a1a] transition-all">
                            Add to Watchlist
                        </button>
                    </div>
                </div>
            </div>

            {/* Buying Modal */}
            {isBuying && <BuyingInterface property={property} onClose={() => setIsBuying(false)} />}
        </div>
    );
}
