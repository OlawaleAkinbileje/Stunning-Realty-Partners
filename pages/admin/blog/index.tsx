import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useAuth } from '../../../context/AuthContext';
import { supabase } from '../../../services/supabaseClient';
import Icon from '../../../components/Icon';
import Image from 'next/image';

interface BlogRow {
  id: string;
  title: string;
  excerpt: string;
  image: string | null;
  category: string | null;
  date: string | null;
  status: string | null;
  created_at?: string;
}

const BlogAdminList: React.FC = () => {
  const { currentUser, isLoading } = useAuth();
  const [posts, setPosts] = useState<BlogRow[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!isLoading) {
      if (!currentUser || currentUser.status !== 'active') {
        window.location.href = '/';
        return;
      }
      fetchPosts();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentUser, isLoading]);

  const fetchPosts = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('blog_posts')
      .select('*')
      .order('created_at', { ascending: false });
    if (!error && data) setPosts(data as BlogRow[]);
    setLoading(false);
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Delete this post?')) return;
    const { error } = await supabase.from('blog_posts').delete().eq('id', id);
    if (!error) {
      setPosts(posts.filter(p => p.id !== id));
    } else {
      alert('Error deleting post: ' + error.message);
    }
  };

  if (loading) return <div className="pt-40 text-center">Loading Blog...</div>;

  return (
    <div className="pt-24 min-h-screen bg-slate-50 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center mb-12">
          <div>
            <h1 className="text-4xl font-bold text-slate-900 serif">Manage Blog Posts</h1>
            <p className="text-slate-500 mt-2 text-sm">Active members can create and edit posts.</p>
          </div>
          <div className="flex gap-4">
            <Link
              href="/admin/blog/new"
              className="bg-black text-white px-8 py-4 font-black text-xs uppercase tracking-widest hover:bg-slate-800 transition-all shadow-xl"
            >
              New Post
            </Link>
          </div>
        </div>

        <div className="bg-white shadow-2xl overflow-hidden border border-slate-200">
          <table className="w-full text-left">
            <thead className="bg-slate-900 text-white text-[10px] uppercase tracking-widest font-black">
              <tr>
                <th className="px-8 py-6">Post</th>
                <th className="px-8 py-6">Category</th>
                <th className="px-8 py-6">Date</th>
                <th className="px-8 py-6 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {posts.map(post => (
                <tr key={post.id} className="hover:bg-slate-50 transition-colors">
                  <td className="px-8 py-6">
                    <div className="flex items-center gap-4">
                      <div className="w-16 h-16 relative bg-slate-100 flex-shrink-0">
                        {post.image ? (
                          <Image
                            src={post.image}
                            alt={post.title}
                            fill
                            sizes="64px"
                            className="object-cover"
                          />
                        ) : (
                          <div className="w-full h-full bg-slate-100" />
                        )}
                      </div>
                      <div>
                        <p className="font-bold text-slate-900">{post.title}</p>
                        <p className="text-xs text-slate-400 uppercase tracking-widest line-clamp-1">{post.excerpt}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-8 py-6">
                    <span className="text-[10px] font-black uppercase tracking-widest bg-slate-100 px-3 py-1 mr-2">{post.category || '-'}</span>
                  </td>
                  <td className="px-8 py-6 font-bold text-slate-900">{post.date || '-'}</td>
                  <td className="px-8 py-6 text-right">
                    <div className="flex justify-end gap-3">
                      <Link
                        href={`/admin/blog/edit/${post.id}`}
                        className="w-10 h-10 rounded-full flex items-center justify-center text-slate-400 hover:text-black hover:bg-slate-100 transition-all"
                      >
                        <Icon name="edit" className="text-sm" />
                      </Link>
                      <button
                        onClick={() => handleDelete(post.id)}
                        className="w-10 h-10 rounded-full flex items-center justify-center text-slate-400 hover:text-red-600 hover:bg-red-50 transition-all"
                      >
                        <Icon name="trash-alt" className="text-sm" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {posts.length === 0 && (
                <tr>
                  <td colSpan={4} className="px-8 py-20 text-center">
                    <p className="text-slate-400 uppercase tracking-widest font-bold text-xs">No posts yet</p>
                    <Link href="/admin/blog/new" className="text-blue-600 text-xs font-black uppercase tracking-widest mt-4 inline-block hover:underline">Create your first post</Link>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default BlogAdminList;
