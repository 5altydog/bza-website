import React, { useEffect, useRef } from 'react';
import { X } from 'lucide-react';
import { Aircraft, BookingFormData, ExperienceLevel, TimeSlot } from '../types';
import { useBookingForm } from '../hooks/useBookingForm';

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedAircraft: Aircraft | null;
  onSubmit: (formData: BookingFormData) => Promise<void>;
}

const BookingFormIncludesText: React.FC = () => {
  return (
    <p className="text-sm text-blue-600 mt-2">
      Includes: Pre-flight briefing, flight with certified instructor (CFI), and post-flight debrief
    </p>
  );
};

export const BookingModal: React.FC<BookingModalProps> = ({
  isOpen,
  onClose,
  selectedAircraft,
  onSubmit
}) => {
  const modalRef = useRef<HTMLDivElement>(null);
  const firstInputRef = useRef<HTMLInputElement>(null);
  
  const {
    formData,
    errors,
    isSubmitting,
    handleInputChange,
    resetForm,
    submitForm,
    setFormData
  } = useBookingForm();

  useEffect(() => {
    if (isOpen && selectedAircraft) {
      setFormData(prev => ({ ...prev, aircraft: selectedAircraft.name }));
      
      // Focus management
      setTimeout(() => {
        firstInputRef.current?.focus();
      }, 100);
    }
  }, [isOpen, selectedAircraft, setFormData]);

  useEffect(() => {
    if (!isOpen) {
      resetForm();
    }
  }, [isOpen, resetForm]);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const success = await submitForm(onSubmit);
    if (success) {
      onClose();
    }
  };

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
      onClick={handleBackdropClick}
      role="dialog"
      aria-modal="true"
      aria-labelledby="booking-modal-title"
    >
      <div 
        ref={modalRef}
        className="bg-white rounded-xl max-w-md w-full max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 id="booking-modal-title" className="text-2xl font-bold text-gray-900">
              Book Your Discovery Flight
            </h2>
            <button 
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700 p-1 rounded-full hover:bg-gray-100 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
              aria-label="Close booking form"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {selectedAircraft && (
            <div className="bg-blue-50 p-4 rounded-lg mb-6">
              <h3 className="font-semibold text-blue-900">{selectedAircraft.name}</h3>
              <p className="text-blue-700">${selectedAircraft.price} - {selectedAircraft.description}</p>
              <BookingFormIncludesText />
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4" noValidate>
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                Full Name *
              </label>
              <input
                ref={firstInputRef}
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                required
                aria-describedby={errors.name ? "name-error" : undefined}
                className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors duration-200 ${
                  errors.name ? 'border-red-500' : 'border-gray-300'
                }`}
              />
              {errors.name && (
                <p id="name-error" className="text-red-500 text-sm mt-1" role="alert">
                  {errors.name}
                </p>
              )}
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                Email *
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                required
                aria-describedby={errors.email ? "email-error" : undefined}
                className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors duration-200 ${
                  errors.email ? 'border-red-500' : 'border-gray-300'
                }`}
              />
              {errors.email && (
                <p id="email-error" className="text-red-500 text-sm mt-1" role="alert">
                  {errors.email}
                </p>
              )}
            </div>

            <div>
              <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                Phone *
              </label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                required
                aria-describedby={errors.phone ? "phone-error" : undefined}
                className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors duration-200 ${
                  errors.phone ? 'border-red-500' : 'border-gray-300'
                }`}
              />
              {errors.phone && (
                <p id="phone-error" className="text-red-500 text-sm mt-1" role="alert">
                  {errors.phone}
                </p>
              )}
            </div>

            <div>
              <label htmlFor="preferredDate" className="block text-sm font-medium text-gray-700 mb-1">
                Preferred Date *
              </label>
              <input
                type="date"
                id="preferredDate"
                name="preferredDate"
                value={formData.preferredDate}
                onChange={handleInputChange}
                required
                min={new Date().toISOString().split('T')[0]}
                aria-describedby={errors.preferredDate ? "date-error" : undefined}
                className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors duration-200 ${
                  errors.preferredDate ? 'border-red-500' : 'border-gray-300'
                }`}
              />
              {errors.preferredDate && (
                <p id="date-error" className="text-red-500 text-sm mt-1" role="alert">
                  {errors.preferredDate}
                </p>
              )}
            </div>

            <div>
              <label htmlFor="preferredTime" className="block text-sm font-medium text-gray-700 mb-1">
                Preferred Time *
              </label>
              <select
                id="preferredTime"
                name="preferredTime"
                value={formData.preferredTime}
                onChange={handleInputChange}
                required
                aria-describedby={errors.preferredTime ? "time-error" : undefined}
                className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors duration-200 ${
                  errors.preferredTime ? 'border-red-500' : 'border-gray-300'
                }`}
              >
                <option value="">Select a time</option>
                <option value={TimeSlot.MORNING}>Morning (8:00 AM - 12:00 PM)</option>
                <option value={TimeSlot.AFTERNOON}>Afternoon (12:00 PM - 5:00 PM)</option>
                <option value={TimeSlot.EVENING}>Evening (5:00 PM - 8:00 PM)</option>
              </select>
              {errors.preferredTime && (
                <p id="time-error" className="text-red-500 text-sm mt-1" role="alert">
                  {errors.preferredTime}
                </p>
              )}
            </div>

            <div>
              <label htmlFor="experience" className="block text-sm font-medium text-gray-700 mb-1">
                Flying Experience *
              </label>
              <select
                id="experience"
                name="experience"
                value={formData.experience}
                onChange={handleInputChange}
                required
                aria-describedby={errors.experience ? "experience-error" : undefined}
                className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors duration-200 ${
                  errors.experience ? 'border-red-500' : 'border-gray-300'
                }`}
              >
                <option value="">Select your experience level</option>
                <option value={ExperienceLevel.NONE}>No flying experience</option>
                <option value={ExperienceLevel.SOME}>Some flying experience</option>
                <option value={ExperienceLevel.STUDENT}>Current student pilot</option>
                <option value={ExperienceLevel.LICENSED}>Licensed pilot</option>
              </select>
              {errors.experience && (
                <p id="experience-error" className="text-red-500 text-sm mt-1" role="alert">
                  {errors.experience}
                </p>
              )}
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 disabled:cursor-not-allowed text-white py-3 rounded-lg font-semibold transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              {isSubmitting ? 'Submitting...' : 'Request Booking'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};