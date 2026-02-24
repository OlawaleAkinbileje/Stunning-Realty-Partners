
import React from 'react';
import Icon from '../components/Icon';
import { TEAM } from '../constants';
import Image from 'next/image';

const About: React.FC = () => {
  const objectives = [
    { title: 'Facilitate Premium Transactions', text: 'Broker high-profile properties in prime locations using SRP network expertise.' },
    { title: 'Empower Members', text: 'Equip members with knowledge, tools, and support to succeed competitively.' },
    { title: 'Drive Business Growth', text: 'Support referrals, joint marketing, and strategic partnerships.' },
    { title: 'Enhance Professional Development', text: 'High-quality training and resources to upskill aspiring professionals.' },
    { title: 'Establish Strong Network', text: 'Platform for professionals to connect, share knowledge, and collaborate.' }
  ];

  return (
    <div className="pt-20">
      {/* Page Header */}
      <section className="bg-black py-32 text-center text-white">
        <div className="max-w-4xl mx-auto px-4">
          <div className="flex justify-center mb-6">
            <Icon name="star" className="text-4xl" />
          </div>
          <h1 className="text-5xl md:text-7xl font-bold mb-8 serif">Stunning Realty Partners</h1>
          <p className="text-lg text-slate-400 font-medium tracking-wide leading-relaxed uppercase ">
            Brokerage & Network Excellence
          </p>
        </div>
      </section>

      {/* Objectives Section */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <div>
              <span className="text-slate-400 font-black uppercase tracking-[0.3em] text-xs mb-6 block">Our Vision</span>
              <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-8 serif">Our Core Objectives</h2>
              <div className="space-y-8">
                {objectives.map((obj, idx) => (
                  <div key={idx} className="flex gap-6 group">
                    <div className="w-12 h-12 rounded-full border border-slate-200 flex items-center justify-center font-black text-slate-400 group-hover:bg-black group-hover:text-white group-hover:border-black transition-all flex-shrink-0">
                      0{idx + 1}
                    </div>
                    <div>
                      <h4 className="font-bold text-slate-900 text-lg mb-2">{obj.title}</h4>
                      <p className="text-slate-500 text-sm leading-relaxed">{obj.text}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="relative">
              <Image
                src="https://images.unsplash.com/photo-1570126128898-469f39d8d1f0?auto=format&fit=crop&q=80&w=1200"
                alt="Architecture"
                width={1200}
                height={800}
                className="rounded-3xl shadow-2xl grayscale hover:grayscale-0 transition-all duration-700"
              />
              <div className="absolute -bottom-10 -left-10 bg-black p-10 text-white rounded-3xl hidden md:block">
                <p className="text-4xl font-black mb-1">20+</p>
                <p className="text-[10px] uppercase tracking-[0.2em] font-bold text-slate-400">Years Experience</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Who Can Join Section */}
      <section className="py-24 bg-slate-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4 serif">Who Can Become a Member?</h2>
            <p className="text-slate-400 max-w-2xl mx-auto">We welcome individuals from diverse backgrounds looking to transform their career.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { icon: 'fa-briefcase', title: 'Income Seekers', text: 'Employees seeking extra income streams.' },
              { icon: 'fa-search-plus', title: 'Job Seekers', text: 'Individuals looking for new career opportunities.' },
              { icon: 'fa-user-tie', title: 'Freelancers', text: 'Professionals expanding their portfolio.' },
              { icon: 'fa-rocket', title: 'Self-Employed', text: 'Transitioning to successful self-employment.' }
            ].map((item, idx) => (
              <div key={idx} className="bg-slate-800/50 p-10 rounded-3xl border border-slate-700 hover:bg-slate-800 transition-all text-center">
                <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center text-black mx-auto mb-6 text-2xl">
                  <Icon name={item.icon.replace('fa-', '')} className="text-2xl" />
                </div>
                <h3 className="text-xl font-bold mb-4">{item.title}</h3>
                <p className="text-sm text-slate-400 leading-relaxed">{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Leadership Section */}
      <section className="py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <span className="text-slate-400 font-black uppercase tracking-[0.3em] text-xs mb-4 block">Our Experts</span>
            <h2 className="text-4xl font-bold text-slate-900 serif">SRP Leadership Team</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-16">
                {TEAM.map((member, idx) => (
              <div key={idx} className="group">
                <div className="relative overflow-hidden rounded-3xl aspect-[4/5] mb-8 grayscale hover:grayscale-0 transition-all duration-500 shadow-xl">
                  <Image
                    src={member.image}
                    alt={member.name}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                </div>
                <h3 className="text-2xl font-bold text-slate-900 mb-2">{member.name}</h3>
                <p className="text-black font-black text-[10px] uppercase tracking-widest mb-4">{member.role}</p>
                <p className="text-slate-500 text-sm leading-relaxed">{member.bio}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
