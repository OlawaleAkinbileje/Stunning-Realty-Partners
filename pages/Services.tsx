
import React from 'react';
import Icon from '../components/Icon';
import Image from 'next/image';
import Link from 'next/link';

const Services: React.FC = () => {
  const benefits = [
    { title: 'Commissions & Incentives', text: 'Competitive structures for meeting and exceeding sales targets.', icon: 'fa-dollar-sign' },
    { title: 'Mentorship & Coaching', text: 'One-on-one guidance from established industry experts.', icon: 'fa-user-graduate' },
    { title: 'Increased Exposure', text: 'Global visibility through the SRP platform and marketing channels.', icon: 'fa-eye' },
    { title: 'Exclusive Listings', text: 'Access to high-profile properties unavailable on the open market.', icon: 'fa-gem' },
    { title: 'Professional Growth', text: 'Clear pathways for development from apprentice to lead partner.', icon: 'fa-chart-line' },
    { title: 'Elite Networking', text: 'Collaboration opportunities with top-tier like-minded professionals.', icon: 'fa-handshake' }
  ];

  return (
    <div className="pt-20">
      {/* Header */}
      <section className="bg-white py-32 border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row gap-20 items-center">
            <div className="lg:w-1/2">
              <span className="text-black font-black uppercase tracking-[0.4em] text-xs mb-6 block underline decoration-slate-300 underline-offset-8">SRP Member Perks</span>
              <h1 className="text-5xl md:text-6xl font-bold text-slate-900 mb-8 serif leading-tight">Elevate Your Career with SRP</h1>
              <p className="text-lg text-slate-600 leading-loose mb-10">
                Joining the Stunning Realty Partners network means more than just having a desk. It means having a global platform, a support system, and access to the world&apos;s most stunning properties.
              </p>
              <Link href="/auth" className="bg-black p-1 rounded-none inline-block shadow-2xl">
                <span className="bg-black text-white px-10 py-5 font-black text-xs uppercase tracking-widest hover:bg-slate-800 transition-all inline-block">
                  Apply for Membership
                </span>
              </Link>
            </div>
            <div className="lg:w-1/2 relative">
              <Image
                src="https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=1200"
                alt="Collaborative workspace"
                width={1200}
                height={800}
                className="rounded-3xl shadow-2xl grayscale"
              />
              <div className="absolute -top-10 -right-10 w-40 h-40 bg-slate-50 rounded-full border border-slate-200 flex items-center justify-center text-center p-4">
                <p className="text-[10px] font-black uppercase tracking-widest text-slate-900">Premium Network Access</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Grid */}
      <section className="py-32 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <h2 className="text-4xl font-bold text-slate-900 serif mb-4">Member Benefits</h2>
            <p className="text-slate-500">Comprehensive support designed for competitive markets.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
            {benefits.map((benefit, idx) => (
              <div key={idx} className="bg-white p-12 rounded-none border-b-4 border-black shadow-sm hover:shadow-xl transition-all group">
                <div className="w-14 h-14 bg-slate-50 rounded-xl flex items-center justify-center text-black text-2xl mb-8 group-hover:bg-black group-hover:text-white transition-all">
                  <Icon name={benefit.icon.replace('fa-', '')} className="text-2xl" />
                </div>
                <h3 className="text-2xl font-bold text-slate-900 mb-4">{benefit.title}</h3>
                <p className="text-slate-500 leading-relaxed text-sm font-medium">{benefit.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Resource Section */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-black text-white p-16 md:p-24 rounded-none flex flex-col md:flex-row items-center justify-between gap-12 shadow-2xl">
            <div className="max-w-xl">
              <h2 className="text-4xl font-bold serif mb-6">Start Your SRP Journey</h2>
              <p className="text-slate-400 leading-relaxed">
                Whether you are a professional interested in self-employment or an employee seeking extra income, our platform offers the strategic partnerships you need to thrive.
              </p>
            </div>
            <div className="flex-shrink-0">
              <Link href="/contact" className="bg-white text-black px-12 py-6 font-black text-xs uppercase tracking-widest hover:bg-slate-100 transition-all shadow-lg inline-block">
                Talk to a Mentor
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Services;
