"use client";
import React, { useState, useMemo, useEffect } from 'react';
import PropertyCard from '@/components/PropertyCard';
import Image from 'next/image';
import { mockProperties as staticMockProperties } from '@/constants/mockData';

export default function Home() {
  const [filter, setFilter] = useState<'ALL' | 'AVAILABLE' | 'FUNDED'>('ALL');
  const [liveProperties, setLiveProperties] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchProperties() {
      try {
        const res = await fetch('http://localhost:5000/api/properties');
        if (res.ok) {
          const data = await res.json();
          // Map API fields to frontend interface
          const mappedData = data.map((p: any) => ({
            ...p,
            roi: p.expectedROI, // Map backend expectedROI to frontend roi
            fundingProgress: p.totalShares > 0 ? (p.fundedShares / p.totalShares) * 100 : 0
          }));
          setLiveProperties(mappedData);
        }
      } catch (err) {
        console.error("Failed to fetch live properties:", err);
      } finally {
        setLoading(false);
      }
    }
    fetchProperties();
  }, []);

  const allProperties = useMemo(() => {
    // Merge live properties with static ones for demo purposes
    // In a real production app, you'd only use the live ones
    return [...liveProperties, ...staticMockProperties];
  }, [liveProperties]);

  const filteredProperties = useMemo(() => {
    if (filter === 'ALL') return allProperties;
    return allProperties.filter(p => p.status === filter || (filter === 'AVAILABLE' && p.status === 'TRENDING'));
  }, [filter, allProperties]);

  return (
    <main className="min-h-screen pb-20">
      {/* Hero Section */}
      <section className="px-6 py-12 text-center max-w-4xl mx-auto">
        <h1 className="text-5xl md:text-7xl font-black mb-6 tracking-tight leading-tight">
          Invest in Real Estate <br />
          <span className="gradient-text">Like a Pro.</span>
        </h1>
        <p className="text-muted text-lg md:text-xl mb-10 max-w-2xl mx-auto">
          Start your real estate journey with as little as ₹500. Buy, sell, and earn rental income effortlessly.
        </p>
        <div className="flex justify-center gap-4">
          <button
            onClick={() => document.getElementById('listings')?.scrollIntoView({ behavior: 'smooth' })}
            className="px-8 py-4 bg-accent text-black font-bold rounded-2xl text-lg hover:shadow-[0_0_20px_rgba(0,208,156,0.3)] transition-all"
          >
            Get Started
          </button>
          <button
            onClick={() => document.getElementById('listings')?.scrollIntoView({ behavior: 'smooth' })}
            className="px-8 py-4 glass text-white font-bold rounded-2xl text-lg border border-[#333] hover:bg-[#1a1a1a] transition-all"
          >
            Browse Properties
          </button>
        </div>
      </section>

      {/* Properties Section */}
      <section id="listings" className="px-6 max-w-7xl mx-auto mt-12 scroll-mt-24">
        <div className="flex flex-col md:flex-row justify-between items-center md:items-end mb-8 gap-6">
          <div>
            <h2 className="text-3xl font-bold text-white mb-2 text-center md:text-left">Active Listings</h2>
            <p className="text-muted text-center md:text-left">High-yield properties open for investment</p>
          </div>
          <div className="flex gap-2 bg-white/5 p-1 rounded-2xl border border-white/5">
            <button
              onClick={() => setFilter('ALL')}
              className={`px-6 py-2 rounded-xl text-sm font-bold transition-all ${filter === 'ALL' ? 'bg-accent text-black' : 'text-muted hover:text-white'}`}
            >All</button>
            <button
              onClick={() => setFilter('AVAILABLE')}
              className={`px-6 py-2 rounded-xl text-sm font-bold transition-all ${filter === 'AVAILABLE' ? 'bg-accent text-black' : 'text-muted hover:text-white'}`}
            >Available</button>
            <button
              onClick={() => setFilter('FUNDED')}
              className={`px-6 py-2 rounded-xl text-sm font-bold transition-all ${filter === 'FUNDED' ? 'bg-accent text-black' : 'text-muted hover:text-white'}`}
            >Funded</button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 min-h-[400px]">
          {loading ? (
            [1, 2, 3].map(i => (
              <div key={i} className="glass h-[450px] rounded-3xl border border-white/5 animate-pulse overflow-hidden bg-white/5"></div>
            ))
          ) : filteredProperties.length > 0 ? (
            filteredProperties.map(property => (
              <PropertyCard key={property.id} property={property} />
            ))
          ) : (
            <div className="col-span-full flex flex-col items-center justify-center py-20 text-muted">
              <span className="text-4xl mb-4">🏠</span>
              <p>No properties found in this category.</p>
            </div>
          )}
        </div>
      </section>

      {/* Bottom Features Info */}
      <section className="px-6 max-w-7xl mx-auto mt-24 py-16 border-t border-[#222]">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 text-center">
          <div>
            <div className="text-accent text-3xl font-bold mb-2">12-18%</div>
            <p className="text-white font-bold mb-1">Target ROI</p>
            <p className="text-xs text-muted">Annualized returns through appreciation</p>
          </div>
          <div>
            <div className="text-accent text-3xl font-bold mb-2">₹500</div>
            <p className="text-white font-bold mb-1">Min. Investment</p>
            <p className="text-xs text-muted">Accessible real estate for everyone</p>
          </div>
          <div>
            <div className="text-accent text-3xl font-bold mb-2">100%</div>
            <p className="text-white font-bold mb-1">Secure</p>
            <p className="text-xs text-muted">SPV backed legal ownership structure</p>
          </div>
          <div>
            <div className="text-accent text-3xl font-bold mb-2">Monthly</div>
            <p className="text-white font-bold mb-1">Rental Income</p>
            <p className="text-xs text-muted">Direct credits to your BrickStake wallet</p>
          </div>
        </div>
      </section>
    </main>
  );
}
