
import React, { useState, useEffect, useCallback } from 'react';
import Icon from '../components/Icon';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { Property, PropertyAlert, Inquiry } from '../types';
import PropertyCard from '../components/PropertyCard';
import { useAuth } from '../context/AuthContext';
import { supabase } from '../services/supabaseClient';

const Profile: React.FC = () => {
  const { currentUser, updateUser, toggleFavorite, logout, isLoading: authLoading } = useAuth();
  const [activeTab, setActiveTab] = useState<'favorites' | 'alerts' | 'inquiries'>('favorites');
  const [newAlert, setNewAlert] = useState<Partial<PropertyAlert>>({ location: '', maxPrice: 2000000 });
  const [favoriteProperties, setFavoriteProperties] = useState<Property[]>([]);
  const [inquiries, setInquiries] = useState<Inquiry[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();

  useEffect(() => {
    if (!authLoading && !currentUser) {
      router.push('/auth');
    }
  }, [currentUser, authLoading, router]);

  const fetchFavoriteProperties = useCallback(async () => {
    if (!currentUser || currentUser.favorites.length === 0) {
      setFavoriteProperties([]);
      return;
    }
    setIsLoading(true);
    const { data, error } = await supabase
      .from('properties')
      .select('*')
      .in('id', currentUser.favorites);

    if (!error && data) {
      setFavoriteProperties(data);
    }
    setIsLoading(false);
  }, [currentUser]);

  const fetchInquiries = useCallback(async () => {
    if (!currentUser) return;
    setIsLoading(true);
    const { data, error } = await supabase
      .from('inquiries')
      .select('*')
      .eq('user_id', currentUser.id)
      .order('created_at', { ascending: false });

    if (!error && data) {
      setInquiries(data);
    }
    setIsLoading(false);
  }, [currentUser]);

  useEffect(() => {
    if (activeTab === 'favorites') {
      fetchFavoriteProperties();
    } else if (activeTab === 'inquiries') {
      fetchInquiries();
    }
  }, [activeTab, fetchFavoriteProperties, fetchInquiries]);

  if (authLoading || (isLoading && favoriteProperties.length === 0)) {
    return <div className="pt-40 text-center">Loading SRP Profile...</div>;
  }

  if (!currentUser) return null;

  if (currentUser.status === 'pending') {
    return (
      <div className="pt-40 pb-20 bg-slate-50 min-h-screen text-center">
        <div className="max-w-xl mx-auto bg-white p-12 shadow-2xl border-t-8 border-amber-400">
          <div className="w-20 h-20 bg-amber-50 rounded-full flex items-center justify-center mx-auto mb-8">
            <Icon name="clock" className="text-amber-500 text-3xl" />
          </div>
          <h1 className="text-3xl font-bold text-slate-900 serif mb-6">Account Pending Approval</h1>
          <p className="text-slate-600 leading-loose mb-8">
            Welcome to the SRP Network, <strong>{currentUser.name}</strong>! Your account is currently being reviewed by our administration team. You will receive an email once your access is granted.
          </p>
          <button onClick={logout} className="text-xs font-black uppercase tracking-widest text-slate-400 hover:text-black transition-all">
            Sign Out
          </button>
        </div>
      </div>
    );
  }

  const handleAddAlert = (e: React.FormEvent) => {
    e.preventDefault();
    const alert: PropertyAlert = {
      id: Math.random().toString(36).substr(2, 9),
      ...newAlert
    };
    updateUser({
      ...currentUser,
      alerts: [...currentUser.alerts, alert]
    });
    setNewAlert({ location: '', maxPrice: 2000000 });
  };

  const removeAlert = (id: string) => {
    updateUser({
      ...currentUser,
      alerts: currentUser.alerts.filter(a => a.id !== id)
    });
  };

  return (
    <div className="pt-20 bg-slate-50 min-h-screen">
      <section className="bg-white py-12 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-6">
            <div className="w-24 h-24 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 text-3xl">
              <Icon name="user" className="text-blue-600 text-3xl" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-slate-900 serif">{currentUser.name}</h1>
              <p className="text-slate-500">{currentUser.email}</p>
            </div>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex gap-8 mb-8 border-b border-slate-200">
          <button
            onClick={() => setActiveTab('favorites')}
            className={`pb-4 px-2 font-bold text-sm uppercase tracking-widest transition-all border-b-2 ${activeTab === 'favorites' ? 'border-blue-600 text-blue-600' : 'border-transparent text-slate-400 hover:text-slate-600'
              }`}
          >
            Saved Favorites ({favoriteProperties.length})
          </button>
          <button
            onClick={() => setActiveTab('alerts')}
            className={`pb-4 px-2 font-bold text-sm uppercase tracking-widest transition-all border-b-2 ${activeTab === 'alerts' ? 'border-blue-600 text-blue-600' : 'border-transparent text-slate-400 hover:text-slate-600'
              }`}
          >
            Email Alerts ({currentUser.alerts.length})
          </button>
          <button
            onClick={() => setActiveTab('inquiries')}
            className={`pb-4 px-2 font-bold text-sm uppercase tracking-widest transition-all border-b-2 ${activeTab === 'inquiries' ? 'border-blue-600 text-blue-600' : 'border-transparent text-slate-400 hover:text-slate-600'
              }`}
          >
            Inquiry History
          </button>
        </div>

        {activeTab === 'favorites' ? (
          <div>
            {favoriteProperties.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {favoriteProperties.map(property => (
                  <PropertyCard
                    key={property.id}
                    property={property}
                    currentUser={currentUser}
                    onFavorite={(id) => toggleFavorite(id)}
                  />
                ))}
              </div>
            ) : (
              <div className="bg-white rounded-3xl p-12 text-center border border-dashed border-slate-300">
                <h3 className="text-xl font-bold text-slate-900 mb-4">No saved properties yet</h3>
                <Link href="/listings" className="bg-blue-600 text-white px-8 py-3 rounded-full font-bold hover:bg-blue-700 transition-colors inline-block">
                  Browse Listings
                </Link>
              </div>
            )}
          </div>
        ) : activeTab === 'alerts' ? (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            <div className="lg:col-span-1">
              <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm">
                <h3 className="text-xl font-bold text-slate-900 mb-6 serif">Create New Alert</h3>
                <form onSubmit={handleAddAlert} className="space-y-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">Preferred Location</label>
                    <input
                      required
                      type="text"
                      placeholder="e.g. California"
                      className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-blue-500"
                      value={newAlert.location}
                      onChange={(e) => setNewAlert({ ...newAlert, location: e.target.value })}
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">Max Price ($)</label>
                    <input
                      required
                      type="number"
                      className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-blue-500"
                      value={newAlert.maxPrice}
                      onChange={(e) => setNewAlert({ ...newAlert, maxPrice: Number(e.target.value) })}
                    />
                  </div>
                  <button className="w-full py-4 bg-slate-900 text-white font-bold rounded-xl hover:bg-slate-800 transition-colors shadow-lg">
                    Setup Alert
                  </button>
                </form>
              </div>
            </div>
            <div className="lg:col-span-2 space-y-4">
              {currentUser.alerts.length > 0 ? (
                currentUser.alerts.map(alert => (
                  <div key={alert.id} className="bg-white p-6 rounded-2xl border border-slate-200 flex justify-between items-center group">
                    <div>
                      <h4 className="font-bold text-slate-900 text-lg">Property in {alert.location}</h4>
                      <p className="text-slate-500 text-sm">Under ${alert.maxPrice?.toLocaleString()} • Real-time notifications active</p>
                    </div>
                    <button
                      onClick={() => removeAlert(alert.id)}
                      className="w-10 h-10 rounded-full flex items-center justify-center text-slate-400 hover:text-red-500 hover:bg-red-50 transition-all"
                    >
                      <Icon name="trash-alt" className="text-slate-400" />
                    </button>
                  </div>
                ))
              ) : (
                <div className="bg-white rounded-3xl p-12 text-center border border-dashed border-slate-300">
                  <p className="text-slate-500">You haven&apos;t set up any email alerts yet.</p>
                </div>
              )}
            </div>
          </div>
        ) : (
          <div className="space-y-8">
            <div className="bg-white shadow-xl overflow-hidden border border-slate-100 rounded-2xl">
              <table className="w-full text-left">
                <thead className="bg-slate-50 text-[10px] uppercase tracking-widest font-black text-slate-400">
                  <tr>
                    <th className="px-8 py-6">Date</th>
                    <th className="px-8 py-6">Interest / Property</th>
                    <th className="px-8 py-6">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {inquiries.length > 0 ? inquiries.map((inquiry) => (
                    <tr key={inquiry.id} className="hover:bg-slate-50 transition-colors">
                      <td className="px-8 py-6 text-sm text-slate-500">
                        {new Date(inquiry.created_at).toLocaleDateString()}
                      </td>
                      <td className="px-8 py-6">
                        <p className="font-bold text-slate-900">{inquiry.interest}</p>
                        {inquiry.property_title && <p className="text-xs text-blue-600 font-medium">{inquiry.property_title}</p>}
                      </td>
                      <td className="px-8 py-6">
                        <span className={`text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-full ${inquiry.status === 'new' ? 'bg-blue-50 text-blue-600' : 'bg-green-50 text-green-600'
                          }`}>
                          {inquiry.status}
                        </span>
                      </td>
                    </tr>
                  )) : (
                    <tr>
                      <td colSpan={3} className="px-8 py-20 text-center text-slate-400 text-sm font-medium">
                        No inquiry history found.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12">
              <div className="bg-slate-900 p-10 text-white rounded-3xl shadow-2xl relative overflow-hidden">
                <div className="relative z-10">
                  <h3 className="text-2xl font-bold mb-4 serif">Member Training</h3>
                  <p className="text-slate-400 text-sm mb-8 leading-loose">Access exclusive SRP marketing kits, property brochures, and network training modules.</p>
                  <button className="bg-white text-black px-8 py-3 rounded-full font-black text-[10px] uppercase tracking-widest hover:bg-slate-100 transition-all">
                    Enter Training Hub
                  </button>
                </div>
                <Icon name="user-graduate" className="absolute -bottom-10 -right-10 text-slate-800 text-9xl opacity-50" />
              </div>

              <div className="bg-white p-10 border border-slate-200 rounded-3xl shadow-xl relative overflow-hidden">
                <div className="relative z-10">
                  <h3 className="text-2xl font-bold text-slate-900 mb-4 serif">Commission Ledger</h3>
                  <p className="text-slate-500 text-sm mb-8 leading-loose">Track your referral earnings and payout status from successful property closures.</p>
                  <div className="text-3xl font-black text-slate-900 mb-2">₦0.00</div>
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Total Earnings</p>
                </div>
                <Icon name="chart-line" className="absolute -bottom-10 -right-10 text-slate-50 text-9xl" />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Profile;
