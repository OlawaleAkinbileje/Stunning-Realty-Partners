
import React from 'react';
import { Link } from 'react-router-dom';
import { BLOG_POSTS } from '../constants';

const Blog: React.FC = () => {
    return (
        <div className="pt-20 min-h-screen bg-slate-50">
            <section className="bg-black py-24 text-center text-white">
                <div className="max-w-4xl mx-auto px-4">
                    <h1 className="text-4xl md:text-6xl font-bold serif mb-6">Network Insights</h1>
                    <p className="text-slate-400 uppercase tracking-[0.2em] text-xs font-bold">Lagos Real Estate Analysis & Member Updates</p>
                </div>
            </section>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
                    {BLOG_POSTS.map(post => (
                        <article key={post.id} className="bg-white group overflow-hidden border border-slate-100 shadow-sm hover:shadow-xl transition-all">
                            <Link to={`/blog/${post.id}`}>
                                <div className="h-64 overflow-hidden">
                                    <img src={post.image} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" alt={post.title} />
                                </div>
                            </Link>
                            <div className="p-8">
                                <div className="flex justify-between items-center mb-4">
                                    <span className="text-[10px] font-black uppercase tracking-widest text-blue-600 bg-blue-50 px-2 py-1">{post.category}</span>
                                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{post.date}</span>
                                </div>
                                <Link to={`/blog/${post.id}`}>
                                    <h3 className="text-xl font-bold text-slate-900 mb-4 serif group-hover:text-blue-600 transition-colors line-clamp-2">{post.title}</h3>
                                </Link>
                                <p className="text-slate-500 text-sm leading-relaxed mb-6 line-clamp-3">{post.excerpt}</p>
                                <Link
                                    to={`/blog/${post.id}`}
                                    className="text-black font-black uppercase tracking-widest text-[10px] border-b-2 border-black pb-1 hover:text-blue-600 hover:border-blue-600 transition-all inline-block"
                                >
                                    Read Full Article
                                </Link>
                            </div>
                        </article>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Blog;
