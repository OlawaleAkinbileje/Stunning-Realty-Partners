
import React, { useState } from 'react';
import Icon from '../components/Icon';

const Contact: React.FC = () => {
  const [formState, setFormState] = useState({ name: '', email: '', phone: '', message: '', interest: 'Join SRP Brokerage Network' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMessage(null);
    let success = false;

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formState)
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Network response was not ok');
      }

      // success
      success = true;
      setIsSubmitted(true);
      setFormState({ name: '', email: '', phone: '', message: '', interest: 'Join SRP Brokerage Network' });
    } catch (err: any) {
      console.error('Submission error', err);
      setErrorMessage(err.message || 'An unexpected error occurred. Please try again.');
    } finally {
      setIsSubmitting(false);
      if (success) {
        setTimeout(() => setIsSubmitted(false), 5000);
      }
    }
  };

  return (
    <div className="pt-20">
      {/* Header */}
      <section className="bg-slate-50 py-32 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-24">
            <div>
              <span className="text-black font-black uppercase tracking-[0.4em] text-xs mb-8 block">Connect With SRP</span>
              <h1 className="text-5xl md:text-6xl font-bold text-slate-900 mb-10 serif leading-tight">Elite Brokerage Support</h1>

              <div className="space-y-10 mb-16">
                <div className="flex gap-8 group">
                  <div className="w-16 h-16 bg-white rounded-none flex items-center justify-center text-black shadow-md border border-slate-100 flex-shrink-0 group-hover:bg-black group-hover:text-white transition-all">
                    <Icon name="map-marker-alt" className="text-xl" />
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900 text-lg mb-2">SRP International Hub</h4>
                    <p className="text-slate-500 text-sm leading-relaxed">Suite D249, Rd 2, Ikota Complex, VGC, Lagos.</p>
                  </div>
                </div>

                <div className="flex gap-8 group">
                  <div className="w-16 h-16 bg-white rounded-none flex items-center justify-center text-black shadow-md border border-slate-100 flex-shrink-0 group-hover:bg-black group-hover:text-white transition-all">
                    <Icon name="phone-alt" className="text-xl" />
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900 text-lg mb-2">Partner Hotline</h4>
                    <p className="text-slate-500 text-sm leading-relaxed">+234 906 777 9081 (Mon-Sun, 24/7 Global Support)</p>
                  </div>
                </div>

                <div className="flex gap-8 group">
                  <div className="w-16 h-16 bg-white rounded-none flex items-center justify-center text-black shadow-md border border-slate-100 flex-shrink-0 group-hover:bg-black group-hover:text-white transition-all">
                    <Icon name="envelope" className="text-xl" />
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900 text-lg mb-2">Network Inquiry</h4>
                    <p className="text-slate-500 text-sm leading-relaxed">stunningrealty@gmail.com</p>
                  </div>
                </div>
              </div>

              <div className="rounded-none overflow-hidden h-72 shadow-2xl border-4 border-white grayscale hover:grayscale-0 transition-all duration-700">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3964.478197592887!2d3.5544389757360078!3d6.4609376935306555!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x103bf73e6bd8b4e5%3A0x66fc3603b30e8d99!2sIkota%20Shopping%20Complex%2C%20Lekki%20-%20Epe%20Expy%2C%20Victoria%20garden%20City%2C%20Lekki%20101245%2C%20Lagos!5e0!3m2!1sen!2sng!4v1771405113461!5m2!1sen!2sng"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                >
                </iframe>
              </div>
            </div>

            <div className="bg-white p-12 md:p-16 rounded-none shadow-2xl border-t-8 border-black">
              {isSubmitted ? (
                <div className="h-full flex flex-col items-center justify-center text-center animate-in zoom-in-95 duration-300 py-20">
                  <div className="w-24 h-24 bg-slate-50 text-black rounded-full flex items-center justify-center text-4xl mb-10 border-2 border-black">
                    <Icon name="star" className="text-4xl" />
                  </div>
                  <h3 className="text-3xl font-bold text-slate-900 mb-6 serif">Partnership Requested</h3>
                  <p className="text-slate-500 leading-loose">An SRP regional director will review your profile and contact you shortly to discuss network opportunities.</p>
                  <button
                    onClick={() => setIsSubmitted(false)}
                    className="mt-12 text-black font-black uppercase tracking-widest text-xs hover:underline underline-offset-8"
                  >
                    Submit Another Inquiry
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-8">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="relative">
                      <label className="block text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 mb-3">Full Name</label>
                      <input
                        required
                        type="text"
                        value={formState.name}
                        onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                        className="w-full bg-slate-50 border-b-2 border-slate-200 px-0 py-4 focus:border-black outline-none transition-all font-bold"
                        placeholder="e.g. Alexandra Vance"
                      />
                    </div>
                    <div className="relative">
                      <label className="block text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 mb-3">Professional Email</label>
                      <input
                        required
                        type="email"
                        value={formState.email}
                        onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                        className="w-full bg-slate-50 border-b-2 border-slate-200 px-0 py-4 focus:border-black outline-none transition-all font-bold"
                        placeholder="vance@network.com"
                      />
                    </div>
                  </div>

                  <div className="relative">
                    <label className="block text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 mb-3">Interest Type</label>
                    <select
                      className="w-full bg-slate-50 border-b-2 border-slate-200 px-0 py-4 focus:border-black outline-none transition-all appearance-none font-bold"
                      value={formState.interest}
                      onChange={(e) => setFormState({ ...formState, interest: e.target.value })}
                    >
                      <option>Join SRP Brokerage Network</option>
                      <option>Premium Property Inquiry</option>
                      <option>Professional Training</option>
                      <option>Investment Advisory</option>
                      <option>Marketing Partnership</option>
                    </select>
                  </div>

                  <div className="relative">
                    <label className="block text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 mb-3">Professional Bio / Message</label>
                    <textarea
                      required
                      rows={5}
                      value={formState.message}
                      onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                      className="w-full bg-slate-50 border-b-2 border-slate-200 px-0 py-4 focus:border-black outline-none transition-all resize-none font-bold"
                      placeholder="Tell us about your real estate goals..."
                    ></textarea>
                  </div>

                  {errorMessage && (
                    <div className="p-4 bg-red-50 border-l-4 border-red-500 text-red-700 text-xs font-bold uppercase tracking-widest animate-in fade-in slide-in-from-top-2 duration-300">
                      <div className="flex items-center gap-3">
                        <Icon name="times" className="text-red-500" />
                        <span>{errorMessage}</span>
                      </div>
                    </div>
                  )}

                  <button disabled={isSubmitting} className="w-full bg-black text-white font-black py-6 rounded-none hover:bg-slate-800 transition-all shadow-xl uppercase tracking-[0.3em] text-xs disabled:opacity-50 disabled:cursor-not-allowed">
                    {isSubmitting ? 'Sending...' : 'Inquire for Membership'}
                  </button>
                  <p className="text-[9px] font-bold uppercase tracking-widest text-slate-400 text-center leading-loose">
                    By submitting, you consent to SRP&apos;s background checks and network compliance protocols.
                  </p>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Global Presence */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-slate-900 mb-16 text-center serif">SRP Global Reach</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
            {['Ondo State', 'Ogun State', 'Port-Harcourt', 'Redemption City'].map((city, idx) => (
              <div key={idx} className="p-10 border border-slate-100 hover:border-black transition-all bg-slate-50 rounded-none group">
                <h4 className="font-black text-slate-900 text-sm uppercase tracking-widest mb-4 group-hover:text-black">{city}</h4>
                <p className="text-xs text-slate-500 mb-6 leading-loose">Strategic Partner District<br />Network Tower, Level 80</p>
                <div className="h-1 w-10 bg-black"></div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;
