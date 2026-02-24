"use client";
import React, { useState } from 'react';
import Link from 'next/link';

export default function SignupPage() {
    return (
        <div className="min-h-[90vh] flex items-center justify-center px-6 py-12">
            <div className="w-full max-w-md glass p-10 rounded-[40px] border border-white/10">
                <div className="text-center mb-10">
                    <div className="w-12 h-12 bg-accent rounded-xl flex items-center justify-center font-bold text-black text-2xl mx-auto mb-4">B</div>
                    <h1 className="text-3xl font-black mb-2">Create Account</h1>
                    <p className="text-muted">Start your real estate journey today</p>
                </div>

                <form className="space-y-6">
                    <div>
                        <label className="block text-xs font-bold uppercase tracking-widest text-muted mb-2 ml-1">Full Name</label>
                        <input
                            type="text"
                            className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-white focus:outline-none focus:border-accent/50 transition-all"
                            placeholder="John Doe"
                        />
                    </div>
                    <div>
                        <label className="block text-xs font-bold uppercase tracking-widest text-muted mb-2 ml-1">Email Address</label>
                        <input
                            type="email"
                            className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-white focus:outline-none focus:border-accent/50 transition-all"
                            placeholder="name@example.com"
                        />
                    </div>
                    <div>
                        <label className="block text-xs font-bold uppercase tracking-widest text-muted mb-2 ml-1">Password</label>
                        <input
                            type="password"
                            className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-white focus:outline-none focus:border-accent/50 transition-all"
                            placeholder="••••••••"
                        />
                    </div>

                    <button className="w-full py-5 bg-accent text-black font-black rounded-2xl text-lg uppercase tracking-widest hover:shadow-[0_0_30px_rgba(0,208,156,0.3)] transition-all active:scale-[0.98]">
                        Create Account
                    </button>
                </form>

                <div className="mt-8 text-center text-sm text-muted">
                    Already have an account? <Link href="/auth/login" className="text-accent font-bold">Sign in</Link>
                </div>
            </div>
        </div>
    );
}
