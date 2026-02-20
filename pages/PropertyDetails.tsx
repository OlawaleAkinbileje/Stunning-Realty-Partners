
import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { PROPERTIES } from '../constants';
import { User } from '../types';

interface PropertyDetailsProps {
  toggleFavorite: (id: string) => void;
  currentUser: User | null;
}

const PropertyDetails: React.FC<PropertyDetailsProps> = ({ toggleFavorite, currentUser }) => {
  const { id } = useParams<{ id: string }>();
  const property = PROPERTIES.find(p => p.id === id);
  const [activeImage, setActiveImage] = useState(0);
  const [inquirySent, setInquirySent] = useState(false);
  const [inquiryData, setInquiryData] = useState({ name: '', email: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!property) return <div className="pt-40 text-center">Asset Not Found</div>;

  const isFavorite = currentUser?.favorites.includes(property.id);

  const handleInquirySubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate API call to send data to stunningrealty@gmail.com
    console.log(`Sending property inquiry for ${property.title} to stunningrealty@gmail.com`, inquiryData);

    await new Promise(resolve => setTimeout(resolve, 1500));

    setIsSubmitting(false);
    setInquirySent(true);
    setInquiryData({ name: '', email: '', message: '' });
    setTimeout(() => setInquirySent(false), 8000);
  };

  return (
    <div className="pt-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <nav className="flex text-[10px] font-black uppercase tracking-widest text-slate-400">
          <Link to="/" className="hover:text-black">Home</Link>
          <span className="mx-3">/</span>
          <Link to="/listings" className="hover:text-black">Listings</Link>
          <span className="mx-3">/</span>
          <span className="text-black">{property.title}</span>
        </nav>
      </div>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          <div className="lg:col-span-2 relative h-[500px] overflow-hidden">
            <img src={property.images[activeImage]} className="w-full h-full object-cover" alt={property.title} />
            <button
              onClick={() => toggleFavorite(property.id)}
              className={`absolute top-8 right-8 w-14 h-14 rounded-none flex items-center justify-center shadow-2xl transition-all ${isFavorite ? 'bg-red-600 text-white' : 'bg-white text-black'}`}
            >
              <i className={`fa-heart ${isFavorite ? 'fas' : 'far'} text-xl`}></i>
            </button>
          </div>
          <div className="flex lg:flex-col gap-4 overflow-x-auto lg:overflow-y-auto pr-2 h-[500px]">
            {property.images.map((img, idx) => (
              <img key={idx} src={img} onClick={() => setActiveImage(idx)} className={`cursor-pointer w-32 lg:w-full h-32 object-cover border-2 ${activeImage === idx ? 'border-black' : 'border-transparent'}`} alt="Thumb" />
            ))}
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-32 grid grid-cols-1 lg:grid-cols-3 gap-20">
        <div className="lg:col-span-2">
          <div className="mb-10">
            <h1 className="text-5xl font-bold serif mb-4">{property.title}</h1>
            <p className="text-slate-500 font-bold uppercase tracking-widest text-xs flex items-center mb-6">
              <i className="fas fa-map-marker-alt mr-2 text-black"></i> {property.location}
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
                      <i className="fas fa-location-arrow mr-2 text-black"></i> {l}
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
              <button
                disabled={isSubmitting}
                className="w-full bg-black text-white font-black py-5 text-[10px] uppercase tracking-widest hover:bg-slate-800 transition-all disabled:opacity-50"
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
