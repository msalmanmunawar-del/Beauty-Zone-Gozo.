import React, { useState, useMemo } from 'react';
import { Search, Sparkles, Plus, Check, Info, ArrowUpRight } from 'lucide-react';
import { TREATMENTS, COMBOS } from '../data';
import { Treatment, TreatmentCategory, ComboPackage } from '../types';
import { motion, AnimatePresence } from 'motion/react';

interface TreatmentMenuProps {
  onSelectItem: (treatment: Treatment) => void;
  onSelectCombo: (combo: ComboPackage) => void;
  selectedIds: string[];
}

export default function TreatmentMenu({ onSelectItem, onSelectCombo, selectedIds }: TreatmentMenuProps) {
  const [activeCategory, setActiveCategory] = useState<TreatmentCategory>('laser');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSubcategory, setSelectedSubcategory] = useState<string>('All');

  // Filter treatments by category and search query
  const filteredCategoryTreatments = useMemo(() => {
    return TREATMENTS.filter(t => t.category === activeCategory);
  }, [activeCategory]);

  // List unique subcategories for active category
  const subcategories = useMemo(() => {
    const list = Array.from(new Set(filteredCategoryTreatments.map(t => t.subcategory)));
    return ['All', ...list];
  }, [filteredCategoryTreatments]);

  // Final filtered list based on search and subcategory
  const displayedTreatments = useMemo(() => {
    let list = filteredCategoryTreatments;
    
    if (selectedSubcategory !== 'All') {
      list = list.filter(t => t.subcategory === selectedSubcategory);
    }
    
    if (searchQuery.trim() !== '') {
      const q = searchQuery.toLowerCase();
      // Search entire TREATMENTS list if search is active (override category)
      list = TREATMENTS.filter(t => 
        t.name.toLowerCase().includes(q) || 
        t.subcategory.toLowerCase().includes(q) ||
        t.description.toLowerCase().includes(q)
      );
    }
    
    return list;
  }, [filteredCategoryTreatments, selectedSubcategory, searchQuery, activeCategory]);

  return (
    <section id="services" className="py-24 bg-[#F9F7F2] max-w-7xl mx-auto px-6 border-b border-[#1A1A1A]/10">
      
      {/* Title block */}
      <div className="text-center mb-16 space-y-4">
        <span className="text-[10px] uppercase font-bold tracking-[0.3em] text-[#C5A059] block">
          Treatments
        </span>
        <h2 className="text-4xl md:text-5xl font-serif italic font-light tracking-tight text-[#1A1A1A]">
          The Discovery Menu
        </h2>
        <div className="h-[1px] w-16 bg-[#1A1A1A] mx-auto" />
      </div>

      {/* Categories & Search Grid */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-6 mb-12">
        {/* Switch-Tabs buttons */}
        <div className="flex flex-wrap justify-center gap-3">
          {(['laser', 'waxing', 'facials'] as TreatmentCategory[]).map((cat) => {
            const isActive = activeCategory === cat && searchQuery === '';
            const labels = {
              laser: 'LASER HAIR REMOVAL',
              waxing: 'ELITE WAXING',
              facials: 'FACIALS & MASSAGES'
            };
            return (
              <button
                key={cat}
                onClick={() => {
                  setActiveCategory(cat);
                  setSearchQuery('');
                  setSelectedSubcategory('All');
                }}
                className={`px-6 py-3 border rounded-full text-[10px] font-bold tracking-widest transition-all duration-300 cursor-pointer ${
                  isActive 
                    ? 'border-[#1A1A1A] bg-[#1A1A1A] text-white scale-105 shadow-sm'
                    : 'border-[#1A1A1A]/10 text-[#1A1A1A]/60 hover:border-gold hover:text-gold bg-white'
                }`}
              >
                {labels[cat]}
              </button>
            );
          })}
        </div>

        {/* Dynamic Search Bar */}
        <div className="relative w-full md:w-80">
          <span className="absolute inset-y-0 left-0 flex items-center pl-3.5 pointer-events-none text-[#1A1A1A]/40">
            <Search className="w-4 h-4" />
          </span>
          <input
            type="text"
            placeholder="Search treatments..."
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              setSelectedSubcategory('All');
            }}
            className="w-full bg-white border border-[#1A1A1A]/10 rounded-full pl-10 pr-4 py-2.5 text-xs text-[#1A1A1A] placeholder-[#1A1A1A]/30 focus:outline-hidden focus:border-[#C5A059] focus:ring-1 focus:ring-[#C5A059]/30 transition-all font-sans"
          />
        </div>
      </div>

      {/* Subcategory Pills (only when not globally searching) */}
      {searchQuery === '' && subcategories.length > 2 && (
        <div className="flex flex-wrap gap-2 justify-center md:justify-start mb-8 pb-2">
          {subcategories.map((sub, idx) => {
            const isSubActive = selectedSubcategory === sub;
            return (
              <button
                key={idx}
                onClick={() => setSelectedSubcategory(sub)}
                className={`px-4 py-1.5 rounded-full text-[10px] font-semibold tracking-wider uppercase transition-all cursor-pointer ${
                  isSubActive
                    ? 'bg-[#1A1A1A] text-white'
                    : 'bg-[#E5E1DA] text-[#1A1A1A]/70 hover:bg-[#DCD9D2]'
                }`}
              >
                {sub}
              </button>
            )
          })}
        </div>
      )}

      {/* Render Main Selected View */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeCategory + searchQuery + selectedSubcategory}
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -15 }}
          transition={{ duration: 0.3 }}
        >
          {/* Main List Layout */}
          {displayedTreatments.length === 0 ? (
            <div className="text-center py-16 bg-[#E5E1DA]/20 rounded-2xl border border-[#1A1A1A]/10">
              <p className="text-[#1A1A1A]/60 text-sm">No treatments matching your query were found.</p>
              <button 
                onClick={() => { setSearchQuery(''); setSelectedSubcategory('All'); }} 
                className="mt-4 text-xs font-bold text-gold underline cursor-pointer"
              >
                Clear Filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              {/* Left group / categories list */}
              <div className="lg:col-span-7 space-y-6">
                {displayedTreatments.map((t) => {
                  const isSelected = selectedIds.includes(t.id);
                  return (
                    <div
                      key={t.id}
                      className={`group p-6 rounded-2xl border transition-all duration-300 flex justify-between items-start gap-4 ${
                        isSelected 
                          ? 'border-gold bg-[#E5E1DA]/30' 
                          : 'border-[#1A1A1A]/10 bg-white hover:border-gold/40'
                      }`}
                    >
                      <div className="space-y-1.5 flex-1 w-full">
                        <div className="flex items-center space-x-2">
                          <span className="text-[9px] uppercase tracking-wider font-bold text-gold px-2.5 py-0.5 rounded-full bg-[#F9F7F2] border border-[#1A1A1A]/5">
                            {t.subcategory}
                          </span>
                          <span className="text-[11px] text-[#1A1A1A]/40 font-serif italic">({t.durationMin} min)</span>
                        </div>
                        <h4 className="text-base font-bold font-sans text-[#1A1A1A]">
                          {t.name}
                        </h4>
                        <p className="text-xs text-[#1A1A1A]/60 leading-relaxed max-w-md font-sans">
                          {t.description}
                        </p>
                      </div>

                      <div className="flex flex-col items-end justify-between self-stretch h-full min-h-[4rem]">
                        <span className="text-base font-serif text-[#C5A059]">
                          €{t.price}.00
                        </span>
                        
                        <button
                          onClick={() => onSelectItem(t)}
                          className={`mt-4 p-2.5 rounded-full transition-all duration-300 cursor-pointer ${
                            isSelected
                              ? 'bg-[#1A1A1A] text-white hover:bg-zinc-800'
                              : 'bg-[#F9F7F2] hover:bg-gold hover:text-white text-[#1A1A1A]/80 border border-[#1A1A1A]/5'
                          }`}
                          title={isSelected ? 'Remove from booking list' : 'Add to booking list'}
                        >
                          {isSelected ? (
                            <Check className="w-3.5 h-3.5" />
                          ) : (
                            <Plus className="w-3.5 h-3.5" />
                          )}
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Right column: Highlights and Combos */}
              <div className="lg:col-span-5 space-y-8">
                {/* Promo/Feature Banner */}
                {activeCategory === 'laser' && (
                  <div className="bg-white p-8 rounded-2xl border border-[#1A1A1A]/10 flex flex-col sm:flex-row items-center justify-between text-left shadow-2xs">
                    <div className="mb-6 sm:mb-0 space-y-1">
                      <span className="text-[9px] font-bold text-gold tracking-widest uppercase">Alma Diode Tech</span>
                      <h3 className="text-xl font-serif italic text-[#1A1A1A]">Soprano ICE Platinum</h3>
                      <p className="text-xs text-[#1A1A1A]/60 max-w-xs font-serif italic">
                        Virtually Painless • Surface cooling crystals safely safeguard sensitive cell structures.
                      </p>
                    </div>
                    <div className="px-5 py-3 bg-[#F9F7F2] rounded-xl border border-[#1A1A1A]/5 flex flex-col items-center flex-shrink-0 self-center">
                      <p className="text-[9px] font-bold tracking-tighter uppercase text-[#1A1A1A]/40 mb-1">Laser Hair Removal</p>
                      <p className="text-xl font-serif text-[#C5A059]">€15.00</p>
                    </div>
                  </div>
                )}

                {activeCategory === 'waxing' && (
                  <div className="bg-white p-8 rounded-2xl border border-[#1A1A1A]/10 space-y-4">
                    <div className="flex items-center space-x-2">
                      <Sparkles className="w-5 h-5 text-gold" />
                      <h4 className="text-xl font-serif italic text-[#1A1A1A]">Premium Organic Wax</h4>
                    </div>
                    <p className="text-xs text-[#1A1A1A]/70 leading-relaxed font-serif italic">
                      "We utilize hypoallergenic organic resin and chamomile flower extracts immediately suppressing modern skin irritation."
                    </p>
                    <div className="grid grid-cols-2 gap-4 pt-4 border-t border-[#1A1A1A]/5">
                      <div>
                        <span className="font-bold text-[9px] text-[#1A1A1A] uppercase block tracking-wider">HYPOALLERGENIC</span>
                        <span className="text-[11px] text-[#1A1A1A]/50">Safe on diabetic and sensitive skins.</span>
                      </div>
                      <div>
                        <span className="font-bold text-[9px] text-[#1A1A1A] uppercase block tracking-wider">HYGIENE ASSURED</span>
                        <span className="text-[11px] text-[#1A1A1A]/50">Single disposable clean tool kits only.</span>
                      </div>
                    </div>
                  </div>
                )}

                {/* Combos list */}
                <div className="bg-[#1A1A1A] text-white p-8 md:p-10 rounded-2xl relative overflow-hidden shadow-xl">
                  {/* Backdrop abstract flare */}
                  <div className="absolute top-0 right-0 w-48 h-48 bg-gold/10 rounded-full blur-3xl -mr-16 -mt-16 pointer-events-none" />
                  
                  <div className="relative z-10 space-y-6">
                    <div className="space-y-1">
                      <span className="text-[9px] text-gold font-bold tracking-[0.25em] uppercase block">SAVINGS PACKAGES</span>
                      <h4 className="text-3xl font-serif italic text-white font-light">Value Combinations</h4>
                      <p className="text-stone-400 text-xs font-serif italic leading-relaxed">
                        Curated combinations for the complete Mediterranean lifestyle experience. Saving up to €65.00.
                      </p>
                    </div>

                    <div className="space-y-4">
                      {COMBOS.map((combo) => {
                        // Check if all combo treatments are in selectedIds
                        const isSelected = combo.treatments.every(tid => selectedIds.includes(tid));
                        return (
                          <div
                            key={combo.id}
                            className={`p-5 rounded-xl border transition-all duration-300 flex justify-between items-center ${
                              isSelected
                                ? 'bg-gold/20 border-gold'
                                : 'bg-[#F9F7F2]/5 border-white/10 hover:border-gold/40 hover:bg-[#F9F7F2]/10'
                            }`}
                          >
                            <div className="space-y-1 flex-1 mr-4">
                              <span className="text-[9px] font-bold text-gold uppercase block">Save €{combo.savings}</span>
                              <h5 className="font-bold text-[13px] text-stone-100">{combo.name}</h5>
                              <p className="text-[11px] text-stone-400 font-sans max-w-xs leading-normal">{combo.description}</p>
                            </div>

                            <div className="text-right flex flex-col items-end space-y-3">
                              <div>
                                <span className="block text-lg font-serif text-gold">€{combo.price}.00</span>
                              </div>
                              <button
                                onClick={() => onSelectCombo(combo)}
                                className={`px-4 py-2 rounded-full text-[9px] font-bold tracking-widest uppercase transition-all duration-300 cursor-pointer ${
                                  isSelected
                                    ? 'bg-gold text-white'
                                    : 'bg-white text-black hover:bg-gold hover:text-white'
                                }`}
                              >
                                {isSelected ? 'In selection' : 'Select combo'}
                              </button>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>

              </div>
            </div>
          )}
        </motion.div>
      </AnimatePresence>
    </section>
  );
}
