
import React, { useState } from 'react';
import Icon from '../components/Icon';
import { useNavigate, Link } from 'react-router-dom';
import PropertyCard from '../components/PropertyCard';
import { PROPERTIES, BLOG_POSTS } from '../constants';

const Home: React.FC = () => {
  const navigate = useNavigate();
  const featuredProperties = PROPERTIES.filter(p => p.featured);
  const [searchCity, setSearchCity] = useState('');
  const [propertyType, setPropertyType] = useState('Property Type');


  const handleSearch = () => {
    const params = new URLSearchParams();
    if (searchCity) params.append('search', searchCity);
    if (propertyType !== 'Property Type') params.append('type', propertyType);
    navigate(`/listings?${params.toString()}`);
  };

  return (
    <div className="pt-20">
      {/* Hero Section */}
      <section className="relative h-[95vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=2000"
            alt="Corporate Real Estate"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-slate-900/60"></div>
        </div>

        <div className="relative z-10 text-center px-4 max-w-5xl mx-auto">
          <div className="mb-8 flex justify-center items-center gap-4 animate-in fade-in slide-in-from-top-4 duration-500">
            <Icon name="star" className="text-white text-3xl" />
            <span className="text-white font-black tracking-[0.4em] uppercase text-sm border-y border-white/30 py-2">
              Stunning Realty Partners
            </span>
            <Icon name="star" className="text-white text-3xl" />
          </div>

          <h1 className="text-5xl md:text-8xl font-bold text-white mb-8 serif leading-tight animate-in fade-in slide-in-from-bottom-6 duration-700">
            Brokerage <span className="text-slate-300 font-light">&</span> Network <br />
            <span className="italic">Excellence.</span>
          </h1>

          <p className="text-lg md:text-xl text-slate-300 mb-12 max-w-3xl mx-auto font-medium leading-relaxed animate-in fade-in slide-in-from-bottom-8 duration-900">
            Successfully brokering high-profile properties in prime locations while empowering our global partner network.
          </p>

          <div className="glass p-3 rounded-none max-w-4xl mx-auto flex flex-col md:flex-row items-center gap-3 animate-in fade-in slide-in-from-bottom-10 duration-1000 shadow-2xl">
            <div className="flex-1 flex items-center gap-4 px-8 w-full py-4 md:py-0">
              <Icon name="search" className="text-slate-400" />
              <input
                type="text"
                placeholder="Enter city or neighborhood..."
                className="bg-transparent border-none focus:ring-0 text-slate-900 w-full placeholder:text-slate-500 outline-none font-bold text-sm"
                value={searchCity}
                onChange={(e) => setSearchCity(e.target.value)}
              />
            </div>
            <div className="hidden md:block h-10 w-px bg-slate-300"></div>
            <div className="flex-1 flex items-center gap-4 px-8 w-full py-4 md:py-0">
              <Icon name="network-wired" className="text-slate-400" />
              <select className="bg-transparent border-none focus:ring-0 text-slate-900 w-full appearance-none outline-none font-bold text-sm">
                <option>Partner Options</option>
                <option>Browse Premium Only</option>
                <option>Join Agent Network</option>
                <option>Valuation Services</option>
              </select>
            </div>
            <button
              onClick={handleSearch}
              className="bg-black text-white px-10 py-5 rounded-none font-black text-xs uppercase tracking-widest hover:bg-slate-800 transition-all w-full md:w-auto"
            >
              Explore SRP
            </button>
          </div>
        </div>
      </section>

      {/* Featured Properties */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
            <div>
              <span className="text-black font-black text-xs tracking-[0.3em] uppercase mb-4 block">Premium Assets</span>
              <h2 className="text-4xl md:text-5xl font-bold text-slate-900 serif">Exclusive Brokerage Portfolio</h2>
            </div>
            <Link to="/listings" className="group flex items-center gap-3 text-black font-black text-xs uppercase tracking-widest hover:translate-x-1 transition-all">
              View All Listings
              <Icon name="long-arrow-alt-right" className="text-lg" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {featuredProperties.map(property => (
              <PropertyCard key={property.id} property={property} />
            ))}
          </div>
        </div>
      </section>

      {/* Blog Cards Section */}
      <section className="py-24 bg-slate-50 border-y border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
            <div className="text-left">
              <span className="text-slate-400 font-black uppercase tracking-[0.3em] text-xs mb-4 block">SRP Insights</span>
              <h2 className="text-4xl font-bold text-slate-900 serif">Latest From Our Network</h2>
            </div>
            <Link
              to="/blog"
              className="text-black font-black uppercase tracking-widest text-xs border-b-2 border-black pb-1 hover:text-slate-600 hover:border-slate-600 transition-all"
            >
              See All Insights
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            {BLOG_POSTS.slice(0, 2).map(post => (
              <Link key={post.id} to={`/blog/${post.id}`} className="group bg-white flex flex-col md:flex-row overflow-hidden shadow-sm hover:shadow-xl transition-all">
                <div className="md:w-2/5 h-64 md:h-auto overflow-hidden">
                  <img src={post.image} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" alt={post.title} />
                </div>
                <div className="md:w-3/5 p-8 flex flex-col justify-center">
                  <span className="text-[10px] font-black uppercase tracking-widest text-blue-600 mb-2">{post.category}</span>
                  <h3 className="text-xl font-bold mb-4 group-hover:text-blue-600 transition-colors">{post.title}</h3>
                  <p className="text-slate-500 text-sm mb-6 line-clamp-2">{post.excerpt}</p>
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{post.date}</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Partners Section CTA */}
      <section className="py-32 bg-slate-50 border-y border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="mb-12">
            <Icon name="users-cog" className="text-black text-4xl mb-6" />
            <h2 className="text-4xl md:text-6xl font-bold text-slate-900 serif mb-8">Empower Your Success.</h2>
            <p className="text-lg text-slate-600 max-w-3xl mx-auto leading-loose mb-12">
              Join SRP to expand your business through referrals, joint marketing, and high-quality professional development tools. We equip you for the competitive real estate landscape.
            </p>
            <div className="flex flex-wrap justify-center gap-6">
              <Link to="/auth" className="bg-black text-white px-10 py-5 font-black text-xs uppercase tracking-widest hover:bg-slate-800 transition-all shadow-xl">
                Become a Member
              </Link>
              <Link to="/services" className="border-2 border-black text-black px-10 py-5 font-black text-xs uppercase tracking-widest hover:bg-black hover:text-white transition-all">
                Network Benefits
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
