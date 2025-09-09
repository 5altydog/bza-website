import React, { useEffect } from 'react';
import { X, Plane } from 'lucide-react';

interface SuccessModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SuccessModal: React.FC<SuccessModalProps> = ({ isOpen, onClose }) => {
  useEffect(() => {
    if (isOpen) {
      // Auto-close after 8 seconds
      const timer = setTimeout(() => {
        onClose();
      }, 8000);

      return () => clearTimeout(timer);
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

        {/* Aircraft Icon */}
        <div className="mb-6">
          <Plane className="w-16 h-16 text-blue-600 mx-auto" />
        </div>

        {/* Success Message */}
        <div className="space-y-4">
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