"use client";
import React, { useState, useEffect, useRef } from 'react';

const KNOWLEDGE_BASE = {
    "how to invest": "To invest on BrickStake: 1. Browse properties in the Marketplace. 2. Select a property and click 'Buy Now'. 3. Enter your amount (min ₹500). 4. Confirm with your wallet balance. You'll start earning rental income immediately!",
    "fractional ownership": "Fractional ownership allows you to own a percentage of a high-value property. Instead of buying the whole building, you buy 'bricks' or shares. You get legal ownership via a Special Purpose Vehicle (SPV) and earn proportional rent and appreciation.",
    "rental income": "Rental income is distributed monthly. It's calculated based on your equity stake. For example, if you own 0.1% of a property that earns ₹1,00,000 rent, you get ₹100 directly in your wallet every month.",
    "withdraw": "You can withdraw funds from your Wallet page. Go to 'Wallet', click 'Withdraw to Bank', and enter the amount. Funds are typically transferred to your linked bank account within 24-48 hours.",
    "is it safe?": "Yes! All properties are backed by physical assets. Legal ownership is managed through an SPV, and your investment is documented with a digital certificate and unique barcode.",
    "what is sip?": "A Systematic Investment Plan (SIP) lets you invest a fixed amount every month automatically. This helps you build a large real estate portfolio over time without a large upfront cost.",
};

export default function AIAssistant() {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState([
        { role: 'ai', text: "Namaste! I'm your BrickStake AI Advisor. How can I help you build your real estate empire today?" }
    ]);
    const [input, setInput] = useState("");
    const [isTyping, setIsTyping] = useState(false);
    const scrollRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
    }, [messages, isTyping]);

    const handleSend = (text: string) => {
        const userMsg = text || input;
        if (!userMsg.trim()) return;

        setMessages(prev => [...prev, { role: 'user', text: userMsg }]);
        setInput("");
        setIsTyping(true);

        // Simulate AI thinking
        setTimeout(() => {
            const query = userMsg.toLowerCase();
            let response = "I'm still learning about that! You can ask me about investments, SIPs, rental income, or how fractional ownership works.";

            for (const [key, value] of Object.entries(KNOWLEDGE_BASE)) {
                if (query.includes(key)) {
                    response = value;
                    break;
                }
            }

            setMessages(prev => [...prev, { role: 'ai', text: response }]);
            setIsTyping(false);
        }, 1000);
    };

    return (
        <>
            {/* Floating Toggle Button */}
            <button
                onClick={() => setIsOpen(!isOpen)}
                className={`fixed bottom-8 right-8 w-16 h-16 rounded-full shadow-[0_10px_40px_rgba(0,208,156,0.4)] flex items-center justify-center transition-all duration-300 z-[1000] active:scale-90
                    ${isOpen ? 'bg-white text-black rotate-90' : 'bg-accent text-black hover:scale-110'}
                `}
            >
                {isOpen ? (
                    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
                ) : (
                    <div className="relative">
                        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" /></svg>
                        <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full animate-pulse border-2 border-accent"></span>
                    </div>
                )}
            </button>

            {/* Chat Window */}
            {isOpen && (
                <div className="fixed bottom-28 right-8 w-[90vw] sm:w-[400px] h-[600px] max-h-[70vh] bg-[#0A0A0A] rounded-[40px] border border-white/10 shadow-[0_20px_60px_rgba(0,0,0,0.8)] flex flex-col overflow-hidden z-[1000] animate-in slide-in-from-bottom-10 duration-300 backdrop-blur-xl">
                    {/* Header */}
                    <div className="p-6 bg-accent/10 border-b border-white/5 flex items-center gap-4">
                        <div className="w-12 h-12 rounded-2xl bg-accent flex items-center justify-center text-2xl animate-bounce">🤖</div>
                        <div>
                            <h3 className="font-black text-white tracking-tight">BrickStake AI Advisor</h3>
                            <div className="flex items-center gap-1.5">
                                <span className="w-1.5 h-1.5 bg-accent rounded-full animate-pulse"></span>
                                <span className="text-[10px] text-accent font-black uppercase tracking-widest">Active Now</span>
                            </div>
                        </div>
                    </div>

                    {/* Messages */}
                    <div ref={scrollRef} className="flex-1 overflow-y-auto p-6 space-y-6 no-scrollbar backdrop-blur-sm">
                        {messages.map((msg, i) => (
                            <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'} animate-in fade-in slide-in-from-bottom-2 duration-300`}>
                                <div className={`max-w-[85%] p-4 rounded-3xl text-sm leading-relaxed ${msg.role === 'user'
                                        ? 'bg-accent text-black font-bold rounded-tr-none shadow-[0_5px_15px_rgba(0,208,156,0.2)]'
                                        : 'bg-white/5 text-white border border-white/5 rounded-tl-none'
                                    }`}>
                                    {msg.text}
                                </div>
                            </div>
                        ))}
                        {isTyping && (
                            <div className="flex justify-start">
                                <div className="bg-white/5 p-4 rounded-3xl border border-white/5 rounded-tl-none">
                                    <div className="flex gap-1">
                                        <div className="w-1.5 h-1.5 bg-accent rounded-full animate-bounce"></div>
                                        <div className="w-1.5 h-1.5 bg-accent rounded-full animate-bounce delay-100"></div>
                                        <div className="w-1.5 h-1.5 bg-accent rounded-full animate-bounce delay-200"></div>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Quick Tags */}
                    <div className="px-6 py-2 overflow-x-auto no-scrollbar flex gap-2">
                        {["How to invest?", "What is SIP?", "Is it safe?", "Rental Income"].map(tag => (
                            <button
                                key={tag}
                                onClick={() => handleSend(tag)}
                                className="whitespace-nowrap px-4 py-2 rounded-full border border-white/10 bg-white/5 text-[10px] font-bold text-muted hover:text-white hover:border-accent/40 transition-all active:scale-95"
                            >
                                {tag}
                            </button>
                        ))}
                    </div>

                    {/* Input Area */}
                    <div className="p-6 pt-2">
                        <div className="relative">
                            <input
                                type="text"
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                onKeyPress={(e) => e.key === 'Enter' && handleSend("")}
                                placeholder="Ask me anything..."
                                className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-6 pr-14 text-sm font-medium focus:outline-none focus:border-accent/50 transition-all placeholder:text-muted/50"
                            />
                            <button
                                onClick={() => handleSend("")}
                                className="absolute right-2 top-2 w-10 h-10 bg-accent text-black rounded-xl flex items-center justify-center hover:scale-105 active:scale-90 transition-all"
                            >
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
                            </button>
                        </div>
                        <p className="text-[8px] text-center text-muted font-bold uppercase tracking-[0.2em] mt-4 opacity-50">Powered by BrickStake Large Legal Model</p>
                    </div>
                </div>
            )}
        </>
    );
}
