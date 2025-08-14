import React from 'react';
import { Users, Gauge } from 'lucide-react';
import { Aircraft } from '../types';
import { DatabaseAircraft } from '../lib/supabase';

interface AircraftCardProps {
  aircraft: Aircraft | DatabaseAircraft;
  onBook: (aircraft: Aircraft) => void;
}

export const AircraftCard: React.FC<AircraftCardProps> = ({ aircraft, onBook }) => {
  // Convert DatabaseAircraft to Aircraft for compatibility
  const normalizedAircraft: Aircraft = {
    id: aircraft.id,
    name: aircraft.name,
    model: aircraft.model,
    price: aircraft.price,
    capacity: aircraft.capacity,
    avionics: aircraft.avionics,
    description: aircraft.description,
    image: 'image_url' in aircraft ? aircraft.image_url : aircraft.image
  };

  const handleCardClick = () => {
    onBook(normalizedAircraft);
  };

  const handleBookClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onBook(normalizedAircraft);
  };

  return (
    <div 
      className="bg-white rounded-xl shadow-2xl drop-shadow-lg overflow-hidden hover:shadow-2xl hover:drop-shadow-2xl transition-all duration-300 cursor-pointer transform hover:scale-105 focus-within:ring-2 focus-within:ring-blue-500"
      onClick={handleCardClick}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          handleCardClick();
        }
      }}
      aria-label={`Book ${aircraft.name} for $${aircraft.price}`}
    >
      <div className="relative h-64">
        <img 
          src={normalizedAircraft.image} 
          alt={`${aircraft.name} - ${aircraft.description}`}
          className="w-full h-full object-cover"
          loading="lazy"
        />
        <div className="absolute top-4 right-4 bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-semibold">
          ${aircraft.price}
        </div>
      </div>
      
      <div className="p-6">
        <h3 className="text-2xl font-bold text-gray-900 mb-2">{aircraft.name}</h3>
        <p className="text-gray-600 mb-4">{aircraft.description}</p>
        
        <div className="space-y-3 mb-6">
          <div className="flex items-center text-gray-700">
            <Users className="w-5 h-5 mr-3 text-blue-600" aria-hidden="true" />
            <span>{aircraft.capacity}</span>
          </div>
          <div className="flex items-center text-gray-700">
            <Gauge className="w-5 h-5 mr-3 text-blue-600" aria-hidden="true" />
            <span>{aircraft.avionics}</span>
          </div>
        </div>
        
        <button 
          onClick={handleBookClick}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-semibold transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          aria-label={`Book ${aircraft.name} flight`}
        >
          Book This Flight
        </button>
      </div>
    </div>
  );
};