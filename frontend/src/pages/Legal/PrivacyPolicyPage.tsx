import React from 'react';

const PrivacyPolicyPage: React.FC = () => {
  return (
    <div className="min-h-screen pt-16 bg-white py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Privacy Policy</h1>
          <p className="text-gray-600">Last Updated: June 2025</p>
        </div>

        <div className="prose prose-lg max-w-none">
          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">1. Introduction</h2>
            <p className="text-gray-700">
              PostPilot (“we,” “our,” or “us”) is committed to protecting your privacy. This Privacy Policy describes how we collect, use, disclose, and protect your personal information when you access or use our services, including the PostPilot website, web application, and APIs (“Service”).
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">2. Information We Collect</h2>
            <p className="text-gray-700 font-medium">A. Information You Provide:</p>
            <ul className="list-disc list-inside text-gray-700 space-y-2">
              <li>Account data via LinkedIn OAuth or email/password</li>
              <li>Profile information such as resumes or company data</li>
              <li>Content like posts, job descriptions, and form entries</li>
              <li>Support chats and AI interactions</li>
            </ul>
            <p className="text-gray-700 font-medium mt-4">B. Automatically Collected:</p>
            <ul className="list-disc list-inside text-gray-700 space-y-2">
              <li>Device data (browser, IP address, OS)</li>
              <li>Log data and feature usage</li>
              <li>Cookies and tracking technologies</li>
            </ul>
            <p className="text-gray-700 font-medium mt-4">C. Third-Party Sources:</p>
            <ul className="list-disc list-inside text-gray-700 space-y-2">
              <li>LinkedIn for profile enrichment</li>
              <li>Job APIs like Adzuna, Indeed</li>
              <li>Payment services like Stripe</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">3. How We Use Your Information</h2>
            <ul className="list-disc list-inside text-gray-700 space-y-2">
              <li>Provide, maintain, and improve our services</li>
              <li>Respond to inquiries and support requests</li>
              <li>Personalize your experience</li>
              <li>Ensure legal compliance and prevent fraud</li>
              <li>Analytics and product development</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">4. Legal Bases for Processing</h2>
            <p className="text-gray-700">
              We process your data based on your consent, our contractual obligations, legitimate interests, and legal requirements.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">5. Sharing of Information</h2>
            <ul className="list-disc list-inside text-gray-700 space-y-2">
              <li>With trusted service providers (e.g., hosting, analytics)</li>
              <li>In business transfers such as mergers</li>
              <li>When required by law or court order</li>
              <li>For aggregated or anonymized analytics</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">6. Data Retention</h2>
            <p className="text-gray-700">
              We retain your data as long as necessary to fulfill the purposes outlined here, including legal or regulatory requirements. Inactive accounts may be deleted after 90 days of inactivity.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">7. Security Measures</h2>
            <p className="text-gray-700">
              We use SSL encryption, role-based access control, hashed passwords, and monitoring systems to secure your information. However, no system is completely secure.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">8. Your Rights</h2>
            <ul className="list-disc list-inside text-gray-700 space-y-2">
              <li>Access, correct, or delete your data</li>
              <li>Withdraw consent or restrict processing</li>
              <li>Data portability (where applicable)</li>
            </ul>
            <p className="text-gray-700 mt-4">
              Contact us at <a href="mailto:privacy@postpilot.com" className="text-blue-600 underline">privacy@postpilot.com</a> for requests or complaints.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">9. Children’s Privacy</h2>
            <p className="text-gray-700">
              Our services are not directed to individuals under 18. If we learn we’ve collected data from a child, we will delete it immediately.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">10. International Transfers</h2>
            <p className="text-gray-700">
              Your data may be transferred to and stored in countries outside your own. We ensure such transfers comply with applicable laws using standard contractual clauses and encryption.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">11. Third-Party Services</h2>
            <p className="text-gray-700">
              Our services may contain links to external sites. We are not responsible for their privacy practices. Review their policies before interacting.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">12. Updates to This Policy</h2>
            <p className="text-gray-700">
              We may revise this policy to reflect changes in our practices or legal obligations. Updates will appear here with a new effective date.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">13. Contact Us</h2>
            <div className="bg-gray-50 p-4 rounded-lg">
              <p className="text-gray-700">Email: <a href="mailto:privacy@postpilot.com" className="text-blue-600 underline">privacy@postpilot.com</a></p>
              <p className="text-gray-700">Address: Delhi, India</p>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicyPage;
