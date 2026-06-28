import React, { useState } from 'react';
import { Star, MessageSquareCode, BadgeCheck, CheckCircle2, Award, Sparkles } from 'lucide-react';
import { TESTIMONIALS, TREATMENTS } from '../data';
import { Testimonial } from '../types';
import { motion, AnimatePresence } from 'motion/react';

export default function Feedback() {
  const [reviews, setReviews] = useState<Testimonial[]>(TESTIMONIALS);
  
  // States for new review submission
  const [showSubmitForm, setShowSubmitForm] = useState(false);
  const [reviewerName, setReviewerName] = useState('');
  const [selectedStars, setSelectedStars] = useState(5);
  const [selectedTreatment, setSelectedTreatment] = useState('Advanced Laser Hair Removal');
  const [reviewerComment, setReviewerComment] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmitReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!reviewerName.trim() || !reviewerComment.trim()) return;

    const newReview: Testimonial = {
      id: 'rev-' + Date.now(),
      name: reviewerName,
      rating: selectedStars,
      treatmentName: selectedTreatment,
      comment: reviewerComment,
      date: 'Today',
    };

    setReviews([newReview, ...reviews]);
    
    // Clear and success state
    setReviewerName('');
    setReviewerComment('');
    setSelectedStars(5);
    setIsSuccess(true);
    
    setTimeout(() => {
      setIsSuccess(false);
      setShowSubmitForm(false);
    }, 2500);
  };

  return (
    <section id="feedback" className="py-24 bg-white px-6 border-b border-[#1A1A1A]/10 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        
        {/* Header content */}
        <div className="text-center mb-16 space-y-4">
          <span className="text-[10px] uppercase font-bold tracking-[0.3em] text-[#C5A059] block">
            Patient Journals
          </span>
          <h2 className="text-4xl md:text-5xl font-serif italic font-light tracking-tight text-[#1A1A1A]">
            Sanctuary Impressions
          </h2>
          <div className="h-[1px] w-16 bg-[#1A1A1A] mx-auto" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
          
          {/* Column 1: Reviews loop (7 cols) */}
          <div className="lg:col-span-7 space-y-6">
            <AnimatePresence initial={false}>
              {reviews.map((rev, index) => (
                <motion.div
                  key={rev.id}
                  initial={{ opacity: 0, x: -15 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1, duration: 0.4 }}
                  className="bg-[#F9F7F2]/50 p-6 sm:p-8 rounded-2xl border border-[#1A1A1A]/10 flex items-start gap-4 transition-all hover:bg-[#F9F7F2]/80"
                >
                  <div className="hidden sm:block">
                    {/* Placeholder stylish initial sphere */}
                    <div className="w-12 h-12 rounded-full border border-[#1A1A1A]/10 bg-white flex items-center justify-center text-gold text-sm font-bold shadow-2xs">
                      {rev.name.charAt(0)}
                    </div>
                  </div>

                  <div className="flex-1 space-y-3 text-left">
                    {/* Stars and Date */}
                    <div className="flex justify-between items-center">
                      <div className="flex space-x-1">
                        {Array.from({ length: rev.rating }).map((_, i) => (
                          <Star key={i} className="w-3.5 h-3.5 text-yellow-500 fill-yellow-400" />
                        ))}
                      </div>
                      <span className="text-[10.5px] text-[#1A1A1A]/40 uppercase tracking-widest font-sans">{rev.date}</span>
                    </div>

                    <p className="text-[#1A1A1A]/80 italic text-sm font-serif leading-relaxed">
                      "{rev.comment}"
                    </p>

                    <div className="flex items-center space-x-2 pt-1 border-t border-[#1A1A1A]/5 text-[11px] text-[#1A1A1A]/60">
                      <span className="font-bold text-[#1A1A1A]">{rev.name}</span>
                      <span className="text-[#1A1A1A]/20">|</span>
                      <div className="flex items-center text-gold">
                        <BadgeCheck className="w-3.5 h-3.5 mr-1 text-gold" />
                        <span className="font-semibold tracking-wider uppercase text-[9px] font-sans">{rev.treatmentName} User</span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          {/* Column 2: Submit a review card (5 cols) */}
          <div className="lg:col-span-5 relative">
            <div className="bg-[#1A1A1A] text-white p-8 sm:p-10 rounded-2xl shadow-xl space-y-6 relative border border-white/5">
              
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <Sparkles className="w-4 h-4 text-gold animate-pulse" />
                  <span className="text-[9px] uppercase tracking-[0.2em] font-medium text-[#C5A059]">YOUR EXPERIENCE MATTERS</span>
                </div>
                <h3 className="text-2xl font-serif text-white italic font-light">Share your story</h3>
                <p className="text-xs text-stone-400 font-serif italic leading-relaxed">
                  We look to refine and evaluate every single follicle and skincare outcome. Publish your honest view below to help others find perfect therapies!
                </p>
              </div>

              {!showSubmitForm ? (
                <button
                  type="button"
                  onClick={() => setShowSubmitForm(true)}
                  className="w-full bg-[#C5A059] hover:bg-white hover:text-black text-white py-4 rounded-full font-bold tracking-[0.2em] text-[10px] duration-300 cursor-pointer text-center uppercase"
                >
                  WRITE A BRIEF REVIEW
                </button>
              ) : (
                <form onSubmit={handleSubmitReview} className="space-y-4">
                  
                  {isSuccess ? (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="p-8 bg-gold/10 border border-gold/20 rounded-2xl text-center space-y-3"
                    >
                      <CheckCircle2 className="w-8 h-8 text-gold mx-auto animate-bounce" />
                      <p className="font-serif text-lg text-white">Thank You, Gracefully Received!</p>
                      <p className="text-xs text-stone-400 font-light leading-relaxed">Your testimonial has been verified and appended directly to our patient feedback loops.</p>
                    </motion.div>
                  ) : (
                    <>
                      {/* Name input */}
                      <div className="space-y-1.5 text-left">
                        <span className="text-[10px] text-stone-400 uppercase tracking-wider block">Your Name</span>
                        <input
                          type="text"
                          required
                          value={reviewerName}
                          onChange={(e) => setReviewerName(e.target.value)}
                          placeholder="e.g. Elena Borg"
                          className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-xs text-white focus:outline-hidden focus:border-gold"
                        />
                      </div>

                      {/* Stars count */}
                      <div className="space-y-1.5 text-left">
                        <span className="text-[10px] text-stone-400 uppercase tracking-wider block">Evaluation Rating</span>
                        <div className="flex space-x-2 items-center">
                          {[1, 2, 3, 4, 5].map((starIdx) => (
                            <button
                              key={starIdx}
                              type="button"
                              onClick={() => setSelectedStars(starIdx)}
                              className="text-yellow-500 hover:scale-110 active:scale-95 duration-200 cursor-pointer"
                            >
                              <Star 
                                className={`w-5 h-5 ${
                                  selectedStars >= starIdx ? 'fill-yellow-400 text-yellow-500' : 'text-stone-750'
                                }`} 
                              />
                            </button>
                          ))}
                          <span className="text-xs text-stone-400 ml-2 font-mono">{selectedStars}/5 Stars</span>
                        </div>
                      </div>

                      {/* Treatment dropdown */}
                      <div className="space-y-1.5 text-left">
                        <span className="text-[10px] text-stone-400 uppercase tracking-wider block">Treatment Administered</span>
                        <select
                          value={selectedTreatment}
                          onChange={(e) => setSelectedTreatment(e.target.value)}
                          className="w-full bg-stone-900 border border-stone-800 rounded-xl px-4 py-2.5 text-xs text-stone-300 focus:outline-hidden focus:border-gold"
                        >
                          <option value="Advanced Laser Hair Removal">Advanced Laser Hair Removal</option>
                          <option value="Salmon DNA Glass Facial">Salmon DNA 'Glass Skin' Facial</option>
                          <option value="Elite Waxing Therapy">Elite Waxing Therapy</option>
                          <option value="Deep Tissue Massage">Deep Tissue Wellness Massage</option>
                        </select>
                      </div>

                      {/* Comment */}
                      <div className="space-y-1.5 text-left">
                        <span className="text-[10px] text-stone-400 uppercase tracking-wider block">Brief Review Text</span>
                        <textarea
                          required
                          rows={3}
                          value={reviewerComment}
                          onChange={(e) => setReviewerComment(e.target.value)}
                          placeholder="Describe the sensations, pain management, skin outcomes or treatment comfort..."
                          className="w-full bg-white/5 border border-white/10 rounded-xl p-4 text-xs text-white focus:outline-hidden focus:border-gold font-light leading-relaxed resize-none"
                        />
                      </div>

                      <div className="grid grid-cols-2 gap-3 pt-2">
                        <button
                          type="button"
                          onClick={() => setShowSubmitForm(false)}
                          className="py-3 border border-white/10 hover:border-white/20 text-[#1A1A1A]/40 text-stone-400 hover:text-white rounded-full text-[10px] font-bold tracking-widest transition cursor-pointer text-center uppercase"
                        >
                          CANCEL
                        </button>
                        <button
                          type="submit"
                          className="py-3 bg-[#C5A059] hover:bg-white hover:text-black rounded-full text-[10px] font-bold tracking-widest transition-all cursor-pointer text-center uppercase"
                        >
                          SUBMIT REVIEW
                        </button>
                      </div>
                    </>
                  )}

                </form>
              )}

            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
