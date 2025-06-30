import React from 'react';
import { Zap,Copy } from 'lucide-react';

const AdsCopyAI = () => (
  <div className="max-w-4xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
    <header className="mb-8">
      <h1 className="text-3xl font-bold text-gray-900">Ads Copy AI</h1>
      <p className="text-gray-500">Create high-converting ad copy for all platforms</p>
    </header>

    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Campaign Details</h3>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Platform</label>
            <select className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
              <option>Google Ads</option>
              <option>Facebook Ads</option>
              <option>Instagram Ads</option>
              <option>LinkedIn Ads</option>
              <option>Twitter Ads</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Product/Service</label>
            <input
              type="text"
              placeholder="Describe your product or service..."
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Target Audience</label>
            <input
              type="text"
              placeholder="Who are you targeting..."
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Goal</label>
            <select className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
              <option>Brand Awareness</option>
              <option>Lead Generation</option>
              <option>Sales Conversion</option>
              <option>App Downloads</option>
              <option>Website Traffic</option>
            </select>
          </div>
          <button className="w-full bg-blue-500 text-white font-semibold py-3 px-6 rounded-lg hover:bg-blue-600 transition-colors flex items-center justify-center">
            <Zap className="h-5 w-5 mr-2" />
            Generate Ad Copy
          </button>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Generated Ad Copies</h3>
        <div className="space-y-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="border border-gray-200 rounded-lg p-4">
              <div className="flex justify-between items-start mb-2">
                <h4 className="font-semibold text-gray-900">Option {i}</h4>
                <button className="text-gray-400 hover:text-gray-600">
                  <Copy className="h-4 w-4" />
                </button>
              </div>
              <div className="text-sm text-gray-600 mb-2">
                <strong>Headline:</strong> Ready for your ad headline...
              </div>
              <div className="text-sm text-gray-600">
                <strong>Description:</strong> Your compelling ad description will appear here...
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  </div>
);
export default AdsCopyAI;
