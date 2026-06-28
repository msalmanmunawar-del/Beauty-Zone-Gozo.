import React from 'react';
import { ShieldCheck, Snowflake, Users, Layers, Award } from 'lucide-react';
import { motion } from 'motion/react';

export default function Philosophy() {
  const values = [
    {
      icon: <Snowflake className="w-5 h-5 text-gold" />,
      title: "Painless ICE+ Cooling",
      desc: "Dual chill technology keeps treatments safe, cool, and exceptionally comfortable."
    },
    {
      icon: <Users className="w-5 h-5 text-gold" />,
      title: "Expert Licensed Therapists",
      desc: "Our professionals have years of advanced training in clinical aesthetics."
    },
    {
      icon: <Layers className="w-5 h-5 text-gold" />,
      title: "Customized Skin Protocols",
      desc: "We analyze skin types and Fitzpatrick scales to tailor safe, effective energy levels."
    }
  ];

  return (
    <section id="philosophy" className="py-24 bg-white px-6 border-b border-[#1A1A1A]/10 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
          
          {/* Column 1: Copy and Cards (7 cols in wider viewing) */}
          <div className="lg:col-span-7 space-y-8">
            <div className="space-y-4">
              <span className="text-[10px] uppercase font-bold tracking-[0.25em] text-[#C5A059] block">
                Philosophy
              </span>
              <h2 className="text-3xl md:text-5xl font-serif italic font-light tracking-tight text-[#1A1A1A] leading-tight">
                Redefining the Art of <br />
                <span className="not-italic font-normal text-[#1A1A1A]">Clinical Excellence.</span>
              </h2>
              <div className="h-[1px] w-16 bg-[#1A1A1A] flex-shrink-0 my-4" />
            </div>

            <p className="text-[#1A1A1A]/70 leading-relaxed font-serif italic text-base md:text-lg max-w-2xl">
              At Beauty Zone Gozo, we seamlessly combine advanced medical-grade laser technology with a serene, sanctuary-like atmosphere. We believe skin treatments should be a quiet ritual of renewal.
            </p>

            {/* List of high-end value props */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4">
              {values.map((v, idx) => (
                <motion.div 
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-100px' }}
                  transition={{ delay: idx * 0.15, duration: 0.5 }}
                  className="bg-[#F9F7F2] p-6 rounded-xl border border-[#1A1A1A]/5 transition-all duration-300 hover:border-gold/30"
                >
                  <div className="p-2 bg-white w-fit rounded-md shadow-2xs border border-[#1A1A1A]/5 mb-4">
                    {v.icon}
                  </div>
                  <h4 className="font-bold text-xs tracking-wider uppercase text-[#1A1A1A] mb-2 font-sans">
                    {v.title}
                  </h4>
                  <p className="text-[11px] text-[#1A1A1A]/60 font-light leading-relaxed">
                    {v.desc}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Column 2: Gorgeous bento or split image layout (5 cols) */}
          <div className="lg:col-span-5 relative mt-8 lg:mt-0">
            {/* Ambient gold aura blur */}
            <div className="absolute inset-0 bg-gold/5 rounded-t-full blur-3xl transform -rotate-3 scale-95" />
            
            <div className="relative grid grid-cols-12 gap-4">
              {/* Primary Image */}
              <div className="col-span-8">
                <div className="overflow-hidden rounded-t-full border border-[#1A1A1A]/10 shadow-xl h-[420px]">
                  <img 
                    src="https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&q=80&w=600" 
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-700" 
                    alt="Facial skincare and luxury therapy room"
                  />
                </div>
              </div>

              {/* Offset Overlapping secondary element */}
              <div className="col-span-4 flex flex-col justify-end space-y-4 pb-8">
                <div className="overflow-hidden rounded-full border border-[#1A1A1A]/10 shadow-lg h-[160px]">
                  <img 
                    src="https://images.unsplash.com/photo-1616394584738-fc6e612e71b9?auto=format&fit=crop&q=80&w=300" 
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-700" 
                    alt="Clinical laser applicator setup"
                  />
                </div>

                {/* Micro satisfaction card */}
                <div className="bg-[#1A1A1A] text-white p-5 rounded-2xl shadow-md border border-white/5 space-y-2">
                  <div className="flex items-center space-x-1">
                    <Award className="w-4 h-4 text-gold" />
                    <span className="text-[10px] font-bold tracking-widest text-[#C5A059]">CERTIFIED</span>
                  </div>
                  <p className="text-[11px] text-stone-300 font-medium font-sans">ICE Plus Laser certified by Alma Lasers.</p>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
