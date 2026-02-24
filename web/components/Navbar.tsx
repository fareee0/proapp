"use client";
import React from 'react';
import Link from 'next/link';
import { useApp } from '@/context/AppContext';

const Navbar = () => {
    const { balance, isAdmin } = useApp();

    return (
        <nav className="sticky top-0 z-50 glass border-b border-[#222] px-6 py-4 flex justify-between items-center bg-[#050505]/80 backdrop-blur-md">
            <Link href="/" className="flex items-center gap-2 group">
                <div className="w-8 h-8 bg-accent rounded-lg flex items-center justify-center font-bold text-black text-xl group-hover:scale-110 transition-transform">B</div>
                <span className="text-xl font-black tracking-tighter text-white">BRICKSTAKE</span>
            </Link>

            <div className="flex items-center gap-6">
                <Link href="/" className="text-sm font-medium text-muted hover:text-white transition-colors">Marketplace</Link>
                <Link href="/portfolio" className="text-sm font-medium text-muted hover:text-white transition-colors">Portfolio</Link>

                {isAdmin ? (
                    <Link href="/admin" className="text-sm font-black text-accent border-b border-accent/20 transition-colors">Admin Dashboard</Link>
                ) : (
                    <Link href="/admin/login" className="text-sm font-medium text-muted hover:text-accent transition-colors">Admin Login</Link>
                )}

                {/* Wallet at the Top */}
                <Link href="/wallet" className="flex items-center gap-2 px-4 py-2 bg-accent/10 border border-accent/20 rounded-full hover:bg-accent/20 transition-all group">
                    <span className="text-[10px] font-bold text-accent group-hover:scale-105 transition-transform">WALLET</span>
                    <span className="text-sm font-black text-white">₹{balance.toLocaleString()}</span>
                </Link>

                {!isAdmin && (
                    <Link href="/auth/login" className="px-5 py-2 bg-white text-black text-sm font-bold rounded-full hover:bg-gray-200 transition-all active:scale-95">
                        Log In
                    </Link>
                )}
            </div>
        </nav>
    );
};

export default Navbar;
