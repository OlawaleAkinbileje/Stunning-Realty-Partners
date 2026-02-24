import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { AuthProvider } from '../context/AuthContext';
import Header from '../components/Header';
import Footer from '../components/Footer';
import React from 'react';

function MyApp({ Component, pageProps }: AppProps) {
    return (
        <AuthProvider>
            <div className="min-h-screen flex flex-col">
                <Header />
                <main className="flex-grow">
                    <Component {...pageProps} />
                </main>
                <Footer />
            </div>
        </AuthProvider>
    );
}

export default MyApp;
