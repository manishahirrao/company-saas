import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useToast } from '@/hooks/use-toast';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Textarea } from '@/components/ui/textarea';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ArrowRight, Zap, Image as ImageIcon, FileText, Share, CheckCircle, Sparkles, TrendingUp, Users, Clock, Target, Calendar, Play } from 'lucide-react';
import { AdvancedVortexAnimation } from '@/Logo/logo';
import { ContentGenerator } from './PostGeneration';

const CompanyPostGeneration: React.FC = () => {
  const [jobTitle, setJobTitle] = useState('');
  const [jobDescription, setJobDescription] = useState('');
  const [achievementText, setAchievementText] = useState('');
  const [generatedContent, setGeneratedContent] = useState('');
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState('linkedin');
  
  useEffect(() => {
    document.title = 'VORTEX - AI Post Generator';
    
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
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const generateProposal = async () => {
    if (!jobTitle || !jobDescription) {
      toast({
        title: 'Missing Information',
        description: 'Please fill in the job title and description.',
        variant: 'destructive',
      });
      return;
    }
    setLoading(true);
    setTimeout(() => {
      setGeneratedContent(`🚀 Proposal for ${jobTitle}:\n${jobDescription}`);
      setLoading(false);
    }, 1500);
  };

  const generateLinkedInPost = async () => {
    if (!achievementText) {
      toast({
        title: 'Missing Information',
        description: 'Please enter an achievement or insight.',
        variant: 'destructive',
      });
      return;
    }
    setLoading(true);
    setTimeout(() => {
      setGeneratedContent(`🌟 Sharing a recent milestone: ${achievementText}`);
      setLoading(false);
    }, 1500);
  };

  const generateResumeOptimization = async () => {
    setLoading(true);
    setTimeout(() => {
      setGeneratedContent(
        `📝 Resume Tip: Tailor your resume to job descriptions, use action verbs, and quantify results.`
      );
      setLoading(false);
    }, 1500);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(generatedContent);
    toast({
      title: 'Copied!',
      description: 'Generated content copied to clipboard.',
    });
  };

  const steps = [
    { 
      icon: <FileText className="w-8 h-8" />, 
      title: 'Generate Title', 
      description: 'AI creates engaging titles based on your industry and role',
      color: 'from-blue-500 to-blue-600'
    },
    { 
      icon: <Zap className="w-8 h-8" />, 
      title: 'Create Content', 
      description: 'AI writes compelling posts that resonate with your network',
      color: 'from-purple-500 to-purple-600'
    },
    { 
      icon: <ImageIcon className="w-8 h-8" />, 
      title: 'Generate Image', 
      description: 'DALL·E creates professional visuals to accompany your posts',
      color: 'from-pink-500 to-pink-600'
    },
    { 
      icon: <CheckCircle className="w-8 h-8" />, 
      title: 'Preview & Edit', 
      description: 'Review and customize before publishing',
      color: 'from-green-500 to-green-600'
    },
    { 
      icon: <Share className="w-8 h-8" />, 
      title: 'Publish', 
      description: 'Post directly to LinkedIn or copy to clipboard',
      color: 'from-orange-500 to-orange-600'
    },
  ];

  const features = [
    { icon: <Sparkles className="w-6 h-6" />, text: 'AI-powered content generation', color: 'text-yellow-500' },
    { icon: <ImageIcon className="w-6 h-6" />, text: 'Professional image creation with DALL·E', color: 'text-pink-500' },
    { icon: <Target className="w-6 h-6" />, text: 'Industry-specific templates', color: 'text-blue-500' },
    { icon: <TrendingUp className="w-6 h-6" />, text: 'Engagement optimization', color: 'text-green-500' },
    { icon: <Share className="w-6 h-6" />, text: 'Direct Social Media publishing', color: 'text-purple-500' },
    { icon: <Calendar className="w-6 h-6" />, text: 'Content calendar integration', color: 'text-indigo-500' },
    { icon: <Users className="w-6 h-6" />, text: 'Analytics and insights', color: 'text-orange-500' },
    { icon: <Clock className="w-6 h-6" />, text: 'Video generation (Business plan)', color: 'text-red-500' },
  ];

  const socialPlatforms = [
    { 
      name: 'LinkedIn', 
      icon: '💼', 
      description: 'Professional networking posts',
      color: 'from-blue-500 to-blue-600',
      bgColor: 'bg-blue-50',
      textColor: 'text-blue-700'
    },
    { 
      name: 'Facebook', 
      icon: '👥', 
      description: 'Community engagement content',
      color: 'from-blue-600 to-blue-700',
      bgColor: 'bg-blue-50',
      textColor: 'text-blue-700'
    },
    { 
      name: 'Instagram', 
      icon: '📸', 
      description: 'Visual storytelling posts',
      color: 'from-pink-500 to-purple-600',
      bgColor: 'bg-gradient-to-r from-pink-50 to-purple-50',
      textColor: 'text-purple-700'
    },
    { 
      name: 'Pinterest', 
      icon: '📌', 
      description: 'Creative inspiration boards',
      color: 'from-red-500 to-red-600',
      bgColor: 'bg-red-50',
      textColor: 'text-red-700'
    },
  ];

  return (
    <AnimatePresence>
      <motion.div 
        className="min-h-screen bg-background relative"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        {/* Background Grid Pattern */}
        <div className="fixed inset-0 bg-grid-light dark:bg-grid-dark opacity-20 dark:opacity-10 pointer-events-none" />
        
        <main className="relative z-10">
          {/* Hero Section */}
          <section className="pt-24 pb-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
            <div className="max-w-7xl mx-auto text-center relative z-10">
              <motion.div 
                className="mb-12"
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
              >
                {/* Large Advanced Vortex Logo */}
                
                
                {/* Main Title */}
                <motion.h1 
                  className="text-5xl md:text-7xl font-space font-bold gradient-text mb-6"
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.4 }}
                >
                  AI POST GENERATOR
                </motion.h1>
                
                <motion.p 
                  className="text-xl md:text-2xl text-muted-foreground font-space font-light mb-4"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.6 }}
                >
                  Create engaging content for all your social platforms
                </motion.p>
                
                <motion.div 
                  className="inline-block px-6 py-2 bg-gradient-to-r from-electric-purple/20 to-neon-blue/20 rounded-full border border-electric-purple/30 mt-6"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.6, delay: 0.8 }}
                >
                  <span className="text-electric-purple font-inter font-medium">POWERED BY AI</span>
                </motion.div>
              </motion.div>
              
              {/* Social Proof */}
              <motion.div 
                className="flex flex-wrap justify-center gap-4 max-w-2xl mx-auto mb-12"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 1 }}
              >
                <div className="flex items-center gap-2 px-4 py-2 bg-card/30 backdrop-blur-sm rounded-full border border-electric-purple/20">
                  <div className="w-2 h-2 bg-electric-green rounded-full animate-pulse" />
                  <span className="text-sm font-medium">10,000+ Posts Generated</span>
                </div>
                <div className="flex items-center gap-2 px-4 py-2 bg-card/30 backdrop-blur-sm rounded-full border border-electric-purple/20">
                  <div className="w-2 h-2 bg-neon-blue rounded-full animate-pulse" />
                  <span className="text-sm font-medium">95% Satisfaction Rate</span>
                </div>
              </motion.div>
              
              <div className="space-y-4">
                <Badge className="bg-gradient-to-r from-indigo-100 to-purple-100 text-indigo-800 border-0 px-4 py-2 text-sm font-medium">
                  ✨ Social Media Post Generation
                </Badge>
                <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-foreground via-foreground to-purple-600 bg-clip-text text-transparent leading-tight">
                  Create Engaging Social Media Content in Minutes
                </h2>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  Transform your social media presence with AI-powered content creation. Generate compelling titles, write engaging posts, create stunning visuals, and publish across platforms effortlessly.
                </p>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4 mt-8 justify-center">
                <Link to="/login">
                  <Button size="lg" className="bg-gradient-to-r from-electric-purple to-neon-blue hover:from-electric-purple/90 hover:to-neon-blue/90 text-white px-8 py-6 rounded-xl font-semibold shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-200">
                    Get Started Free <ArrowRight className="w-5 h-5 ml-2" />
                  </Button>
                </Link>
                <Button size="lg" variant="outline" className="border-2 border-border hover:border-electric-purple px-8 py-6 rounded-xl font-semibold hover:bg-card/50 transition-all duration-200">
                  <Play className="w-5 h-5 mr-2" /> Watch Demo
                </Button>
              </div>
            </div>
          </section>

          {/* Main Content Section */}
          {/* <section className="py-16 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
              <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                <TabsList className="grid w-full grid-cols-4 mb-8 bg-gray-100 p-1 rounded-2xl">
                  {socialPlatforms.map((platform) => (
                    <TabsTrigger 
                      key={platform.name}
                      value={platform.name.toLowerCase()} 
                      className="data-[state=active]:bg-white data-[state=active]:shadow-md rounded-xl py-4 px-6 font-semibold transition-all duration-200"
                    >
                      <div className="flex items-center space-x-2">
                        <span className="text-xl">{platform.icon}</span>
                        <span>{platform.name}</span>
                      </div>
                    </TabsTrigger>
                  ))}
                </TabsList>

                {socialPlatforms.map((platform) => (
                  <TabsContent key={platform.name} value={platform.name.toLowerCase()} className="mt-8">
                    <div className={`p-6 rounded-2xl ${platform.bgColor} border border-gray-200/50 mb-8`}>
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className={`text-2xl font-bold ${platform.textColor} mb-2`}>
                            {platform.icon} {platform.name} Content Generator
                          </h3>
                          <p className="text-gray-600">{platform.description}</p>
                        </div>
                        <div className={`p-4 bg-gradient-to-r ${platform.color} rounded-xl text-white`}>
                          <Sparkles className="w-8 h-8" />
                        </div>
                      </div>
                    </div>
                    <ContentGenerator selectedAdType={platform.name} />
                  </TabsContent>
                ))}
              </Tabs>
            </div>
          </section> */}

          {/* How It Works Steps */}
          <section className="py-24 bg-gradient-to-br from-gray-50 to-blue-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center mb-16">
                <Badge className="bg-indigo-100 text-indigo-800 mb-4 px-4 py-2">How It Works</Badge>
                <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">Create Professional Content in 5 Steps</h2>
                <p className="text-xl text-gray-600 max-w-3xl mx-auto">Our AI-powered platform streamlines your social media content creation process from ideation to publication.</p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
                {steps.map((step, index) => (
                  <div key={index} className="relative">
                    <div className="text-center group hover:transform hover:-translate-y-2 transition-all duration-300">
                      <div className={`mb-6 flex justify-center relative`}>
                        <div className={`p-6 bg-gradient-to-r ${step.color} rounded-2xl text-white shadow-lg group-hover:shadow-xl transition-all duration-300`}>
                          {step.icon}
                        </div>
                        <div className="absolute -top-2 -right-2 bg-white text-indigo-600 rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold border-2 border-indigo-200">
                          {index + 1}
                        </div>
                      </div>
                      <h3 className="text-xl font-bold text-gray-900 mb-3">{step.title}</h3>
                      <p className="text-gray-600 leading-relaxed">{step.description}</p>
                    </div>
                    {index < steps.length - 1 && (
                      <div className="hidden md:block absolute top-1/4 -right-4 transform">
                        <ArrowRight className="w-6 h-6 text-gray-300" />
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Features Section */}
          <section className="py-24 bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
                <div className="space-y-8">
                  <div>
                    <Badge className="bg-green-100 text-green-800 mb-4 px-4 py-2">Features</Badge>
                    <h2 className="text-4xl font-bold text-gray-900 mb-6">Everything You Need for Social Media Success</h2>
                    <p className="text-xl text-gray-600">Comprehensive tools to create, optimize, and publish content that drives engagement.</p>
                  </div>
                  
                  <div className="grid sm:grid-cols-2 gap-4">
                    {features.map((feature, i) => (
                      <div key={i} className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-50 transition-colors duration-200">
                        <div className={`${feature.color}`}>
                          {feature.icon}
                        </div>
                        <span className="font-medium text-gray-800">{feature.text}</span>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div className="space-y-6">
                  {[
                    {
                      title: 'AI-Powered Content',
                      description: 'Our advanced AI understands your industry, audience, and brand voice to craft perfectly tailored content that resonates.',
                      icon: <Sparkles className="w-6 h-6 text-yellow-500" />,
                      gradient: 'from-yellow-50 to-orange-50'
                    },
                    {
                      title: 'Professional Visuals',
                      description: 'Generate stunning DALL·E images and graphics that complement your message and boost engagement rates.',
                      icon: <ImageIcon className="w-6 h-6 text-pink-500" />,
                      gradient: 'from-pink-50 to-purple-50'
                    },
                    {
                      title: 'Smart Publishing',
                      description: 'Schedule posts for optimal engagement times or publish directly across multiple platforms with one click.',
                      icon: <Share className="w-6 h-6 text-blue-500" />,
                      gradient: 'from-blue-50 to-indigo-50'
                    }
                  ].map((feature, i) => (
                    <Card key={i} className="group hover:shadow-lg transition-all duration-300 border-0 shadow-md">
                      <CardContent className={`p-8 bg-gradient-to-r ${feature.gradient}`}>
                        <div className="flex items-start space-x-4">
                          <div className="p-3 bg-white rounded-xl shadow-sm group-hover:shadow-md transition-shadow duration-300">
                            {feature.icon}
                          </div>
                          <div>
                            <h3 className="font-bold text-xl text-gray-900 mb-3">{feature.title}</h3>
                            <p className="text-gray-700 leading-relaxed">{feature.description}</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* CTA Section */}
          <section className="py-24 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 text-white relative overflow-hidden">
            <div className="absolute inset-0 bg-black/20"></div>
            <div className="absolute top-0 left-0 w-full h-full">
              <div className="absolute top-20 left-20 w-40 h-40 bg-white/10 rounded-full blur-xl animate-pulse"></div>
              <div className="absolute bottom-20 right-20 w-60 h-60 bg-white/10 rounded-full blur-xl animate-pulse"></div>
            </div>
            
            <div className="max-w-4xl mx-auto px-4 text-center relative z-10">
              <div className="space-y-8">
                <div>
                  <h2 className="text-4xl md:text-5xl font-bold mb-6">Ready to Transform Your Social Media?</h2>
                  <p className="text-xl opacity-90 max-w-2xl mx-auto leading-relaxed">
                    Join thousands of creators and businesses using AI to create content that drives real engagement and growth.
                  </p>
                </div>
                
                <div className="flex flex-col sm:flex-row justify-center gap-6">
                  <Link to="/login">
                    <Button size="lg" className="bg-white text-indigo-600 hover:bg-gray-100 px-8 py-4 rounded-xl font-semibold shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-200">
                      Start Creating Free <ArrowRight className="w-5 h-5 ml-2" />
                    </Button>
                  </Link>
                  <Link to="/pricing">
                    <Button size="lg" variant="outline" className="border-2 border-white text-white hover:bg-white hover:text-indigo-600 px-8 py-4 rounded-xl font-semibold transition-all duration-200">
                      View Pricing Plans
                    </Button>
                  </Link>
                </div>
                
                <div className="pt-8 flex items-center justify-center space-x-8 opacity-80">
                  <div className="text-center">
                    <div className="text-2xl font-bold">Free</div>
                    <div className="text-sm">To Start</div>
                  </div>
                  <div className="w-px h-8 bg-white/30"></div>
                  <div className="text-center">
                    <div className="text-2xl font-bold">30s</div>
                    <div className="text-sm">Setup Time</div>
                  </div>
                  <div className="w-px h-8 bg-white/30"></div>
                  <div className="text-center">
                    <div className="text-2xl font-bold">24/7</div>
                    <div className="text-sm">Support</div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </main>
      </motion.div>
    </AnimatePresence>
  );
};

export default CompanyPostGeneration;