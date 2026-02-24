# 🧱 BrickStake - Fractional Real Estate Platform

Welcome to BrickStake! This project is split into three main parts: Web, Mobile, and Backend.

## 🚀 Quick Start (Everything is already running!)

The **Web** and **Backend** servers are currently running in your terminal. You can access them here:

- **Web Frontend**: [http://localhost:3000](http://localhost:3000)
- **Backend API**: [http://localhost:5000/health](http://localhost:5000/health)

---

## 🛠️ Manual Run Instructions

If you ever need to restart the services, follow these steps:

### 1. Backend Server (Node.js + Prisma)
```powershell
cd backend
npm install
npx prisma db push
npm run dev
```
*The API handles property data, orders, and user investments.*

### 2. Web Application (Next.js)
```powershell
cd web
npm install
npm run dev
```
*Visit `http://localhost:3000` to see the marketplace, wallet, and portfolio.*

### 3. Mobile Application (React Native + Expo)
```powershell
cd mobile
npm install
npx expo start
```
*Use the Expo Go app on your phone to scan the QR code and view the mobile interface.*

---

## 📂 Project Structure
- `/web`: Premium Next.js frontend with dark mode fintech design.
- `/mobile`: Expo-based mobile app with bottom tab navigation.
- `/backend`: Express API with SQLite database for easy local development.

## 📊 Key Features Implemented
- [x] **Marketplace**: List of properties with funding progress.
- [x] **Wallet**: Balance management and payment method UI.
- [x] **Portfolio**: Performance tracking and asset list.
- [x] **Admin**: Dashboard for managing listings and KYC.
- [x] **Secondary Market**: Order book system foundation.
