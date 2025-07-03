import React, { useState, useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { ArrowRight, Zap, Image as ImageIcon, FileText, Share, CheckCircle, Sparkles, TrendingUp, Users, Clock, Target, Calendar, Loader } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { GridBackground } from '@/components/GridBackground';

const steps = [
  {
    title: 'Enter Job Details',
    description: 'Fill in the job title and description to get started.',
    icon: <FileText className="w-8 h-8" />,
    color: 'from-blue-500 to-blue-600'
  },
  {
    title: 'Generate Content',
    description: 'Our AI creates a tailored proposal based on your input.',
    icon: <Sparkles className="w-8 h-8" />,
    color: 'from-purple-500 to-purple-600'
  },
  {
    title: 'Review & Edit',
    description: 'Customize the generated content to match your needs.',
    icon: <CheckCircle className="w-8 h-8" />,
    color: 'from-green-500 to-green-600'
  },
  {
    title: 'Share',
    description: 'Copy or export your content to share with others.',
    icon: <Share className="w-8 h-8" />,
    color: 'from-yellow-500 to-yellow-600'
  },
  {
    title: 'Track Performance',
    description: 'Monitor how your content performs over time.',
    icon: <TrendingUp className="w-8 h-8" />,
    color: 'from-red-500 to-red-600'
  }
];

const features = [
  {
    text: 'AI-Powered Content Generation',
    icon: <Sparkles className="w-6 h-6" />,
    color: 'text-purple-500'
  },
  {
    text: 'Multiple Content Types',
    icon: <FileText className="w-6 h-6" />,
    color: 'text-blue-500'
  },
  {
    text: 'Real-time Collaboration',
    icon: <Users className="w-6 h-6" />,
    color: 'text-green-500'
  },
  {
    text: 'Performance Analytics',
    icon: <TrendingUp className="w-6 h-6" />,
    color: 'text-yellow-500'
  }
];

const LinkedInPostsPage: React.FC = () => {
  useEffect(() => {
    document.title = 'VORTEX - Company Post Generation';
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
  const [jobTitle, setJobTitle] = useState('');
  const [jobDescription, setJobDescription] = useState('');
  const [achievementText, setAchievementText] = useState('');
  const [generatedContent, setGeneratedContent] = useState('');
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState('linkedin');
  const [isMounted, setIsMounted] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const generateProposal = async () => {
    if (!jobTitle || !jobDescription) {
      toast({
        title: 'Missing Information',
        description: 'Please enter both job title and description.',
        variant: 'destructive',
      });
      return;
    }
    setLoading(true);
    setGeneratedContent('');
    setTimeout(() => {
      setGeneratedContent(`🚀 **Proposal for ${jobTitle}:**\n\nBased on the provided job description, here is a tailored proposal that highlights key strengths and alignment with your company's goals...`);
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
    setGeneratedContent('');
    setTimeout(() => {
      setGeneratedContent(`🌟 **Sharing a recent milestone:**\n\nI'm excited to share that ${achievementText}. This achievement was a result of dedicated teamwork and a focus on innovation. #Success #Milestone #ProfessionalGrowth`);
      setLoading(false);
    }, 1500);
  };

  const generateResumeOptimization = async () => {
    setLoading(true);
    setGeneratedContent('');
    setTimeout(() => {
      setGeneratedContent(
        `📝 **Resume Optimization Tip:**\n\nTo make your resume stand out, use the STAR method (Situation, Task, Action, Result) to describe your accomplishments. For example, instead of saying 'Managed a team,' try 'Led a team of 5 to increase sales by 15% in one quarter by implementing a new CRM strategy.'`
      );
      setLoading(false);
    }, 1500);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(generatedContent);
    toast({
      title: 'Copied!',
      description: 'Content copied to clipboard',
    });
  };

  if (!isMounted) {
    return null;
  }

  return (
    <GridBackground>
      <AnimatePresence>
        <motion.div className="min-h-screen bg-background relative" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
          <main className="relative z-10 min-h-screen">
            {/* Hero Section */}
            <section className="py-20 md:py-24 relative overflow-hidden">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 md:gap-16 items-center">
                  <motion.div
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8 }}
                    className="text-center lg:text-left"
                  >
                    <Badge className="bg-blue-100 text-blue-800 dark:bg-blue-900/50 dark:text-blue-300 mb-4 px-4 py-2 rounded-full font-semibold">AI-Powered Content</Badge>
                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white mb-6 leading-tight">
                      Create Engaging Social Posts in Seconds
                    </h1>
                    <p className="text-lg text-gray-600 dark:text-gray-300 max-w-xl mx-auto lg:mx-0">
                      Generate high-quality content for LinkedIn, proposals, and resumes with our advanced AI. Save time, boost engagement, and build your brand.
                    </p>
                    <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                      <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-xl font-semibold shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-200">
                        Start Generating <ArrowRight className="w-5 h-5 ml-2" />
                      </Button>
                      <Button size="lg" variant="outline" className="border-2 border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white dark:border-blue-400 dark:text-blue-300 dark:hover:bg-blue-500 dark:hover:text-white px-8 py-4 rounded-xl font-semibold transition-all duration-200">
                        Learn More
                      </Button>
                    </div>
                  </motion.div>
                  <motion.div
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8 }}
                    className="text-center lg:text-left"
                  >
                    <Badge className="bg-blue-100 text-blue-800 dark:bg-blue-900/50 dark:text-blue-300 mb-4 px-4 py-2 rounded-full font-semibold">AI-Powered Content</Badge>
                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white mb-6 leading-tight">
                      Create Engaging Social Posts in Seconds
                    </h1>
                    <p className="text-lg text-gray-600 dark:text-gray-300 max-w-xl mx-auto lg:mx-0">
                      Generate high-quality content for LinkedIn, proposals, and resumes with our advanced AI. Save time, boost engagement, and build your brand.
                    </p>
                    <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                      <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-xl font-semibold shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-200">
                        Start Generating <ArrowRight className="w-5 h-5 ml-2" />
                      </Button>
                      <Button size="lg" variant="outline" className="border-2 border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white dark:border-blue-400 dark:text-blue-300 dark:hover:bg-blue-500 dark:hover:text-white px-8 py-4 rounded-xl font-semibold transition-all duration-200">
                        Learn More
                      </Button>
                    </div>
                  </motion.div>
                </div>
              </div>
            </section>

            {/* How It Works Section */}
            <section className="py-24">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                  <Badge className="bg-purple-100 text-purple-800 mb-4 px-4 py-2">Process</Badge>
                  <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">How It Works</h2>
                  <p className="text-xl text-foreground/80 max-w-3xl mx-auto">Create professional content in 5 simple steps</p>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
                  {steps.map((step, index) => (
                    <motion.div 
                      key={index} 
                      className="relative"
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.3, delay: index * 0.1 }}
                    >
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
                        <p className="text-foreground/80 leading-relaxed">{step.description}</p>
                      </div>
                      {index < steps.length - 1 && (
                        <div className="hidden md:block absolute top-1/4 -right-4 transform">
                          <ArrowRight className="w-6 h-6 text-gray-300" />
                        </div>
                      )}
                    </motion.div>
                  ))}
                </div>
              </div>
            </section>

            {/* Features Section */}
            <section className="py-24 bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                  <Badge className="bg-green-100 text-green-800 mb-4 px-4 py-2">Features</Badge>
                  <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">Everything You Need for Social Media Success</h2>
                  <p className="text-xl text-foreground/80 max-w-3xl mx-auto">Comprehensive tools to create, optimize, and publish content that drives engagement.</p>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  {features.map((feature, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.3, delay: index * 0.1 }}
                    >
                      <Card className="h-full border-0 shadow-sm hover:shadow-lg transition-shadow duration-300">
                        <CardContent className="p-6">
                          <div className="flex items-center space-x-4">
                            <div className={feature.color}>
                              {feature.icon}
                            </div>
                            <span className="font-medium text-foreground">{feature.text}</span>
                          </div>
                        </CardContent>
                      </Card>
                    </motion.div>
                  ))}
                </div>
              </div>
            </section>

            {/* CTA Section */}
            <section className="py-24 text-white relative overflow-hidden bg-gradient-to-r from-indigo-600/90 via-purple-600/90 to-pink-600/90 backdrop-blur-sm">
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
                    <Link to="/auth/register">
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
                  
                  <div className="pt-8 text-sm opacity-80">
                    <p>No credit card required • Free forever tier available</p>
                  </div>
                </div>
              </div>
            </section>
          </main>
        </motion.div>
      </AnimatePresence>
    </GridBackground>
  );
};

export default LinkedInPostsPage;