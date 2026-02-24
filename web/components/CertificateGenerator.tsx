"use client";
import React, { useState } from 'react';

export default function CertificateGenerator({ propertyName, stake }: { propertyName: string, stake: number }) {
    const [certCode, setCertCode] = useState("");
    const [showCert, setShowCert] = useState(false);

    const generateCode = () => {
        const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
        let code = 'BS-';
        for (let i = 0; i < 12; i++) {
            code += chars.charAt(Math.floor(Math.random() * chars.length));
        }
        setCertCode(code);
        setShowCert(true);
    };

    return (
        <div className="mt-6">
            {!showCert ? (
                <button
                    onClick={generateCode}
                    className="w-full py-4 bg-accent/10 border border-accent/30 text-accent font-bold rounded-2xl hover:bg-accent/20 transition-all flex items-center justify-center gap-3 group"
                >
                    <span className="text-xl group-hover:rotate-12 transition-transform">📜</span>
                    Generate Ownership Certificate
                </button>
            ) : (
                <div className="relative bg-[#fafafa] p-0.5 rounded-lg shadow-2xl overflow-hidden animate-in zoom-in-95 duration-500 max-w-2xl mx-auto">
                    <div className="border-[12px] border-double border-[#00D09C] p-8 md:p-12 bg-white text-black font-serif relative">
                        {/* Decorative background logo */}
                        <div className="absolute inset-0 flex items-center justify-center opacity-[0.03] pointer-events-none">
                            <span className="text-[200px] font-black font-sans">BX</span>
                        </div>

                        <div className="flex justify-between items-start mb-12 relative z-10">
                            <div className="text-left">
                                <p className="text-[10px] font-sans font-black uppercase tracking-[0.2em] text-[#00D09C] mb-1">Issuer Authority</p>
                                <p className="text-2xl font-sans font-black tracking-tighter text-gray-900">BRICKSTAKE</p>
                            </div>
                            <div className="text-right">
                                <p className="text-[10px] font-sans font-black uppercase tracking-[0.2em] text-gray-400 mb-1">Certificate No.</p>
                                <p className="text-sm font-sans font-bold text-gray-800 tracking-tight">{certCode}</p>
                            </div>
                        </div>

                        <div className="text-center mb-12 relative z-10">
                            <h2 className="text-4xl font-bold mb-2 uppercase tracking-tight text-gray-900">Certificate of Ownership</h2>
                            <div className="w-24 h-1.5 bg-[#00D09C] mx-auto rounded-full mb-8"></div>
                            <p className="text-lg text-gray-600 italic">This is to certify that the holder is a verified fractional owner of equity in the property described below.</p>
                        </div>

                        <div className="bg-gray-50 p-8 rounded-2xl border border-gray-100 mb-12 relative z-10">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                <div>
                                    <p className="text-[10px] font-sans font-black uppercase tracking-widest text-gray-400 mb-2">Asset Particulars</p>
                                    <h4 className="text-2xl font-black text-gray-900 leading-tight">{propertyName}</h4>
                                </div>
                                <div className="md:text-right">
                                    <p className="text-[10px] font-sans font-black uppercase tracking-widest text-gray-400 mb-2">Equity Stake</p>
                                    <h4 className="text-3xl font-black text-[#00D09C]">{stake.toFixed(4)}%</h4>
                                </div>
                            </div>
                        </div>

                        <div className="flex flex-col md:flex-row justify-between items-end gap-8 relative z-10">
                            <div className="text-left">
                                <p className="text-[10px] font-sans font-black uppercase tracking-widest text-gray-400 mb-4">Authorized Signature</p>
                                <div className="border-b-2 border-gray-900 pb-2 flex flex-col">
                                    <span className="font-serif italic text-2xl text-gray-900">BrickStake Systems</span>
                                    <span className="text-[9px] font-sans font-bold text-gray-400 uppercase mt-1">Digital Asset Custodian</span>
                                </div>
                            </div>

                            <div className="flex flex-col items-center">
                                {/* Barcode Simulation */}
                                <div className="flex gap-[2px] items-end h-10 mb-2 overflow-hidden px-4 bg-white">
                                    {[2, 1, 3, 1, 2, 4, 1, 2, 1, 3, 2, 1, 2, 1, 3, 1].map((w, i) => (
                                        <div key={i} className="bg-black" style={{ width: `${w}px`, height: '100%' }}></div>
                                    ))}
                                </div>
                                <p className="text-[10px] font-mono text-gray-400 uppercase tracking-[0.3em] font-bold">{certCode.slice(-8)}</p>
                            </div>

                            <div className="text-right">
                                <div className="w-24 h-24 border-[6px] border-[#00D09C]/30 rounded-full flex items-center justify-center relative">
                                    <div className="w-16 h-16 border-2 border-[#00D09C] rounded-full flex items-center justify-center font-sans font-black text-[#00D09C] text-[10px] rotate-12 bg-white shadow-lg">
                                        VERIFIED
                                    </div>
                                    <div className="absolute inset-0 border-2 border-[#00D09C] rounded-full animate-ping opacity-10"></div>
                                </div>
                            </div>
                        </div>

                        <p className="text-[8px] text-gray-300 mt-16 text-center uppercase tracking-[0.2em] font-bold">This is a digitally generated certificate. Authenticity can be verified at brickstake.com/verify</p>
                    </div>

                    <div className="p-4 bg-gray-900 flex justify-between items-center px-8">
                        <span className="text-white/50 text-xs font-bold uppercase tracking-widest">Ownership Confirmed</span>
                        <button
                            onClick={() => window.print()}
                            className="bg-[#00D09C] text-black px-6 py-2 rounded-full font-black text-xs uppercase tracking-widest hover:scale-105 transition-all shadow-lg"
                        >
                            Download PDF
                        </button>
                    </div>

                    <button
                        onClick={() => setShowCert(false)}
                        className="absolute top-4 right-4 w-8 h-8 rounded-full bg-black/5 flex items-center justify-center text-black/20 hover:text-black hover:bg-black/10 transition-all z-20"
                    >✕</button>
                </div>
            )}
        </div>
    );
}

