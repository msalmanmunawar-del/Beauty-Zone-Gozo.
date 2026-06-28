import React, { useState } from 'react';
import { Menu, X, Phone, Calendar, Heart } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface NavbarProps {
  onOpenBooking: () => void;
  activeBookingCount: number;
  onViewActiveBookings: () => void;
}

export default function Navbar({ onOpenBooking, activeBookingCount, onViewActiveBookings }: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <nav id="nav-container" className="sticky top-0 z-50 bg-[#F9F7F2]/90 backdrop-blur-md border-b border-[#1A1A1A]/10">
        <div className="max-w-7xl mx-auto px-6 py-5 flex justify-between items-center">
          {/* Logo */}
          <a href="#" className="flex items-center space-x-2 group">
            <span className="text-sm md:text-xs tracking-[0.4em] font-bold uppercase text-gold group-hover:text-gold-hover transition-colors duration-300">
              BEAUTY ZONE GOZO
            </span>
          </a>

          {/* Desktop Menu */}
          <div className="hidden md:flex space-x-12 text-[10px] uppercase tracking-[0.2em] font-semibold text-[#1A1A1A]/60">
            <a href="#services" className="hover:text-gold transition-colors duration-300">Treatments</a>
            <a href="#philosophy" className="hover:text-gold transition-colors duration-300">Philosophy</a>
            <a href="#faq" className="hover:text-gold transition-colors duration-300">FAQ</a>
            <a href="#contact" className="hover:text-gold transition-colors duration-300">Contact</a>
          </div>

          <div className="flex items-center space-x-4">
            {/* Phone Link */}
            <a 
              href="tel:+35699444044" 
              className="hidden lg:flex items-center space-x-2 text-[10px] font-bold tracking-widest text-[#1A1A1A]/40 hover:text-gold transition-colors duration-300"
            >
              <Phone className="w-3.5 h-3.5 mr-1" />
              <span>CALL US</span>
            </a>

            {/* View Reservation Quick Link */}
            {activeBookingCount > 0 && (
              <button
                id="view-res-btn"
                onClick={onViewActiveBookings}
                className="relative p-2 text-stone-500 hover:text-gold transition-colors duration-300 flex items-center"
                title="View active reservations"
              >
                <Calendar className="w-4 h-4" />
                <span className="absolute -top-1 -right-1 bg-gold text-white text-[9px] w-3.5 h-3.5 rounded-full flex items-center justify-center font-bold">
                  {activeBookingCount}
                </span>
              </button>
            )}

            {/* Book Now Button */}
            <button
              id="book-now-navbar-btn"
              onClick={onOpenBooking}
              className="bg-[#1A1A1A] text-white hover:bg-gold px-8 py-2.5 rounded-full text-[10px] font-bold tracking-widest transition-all duration-300 cursor-pointer hover:scale-105 active:scale-95"
            >
              BOOK NOW
            </button>

            {/* Mobile Menu Button */}
            <button 
              id="mobile-menu-toggle"
              onClick={toggleMobileMenu} 
              className="md:hidden text-gray-600 hover:text-gold transition-colors p-1 cursor-pointer"
              aria-label="Toggle menu"
            >
              <Menu className="h-6 w-6" />
            </button>
          </div>
        </div>

        {/* Mobile slide-out drawer pattern with blurred backdrop */}
        <AnimatePresence>
          {isOpen && (
            <>
              {/* Blurred Backdrop */}
              <motion.div
                key="backdrop"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.4 }}
                onClick={toggleMobileMenu}
                className="fixed inset-0 z-50 bg-[#1A1A1A]/40 backdrop-blur-md md:hidden"
              />

              {/* Side-out Drawer Container */}
              <motion.div
                key="drawer"
                initial={{ x: '100%' }}
                animate={{ x: 0 }}
                exit={{ x: '100%' }}
                transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                className="fixed top-0 right-0 bottom-0 h-full w-[320px] max-w-[85vw] bg-[#F9F7F2] shadow-2xl z-50 md:hidden flex flex-col justify-between border-l border-[#1A1A1A]/10 overflow-y-auto"
              >
                {/* Header of Drawer */}
                <div>
                  <div className="flex items-center justify-between px-6 py-6 border-b border-[#1A1A1A]/5">
                    <span className="text-[11px] tracking-[0.3em] font-bold uppercase text-[#1A1A1A]">
                      BEAUTY ZONE
                    </span>
                    <button
                      onClick={toggleMobileMenu}
                      className="p-1.5 rounded-full bg-[#1A1A1A]/5 hover:bg-[#1A1A1A]/10 text-[#1A1A1A] transition-colors duration-200 cursor-pointer"
                      aria-label="Close menu"
                    >
                      <X className="h-5 w-5" />
                    </button>
                  </div>

                  {/* Navigation Links with custom staggering look */}
                  <div className="px-6 py-8 flex flex-col space-y-5 uppercase tracking-[0.2em] text-[11px] font-bold text-[#1A1A1A]/80">
                    <motion.a 
                      initial={{ opacity: 0, x: 15 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.1 }}
                      href="#services" 
                      onClick={toggleMobileMenu} 
                      className="hover:text-gold hover:translate-x-1 py-1.5 transition-all duration-300 border-b border-[#1A1A1A]/5"
                    >
                      Treatments
                    </motion.a>
                    <motion.a 
                      initial={{ opacity: 0, x: 15 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.15 }}
                      href="#philosophy" 
                      onClick={toggleMobileMenu} 
                      className="hover:text-gold hover:translate-x-1 py-1.5 transition-all duration-300 border-b border-[#1A1A1A]/5"
                    >
                      Philosophy
                    </motion.a>
                    <motion.a 
                      initial={{ opacity: 0, x: 15 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.2 }}
                      href="#faq" 
                      onClick={toggleMobileMenu} 
                      className="hover:text-gold hover:translate-x-1 py-1.5 transition-all duration-300 border-b border-[#1A1A1A]/5"
                    >
                      FAQ
                    </motion.a>
                    <motion.a 
                      initial={{ opacity: 0, x: 15 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.25 }}
                      href="#contact" 
                      onClick={toggleMobileMenu} 
                      className="hover:text-gold hover:translate-x-1 py-1.5 transition-all duration-300 border-b border-[#1A1A1A]/5"
                    >
                      Contact
                    </motion.a>

                    {activeBookingCount > 0 && (
                      <motion.button
                        id="mobile-view-res"
                        initial={{ opacity: 0, x: 15 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.3 }}
                        onClick={() => {
                          toggleMobileMenu();
                          onViewActiveBookings();
                        }}
                        className="text-left font-bold text-gold hover:text-gold-hover py-2 flex items-center space-x-2 hover:translate-x-1 transition-all duration-300 cursor-pointer"
                      >
                        <Calendar className="w-4 h-4 mr-1" />
                        <span>Active Bookings ({activeBookingCount})</span>
                      </motion.button>
                    )}
                  </div>
                </div>

                {/* Footer section of Drawer */}
                <div className="p-6 bg-[#1A1A1A]/5 border-t border-[#1A1A1A]/5 space-y-6">
                  <div className="space-y-3">
                    <p className="text-[9px] uppercase tracking-widest text-stone-400 font-bold">Contact Info</p>
                    <a 
                      href="tel:+35699444044" 
                      className="text-[#1A1A1A] hover:text-gold py-1 transition-all duration-300 flex items-center space-x-2 text-[11px] font-semibold"
                    >
                      <Phone className="w-3.5 h-3.5 text-gold" />
                      <span>+356 9944 4044</span>
                    </a>
                  </div>
                  
                  <button
                    onClick={() => {
                      toggleMobileMenu();
                      onOpenBooking();
                    }}
                    className="w-full bg-[#1A1A1A] hover:bg-gold text-white text-[10px] uppercase tracking-widest font-bold py-3.5 rounded-full transition-all duration-300 shadow-md hover:shadow-lg hover:scale-[1.02] cursor-pointer"
                  >
                    BOOK NOW
                  </button>
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </nav>
    </>
  );
}
