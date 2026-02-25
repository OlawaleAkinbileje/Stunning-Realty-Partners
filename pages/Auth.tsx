
import React, { useState } from 'react';
import { useRouter } from 'next/router';
import { useAuth } from '../context/AuthContext';
import { supabase } from '../services/supabaseClient';
import Icon from '../components/Icon';

const Auth: React.FC = () => {
  const { currentUser } = useAuth();
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
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
        router.push('/profile');
      } else {
        // Register
        const { data: authData, error: signUpError } = await supabase.auth.signUp({
          email: formData.email,
          password: formData.password,
        });

        // If user already exists, Supabase might not return an error but a user object
        // We should check if they have a profile
        if (signUpError) throw signUpError;

        if (authData.user) {
          console.log('Auth user created successfully:', authData.user.id);

          // Check if profile exists (in case registration was partially successful before)
          const { data: existingProfile, error: checkError } = await supabase
            .from('profiles')
            .select('id')
            .eq('id', authData.user.id)
            .single();

          if (checkError && checkError.code !== 'PGRST116') {
            console.error('Error checking existing profile:', checkError);
          }

          if (!existingProfile) {
            console.log('Attempting to create profile for:', authData.user.id);
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

            if (profileError) {
              console.error('CRITICAL: Profile Insertion Failed:', profileError);
              throw profileError;
            } else {
              console.log('Profile created successfully in database');
            }
          } else {
            console.log('Profile already exists for user');
          }

          // Notify Admin
          console.log('Notifying admin of new registration...');
          const notifyRes = await fetch('/api/notify-admin', {
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

          if (!notifyRes.ok) {
            console.warn('Admin notification API returned an error');
          }

          // Show success message instead of redirecting immediately
          setIsSuccess(true);
        }
      }
    } catch (err) {
      console.error('Auth error:', err);
      let message = err instanceof Error ? err.message : 'An error occurred during authentication.';

      // Handle specific Supabase errors
      if (message.includes('User already registered')) {
        message = 'This email is already registered. Please try logging in instead.';
      } else if (message.toLowerCase().includes('email') && (message.toLowerCase().includes('limit') || message.toLowerCase().includes('rate'))) {
        message = 'Registration limit reached. Please try again in an hour or contact admin. (Supabase Free Tier limit)';
      }

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

          {isSuccess ? (
            <div className="text-center py-10">
              <div className="w-20 h-20 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-8">
                <Icon name="clock" className="text-green-500 text-3xl" />
              </div>
              <h2 className="text-2xl font-bold text-slate-900 mb-4 serif">Registration Received!</h2>
              <p className="text-slate-600 mb-8 leading-loose">
                Welcome to SRP Network, <strong>{formData.name}</strong>. Your membership is currently <strong>pending admin approval</strong>. We have notified the administration team.
              </p>
              <button
                onClick={() => {
                  setIsLogin(true);
                  setIsSuccess(false);
                  setFormData({ ...formData, password: '' });
                }}
                className="bg-black text-white px-8 py-3 rounded-xl font-bold hover:bg-slate-800 transition-all shadow-lg"
              >
                Go to Login
              </button>
            </div>
          ) : (
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
                <div className="relative">
                  <input
                    required
                    type={showPassword ? "text" : "password"}
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-black pr-12"
                    placeholder="••••••••"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-black transition-colors"
                  >
                    <Icon name={showPassword ? "eye-slash" : "eye"} />
                  </button>
                </div>
              </div>

              <button
                disabled={isLoading}
                className="w-full py-4 bg-slate-900 text-white font-bold rounded-xl hover:bg-slate-800 transition-colors shadow-lg disabled:opacity-50"
              >
                {isLoading ? 'Processing...' : (isLogin ? 'Enter Dashboard' : 'Initiate Membership')}
              </button>
            </form>
          )}

          {!isSuccess && (
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
          )}
        </div>
      </div>
    </div>
  );
};

export default Auth;
