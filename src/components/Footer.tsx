import React, { useState } from 'react';
import { Mail, Phone, MapPin, Check, Send, Globe, MessageSquarePlus } from 'lucide-react';
import { motion } from 'motion/react';

export default function Footer() {
  const [emailSub, setEmailSub] = useState('');
  const [userSuccess, setUserSuccess] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!emailSub.trim()) return;
    setUserSuccess(true);
    setEmailSub('');
    setTimeout(() => {
      setUserSuccess(false);
    }, 3000);
  };

  return (
    <footer id="contact" className="bg-[#F9F7F2] border-t border-[#1A1A1A]/10 pt-20 pb-12 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Upper grid columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 mb-16 items-start">
          
          {/* Logo & Description (column span 4) */}
          <div className="space-y-6 lg:col-span-4 text-left">
            <h4 className="text-2xl font-serif text-[#1A1A1A] uppercase tracking-[0.2em] font-light">
              Beauty Zone Gozo
            </h4>
            <p className="text-[#1A1A1A]/70 leading-relaxed font-sans text-xs sm:text-[13px]">
              An exquisite premium wellness destination in Gozo dedicated exclusively to high-performance laser, elite waxing, and clinical aesthetic skincare restoration. Discover your best, smoothest skin inside Ghajnsielem’s modern beauty sanctuary.
            </p>
            
            <div className="flex gap-4 pt-2">
              <a 
                href="https://instagram.com" 
                target="_blank" 
                rel="noreferrer"
                className="text-[9px] tracking-widest font-bold text-[#1A1A1A]/60 hover:text-[#C5A059] border-b border-[#1A1A1A]/20 pb-0.5 hover:border-[#C5A059] duration-300 text-left uppercase"
              >
                Instagram
              </a>
              <a 
                href="https://facebook.com" 
                target="_blank" 
                rel="noreferrer"
                className="text-[9px] tracking-widest font-bold text-[#1A1A1A]/60 hover:text-[#C5A059] border-b border-[#1A1A1A]/20 pb-0.5 hover:border-[#C5A059] duration-300 text-left uppercase"
              >
                Facebook
              </a>
            </div>
          </div>

          {/* Opening Hours (column span 3) */}
          <div className="space-y-6 lg:col-span-3 text-left">
            <h4 className="font-bold text-[10px] tracking-[0.25em] uppercase text-[#1A1A1A] font-sans">
              Opening Hours
            </h4>
            <ul className="text-xs text-[#1A1A1A]/70 space-y-3 font-sans">
              <li className="flex justify-between border-b border-[#1A1A1A]/5 pb-2">
                <span className="font-medium text-[#1A1A1A]/60">Monday - Friday</span> 
                <span className="text-[#1A1A1A] font-bold font-mono">09:00 - 19:00</span>
              </li>
              <li className="flex justify-between border-b border-[#1A1A1A]/5 pb-2">
                <span className="font-medium text-[#1A1A1A]/60">Saturday</span> 
                <span className="text-[#1A1A1A] font-bold font-mono">09:00 - 16:00</span>
              </li>
              <li className="flex justify-between border-b border-[#1A1A1A]/5 pb-2 text-stone-300">
                <span className="text-[#1A1A1A]/45">Sunday</span> 
                <span className="text-[#1A1A1A]/40 italic font-serif">CLOSED</span>
              </li>
            </ul>
          </div>

          {/* Contact coordinates (column span 3) */}
          <div className="space-y-6 lg:col-span-3 text-left">
            <h4 className="font-bold text-[10px] tracking-[0.25em] uppercase text-[#1A1A1A] font-sans">
              Coordinates
            </h4>
            <div className="text-xs text-[#1A1A1A]/70 space-y-4 leading-relaxed font-sans">
              <a 
                href="https://maps.google.com" 
                target="_blank" 
                rel="noreferrer"
                className="flex items-start space-x-2.5 text-[#1A1A1A]/80 hover:text-gold group duration-300"
              >
                <MapPin className="w-4 h-4 text-[#C5A059] flex-shrink-0 mt-0.5" />
                <span>
                  Garden street, Garden flats Ghajnsielem, GSM 1802, Malta
                </span>
              </a>

              <a 
                href="tel:+35699444044" 
                className="flex items-center space-x-2.5 text-[#1A1A1A]/80 hover:text-gold duration-300"
              >
                <Phone className="w-4 h-4 text-[#C5A059] flex-shrink-0" />
                <span>+356 9944 4044</span>
              </a>

              <a 
                href="https://wa.me/35699444044" 
                target="_blank" 
                rel="noreferrer" 
                className="flex items-center space-x-2.5 text-[#1A1A1A]/80 hover:text-gold duration-300 group"
              >
                <MessageSquarePlus className="w-4 h-4 text-emerald-600 flex-shrink-0 group-hover:scale-110 duration-200" />
                <span className="font-mono">WhatsApp: +356 9944 4044</span>
              </a>

              <a 
                href="mailto:zhanaxuereb@gmail.com" 
                className="flex items-center space-x-2.5 text-[#1A1A1A]/80 hover:text-gold duration-300"
              >
                <Mail className="w-4 h-4 text-[#C5A059] flex-shrink-0" />
                <span className="underline">zhanaxuereb@gmail.com</span>
              </a>
            </div>
          </div>

          {/* Interactive Newsletter (column span 2) */}
          <div className="space-y-4 lg:col-span-2 text-left">
            <h4 className="font-bold text-[10px] tracking-[0.25em] uppercase text-[#1A1A1A] font-sans">
              Sanctuary Letters
            </h4>
            <p className="text-[11px] text-[#1A1A1A]/60 font-serif italic leading-relaxed">
              Subscribe to receive private wellness offers and Gozo skincare guidelines.
            </p>

            <form onSubmit={handleSubscribe} className="space-y-2">
              <div className="relative">
                <input
                  type="email"
                  required
                  placeholder="name@email.com"
                  value={emailSub}
                  onChange={(e) => setEmailSub(e.target.value)}
                  className="w-full bg-white border border-[#1A1A1A]/10 rounded-lg pl-3 pr-8 py-2 text-[11px] text-[#1A1A1A] placeholder-[#1A1A1A]/30 focus:outline-hidden focus:border-gold transition-colors font-sans"
                />
                <button
                  type="submit"
                  className="absolute right-1 top-1 bottom-1 px-2.5 bg-[#1A1A1A] hover:bg-gold text-white rounded-md flex items-center justify-center transition-colors cursor-pointer"
                  title="Subscribe"
                >
                  {userSuccess ? <Check className="w-3 h-3 text-white" /> : <Send className="w-3 h-3 text-stone-200" />}
                </button>
              </div>
              {userSuccess && (
                <motion.span 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-[9px] font-bold text-[#C5A059] block mt-1 uppercase tracking-widest"
                >
                  ✓ Gracefully Subscribed!
                </motion.span>
              )}
            </form>
          </div>

        </div>

        {/* Bottom copyright segment */}
        <div className="pt-8 border-t border-[#1A1A1A]/10 text-center flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-[10px] text-[#1A1A1A]/50 tracking-[0.2em] uppercase font-sans">
            © {new Date().getFullYear()} Beauty Zone Gozo. Crafted for excellence.
          </p>
          <div className="flex space-x-4 text-[9px] tracking-widest text-[#1A1A1A]/50 font-bold font-sans">
            <a href="#" className="hover:text-gold uppercase">Privacy Policy</a>
            <span className="text-[#1A1A1A]/20">•</span>
            <a href="#" className="hover:text-gold uppercase">Terms of Service</a>
          </div>
        </div>

      </div>
    </footer>
  );
}
