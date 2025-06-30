import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Sparkles, Rocket, TrendingUp, Users, Clock, 
  Lightbulb, Palette, Video, Target, BarChart3, Play, ArrowRight, Shield, CheckCircle 
} from 'lucide-react';
import { cn } from '@/lib/utils';


// Import form components
import GoogleAdsForm from '../Ads/GoogleAds';
import MetaAdsGenerator from '../Ads/MetaAds';
import LinkedInAdsForm from '../Ads/LinkedInAds';
import YouTubeAdsForm from '../Ads/YouTubeAds';

const AdsGeneratorPage = () => {
  const [activeTab, setActiveTab] = useState('Google Ads');
  const [hoveredFeature, setHoveredFeature] = useState<number | null>(null);

  // Tab configuration with form components
  const tabs = [
    { name: 'Google Ads', component: <GoogleAdsForm /> },
    { name: 'Meta Ads', component: <MetaAdsGenerator /> },
    { name: 'LinkedIn Ads', component: <LinkedInAdsForm /> },
    { name: 'YouTube Ads', component: <YouTubeAdsForm /> },
  ];

  const features = [
    {
      icon: Sparkles,
      title: "Personalized Ad Copy",
      description: "Generate high-converting headlines and descriptions in 5 clicks. Create 3-5 variants per audience segment with tone and style controls.",
      color: "from-purple-500 to-pink-500",
      delay: 0.1
    },
    {
      icon: Palette,
      title: "Dynamic Banner Generation",
      description: "Auto-layout designs for Facebook, Instagram, LinkedIn with brand overlay. Social-media specs automatically optimized for each platform.",
      color: "from-blue-500 to-cyan-500",
      delay: 0.2
    },
    {
      icon: Video,
      title: "Automated Video Ads",
      description: "Template-driven 15-30s ads with music, transitions, and text overlays. Professional scenes and animations included.",
      color: "from-green-500 to-emerald-500",
      delay: 0.3
    },
    {
      icon: Target,
      title: "A/B Testing Assets",
      description: "Create and preview variants side-by-side. Auto-split tests with performance tracking and optimization suggestions.",
      color: "from-orange-500 to-red-500",
      delay: 0.4
    },
    {
      icon: BarChart3,
      title: "Performance Analytics",
      description: "Real-time insights on ad performance, engagement metrics, and conversion tracking across all platforms and campaigns.",
      color: "from-indigo-500 to-purple-500",
      delay: 0.5
    },
  ];

  const stats = [
    { label: "Ads Generated", value: "50K+", icon: Rocket, color: "from-blue-600 to-purple-600" },
    { label: "Average ROI Increase", value: "245%", icon: TrendingUp, color: "from-green-600 to-emerald-600" },
    { label: "Active Users", value: "2.5K+", icon: Users, color: "from-amber-500 to-orange-500" },
    { label: "Time Saved Weekly", value: "15hrs", icon: Clock, color: "from-rose-500 to-pink-600" },
  ];

  // Function to render active tab content
  const renderActiveTab = () => {
    const activeTabData = tabs.find(tab => tab.name === activeTab);
    return activeTabData ? activeTabData.component : (
      <div className="text-center py-12">
        <div className="w-16 h-16 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full flex items-center justify-center mx-auto mb-4">
          <Lightbulb className="w-8 h-8 text-white" />
        </div>
        <h3 className="text-2xl font-bold text-foreground mb-2">Select a Platform</h3>
        <p className="text-muted-foreground">Choose an advertising platform to generate optimized ads</p>
      </div>
    );
  };

  return (
    <AnimatePresence>
      <motion.div 
        className="min-h-screen bg-background relative"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        {/* Background Grid Pattern */}
        <div className="fixed inset-0 grid-pattern dark:grid-pattern opacity-30 pointer-events-none" />
        
        {/* Hero Section */}
        <section className="pt-32 pb-24 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
          {/* Background Grid Pattern */}
          <div className="absolute inset-0 grid-pattern dark:grid-pattern opacity-30 dark:opacity-100" />
          
          <div className="max-w-7xl mx-auto text-center relative z-10 px-4 sm:px-6 lg:px-8">
            <motion.div 
              className="mb-12"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              {/* Title Section */}
              <motion.div 
                className="text-center mb-12"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                <motion.div 
                  className="inline-flex items-center px-6 py-2 bg-gradient-to-r from-electric-purple/20 to-neon-blue/20 rounded-full border border-electric-purple/30 mb-4"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                >
                  <Sparkles className="w-4 h-4 mr-2 text-electric-purple" />
                  <span className="text-sm font-medium text-electric-purple">AI-POWERED</span>
                </motion.div>
                <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-electric-purple via-neon-blue to-electric-green bg-clip-text text-transparent mb-4">
                  Ads Generator
                </h1>
                <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto mb-6">
                  Generate High-Converting Ads in Minutes
                </p>
                <div className="w-24 h-1 bg-gradient-to-r from-electric-purple to-neon-blue mx-auto rounded-full" />
              </motion.div>
              
              <motion.div 
                className="inline-block px-6 py-2 bg-gradient-to-r from-electric-purple/20 to-neon-blue/20 rounded-full border border-electric-purple/30 mb-12"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.8 }}
              >
                <span className="text-electric-purple font-inter font-medium">ENTERPRISE READY</span>
              </motion.div>

              <motion.p 
                className="text-xl text-muted-foreground max-w-3xl mx-auto font-inter leading-relaxed mb-10"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 1 }}
              >
                Generate high-converting ads in minutes with AI. No design skills needed. Get better results across all platforms.
              </motion.p>

              <motion.div 
                className="flex flex-col sm:flex-row justify-center gap-4 mb-16"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 1.2 }}
              >
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-8 py-4 bg-gradient-to-r from-electric-purple to-neon-blue text-white font-medium rounded-full shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center group"
                >
                  Start Generating Ads
                  <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  className="px-8 py-4 bg-transparent text-foreground font-medium rounded-full border border-border hover:bg-accent transition-all flex items-center justify-center"
                >
                  <Play className="w-5 h-5 mr-2 text-electric-purple" />
                  Watch Demo
                </motion.button>
              </motion.div>

              {/* Stats */}
              <motion.div 
                className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 1.4 }}
              >
                {stats.map((stat, index) => (
                  <motion.div
                    key={stat.label}
                    whileHover={{ y: -5, transition: { duration: 0.2 } }}
                    className="bg-card/30 backdrop-blur-sm p-6 rounded-2xl border border-electric-purple/20 text-center hover:border-electric-purple/40 transition-all"
                  >
                    <div className={`w-12 h-12 bg-gradient-to-r ${stat.color} rounded-full flex items-center justify-center mx-auto mb-3`}>
                      <stat.icon className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="text-2xl font-bold text-foreground mb-1">{stat.value}</h3>
                    <p className="text-sm text-muted-foreground">{stat.label}</p>
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* Tabs Section */}
        <section className="py-16 px-4 sm:px-6 lg:px-8 bg-background">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col items-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-center mb-6">Generate Ads for Any Platform</h2>
              <p className="text-lg text-muted-foreground text-center max-w-2xl">
                Create optimized ads for all major advertising platforms with just a few clicks.
              </p>
            </div>

            {/* Tabs Navigation */}
            <div className="flex flex-wrap justify-center gap-2 mb-8">
              {tabs.map((tab) => (
                <button
                  key={tab.name}
                  onClick={() => setActiveTab(tab.name)}
                  className={`px-6 py-3 rounded-full font-medium transition-all ${
                    activeTab === tab.name
                      ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-md'
                      : 'text-muted-foreground hover:bg-accent'
                  }`}
                >
                  {tab.name}
                </button>
              ))}
            </div>

            {/* Tab Content */}
            <div className="bg-card rounded-2xl p-6 md:p-8 shadow-sm border border-border">
              {renderActiveTab()}
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-20 px-4 sm:px-6 lg:px-8 bg-muted/50">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Powerful Features for Better Ads</h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Everything you need to create, manage, and optimize your ad campaigns in one place.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {features.map((feature, index) => (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: feature.delay }}
                  className={`bg-card p-6 rounded-2xl shadow-sm border border-border hover:shadow-md transition-all ${
                    hoveredFeature === index ? 'scale-[1.02]' : ''
                  }`}
                  onMouseEnter={() => setHoveredFeature(index)}
                  onMouseLeave={() => setHoveredFeature(null)}
                >
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-r ${feature.color} flex items-center justify-center mb-4`}>
                    <feature.icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2 text-foreground">{feature.title}</h3>
                  <p className="text-muted-foreground">{feature.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-purple-600 to-pink-600 text-white">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Transform Your Ad Creation?</h2>
            <p className="text-xl text-purple-100 mb-10 max-w-3xl mx-auto">
              Join thousands of marketers creating high-performing ads in minutes, not hours.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <button className="px-8 py-4 bg-background text-purple-700 font-medium rounded-full hover:bg-background/90 transition-all transform hover:scale-105">
                Start Free Trial
              </button>
              <button className="px-8 py-4 bg-transparent border-2 border-background text-background font-medium rounded-full hover:bg-white/10 transition-all">
                Schedule a Demo
              </button>
            </div>
          </div>
        </section>
      </motion.div>
    </AnimatePresence>
  );
};

export default AdsGeneratorPage;