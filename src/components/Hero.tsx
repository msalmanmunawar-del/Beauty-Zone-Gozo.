import React, { useRef, useEffect, useState } from 'react';
import { Sparkles, Calendar, ArrowRight } from 'lucide-react';
import { motion } from 'motion/react';

interface HeroProps {
  onOpenBooking: () => void;
}

const BACKGROUND_IMAGES = [
  "https://images.unsplash.com/photo-1512290923902-8a9f81dc236c?auto=format&fit=crop&q=80&w=1600", // Happy smiling client facial massage
  "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?auto=format&fit=crop&q=80&w=1600", // Serene glowing skin mask smiling client
  "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&q=80&w=1600", // Smiling wellness therapy client
  "https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&q=80&w=1600", // Flower petal facial therapy smiling
  "https://images.unsplash.com/photo-1616394584738-fc6e612e71b9?auto=format&fit=crop&q=80&w=1600"  // Eye massage facial care smiling
];

export default function Hero({ onOpenBooking }: HeroProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [videoPlaying, setVideoPlaying] = useState(false);
  const [videoSrc, setVideoSrc] = useState('https://assets.mixkit.co/videos/preview/mixkit-woman-enjoying-a-face-massage-in-a-spa-41584-large.mp4');
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Slideshow automatic cycle timer
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % BACKGROUND_IMAGES.length);
    }, 4500);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    // Check if the user has a custom local video uploaded at /assets/video.mp4
    fetch('/assets/video.mp4', { method: 'HEAD' })
      .then((res) => {
        if (res.ok) {
          setVideoSrc('/assets/video.mp4');
        }
      })
      .catch(() => {});
  }, []);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.load();
      videoRef.current.play()
        .then(() => {
          setVideoPlaying(true);
        })
        .catch((err) => {
          console.log("Autoplay context statement:", err);
        });
    }
  }, [videoSrc]);

  return (
    <header className="relative h-[85vh] flex items-center justify-center text-center px-6 overflow-hidden bg-[#F9F7F2]">
      {/* Background Graphic with elegant Zooming Video Loop or Fallback Image */}
      <div className="absolute inset-0 z-0">
        {/* Soft luxury bronze-coal overlay to make white typography pop elegantly */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#1A1A1A]/45 via-[#1A1A1A]/20 to-[#1A1A1A]/65 z-10" />
        
        {/* Dynamic cross-fading luxury spa & facial treatment sliding photos */}
        {BACKGROUND_IMAGES.map((imgUrl, idx) => (
          <motion.img 
            key={imgUrl}
            initial={{ scale: 1.12, opacity: 0 }}
            animate={{ 
              scale: idx === currentImageIndex ? 1.02 : 1.12, 
              opacity: idx === currentImageIndex ? (videoPlaying ? 0.35 : 0.9) : 0 
            }}
            transition={{ duration: 1.8, ease: 'easeInOut' }}
            src={imgUrl} 
            className="absolute inset-0 w-full h-full object-cover select-none pointer-events-none" 
            alt="Beauty Zone Luxury Facial Spa Client"
          />
        ))}

        {/* Video Loop */}
        <video
          ref={videoRef}
          key={videoSrc}
          autoPlay
          loop
          muted
          playsInline
          onPlay={() => setVideoPlaying(true)}
          onPlaying={() => setVideoPlaying(true)}
          className={`absolute inset-0 w-full h-full object-cover select-none pointer-events-none transition-opacity duration-1000 ${
            videoPlaying ? 'opacity-80' : 'opacity-0'
          }`}
        >
          <source 
            src={videoSrc} 
            type="video/mp4" 
          />
          <source 
            src="https://assets.mixkit.co/videos/preview/mixkit-woman-enjoying-a-face-massage-in-a-spa-41584-large.mp4" 
            type="video/mp4" 
          />
          <source 
            src="https://assets.mixkit.co/videos/preview/mixkit-facial-massage-procedure-in-a-salon-45214-large.mp4" 
            type="video/mp4" 
          />
          Your browser does not support the video tag.
        </video>
      </div>

      {/* Main Copy Area */}
      <div className="relative z-20 max-w-4xl text-white px-4">
        {/* Animated Badge */}
        <motion.div
          initial={{ opacity: 0, y: -15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="inline-flex items-center space-x-2 bg-stone-900/60 backdrop-blur-md border border-white/10 px-4 py-1.5 rounded-full mb-6"
        >
          <Sparkles className="w-3.5 h-3.5 text-gold animate-pulse" />
          <span className="text-[10px] md:text-xs uppercase tracking-[0.3em] font-medium text-stone-200">
            Elegance • Results • Serenity
          </span>
        </motion.div>

        {/* Big Display Headline */}
        <motion.h1 
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.8, ease: 'easeOut' }}
          className="text-5xl sm:text-7xl md:text-[100px] mb-8 leading-[0.95] font-serif italic font-light tracking-tight"
        >
          The Art of <br />
          <span className="not-italic font-normal text-[#C5A059] select-none">Serenity.</span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.95 }}
          transition={{ delay: 0.7, duration: 0.8 }}
          className="text-base md:text-lg mb-10 font-serif italic max-w-xl mx-auto opacity-90 text-stone-200 tracking-wide leading-relaxed"
        >
          Advanced medical-grade laser hair removal and regenerative skincare tailored for the Mediterranean lifestyle.
        </motion.p>

        {/* Call to Actions */}
        <motion.div 
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9, duration: 0.6 }}
          className="flex flex-col sm:flex-row justify-center items-center gap-4 sm:gap-6"
        >
          <a 
            href="#services" 
            className="w-full sm:w-auto bg-white hover:bg-gold text-black hover:text-white px-10 py-4 rounded-full font-bold tracking-widest text-[11px] transition-all duration-300 hover:scale-105 active:scale-95 shadow-md hover:shadow-xl hover:shadow-gold/20 flex items-center justify-center space-x-2 text-center"
          >
            <span>DISCOVER TREATMENTS</span>
            <ArrowRight className="w-3.5 h-3.5 ml-1" />
          </a>
          <button 
            id="hero-secure-booking-btn"
            onClick={onOpenBooking}
            className="w-full sm:w-auto backdrop-blur-md bg-white/10 border border-white/20 text-white px-10 py-4 rounded-full font-bold tracking-widest text-[11px] hover:bg-white hover:text-stone-950 transition-all duration-300 hover:scale-105 active:scale-95 flex items-center justify-center space-x-2 shadow-lg hover:shadow-black/40 cursor-pointer"
          >
            <Calendar className="w-3.5 h-3.5 mr-2 text-gold" />
            <span>SECURE BOOKING</span>
          </button>
        </motion.div>
      </div>

      {/* Luxury Bottom Border Line transitioning into sand color */}
      <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-[#F9F7F2] to-transparent z-10" />
    </header>
  );
}
