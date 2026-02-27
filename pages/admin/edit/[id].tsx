import React, { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/router';
import { supabase } from '../../../services/supabaseClient';
import PropertyForm from '../../../components/PropertyForm';
import { Property } from '../../../types';

const EditProperty: React.FC = () => {
  const [property, setProperty] = useState<Property | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();
  const { id } = router.query;

  const fetchProperty = useCallback(async () => {
    const { data, error } = await supabase
      .from('properties')
      .select('*')
      .eq('id', id)
      .single();

    if (!error && data) {
      const camel: Property = {
        id: data.id,
        title: data.title,
        price: data.price,
        location: data.location,
        beds: data.beds ?? 0,
        baths: data.baths ?? 0,
        sqft: data.sqft ?? 0,
        sqmPrice: data.sqm_price ?? undefined,
        image: data.image || '',
        images: data.images || [],
        description: data.description || '',
        type: data.type,
        status: data.status,
        featured: data.featured ?? false,
        createdAt: data.created_at,
        created_at: data.created_at,
        titleType: data.title_type || '',
        landmarks: data.landmarks || [],
        amenities: data.amenities || [],
        units: data.units || [],
        paymentPlans: data.payment_plans || [],
        investmentInsights: data.investment_insights || {}
      };
      setProperty(camel);
    } else {
      alert('Error fetching property data');
      router.push('/admin');
    }
  }, [id, router]);

  useEffect(() => {
    if (id) {
      fetchProperty();
    }
  }, [id, fetchProperty]);

  const handleSubmit = async (formData: Partial<Property>) => {
    setIsSubmitting(true);
    const updateData = {
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
      .update(updateData)
      .eq('id', id);

    if (!error) {
      try {
        const { data: favUsers, error: favErr } = await supabase
          .from('profiles')
          .select('email,name,favorites')
          .contains('favorites', [id]);

        if (!favErr && favUsers && favUsers.length > 0) {
          await fetch('/api/notify-favorites', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              propertyId: id,
              propertyTitle: formData.title,
              recipients: favUsers.map(u => ({ email: u.email, name: u.name }))
            })
          });
        }
      } catch {
        // best-effort notification
      }
      router.push('/admin');
    } else {
      alert('Error updating property: ' + error.message);
      setIsSubmitting(false);
    }
  };

  if (!property) return <div className="pt-40 text-center">Loading Asset Data...</div>;

  return (
    <div className="pt-32 pb-20 bg-slate-50 min-h-screen">
      <PropertyForm
        title={`Edit Asset: ${property.title}`}
        initialData={property}
        onSubmit={handleSubmit}
        onCancel={() => router.push('/admin')}
        isSubmitting={isSubmitting}
      />
    </div>
  );
};

export default EditProperty;
