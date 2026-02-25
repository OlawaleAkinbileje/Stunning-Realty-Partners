
import React, { useState } from 'react';
import { useRouter } from 'next/router';
import { useAuth } from '../context/AuthContext';
import { supabase } from '../services/supabaseClient';
import Icon from '../components/Icon';

const Auth: React.FC = () => {
  const { currentUser } = useAuth();
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  // If already logged in, redirect to profile
  React.useEffect(() => {
    if (currentUser) {
      router.push('/profile');
    }
  }, [currentUser, router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      if (isLogin) {
        // Login
        const { error: loginError } = await supabase.auth.signInWithPassword({
          email: formData.email,
          password: formData.password,
        });
        if (loginError) throw loginError;
      } else {
        // Register
        const { data: authData, error: signUpError } = await supabase.auth.signUp({
          email: formData.email,
          password: formData.password,
        });
        if (signUpError) throw signUpError;

        if (authData.user) {
          // Create profile
          const { error: profileError } = await supabase
            .from('profiles')
            .insert([
              {
                id: authData.user.id,
                name: formData.name,
                email: formData.email,
                role: 'member',
                status: 'pending' // New users start as pending
              }
            ]);
          if (profileError) throw profileError;

          // Notify Admin
          await fetch('/api/notify-admin', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              type: 'NEW_REGISTRATION',
              user: {
                name: formData.name,
                email: formData.email
              }
            })
          });
        }
      }
      router.push('/profile');
    } catch (err) {
      console.error('Auth error:', err);
      const message = err instanceof Error ? err.message : 'An error occurred during authentication.';
      setError(message);
    } finally {
      setIsLoading(false);
    }
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

          {error && (
            <div className="mb-6 p-4 bg-red-50 border-l-4 border-red-500 text-red-700 text-sm flex items-center gap-3">
              <Icon name="times" className="text-red-500" />
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            {!isLogin && (
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-2">Full Name</label>
                <input
                  required
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-black"
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
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-black"
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
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-black"
                placeholder="••••••••"
              />
            </div>

            <button
              disabled={isLoading}
              className="w-full py-4 bg-slate-900 text-white font-bold rounded-xl hover:bg-slate-800 transition-colors shadow-lg disabled:opacity-50"
            >
              {isLoading ? 'Processing...' : (isLogin ? 'Enter Dashboard' : 'Initiate Membership')}
            </button>
          </form>

          <div className="mt-8 text-center text-sm">
            <p className="text-slate-500">
              {isLogin ? "Don't have an account?" : "Already have an account?"}
              <button
                onClick={() => setIsLogin(!isLogin)}
                className="ml-2 text-black font-bold hover:underline"
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
