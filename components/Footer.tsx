
import React from 'react';
import { Link } from 'react-router-dom';

const Footer: React.FC = () => {
  return (
    <footer className="bg-black text-slate-400 pt-20 pb-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-16 mb-20">
          <div className="col-span-1 md:col-span-1">
            <Link to="/">
                <img
                src="/assets/logo/SRP-white.png"
                alt="SRP Logo"
                className="h-auto w-auto mb-10"
                />
            </Link>
            <p className="text-sm leading-loose mb-10 font-medium">
              Stunning Realty Partners (SRP) is an elite brokerage and network platform. We empower professionals through a robust platform for growth, referrals, and high-profile property facilitation across prime global locations.
            </p>
            <div className="flex space-x-8">
              <a href="https://www.facebook.com/profile.php?id=61563639226196&__tn__=%2Cd" className="hover:text-white transition-colors text-lg"><i className="fab fa-facebook-f"></i></a>
              <a href="https://www.instagram.com/stunningrealty?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==" className="hover:text-white transition-colors text-lg"><i className="fab fa-instagram"></i></a>
              <a href="#" className="hover:text-white transition-colors text-lg"><i className="fab fa-linkedin-in"></i></a>
            </div>
          </div>
          
          <div>
            <h3 className="text-white font-black uppercase tracking-[0.4em] text-[10px] mb-10">Network Hub</h3>
            <ul className="space-y-5 text-[10px] font-black uppercase tracking-[0.2em]">
              <li><Link to="/" className="hover:text-white transition-colors">Home</Link></li>
              <li><Link to="/listings" className="hover:text-white transition-colors">Premium Portfolio</Link></li>
              <li><Link to="/services" className="hover:text-white transition-colors">Partner Benefits</Link></li>
              <li><Link to="/about" className="hover:text-white transition-colors">About the Network</Link></li>
              <li><Link to="/contact" className="hover:text-white transition-colors">Contact Desk</Link></li>
            </ul>
          </div>


          <div>
            <h3 className="text-white font-black uppercase tracking-[0.4em] text-[10px] mb-10">Our Reach</h3>
            <ul className="space-y-5 text-[10px] font-black uppercase tracking-[0.2em]">
              <li className="flex items-start">
                <i className="fas fa-map-marker-alt mt-1 mr-4 text-white"></i>
                <span className="leading-relaxed">Suite D249<br />Rd 2, Ikota Complex, VGC, Lagos.</span>
              </li>
              <li className="flex items-center">
                <i className="fas fa-phone mr-4 text-white"></i>
                <span>+234 906 777 9081</span>
              </li>
              <li className="flex items-center">
                <i className="fas fa-envelope mr-4 text-white"></i>
                <span>stunningrealty@gmail.com</span>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-white font-black uppercase tracking-[0.4em] text-[10px] mb-10">Partner Access</h3>
            <div className="bg-slate-900 p-8 border-l-4 border-white">
              <p className="text-[10px] text-slate-300 font-bold mb-6 leading-loose">Interested in joining the elite brokerage circle?</p>
              <Link to="/contact" className="text-white font-black uppercase tracking-widest text-[10px] border-b-2 border-white pb-1 hover:text-slate-400 hover:border-slate-400 transition-all">
                Apply Today
              </Link>
            </div>
          </div>
        </div>
        
        <div className="border-t border-slate-800 pt-10 flex flex-col md:flex-row justify-between items-center text-[10px] uppercase tracking-[0.2em] font-bold">
          <p>&copy; 2024 Stunning Realty Partners. All rights reserved.</p>
          <div className="flex space-x-8 mt-6 md:mt-0">
            <a href="#" className="hover:text-white">Privacy</a>
            <a href="#" className="hover:text-white">Terms</a>
            <a href="#" className="hover:text-white">Compliance</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
