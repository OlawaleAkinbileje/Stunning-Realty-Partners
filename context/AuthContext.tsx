import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { User } from '../types';

interface AuthContextType {
    currentUser: User | null;
    login: (user: User) => void;
    logout: () => void;
    toggleFavorite: (propertyId: string) => void;
    updateUser: (user: User) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [currentUser, setCurrentUser] = useState<User | null>(null);

    useEffect(() => {
        const saved = localStorage.getItem('srp_user');
        if (saved) {
            setCurrentUser(JSON.parse(saved));
        }
    }, []);

    const persist = (user: User | null) => {
        if (user) {
            localStorage.setItem('srp_user', JSON.stringify(user));
        } else {
            localStorage.removeItem('srp_user');
        }
    };

    const login = (user: User) => {
        setCurrentUser(user);
        persist(user);
    };

    const logout = () => {
        setCurrentUser(null);
        persist(null);
    };

    const updateUser = (user: User) => {
        setCurrentUser(user);
        persist(user);
    };

    const toggleFavorite = (propertyId: string) => {
        if (!currentUser) return;
        const already = currentUser.favorites.includes(propertyId);
        const newFavs = already
            ? currentUser.favorites.filter(id => id !== propertyId)
            : [...currentUser.favorites, propertyId];
        const updated: User = { ...currentUser, favorites: newFavs };
        updateUser(updated);
    };

    return (
        <AuthContext.Provider value={{ currentUser, login, logout, toggleFavorite, updateUser }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = (): AuthContextType => {
    const ctx = useContext(AuthContext);
    if (!ctx) {
        throw new Error('useAuth must be used within AuthProvider');
    }
    return ctx;
};
