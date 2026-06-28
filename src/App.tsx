import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Philosophy from './components/Philosophy';
import TreatmentMenu from './components/TreatmentMenu';
import Gallery from './components/Gallery';
import BookingCalendar from './components/BookingCalendar';
import Feedback from './components/Feedback';
import FAQ from './components/FAQ';
import Footer from './components/Footer';
import WhatsAppButton from './components/WhatsAppButton';
import { Treatment, ComboPackage, Appointment } from './types';

export default function App() {
  const [selectedTreatmentIds, setSelectedTreatmentIds] = useState<string[]>([]);
  const [activeBookingCount, setActiveBookingCount] = useState<number>(0);

  // Sync active reservation count from local storage on load and keep synchronized
  const syncBookingCount = () => {
    const loaded = localStorage.getItem('beauty_zone_bookings');
    if (loaded) {
      try {
        const parsed: Appointment[] = JSON.parse(loaded);
        setActiveBookingCount(parsed.length);
      } catch (e) {
        console.error("Could not sync booking count", e);
      }
    } else {
      setActiveBookingCount(0);
    }
  };

  useEffect(() => {
    syncBookingCount();
    
    // Listen for storage changes in the same window (e.g. from subcomponents updating localStorage)
    window.addEventListener('storage', syncBookingCount);
    return () => {
      window.removeEventListener('storage', syncBookingCount);
    };
  }, []);

  // Update count when user triggers custom actions inside the application
  const handleBookingSuccess = () => {
    syncBookingCount();
    alert("Congratulations! Your wellness appointment has been successfully scheduled. Review your details in the 'Active Reservations' box below.");
  };

  const handleBookingCancelledOrUpdate = () => {
    syncBookingCount();
  };

  // Listen to manual poll to keep layout fully real-time
  useEffect(() => {
    const interval = setInterval(syncBookingCount, 1500);
    return () => clearInterval(interval);
  }, []);

  // Toggle single treatment ID
  const handleToggleTreatment = (treatment: Treatment) => {
    setSelectedTreatmentIds(prev => {
      if (prev.includes(treatment.id)) {
        return prev.filter(id => id !== treatment.id);
      } else {
        return [...prev, treatment.id];
      }
    });

    // Automatically navigate/smooth-scroll down to the booking form for immediate completion
    setTimeout(() => {
      document.getElementById('booking')?.scrollIntoView({ behavior: 'smooth' });
    }, 450);
  };

  // Add all treatments of a combo package
  const handleSelectCombo = (combo: ComboPackage) => {
    setSelectedTreatmentIds(prev => {
      // Check if all of the combo treatments are already in the array
      const allExist = combo.treatments.every(id => prev.includes(id));
      if (allExist) {
        // If all exist, remove them
        return prev.filter(id => !combo.treatments.includes(id));
      } else {
        // Otherwise, add any missing ones to the selection
        const combined = new Set([...prev, ...combo.treatments]);
        return Array.from(combined);
      }
    });

    // Automatically scroll to booking form
    setTimeout(() => {
      document.getElementById('booking')?.scrollIntoView({ behavior: 'smooth' });
    }, 450);
  };

  const handleClearSelections = () => {
    setSelectedTreatmentIds([]);
  };

  const handleAddTreatmentDirect = (id: string) => {
    setSelectedTreatmentIds(prev => {
      if (!prev.includes(id)) {
        return [...prev, id];
      }
      return prev;
    });
  };

  const handleRemoveTreatmentDirect = (id: string) => {
    setSelectedTreatmentIds(prev => prev.filter(x => x !== id));
  };

  // Scroll utilities
  const handleScrollToBooking = () => {
    document.getElementById('booking')?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleScrollToReservations = () => {
    document.getElementById('active-reservations-scroll')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen flex flex-col font-sans transition-all duration-350 bg-[#F9F7F2] text-[#1A1A1A]">
      
      {/* Top sticky navigation */}
      <Navbar 
        onOpenBooking={handleScrollToBooking} 
        activeBookingCount={activeBookingCount}
        onViewActiveBookings={handleScrollToReservations}
      />

      {/* Main page content container */}
      <main className="flex-1">
        
        {/* Luxury Hero Banner */}
        <Hero onOpenBooking={handleScrollToBooking} />

        {/* Clinical Philosophy Card layouts */}
        <Philosophy />

        {/* The complete beautiful treatment menu with interactive filters and tags */}
        <TreatmentMenu 
          onSelectItem={handleToggleTreatment}
          onSelectCombo={handleSelectCombo}
          selectedIds={selectedTreatmentIds}
        />

        {/* Elegant masonry-style gallery of premium interiors and outcomes */}
        <Gallery />

        {/* Custom interactive scheduler booking form */}
        <BookingCalendar 
          selectedTreatmentIds={selectedTreatmentIds}
          onAddTreatmentId={handleAddTreatmentDirect}
          onRemoveTreatmentId={handleRemoveTreatmentDirect}
          onClearTreatments={handleClearSelections}
          onBookingSuccess={handleBookingSuccess}
        />

        {/* Customer reviews and dynamic feedback submission loop */}
        <Feedback />

        {/* Frequently asked question animated accordions */}
        <FAQ />

      </main>

      {/* Styled brand info and hours footer */}
      <Footer />

      {/* Floating high-priority WhatsApp contact link */}
      <WhatsAppButton />

    </div>
  );
}
