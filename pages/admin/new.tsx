import React, { useState } from 'react';
import { useRouter } from 'next/router';
import { supabase } from '../../services/supabaseClient';
import PropertyForm from '../../components/PropertyForm';
import { Property } from '../../types';

const NewProperty: React.FC = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();

  const handleSubmit = async (formData: Partial<Property>) => {
    setIsSubmitting(true);
    const payload = {
      title: formData.title,
      price: formData.price,
      location: formData.location,
      beds: formData.beds ?? 0,
      baths: formData.baths ?? 0,
      sqft: formData.sqft ?? 0,
      sqm_price: formData.sqmPrice ?? null,
      image: formData.image || null,
      images: formData.images || [],
      description: formData.description || '',
      type: formData.type,
      status: formData.status,
      featured: formData.featured ?? false,
      title_type: formData.titleType || null,
      landmarks: formData.landmarks || [],
      amenities: formData.amenities || [],
      units: formData.units || [],
      payment_plans: formData.paymentPlans || [],
      investment_insights: formData.investmentInsights || {}
    };
    const { error } = await supabase
      .from('properties')
      .insert([payload]);

    if (!error) {
      router.push('/admin');
    } else {
      alert('Error saving property: ' + error.message);
      setIsSubmitting(false);
    }
  };

  return (
    <div className="pt-32 pb-20 bg-slate-50 min-h-screen">
      <PropertyForm
        title="Add New Elite Asset"
        onSubmit={handleSubmit}
        onCancel={() => router.push('/admin')}
        isSubmitting={isSubmitting}
      />
    </div>
  );
};

export default NewProperty;
