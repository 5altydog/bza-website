export interface Aircraft {
  id: string;
  name: string;
  model: string;
  tailNumber: string;
  price: number;
  capacity: string;
  avionics: string;
  description: string;
  image: string;
}

export enum ExperienceLevel {
  NONE = 'none',
  SOME = 'some',
  STUDENT = 'student',
  LICENSED = 'licensed'
}

export enum TimeSlot {
  MORNING = 'morning',
  AFTERNOON = 'afternoon',
  EVENING = 'evening'
}

export interface BookingFormData {
  name: string;
  email: string;
  phone: string;
  aircraft: string;
  preferredDate: string;
  preferredTime: TimeSlot | '';
  experience: ExperienceLevel | '';
}

export interface FormErrors {
  name?: string;
  email?: string;
  phone?: string;
  aircraft?: string;
  preferredDate?: string;
  preferredTime?: string;
  experience?: string;
}

export interface BookingFormProps {
  isOpen: boolean;
  onClose: () => void;
  selectedAircraft: Aircraft | null;
  onSubmit: (formData: BookingFormData) => Promise<void>;
}