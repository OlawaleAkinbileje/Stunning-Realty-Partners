
import React, { useState, useEffect, useCallback } from 'react';
import Icon from '../../components/Icon';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { User, Property } from '../../types';
import Image from 'next/image';
import { supabase } from '../../services/supabaseClient';

interface PropertyDetailsProps {
  toggleFavorite: (id: string) => void;
  currentUser: User | null;
}

const PropertyDetails: React.FC<PropertyDetailsProps> = ({ toggleFavorite, currentUser }) => {
  const router = useRouter();
  const { id } = router.query as { id: string };
  const [property, setProperty] = useState<Property | null>(null);
  const [activeImage, setActiveImage] = useState(0);
  const [inquirySent, setInquirySent] = useState(false);
  const [inquiryData, setInquiryData] = useState({ name: '', email: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const fetchProperty = useCallback(async () => {
    setIsLoading(true);
    const { data, error } = await supabase
      .from('properties')
      .select('*')
      .eq('id', id)
      .single();

    if (!error && data) {
      setProperty(data);
    }
    setIsLoading(false);
  }, [id]);

  useEffect(() => {
    if (id) {
      fetchProperty();
    }
  }, [id, fetchProperty]);

  if (isLoading) return <div className="pt-40 text-center">Loading Asset...</div>;
  if (!property) return <div className="pt-40 text-center">Asset Not Found</div>;

  const isFavorite = currentUser?.favorites.includes(property.id);

  const handleInquirySubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMessage(null);

    try {
      const res = await fetch('/api/inquiry', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...inquiryData,
          propertyTitle: property.title,
          propertyId: property.id,
          userId: currentUser?.id
        })
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Failed to send inquiry');
      }

      setInquirySent(true);
      setInquiryData({ name: '', email: '', message: '' });
      setTimeout(() => setInquirySent(false), 8000);
    } catch (err) {
      console.error('Inquiry error', err);
      const message = err instanceof Error ? err.message : 'An unexpected error occurred. Please try again.';
      setErrorMessage(message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="pt-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <nav className="flex   text-[10px] font-black uppercase tracking-widest text-slate-400">
          <Link href="/" className="hover:text-black">Home</Link>
          <span className="mx-3">/</span>
          <Link href="/listings" className="hover:text-black">Listings</Link>
          <span className="mx-3">/</span>
          <span className="text-black">{property.title}</span>
        </nav>
      </div>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          <div className="lg:col-span-2 relative h-[500px] overflow-hidden">
            <Image
              src={`/${property.images[activeImage]}`}
              alt={property.title}
              fill
              className="object-cover"
            />
            <button
              onClick={() => toggleFavorite(property.id)}
              className={`absolute top-8 right-8 w-14 h-14 rounded-none flex items-center justify-center shadow-2xl transition-all ${isFavorite ? 'bg-red-600 text-white' : 'bg-white text-black'}`}
            >
              <Icon name="heart" variant={isFavorite ? 'solid' : 'regular'} className="text-xl" />
            </button>
          </div>
          <div className="flex lg:flex-col gap-4 overflow-x-auto lg:overflow-y-auto pr-2 h-[500px]">
            {property.images.map((img, idx) => (
              <div
                key={idx}
                className={`relative w-32 lg:w-full h-32 cursor-pointer border-2 ${activeImage === idx ? 'border-black' : 'border-transparent'}`}
                onClick={() => setActiveImage(idx)}
              >
                <Image
                  src={`/${img}`}
                  alt="Thumb"
                  fill
                  className="object-cover"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-32 grid grid-cols-1 lg:grid-cols-3 gap-20">
        <div className="lg:col-span-2">
          <div className="mb-10">
            <h1 className="text-5xl font-bold serif mb-4">{property.title}</h1>
            <p className="text-slate-500 font-bold uppercase tracking-widest text-xs flex items-center mb-6">
              <Icon name="map-marker-alt" className="mr-2 text-black" /> {property.location}
            </p>
            <div className="bg-slate-50 p-8 border-l-8 border-black mb-10">
              <span className="text-xs font-black uppercase tracking-widest text-slate-400 block mb-2">Investment Starting From</span>
              <p className="text-4xl font-black">₦{property.price.toLocaleString()}</p>
              {property.sqmPrice && <p className="text-sm font-bold text-slate-500 mt-2">₦{property.sqmPrice.toLocaleString()} / SQM</p>}
            </div>

            <p className="text-lg leading-loose text-slate-600 mb-10">{property.description}</p>

            {property.units && (
              <div className="mb-12">
                <h3 className="text-xl font-black uppercase tracking-widest mb-6">Product Catalogue</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {property.units.map((unit, idx) => (
                    <div key={idx} className="bg-white border border-slate-200 p-6 hover:border-black transition-all">
                      <p className="text-xs font-black uppercase text-slate-400 mb-2">{unit.type}</p>
                      <p className="text-xl font-bold">₦{unit.price.toLocaleString()}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {property.paymentPlans && (
              <div className="mb-12 bg-slate-900 text-white p-10">
                <h3 className="text-xl font-black uppercase tracking-widest mb-6">Payment Structures</h3>
                <div className="space-y-4">
                  {property.paymentPlans.map((plan, idx) => (
                    <div key={idx} className="flex justify-between items-center border-b border-slate-700 pb-4">
                      <div>
                        <p className="font-bold">{plan.name}</p>
                        {plan.deposit && <p className="text-[10px] uppercase text-slate-400">Initial Deposit: ₦{plan.deposit.toLocaleString()}</p>}
                      </div>
                      <p className="text-xl font-black text-blue-400">₦{plan.price.toLocaleString()}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {property.landmarks && (
              <div className="mb-12">
                <h3 className="text-xl font-black uppercase tracking-widest mb-6">Strategic Landmarks</h3>
                <div className="flex flex-wrap gap-3">
                  {property.landmarks.map((l, i) => (
                    <span key={i} className="bg-slate-100 px-4 py-2 text-xs font-bold text-slate-600">
                      <Icon name="location-arrow" className="mr-2 text-black" /> {l}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        <aside className="lg:col-span-1">
          <div className="sticky top-28 bg-white border border-slate-100 shadow-2xl p-8">
            <h4 className="font-black uppercase text-sm mb-6 border-b pb-4">Partner Inquiry Desk</h4>
            <form onSubmit={handleInquirySubmit} className="space-y-5">
              <input
                required
                type="text"
                placeholder="Full Professional Name"
                className="w-full bg-slate-50 border-none p-4 text-sm focus:ring-1 focus:ring-black outline-none"
                value={inquiryData.name}
                onChange={(e) => setInquiryData({ ...inquiryData, name: e.target.value })}
              />
              <input
                required
                type="email"
                placeholder="Corporate Email"
                className="w-full bg-slate-50 border-none p-4 text-sm focus:ring-1 focus:ring-black outline-none"
                value={inquiryData.email}
                onChange={(e) => setInquiryData({ ...inquiryData, email: e.target.value })}
              />
              <textarea
                required
                rows={6}
                className="w-full bg-slate-50 border-none p-4 text-sm focus:ring-1 focus:ring-black outline-none"
                placeholder={`I am interested in ${property.title}. Please provide more details.`}
                value={inquiryData.message}
                onChange={(e) => setInquiryData({ ...inquiryData, message: e.target.value })}
              ></textarea>

              {errorMessage && (
                <div className="p-4 bg-red-50 border-l-4 border-red-500 text-red-700 text-[10px] font-bold uppercase tracking-widest animate-in fade-in slide-in-from-top-2 duration-300">
                  <div className="flex items-center gap-3">
                    <Icon name="times" className="text-red-500" />
                    <span>{errorMessage}</span>
                  </div>
                </div>
              )}

              <button
                disabled={isSubmitting}
                className="w-full bg-black text-white font-black py-5 text-[10px] uppercase tracking-widest hover:bg-slate-800 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? 'Sending Request...' : 'Send Request'}
              </button>
            </form>
            {inquirySent && (
              <div className="mt-6 p-4 bg-green-50 border border-green-200 rounded-none">
                <p className="text-green-800 text-[10px] font-bold uppercase text-center leading-relaxed">
                  Inquiry forwarded to stunningrealty@gmail.com. We will reach out within 24 hours.
                </p>
              </div>
            )}
          </div>
        </aside>
      </div>
    </div>
  );
};

export default PropertyDetails;
