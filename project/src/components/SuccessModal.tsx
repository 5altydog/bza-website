import React, { useEffect } from 'react';
import { X } from 'lucide-react';

interface SuccessModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SuccessModal: React.FC<SuccessModalProps> = ({ isOpen, onClose }) => {
  useEffect(() => {
    const handleEscapeKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && isOpen) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscapeKey);
      return () => {
        document.removeEventListener('keydown', handleEscapeKey);
      };
    }
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div 
        className="bg-white rounded-xl shadow-2xl max-w-md w-full p-8 text-center relative animate-in fade-in-0 zoom-in-95 duration-300"
        role="dialog"
        aria-modal="true"
        aria-labelledby="success-title"
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors duration-200"
          aria-label="Close success message"
        >
          <X className="w-6 h-6" />
        </button>

        {/* Aircraft Logo */}
        <div className="mb-0">
          <img 
            src="/logo-transparent-rect.png" 
            alt="Bravo Zulu Aviation logo" 
            className="w-64 h-64 mx-auto object-contain brightness-0 saturate-100" 
            style={{ filter: 'brightness(0) saturate(100%) invert(24%) sepia(78%) saturate(1867%) hue-rotate(215deg) brightness(95%) contrast(93%)' }}
          />
        </div>

        {/* Success Message */}
        <div className="space-y-4 -mt-4">
          <h2 
            id="success-title" 
            className="text-2xl font-bold text-gray-900"
          >
            Booking Received — You're Cleared for Takeoff!
          </h2>
          
          <p className="text-gray-600 leading-relaxed">
            We'll be in touch today to confirm your discovery flight. You're just one step away from an unforgettable adventure in the sky!
          </p>
        </div>

        {/* Close button */}
        <button
          onClick={onClose}
          className="mt-8 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          Close
        </button>
      </div>
    </div>
  );
};