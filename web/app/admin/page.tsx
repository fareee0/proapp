"use client";
import React, { useState, useEffect } from 'react';

import { useRouter } from 'next/navigation';
import { useApp } from '@/context/AppContext';

export default function AdminDashboard() {
    const router = useRouter();
    const { isAdmin, logout } = useApp();
    const [properties, setProperties] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [isAuthorized, setIsAuthorized] = useState(false);
    const [formData, setFormData] = useState({
        title: '',
        location: '',
        description: '',
        totalValuation: '',
        minInvestment: '500',
        expectedROI: '',
        rentalYield: '',
        imageUrl: '',
        totalShares: '100'
    });

    useEffect(() => {
        if (!isAdmin) {
            router.push('/admin/login');
        } else {
            setIsAuthorized(true);
            fetchProperties();
        }
    }, [isAdmin, router]);

    const handleLogout = () => {
        logout();
        router.push('/admin/login');
    };

    const fetchProperties = async () => {
        try {
            const res = await fetch('http://localhost:5000/api/properties');
            const data = await res.json();
            setProperties(data);
            setLoading(false);
        } catch (error) {
            console.error(error);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const res = await fetch('http://localhost:5000/api/properties', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            });
            if (res.ok) {
                alert('Property added successfully!');
                setFormData({
                    title: '',
                    location: '',
                    description: '',
                    totalValuation: '',
                    minInvestment: '500',
                    expectedROI: '',
                    rentalYield: '',
                    imageUrl: '',
                    totalShares: '100'
                });
                fetchProperties();
            }
        } catch (error) {
            alert('Failed to add property');
        }
    };

    const handleDelete = async (id: string) => {
        if (!confirm('Are you sure?')) return;
        try {
            await fetch(`http://localhost:5000/api/properties/${id}`, { method: 'DELETE' });
            fetchProperties();
        } catch (error) {
            alert('Delete failed');
        }
    };

    if (!isAuthorized) return <div className="min-h-screen bg-[#050505] flex items-center justify-center text-accent tracking-[0.5em] font-black uppercase">Authenticating...</div>;

    return (
        <div className="min-h-screen bg-[#050505] text-white p-8">
            <div className="max-w-6xl mx-auto">
                <div className="flex justify-between items-center mb-12">
                    <h1 className="text-4xl font-black tracking-tighter uppercase">Admin Dashboard</h1>
                    <button
                        onClick={handleLogout}
                        className="px-6 py-2 bg-red-500/10 text-red-500 border border-red-500/20 rounded-full font-bold text-xs uppercase tracking-widest hover:bg-red-500 hover:text-white transition-all"
                    >
                        Sign Out
                    </button>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                    {/* Add Property Form */}
                    <div className="glass p-8 rounded-[40px] border border-white/5">
                        <h2 className="text-xl font-bold mb-8 flex items-center gap-2">
                            <span className="text-accent">➕</span> Add New Property
                        </h2>
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <input
                                className="w-full bg-white/5 border border-white/10 rounded-2xl p-4 outline-none focus:border-accent/50"
                                placeholder="Property Title (e.g. Modern Villa)"
                                value={formData.title}
                                onChange={e => setFormData({ ...formData, title: e.target.value })}
                                required
                            />
                            <input
                                className="w-full bg-white/5 border border-white/10 rounded-2xl p-4 outline-none focus:border-accent/50"
                                placeholder="Location (e.g. Bangalore, KA)"
                                value={formData.location}
                                onChange={e => setFormData({ ...formData, location: e.target.value })}
                                required
                            />
                            <textarea
                                className="w-full bg-white/5 border border-white/10 rounded-2xl p-4 outline-none focus:border-accent/50 h-32"
                                placeholder="Description"
                                value={formData.description}
                                onChange={e => setFormData({ ...formData, description: e.target.value })}
                                required
                            />
                            <div className="grid grid-cols-2 gap-4">
                                <input
                                    className="w-full bg-white/5 border border-white/10 rounded-2xl p-4 outline-none focus:border-accent/50"
                                    placeholder="Total Valuation (INR)"
                                    type="number"
                                    value={formData.totalValuation}
                                    onChange={e => setFormData({ ...formData, totalValuation: e.target.value })}
                                    required
                                />
                                <input
                                    className="w-full bg-white/5 border border-white/10 rounded-2xl p-4 outline-none focus:border-accent/50"
                                    placeholder="Min Investment (Default 500)"
                                    type="number"
                                    value={formData.minInvestment}
                                    onChange={e => setFormData({ ...formData, minInvestment: e.target.value })}
                                />
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <input
                                    className="w-full bg-white/5 border border-white/10 rounded-2xl p-4 outline-none focus:border-accent/50"
                                    placeholder="Expected ROI %"
                                    type="number"
                                    step="0.01"
                                    value={formData.expectedROI}
                                    onChange={e => setFormData({ ...formData, expectedROI: e.target.value })}
                                    required
                                />
                                <input
                                    className="w-full bg-white/5 border border-white/10 rounded-2xl p-4 outline-none focus:border-accent/50"
                                    placeholder="Rental Yield %"
                                    type="number"
                                    step="0.01"
                                    value={formData.rentalYield}
                                    onChange={e => setFormData({ ...formData, rentalYield: e.target.value })}
                                    required
                                />
                            </div>
                            <input
                                className="w-full bg-white/5 border border-white/10 rounded-2xl p-4 outline-none focus:border-accent/50"
                                placeholder="Image URL (Unsplash link)"
                                value={formData.imageUrl}
                                onChange={e => setFormData({ ...formData, imageUrl: e.target.value })}
                                required
                            />

                            <button className="w-full py-5 bg-accent text-black font-black rounded-[32px] text-lg uppercase tracking-widest hover:shadow-[0_0_40px_rgba(0,208,156,0.3)] transition-all">
                                PUBLISH PROPERTY
                            </button>
                        </form>
                    </div>

                    {/* Property List */}
                    <div className="space-y-6">
                        <h2 className="text-xl font-bold mb-2 flex items-center gap-2">
                            <span className="text-accent">📋</span> Manage Listings
                        </h2>
                        {loading ? (
                            <p className="text-muted">Loading properties...</p>
                        ) : (
                            <div className="space-y-4 max-h-[800px] overflow-y-auto pr-4 no-scrollbar">
                                {properties.map(p => (
                                    <div key={p.id} className="glass p-6 rounded-3xl border border-white/5 flex justify-between items-center group">
                                        <div className="flex gap-4 items-center">
                                            <div className="w-16 h-16 rounded-2xl overflow-hidden relative border border-white/10">
                                                <img src={p.imageUrl} alt="" className="object-cover w-full h-full" />
                                            </div>
                                            <div>
                                                <h4 className="font-bold text-white group-hover:text-accent transition-colors">{p.title}</h4>
                                                <p className="text-[10px] text-muted font-black uppercase tracking-widest">{p.location} • ₹{(p.totalValuation / 10000000).toFixed(1)} Cr</p>
                                            </div>
                                        </div>
                                        <button
                                            onClick={() => handleDelete(p.id)}
                                            className="w-10 h-10 bg-red-500/10 text-red-500 rounded-xl flex items-center justify-center hover:bg-red-500 hover:text-white transition-all"
                                        >
                                            🗑️
                                        </button>
                                    </div>
                                ))}
                                {properties.length === 0 && <p className="text-muted italic px-4">No live properties in database.</p>}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
