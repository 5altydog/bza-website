import React from 'react';
import { ArrowLeft } from 'lucide-react';

export const TermsAndConditions: React.FC = () => {
  const handleGoBack = () => {
    window.history.back();
  };

  return (
    <div className="min-h-screen bg-blue-900 text-white">
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <img 
            src="/logo-transparent-black-rectangular.png" 
            alt="Bravo Zulu Aviation logo" 
            className="h-16 mx-auto object-contain brightness-0 invert mb-6"
          />
        </div>
        
        <button
          onClick={handleGoBack}
          className="mb-8 inline-flex items-center text-blue-200 hover:text-white transition-colors duration-300"
        >
          <ArrowLeft className="w-5 h-5 mr-2" />
          Back to Home
        </button>

        <div className="prose prose-invert prose-lg max-w-none">
          <h1 className="text-4xl font-bold mb-6 text-white">Terms and Conditions</h1>
          
          <p className="text-lg mb-6"><strong>Effective Date: January 1, 2025</strong></p>

          <p className="mb-6">
            Welcome to Discover Aviation!, operated by Bravo Zulu Aviation LLC. These Terms and Conditions ("Terms") govern your use of our website at https://www.flybyla.com and our services. By accessing our website or using our services, you agree to be bound by these Terms. Please read them carefully.
          </p>

          <h2 className="text-2xl font-semibold mt-8 mb-4 text-white">1. Acceptance of Terms</h2>
          <p className="mb-6">
            By accessing or using our website and services, you acknowledge that you have read, understood, and agree to be bound by these Terms and all applicable laws and regulations. If you do not agree to these Terms, please do not use our website or services.
          </p>

          <h2 className="text-2xl font-semibold mt-8 mb-4 text-white">2. Nature of Services</h2>

          <h3 className="text-xl font-semibold mt-6 mb-3 text-blue-200">Information and Booking Services Only</h3>
          <p className="mb-4">Discover Aviation! and Bravo Zulu Aviation LLC provide:</p>
          <ul className="list-disc pl-6 mb-4 space-y-1">
            <li>Information about flight training and discovery flights</li>
            <li>Marketing services for aviation experiences</li>
            <li>Booking coordination services connecting interested individuals with certified flight instructors and Part 61 flight schools</li>
          </ul>

          <h3 className="text-xl font-semibold mt-6 mb-3 text-blue-200">We Are Not a Flight School</h3>
          <p className="mb-4">
            <strong>Important:</strong> Neither Discover Aviation! nor Bravo Zulu Aviation LLC are flight schools. We do not:
          </p>
          <ul className="list-disc pl-6 mb-4 space-y-1">
            <li>Provide flight instruction</li>
            <li>Operate aircraft</li>
            <li>Employ flight instructors</li>
            <li>Issue pilot certificates or ratings</li>
          </ul>
          <p className="mb-6">
            All flight training and discovery flights are conducted by independent certified flight instructors operating under Part 61 flight schools. We solely facilitate the connection between interested individuals and qualified aviation service providers.
          </p>

          <h2 className="text-2xl font-semibold mt-8 mb-4 text-white">3. Eligibility</h2>
          <p className="mb-6">
            You must be at least 18 years old to make bookings through our website. If you are under 18, a parent or legal guardian must make bookings on your behalf and agree to these Terms. By using our services, you represent and warrant that you meet these requirements and are legally able to enter into binding contracts.
          </p>

          <h2 className="text-2xl font-semibold mt-8 mb-4 text-white">4. Booking and Service Coordination</h2>

          <h3 className="text-xl font-semibold mt-6 mb-3 text-blue-200">Booking Inquiries</h3>
          <p className="mb-4">When you submit a booking inquiry through our website:</p>
          <ul className="list-disc pl-6 mb-4 space-y-1">
            <li>You are requesting information about flight training or discovery flight services</li>
            <li>We will facilitate communication between you and appropriate certified flight instructors or flight schools</li>
            <li>Final booking confirmation, scheduling, and service delivery are handled directly by the flight service provider</li>
          </ul>

          <h3 className="text-xl font-semibold mt-6 mb-3 text-blue-200">No Guarantee of Availability</h3>
          <p className="mb-4">Submitting a booking inquiry does not guarantee:</p>
          <ul className="list-disc pl-6 mb-4 space-y-1">
            <li>Availability of specific dates or times</li>
            <li>Availability of specific instructors or aircraft</li>
            <li>Specific pricing or rates</li>
          </ul>
          <p className="mb-6">
            All scheduling, availability, and pricing are determined by the individual flight instructors and flight schools.
          </p>

          <h2 className="text-2xl font-semibold mt-8 mb-4 text-white">5. Third-Party Service Providers</h2>

          <h3 className="text-xl font-semibold mt-6 mb-3 text-blue-200">Independent Contractors</h3>
          <p className="mb-4">
            All flight instructors and flight schools are independent third parties, not employees or agents of Discover Aviation! or Bravo Zulu Aviation LLC. We do not:
          </p>
          <ul className="list-disc pl-6 mb-4 space-y-1">
            <li>Control or supervise flight instruction</li>
            <li>Set curriculum or training standards</li>
            <li>Determine instructor qualifications beyond verifying certifications</li>
            <li>Control aircraft maintenance or operations</li>
          </ul>

          <h3 className="text-xl font-semibold mt-6 mb-3 text-blue-200">Your Relationship with Service Providers</h3>
          <p className="mb-4">
            Your agreement for flight training or discovery flights is directly with the flight instructor or flight school, not with us. You should:
          </p>
          <ul className="list-disc pl-6 mb-6 space-y-1">
            <li>Review all terms and conditions provided by the flight service provider</li>
            <li>Verify instructor certifications and qualifications</li>
            <li>Understand all costs and fees associated with flight services</li>
            <li>Comply with all safety requirements and regulations</li>
          </ul>

          <h2 className="text-2xl font-semibold mt-8 mb-4 text-white">6. Payment Terms</h2>

          <h3 className="text-xl font-semibold mt-6 mb-3 text-blue-200">Our Services</h3>
          <p className="mb-4">
            Any fees for our booking coordination or information services will be clearly disclosed and must be paid according to the terms specified at the time of booking.
          </p>

          <h3 className="text-xl font-semibold mt-6 mb-3 text-blue-200">Flight Services</h3>
          <p className="mb-6">
            Payment for actual flight training or discovery flights is made directly to the flight instructor or flight school according to their payment terms. We do not process payments for flight services unless explicitly stated otherwise.
          </p>

          <h2 className="text-2xl font-semibold mt-8 mb-4 text-white">7. Intellectual Property</h2>
          <p className="mb-4">
            All content on our website, including text, graphics, logos, images, and software, is the property of Bravo Zulu Aviation LLC or its licensors and is protected by copyright, trademark, and other intellectual property laws. You may not:
          </p>
          <ul className="list-disc pl-6 mb-6 space-y-1">
            <li>Reproduce, distribute, or create derivative works from our content without written permission</li>
            <li>Use our trademarks or logos without authorization</li>
            <li>Scrape or extract data from our website for commercial purposes</li>
          </ul>

          <h2 className="text-2xl font-semibold mt-8 mb-4 text-white">8. User Conduct</h2>
          <p className="mb-4">When using our website and services, you agree to:</p>
          <ul className="list-disc pl-6 mb-6 space-y-1">
            <li>Provide accurate and complete information</li>
            <li>Not engage in fraudulent or deceptive practices</li>
            <li>Not interfere with the operation of our website</li>
            <li>Not violate any applicable laws or regulations</li>
            <li>Not harass or harm other users or our staff</li>
            <li>Comply with all aviation safety regulations and requirements</li>
          </ul>

          <h2 className="text-2xl font-semibold mt-8 mb-4 text-white">9. Disclaimers</h2>

          <h3 className="text-xl font-semibold mt-6 mb-3 text-blue-200">Aviation Services Disclaimer</h3>
          <p className="mb-4">
            <strong>IMPORTANT:</strong> We do not provide flight instruction or operate aircraft. All aviation services are provided by third-party certified flight instructors and flight schools. We make no representations or warranties about:
          </p>
          <ul className="list-disc pl-6 mb-4 space-y-1">
            <li>The quality of flight instruction</li>
            <li>The safety or condition of aircraft</li>
            <li>The qualifications of instructors beyond basic certification verification</li>
            <li>The outcomes of flight training</li>
          </ul>

          <h3 className="text-xl font-semibold mt-6 mb-3 text-blue-200">General Disclaimer</h3>
          <p className="mb-4">
            Our website and services are provided "as is" without warranties of any kind, either express or implied, including but not limited to:
          </p>
          <ul className="list-disc pl-6 mb-4 space-y-1">
            <li>Merchantability</li>
            <li>Fitness for a particular purpose</li>
            <li>Non-infringement</li>
            <li>Accuracy or reliability of information</li>
          </ul>

          <h3 className="text-xl font-semibold mt-6 mb-3 text-blue-200">Medical and Safety</h3>
          <p className="mb-4">Flight training involves inherent risks. You should:</p>
          <ul className="list-disc pl-6 mb-6 space-y-1">
            <li>Consult with a physician before beginning flight training</li>
            <li>Ensure you meet all FAA medical requirements</li>
            <li>Disclose any medical conditions to flight instructors</li>
            <li>Follow all safety instructions and regulations</li>
          </ul>

          <h2 className="text-2xl font-semibold mt-8 mb-4 text-white">10. Limitation of Liability</h2>
          <p className="mb-4">To the fullest extent permitted by law:</p>

          <h3 className="text-xl font-semibold mt-6 mb-3 text-blue-200">Our Liability</h3>
          <p className="mb-4">
            Bravo Zulu Aviation LLC and Discover Aviation! shall not be liable for any indirect, incidental, special, consequential, or punitive damages, including but not limited to:
          </p>
          <ul className="list-disc pl-6 mb-4 space-y-1">
            <li>Personal injury or death arising from flight services</li>
            <li>Loss of data or profits</li>
            <li>Business interruption</li>
            <li>Any damages arising from third-party flight services</li>
          </ul>

          <h3 className="text-xl font-semibold mt-6 mb-3 text-blue-200">Maximum Liability</h3>
          <p className="mb-4">
            Our total liability for any claim arising from these Terms or our services shall not exceed the amount you paid to us (not including amounts paid to third-party flight service providers) in the 12 months preceding the claim.
          </p>

          <h3 className="text-xl font-semibold mt-6 mb-3 text-blue-200">Third-Party Services</h3>
          <p className="mb-6">
            We are not liable for any acts, errors, omissions, representations, warranties, breaches, or negligence of any third-party flight instructors or flight schools, or for any personal injuries, death, property damage, or other damages or expenses resulting from your interactions with them.
          </p>

          <h2 className="text-2xl font-semibold mt-8 mb-4 text-white">11. Indemnification</h2>
          <p className="mb-4">
            You agree to indemnify, defend, and hold harmless Bravo Zulu Aviation LLC, Discover Aviation!, and our officers, directors, employees, and agents from and against any claims, liabilities, damages, losses, and expenses, including reasonable attorneys' fees, arising out of or in any way connected with:
          </p>
          <ul className="list-disc pl-6 mb-6 space-y-1">
            <li>Your use of our website or services</li>
            <li>Your violation of these Terms</li>
            <li>Your participation in flight training or discovery flights</li>
            <li>Your violation of any law or regulation</li>
            <li>Your violation of any rights of another party</li>
          </ul>

          <h2 className="text-2xl font-semibold mt-8 mb-4 text-white">12. Privacy</h2>
          <p className="mb-6">
            Your use of our website and services is also governed by our Privacy Policy, available at https://www.flybyla.com/privacy. Please review our Privacy Policy to understand our practices regarding your personal information.
          </p>

          <h2 className="text-2xl font-semibold mt-8 mb-4 text-white">13. Termination</h2>
          <p className="mb-4">We reserve the right to:</p>
          <ul className="list-disc pl-6 mb-4 space-y-1">
            <li>Terminate or suspend your access to our website and services at any time</li>
            <li>Refuse service to anyone for any lawful reason</li>
            <li>Cancel or modify bookings if necessary</li>
          </ul>
          <p className="mb-6">You may discontinue using our services at any time.</p>

          <h2 className="text-2xl font-semibold mt-8 mb-4 text-white">14. Governing Law and Jurisdiction</h2>
          <p className="mb-6">
            These Terms are governed by and construed in accordance with the laws of the State of California, without regard to its conflict of law provisions. Any legal action or proceeding arising from these Terms shall be brought exclusively in the state or federal courts located in Los Angeles County, California.
          </p>

          <h2 className="text-2xl font-semibold mt-8 mb-4 text-white">15. Dispute Resolution</h2>
          <p className="mb-6">
            Before filing any legal action, you agree to attempt to resolve any dispute informally by contacting us at info@flybz.net. If a dispute cannot be resolved informally within 30 days, any resulting legal action must be resolved through final and binding arbitration, except that you may assert claims in small claims court if your claims qualify.
          </p>

          <h2 className="text-2xl font-semibold mt-8 mb-4 text-white">16. Changes to Terms</h2>
          <p className="mb-6">
            We may update these Terms from time to time. When we make changes, we will update the "Effective Date" at the top of these Terms. Your continued use of our website and services after changes are posted constitutes your acceptance of the updated Terms.
          </p>

          <h2 className="text-2xl font-semibold mt-8 mb-4 text-white">17. Severability</h2>
          <p className="mb-6">
            If any provision of these Terms is held to be invalid or unenforceable, the remaining provisions shall continue in full force and effect.
          </p>

          <h2 className="text-2xl font-semibold mt-8 mb-4 text-white">18. Entire Agreement</h2>
          <p className="mb-6">
            These Terms, together with our Privacy Policy and any other agreements you enter into with flight service providers, constitute the entire agreement between you and Bravo Zulu Aviation LLC regarding the use of our website and services.
          </p>

          <h2 className="text-2xl font-semibold mt-8 mb-4 text-white">19. No Waiver</h2>
          <p className="mb-6">
            Our failure to enforce any right or provision of these Terms shall not be considered a waiver of those rights.
          </p>

          <h2 className="text-2xl font-semibold mt-8 mb-4 text-white">20. Assignment</h2>
          <p className="mb-6">
            You may not assign or transfer your rights or obligations under these Terms without our prior written consent. We may assign our rights and obligations without restriction.
          </p>

          <h2 className="text-2xl font-semibold mt-8 mb-4 text-white">21. Contact Information</h2>
          <p className="mb-4">
            If you have any questions about these Terms and Conditions, please contact us at:
          </p>
          <div className="mb-6">
            <p><strong className="text-blue-200">Bravo Zulu Aviation LLC</strong></p>
            <p>dba Discover Aviation!</p>
            <p>3126 Pacific Coast Hwy #503</p>
            <p>Torrance, CA 90505</p>
            <p>Email: info@flybz.net</p>
          </div>

          <h2 className="text-2xl font-semibold mt-8 mb-4 text-white">22. Acknowledgment</h2>
          <p className="mb-8">
            By using our website and services, you acknowledge that you have read and understood these Terms and Conditions and agree to be bound by them.
          </p>
        </div>
      </div>
    </div>
  );
};