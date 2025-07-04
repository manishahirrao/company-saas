import React, { useState, Suspense } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Loader2, ChevronRight, Sparkles } from 'lucide-react';

// Lazy load the ad forms for better performance
const GoogleAdsForm = React.lazy(() => import('../Ads/GoogleAds'));
const MetaAdsForm = React.lazy(() => import('../Ads/MetaAds'));
const LinkedInAdsForm = React.lazy(() => import('../Ads/LinkedInAds'));
const YouTubeAdsForm = React.lazy(() => import('../Ads/YouTubeAds'));

// Tab data
const tabs = [
  { 
    name: 'Google Ads', 
    icon: 'G',
    color: 'from-blue-500 to-blue-600',
    component: <GoogleAdsForm /> 
  },
  { 
    name: 'Meta Ads', 
    icon: 'M',
    color: 'from-indigo-500 to-purple-600',
    component: <MetaAdsForm /> 
  },
  { 
    name: 'LinkedIn Ads', 
    icon: 'Li',
    color: 'from-blue-400 to-blue-600',
    component: <LinkedInAdsForm /> 
  },
  { 
    name: 'YouTube Ads', 
    icon: 'YT',
    color: 'from-red-500 to-red-600',
    component: <YouTubeAdsForm /> 
  },
];

// Loading component for suspense fallback
const LoadingSkeleton = () => (
  <div className="w-full h-64 flex items-center justify-center">
    <Loader2 className="h-8 w-8 animate-spin text-primary" />
    <span className="sr-only">Loading...</span>
  </div>
);

const AdsForm = () => {
  const [activeTab, setActiveTab] = useState(tabs[0].name);
  const [isHovered, setIsHovered] = useState('');

  const activeTabData = tabs.find(tab => tab.name === activeTab);

  return (
    <div className="h-full w-full overflow-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center mb-2">
            <h1 className="text-2xl font-bold text-foreground">AI Ad Generator</h1>
            <ChevronRight className="mx-2 text-muted-foreground" />
            <span className="text-muted-foreground">{activeTab}</span>
          </div>
          <p className="text-muted-foreground max-w-3xl">
            Create high-converting ads for different platforms with AI assistance. 
            Select a platform below to get started.
          </p>
        </div>

        {/* Platform Selection */}
        <div className="mb-8">
          <div className="flex flex-wrap gap-3 mb-6">
            {tabs.map((tab) => {
              const isActive = activeTab === tab.name;
              return (
                <button
                  key={tab.name}
                  onClick={() => setActiveTab(tab.name)}
                  onMouseEnter={() => setIsHovered(tab.name)}
                  onMouseLeave={() => setIsHovered('')}
                  className={`relative px-6 py-3 rounded-lg font-medium transition-all duration-200 flex items-center space-x-2
                    ${isActive 
                      ? `bg-gradient-to-r ${tab.color} text-white shadow-lg` 
                      : 'bg-card hover:bg-accent text-muted-foreground hover:text-foreground border border-border'}`}
                >
                  <span className={`w-8 h-8 rounded-full flex items-center justify-center font-bold
                    ${isActive ? 'bg-white/20' : 'bg-accent'}`}>
                    {tab.icon}
                  </span>
                  <span>{tab.name}</span>
                  
                  {/* Hover effect */}
                  {!isActive && isHovered === tab.name && (
                    <motion.span 
                      className="absolute inset-0 bg-gradient-to-r from-transparent to-white/10 rounded-lg"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.2 }}
                    />
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Tab Content */}
        <div className="bg-card rounded-xl shadow-sm border border-border overflow-hidden">
          <div className="p-1 bg-gradient-to-r from-primary/5 to-transparent">
            <div className="flex items-center px-4 py-2">
              <div className="flex space-x-2">
                <div className="w-3 h-3 rounded-full bg-red-400"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
                <div className="w-3 h-3 rounded-full bg-green-400"></div>
              </div>
              <div className="ml-4 text-sm font-mono text-muted-foreground">
                {activeTab} Generator
              </div>
            </div>
          </div>
          
          <div className="p-6 md:p-8">
            <Suspense fallback={<LoadingSkeleton />}>
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeTab}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                >
                  {activeTabData?.component}
                </motion.div>
              </AnimatePresence>
            </Suspense>
          </div>
        </div>

        {/* Quick Tips */}
        <div className="mt-8 p-6 bg-muted/30 rounded-xl border border-border">
          <div className="flex items-start">
            <div className="p-2 bg-primary/10 rounded-lg mr-4">
              <Sparkles className="h-5 w-5 text-primary" />
            </div>
            <div>
              <h3 className="font-medium text-foreground mb-1">Pro Tip</h3>
              <p className="text-sm text-muted-foreground">
                For best results, provide clear details about your target audience and key selling points. 
                The AI will generate more relevant and effective ad copy.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default AdsForm;