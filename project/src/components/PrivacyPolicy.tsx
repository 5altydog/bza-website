import React from 'react';
import { ArrowLeft } from 'lucide-react';

export const PrivacyPolicy: React.FC = () => {
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
          <h1 className="text-4xl font-bold mb-6 text-white">Privacy Policy</h1>
          
          <p className="text-lg mb-4"><strong>Effective Date: January 1, 2025</strong></p>
          <p className="text-lg mb-6"><strong>Last Updated: January 1, 2025</strong></p>

          <p className="mb-6">
            This Privacy Policy describes how Discover Aviation!, operated by Bravo Zulu Aviation LLC ("we," "us," "our," or the "Company"), collects, uses, and shares information about you when you visit our website at https://www.flybyla.com or interact with our services.
          </p>

          <h2 className="text-2xl font-semibold mt-8 mb-4 text-white">1. Information We Collect</h2>

          <h3 className="text-xl font-semibold mt-6 mb-3 text-blue-200">Information You Provide to Us</h3>
          <p className="mb-4">
            When you fill out a booking inquiry form, contact form, or otherwise interact with our website, we may collect personal information that you provide, including:
          </p>
          <ul className="list-disc pl-6 mb-4 space-y-1">
            <li>Name</li>
            <li>Email address</li>
            <li>Phone number</li>
            <li>Flight training interests and preferences</li>
            <li>Scheduling preferences</li>
            <li>Any other information you choose to provide in connection with flight training or discovery flight inquiries</li>
          </ul>

          <h3 className="text-xl font-semibold mt-6 mb-3 text-blue-200">Information Collected Automatically</h3>
          <p className="mb-4">
            We may also collect certain information automatically when you visit our website, including:
          </p>
          <ul className="list-disc pl-6 mb-4 space-y-1">
            <li>IP address</li>
            <li>Browser type and version</li>
            <li>Operating system</li>
            <li>Referring URLs</li>
            <li>Pages viewed on our website</li>
            <li>Links clicked</li>
            <li>Date and time of your visit</li>
            <li>Device information</li>
          </ul>
          <p className="mb-6">
            This information is collected automatically through cookies, web beacons, or similar tracking technologies (see Section 5 below).
          </p>

          <h2 className="text-2xl font-semibold mt-8 mb-4 text-white">2. How We Use Your Information</h2>
          <p className="mb-4">We use the information we collect for the following purposes:</p>
          
          <p className="mb-4">
            <strong className="text-blue-200">Booking and Service Coordination.</strong> To process your flight training and discovery flight inquiries, coordinate bookings with certified flight instructors and Part 61 flight schools, and facilitate scheduling of your aviation services.
          </p>
          
          <p className="mb-4">
            <strong className="text-blue-200">Communication.</strong> To respond to your inquiries, send booking confirmations, provide updates about your scheduled flights, and communicate important information about aviation services.
          </p>
          
          <p className="mb-4">
            <strong className="text-blue-200">Marketing.</strong> To send you information about flight training opportunities, discovery flights, aviation events, and promotional offers related to our services (with your consent where required).
          </p>
          
          <p className="mb-4">
            <strong className="text-blue-200">Website Improvement.</strong> To analyze how our website is used, improve user experience, and enhance our booking and information services.
          </p>
          
          <p className="mb-6">
            <strong className="text-blue-200">Legal Compliance.</strong> To comply with applicable laws, regulations, or legal processes, and to protect our business interests and legal rights.
          </p>

          <h2 className="text-2xl font-semibold mt-8 mb-4 text-white">3. How We Share Your Information</h2>
          <p className="mb-4">
            We do not sell or rent your personal information to third parties. We may share your information in the following circumstances:
          </p>
          
          <p className="mb-4">
            <strong className="text-blue-200">Flight Service Providers.</strong> We share necessary booking information with certified flight instructors and Part 61 flight schools who will be providing your flight training or discovery flight services.
          </p>
          
          <p className="mb-4">
            <strong className="text-blue-200">Service Providers.</strong> We may share information with third-party vendors who help us operate our website and business (e.g., email service providers, website hosting, analytics providers, booking management systems).
          </p>
          
          <p className="mb-4">
            <strong className="text-blue-200">Business Transfers.</strong> If Bravo Zulu Aviation LLC merges with or is acquired by another company, or if we sell or transfer our business assets, user information may be transferred as part of that transaction.
          </p>
          
          <p className="mb-4">
            <strong className="text-blue-200">Legal Requirements.</strong> We may disclose your information if required to do so by law or in response to valid requests by public authorities (e.g., a court, government agency, or aviation regulatory body).
          </p>
          
          <p className="mb-6">
            <strong className="text-blue-200">Safety and Protection.</strong> We may share information when necessary to protect the safety, rights, or property of our company, our users, or others.
          </p>

          <h2 className="text-2xl font-semibold mt-8 mb-4 text-white">4. Data Security</h2>
          <p className="mb-6">
            We implement appropriate technical and organizational security measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction. However, no method of data transmission or storage can be guaranteed to be 100% secure. While we strive to use commercially acceptable means to protect your personal information, we cannot guarantee absolute security.
          </p>

          <h2 className="text-2xl font-semibold mt-8 mb-4 text-white">5. Cookies and Tracking Technologies</h2>
          <p className="mb-4">
            We use cookies and similar tracking technologies to enhance your experience on our website. Cookies are small data files placed on your device that allow us to:
          </p>
          <ul className="list-disc pl-6 mb-4 space-y-1">
            <li>Remember your preferences and settings</li>
            <li>Improve website functionality and security</li>
            <li>Analyze website traffic and usage patterns</li>
            <li>Understand which pages and features are most popular</li>
          </ul>
          <p className="mb-6">
            You can control cookies through your browser settings. If you choose to disable cookies, some features of our website may not function properly.
          </p>

          <h2 className="text-2xl font-semibold mt-8 mb-4 text-white">6. Third-Party Links and Services</h2>
          <p className="mb-6">
            Our website may contain links to third-party websites, including flight schools, aviation organizations, or other aviation-related services. These third parties have their own privacy policies, and we encourage you to review them. We are not responsible for the privacy practices or content of such third-party sites.
          </p>

          <h2 className="text-2xl font-semibold mt-8 mb-4 text-white">7. Data Retention</h2>
          <p className="mb-6">
            We retain your personal information only for as long as necessary to fulfill the purposes for which it was collected, including to provide our services, comply with legal obligations, resolve disputes, and enforce our agreements. When retention is no longer necessary, we will securely dispose of your personal information.
          </p>

          <h2 className="text-2xl font-semibold mt-8 mb-4 text-white">8. Your Rights and Choices</h2>
          <p className="mb-4">
            Depending on your location, you may have certain rights regarding your personal information:
          </p>
          
          <p className="mb-4">
            <strong className="text-blue-200">Access.</strong> You can request a copy of the personal information we hold about you.
          </p>
          
          <p className="mb-4">
            <strong className="text-blue-200">Correction.</strong> You can request that we correct inaccurate or incomplete information about you.
          </p>
          
          <p className="mb-4">
            <strong className="text-blue-200">Deletion.</strong> You can request that we delete your personal information under certain circumstances.
          </p>
          
          <p className="mb-4">
            <strong className="text-blue-200">Opt-out of Marketing.</strong> You can opt out of marketing communications at any time by clicking the "Unsubscribe" link in our emails or by contacting us at info@flybz.net.
          </p>
          
          <p className="mb-6">
            To exercise any of these rights, please contact us using the information provided below.
          </p>

          <h2 className="text-2xl font-semibold mt-8 mb-4 text-white">9. Children's Privacy</h2>
          <p className="mb-6">
            Our services are not directed to individuals under the age of 13. We do not knowingly collect personal information from children under 13. If you are a parent or guardian and believe your child has provided personal information to us without your consent, please contact us at info@flybz.net, and we will take steps to delete such information.
          </p>

          <h2 className="text-2xl font-semibold mt-8 mb-4 text-white">10. California Privacy Rights</h2>
          <p className="mb-6">
            If you are a California resident, you may have additional rights under the California Consumer Privacy Act (CCPA). For more information about your rights and how to exercise them, please contact us using the information below.
          </p>

          <h2 className="text-2xl font-semibold mt-8 mb-4 text-white">11. Updates to This Privacy Policy</h2>
          <p className="mb-6">
            We may update this Privacy Policy from time to time to reflect changes in our practices or for legal, operational, or regulatory reasons. When we make changes, we will update the "Last Updated" date at the top of this policy. We encourage you to review this Privacy Policy periodically.
          </p>

          <h2 className="text-2xl font-semibold mt-8 mb-4 text-white">12. Important Disclaimers</h2>
          <p className="mb-6">
            Discover Aviation! and Bravo Zulu Aviation LLC are not flight schools. We provide informational, marketing, and booking coordination services only. All flight training and discovery flights are conducted by certified flight instructors operating under Part 61 flight schools. We facilitate connections between interested individuals and qualified aviation service providers.
          </p>

          <h2 className="text-2xl font-semibold mt-8 mb-4 text-white">13. Contact Us</h2>
          <p className="mb-4">
            If you have any questions or concerns about this Privacy Policy or our data practices, please contact us at:
          </p>
          <div className="mb-6">
            <p><strong className="text-blue-200">Bravo Zulu Aviation LLC</strong></p>
            <p>dba Discover Aviation!</p>
            <p>3126 Pacific Coast Hwy #503</p>
            <p>Torrance, CA 90505</p>
            <p>Email: info@flybz.net</p>
          </div>
          <p className="mb-8">
            We will make our best effort to address your concerns and requests promptly.
          </p>
        </div>
      </div>
    </div>
  );
};