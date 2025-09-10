import React, { useState, useCallback, useEffect } from 'react';
import { Plane, Award, Shield, Clock, MapPin, Phone, Mail, Star, CheckCircle } from 'lucide-react';
import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/react';
import { ErrorBoundary } from './components/ErrorBoundary';
import { HeroSection } from './components/HeroSection';
import { AircraftCard } from './components/AircraftCard';
import { BookingModal } from './components/BookingModal';
import { SuccessModal } from './components/SuccessModal';
import { AdminRoute } from './components/admin/AdminRoute';
import { PrivacyPolicy } from './components/PrivacyPolicy';
import { TermsAndConditions } from './components/TermsAndConditions';
import { Aircraft, BookingFormData } from './types';
import { useAircraftData, useHeroContent, useSiteSettings } from './hooks/useCMSData';
import { supabase } from './lib/supabase';

function App() {
  const [showAdmin, setShowAdmin] = useState(false);
  const [showBookingForm, setShowBookingForm] = useState(false);
  const [selectedAircraft, setSelectedAircraft] = useState<Aircraft | null>(null);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  
  // Load CMS data
  const { aircraft, loading: aircraftLoading } = useAircraftData();
  const { heroContent, loading: heroLoading } = useHeroContent();
  const { settings, loading: settingsLoading } = useSiteSettings();

  // Check for admin route
  useEffect(() => {
    const path = window.location.pathname;
    if (path === '/admin' || path.startsWith('/admin/')) {
      setShowAdmin(true);
    }
  }, []);

  // Handle routing for privacy policy and terms
  const currentPath = window.location.pathname;
  if (currentPath === '/privacy-policy') {
    return <PrivacyPolicy />;
  }
  if (currentPath === '/terms-and-conditions') {
    return <TermsAndConditions />;
  }

  const handleBookFlight = useCallback((aircraft: Aircraft) => {
    setSelectedAircraft(aircraft);
    setShowBookingForm(true);
  }, []);

  const handleFormSubmit = useCallback(async (formData: BookingFormData) => {
    try {
      // Find aircraft by name since selectedAircraft might be null due to modal closing
      const aircraftMatch = aircraft.find(a => a.name === formData.aircraft);
      console.log('Submitting booking form:', formData);
      console.log('Found aircraft match:', aircraftMatch);
      console.log('Aircraft match tail_number:', aircraftMatch?.tail_number);
      console.log('Aircraft match tailNumber:', (aircraftMatch as any)?.tailNumber);
      const bookingPayload = { ...formData, aircraftId: (aircraftMatch as any)?.tail_number };
      console.log('Booking payload:', bookingPayload);
      
      // Send email via Supabase Edge Function
      const { data, error } = await supabase.functions.invoke('send-booking-email', {
        body: { bookingData: bookingPayload }
      });

      if (error) {
        console.error('Email sending error:', error);
        // Still show success to user, but log the email error
      } else {
        console.log('Email sent successfully:', data);
      }
      
      // Always show success modal to user regardless of email status
      setShowSuccessModal(true);
    } catch (error) {
      console.error('Form submission error:', error);
      // Don't let email errors break the user experience - still show success
      setShowSuccessModal(true);
    }
  }, [aircraft]);

  const handleCloseModal = useCallback(() => {
    setShowBookingForm(false);
    setSelectedAircraft(null);
  }, []);

  const handleChooseAircraft = useCallback(() => {
    document.getElementById('aircraft-section')?.scrollIntoView({ behavior: 'smooth' });
  }, []);

  // Show admin interface if accessing admin route
  if (showAdmin) {
    return <AdminRoute />;
  }

  // Show loading state while CMS data is loading
  if (aircraftLoading || heroLoading || settingsLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <ErrorBoundary>
      <div className="min-h-screen bg-white">
        <HeroSection 
          onChooseAircraft={handleChooseAircraft} 
          heroContent={heroContent}
        />

        {/* Transparent Spacer for consistent spacing */}
        <div className="h-16 sm:h-20 md:h-24 lg:h-28 bg-transparent"></div>

        {/* Aircraft Cards Section */}
        <section 
          id="aircraft-section" 
          className="relative -mt-56 md:-mt-80 py-20 bg-transparent"
          aria-label="Available aircraft for discovery flights"
        >
          <div className="max-w-7xl mx-auto px-4">
            <div className="flex flex-wrap justify-center gap-8">
              {aircraft.map((plane) => (
                <AircraftCard
                  key={plane.id}
                  aircraft={plane}
                  onBook={handleBookFlight}
                />
              ))}
            </div>
          </div>
        </section>

      {/* What to Expect Section */}
      <section className="py-12 bg-white" aria-label="What to expect during your discovery flight">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">What to Expect</h2>
            <p className="text-xl text-gray-600">Your discovery flight experience, step by step</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="w-8 h-8 text-blue-600" aria-hidden="true" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Pre-Flight Briefing</h3>
              <p className="text-gray-600">Meet your certified instructor and learn about aircraft systems and safety procedures</p>
            </div>
            
            <div className="text-center">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Plane className="w-8 h-8 text-blue-600" aria-hidden="true" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Aircraft Inspection</h3>
              <p className="text-gray-600">Walk around the aircraft and understand the pre-flight inspection process</p>
            </div>
            
            <div className="text-center">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Star className="w-8 h-8 text-blue-600" aria-hidden="true" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Take the Controls</h3>
              <p className="text-gray-600">Experience the thrill of actually flying the aircraft under instructor guidance</p>
            </div>
            
            <div className="text-center">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Award className="w-8 h-8 text-blue-600" aria-hidden="true" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Post-Flight Debrief</h3>
              <p className="text-gray-600">Discuss your experience and learn about next steps in your aviation journey</p>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Indicators */}
      <section className="py-16 bg-gray-50" aria-label="Why choose our flight school">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Why Choose Us</h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <Shield className="w-12 h-12 text-blue-600 mx-auto mb-4" aria-hidden="true" />
              <h3 className="text-xl font-semibold mb-2">Safety First</h3>
              <p className="text-gray-600">Perfect safety record with over 10,000 flight hours and rigorous maintenance standards</p>
            </div>
            
            <div className="text-center">
              <Award className="w-12 h-12 text-blue-600 mx-auto mb-4" aria-hidden="true" />
              <h3 className="text-xl font-semibold mb-2">Certified Instructors</h3>
              <p className="text-gray-600">All instructors are FAA certified with extensive experience in flight training</p>
            </div>
            
            <div className="text-center">
              <Clock className="w-12 h-12 text-blue-600 mx-auto mb-4" aria-hidden="true" />
              <h3 className="text-xl font-semibold mb-2">Flexible Scheduling</h3>
              <p className="text-gray-600">7 days a week availability with morning, afternoon, and evening flight options</p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-16 bg-blue-900 text-white" aria-label="Contact information">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-8">Ready to Take Flight?</h2>
          <div className="grid md:grid-cols-3 gap-8 mb-8">
            <div className="text-center">
              <MapPin className="w-6 h-6 mx-auto mb-2" aria-hidden="true" />
              <p className="font-semibold"></p>
              <a 
                href={settings.location_link || "https://maps.app.goo.gl/Vg4yEELYLeREJKwK9"} 
                target="_blank" 
                rel="noopener noreferrer"
                className="hover:text-blue-300 transition-colors duration-300 cursor-pointer"
              >
                {settings.location_name || "Zamperini Field, Torrance, California"}
              </a>
            </div>
            
            <div className="text-center">
              <Phone className="w-6 h-6 mx-auto mb-2" aria-hidden="true" />
              <p className="font-semibold"></p>
              <a 
                href={`tel:${settings.contact_phone?.replace(/\D/g, '') || '13107545676'}`}
                className="hover:text-blue-300 transition-colors duration-300 cursor-pointer"
              >
                {settings.contact_phone || "(310) 754-5676"}
              </a>
            </div>
            
            <div className="text-center">
              <Mail className="w-6 h-6 mx-auto mb-2" aria-hidden="true" />
              <p className="font-semibold"></p>
              <a 
                href={`mailto:${settings.contact_email || 'ted@flybz.net'}`}
                className="hover:text-blue-300 transition-colors duration-300 cursor-pointer"
              >
                {settings.contact_email || "ted@flybz.net"}
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-6 bg-blue-900 text-white border-t border-blue-800">
        <div className="max-w-4xl mx-auto px-4">
          <div className="text-center">
            <div className="flex justify-center items-center text-sm text-blue-200">
              <a 
                href="/privacy-policy" 
                className="hover:text-white transition-colors duration-300 cursor-pointer flex-1 text-right pr-6"
              >
                Privacy Policy
              </a>
              <span className="text-blue-400 mx-6">•</span>
              <a 
                href="/terms-and-conditions" 
                className="hover:text-white transition-colors duration-300 cursor-pointer flex-1 text-left pl-6"
              >
                Terms and Conditions
              </a>
            </div>
          </div>
        </div>
      </footer>

        <BookingModal
          isOpen={showBookingForm}
          onClose={handleCloseModal}
          selectedAircraft={selectedAircraft}
          onSubmit={handleFormSubmit}
        />

        <SuccessModal
          isOpen={showSuccessModal}
          onClose={() => setShowSuccessModal(false)}
        />
        <Analytics />
        <SpeedInsights />
      </div>
    </ErrorBoundary>
  );
}

export default App;