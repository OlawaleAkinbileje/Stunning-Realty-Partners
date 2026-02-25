
import React, { useState, useMemo, useEffect } from 'react';
import Icon from '../components/Icon';
import Link from 'next/link';
import { useRouter } from 'next/router';
import PropertyCard from '../components/PropertyCard';
import { useAuth } from '../context/AuthContext';
import { supabase } from '../services/supabaseClient';
import { Property } from '../types';

const Listings: React.FC = () => {
  const { currentUser, toggleFavorite } = useAuth();
  const router = useRouter();
  const queryParams = useMemo(() => new URLSearchParams(router.asPath.split('?')[1] || ''), [router.asPath]);

  const [properties, setProperties] = useState<Property[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [filterType, setFilterType] = useState(queryParams.get('type') || 'All');
  const [sortOrder, setSortOrder] = useState('Newest');
  const [searchQuery, setSearchQuery] = useState(queryParams.get('search') || '');
  const [priceRange, setPriceRange] = useState(500000000);

  useEffect(() => {
    fetchProperties();
  }, []);

  const fetchProperties = async () => {
    setIsLoading(true);
    const { data, error } = await supabase
      .from('properties')
      .select('*');

    if (!error && data) {
      setProperties(data);
    }
    setIsLoading(false);
  };

  // Sync state with URL if it changes
  useEffect(() => {
    const searchParam = queryParams.get('search');
    const typeParam = queryParams.get('type');
    if (searchParam !== null) setSearchQuery(searchParam);
    if (typeParam !== null) setFilterType(typeParam);
  }, [queryParams]);

  const filteredProperties = useMemo(() => {
    return properties.filter(p => {
      const matchesType = filterType === 'All' || p.type === filterType;
      const matchesSearch = p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.location.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesPrice = p.price <= priceRange;

      return matchesType && matchesSearch && matchesPrice;
    }).sort((a, b) => {
      if (sortOrder === 'Newest') {
        const dateA = new Date(a.created_at || a.createdAt || 0).getTime();
        const dateB = new Date(b.created_at || b.createdAt || 0).getTime();
        return dateB - dateA;
      }
      if (sortOrder === 'Price: Low to High') return a.price - b.price;
      if (sortOrder === 'Price: High to Low') return b.price - a.price;
      return 0;
    });
  }, [properties, filterType, sortOrder, searchQuery, priceRange]);

  return (
    <div className="pt-20 bg-slate-50 min-h-screen">
      <section className="bg-white py-12 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div>
              <h1 className="text-4xl font-bold text-slate-900 serif">Premium Assets</h1>
              <p className="text-slate-500 mt-2">Discover curated listings from the SRP global network.</p>
            </div>

            <div className="flex flex-wrap gap-4">
              <div className="relative">
                <Icon name="search" className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-sm" />
                <input
                  type="text"
                  placeholder="Search location..."
                  className="pl-10 pr-4 py-2 bg-slate-100 border-none rounded-full text-sm focus:ring-2 focus:ring-black w-full md:w-64 outline-none"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">Sort:</span>
                <select
                  className="bg-transparent border-none text-sm font-bold text-slate-900 focus:ring-0 cursor-pointer outline-none"
                  value={sortOrder}
                  onChange={(e) => setSortOrder(e.target.value)}
                >
                  <option>Newest</option>
                  <option>Price: Low to High</option>
                  <option>Price: High to Low</option>
                </select>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 flex flex-col lg:flex-row gap-12">
        {/* Sidebar Filters */}
        <aside className="lg:w-64 flex-shrink-0 space-y-8">
          <div>
            <h3 className="font-bold text-[10px] uppercase tracking-widest text-slate-400 mb-4 flex items-center gap-2">
              <Icon name="filter" className="text-black" />
              Property Type
            </h3>
            <div className="space-y-2">
              {['All', 'House', 'Villa', 'Apartment', 'Condo', 'Land', 'Commercial'].map(type => (
                <Link
                  key={type}
                  href={`/listings?${new URLSearchParams({
                    ...(searchQuery && { search: searchQuery }),
                    ...(type !== 'All' && { type })
                  }).toString()}`}
                  className={`block w-full text-left px-4 py-3 rounded-none text-[10px] uppercase tracking-widest font-bold transition-all ${filterType === type ? 'bg-black text-white' : 'text-slate-600 hover:bg-white'
                    }`}
                >
                  {type}
                </Link>
              ))}
            </div>
          </div>

          <div>
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-bold text-[10px] uppercase tracking-widest text-slate-400">Max Price</h3>
              <span className="text-xs font-bold text-black">₦{(priceRange / 1000000).toFixed(0)}M</span>
            </div>
            <input
              type="range"
              min="1000000"
              max="1000000000"
              step="1000000"
              value={priceRange}
              onChange={(e) => setPriceRange(Number(e.target.value))}
              className="w-full h-1 bg-slate-200 rounded-none appearance-none cursor-pointer accent-black"
            />
            <div className="flex justify-between text-[8px] text-slate-400 mt-2 font-bold uppercase tracking-widest">
              <span>₦1M</span>
              <span>₦1B</span>
            </div>
          </div>

          <div className="p-8 bg-black rounded-none text-white shadow-xl">
            <h4 className="font-bold mb-3 uppercase tracking-widest text-xs">Partner Support</h4>
            <p className="text-[10px] text-slate-400 mb-6 leading-loose">Need assistance with a client proposal or valuation?</p>
            <Link href="/contact" className="w-full py-3 bg-white text-black text-[10px] font-black uppercase tracking-widest hover:bg-slate-100 transition-colors inline-block text-center">
              Contact Desk
            </Link>
          </div>
        </aside>

        {/* Results Grid */}
        <div className="flex-grow">
          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="bg-white h-96 animate-pulse border border-slate-100 shadow-sm rounded-2xl"></div>
              ))}
            </div>
          ) : filteredProperties.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
              {filteredProperties.map(property => (
                <PropertyCard
                  key={property.id}
                  property={property}
                  onFavorite={toggleFavorite}
                  currentUser={currentUser}
                />
              ))}
            </div>
          ) : (
            <div className="bg-white rounded-none p-20 text-center border-2 border-dashed border-slate-200">
              <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-8">
                <Icon name="search" className="text-slate-300 text-3xl" />
              </div>
              <h3 className="text-2xl font-bold text-slate-900 mb-4 serif">No matching assets found</h3>
              <p className="text-slate-500 mb-10">Try expanding your search parameters or location.</p>
              <Link
                href="/listings"
                className="text-black font-black uppercase tracking-widest text-xs border-b-2 border-black pb-1 hover:text-slate-600 hover:border-slate-600 transition-all inline-block"
              >
                Clear all filters
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Listings;
