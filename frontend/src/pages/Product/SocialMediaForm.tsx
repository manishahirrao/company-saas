import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Sparkles, ChevronRight, Loader2, Zap, BarChart2, Clock, Hash } from "lucide-react";
import { ContentGenerator } from "./PostGeneration";

// Platform data
const socialPlatforms = [
  { 
    name: 'LinkedIn', 
    icon: '💼', 
    description: 'Professional networking and business content',
    color: 'from-blue-500 to-blue-600',
    bgColor: 'bg-blue-50/80',
    textColor: 'text-blue-700',
    tips: [
      'Keep it professional but conversational',
      'Use industry-relevant hashtags',
      'Share insights and thought leadership'
    ]
  },
  { 
    name: 'Facebook', 
    icon: '👥', 
    description: 'Community engagement and brand awareness',
    color: 'from-blue-600 to-blue-700',
    bgColor: 'bg-blue-50/80',
    textColor: 'text-blue-700',
    tips: [
      'Ask questions to encourage comments',
      'Use eye-catching images',
      'Post at optimal times (1-4 PM)'
    ]
  },
  { 
    name: 'Instagram', 
    icon: '📸', 
    description: 'Visual storytelling and brand aesthetics',
    color: 'from-pink-500 to-purple-600',
    bgColor: 'bg-gradient-to-r from-pink-50/80 to-purple-50/80',
    textColor: 'text-purple-700',
    tips: [
      'Use high-quality, vertical images',
      'Include 5-10 relevant hashtags',
      'Post when your audience is most active'
    ]
  },
  { 
    name: 'Pinterest', 
    icon: '📌', 
    description: 'Inspiration and discovery',
    color: 'from-red-500 to-red-600',
    bgColor: 'bg-red-50/80',
    textColor: 'text-red-700',
    tips: [
      'Use vertical images (2:3 ratio)',
      'Include detailed descriptions',
      'Add your website link'
    ]
  },
];

const SocialMediaForm = () => {
  const [activeTab, setActiveTab] = useState(socialPlatforms[0].name.toLowerCase());
  const [isGenerating, setIsGenerating] = useState(false);

  const activePlatform = socialPlatforms.find(p => p.name.toLowerCase() === activeTab);

  const handleGenerate = async () => {
    setIsGenerating(true);
    // Simulate generation time
    await new Promise(resolve => setTimeout(resolve, 1500));
    setIsGenerating(false);
  };

  return (
    <div className="h-full w-full overflow-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center mb-2">
            <h1 className="text-2xl font-bold text-foreground">Social Media Post Generator</h1>
            <ChevronRight className="mx-2 text-muted-foreground" />
            <span className="text-muted-foreground">{activePlatform?.name} Content</span>
          </div>
          <p className="text-muted-foreground max-w-3xl">
            Create engaging social media content tailored for each platform. 
            Select a platform below to get started with AI-powered content generation.
          </p>
        </div>

        {/* Platform Tabs */}
        <div className="mb-8">
          <Tabs 
            value={activeTab} 
            onValueChange={setActiveTab} 
            className="w-full"
          >
            <TabsList className="grid w-full grid-cols-2 md:grid-cols-4 gap-2 bg-muted/50 p-1 rounded-xl h-auto">
              {socialPlatforms.map((platform) => {
                const isActive = activeTab === platform.name.toLowerCase();
                return (
                  <TabsTrigger 
                    key={platform.name}
                    value={platform.name.toLowerCase()}
                    className={`relative rounded-lg py-3 px-4 text-sm font-medium transition-all duration-200 ${
                      isActive 
                        ? `bg-white shadow-md text-foreground` 
                        : 'text-muted-foreground hover:bg-muted/50'
                    }`}
                  >
                    <div className="flex flex-col items-center space-y-1">
                      <span className="text-2xl">{platform.icon}</span>
                      <span>{platform.name}</span>
                    </div>
                    {isActive && (
                      <motion.div 
                        className="absolute -bottom-1 left-0 right-0 h-0.5 bg-blue-500"
                        layoutId="activePlatform"
                        transition={{ type: 'spring', bounce: 0.2, duration: 0.6 }}
                      />
                    )}
                  </TabsTrigger>
                );
              })}
            </TabsList>

            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
                className="mt-6"
              >
                {socialPlatforms.map((platform) => (
                  <TabsContent 
                    key={platform.name} 
                    value={platform.name.toLowerCase()}
                    className="mt-0"
                  >
                    <div className={`p-6 rounded-xl border ${platform.bgColor} border-border/50 mb-8`}>
                      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                        <div>
                          <h2 className={`text-2xl font-bold ${platform.textColor} mb-2 flex items-center`}>
                            {platform.icon} {platform.name} Content Generator
                          </h2>
                          <p className="text-muted-foreground">{platform.description}</p>
                        </div>
                        <button
                          onClick={handleGenerate}
                          disabled={isGenerating}
                          className={`px-6 py-3 rounded-lg font-medium text-white transition-all duration-200 flex items-center justify-center space-x-2 ${
                            isGenerating 
                              ? 'bg-gray-400' 
                              : `bg-gradient-to-r ${platform.color} hover:opacity-90 shadow-md`
                          } min-w-[180px]`}
                        >
                          {isGenerating ? (
                            <>
                              <Loader2 className="h-4 w-4 animate-spin mr-2" />
                              <span>Generating...</span>
                            </>
                          ) : (
                            <>
                              <Zap className="h-4 w-4" />
                              <span>Generate Content</span>
                            </>
                          )}
                        </button>
                      </div>

                      {/* Quick Tips */}
                      <div className="mt-6 pt-6 border-t border-border/30">
                        <h3 className="font-medium text-foreground mb-3 flex items-center">
                          <Sparkles className="h-4 w-4 mr-2 text-amber-500" />
                          Tips for {platform.name} Success
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                          {platform.tips.map((tip, i) => (
                            <div key={i} className="flex items-start space-x-2 p-3 bg-white/50 rounded-lg border border-border/30">
                              <div className="mt-0.5">
                                {i === 0 && <BarChart2 className="h-4 w-4 text-blue-500" />}
                                {i === 1 && <Clock className="h-4 w-4 text-purple-500" />}
                                {i === 2 && <Hash className="h-4 w-4 text-green-500" />}
                              </div>
                              <p className="text-sm text-muted-foreground">{tip}</p>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Content Generator */}
                    <div className="bg-card rounded-xl shadow-sm border border-border overflow-hidden">
                      <div className="p-4 bg-gradient-to-r from-primary/5 to-transparent border-b border-border">
                        <div className="flex items-center">
                          <div className="flex space-x-2">
                            <div className="w-3 h-3 rounded-full bg-red-400"></div>
                            <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
                            <div className="w-3 h-3 rounded-full bg-green-400"></div>
                          </div>
                          <div className="ml-4 text-sm font-mono text-muted-foreground">
                            {platform.name} Content Generator
                          </div>
                        </div>
                      </div>
                      
                      <div className="p-6">
                        <ContentGenerator selectedAdType={platform.name} />
                      </div>
                    </div>
                  </TabsContent>
                ))}
              </motion.div>
            </AnimatePresence>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default SocialMediaForm;