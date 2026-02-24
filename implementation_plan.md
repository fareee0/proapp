# BrickStake Implementation Plan

## Project Overview
BrickStake is a fractional real estate investment platform allowing users to buy property shares like stocks.

## Tech Stack
- **Web**: Next.js (React), TypeScript, TailwindCSS, Framer Motion (for animations).
- **Mobile**: React Native (Expo), TypeScript.
- **Backend**: Node.js, Express, TypeScript.
- **Database**: PostgreSQL with Prisma ORM.
- **Auth**: Firebase Auth or Supabase Auth (for Google, Email, Phone OTP).
- **Payments**: Razorpay (standard for Indian market as per PAN/Aadhaar requirement).
- **Storage**: AWS S3 (for KYC docs, Property images).

## Phase 1: Foundation & Backend
- [x] Initialize Repository (Monorepo structure).
- [x] Set up Express backend with TypeScript.
- [x] Database Schema design:
    - `User`: Basic info, KYC status, Wallet balance, Certificates.
    - `Property`: Details, total valuation, fractional shares (Float), rental yield.
    - `Investment`: User's stake in properties (Float).
    - `Transaction`: Wallet deposits, withdrawals, purchase history.
    - `OrderBook`: Resale listings for secondary market.
    - `Certificate`: Unique ownership document with barcode.
- [x] Primary Investment API implementation (Fractional buying).

## Phase 2: Web App (Next.js) - Core Features
- [x] **Design System**: Premium Fintech aesthetic (Dark mode, neon accents).
- [ ] **Auth Flow**: Sign-up, Sign-in, KYC verification UI.
- [x] **Home Screen**: Property listings with funding progress bars.
- [x] **Property Details**: Interactive gallery, rental calculator, Buy/Sell interface.
- [x] **Fractional Investment**: Bitcoin-style investment (any amount, total percentage stake).
- [x] **SIP Mode**: Systematic Investment Plan for monthly recurring investments.
- [x] **Rental Income**: Stake-based distribution calculator (automated calc based on % equity).
- [x] **Portfolio**: Professional dashboard, performance tracking, certificate viewing, and secondary market selling.
- [x] **AI Advisor**: Global floating assistant for real estate education and app guidance.

## Phase 3: Mobile App (React Native)
- [ ] Port web components to React Native.
- [ ] Implement Mobile-specific features (Camera for selfie KYC).
- [ ] Bottom Tab Navigation (Invest, Wallet, Portfolio, Profile).

## Phase 4: Secondary Market & Admin
- [x] Order book matching engine foundation.
- [ ] Admin Dashboard for property listing and KYC approval.
- [x] Professional Certificate generation (Digital PDF with Unique Code & Barcode).

## Phase 5: Payouts & Polishing
- [ ] Rental income distribution automation.
- [ ] Final UI/UX polish and animations.

