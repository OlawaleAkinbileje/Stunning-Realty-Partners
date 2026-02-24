
import React, { useState } from 'react';
import { useRouter } from 'next/router';
import { User } from '../types';
import { useAuth } from '../context/AuthContext';

const Auth: React.FC = () => {
  const { login } = useAuth();
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Mock authentication
    const mockUser: User = {
      id: Math.random().toString(36).substr(2, 9),
      name: formData.name || 'Valued Client',
      email: formData.email,
      favorites: [],
      alerts: []
    };
    login(mockUser);
    router.push('/profile');
  };

  return (
    <div className="pt-20 bg-slate-50 min-h-screen flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-3xl shadow-xl overflow-hidden border border-slate-100">
        <div className="p-8 md:p-12">
          <div className="text-center mb-10">
            <h1 className="text-3xl font-bold text-slate-900 serif mb-2">
              {isLogin ? 'Access your brokerage dashboard' : 'Register to unlock exclusive portfolio access'}
            </h1>
            <p className="text-slate-500">
              {isLogin ? 'Enter your credentials to access your account' : 'Register to save properties and set alerts'}
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {!isLogin && (
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-2">Full Name</label>
                <input
                  required
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="John Doe"
                />
              </div>
            )}
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-2">Email Address</label>
              <input
                required
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="john@example.com"
              />
            </div>
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-2">Password</label>
              <input
                required
                type="password"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="••••••••"
              />
            </div>

            <button className="w-full py-4 bg-slate-900 text-white font-bold rounded-xl hover:bg-slate-800 transition-colors shadow-lg">
              {isLogin ? 'Enter Dashboard' : 'Initiate Membership'}
            </button>
          </form>

          <div className="mt-8 text-center text-sm">
            <p className="text-slate-500">
              {isLogin ? "Don't have an account?" : "Already have an account?"}
              <button
                onClick={() => setIsLogin(!isLogin)}
                className="ml-2 text-blue-600 font-bold hover:underline"
              >
                {isLogin ? 'Register Here' : 'Log in here'}
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Auth;
