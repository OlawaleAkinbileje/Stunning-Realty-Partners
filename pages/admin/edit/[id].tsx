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
      setProperty(data);
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
    // Remove id and createdAt from update data to avoid Supabase errors
    const updateData = { ...formData };
    delete updateData.id;
    delete updateData.createdAt;
    delete updateData.created_at;

    const { error } = await supabase
      .from('properties')
      .update(updateData)
      .eq('id', id);

    if (!error) {
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
