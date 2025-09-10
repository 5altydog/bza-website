import React from 'react';
import { HeroContent } from '../lib/supabase';

interface HeroSectionProps {
  onChooseAircraft: () => void;
  heroContent?: HeroContent | null;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onChooseAircraft, heroContent }) => {
  // Use CMS data if available, otherwise fallback to defaults
  const title = heroContent?.title || 'Discover Aviation!';
  const subtitle = heroContent?.subtitle || 'Experience the magnificent Los Angeles coast from the air as you take off from Torrance and fly over the stunning Palos Verdes Peninsula.';
  const buttonText = heroContent?.button_text || 'Choose Your Aircraft';
  const backgroundImage = heroContent?.background_image_url || '/palos-verdes-coastline-aerial.jpg';

  return (
    <section 
      className="relative min-h-screen flex items-start justify-center overflow-hidden pt-40 md:pt-60"
      role="banner"
      aria-label="Hero section with aerial view of Los Angeles coastline"
    >
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url("${backgroundImage}")`
        }}
        role="img"
        aria-label="Aerial view of Los Angeles coastline and Palos Verdes Peninsula from aircraft"
      >
        <div className="absolute inset-0 bg-gradient-to-r from-white/40 via-white/20 to-transparent"></div>
      </div>
      
      <div className="relative z-10 text-center text-gray-900 px-4 max-w-4xl mx-auto">
        <div className="flex flex-col md:flex-row items-center justify-center mb-6">
          <img 
            src="/logo-transparent-black-rectangular.png" 
            alt="Bravo Zulu Aviation logo" 
            className="w-24 h-24 md:w-32 md:h-32 mb-4 md:mb-0 md:mr-6 object-contain brightness-0 saturate-100" 
            style={{ filter: 'brightness(0) saturate(100%) invert(24%) sepia(78%) saturate(1867%) hue-rotate(215deg) brightness(95%) contrast(93%)' }}
          />
          <h1 className="text-4xl md:text-5xl lg:text-7xl font-bold tracking-tight">
            {title}
          </h1>
        </div>
        <p className="text-lg md:text-xl lg:text-2xl mb-6 font-extralight leading-relaxed">
          {subtitle}
        </p>
        <button 
          onClick={onChooseAircraft}
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 md:px-8 py-3 md:py-4 rounded-lg text-base md:text-lg font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          aria-label="Choose your aircraft for discovery flight"
        >
          {buttonText}
        </button>
      </div>
    </section>
  );
};