"use client";
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useApp } from '@/context/AppContext';

export default function AdminLoginPage() {
    const { setIsAdmin, isAdmin } = useApp();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const router = useRouter();

    useEffect(() => {
        if (isAdmin) {
            router.push('/admin');
        }
    }, [isAdmin, router]);

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();
        // Simple admin check
        if (email === 'admin@brickx.com' && password === 'admin123') {
            localStorage.setItem('isAdmin', 'true');
            setIsAdmin(true);
            router.push('/admin');
        } else {
            setError('Invalid credentials. Access Denied.');
        }
    };

    return (
        <div className="min-h-screen bg-[#050505] flex items-center justify-center p-6">
            <div className="max-w-md w-full glass p-10 rounded-[48px] border border-white/5 relative overflow-hidden group">
                <div className="absolute -top-24 -right-24 w-48 h-48 bg-accent/20 rounded-full blur-[100px] group-hover:bg-accent/30 transition-all duration-700"></div>

                <div className="relative z-10 text-center mb-10">
                    <div className="w-20 h-20 bg-accent rounded-3xl flex items-center justify-center text-4xl mb-6 mx-auto animate-bounce shadow-[0_0_40px_rgba(0,208,156,0.4)]">🔐</div>
                    <h1 className="text-4xl font-black tracking-tighter text-white mb-2">ADMIN ACCESS</h1>
                    <p className="text-muted text-sm uppercase tracking-widest font-bold">Authorized Personnel Only</p>
                </div>

                <form onSubmit={handleLogin} className="space-y-6 relative z-10">
                    <div>
                        <input
                            type="email"
                            placeholder="Admin Email"
                            className="w-full bg-white/5 border border-white/10 rounded-2xl p-5 text-white outline-none focus:border-accent/50 transition-all"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>
                    <div>
                        <input
                            type="password"
                            placeholder="Password"
                            className="w-full bg-white/5 border border-white/10 rounded-2xl p-5 text-white outline-none focus:border-accent/50 transition-all"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>

                    {error && (
                        <div className="bg-red-500/10 border border-red-500/20 text-red-500 p-4 rounded-xl text-xs font-bold text-center animate-shake">
                            {error}
                        </div>
                    )}

                    <button className="w-full py-5 bg-white text-black font-black rounded-2xl text-lg uppercase tracking-widest hover:bg-accent hover:shadow-[0_0_50px_rgba(0,208,156,0.4)] transition-all active:scale-95">
                        UNLOCK CONSOLE
                    </button>
                </form>

                <p className="text-[10px] text-muted text-center mt-8 uppercase font-black tracking-[0.2em] opacity-50">Secure Admin Gateway v2.0</p>
            </div>
        </div>
    );
}
