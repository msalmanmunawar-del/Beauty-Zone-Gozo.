import React, { useState } from 'react';
import { FAQS } from '../data';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronDown, Sparkles, MessageSquare } from 'lucide-react';

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const [userQuestion, setUserQuestion] = useState('');
  const [answerResult, setAnswerResult] = useState<string | null>(null);

  const toggleAccordion = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  // Automated smart reply helper for general skincare questions
  const askTheBotanist = (e: React.FormEvent) => {
    e.preventDefault();
    if (!userQuestion.trim()) return;

    const query = userQuestion.toLowerCase();
    let reply = "Thank you for asking! For custom skincare advice, please reserve a free analysis check in the scheduler. One of our specialists will inspect your follicle structure directly!";

    if (query.includes('pregnant') || query.includes('pregnancy')) {
      reply = "Laser treatments are highly successful; however, as a standard precautionary aesthetic guideline in Gozo, we recommend pausing laser hair removal sessions during pregnancy. Premium calming Waxing is fully safe and recommended instead!";
    } else if (query.includes('sun') || query.includes('tan') || query.includes('burn')) {
      reply = "Please avoid active tanning, sun-bathing, and solar beds for a minimum of 14 days before and after any laser hair removal session. Post-treatment skin cells are temporarily photosensitive.";
    } else if (query.includes('shave') || query.includes('razor')) {
      reply = "Yes, please shave the treatment areas cleanly with a razor 12 to 24 hours prior to your laser session. Avoid waxing or plucking prior, because the follicle roots must remain intact for the laser energy to target them.";
    } else if (query.includes('price') || query.includes('cost') || query.includes('offer')) {
      reply = "Our single sessions start at just €15.00 for facial areas. Check out our high-value Laser Combos ('The Beach Glow' & 'Full Body Escape') in the menu to optimize your path with significant discount margins.";
    } else if (query.includes('men') || query.includes('male')) {
      reply = "Absolutely! We cater highly successful laser treatments for male back, chest, and neck hair areas. Simply book the desired zones under our scheduling form.";
    }

    setAnswerResult(reply);
  };

  return (
    <section id="faq" className="py-24 bg-[#F9F7F2]/40 px-6 border-b border-[#1A1A1A]/10">
      <div className="max-w-4xl mx-auto">
        
        {/* Title block */}
        <div className="text-center mb-16 space-y-4">
          <span className="text-[10px] uppercase font-bold tracking-[0.3em] text-[#C5A059] block">
            Information
          </span>
          <h2 className="text-4xl md:text-5xl font-serif italic font-light tracking-tight text-[#1A1A1A]">
            Your Questions, Answered
          </h2>
          <div className="h-[1px] w-16 bg-[#1A1A1A] mx-auto" />
        </div>

        {/* FAQ Accordion Matrix */}
        <div className="space-y-4 mb-16">
          {FAQS.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={idx}
                className="bg-white border border-[#1A1A1A]/10 rounded-2xl overflow-hidden shadow-2xs hover:shadow-2xs transition-shadow duration-300"
              >
                {/* Accordion header button */}
                <button
                  type="button"
                  onClick={() => toggleAccordion(idx)}
                  className="w-full flex justify-between items-center px-6 py-5 font-bold text-[#1A1A1A] text-sm md:text-[15px] text-left hover:text-gold transition-colors duration-350 cursor-pointer font-sans uppercase tracking-wider"
                >
                  <span className="pr-4">{faq.question}</span>
                  <motion.div
                    animate={{ rotate: isOpen ? 180 : 0 }}
                    transition={{ duration: 0.3, ease: 'easeInOut' }}
                    className="text-gold flex-shrink-0"
                  >
                    <ChevronDown className="w-5 h-5 text-gold" />
                  </motion.div>
                </button>

                {/* Smooth collapsing content with height animations */}
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.28, ease: 'easeInOut' }}
                    >
                      <div className="px-6 pb-6 text-[#1A1A1A]/70 font-light text-xs md:text-sm leading-relaxed border-t border-[#1A1A1A]/5 pt-4 bg-[#F9F7F2]/30 font-sans">
                        {faq.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>

        {/* Real-time clinic query bot card */}
        <div className="bg-white p-8 rounded-2xl border border-[#1A1A1A]/10 shadow-2xs">
          <div className="flex items-center space-x-3 mb-4">
            <div className="p-2 bg-[#F9F7F2] rounded-lg border border-[#1A1A1A]/5">
              <Sparkles className="w-4 h-4 text-gold" />
            </div>
            <div>
              <h4 className="text-xs font-bold text-[#1A1A1A] uppercase tracking-widest font-sans">
                Skincare Concierge Bot
              </h4>
              <p className="text-[10px] text-[#1A1A1A]/50 font-sans">
                Get immediate generic guidelines about treatments
              </p>
            </div>
          </div>

          <form onSubmit={askTheBotanist} className="flex gap-2">
            <input
              type="text"
              placeholder="Ask: 'Does it hurt to shave?' or 'Can I go to the beach?'"
              value={userQuestion}
              onChange={(e) => {
                setUserQuestion(e.target.value);
                setAnswerResult(null);
              }}
              className="flex-1 bg-white border border-[#1A1A1A]/10 rounded-full px-5 py-2.5 text-xs text-[#1A1A1A] placeholder-[#1A1A1A]/30 focus:outline-hidden focus:border-gold focus:ring-1 focus:ring-gold/30 transition-all font-sans"
            />
            <button
              type="submit"
              className="bg-[#1A1A1A] border border-[#1A1A1A] hover:bg-gold hover:border-gold text-white px-6 py-2.5 rounded-full text-xs font-bold tracking-widest uppercase transition-colors cursor-pointer"
            >
              ASK
            </button>
          </form>

          {/* Collapsing answer block */}
          <AnimatePresence>
            {answerResult && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="mt-4 p-4.5 bg-[#F9F7F2] border border-gold/10 rounded-xl flex items-start space-x-3 text-left animate-fade-in"
              >
                <div className="p-1 bg-white rounded-md max-h-fit shadow-3xs border border-[#1A1A1A]/5">
                  <MessageSquare className="w-4 h-4 text-gold flex-shrink-0" />
                </div>
                <div className="space-y-1.5 flex-1">
                  <span className="text-[9px] font-bold text-gold uppercase tracking-widest block font-sans">Concierge Reply</span>
                  <p className="text-xs text-[#1A1A1A]/80 font-serif italic leading-relaxed">{answerResult}</p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

      </div>
    </section>
  );
}
