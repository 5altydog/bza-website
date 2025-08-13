import React, { useState } from 'react';
import { Plane, Users, Gauge, Award, Shield, Clock, MapPin, Phone, Mail, Star, CheckCircle } from 'lucide-react';

interface Aircraft {
  id: string;
  name: string;
  model: string;
  price: number;
  capacity: string;
  avionics: string;
  description: string;
  image: string;
}

interface BookingFormData {
  name: string;
  email: string;
  phone: string;
  aircraft: string;
  preferredDate: string;
  preferredTime: string;
  experience: string;
}

const aircraft: Aircraft[] = [
  {
    id: 'cessna-172s',
    name: 'Cessna 172S',
    model: 'C172S',
    price: 195,
    capacity: '4-seat aircraft',
    avionics: 'Traditional instruments',
    description: 'Perfect for beginners',
    image: '/cessna-172s.jpg'
  },
  {
    id: 'cessna-172s-g1000',
    name: 'Cessna 172S G1000',
    model: 'C172S G1000',
    price: 225,
    capacity: '4-seat aircraft',
    avionics: 'Modern glass cockpit',
    description: 'Advanced training experience',
    image: '/cessna-172s-g1000.jpg'
  },
  {
    id: 'cessna-152',
    name: 'Cessna 152',
    model: 'C152',
    price: 175,
    capacity: '2-seat aircraft',
    avionics: 'Classic training aircraft',
    description: 'Most affordable option',
    image: '/cessna-152.jpg'
  }
];

function App() {
  const [showBookingForm, setShowBookingForm] = useState(false);
  const [selectedAircraft, setSelectedAircraft] = useState<Aircraft | null>(null);
  const [formData, setFormData] = useState<BookingFormData>({
    name: '',
    email: '',
    phone: '',
    aircraft: '',
    preferredDate: '',
    preferredTime: '',
    experience: ''
  });

  const handleBookFlight = (aircraft: Aircraft) => {
    setSelectedAircraft(aircraft);
    setFormData(prev => ({ ...prev, aircraft: aircraft.name }));
    setShowBookingForm(true);
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission here
    alert('Thank you for your interest! We will contact you shortly to confirm your discovery flight.');
    setShowBookingForm(false);
    setFormData({
      name: '',
      email: '',
      phone: '',
      aircraft: '',
      preferredDate: '',
      preferredTime: '',
      experience: ''
    });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  return (
    <div className="min-h-screen bg-white">
{/* Hero Section */}
<section className="relative h-screen flex items-center justify-center overflow-hidden">
  <div 
    className="absolute inset-0 bg-cover bg-center bg-no-repeat"
    style={{
      backgroundImage: `url('/pxl_20250507_223858595.jpg')`
    }}
  >
    <div className="absolute inset-0 bg-gradient-to-r from-white/40 via-white/20 to-transparent"></div>
  </div>
  
  <div className="relative z-10 text-center text-gray-900 px-4 max-w-4xl mx-auto">
    <div className="flex items-center justify-center mb-6">
      <Plane className="w-16 h-16 text-blue-600 mr-4" />
      <h1 className="text-5xl md:text-7xl font-bold tracking-tight">
        Discover Aviation!
      </h1>
    </div>
    <p className="text-xl md:text-2xl mb-4 font-light leading-relaxed">
      Experience the magnificent Los Angeles coast from the air as you take off from Torrance and fly over the stunning Palos Verdes Peninsula.
    </p>
    <button 
      onClick={() => document.getElementById('aircraft-section')?.scrollIntoView({ behavior: 'smooth' })}
      className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-lg text-lg font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg"
    >
      Choose Your Aircraft
    </button>
  </div>
</section>


      {/* Aircraft Cards Section */}
      <section id="aircraft-section" className="relative -mt-60 py-20 bg-transparent">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8">
            {aircraft.map((plane) => (
              <div 
                key={plane.id} 
                className="bg-white rounded-xl shadow-2xl drop-shadow-lg overflow-hidden hover:shadow-2xl hover:drop-shadow-2xl transition-all duration-300 cursor-pointer transform hover:scale-105"
                onClick={() => handleBookFlight(plane)}
              >
                <div className="relative h-64">
                  <img 
                    src={plane.image} 
                    alt={plane.name}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-4 right-4 bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-semibold">
                    ${plane.price}
                  </div>
                </div>
                
                <div className="p-6">
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">{plane.name}</h3>
                  <p className="text-gray-600 mb-4">{plane.description}</p>
                  
                  <div className="space-y-3 mb-6">
                    <div className="flex items-center text-gray-700">
                      <Users className="w-5 h-5 mr-3 text-blue-600" />
                      <span>{plane.capacity}</span>
                    </div>
                    <div className="flex items-center text-gray-700">
                      <Gauge className="w-5 h-5 mr-3 text-blue-600" />
                      <span>{plane.avionics}</span>
                    </div>
                  </div>
                  
                  <button 
                    onClick={(e) => {
                      e.stopPropagation();
                      handleBookFlight(plane);
                    }}
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-semibold transition-colors duration-300"
                  >
                    Book This Flight
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* What to Expect Section */}
      <section className="py-12 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">What to Expect</h2>
            <p className="text-xl text-gray-600">Your discovery flight experience, step by step</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Pre-Flight Briefing</h3>
              <p className="text-gray-600">Meet your certified instructor and learn about aircraft systems and safety procedures</p>
            </div>
            
            <div className="text-center">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Plane className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Aircraft Inspection</h3>
              <p className="text-gray-600">Walk around the aircraft and understand the pre-flight inspection process</p>
            </div>
            
            <div className="text-center">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Star className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Take the Controls</h3>
              <p className="text-gray-600">Experience the thrill of actually flying the aircraft under instructor guidance</p>
            </div>
            
            <div className="text-center">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Award className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Post-Flight Debrief</h3>
              <p className="text-gray-600">Discuss your experience and learn about next steps in your aviation journey</p>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Indicators */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Why Choose Us</h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <Shield className="w-12 h-12 text-blue-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Safety First</h3>
              <p className="text-gray-600">Perfect safety record with over 10,000 flight hours and rigorous maintenance standards</p>
            </div>
            
            <div className="text-center">
              <Award className="w-12 h-12 text-blue-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Certified Instructors</h3>
              <p className="text-gray-600">All instructors are FAA certified with extensive experience in flight training</p>
            </div>
            
            <div className="text-center">
              <Clock className="w-12 h-12 text-blue-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Flexible Scheduling</h3>
              <p className="text-gray-600">7 days a week availability with morning, afternoon, and evening flight options</p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-16 bg-blue-900 text-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-8">Ready to Take Flight?</h2>
          <div className="grid md:grid-cols-3 gap-8 mb-8">
            <div className="flex items-center justify-center">
              <MapPin className="w-6 h-6 mr-3" />
              <div>
                <p className="font-semibold">Location</p>
                <a 
                  href="https://maps.app.goo.gl/Vg4yEELYLeREJKwK9" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="hover:text-blue-300 transition-colors duration-300 cursor-pointer"
                >
                  Zamperini Field, Torrance, California
                </a>
              </div>
            </div>
            
            <div className="flex items-center justify-center">
              <Phone className="w-6 h-6 mr-3" />
              <div>
                <p className="font-semibold">Phone</p>
                <a 
                  href="tel:+13107545676"
                  className="hover:text-blue-300 transition-colors duration-300 cursor-pointer"
                >
                  (310) 754-5676
                </a>
              </div>
            </div>
            
            <div className="flex items-center justify-center">
              <Mail className="w-6 h-6 mr-3" />
              <div>
                <p className="font-semibold">Email</p>
                <a 
                  href="mailto:ted@flybz.net"
                  className="hover:text-blue-300 transition-colors duration-300 cursor-pointer"
                >
                  ted@flybz.net
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Booking Form Modal */}
      {showBookingForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl max-w-md w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-2xl font-bold text-gray-900">Book Your Discovery Flight</h3>
                <button 
                  onClick={() => setShowBookingForm(false)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  ✕
                </button>
              </div>

              {selectedAircraft && (
                <div className="bg-blue-50 p-4 rounded-lg mb-6">
                  <h4 className="font-semibold text-blue-900">{selectedAircraft.name}</h4>
                  <p className="text-blue-700">${selectedAircraft.price} - {selectedAircraft.description}</p>
                  <p className="text-sm text-blue-600 mt-2">
                    Includes: 1-hour flight time, pre-flight briefing, instructor guidance, and post-flight debrief
                  </p>
                </div>
              )}

              <form onSubmit={handleFormSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Preferred Date</label>
                  <input
                    type="date"
                    name="preferredDate"
                    value={formData.preferredDate}
                    onChange={handleInputChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Preferred Time</label>
                  <select
                    name="preferredTime"
                    value={formData.preferredTime}
                    onChange={handleInputChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="">Select a time</option>
                    <option value="morning">Morning (8:00 AM - 12:00 PM)</option>
                    <option value="afternoon">Afternoon (12:00 PM - 5:00 PM)</option>
                    <option value="evening">Evening (5:00 PM - 8:00 PM)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Flying Experience</label>
                  <select
                    name="experience"
                    value={formData.experience}
                    onChange={handleInputChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="">Select your experience level</option>
                    <option value="none">No flying experience</option>
                    <option value="some">Some flying experience</option>
                    <option value="student">Current student pilot</option>
                    <option value="licensed">Licensed pilot</option>
                  </select>
                </div>

                <button
                  type="submit"
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-semibold transition-colors duration-300"
                >
                  Request Booking
                </button>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;