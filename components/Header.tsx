
import React, { useState } from 'react';
import Icon from './Icon';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useAuth } from '../context/AuthContext';
import Image from 'next/image';

const Header: React.FC = () => {
  const { currentUser, logout } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const router = useRouter();

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Properties', path: '/listings' },
    { name: 'Network Benefits', path: '/services' },
    { name: 'About SRP', path: '/about' },
    { name: 'Contact', path: '/contact' },
  ];

  const isActive = (path: string) => router.pathname === path;

  return (
    <header className="fixed top-0 left-0 right-0 z-50 glass border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <div className="flex-shrink-0 flex items-center">
            <Link href="/" className="flex items-center gap-2">
              <Image
                src="/assets/logo/SRP-black.png"
                alt="SRP Logo"
                width={120}
                height={32}
                className="h-8 w-auto"
              />
              <span className="hidden sm:inline-block h-4 w-px bg-slate-300 mx-2"></span>
              <span className="hidden sm:inline-block text-[10px] uppercase font-bold tracking-widest leading-none text-slate-500">
                Stunning Realty<br />Partners
              </span>
            </Link>
          </div>

          <nav className="hidden lg:flex space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                href={link.path}
                className={`text-xs uppercase tracking-widest font-bold transition-colors hover:text-black ${isActive(link.path) ? 'text-black' : 'text-slate-500'
                  }`}
              >
                {link.name}
              </Link>
            ))}
          </nav>

          <div className="hidden lg:flex items-center space-x-6">
            {currentUser ? (
              <div className="flex items-center space-x-4">
                <Link href="/profile" className="flex items-center space-x-2 text-xs font-bold uppercase tracking-widest text-slate-700 hover:text-black">
                  <div className="w-8 h-8 rounded-full bg-slate-900 flex items-center justify-center text-white">
                    <Icon name="user" className="text-[10px]" />
                  </div>
                  <span>{currentUser.name}</span>
                </Link>
                {currentUser.role === 'admin' && (
                  <Link href="/admin" className="text-[10px] uppercase tracking-widest font-black text-blue-600 hover:text-blue-800 transition-colors">
                    Admin Panel
                  </Link>
                )}
                <button onClick={logout} className="text-[10px] uppercase tracking-widest font-bold text-slate-400 hover:text-red-600 transition-colors">
                  Logout
                </button>
              </div>
            ) : (
              <Link
                href="/auth"
                className="bg-black text-white px-6 py-2.5 rounded-none text-[10px] uppercase tracking-widest font-black hover:bg-slate-800 transition-all"
              >
                Join Network
              </Link>
            )}
          </div>

          <div className="lg:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-slate-900 p-2"
            >
              <Icon name={isMenuOpen ? 'times' : 'bars'} className="text-xl" />
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="lg:hidden glass border-b border-slate-200 animate-in slide-in-from-top duration-300">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                href={link.path}
                onClick={() => setIsMenuOpen(false)}
                className={`block px-3 py-3 rounded-md text-sm font-bold uppercase tracking-widest ${isActive(link.path) ? 'bg-slate-900 text-white' : 'text-slate-600 hover:bg-slate-50'
                  }`}
              >
                {link.name}
              </Link>
            ))}
            {currentUser ? (
              <>
                <Link href="/profile" onClick={() => setIsMenuOpen(false)} className="block px-3 py-3 text-sm font-bold uppercase tracking-widest text-slate-600 hover:bg-slate-50">Profile</Link>
                <button onClick={() => { logout(); setIsMenuOpen(false); }} className="block w-full text-left px-3 py-3 text-sm font-bold uppercase tracking-widest text-red-600 hover:bg-slate-50">Logout</button>
              </>
            ) : (
              <Link href="/auth" onClick={() => setIsMenuOpen(false)} className="block px-3 py-3 text-sm font-bold uppercase tracking-widest text-black hover:bg-slate-50">Join Network</Link>
            )}
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
