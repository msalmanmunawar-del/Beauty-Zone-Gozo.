import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Maximize2, X, Sparkles } from 'lucide-react';

interface GalleryItem {
  id: number;
  url: string;
  category: 'interior' | 'treatment';
  title: string;
  description: string;
  aspectRatio: string; // descriptive aspect ratio
}

const GALLERY_ITEMS: GalleryItem[] = [
  {
    id: 1,
    url: "https://images.unsplash.com/photo-1519699047748-de8e457a634e?auto=format&fit=crop&q=80&w=800",
    category: 'interior',
    title: "Sanctuary Treatment Room",
    description: "Our pristine therapeutic room designed with natural acoustic dampening and warm ambient illumination.",
    aspectRatio: "aspect-[3/4]"
  },
  {
    id: 2,
    url: "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?auto=format&fit=crop&q=80&w=800",
    category: 'treatment',
    title: "Regenerative Skincare",
    description: "Advanced peptide serum nourishment applied during our specialized medical-grade facials.",
    aspectRatio: "aspect-[4/3]"
  },
  {
    id: 3,
    url: "https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&q=80&w=800",
    category: 'interior',
    title: "The Reception Foyer",
    description: "Curated minimal travertine stone and limestone details evoking Mediterranean stillness.",
    aspectRatio: "aspect-[1/1]"
  },
  {
    id: 4,
    url: "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&q=80&w=800",
    category: 'treatment',
    title: "Precision Laser Hair Therapy",
    description: "Featuring dual-sapphire crystal cooling tips designed for near-instant comfort.",
    aspectRatio: "aspect-[3/4]"
  },
  {
    id: 5,
    url: "https://images.unsplash.com/photo-1608248597481-496100c80836?auto=format&fit=crop&q=80&w=800",
    category: 'treatment',
    title: "Salmon DNA Revitalization",
    description: "High-concentration PDRN micro-meso infusion targeting cellular renewal and a pristine glass gloss finish.",
    aspectRatio: "aspect-[1/1]"
  },
  {
    id: 6,
    url: "https://images.unsplash.com/photo-1616394584738-fc6e612e71b9?auto=format&fit=crop&q=80&w=800",
    category: 'interior',
    title: "Private Lounge & Wet Bar",
    description: "Relax post-treatment with complimentary iced chamomile infusions and organic herbal teas.",
    aspectRatio: "aspect-[3/4]"
  },
  {
    id: 7,
    url: "https://images.unsplash.com/photo-1512290923902-8a9f81dc236c?auto=format&fit=crop&q=80&w=800",
    category: 'treatment',
    title: "Clinical Exfoliation Scrub",
    description: "Custom botanical resin waxing formulations calming cellular tissue for maximum comfort.",
    aspectRatio: "aspect-[4/3]"
  },
  {
    id: 8,
    url: "https://images.unsplash.com/photo-1515377905703-c4788e51af15?auto=format&fit=crop&q=80&w=800",
    category: 'interior',
    title: "Aromatherapy Chamber",
    description: "Equipped with essential herbal diffusers to soothe nervous system responses prior to therapy.",
    aspectRatio: "aspect-[3/4]"
  }
];

export default function Gallery() {
  const [activeFilter, setActiveFilter] = useState<'all' | 'interior' | 'treatment'>('all');
  const [selectedImage, setSelectedImage] = useState<GalleryItem | null>(null);

  const filteredItems = GALLERY_ITEMS.filter(item => 
    activeFilter === 'all' ? true : item.category === activeFilter
  );

  return (
    <section id="gallery" className="py-24 bg-[#F9F7F2] border-b border-[#1A1A1A]/10 px-6 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        
        {/* Title block */}
        <div className="text-center mb-16 space-y-4">
          <span className="text-[10px] uppercase font-bold tracking-[0.3em] text-[#C5A059] block">
            Visual Story
          </span>
          <h2 className="text-4xl md:text-5xl font-serif italic font-light tracking-tight text-[#1A1A1A]">
            The Sanctuary Galleri
          </h2>
          <div className="h-[1px] w-16 bg-[#1A1A1A] mx-auto" />
          <p className="text-[#1A1A1A]/60 text-xs md:text-sm font-serif italic max-w-sm mx-auto leading-relaxed">
            Step inside Gozo's modern beauty temple and explore our serene wellness environments.
          </p>
        </div>

        {/* Elegant Minimal Toggle Tabs */}
        <div className="flex justify-center space-x-6 sm:space-x-8 mb-12">
          {(['all', 'interior', 'treatment'] as const).map((category) => (
            <button
              key={category}
              onClick={() => setActiveFilter(category)}
              className={`relative pb-2 text-[10px] font-bold tracking-widest uppercase transition-colors duration-300 cursor-pointer ${
                activeFilter === category 
                  ? 'text-[#1A1A1A]' 
                  : 'text-[#1A1A1A]/40 hover:text-[#1A1A1A]/70'
              }`}
            >
              <span className="relative z-10">
                {category === 'all' ? 'All Visuals' : category === 'interior' ? 'Inside the Sanctuary' : 'Treatments & Results'}
              </span>
              {activeFilter === category && (
                <motion.div 
                  layoutId="activeGalleryTab"
                  className="absolute bottom-0 left-0 right-0 h-[1.5px] bg-[#C5A059]"
                  transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                />
              )}
            </button>
          ))}
        </div>

        {/* CSS Masonry Grid */}
        <motion.div 
          layout
          className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-6 space-y-6 [column-fill:_balance]"
        >
          <AnimatePresence mode="popLayout">
            {filteredItems.map((item) => (
              <motion.div
                layout
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.5, ease: 'easeOut' }}
                className="break-inside-avoid relative group rounded-2xl overflow-hidden bg-white border border-[#1A1A1A]/5 shadow-sm hover:shadow-md transition-shadow cursor-zoom-in"
                onClick={() => setSelectedImage(item)}
              >
                {/* Image Wrapper */}
                <div className="relative overflow-hidden w-full h-auto">
                  <img 
                    src={item.url} 
                    alt={item.title} 
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                  />
                  {/* Elegant editorial hover overlay */}
                  <div className="absolute inset-0 bg-[#1A1A1A]/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6 text-left">
                    <span className="text-[8px] font-bold uppercase tracking-widest text-[#C5A059] mb-1">
                      {item.category === 'interior' ? 'Interior Details' : 'Clinical Therapy'}
                    </span>
                    <h3 className="font-serif italic text-white text-lg leading-snug">
                      {item.title}
                    </h3>
                    <p className="text-[10px] text-white/80 mt-1.5 leading-relaxed line-clamp-2">
                      {item.description}
                    </p>
                    <div className="absolute top-4 right-4 p-2 bg-white/10 rounded-full backdrop-blur-xs border border-white/10">
                      <Maximize2 className="w-3.5 h-3.5 text-white" />
                    </div>
                  </div>
                </div>

                {/* Subtile Details Footer (Visible when not hovered too) */}
                <div className="p-5 border-t border-[#1A1A1A]/5 bg-white text-left group-hover:bg-[#F9F7F2]/50 transition-colors">
                  <span className="text-[8px] font-bold uppercase tracking-widest text-[#C5A059] block mb-1">
                    {item.category === 'interior' ? 'Sanctuary Space' : 'Active Experience'}
                  </span>
                  <h4 className="font-serif italic text-sm text-[#1A1A1A] font-light">
                    {item.title}
                  </h4>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-[#1A1A1A]/95 backdrop-blur-md flex items-center justify-center p-4 sm:p-8"
            onClick={() => setSelectedImage(null)}
          >
            {/* Close button top right */}
            <button 
              onClick={() => setSelectedImage(null)}
              className="absolute top-6 right-6 p-3 bg-white/5 hover:bg-white/10 rounded-full text-white cursor-pointer transition-colors border border-white/10"
              title="Close gallery"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Modal Glass Container */}
            <motion.div
              initial={{ scale: 0.95, y: 15 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 15 }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="bg-[#F9F7F2] rounded-2xl overflow-hidden max-w-4xl w-full max-h-[90vh] flex flex-col md:flex-row shadow-2xl border border-white/15"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Image box (60%) */}
              <div className="md:w-3/5 bg-[#1A1A1A] flex items-center justify-center relative min-h-[300px] max-h-[50vh] md:max-h-full overflow-hidden">
                <img 
                  src={selectedImage.url} 
                  alt={selectedImage.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover" 
                />
              </div>

              {/* Descriptions & booking integration (40%) */}
              <div className="md:w-2/5 p-8 sm:p-10 flex flex-col justify-between text-left">
                <div className="space-y-6">
                  <div className="space-y-2">
                    <span className="text-[10px] font-bold text-[#C5A059] uppercase tracking-widest block">
                      {selectedImage.category === 'interior' ? 'Inside The Foyer' : 'Clinical Treatment Highlight'}
                    </span>
                    <h3 className="text-3xl font-serif italic text-[#1A1A1A] font-light leading-snug">
                      {selectedImage.title}
                    </h3>
                    <div className="h-[1px] w-12 bg-[#1A1A1A]/20" />
                  </div>
                  
                  <p className="text-sm text-[#1A1A1A]/70 leading-relaxed font-sans">
                    {selectedImage.description}
                  </p>

                  <div className="p-4 bg-white rounded-xl border border-[#1A1A1A]/5 text-xs font-sans text-[#1A1A1A]/60 flex items-start space-x-2.5">
                    <Sparkles className="w-4 h-4 text-[#C5A059] shrink-0 mt-0.5" />
                    <span>Our clinical personnel maintain absolute bio-security protocols to ensure fully sterile treatments.</span>
                  </div>
                </div>

                <div className="mt-8 pt-6 border-t border-[#1A1A1A]/10 space-y-4">
                  <a 
                    href="#booking"
                    onClick={() => {
                      setSelectedImage(null);
                      setTimeout(() => {
                        document.getElementById('booking')?.scrollIntoView({ behavior: 'smooth' });
                      }, 100);
                    }}
                    className="w-full block text-center bg-[#1A1A1A] hover:bg-[#C5A059] text-white py-3 rounded-full text-[10px] font-bold tracking-widest uppercase transition-colors"
                  >
                    RESERVE NOW
                  </a>
                  <button 
                    onClick={() => setSelectedImage(null)}
                    className="w-full text-center text-[10px] font-bold text-[#1A1A1A]/50 hover:text-[#1A1A1A] tracking-wider uppercase transition-colors"
                  >
                    Dismiss View
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
