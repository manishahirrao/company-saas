import React, { useEffect, useState } from 'react';
import { ArrowRight, Target, Zap, Globe, BarChart3, Users, CheckCircle, Play, Star, Brain, Search, TrendingUp, Clock, Lightbulb, Rocket, Shield } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

// Define types for our data structures
type Stat = {
  number: string;
  label: string;
};

type Feature = {
  title: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
  gradient: string;
  delay: number;
  details: string[];
};

type UseCase = {
  title: string;
  description: string;
  benefits: string[];
};

const SEOBlog: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    document.title = 'VORTEX - AI-Powered SEO Blog Platform';

    // Parallax effect for background elements
    const handleScroll = () => {
      const scrolled = window.pageYOffset;
      const parallaxElements = document.querySelectorAll('.parallax-bg');
      
      parallaxElements.forEach((el) => {
        const speed = 0.5;
        const element = el as HTMLElement;
        element.style.transform = `translateY(${scrolled * speed}px)`;
      });
    };

    window.addEventListener('scroll', handleScroll);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-screen relative">
        <div className="h-16 bg-muted/20 animate-pulse" />
        <main className="relative px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto py-24 text-center space-y-8">
            <div className="h-16 bg-gradient-to-r from-purple-500/20 to-blue-500/20 rounded-lg animate-pulse mx-auto max-w-2xl" />
            <div className="h-6 bg-muted/50 rounded mx-auto max-w-3xl animate-pulse" />
            <div className="h-6 bg-muted/30 rounded mx-auto max-w-xl animate-pulse" />
            <div className="flex gap-4 justify-center">
              <div className="h-12 w-32 bg-purple-500/20 rounded-lg animate-pulse" />
              <div className="h-12 w-32 bg-muted/30 rounded-lg animate-pulse" />
            </div>
          </div>
          <div className="max-w-7xl mx-auto py-20">
            <div className="h-12 bg-muted/30 rounded mx-auto max-w-md mb-12 animate-pulse" />
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="h-64 bg-muted/20 rounded-lg animate-pulse" />
              ))}
            </div>
          </div>
        </main>
      </div>
    );
  }



  const testimonials = [
    {
      quote: "Our content creation speed increased by 400% while maintaining top SEO rankings.",
      author: "Sarah Chen",
      role: "Content Director",
      company: "Digital Marketing Agency",
      rating: 5
    },
    {
      quote: "We went from 2 blog posts per week to 15, with better engagement than ever.",
      author: "Michael Rodriguez",
      role: "Marketing Manager", 
      company: "SaaS Company",
      rating: 5
    },
    {
      quote: "The brand voice consistency across 50+ client accounts is phenomenal.",
      author: "Lisa Thompson",
      role: "Agency Owner",
      company: "Creative Studio",
      rating: 5
    },
    {
      quote: "SEO scores improved from 60 to 95+ average across all our content.",
      author: "David Kim",
      role: "SEO Specialist",
      company: "E-commerce Brand",
      rating: 5
    }
  ];

  const howItWorks = [
    {
      step: '01',
      title: 'Content Strategy Planning',
      description: 'AI analyzes your niche, competitors, and target audience to generate a comprehensive content calendar.',
      icon: <Target className="w-12 h-12 text-blue-600" />
    },
    {
      step: '02',
      title: 'Intelligent Content Creation',
      description: 'Select from customizable modules and watch AI generate SEO-optimized, brand-consistent content.',
      icon: <Lightbulb className="w-12 h-12 text-purple-600" />
    },
    {
      step: '03',
      title: 'Multi-Format Publishing',
      description: 'Automatically adapt and distribute content across all platforms with perfect formatting.',
      icon: <Rocket className="w-12 h-12 text-green-600" />
    },
    {
      step: '04',
      title: 'Performance Optimization',
      description: 'Track results, gather insights, and continuously improve your content strategy with data.',
      icon: <TrendingUp className="w-12 h-12 text-orange-600" />
    }
  ];

  const stats: Stat[] = [
    { number: '400%', label: 'Faster Content Creation' },
    { number: '95+', label: 'Average SEO Score' },
    { number: '50K+', label: 'Content Pieces Generated' },
    { number: '99.9%', label: 'Client Satisfaction' }
  ];

  const features: Feature[] = [
    {
      title: 'SEO Optimization',
      description: 'Automated keyword research and on-page optimization for higher search rankings.',
      icon: Search,
      gradient: 'from-blue-500 to-purple-500',
      delay: 0,
      details: [
        'Keyword density optimization',
        'Schema markup automation',
        'Internal linking suggestions',
        'Search intent matching'
      ]
    },
    {
      title: 'AI Content Generation',
      description: 'Create high-quality, engaging content in minutes with our advanced AI.',
      icon: Zap,
      gradient: 'from-purple-500 to-pink-500',
      delay: 0.1,
      details: [
        'Brand voice consistency',
        'Multi-format adaptation',
        'Creative direction',
        'Style guide adherence'
      ]
    },
    {
      title: 'Performance Analytics',
      description: 'Track your content performance and optimize based on real data.',
      icon: BarChart3,
      gradient: 'from-pink-500 to-red-500',
      delay: 0.2,
      details: [
        'Engagement tracking',
        'SEO ranking monitoring',
        'Conversion analytics',
        'ROI measurement'
      ]
    },
    {
      title: 'Team Collaboration',
      description: 'Work seamlessly with your team on content creation and editing.',
      icon: Users,
      gradient: 'from-red-500 to-orange-500',
      delay: 0.3,
      details: [
        'Real-time collaboration',
        'Version control',
        'Comment and feedback',
        'Workflow automation'
      ]
    }
  ];

  const useCases: UseCase[] = [
    {
      title: 'Digital Marketing Agencies',
      description: 'Scale content creation for multiple clients while maintaining brand consistency and SEO excellence.',
      benefits: ['Bulk content generation', 'Client brand voice management', 'Campaign automation', 'Performance reporting']
    },
    {
      title: 'E-commerce & Retail',
      description: 'Drive sales with compelling product content, seasonal campaigns, and customer success stories.',
      benefits: ['Product descriptions', 'Seasonal campaigns', 'Customer testimonials', 'Visual content direction']
    },
    {
      title: 'SaaS & Technology',
      description: 'Establish thought leadership with technical content, feature announcements, and case studies.',
      benefits: ['Technical documentation', 'Feature announcements', 'Case studies', 'Thought leadership']
    },
    {
      title: 'Healthcare & Wellness',
      description: 'Create educational content that builds trust and helps patients make informed decisions.',
      benefits: ['Educational articles', 'Treatment explanations', 'Patient stories', 'Wellness guides']
    }
  ];

  if (isLoading) {
    return (
      <div className="min-h-screen relative">
        <div className="h-16 bg-muted/20 animate-pulse" />
        <main className="relative px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto py-24 text-center space-y-8">
            <div className="h-16 bg-gradient-to-r from-electric-purple/20 to-neon-blue/20 rounded-lg animate-pulse mx-auto max-w-2xl" />
            <div className="h-6 bg-muted/50 rounded mx-auto max-w-3xl animate-pulse" />
            <div className="h-6 bg-muted/30 rounded mx-auto max-w-xl animate-pulse" />
            <div className="flex gap-4 justify-center">
              <div className="h-12 w-32 bg-electric-purple/20 rounded-lg animate-pulse" />
              <div className="h-12 w-32 bg-muted/30 rounded-lg animate-pulse" />
            </div>
          </div>
        </main>
      </div>
    );
  }

  return (
    <AnimatePresence>
      <motion.div 
        className="relative w-full"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5 }}
      >
        <main className="relative">
          {/* Hero Section */}
          <section className="py-20 bg-gradient-to-br from-blue-50/70 to-indigo-50/70 dark:from-gray-800/70 dark:to-gray-900/70 backdrop-blur-sm">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center mb-16">
                <h1 className="text-4xl md:text-7xl font-bold text-gray-900 mb-6 leading-tight">
                  Transform Your Content Strategy with
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
                    {" "}AI-Powered Blog Creation
                  </span>
                </h1>
                <p className="text-xl text-gray-600 mb-8 max-w-4xl mx-auto leading-relaxed">
                  Advanced SEO Optimization, Creative Content Automation, and Multi-Platform Publishing – 
                  Built for Content Teams, Marketers, and Agencies who demand excellence at scale.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
                  <button className="px-8 py-4 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl flex items-center justify-center">
                    Start Creating Content
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </button>
                  <button className="px-8 py-4 border-2 border-gray-300 text-gray-700 rounded-lg font-semibold hover:border-blue-600 hover:text-blue-600 transition-all duration-300 flex items-center justify-center">
                    <Play className="w-5 h-5 mr-2" />
                    Watch Demo
                  </button>
                </div>
                <div className="text-sm text-gray-500">
                  <span className="font-medium">💡 Free Trial:</span> Generate 50 pieces of content in your first week or get your money back
                </div>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-16">
                {stats.map((stat, index) => (
                  <div key={index} className="text-center bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300">
                    <div className="text-4xl font-bold text-blue-600 mb-2">{stat.number}</div>
                    <div className="text-gray-600 font-medium">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Problem Statement */}
          <section className="py-20 bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center mb-16">
                <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-6">
                  Content Creation Challenges Are Holding You Back
                </h2>
                <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                  Content creation teams struggle with consistent quality, SEO optimization, and multi-platform distribution. 
                  Manual processes limit scale, creativity suffers under pressure, and maintaining brand voice becomes impossible.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {[
                  { icon: <Clock className="w-8 h-8 text-red-500" />, title: 'Time-consuming manual creation', desc: 'Hours spent on single pieces of content' },
                  { icon: <Search className="w-8 h-8 text-orange-500" />, title: 'Inconsistent SEO optimization', desc: 'Missing keywords and poor search rankings' },
                  { icon: <Users className="w-8 h-8 text-yellow-500" />, title: 'Brand voice inconsistency', desc: 'Different writers, different voices' },
                  { icon: <Globe className="w-8 h-8 text-blue-500" />, title: 'Complex multi-platform distribution', desc: 'Manual adaptation for each channel' },
                  { icon: <BarChart3 className="w-8 h-8 text-purple-500" />, title: 'Lack of data-driven insights', desc: 'No clear understanding of what works' },
                  { icon: <Target className="w-8 h-8 text-green-500" />, title: 'Scaling quality content', desc: 'Quality drops as volume increases' }
                ].map((problem, index) => (
                  <div key={index} className="bg-gray-50 rounded-xl p-6 hover:shadow-lg transition-all duration-300">
                    <div className="mb-4">{problem.icon}</div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">{problem.title}</h3>
                    <p className="text-gray-600">{problem.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Solutions Overview */}
          <section className="py-20 bg-gradient-to-br from-blue-50/70 to-indigo-50/70 dark:from-gray-800/70 dark:to-gray-900/70 backdrop-blur-sm">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center mb-16">
                <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-6">
                  AI-Powered Solutions That Scale
                </h2>
                <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                  Our comprehensive suite of AI-driven content modules eliminates bottlenecks and amplifies your creative potential.
                </p>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
                <div className="space-y-6">
                  {features.map((feature, index) => (
                    <div 
                      key={feature.title}
                      className={`p-6 rounded-xl cursor-pointer transition-all duration-300 ${
                        index === 0 
                          ? 'bg-white shadow-xl border-2 border-blue-200' 
                          : 'bg-white/70 hover:bg-white hover:shadow-lg'
                      }`}
                    >
                      <div className="flex items-center mb-4">
                        <div className={`w-12 h-12 rounded-lg flex items-center justify-center bg-gradient-to-r ${feature.gradient} mr-4`}>
                          <feature.icon className="w-6 h-6 text-white" />
                        </div>
                        <h3 className="text-xl font-semibold text-gray-900">{feature.title}</h3>
                      </div>
                      <p className="text-gray-600 mb-4">{feature.description}</p>
                    </div>
                  ))}
                </div>

                <div className="bg-white rounded-2xl shadow-2xl p-8">
                  <div className="text-center mb-6">
                    <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white mx-auto mb-4">
                      {React.createElement(features[0].icon, { className: "w-8 h-8" })}
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">{features[0].title}</h3>
                    <p className="text-gray-600">{features[0].description}</p>
                  </div>
                  
                  <div className="space-y-4">
                    {features[0].description.split('.').map((detail, idx) => (
                      <div key={idx} className="flex items-center p-3 bg-gray-50 rounded-lg">
                        <CheckCircle className="w-5 h-5 text-green-500 mr-3" />
                        <span className="text-gray-700">{detail}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="text-center">
                <button className="px-8 py-4 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-all duration-300 transform hover:scale-105">
                  Customize Your Content Suite
                  <ArrowRight className="w-5 h-5 ml-2 inline" />
                </button>
              </div>
            </div>
          </section>

          {/* How It Works */}
          <section className="py-20 bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center mb-16">
                <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-6">
                  How It Works
                </h2>
                <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                  From strategy to publication, our AI-powered platform streamlines your entire content creation workflow.
                </p>
              </div>

              <div className="relative">
                <div className="absolute left-1/2 transform -translate-x-0.5 w-0.5 h-full bg-blue-200 hidden lg:block"></div>
                <div className="space-y-16">
                  {[
                    {
                      step: '01',
                      title: 'Content Strategy Planning',
                      description: 'AI analyzes your niche, competitors, and target audience to generate a comprehensive content calendar.',
                      icon: <Target className="w-12 h-12 text-blue-600" />
                    },
                    {
                      step: '02',
                      title: 'Intelligent Content Creation',
                      description: 'Select from customizable modules and watch AI generate SEO-optimized, brand-consistent content.',
                      icon: <Lightbulb className="w-12 h-12 text-purple-600" />
                    },
                    {
                      step: '03',
                      title: 'Multi-Format Publishing',
                      description: 'Automatically adapt and distribute content across all platforms with perfect formatting.',
                      icon: <Rocket className="w-12 h-12 text-green-600" />
                    },
                    {
                      step: '04',
                      title: 'Performance Optimization',
                      description: 'Track results, gather insights, and continuously improve your content strategy with data.',
                      icon: <TrendingUp className="w-12 h-12 text-orange-600" />
                    }
                  ].map((step, index) => (
                    <div key={step.step} className={`relative flex items-center ${
                      index % 2 === 0 ? 'lg:justify-start' : 'lg:justify-end'
                    }`}>
                      <div className={`w-full lg:w-5/12 ${index % 2 === 0 ? 'lg:pr-12' : 'lg:pl-12'}`}>
                        <div className="bg-white rounded-2xl shadow-xl p-8 border-2 border-gray-100 hover:border-blue-200 transition-colors duration-300">
                          <div className="flex items-center mb-6">
                            <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-xl mr-4">
                              {step.step}
                            </div>
                            <div className="flex-1">
                              <h3 className="text-2xl font-bold text-gray-900 mb-2">{step.title}</h3>
                            </div>
                          </div>
                          <p className="text-gray-600 text-lg leading-relaxed">{step.description}</p>
                          <div className="mt-6 flex justify-center">
                            {step.icon}
                          </div>
                        </div>
                      </div>
                      <div className="absolute left-1/2 transform -translate-x-1/2 w-6 h-6 bg-blue-600 rounded-full border-4 border-white shadow-lg hidden lg:block"></div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* Use Cases */}
          <section className="py-20 bg-gray-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center mb-16">
                <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-6">
                  Built for Every Industry
                </h2>
                <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                  From agencies to enterprises, our platform adapts to your unique content needs and industry requirements.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {[
                  {
                    title: 'Digital Marketing Agencies',
                    description: 'Scale content creation for multiple clients while maintaining brand consistency and SEO excellence.',
                    benefits: ['Bulk content generation', 'Client brand voice management', 'Campaign automation', 'Performance reporting']
                  },
                  {
                    title: 'E-commerce & Retail',
                    description: 'Drive sales with compelling product content, seasonal campaigns, and customer success stories.',
                    benefits: ['Product descriptions', 'Seasonal campaigns', 'Customer testimonials', 'Visual content direction']
                  },
                  {
                    title: 'SaaS & Technology',
                    description: 'Establish thought leadership with technical content, feature announcements, and case studies.',
                    benefits: ['Technical documentation', 'Feature announcements', 'Case studies', 'Thought leadership']
                  },
                  {
                    title: 'Healthcare & Wellness',
                    description: 'Create educational content that builds trust and helps patients make informed decisions.',
                    benefits: ['Educational articles', 'Treatment explanations', 'Patient stories', 'Wellness guides']
                  }
                ].map((useCase, index) => (
                  <div key={index} className="bg-white rounded-xl p-8 shadow-lg hover:shadow-xl transition-shadow duration-300">
                    <h3 className="text-2xl font-bold text-gray-900 mb-4">{useCase.title}</h3>
                    <p className="text-gray-600 mb-6">{useCase.description}</p>
                    <div className="space-y-3">
                      {useCase.benefits.map((benefit, idx) => (
                        <div key={idx} className="flex items-center">
                          <CheckCircle className="w-5 h-5 text-green-500 mr-3" />
                          <span className="text-gray-700">{benefit}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Testimonials */}
          <section className="py-20 bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center mb-16">
                <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-6">
                  Client Success Stories
                </h2>
                <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                  See how leading organizations are transforming their content strategy with our AI-powered platform.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {[
                  {
                    quote: "Our content creation speed increased by 400% while maintaining top SEO rankings.",
                    author: "Sarah Chen",
                    role: "Content Director",
                    company: "Digital Marketing Agency",
                    rating: 5
                  },
                  {
                    quote: "We went from 2 blog posts per week to 15, with better engagement than ever.",
                    author: "Michael Rodriguez",
                    role: "Marketing Manager", 
                    company: "SaaS Company",
                    rating: 5
                  },
                  {
                    quote: "The brand voice consistency across 50+ client accounts is phenomenal.",
                    author: "Lisa Thompson",
                    role: "Agency Owner",
                    company: "Creative Studio",
                    rating: 5
                  },
                  {
                    quote: "SEO scores improved from 60 to 95+ average across all our content.",
                    author: "David Kim",
                    role: "SEO Specialist",
                    company: "E-commerce Brand",
                    rating: 5
                  }
                ].map((testimonial, index) => (
                  <div key={index} className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-xl p-8 shadow-lg">
                    <div className="flex items-center mb-4">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                      ))}
                    </div>
                    <blockquote className="text-lg text-gray-700 mb-6 italic">
                      "{testimonial.quote}"
                    </blockquote>
                    <div className="flex items-center">
                      <div className="w-12 h-12 bg-gradient-to-br from-blue-400 to-purple-600 rounded-full flex items-center justify-center text-white font-bold mr-4">
                        {testimonial.author.split(' ').map(n => n[0]).join('')}
                      </div>
                      <div>
                        <div className="font-semibold text-gray-900">{testimonial.author}</div>
                        <div className="text-gray-600 text-sm">{testimonial.role}, {testimonial.company}</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* CTA Section */}
          <section className="py-20 bg-gradient-to-r from-blue-600 to-purple-600">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
              <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
                Ready to revolutionize your content creation?
              </h2>
              <p className="text-xl text-blue-100 mb-8 max-w-3xl mx-auto">
                Join thousands of content creators, marketers, and agencies who are already scaling their success with AI-powered content generation.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
                <button className="px-8 py-4 bg-white text-blue-600 rounded-lg font-semibold hover:bg-gray-100 transition-all duration-300 transform hover:scale-105 shadow-lg">
                  Start Your Free Trial
                  <ArrowRight className="w-5 h-5 ml-2 inline" />
                </button>
                <button className="px-8 py-4 border-2 border-white text-white rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition-all duration-300">
                  Schedule a Demo
                </button>
              </div>
              <div className="flex items-center justify-center text-blue-100">
                <Shield className="w-5 h-5 mr-2" />
                <span className="text-sm">Generate 50 pieces of content in your first week or get your money back</span>
              </div>
            </div>
          </section>
        </main>
      </motion.div>
    </AnimatePresence>
  );
};

export default SEOBlog;