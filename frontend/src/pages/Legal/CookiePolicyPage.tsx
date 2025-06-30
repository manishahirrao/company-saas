import React from 'react';

const CookiePolicyPage: React.FC = () => {
  return (
    <div className="min-h-screen pt-16 bg-white py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Cookies Policy</h1>
          <p className="text-gray-600">Last Updated: June 2025</p>
        </div>

        <div className="prose prose-lg max-w-none">
          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">1. Introduction</h2>
            <p className="text-gray-700">
              PostPilot (“we,” “our,” or “us”) uses cookies and similar tracking technologies on our website and web application (“Service”). This Cookies Policy explains what cookies are, how we use them, and your choices regarding cookies when you visit https://www.postpilot.com (or your domain).
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">2. What Are Cookies?</h2>
            <p className="text-gray-700">
              Cookies are small text files placed on your device (computer, tablet, or mobile) when you visit a website. They help websites remember your preferences and improve user experience. Cookies may be "session" (deleted when you close your browser) or "persistent" (remain for a specified period).
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">3. How We Use Cookies</h2>
            <p className="text-gray-700 mb-4">We may set cookies under the following categories:</p>
            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-medium text-gray-900">Essential Cookies</h3>
                <p className="text-gray-700">Enable core website functionality (e.g., account login, Navbar, retaining session identifiers).</p>
                <div className="text-sm text-gray-600">Examples: “session_id” (keeps you logged in while navigating between pages).</div>
              </div>
              <div>
                <h3 className="text-xl font-medium text-gray-900">Performance & Analytics Cookies</h3>
                <p className="text-gray-700">Collect anonymous data to help us optimize the site and services.</p>
                <div className="text-sm text-gray-600">Examples: Google Analytics (“_ga,” “_gid”), PostPilot analytics cookies. Data: IP (anonymized), pages visited, time spent, etc.</div>
              </div>
              <div>
                <h3 className="text-xl font-medium text-gray-900">Functional Cookies</h3>
                <p className="text-gray-700">Remember your preferences such as language, UI theme, and chat history.</p>
                <div className="text-sm text-gray-600">Examples: “preferred_language,” “chat_widget_open.”</div>
              </div>
              <div>
                <h3 className="text-xl font-medium text-gray-900">Targeting/Advertising Cookies</h3>
                <p className="text-gray-700">Used to show relevant ads or measure ad campaign performance.</p>
                <div className="text-sm text-gray-600">Examples: LinkedIn Insight, Facebook Pixel. Data: Device ID, browsing behavior across websites.</div>
              </div>
            </div>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">4. Third-Party Cookies</h2>
            <p className="text-gray-700">
              We may permit service providers like Google Analytics, LinkedIn Insight, Stripe, or Mixpanel to place cookies. These third parties have their own privacy and cookie policies. We do not control their cookie placement or use.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">5. Your Cookie Choices</h2>
            <p className="text-gray-700">Most browsers allow you to manage or delete cookies. You can:</p>
            <ul className="list-disc list-inside text-gray-700 space-y-2">
              <li>Accept or reject cookies via browser settings.</li>
              <li>Delete existing cookies using browser tools.</li>
              <li>Enable “Do Not Track” (we will attempt to disable non-essential cookies).</li>
            </ul>
            <p className="text-gray-700 mt-4">
              Note: Blocking essential cookies may prevent access to features like logging in, using the AI Chatbot, or scheduling posts.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">6. How to Manage Cookies in Your Browser</h2>
            <ul className="list-disc list-inside text-gray-700 space-y-2">
              <li><strong>Chrome:</strong> Settings → Privacy & security → Cookies and other site data</li>
              <li><strong>Firefox:</strong> Preferences → Privacy & Security → Cookies and Site Data</li>
              <li><strong>Safari (macOS):</strong> Preferences → Privacy → Manage Website Data</li>
              <li><strong>Edge:</strong> Settings → Cookies and site permissions → Manage and delete cookies</li>
            </ul>
            <p className="text-gray-700 mt-4">Refer to your browser’s help section for detailed instructions.</p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">7. Changes to This Cookies Policy</h2>
            <p className="text-gray-700">
              We may update this policy due to changes in technology, the cookies we use, or legal requirements. Any changes will be reflected on this page with a new "Last Updated" date. Continued use of the Service implies your acceptance of the updated policy.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">8. Contact Us</h2>
            <p className="text-gray-700">If you have any questions about our use of cookies, contact us at:</p>
            <div className="bg-gray-50 p-4 rounded-lg">
              <p className="text-gray-700">Email: <a href="mailto:email@example.com" className="text-blue-600 underline">email@example.com</a></p>
              <p className="text-gray-700">Address: Delhi, India</p>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default CookiePolicyPage;
