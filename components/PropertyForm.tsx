import React, { useState } from 'react';
import { Property } from '../types';

interface PropertyFormProps {
  initialData?: Partial<Property>;
  onSubmit: (data: Partial<Property>) => Promise<void>;
  isSubmitting: boolean;
  title: string;
}

const PropertyForm: React.FC<PropertyFormProps> = ({ initialData, onSubmit, isSubmitting, title }) => {
  const [formData, setFormData] = useState<Partial<Property>>({
    title: '',
    price: 0,
    location: '',
    type: 'Apartment',
    status: 'Still Selling',
    description: '',
    beds: 0,
    baths: 0,
    sqft: 0,
    featured: false,
    image: '',
    images: [],
    landmarks: [],
    ...initialData
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const target = e.target as HTMLInputElement;
    const { name, value, type, checked } = target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  const handleListChange = (name: string, value: string) => {
    setFormData({
      ...formData,
      [name]: value.split(',').map(s => s.trim())
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <div className="max-w-4xl mx-auto bg-white shadow-2xl p-10 md:p-16 border-t-8 border-black">
      <h2 className="text-3xl font-bold text-slate-900 serif mb-10">{title}</h2>

      <form onSubmit={handleSubmit} className="space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <label className="block text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2">Property Title</label>
            <input
              required
              name="title"
              value={formData.title}
              onChange={handleChange}
              className="w-full bg-slate-50 border-b-2 border-slate-200 py-3 outline-none focus:border-black transition-all font-bold"
            />
          </div>
          <div>
            <label className="block text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2">Price (₦)</label>
            <input
              required
              type="number"
              name="price"
              value={formData.price}
              onChange={handleChange}
              className="w-full bg-slate-50 border-b-2 border-slate-200 py-3 outline-none focus:border-black transition-all font-bold"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <label className="block text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2">Type</label>
            <select
              name="type"
              value={formData.type}
              onChange={handleChange}
              className="w-full bg-slate-50 border-b-2 border-slate-200 py-3 outline-none focus:border-black transition-all font-bold"
            >
              <option>Apartment</option>
              <option>House</option>
              <option>Villa</option>
              <option>Condo</option>
              <option>Land</option>
              <option>Commercial</option>
            </select>
          </div>
          <div>
            <label className="block text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2">Status</label>
            <select
              name="status"
              value={formData.status}
              onChange={handleChange}
              className="w-full bg-slate-50 border-b-2 border-slate-200 py-3 outline-none focus:border-black transition-all font-bold"
            >
              <option>Still Selling</option>
              <option>For Sale</option>
              <option>For Rent</option>
              <option>Off-Plan</option>
            </select>
          </div>
          <div className="flex items-center gap-4 pt-6">
            <input
              type="checkbox"
              name="featured"
              checked={formData.featured}
              onChange={handleChange}
              className="w-5 h-5 accent-black"
            />
            <label className="text-[10px] font-black uppercase tracking-widest text-slate-900">Featured Asset</label>
          </div>
        </div>

        <div>
          <label className="block text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2">Location</label>
          <input
            required
            name="location"
            value={formData.location}
            onChange={handleChange}
            className="w-full bg-slate-50 border-b-2 border-slate-200 py-3 outline-none focus:border-black transition-all font-bold"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <label className="block text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2">Beds</label>
            <input
              type="number"
              name="beds"
              value={formData.beds}
              onChange={handleChange}
              className="w-full bg-slate-50 border-b-2 border-slate-200 py-3 outline-none focus:border-black transition-all font-bold"
            />
          </div>
          <div>
            <label className="block text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2">Baths</label>
            <input
              type="number"
              name="baths"
              value={formData.baths}
              onChange={handleChange}
              className="w-full bg-slate-50 border-b-2 border-slate-200 py-3 outline-none focus:border-black transition-all font-bold"
            />
          </div>
          <div>
            <label className="block text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2">SQFT</label>
            <input
              type="number"
              name="sqft"
              value={formData.sqft}
              onChange={handleChange}
              className="w-full bg-slate-50 border-b-2 border-slate-200 py-3 outline-none focus:border-black transition-all font-bold"
            />
          </div>
        </div>

        <div>
          <label className="block text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2">Description</label>
          <textarea
            required
            name="description"
            rows={5}
            value={formData.description}
            onChange={handleChange}
            className="w-full bg-slate-50 border-b-2 border-slate-200 py-3 outline-none focus:border-black transition-all font-bold resize-none"
          ></textarea>
        </div>

        <div>
          <label className="block text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2">Main Image URL</label>
          <input
            name="image"
            value={formData.image}
            onChange={handleChange}
            placeholder="e.g. assets/Available-properties/Bolton/2.jpeg"
            className="w-full bg-slate-50 border-b-2 border-slate-200 py-3 outline-none focus:border-black transition-all font-bold"
          />
        </div>

        <div>
          <label className="block text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2">Gallery URLs (Comma separated)</label>
          <textarea
            rows={3}
            value={formData.images.join(', ')}
            onChange={(e) => handleListChange('images', e.target.value)}
            placeholder="url1, url2, url3"
            className="w-full bg-slate-50 border-b-2 border-slate-200 py-3 outline-none focus:border-black transition-all font-bold resize-none"
          ></textarea>
        </div>

        <button
          disabled={isSubmitting}
          className="w-full bg-black text-white font-black py-6 rounded-none hover:bg-slate-800 transition-all shadow-xl uppercase tracking-[0.3em] text-xs disabled:opacity-50"
        >
          {isSubmitting ? 'Processing SRP Asset...' : 'Save Property Listing'}
        </button>
      </form>
    </div>
  );
};

export default PropertyForm;
