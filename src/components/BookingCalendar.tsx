import React, { useState, useEffect } from 'react';
import { Calendar as CalendarIcon, Clock, User, Check, Trash2, Heart, Award, Copy, Phone, ExternalLink } from 'lucide-react';
import { TREATMENTS, THERAPISTS } from '../data';
import { Treatment, Therapist, Appointment } from '../types';
import { motion, AnimatePresence } from 'motion/react';

interface BookingCalendarProps {
  selectedTreatmentIds: string[];
  onAddTreatmentId: (id: string) => void;
  onRemoveTreatmentId: (id: string) => void;
  onClearTreatments: () => void;
  onBookingSuccess: () => void;
}

export default function BookingCalendar({
  selectedTreatmentIds,
  onAddTreatmentId,
  onRemoveTreatmentId,
  onClearTreatments,
  onBookingSuccess,
}: BookingCalendarProps) {
  // Appointment states
  const [selectedTherapistId, setSelectedTherapistId] = useState<string>('therapist-none');
  const [selectedDate, setSelectedDate] = useState<string>('');
  const [selectedTime, setSelectedTime] = useState<string>('');
  const [firstName, setFirstName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [notes, setNotes] = useState('');
  const [consultationOptIn, setConsultationOptIn] = useState(false);
  
  // Local bookings tracking (for managing existing bookings)
  const [existingBookings, setExistingBookings] = useState<Appointment[]>([]);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  // Load existing bookings from localStorage on mount
  useEffect(() => {
    const loaded = localStorage.getItem('beauty_zone_bookings');
    if (loaded) {
      try {
        setExistingBookings(JSON.parse(loaded));
      } catch (e) {
        console.error("Could not parse existing bookings", e);
      }
    }
  }, []);

  // Sync back to local storage
  const saveToLocalStorage = (list: Appointment[]) => {
    localStorage.setItem('beauty_zone_bookings', JSON.stringify(list));
    setExistingBookings(list);
    window.dispatchEvent(new Event('storage')); // trigger updates in Navbar or elsewhere
  };

  // Generate date options (Next 7 elegant days)
  const dateOptions = Array.from({ length: 7 }).map((_, idx) => {
    const date = new Date();
    date.setDate(date.getDate() + idx + 1); // start tomorrow
    const dayName = date.toLocaleDateString('en-US', { weekday: 'short' });
    const dayNumber = date.getDate();
    const monthName = date.toLocaleDateString('en-US', { month: 'short' });
    const fullDateString = date.toISOString().split('T')[0];
    return { dayName, dayNumber, monthName, value: fullDateString };
  });

  // Select tomorrow by default when mounted
  useEffect(() => {
    if (!selectedDate && dateOptions.length > 0) {
      setSelectedDate(dateOptions[0].value);
    }
  }, []);

  // Available slots
  const timeSlots = [
    '09:00', '10:00', '11:00', '12:00', 
    '13:30', '14:30', '15:30', '16:30', '17:30'
  ];

  // Resolve currently selected treatments
  const currentSelectedTreatments = TREATMENTS.filter(t => 
    selectedTreatmentIds.includes(t.id)
  );

  // Calculate sum totals
  const baseTotal = currentSelectedTreatments.reduce((sum, t) => sum + t.price, 0);
  const totalPrice = baseTotal;

  const handleBookingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedTreatmentIds.length === 0) {
      alert("Please select at least one treatment before scheduling.");
      return;
    }
    if (!selectedDate || !selectedTime) {
      alert("Please select your preferred Date and Time slot.");
      return;
    }

    const uniqueId = 'BZ-' + Math.floor(1000 + Math.random() * 9000);
    const newAppointment: Appointment = {
      id: uniqueId,
      customerName: firstName,
      customerEmail: email,
      customerPhone: phone,
      treatmentIds: [...selectedTreatmentIds],
      therapistId: selectedTherapistId,
      date: selectedDate,
      timeSlot: selectedTime,
      totalPrice: totalPrice,
      status: 'confirmed',
      createdAt: new Date().toISOString(),
      notes: notes + (consultationOptIn ? " [First time consultation requested]" : "")
    };

    const updated = [newAppointment, ...existingBookings];
    saveToLocalStorage(updated);

    // Reset fields
    setFirstName('');
    setEmail('');
    setPhone('');
    setNotes('');
    setConsultationOptIn(false);
    setSelectedTime('');
    onClearTreatments(); // Clear selection
    onBookingSuccess();  // Notify success
    
    // Smooth scroll to existing reservations to see the confirmation block
    setTimeout(() => {
      document.getElementById('active-reservations-scroll')?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  const handleCancelBooking = (id: string) => {
    if (confirm("Are you sure you want to cancel this booking?")) {
      const updated = existingBookings.filter(b => b.id !== id);
      saveToLocalStorage(updated);
    }
  };

  const handleCopyId = (id: string) => {
    navigator.clipboard.writeText(id);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  // Resolve therapist helper details
  const getTherapistName = (id: string) => {
    const t = THERAPISTS.find(x => x.id === id);
    return t ? t.name : ' shift specialist';
  };

  return (
    <section id="booking" className="py-24 bg-[#1A1A1A] text-white relative border-b border-[#1A1A1A]/20 overflow-hidden">
      
      {/* Background radial gold glow matches classic spa ambiance */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-gold/5 rounded-full -mr-64 -mt-64 blur-3xl opacity-40" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-gold/5 rounded-full -ml-32 -mb-32 blur-3xl opacity-40" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* Title elements */}
        <div className="text-center mb-16 space-y-4">
          <span className="text-[10px] uppercase font-bold tracking-[0.3em] text-[#C5A059] block">
            Reservation
          </span>
          <h2 className="text-4xl md:text-5xl font-serif italic text-white font-light tracking-tight">
            Begin Your Journey
          </h2>
          <p className="text-stone-300 text-xs md:text-sm font-serif italic max-w-sm mx-auto leading-relaxed">
            Book your appointment online instantly. For first-time laser or clinical peel clients, a complimentary 10-minute skincare analysis is integrated.
          </p>
          <div className="h-[1px] w-16 bg-white/20 mx-auto" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* LEFT PANEL: The multi-step booking builder */}
          <div className="lg:col-span-7 bg-zinc-900/40 border border-white/5 p-8 sm:p-12 rounded-2xl shadow-xl relative">
            <h3 className="text-2xl font-serif text-white mb-6 italic font-light">Secure Your Appointment</h3>
            
            <form onSubmit={handleBookingSubmit} className="space-y-8 font-sans">
              
              {/* STEPS 1: Selected Services overview */}
              <div className="space-y-4">
                <label className="text-[10px] uppercase tracking-widest font-bold text-[#C5A059] block">
                  1. Selected Treatments ({currentSelectedTreatments.length})
                </label>
                
                {currentSelectedTreatments.length === 0 ? (
                  <div className="p-5 rounded-xl border border-dashed border-white/10 text-center text-stone-400">
                    <p className="text-xs font-serif italic">No treatments selected yet.</p>
                    <a href="#services" className="text-[10px] text-[#C5A059] hover:underline font-bold mt-2 inline-block font-sans uppercase tracking-wider">
                      Browse Menu & Add Treatments +
                    </a>
                  </div>
                ) : (
                  <div className="space-y-2 max-h-56 overflow-y-auto pr-2 custom-scroll">
                    {currentSelectedTreatments.map((t) => (
                      <div key={t.id} className="flex justify-between items-center bg-[#1A1A1A] border border-white/5 p-4 rounded-xl">
                        <div>
                          <p className="text-xs font-bold font-sans text-stone-200">{t.name}</p>
                          <p className="text-[10px] text-stone-500 font-serif italic">{t.subcategory} • {t.durationMin} min</p>
                        </div>
                        <div className="flex items-center space-x-3">
                          <span className="text-xs font-serif text-gold">€{t.price}.00</span>
                          <button
                            type="button"
                            onClick={() => onRemoveTreatmentId(t.id)}
                            className="text-stone-500 hover:text-red-400 p-1 transition cursor-pointer"
                            title="Remove item"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    ))}
                    
                    {/* Clear selection and totals bar */}
                    <div className="flex justify-between items-center pt-2">
                      <button
                        type="button"
                        onClick={onClearTreatments}
                        className="text-[10px] font-bold text-red-400 hover:underline cursor-pointer"
                      >
                        Clear All Selected
                      </button>
                      <span className="text-xs text-stone-400 font-serif italic">
                        Item Tally: <strong className="text-white text-sm ml-1 not-italic font-sans">€{totalPrice}.00</strong>
                      </span>
                    </div>
                  </div>
                )}
              </div>

              {/* STEP 2: Therapist choice with high quality bio */}
              <div className="space-y-3">
                <label className="text-[10px] uppercase tracking-widest font-bold text-[#C5A059] block">
                  2. Choose Practitioner
                </label>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  {THERAPISTS.map((t) => {
                    const isSelected = selectedTherapistId === t.id;
                    const isSpecial = t.id !== 'therapist-none';
                    return (
                      <div
                        key={t.id}
                        onClick={() => setSelectedTherapistId(t.id)}
                        className={`p-4 rounded-xl border transition-all duration-300 cursor-pointer flex items-center space-x-3.5 ${
                          isSelected
                            ? 'bg-gold/10 border-gold'
                            : 'bg-zinc-900 border-white/5 hover:border-white/20'
                        }`}
                      >
                        <img 
                          src={t.avatar} 
                          alt={t.name} 
                          className="w-10 h-10 rounded-full object-cover border border-white/10"
                        />
                        <div className="flex-1 min-w-0">
                          <h4 className="text-[11px] font-bold text-stone-200 truncate">{t.name === 'First Available certified representative' ? 'Any Available' : t.name}</h4>
                          <p className="text-[9px] text-[#C5A059] font-medium truncate uppercase tracking-widest">{t.role}</p>
                          <div className="flex items-center mt-0.5">
                            <span className="text-[9px] text-yellow-400">★</span>
                            <span className="text-[9px] text-stone-400 ml-1">{t.rating}</span>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* STEP 3: Booking times and dates */}
              <div className="space-y-4">
                <label className="text-[10px] uppercase tracking-widest font-bold text-[#C5A059] block">
                  3. Calendar & Available Timeslots
                </label>

                {/* Day grid */}
                <div className="grid grid-cols-4 sm:grid-cols-7 gap-2">
                  {dateOptions.map((dateObj, index) => {
                    const isSelected = selectedDate === dateObj.value;
                    return (
                      <div
                        key={index}
                        onClick={() => setSelectedDate(dateObj.value)}
                        className={`p-2.5 rounded-xl border text-center transition-all duration-300 cursor-pointer ${
                          isSelected
                            ? 'bg-gold text-white border-gold font-bold scale-105'
                            : 'bg-zinc-900 border-white/5 text-stone-300 hover:border-white/20'
                        }`}
                      >
                        <p className="text-[9px] tracking-widest uppercase mb-1 font-medium">{dateObj.dayName}</p>
                        <p className="text-base font-bold font-sans select-none">{dateObj.dayNumber}</p>
                        <p className="text-[8px] text-stone-500 uppercase">{dateObj.monthName}</p>
                      </div>
                    );
                  })}
                </div>

                {/* Time slot grid */}
                <div className="space-y-2">
                  <span className="text-[10px] text-stone-400 block font-medium">Select Time</span>
                  <div className="grid grid-cols-3 sm:grid-cols-5 md:grid-cols-9 gap-1.5">
                    {timeSlots.map((time) => {
                      const isSelected = selectedTime === time;
                      return (
                        <div
                          key={time}
                          onClick={() => setSelectedTime(time)}
                          className={`py-2 rounded-lg text-center text-xs font-semibold tracking-wide transition-all duration-200 cursor-pointer ${
                            isSelected
                              ? 'bg-white text-black font-bold'
                              : 'bg-zinc-900 border border-white/5 text-stone-300 hover:bg-neutral-800'
                          }`}
                        >
                          {time}
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>

              {/* STEP 4: Personal Coordinates */}
              <div className="space-y-4">
                <label className="text-[10px] uppercase tracking-widest font-bold text-[#C5A059] block">
                  4. Secure Personal Coordinates
                </label>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <span className="text-[10px] text-stone-450 block font-bold uppercase tracking-widest">Your Full Name</span>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Maria Caruana"
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                      className="w-full bg-[#1A1A1A] border border-white/10 rounded-xl px-4 py-3 text-xs text-stone-200 placeholder-stone-600 focus:outline-hidden focus:border-gold transition-all"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <span className="text-[10px] text-stone-450 block font-bold uppercase tracking-widest">Email Address</span>
                    <input
                      type="email"
                      required
                      placeholder="e.g. maria@gmail.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full bg-[#1A1A1A] border border-white/10 rounded-xl px-4 py-3 text-xs text-stone-200 placeholder-stone-600 focus:outline-hidden focus:border-gold transition-all"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 gap-4">
                  <div className="space-y-1.5">
                    <span className="text-[10px] text-stone-455 block font-bold uppercase tracking-widest">Gozo Telephone Coordinates</span>
                    <div className="relative">
                      <span className="absolute inset-y-0 left-0 flex items-center pl-4 text-xs font-mono text-stone-500">
                        +356
                      </span>
                      <input
                        type="tel"
                        required
                        placeholder="79XX XXXX"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value.replace(/\D/g, '').substring(0, 8))}
                        className="w-full bg-[#1A1A1A] border border-white/10 rounded-xl pl-16 pr-4 py-3 text-xs text-stone-200 placeholder-stone-600 focus:outline-hidden focus:border-gold font-mono transition-all"
                      />
                    </div>
                  </div>
                </div>

                {/* Optional items */}
                <div className="pt-2">
                  <label className="flex items-start space-x-3 cursor-pointer group">
                    <input
                      type="checkbox"
                      checked={consultationOptIn}
                      onChange={(e) => setConsultationOptIn(e.target.checked)}
                      className="mt-1 accent-gold cursor-pointer"
                    />
                    <div className="text-left text-xs text-stone-450 select-none group-hover:text-stone-300">
                      <span className="text-stone-200 font-bold block pb-0.5">Add Free Clinical Laser Analysis (+10 min)</span>
                      Recommended if you are a first-time client looking for optimal follicle configuration.
                    </div>
                  </label>
                </div>
              </div>

              {/* Submit trigger button */}
              <button
                type="submit"
                disabled={selectedTreatmentIds.length === 0}
                className={`w-full py-4.5 rounded-full font-bold tracking-[0.25em] text-[10px] transition-all duration-300 ${
                  selectedTreatmentIds.length > 0 
                  ? 'bg-gold hover:bg-white text-black hover:scale-[1.02] cursor-pointer' 
                  : 'bg-stone-800 text-stone-500 cursor-not-allowed'
                }`}
              >
                CONFIRM RESERVATION
              </button>

            </form>
          </div>

          {/* RIGHT PANEL: Dynamic summary checkout block & Active bookings management */}
          <div className="lg:col-span-12 xl:col-span-5 space-y-8">
            
            {/* Visual live order calculation screen */}
            <div className="bg-zinc-900 border border-white/5 p-8 rounded-2xl space-y-6">
              <h4 className="text-lg font-serif border-b border-white/5 pb-3 text-white italic">Your Treatment Summary</h4>
              
              <div className="space-y-4 font-sans">
                {currentSelectedTreatments.length === 0 ? (
                  <p className="text-xs text-stone-500 font-serif italic leading-relaxed">
                    Add services from the menu above to build your luxury custom care plan here.
                  </p>
                ) : (
                  <>
                    <div className="space-y-3">
                      {currentSelectedTreatments.map((t) => (
                        <div key={t.id} className="flex justify-between items-center text-xs">
                          <span className="text-stone-400 font-light">{t.name}</span>
                          <span className="text-stone-200 font-serif text-gold">€{t.price}.00</span>
                        </div>
                      ))}
                    </div>

                    {consultationOptIn && (
                      <div className="flex justify-between items-center text-xs border-t border-white/5 pt-3">
                        <span className="text-stone-450 italic">Complementary Laser Consult</span>
                        <span className="text-[#C5A059] font-bold">FREE</span>
                      </div>
                    )}

                    <div className="border-t border-white/5 pt-4 flex justify-between items-center">
                      <span className="text-xs font-bold uppercase tracking-wider text-stone-300">Total Price Due</span>
                      <span className="text-2xl font-serif text-gold">€{totalPrice}.00</span>
                    </div>

                    <div className="pt-2 space-y-1.5 text-[11px] text-stone-500">
                      <div className="flex items-center">
                        <span className="text-gold mr-2">✓</span> Pay securely in-clinic after treatment.
                      </div>
                      <div className="flex items-center">
                        <span className="text-gold mr-2">✓</span> Free reschedule up to 24 hours prior.
                      </div>
                    </div>
                  </>
                )}
              </div>
            </div>

            {/* Active reservations details widget (persisted state management) */}
            <div id="active-reservations-scroll" className="bg-[#1A1A1A] border border-white/5 p-8 rounded-2xl space-y-6">
              <div className="flex justify-between items-center border-b border-white/5 pb-3">
                <h4 className="text-lg font-serif text-white italic">Active Reservations</h4>
                <span className="bg-gold/15 text-gold text-[9px] font-bold px-3 py-1 rounded-full border border-gold/25 font-sans">
                  {existingBookings.length} Saved
                </span>
              </div>

              {existingBookings.length === 0 ? (
                <div className="text-center py-10 space-y-2">
                  <CalendarIcon className="w-8 h-8 text-stone-600 mx-auto opacity-50 animate-pulse" />
                  <p className="text-xs text-stone-500 font-serif italic">
                    Local browser cache exhibits no active reservations currently. Confirm the booking form to create one.
                  </p>
                </div>
              ) : (
                <div className="space-y-6 max-h-[450px] overflow-y-auto pr-1">
                  {existingBookings.map((b) => (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      key={b.id}
                      className="bg-black/40 border border-white/10 rounded-xl overflow-hidden relative font-sans"
                    >
                      {/* Gold ribbon ticket aesthetic */}
                      <div className="h-1 bg-gold w-full" />
                      
                      <div className="p-5 space-y-4">
                        <div className="flex justify-between items-start">
                          <div>
                            <span className="text-[10px] text-stone-500 tracking-widest uppercase block">RESERVATION RECIPIENT</span>
                            <span className="text-sm font-bold text-white block">{b.customerName}</span>
                          </div>
                          
                          {/* Clipboard code */}
                          <button
                            type="button"
                            onClick={() => handleCopyId(b.id)}
                            className="text-stone-500 hover:text-gold flex items-center space-x-1 p-1 bg-neutral-900 border border-white/5 rounded-md transition cursor-pointer"
                          >
                            <span className="text-[9px] font-mono select-all font-bold tracking-wider text-stone-300">
                              {b.id}
                            </span>
                            <Copy className="w-2.5 h-2.5 text-stone-400" />
                            {copiedId === b.id && (
                              <span className="text-[8px] bg-gold text-black px-1.5 py-0.5 rounded ml-1 font-bold">COPIED</span>
                            )}
                          </button>
                        </div>

                        {/* Calendar info */}
                        <div className="grid grid-cols-2 gap-4 border-t border-white/5 pt-4">
                          <div>
                            <span className="text-[10px] text-stone-500 tracking-widest block uppercase font-sans">DATE</span>
                            <span className="text-xs font-semibold text-stone-200">
                              {new Date(b.date).toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric', year: 'numeric' })}
                            </span>
                          </div>
                          <div>
                            <span className="text-[10px] text-stone-500 tracking-widest block uppercase font-sans">TIME SLOT</span>
                            <span className="text-xs font-semibold text-stone-200 flex items-center">
                              <Clock className="w-3 h-3 text-gold mr-1" />
                              {b.timeSlot}
                            </span>
                          </div>
                        </div>

                        <div>
                          <span className="text-[10px] text-stone-500 tracking-widest block uppercase font-sans">PRACTITIONER ASSIGNED</span>
                          <span className="text-[11px] font-bold text-[#C5A059] uppercase tracking-wider">
                            {getTherapistName(b.therapistId)}
                          </span>
                        </div>

                        <div>
                          <span className="text-[10px] text-stone-500 tracking-widest block uppercase font-sans font-bold">TREATMENTS BOOKED</span>
                          <div className="space-y-1 mt-1">
                            {TREATMENTS.filter(t => b.treatmentIds.includes(t.id)).map(st => (
                              <div key={st.id} className="flex justify-between text-[11px] text-stone-400 font-light">
                                <span>• {st.name}</span>
                                <span className="font-serif text-[#C5A059]">€{st.price}.00</span>
                              </div>
                            ))}
                          </div>
                        </div>

                        <div className="flex justify-between items-center pt-3 border-t border-white/5">
                          <div>
                            <span className="text-[10px] text-stone-500 tracking-widest block uppercase">STIPULATED PRICE</span>
                            <span className="text-lg font-serif text-gold">€{b.totalPrice}.00</span>
                          </div>
                          
                          <button
                            type="button"
                            onClick={() => handleCancelBooking(b.id)}
                            className="bg-red-950/20 hover:bg-red-950 hover:text-red-200 border border-red-900/40 px-3.5 py-1.5 rounded-lg text-[9px] font-bold tracking-widest uppercase transition cursor-pointer"
                          >
                            CANCEL APPOINTMENT
                          </button>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}
            </div>

          </div>

        </div>
      </div>
    </section>
  );
}
