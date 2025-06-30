import React from 'react';
import { TrendingUp,FileText } from 'lucide-react';

const SEOBlogPage = () => (
  <div className="space-y-8">
    <header className="flex justify-between items-center">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">SEO Blog Writer</h1>
        <p className="text-gray-500">Create SEO-optimized blog content</p>
      </div>
      <button className="bg-green-500 text-white px-6 py-2 rounded-lg hover:bg-green-600 transition-colors flex items-center">
        <FileText className="h-4 w-4 mr-2" />
        New Article
      </button>
    </header>

    <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
      <div className="lg:col-span-3">
        <div className="bg-white border border-gray-200 rounded-xl p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Primary Keyword</label>
              <input 
                type="text" 
                placeholder="Enter target keyword..."
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Article Length</label>
              <select className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent">
                <option>800-1200 words</option>
                <option>1200-1800 words</option>
                <option>1800+ words</option>
              </select>
            </div>
          </div>
          
          <div className="mt-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">Article Title</label>
            <input 
              type="text" 
              placeholder="AI will generate a title based on your keyword..."
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
            />
          </div>
          
          <div className="mt-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">Article Outline</label>
            <div className="border border-gray-300 rounded-lg p-4 bg-gray-50 min-h-32">
              <p className="text-gray-500 text-sm">AI will generate an SEO-optimized outline here...</p>
            </div>
          </div>
          
          <div className="mt-6 flex gap-4">
            <button className="bg-green-500 text-white px-6 py-2 rounded-lg hover:bg-green-600 transition-colors flex items-center">
              <TrendingUp className="h-4 w-4 mr-2" />
              Generate SEO Content
            </button>
            <button className="border border-gray-300 text-gray-700 px-6 py-2 rounded-lg hover:bg-gray-50 transition-colors">
              Save Draft
            </button>
          </div>
        </div>
      </div>
      
      <div className="space-y-6">
        <div className="bg-white border border-gray-200 rounded-xl p-6">
          <h3 className="text-lg font-semibold mb-4">SEO Score</h3>
          <div className="text-center">
            <div className="text-3xl font-bold text-green-500">85</div>
            <p className="text-sm text-gray-500">Optimization Score</p>
          </div>
          <div className="mt-4 space-y-2">
            <div className="flex justify-between text-sm">
              <span>Keyword Density</span>
              <span className="text-green-500">Good</span>
            </div>
            <div className="flex justify-between text-sm">
              <span>Readability</span>
              <span className="text-yellow-500">Average</span>
            </div>
            <div className="flex justify-between text-sm">
              <span>Meta Description</span>
              <span className="text-red-500">Missing</span>
            </div>
          </div>
        </div>
        
        <div className="bg-white border border-gray-200 rounded-xl p-6">
          <h3 className="text-lg font-semibold mb-4">Keyword Research</h3>
          <div className="space-y-3">
            <div className="p-3 bg-gray-50 rounded-lg">
              <p className="text-sm font-medium">AI marketing tools</p>
              <p className="text-xs text-gray-500">Volume: 2.4k/month</p>
            </div>
            <div className="p-3 bg-gray-50 rounded-lg">
              <p className="text-sm font-medium">Machine learning content</p>
              <p className="text-xs text-gray-500">Volume: 1.8k/month</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
);
export default SEOBlogPage;