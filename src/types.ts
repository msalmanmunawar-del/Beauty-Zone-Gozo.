/**
 * Types definition for Beauty Zone Gozo
 */

export type TreatmentCategory = 'laser' | 'waxing' | 'facials';

export interface Treatment {
  id: string;
  name: string;
  price: number;
  category: TreatmentCategory;
  subcategory: string;
  description: string;
  durationMin: number; // e.g. 15, 30, 45, 60
}

export interface Therapist {
  id: string;
  name: string;
  role: string;
  avatar: string;
  rating: number;
}

export interface ComboPackage {
  id: string;
  name: string;
  treatments: string[];
  price: number;
  savings: number;
  description: string;
}

export interface Appointment {
  id: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  treatmentIds: string[];
  therapistId: string;
  date: string; // YYYY-MM-DD
  timeSlot: string; // e.g., "10:00"
  totalPrice: number;
  status: 'confirmed' | 'cancelled';
  createdAt: string;
  notes?: string;
}

export interface Testimonial {
  id: string;
  name: string;
  rating: number;
  treatmentName: string;
  comment: string;
  date: string;
}
