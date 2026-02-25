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
    const { error } = await supabase
      .from('properties')
      .insert([formData]);

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
