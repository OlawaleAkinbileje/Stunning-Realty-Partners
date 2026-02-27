import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { supabase } from '../../../../services/supabaseClient';
import { useAuth } from '../../../../context/AuthContext';
import Icon from '../../../../components/Icon';

const EditBlogPost: React.FC = () => {
  const router = useRouter();
  const { id } = router.query as { id: string };
  const { currentUser } = useAuth();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [form, setForm] = useState({
    title: '',
    excerpt: '',
    content: '',
    image: '',
    category: '',
    date: ''
  });

  useEffect(() => {
    if (!currentUser || currentUser.status !== 'active') {
      router.push('/');
      return;
    }
    if (id) loadPost();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id, currentUser]);

  const loadPost = async () => {
    const { data, error } = await supabase.from('blog_posts').select('*').eq('id', id).single();
    if (!error && data) {
      setForm({
        title: data.title || '',
        excerpt: data.excerpt || '',
        content: data.content || '',
        image: data.image || '',
        category: data.category || '',
        date: data.date || ''
      });
    } else {
      alert('Unable to load post');
      router.push('/admin/blog');
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (!['image/jpeg', 'image/png'].includes(file.type)) {
      alert('Image must be JPEG or PNG.');
      return;
    }
    try {
      const ext = file.name.split('.').pop();
      const fileName = `${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`;
      const filePath = `blog/${fileName}`;
      const { error } = await supabase.storage.from('posts').upload(filePath, file);
      if (error) throw error;
      const { data: { publicUrl } } = supabase.storage.from('posts').getPublicUrl(filePath);
      setForm({ ...form, image: publicUrl });
    } catch (err) {
      console.error(err);
      alert('Upload failed. Ensure a "posts" bucket exists with public read.');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    const payload = {
      title: form.title,
      excerpt: form.excerpt,
      content: form.content,
      image: form.image || null,
      category: form.category || null,
      date: form.date || null
    };
    const { error } = await supabase.from('blog_posts').update(payload).eq('id', id);
    if (!error) {
      router.push('/admin/blog');
    } else {
      alert('Error updating post: ' + error.message);
      setIsSubmitting(false);
    }
  };

  return (
    <div className="pt-24 pb-20 bg-slate-50 min-h-screen">
      <div className="max-w-3xl mx-auto bg-white shadow-2xl p-10 md:p-14 border-t-8 border-black">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold serif">Edit Blog Post</h1>
          <button onClick={() => router.push('/admin/blog')} className="text-[10px] font-black uppercase tracking-widest text-slate-400 hover:text-black transition-all">
            Cancel
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          <div>
            <label className="block text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2">Title</label>
            <input name="title" value={form.title} onChange={handleChange} className="w-full bg-slate-50 border-b-2 border-slate-200 py-3 outline-none focus:border-black font-bold" required />
          </div>
          <div>
            <label className="block text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2">Excerpt</label>
            <textarea name="excerpt" rows={3} value={form.excerpt} onChange={handleChange} className="w-full bg-slate-50 border-b-2 border-sate-200 py-3 outline-none focus:border-black font-bold" required />
          </div>
          <div>
            <label className="block text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2">Content</label>
            <textarea name="content" rows={10} value={form.content} onChange={handleChange} className="w-full bg-slate-50 border-b-2 border-slate-200 py-3 outline-none focus:border-black font-bold" required />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <label className="block text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2">Category</label>
              <input name="category" value={form.category} onChange={handleChange} className="w-full bg-slate-50 border-b-2 border-slate-200 py-3 outline-none focus:border-black font-bold" />
            </div>
            <div>
              <label className="block text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2">Date</label>
              <input name="date" value={form.date} onChange={handleChange} className="w-full bg-slate-50 border-b-2 border-slate-200 py-3 outline-none focus:border-black font-bold" />
            </div>
          </div>
          <div>
            <label className="block text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2">Hero Image URL</label>
            <div className="flex gap-4">
              <input name="image" value={form.image} onChange={handleChange} className="flex-1 bg-slate-50 border-b-2 border-slate-200 py-3 outline-none focus:border-black font-bold" />
              <label className="flex items-center justify-center gap-2 bg-slate-100 hover:bg-slate-200 text-slate-600 px-6 py-3 cursor-pointer transition-all border-2 border-dashed border-slate-300">
                <Icon name="image" className="text-xl" />
                <span className="text-[10px] font-black uppercase tracking-widest">Upload</span>
                <input type="file" accept="image/jpeg,image/png" onChange={handleImageUpload} className="hidden" />
              </label>
            </div>
          </div>
          <button disabled={isSubmitting} className="w-full bg-black text-white font-black py-6 rounded-none hover:bg-slate-800 transition-all uppercase tracking-[0.3em] text-xs disabled:opacity-50">
            {isSubmitting ? 'Saving...' : 'Save Changes'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditBlogPost;
