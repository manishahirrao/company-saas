import React from 'react';

const TermsPage: React.FC = () => {
  return (
    <div className="min-h-screen pt-16 bg-white py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Terms & Conditions</h1>
          <p className="text-gray-600">Effective Date: June 2025</p>
        </div>

        <div className="prose prose-lg max-w-none">
          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">1. Definitions</h2>
            <ul className="list-disc list-inside text-gray-700 space-y-2">
              <li><strong>“PostPilot”</strong> or “we”/“us”/“our”: The company providing the Services.</li>
              <li><strong>“User,” “You,” or “Your”</strong>: Anyone who visits or uses PostPilot.</li>
              <li><strong>“Professional User”</strong>: An individual using PostPilot features via LinkedIn OAuth.</li>
              <li><strong>“Company User”</strong>: An organization using PostPilot via email/password.</li>
              <li><strong>“Content”</strong>: Any material you upload or generate on PostPilot.</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">2. Eligibility</h2>
            <p className="text-gray-700">You must be at least 18 years old and authorized to form a binding contract in your jurisdiction.</p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">3. Account Registration & Security</h2>
            <p className="text-gray-700">Users register via LinkedIn OAuth or Email/Password depending on their user type. Keep your credentials secure. Notify us of unauthorized access immediately.</p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">4. Subscription Plans & Payment</h2>
            <p className="text-gray-700">Details Free, Pro, and Business tiers. Auto-renewal applies. No refunds unless required by law.</p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">5. User Content & License Grant</h2>
            <p className="text-gray-700">You retain ownership. We receive a license to use it only for delivering Services.</p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">6. Acceptable Use Policy</h2>
            <p className="text-gray-700">You must not reverse-engineer, scrape, or abuse the AI or API. Violations may result in suspension.</p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">7. Free Job Postings & Hiring Outsourcing</h2>
            <p className="text-gray-700">Companies may post jobs and use hiring packages subject to SLAs. We work with recruiters but don’t guarantee hires.</p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">8. AI Video & Graphic Generation</h2>
            <p className="text-gray-700">Company users can create videos and graphics using third-party APIs. Must own all assets used.</p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">9. Analytics & Reporting</h2>
            <p className="text-gray-700">We provide metrics through LinkedIn APIs, where available. Accuracy is not guaranteed.</p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">10. Intellectual Property</h2>
            <p className="text-gray-700">PostPilot owns its branding and UI. User feedback may be used without attribution.</p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">11. Privacy & Data Protection</h2>
            <p className="text-gray-700">Subject to our Privacy Policy. Continued use implies consent to data practices.</p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">12. Security</h2>
            <p className="text-gray-700">We implement safeguards, but no method is fully secure. Protect your own credentials.</p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">13. Disclaimer of Warranties</h2>
            <p className="text-gray-700">Services are provided “as-is.” We do not guarantee accuracy or uptime.</p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">14. Limitation of Liability</h2>
            <p className="text-gray-700">We are not liable for indirect or consequential damages. Our liability is limited to fees paid in the last 6 months or $100.</p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">15. Indemnification</h2>
            <p className="text-gray-700">You agree to hold PostPilot harmless from any legal issues resulting from your actions.</p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">16. Termination</h2>
            <p className="text-gray-700">We may suspend or terminate your account for violations. You may delete your account anytime.</p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">17. Governing Law & Dispute Resolution</h2>
            <p className="text-gray-700">Subject to local laws and resolved via arbitration in [City, Country].</p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">18. Changes to These Terms</h2>
            <p className="text-gray-700">We may update these terms. Continued use implies acceptance of changes.</p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">19. Contact Us</h2>
            <p className="text-gray-700">If you have any questions about these Terms, contact us at:</p>
            <div className="bg-gray-50 p-4 rounded-lg">
              <p className="text-gray-700">Email: legal@postpilot.com</p>
              <p className="text-gray-700">Address: Delhi, India</p>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default TermsPage;