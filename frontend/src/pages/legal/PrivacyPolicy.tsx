import React from 'react';

const PrivacyPolicy = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold mb-8">Privacy Policy</h1>
      
      <div className="prose max-w-none">
        <p className="text-gray-600 mb-6">Last updated: March 1, 2025</p>
        
        <div className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">1. Introduction</h2>
          <p className="mb-4">
            At our company, we respect your privacy and are committed to protecting your personal data. This privacy policy will inform you about how we look after your personal data when you visit our website and tell you about your privacy rights and how the law protects you.
          </p>
        </div>
        
        <div className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">2. Information We Collect</h2>
          <p className="mb-4">We may collect, use, store, and transfer different kinds of personal data about you which we have grouped together as follows:</p>
          <ul className="list-disc pl-6 mb-4 space-y-2">
            <li>Identity Data includes first name, last name, username or similar identifier.</li>
            <li>Contact Data includes billing address, email address, and telephone numbers.</li>
            <li>Technical Data includes internet protocol (IP) address, browser type and version, time zone setting and location, browser plug-in types and versions, operating system and platform, and other technology on the devices you use to access this website.</li>
            <li>Usage Data includes information about how you use our website, products, and services.</li>
          </ul>
        </div>
        
        <div className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">3. How We Use Your Data</h2>
          <p className="mb-4">We will only use your personal data when the law allows us to. Most commonly, we will use your personal data in the following circumstances:</p>
          <ul className="list-disc pl-6 mb-4 space-y-2">
            <li>To register you as a new customer</li>
            <li>To process and deliver your order</li>
            <li>To manage our relationship with you</li>
            <li>To enable you to participate in a prize draw, competition, or complete a survey</li>
            <li>To administer and protect our business and this website</li>
            <li>To deliver relevant website content and advertisements to you</li>
          </ul>
        </div>
        
        <div className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">4. Data Security</h2>
          <p className="mb-4">
            We have put in place appropriate security measures to prevent your personal data from being accidentally lost, used, or accessed in an unauthorized way, altered, or disclosed. In addition, we limit access to your personal data to those employees, agents, contractors, and other third parties who have a business need to know.
          </p>
        </div>
        
        <div className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">5. Your Legal Rights</h2>
          <p className="mb-4">Under certain circumstances, you have rights under data protection laws in relation to your personal data, including the right to:</p>
          <ul className="list-disc pl-6 mb-4 space-y-2">
            <li>Request access to your personal data</li>
            <li>Request correction of your personal data</li>
            <li>Request erasure of your personal data</li>
            <li>Object to processing of your personal data</li>
            <li>Request restriction of processing your personal data</li>
            <li>Request transfer of your personal data</li>
            <li>Right to withdraw consent</li>
          </ul>
        </div>
        
        <div className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">6. Contact Us</h2>
          <p className="mb-4">
            If you have any questions about this privacy policy or our privacy practices, please contact us at:
          </p>
          <p>
            Email: privacy@example.com<br />
            Address: 123 Business Street, City, Country
          </p>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
