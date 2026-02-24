import React from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import Icon from '../../components/Icon';
import { BLOG_POSTS } from '../../constants';
import Image from 'next/image';

const BlogPostPage: React.FC = () => {
    const router = useRouter();
    const { id } = router.query as { id: string };
    const post = BLOG_POSTS.find(p => p.id === id);

    if (!post) {
        return <div className="pt-40 text-center">Post Not Found</div>;
    }

    return (
        <div className="pt-20 bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
                <nav className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-slate-400">
                    <Link href="/" className="hover:text-black">Home</Link>
                    <span className="mx-1">/</span>
                    <Link href="/blog" className="inline-flex items-center gap-2 hover:text-black">
                        <Icon name="gem" className="text-xs" />
                        <span>Blog</span>
                    </Link>
                    <span className="mx-1">/</span>
                    <span className="text-black">{post.title}</span>
                </nav>
            </div>

            <section className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
                {post.image && (
                    <div className="w-full h-80 relative mb-8">
                        <Image
                            src={post.image}
                            alt={post.title}
                            fill
                            className="object-cover rounded-xl"
                        />
                    </div>
                )}
                <h1 className="text-4xl font-bold serif mb-4">{post.title}</h1>
                <p className="text-sm text-slate-500 mb-6">
                    <span>{post.date}</span> • <span>{post.category}</span>
                </p>
                <div className="prose prose-lg text-slate-700" dangerouslySetInnerHTML={{ __html: post.content.replace(/\n/g, '<br/>') }} />
            </section>
        </div>
    );
};

export default BlogPostPage;
