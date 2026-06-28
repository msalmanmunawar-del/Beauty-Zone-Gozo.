import { Treatment, Therapist, ComboPackage, Testimonial } from './types';

export const TREATMENTS: Treatment[] = [
  // --- LASER HAIR REMOVAL ---
  {
    id: 'laser-lip-chin',
    name: 'Upper Lip & Chin Laser',
    price: 15,
    category: 'laser',
    subcategory: 'Facial Area',
    description: 'Precision Diode laser treatment targeting the upper lip and chin area. Fast and virtually painless.',
    durationMin: 15,
  },
  {
    id: 'laser-full-face',
    name: 'Full Face Laser',
    price: 40,
    category: 'laser',
    subcategory: 'Facial Area',
    description: 'Comprehensive facial hair removal including chin, lip, cheeks, and forehead areas.',
    durationMin: 30,
  },
  {
    id: 'laser-neck',
    name: 'Neck Laser',
    price: 25,
    category: 'laser',
    subcategory: 'Facial Area',
    description: 'Under jawline and front/back neck hair reduction, keeping margins perfectly clean.',
    durationMin: 15,
  },
  {
    id: 'laser-underarms',
    name: 'Underarms Laser',
    price: 25,
    category: 'laser',
    subcategory: 'Upper Body',
    description: 'Our most popular session. Fast, comfortable laser reduction for smooth, shadow-free underarms.',
    durationMin: 15,
  },
  {
    id: 'laser-full-arms',
    name: 'Full Arms Laser',
    price: 85,
    category: 'laser',
    subcategory: 'Upper Body',
    description: 'Complete upper and lower arm coverage including hands and fingers if requested.',
    durationMin: 40,
  },
  {
    id: 'laser-full-back',
    name: 'Full Back Laser',
    price: 85,
    category: 'laser',
    subcategory: 'Upper Body',
    description: 'Full back and shoulders treatment. Safe and effective for thick or fine hair textures.',
    durationMin: 45,
  },
  {
    id: 'laser-brazilian-hollywood',
    name: 'Brazilian / Hollywood Laser',
    price: 55,
    category: 'laser',
    subcategory: 'Lower Body',
    description: 'Intimate area hair removal (bikini line, front, and back). Fully customized to your preference.',
    durationMin: 30,
  },
  {
    id: 'laser-full-legs',
    name: 'Full Legs Laser',
    price: 130,
    category: 'laser',
    subcategory: 'Lower Body',
    description: 'Ankle to upper thighs hair removal. Save hours of shaving and prevent strawberry skin.',
    durationMin: 60,
  },
  {
    id: 'laser-half-legs',
    name: 'Half Legs Laser',
    price: 75,
    category: 'laser',
    subcategory: 'Lower Body',
    description: 'Ankle to knee, or knee to upper thigh laser. Perfect for maintaining a natural beach-ready look.',
    durationMin: 30,
  },

  // --- ELITE WAXING ---
  {
    id: 'wax-full-legs',
    name: 'Full Legs Luxury Wax',
    price: 30,
    category: 'waxing',
    subcategory: 'Traditional Body Waxing',
    description: 'Precision waxing using premium organic soothing wax. Leaves legs silky smooth for up to 4 weeks.',
    durationMin: 45,
  },
  {
    id: 'wax-hollywood',
    name: 'Hollywood (Full intimate Wax)',
    price: 30,
    category: 'waxing',
    subcategory: 'Traditional Body Waxing',
    description: 'Entire premium intimate waxing utilizing warm chamomile-enriched hard wax to protect delicate skin.',
    durationMin: 35,
  },
  {
    id: 'wax-full-arms',
    name: 'Full Arms Premium Wax',
    price: 20,
    category: 'waxing',
    subcategory: 'Traditional Body Waxing',
    description: 'Smooth wax treatment from shoulders to wrists with absolute comfort.',
    durationMin: 30,
  },
  {
    id: 'wax-underarms',
    name: 'Underarms Calming Wax',
    price: 12,
    category: 'waxing',
    subcategory: 'Traditional Body Waxing',
    description: 'Quick underarm wax finished with an aloe vera recovery gel.',
    durationMin: 15,
  },

  // --- FACIALS & MASSAGES ---
  {
    id: 'facial-salmon-dna',
    name: "Salmon DNA 'Glass Skin' Facial",
    price: 95,
    category: 'facials',
    subcategory: 'Skin Rejuvenation',
    description: 'Advanced hydration and cellular skin renewal using clinical-grade PDRN technology, bringing an exceptional radiant glow.',
    durationMin: 75,
  },
  {
    id: 'facial-deep-extraction',
    name: 'Deep Extraction Cleanse',
    price: 75,
    category: 'facials',
    subcategory: 'Skin Rejuvenation',
    description: 'Vapor steam therapy, manual gentle extraction, charcoal detox masking, and specialized pore-refining serums.',
    durationMin: 60,
  },
  {
    id: 'massage-deep-tissue',
    name: 'Deep Tissue Massage (60 min)',
    price: 85,
    category: 'facials',
    subcategory: 'Wellness Massage',
    description: 'Therapeutic pressure applied to deep muscle layers to release persistent knots and muscle fatigue.',
    durationMin: 60,
  },
  {
    id: 'massage-aromatherapy',
    name: 'Signature Aromatherapy Massage (60 min)',
    price: 65,
    category: 'facials',
    subcategory: 'Wellness Massage',
    description: 'Sensory body oil ritual using Mediterranean botanicals designed to melt away mental stress.',
    durationMin: 60,
  },
  {
    id: 'massage-stress-relief',
    name: 'Stress-Relief Back & Shoulder Massage',
    price: 35,
    category: 'facials',
    subcategory: 'Wellness Massage',
    description: 'Focused release session centering on shoulder lines, upper back, and occipital neck strain.',
    durationMin: 30,
  }
];

export const COMBOS: ComboPackage[] = [
  {
    id: 'combo-beach-glow',
    name: 'The Beach Glow',
    treatments: ['laser-brazilian-hollywood', 'laser-half-legs', 'laser-underarms'],
    price: 135,
    savings: 40,
    description: 'Brazilian / Hollywood + Half Legs + Underarms. Save €40 on your perfect summer comfort plan.',
  },
  {
    id: 'combo-full-body',
    name: 'Full Body Escape',
    treatments: ['laser-full-legs', 'laser-underarms', 'laser-brazilian-hollywood', 'laser-full-arms'],
    price: 245,
    savings: 65,
    description: 'The Ultimate Head-to-Toe Laser Plan. Full Legs, Underarms, Brazilian/Hollywood, and Full Arms.',
  }
];

export const THERAPISTS: Therapist[] = [
  {
    id: 'therapist-sarah',
    name: 'Sarah Calleja',
    role: 'Senior Laser Specialist & Co-founder',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=200',
    rating: 4.9,
  },
  {
    id: 'therapist-elena',
    name: 'Elena Spiteri',
    role: 'Aesthetic Skincare & Body Therapist',
    avatar: 'https://images.unsplash.com/photo-1594744803329-e58b31de215f?auto=format&fit=crop&q=80&w=200',
    rating: 5.0,
  },
  {
    id: 'therapist-none',
    name: 'First Available certified representative',
    role: 'Our Expert Therapist on Shift',
    avatar: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&q=80&w=200',
    rating: 4.95,
  }
];

export const TESTIMONIALS: Testimonial[] = [
  {
    id: 'rev-1',
    name: 'Maria Borg',
    rating: 5,
    treatmentName: 'Advanced Laser Hair Removal',
    comment: 'Absolutely outstanding! I had my third session with Sarah and can barely see any hairs growing back. The ICE cooling system really works, I felt completely details relaxed.',
    date: 'June 12, 2026',
  },
  {
    id: 'rev-2',
    name: 'Jessica Attard',
    rating: 5,
    treatmentName: "Salmon DNA 'Glass Skin' Facial",
    comment: "My face has never felt more hydrated and glowing. Elena's touch is pure magic—she explained every single product of the medical facial. Beauty Zone is my modern sanctuary in Ghajnsielem.",
    date: 'May 30, 2026',
  },
  {
    id: 'rev-3',
    name: 'Camille Caruana',
    rating: 5,
    treatmentName: 'The Beach Glow Combo',
    comment: 'The best investment I have made. No more razor bumps or irritation before going to Riviera. Extremely clean space, serene aesthetic, and highly professional staff.',
    date: 'June 4, 2026',
  }
];

export const FAQS = [
  {
    question: "Does laser hair removal hurt?",
    answer: "Our Diode Laser features advanced \"ICE Plus\" technology. It continuously cools the skin surface while the laser targets the follicles. Most clients describe it as a warm massage or a light tingling sensation—virtually painless compared to traditional waxing."
  },
  {
    question: "How many sessions will I need?",
    answer: "While results are visible after just one session, we typically recommend a course of 6 to 10 sessions spaced 4-6 weeks apart for permanent hair reduction, depending on the targeting area and individual hair type."
  },
  {
    question: "What is the pre-treatment protocol?",
    answer: "Please shave the treatment area closely 12–24 hours before your appointment. Avoid active sun exposure, tanning beds, or self-tanners for 2 weeks prior. Do not wax, pluck, or thread for at least 4 weeks prior to help the laser detect active hair root systems."
  },
  {
    question: "Is the Salmon DNA Facial safe for sensitive skin?",
    answer: "Yes, the Salmon DNA 'Glass Skin' Facial is perfect for sensitive skin. It relies on clinical PDRN molecules which actively down-regulate inflammation and speed up healing, leaving your skin intensely plumped, calm, and glassy."
  },
  {
    question: "How can I reschedule my booking?",
    answer: "You can reschedule or cancel your appointment free of charge up to 24 hours prior to the session. You can manage this directly via the website using your reservation receipt, or message us on WhatsApp at +356 99XX XXXX."
  }
];
