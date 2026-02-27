import React, { useState } from 'react';
import { Property } from '../types';
import { supabase } from '../services/supabaseClient';
import Icon from './Icon';

interface PropertyFormProps {
  initialData?: Partial<Property>;
  onSubmit: (data: Partial<Property>) => Promise<void>;
  onCancel?: () => void;
  isSubmitting: boolean;
  title: string;
}

const PropertyForm: React.FC<PropertyFormProps> = ({ initialData, onSubmit, onCancel, isSubmitting, title }) => {
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
      [name]: value.split(',').map(s => s.trim()).filter(s => s !== '')
    });
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (!['image/jpeg', 'image/png'].includes(file.type)) {
      alert('Main image must be JPEG or PNG.');
      return;
    }

    try {
      const ext = file.name.split('.').pop();
      const fileName = `${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`;
      const filePath = `property-images/${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from('properties')
        .upload(filePath, file);

      if (uploadError) throw uploadError;

      const { data: { publicUrl } } = supabase.storage
        .from('properties')
        .getPublicUrl(filePath);

      setFormData({ ...formData, image: publicUrl });
      alert('Image uploaded successfully!');
    } catch (error) {
      console.error('Error uploading image:', error);
      alert('Error uploading image. Make sure you have created a "properties" bucket in Supabase storage with public access.');
    }
  };

  const handleGalleryUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    const allowed = ['image/jpeg', 'image/png', 'video/mp4', 'video/webm'];
    const uploadedUrls: string[] = [];

    try {
      for (const file of Array.from(files)) {
        if (!allowed.includes(file.type)) {
          continue;
        }
        const ext = file.name.split('.').pop();
        const fileName = `${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`;
        const filePath = `property-media/${fileName}`;
        const { error: uploadError } = await supabase.storage
          .from('properties')
          .upload(filePath, file);
        if (uploadError) throw uploadError;
        const { data: { publicUrl } } = supabase.storage
          .from('properties')
          .getPublicUrl(filePath);
        uploadedUrls.push(publicUrl);
      }
      const existing = Array.isArray(formData.images) ? formData.images : [];
      setFormData({ ...formData, images: [...existing, ...uploadedUrls] });
      alert('Gallery files uploaded successfully!');
    } catch (error) {
      console.error('Error uploading gallery:', error);
      alert('Error uploading gallery files. Ensure the "properties" bucket allows uploads.');
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <div className="max-w-4xl mx-auto bg-white shadow-2xl p-10 md:p-16 border-t-8 border-black relative">
      {onCancel && (
        <button
          onClick={onCancel}
          className="absolute top-6 right-6 text-slate-400 hover:text-black transition-all p-2"
          type="button"
        >
          <Icon name="times" className="text-xl" />
        </button>
      )}
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
          <label className="block text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2">Main Image</label>
          <div className="flex flex-col md:flex-row gap-4 items-start">
            <div className="flex-1 w-full">
              <input
                name="image"
                value={formData.image}
                onChange={handleChange}
                placeholder="Enter image URL or path"
                className="w-full bg-slate-50 border-b-2 border-slate-200 py-3 outline-none focus:border-black transition-all font-bold"
              />
            </div>
            <div className="w-full md:w-auto">
              <label className="flex items-center justify-center gap-2 bg-slate-100 hover:bg-slate-200 text-slate-600 px-6 py-3 cursor-pointer transition-all border-2 border-dashed border-slate-300">
                <Icon name="image" className="text-xl" />
                <span className="text-[10px] font-black uppercase tracking-widest">Upload File</span>
                <input
                  type="file"
                  accept="image/jpeg,image/png"
                  onChange={handleImageUpload}
                  className="hidden"
                />
              </label>
            </div>
          </div>
          <p className="text-[10px] text-slate-400 mt-2 uppercase tracking-widest">JPEG or PNG only, or paste an image URL.</p>
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
          <div className="mt-4">
            <label className="flex items-center justify-center gap-2 bg-slate-100 hover:bg-slate-200 text-slate-600 px-6 py-3 cursor-pointer transition-all border-2 border-dashed border-slate-300 w-full md:w-auto">
              <Icon name="images" className="text-xl" />
              <span className="text-[10px] font-black uppercase tracking-widest">Upload Gallery</span>
              <input
                type="file"
                accept="image/jpeg,image/png,video/mp4,video/webm"
                multiple
                onChange={handleGalleryUpload}
                className="hidden"
              />
            </label>
            <p className="text-[10px] text-slate-400 mt-2 uppercase tracking-widest">Add JPEG, PNG, or MP4/WEBM videos.</p>
          </div>
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
