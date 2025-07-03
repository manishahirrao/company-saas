import React from 'react';

const TermsOfService = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold mb-8">Terms of Service</h1>
      
      <div className="prose max-w-none">
        <p className="text-gray-600 mb-6">Last updated: March 1, 2025</p>
        
        <div className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">1. Acceptance of Terms</h2>
          <p className="mb-4">
            By accessing or using our services, you agree to be bound by these Terms of Service and all terms incorporated by reference. If you do not agree to these Terms, you may not access or use our services.
          </p>
        </div>
        
        <div className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">2. Description of Service</h2>
          <p className="mb-4">
            Our service provides a platform that allows users to [brief description of your service's main functionality]. The service is provided "as is" and we make no representations or warranties of any kind, express or implied, as to the operation of the service or the information, content, materials, or products included on the service.
          </p>
        </div>
        
        <div className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">3. User Accounts</h2>
          <p className="mb-4">To access certain features of the service, you may be required to create an account. When creating an account, you agree to:</p>
          <ul className="list-disc pl-6 mb-4 space-y-2">
            <li>Provide accurate, current, and complete information</li>
            <li>Maintain and promptly update your account information</li>
            <li>Maintain the security of your account credentials</li>
            <li>Be responsible for all activities that occur under your account</li>
            <li>Immediately notify us of any unauthorized use of your account</li>
          </ul>
        </div>
        
        <div className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">4. User Conduct</h2>
          <p className="mb-4">You agree not to use the service to:</p>
          <ul className="list-disc pl-6 mb-4 space-y-2">
            <li>Violate any laws or regulations</li>
            <li>Infringe the intellectual property rights of others</li>
            <li>Transmit any viruses, worms, defects, or other harmful content</li>
            <li>Interfere with or disrupt the service or servers</li>
            <li>Harass, abuse, or harm another person</li>
            <li>Collect or store personal data about other users</li>
          </ul>
        </div>
        
        <div className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">5. Payments and Billing</h2>
          <p className="mb-4">
            Certain aspects of the service may be provided for a fee or other charge. All fees are in [currency] and are non-refundable unless otherwise stated. We may change the fees for any feature of the service, including additional fees or charges, at any time with notice.
          </p>
        </div>
        
        <div className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">6. Termination</h2>
          <p className="mb-4">
            We may terminate or suspend your account and bar access to the service immediately, without prior notice or liability, under our sole discretion, for any reason whatsoever and without limitation, including but not limited to a breach of the Terms.
          </p>
        </div>
        
        <div className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">7. Limitation of Liability</h2>
          <p className="mb-4">
            In no event shall we be liable for any indirect, incidental, special, consequential, or punitive damages, including without limitation, loss of profits, data, use, goodwill, or other intangible losses, resulting from your access to or use of or inability to access or use the service.
          </p>
        </div>
        
        <div className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">8. Changes to Terms</h2>
          <p className="mb-4">
            We reserve the right, at our sole discretion, to modify or replace these Terms at any time. We will provide notice of any changes by posting the new Terms on this page and updating the "Last updated" date.
          </p>
        </div>
        
        <div className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">9. Contact Us</h2>
          <p className="mb-4">
            If you have any questions about these Terms, please contact us at:
          </p>
          <p>
            Email: legal@example.com<br />
            Address: 123 Business Street, City, Country
          </p>
        </div>
      </div>
    </div>
  );
};

export default TermsOfService;
