import React from 'react';
import { MessageCircle } from 'lucide-react';
import { motion } from 'motion/react';

export default function WhatsAppButton() {
  const whatsappUrl = "https://wa.me/35699444044?text=Hello%20Beauty%20Zone%20Gozo%2C%20I%20would%20like%20to%20inquire%20about%20a%20treatment.";

  return (
    <div className="fixed bottom-6 right-6 z-40 group flex items-center">
      {/* Tooltip text (slides out on hover) */}
      <span className="mr-3 bg-[#1A1A1A] text-white text-[10px] font-bold tracking-widest uppercase py-2 px-4 rounded-xl shadow-lg opacity-0 pointer-events-none group-hover:opacity-100 transition-opacity duration-300 font-sans border border-white/10 hidden sm:inline-block">
        Chat with us
      </span>

      {/* Styled pulsing ring behind button */}
      <div className="relative">
        <span className="absolute -inset-1 rounded-full bg-emerald-500/20 blur-sm animate-ping duration-1000" />
        <span className="absolute -inset-2 rounded-full bg-emerald-500/10 blur-md animate-pulse duration-2000" />
        
        <motion.a
          href={whatsappUrl}
          target="_blank"
          rel="noreferrer"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className="relative flex items-center justify-center w-14 h-14 bg-emerald-600 hover:bg-emerald-500 text-white rounded-full shadow-xl transition-colors cursor-pointer border border-emerald-400/20"
          title="Chat with Beauty Zone Gozo on WhatsApp"
        >
          {/* Main icon */}
          <MessageCircle className="w-7 h-7 fill-white/10" />
        </motion.a>
      </div>
    </div>
  );
}
