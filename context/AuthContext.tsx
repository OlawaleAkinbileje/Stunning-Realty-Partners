import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { User } from '../types';
import { supabase } from '../services/supabaseClient';

interface AuthContextType {
    currentUser: User | null;
    isLoading: boolean;
    login: (user: User) => void;
    logout: () => Promise<void>;
    toggleFavorite: (propertyId: string) => Promise<void>;
    updateUser: (user: User) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [currentUser, setCurrentUser] = useState<User | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        // Check active sessions and sets the user
        const initializeAuth = async () => {
            const { data: { session } } = await supabase.auth.getSession();
            
            if (session) {
                await fetchProfile(session.user.id, session.user.email || '');
            } else {
                setIsLoading(false);
            }

            // Listen for changes on auth state (logged in, signed out, etc.)
            const { data: { subscription } } = supabase.auth.onAuthStateChange(async (_event, session) => {
                if (session) {
                    await fetchProfile(session.user.id, session.user.email || '');
                } else {
                    setCurrentUser(null);
                    setIsLoading(false);
                }
            });

            return () => subscription.unsubscribe();
        };

        initializeAuth();
    }, []);

    const fetchProfile = async (userId: string, email: string) => {
        try {
            const { data, error } = await supabase
                .from('profiles')
                .select('*')
                .eq('id', userId)
                .single();

            if (error) throw error;

            if (data) {
                setCurrentUser({
                    id: data.id,
                    name: data.name || 'User',
                    email: data.email || email,
                    role: data.role || 'member',
                    status: data.status || 'pending',
                    favorites: data.favorites || [],
                    alerts: data.alerts || []
                });
            }
        } catch (error) {
            console.error('Error fetching profile:', error);
        } finally {
            setIsLoading(false);
        }
    };

    const login = (user: User) => {
        setCurrentUser(user);
    };

    const logout = async () => {
        await supabase.auth.signOut();
        setCurrentUser(null);
    };

    const updateUser = (user: User) => {
        setCurrentUser(user);
    };

    const toggleFavorite = async (propertyId: string) => {
        if (!currentUser) return;
        
        const already = currentUser.favorites.includes(propertyId);
        const newFavs = already
            ? currentUser.favorites.filter(id => id !== propertyId)
            : [...currentUser.favorites, propertyId];
        
        const { error } = await supabase
            .from('profiles')
            .update({ favorites: newFavs })
            .eq('id', currentUser.id);

        if (!error) {
            setCurrentUser({ ...currentUser, favorites: newFavs });
        } else {
            console.error('Error updating favorites:', error);
        }
    };

    return (
        <AuthContext.Provider value={{ currentUser, isLoading, login, logout, toggleFavorite, updateUser }}>
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
