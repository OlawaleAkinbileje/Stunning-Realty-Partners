
import React from 'react';
import Icon from '../components/Icon';
import { useParams, Link } from 'react-router-dom';
import { BLOG_POSTS } from '../constants';

const BlogDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const post = BLOG_POSTS.find(p => p.id === id);

  if (!post) {
    return (
      <div className="pt-40 text-center pb-20">
        <h2 className="text-2xl font-bold mb-4 serif text-slate-900">Article not found</h2>
        <Link to="/blog" className="text-black font-black uppercase tracking-widest text-[10px] border-b-2 border-black pb-1">Return to Blog</Link>
      </div>
    );
  }

  // Find related posts (excluding current)
  const relatedPosts = BLOG_POSTS.filter(p => p.id !== post.id).slice(0, 2);

  return (
    <div className="pt-20 bg-white min-h-screen">
      {/* Header Info */}
      <header className="py-20 bg-slate-50 border-b border-slate-100">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <Link to="/blog" className="inline-flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-slate-400 hover:text-black mb-10 transition-colors">
            <Icon name="long-arrow-alt-left" className="" /> Back to Insights
          </Link>
          <div className="flex justify-center items-center gap-4 mb-8">
            <span className="text-[10px] font-black uppercase tracking-widest text-blue-600 bg-blue-50 px-4 py-1.5">{post.category}</span>
            <span className="w-1 h-1 bg-slate-300 rounded-full"></span>
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{post.date}</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-bold text-slate-900 serif leading-tight mb-8">
            {post.title}
          </h1>
        </div>
      </header>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-4 py-16">
        <div className="mb-16 shadow-2xl overflow-hidden grayscale hover:grayscale-0 transition-all duration-700 aspect-video">
          <img src={post.image} className="w-full h-full object-cover" alt={post.title} />
        </div>

        <article className="prose prose-slate lg:prose-xl mx-auto">
          <p className="text-xl font-medium text-slate-700 leading-relaxed mb-10 italic border-l-4 border-black pl-8">
            {post.excerpt}
          </p>

          <div className="text-slate-600 leading-loose text-lg space-y-8 font-normal">
            {post.content.split('\n').map((para, i) => (
              para ? <p key={i}>{para}</p> : <br key={i} />
            ))}

            <h2 className="text-3xl font-bold text-slate-900 serif mt-16 mb-8">Strategic Implications for 2025</h2>
            <p>
              As we navigate the current fiscal year, the data indicates a clear shift toward high-utility, secure residential complexes. For SRP network partners, this represents a significant window for referral commissions and high-profile asset facilitation.
            </p>

            <blockquote className="bg-slate-50 p-10 border-t-8 border-black text-slate-900 font-bold italic text-2xl serif leading-relaxed">
              "The Lagos real estate landscape is no longer just about location; it's about integrated lifestyle ecosystems that provide sustainable value."
            </blockquote>

            <p>
              By aligning with project development timelines, members can secure off-plan advantages that traditional buyers often miss. At Stunning Realty Partners, we provide the tools to interpret these market shifts and translate them into growth.
            </p>
          </div>
        </article>

        <div className="mt-20 pt-16 border-t border-slate-100">
          <div className="bg-black text-white p-12 flex flex-col md:flex-row items-center justify-between gap-10">
            <div>
              <h3 className="text-2xl font-bold serif mb-2">Grow with the SRP Network</h3>
              <p className="text-slate-400 text-sm">Join the elite platform driving these market trends.</p>
            </div>
            <Link to="/contact" className="bg-white text-black px-10 py-5 font-black text-[10px] uppercase tracking-widest hover:bg-slate-100 transition-all flex-shrink-0">
              Apply for Membership
            </Link>
          </div>
        </div>
      </div>

      {/* Related Posts */}
      {relatedPosts.length > 0 && (
        <section className="bg-slate-50 py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h3 className="text-2xl font-bold text-slate-900 serif mb-12 text-center">Continue Reading</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
              {relatedPosts.map(rp => (
                <Link key={rp.id} to={`/blog/${rp.id}`} className="group bg-white overflow-hidden shadow-sm hover:shadow-xl transition-all flex h-48">
                  <div className="w-1/3 h-full overflow-hidden">
                    <img src={rp.image} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" alt={rp.title} />
                  </div>
                  <div className="w-2/3 p-6 flex flex-col justify-center">
                    <span className="text-[10px] font-black uppercase tracking-widest text-blue-600 mb-2">{rp.category}</span>
                    <h4 className="text-lg font-bold mb-2 group-hover:text-blue-600 transition-colors line-clamp-2">{rp.title}</h4>
                    <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">{rp.date}</span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
};

export default BlogDetail;
