
import React, { useState } from 'react';
import { Navigate, Link } from 'react-router-dom';
import { User, Property, PropertyAlert } from '../types';
import { PROPERTIES } from '../constants';
import PropertyCard from '../components/PropertyCard';

interface ProfileProps {
  currentUser: User | null;
  onUpdateUser: (user: User) => void;
}

const Profile: React.FC<ProfileProps> = ({ currentUser, onUpdateUser }) => {
  const [activeTab, setActiveTab] = useState<'favorites' | 'alerts'>('favorites');
  const [newAlert, setNewAlert] = useState<Partial<PropertyAlert>>({ location: '', maxPrice: 2000000 });

  if (!currentUser) return <Navigate to="/auth" />;

  const favoriteProperties = PROPERTIES.filter(p => currentUser.favorites.includes(p.id));

  const handleAddAlert = (e: React.FormEvent) => {
    e.preventDefault();
    const alert: PropertyAlert = {
      id: Math.random().toString(36).substr(2, 9),
      ...newAlert
    };
    onUpdateUser({
      ...currentUser,
      alerts: [...currentUser.alerts, alert]
    });
    setNewAlert({ location: '', maxPrice: 2000000 });
  };

  const removeAlert = (id: string) => {
    onUpdateUser({
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
              <i className="fas fa-user"></i>
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
            className={`pb-4 px-2 font-bold text-sm uppercase tracking-widest transition-all border-b-2 ${
              activeTab === 'favorites' ? 'border-blue-600 text-blue-600' : 'border-transparent text-slate-400 hover:text-slate-600'
            }`}
          >
            Saved Favorites ({favoriteProperties.length})
          </button>
          <button 
            onClick={() => setActiveTab('alerts')}
            className={`pb-4 px-2 font-bold text-sm uppercase tracking-widest transition-all border-b-2 ${
              activeTab === 'alerts' ? 'border-blue-600 text-blue-600' : 'border-transparent text-slate-400 hover:text-slate-600'
            }`}
          >
            Email Alerts ({currentUser.alerts.length})
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
                    onFavorite={(id) => {
                      const newFaves = currentUser.favorites.filter(fid => fid !== id);
                      onUpdateUser({ ...currentUser, favorites: newFaves });
                    }} 
                  />
                ))}
              </div>
            ) : (
              <div className="bg-white rounded-3xl p-12 text-center border border-dashed border-slate-300">
                <h3 className="text-xl font-bold text-slate-900 mb-4">No saved properties yet</h3>
                <Link to="/listings" className="bg-blue-600 text-white px-8 py-3 rounded-full font-bold hover:bg-blue-700 transition-colors inline-block">
                  Browse Listings
                </Link>
              </div>
            )}
          </div>
        ) : (
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
                      onChange={(e) => setNewAlert({...newAlert, location: e.target.value})}
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">Max Price ($)</label>
                    <input 
                      required
                      type="number" 
                      className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-blue-500"
                      value={newAlert.maxPrice}
                      onChange={(e) => setNewAlert({...newAlert, maxPrice: Number(e.target.value)})}
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
                      <i className="fas fa-trash-alt"></i>
                    </button>
                  </div>
                ))
              ) : (
                <div className="bg-white rounded-3xl p-12 text-center border border-dashed border-slate-300">
                  <p className="text-slate-500">You haven't set up any email alerts yet.</p>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Profile;
