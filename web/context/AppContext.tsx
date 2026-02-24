"use client";
import React, { createContext, useContext, useState, useEffect } from 'react';

interface AppContextType {
    balance: number;
    setBalance: React.Dispatch<React.SetStateAction<number>>;
    isAdmin: boolean;
    setIsAdmin: React.Dispatch<React.SetStateAction<boolean>>;
    logout: () => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: React.ReactNode }) {
    const [balance, setBalance] = useState(12450.50);
    const [isAdmin, setIsAdmin] = useState(false);

    useEffect(() => {
        const storedAdmin = localStorage.getItem('isAdmin') === 'true';
        setIsAdmin(storedAdmin);

        const storedBalance = localStorage.getItem('walletBalance');
        if (storedBalance) setBalance(parseFloat(storedBalance));
    }, []);

    useEffect(() => {
        localStorage.setItem('walletBalance', balance.toString());
    }, [balance]);

    const logout = () => {
        localStorage.removeItem('isAdmin');
        setIsAdmin(false);
    };

    return (
        <AppContext.Provider value={{ balance, setBalance, isAdmin, setIsAdmin, logout }}>
            {children}
        </AppContext.Provider>
    );
}

export function useApp() {
    const context = useContext(AppContext);
    if (!context) throw new Error('useApp must be used within an AppProvider');
    return context;
}
