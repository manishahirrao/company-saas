import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { SkeletonCard, SkeletonNav } from '../Animation/SkeletonLoader';
import Navbar from '@/components/Layout/Navbar';
import { AdvancedVortexAnimation } from "@/Logo/logo";
import { 
  ArrowRight, 
  Brain, 
  Shield, 
  Zap, 
  Database, 
  Settings, 
  Target,
  Users,
  Award,
  Clock,
  TrendingUp,
  CheckCircle,
  Scale,
  Heart,
  Cpu,
  Lock
} from 'lucide-react';

const CustomLLMTrainingPage: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    document.title = "VORTEX - Custom LLM Training";
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

  const painPoints = [
    "Generic models lack industry-specific knowledge",
    "Poor understanding of company terminology and processes",
    "Inconsistent brand voice and communication style",
    "Limited performance on specialized tasks and workflows",
    "Data privacy concerns with third-party AI services",
    "High costs of continuous API usage for large-scale operations"
  ];

  const solutions = [
    {
      icon: <Brain className="w-8 h-8 text-blue-600" />,
      title: 'Domain-Specific Fine-Tuning',
      description: 'Train models on your industry data for expert-level performance tailored to your unique business needs.'
    },
    {
      icon: <Database className="w-8 h-8 text-green-600" />,
      title: 'Proprietary Data Integration',
      description: 'Incorporate your documents, processes, and knowledge base into powerful AI models.'
    },
    {
      icon: <Settings className="w-8 h-8 text-purple-600" />,
      title: 'Custom Model Architecture',
      description: 'Build models optimized for your specific use cases and performance requirements.'
    },
    {
      icon: <Zap className="w-8 h-8 text-yellow-600" />,
      title: 'Multi-Modal Training',
      description: 'Train on text, images, and structured data for comprehensive AI capabilities.'
    },
    {
      icon: <Shield className="w-8 h-8 text-red-600" />,
      title: 'Enterprise Deployment',
      description: 'Secure, on-premise or private cloud deployment with full control over your data.'
    },
    {
      icon: <TrendingUp className="w-8 h-8 text-indigo-600" />,
      title: 'Continuous Learning Systems',
      description: 'Models that adapt and improve with your ongoing business data and feedback.'
    }
  ];

  const industries = [
    {
      title: 'Legal & Compliance',
      features: [
        'Contract analysis and legal document processing',
        'Regulatory compliance automation workflows',
        'Legal research and case law analysis models'
      ]
    },
    {
      title: 'Healthcare & Life Sciences',
      features: [
        'Medical terminology and diagnostic assistance models',
        'Clinical trial data analysis and reporting',
        'Patient communication and care coordination AI'
      ]
    },
    {
      title: 'Financial Services',
      features: [
        'Risk assessment and fraud detection models',
        'Investment research and market analysis AI',
        'Regulatory reporting and compliance automation'
      ]
    },
    {
      title: 'Manufacturing & Engineering',
      features: [
        'Technical documentation and maintenance guides',
        'Quality control and defect detection systems',
        'Supply chain optimization and predictive models'
      ]
    },
    {
      title: 'Technology & Software',
      features: [
        'Code generation and technical documentation',
        'API documentation and developer support bots',
        'Software testing and quality assurance automation'
      ]
    },
    {
      title: 'Retail & E-commerce',
      features: [
        'Product catalog management and descriptions',
        'Customer service and personalization engines',
        'Inventory forecasting and demand planning models'
      ]
    }
  ];

  const packages = [
    {
      name: 'Starter Package',
      features: [
        'Single-domain fine-tuning on provided datasets',
        'Up to 10GB of training data processing',
        'Basic performance optimization',
        'Standard deployment support'
      ],
      badge: 'Popular'
    },
    {
      name: 'Professional Package',
      features: [
        'Multi-domain training with custom architectures',
        'Up to 100GB of proprietary data integration',
        'Advanced optimization and bias testing',
        'Priority deployment and integration support'
      ],
      badge: 'Recommended'
    },
    {
      name: 'Enterprise Package',
      features: [
        'Unlimited custom model development',
        'Full data pipeline and infrastructure setup',
        'Dedicated ML engineering team',
        '24/7 monitoring and continuous improvement'
      ],
      badge: 'Enterprise'
    },
    {
      name: 'Custom Solutions',
      features: [
        'Bespoke training for unique requirements',
        'Research collaboration and innovation projects',
        'White-label model development',
        'Strategic AI consulting and roadmap planning'
      ],
      badge: 'Tailored'
    }
  ];

  const steps = [
    {
      number: '1',
      title: 'Discovery & Data Assessment',
      description: 'Comprehensive audit of your data assets and training requirements with technical feasibility analysis and performance benchmarking goals.'
    },
    {
      number: '2',
      title: 'Custom Training Pipeline',
      description: 'Proprietary data preprocessing and augmentation with advanced fine-tuning using your domain-specific datasets.'
    },
    {
      number: '3',
      title: 'Validation & Testing',
      description: 'Rigorous testing against your business scenarios and KPIs with performance optimization and bias detection protocols.'
    },
    {
      number: '4',
      title: 'Deployment & Integration',
      description: 'Seamless integration into your existing systems with comprehensive monitoring and performance analytics dashboard.'
    }
  ];

  const testimonials = [
    {
      quote: "Our custom legal AI model increased contract review speed by 300% while maintaining 99% accuracy.",
      author: "General Counsel",
      company: "Fortune 500 Law Firm"
    },
    {
      quote: "The healthcare model we trained processes patient queries with the expertise of our top specialists.",
      author: "CTO",
      company: "HealthTech Innovator"
    },
    {
      quote: "Custom financial models reduced our risk assessment time from hours to minutes.",
      author: "Head of Risk",
      company: "Investment Bank"
    }
  ];

  const stats = [
    { number: '300+', label: 'Models Trained' },
    { number: '50+', label: 'Industries Served' },
    { number: '99.9%', label: 'Model Accuracy' },
    { number: '24/7', label: 'Support Available' }
  ];

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background relative">
        {/* Background Grid Pattern */}
        <div className="fixed inset-0 bg-grid-light dark:bg-grid-dark opacity-20 dark:opacity-50 pointer-events-none" />
        
        <SkeletonNav />
        
        <main className="relative z-10 px-4 sm:px-6 lg:px-8">
          {/* Hero Skeleton */}
          <div className="max-w-7xl mx-auto py-24 text-center space-y-8">
            <div className="h-16 bg-gradient-to-r from-electric-purple/20 to-neon-blue/20 rounded-lg animate-pulse mx-auto max-w-2xl" />
            <div className="h-6 bg-muted/50 rounded mx-auto max-w-3xl animate-pulse" />
            <div className="h-6 bg-muted/30 rounded mx-auto max-w-xl animate-pulse" />
            <div className="flex gap-4 justify-center">
              <div className="h-12 w-32 bg-electric-purple/20 rounded-lg animate-pulse" />
              <div className="h-12 w-32 bg-muted/30 rounded-lg animate-pulse" />
            </div>
          </div>

          {/* Features Skeleton */}
          <div className="max-w-7xl mx-auto py-20">
            <div className="h-12 bg-muted/30 rounded mx-auto max-w-md mb-12 animate-pulse" />
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {[...Array(4)].map((_, i) => (
                <SkeletonCard key={i} />
              ))}
            </div>
          </div>
        </main>
      </div>
    );
  }

  return (
    <AnimatePresence>
      <motion.div 
        className="min-h-screen bg-background relative"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        {/* Background Grid Pattern */}
        <div className="fixed inset-0 grid-pattern dark:grid-pattern opacity-50 pointer-events-none" />
        
        {/* Navbar */}
        <Navbar />
        
        <main className="relative z-10">
          {/* Hero Section */}
          <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
            <div className="max-w-7xl mx-auto text-center relative z-10">
              <motion.div 
                className="mb-12"
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
              >
                {/* Large Advanced Vortex Logo */}
                <div className="flex justify-center mb-8">
                  <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 1, delay: 0.2 }}
                  >
                    <AdvancedVortexAnimation size="xl" complexity="hypnotic" className="scale-125" />
                  </motion.div>
                </div>
                
                <Badge 
                  variant="outline" 
                  className="mb-6 bg-primary/10 text-primary hover:bg-primary/20 border-primary/20 px-4 py-1.5 text-sm font-medium"
                >
                  Custom LLM Training Services
                </Badge>
                
                <motion.h1 
                  className="text-4xl md:text-6xl font-bold tracking-tight text-foreground mb-6"
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.4 }}
                >
                  Build Your Perfect{" "}
                  <span className="bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
                    AI Language Model
                  </span>
                </motion.h1>
                
                <motion.p 
                  className="text-xl text-muted-foreground mb-10 max-w-2xl mx-auto"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.6 }}
                >
                  Custom LLM Training, Fine-Tuning, and Deployment – Designed for Your Industry, Data, and Unique Business Requirements.
                </motion.p>
                
                <motion.div 
                  className="flex flex-col sm:flex-row gap-4 justify-center"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.8 }}
                >
                  <Button size="lg" className="px-8 py-6 text-base font-medium">
                    Get Started
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                  <Button variant="outline" size="lg" className="px-8 py-6 text-base font-medium">
                    Learn More
                  </Button>
                </motion.div>
              </motion.div>
              
              {/* Stats */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-5xl mx-auto">
                {stats.map((stat, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className="bg-card/50 backdrop-blur-sm p-6 rounded-xl border border-border/50 shadow-sm text-center"
                  >
                    <motion.div 
                      className="text-4xl font-bold text-foreground mb-2"
                      initial={{ scale: 0.5 }}
                      whileInView={{ scale: 1 }}
                      transition={{ duration: 0.6, delay: index * 0.1 + 0.2 }}
                      viewport={{ once: true }}
                    >
                      {stat.number}
                    </motion.div>
                    <div className="text-muted-foreground text-sm font-medium">{stat.label}</div>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>

          {/* Problem Statement */}
          <section className="py-20 bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                  Why Generic AI Models Fall Short
                </h2>
                <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                  Generic AI models can't capture your industry expertise, company voice, or proprietary knowledge. 
                  Off-the-shelf solutions leave performance gaps that hurt your competitive edge.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
                {painPoints.map((point, index) => (
                  <div key={index} className="flex items-start space-x-3 p-4 bg-red-50 rounded-lg">
                    <div className="w-2 h-2 bg-red-500 rounded-full mt-3 flex-shrink-0"></div>
                    <p className="text-gray-700">{point}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Solutions Overview */}
          <section className="py-20 bg-gray-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center mb-16">
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                  Our Training Solutions
                </h2>
                <p className="text-xl text-gray-600">
                  Comprehensive AI training services tailored to your business needs
                </p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {solutions.map((solution, index) => (
                  <Card key={index} className="hover:shadow-lg transition-shadow">
                    <CardContent className="p-8">
                      <div className="mb-4">{solution.icon}</div>
                      <h3 className="text-xl font-semibold text-gray-900 mb-3">{solution.title}</h3>
                      <p className="text-gray-600">{solution.description}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>

              <div className="text-center mt-12">
                <Button size="lg" className="bg-blue-600 hover:bg-blue-700">
                  Design Your Custom Model
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </div>
            </div>
          </section>

          {/* How It Works */}
          <section className="py-20 bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center mb-16">
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                  How It Works
                </h2>
                <p className="text-xl text-gray-600">
                  Our proven process for building custom AI models
                </p>
              </div>
              
              <div className="relative">
                <div className="absolute left-1/2 transform -translate-x-0.5 w-0.5 h-full bg-blue-200"></div>
                <div className="space-y-12">
                  {steps.map((step, index) => (
                    <div key={index} className={`relative flex items-center ${
                      index % 2 === 0 ? 'justify-start' : 'justify-end'
                    }`}>
                      <div className={`w-5/12 ${index % 2 === 0 ? 'pr-8 text-right' : 'pl-8 text-left'}`}>
                        <Card className="bg-gradient-to-br from-blue-50 to-purple-50">
                          <CardContent className="p-6">
                            <div className="text-3xl font-bold text-blue-600 mb-2">{step.number}</div>
                            <h3 className="text-lg font-semibold text-gray-900 mb-2">{step.title}</h3>
                            <p className="text-gray-600">{step.description}</p>
                          </CardContent>
                        </Card>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* Training Packages */}
          <section className="py-20 bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center mb-16">
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                  Training Packages
                </h2>
                <p className="text-xl text-gray-600">
                  Choose the perfect package for your needs
                </p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                {packages.map((pkg, index) => (
                  <Card key={index} className="relative hover:shadow-lg transition-shadow">
                    <CardContent className="p-6">
                      <Badge className="mb-4 bg-blue-100 text-blue-800">
                        {pkg.badge}
                      </Badge>
                      <h3 className="text-xl font-semibold text-gray-900 mb-4">{pkg.name}</h3>
                      <div className="space-y-2">
                        {pkg.features.map((feature, featureIndex) => (
                          <div key={featureIndex} className="flex items-start space-x-2">
                            <CheckCircle className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                            <span className="text-gray-600 text-sm">{feature}</span>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </section>

          {/* Testimonials */}
          <section className="py-20 bg-blue-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center mb-16">
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                  Client Success Stories
                </h2>
                <p className="text-xl text-gray-600">
                  See how our custom models transform businesses
                </p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {testimonials.map((testimonial, index) => (
                  <Card key={index} className="bg-white">
                    <CardContent className="p-6">
                      <p className="text-gray-700 italic mb-4">"{testimonial.quote}"</p>
                      <div className="border-t pt-4">
                        <p className="font-semibold text-gray-900">{testimonial.author}</p>
                        <p className="text-gray-600 text-sm">{testimonial.company}</p>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </section>

          {/* Technical Specifications */}
          <section className="py-20 bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center mb-16">
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                  Technical Specifications
                </h2>
                <p className="text-xl text-gray-600">
                  Enterprise-grade infrastructure and security
                </p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <Card>
                  <CardContent className="p-6">
                    <Cpu className="w-8 h-8 text-blue-600 mb-4" />
                    <h3 className="text-xl font-semibold text-gray-900 mb-3">Supported Model Types</h3>
                    <ul className="space-y-2 text-gray-600">
                      <li>• Large Language Models (LLMs)</li>
                      <li>• Multimodal Models</li>
                      <li>• Specialized Architectures</li>
                      <li>• Retrieval-Augmented Generation (RAG)</li>
                    </ul>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardContent className="p-6">
                    <Zap className="w-8 h-8 text-green-600 mb-4" />
                    <h3 className="text-xl font-semibold text-gray-900 mb-3">Training Infrastructure</h3>
                    <ul className="space-y-2 text-gray-600">
                      <li>• High-performance GPU clusters</li>
                      <li>• Distributed training</li>
                      <li>• Advanced optimization techniques</li>
                      <li>• Experiment tracking</li>
                    </ul>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardContent className="p-6">
                    <Lock className="w-8 h-8 text-red-600 mb-4" />
                    <h3 className="text-xl font-semibold text-gray-900 mb-3">Security & Compliance</h3>
                    <ul className="space-y-2 text-gray-600">
                      <li>• SOC2 Type II certified</li>
                      <li>• GDPR and HIPAA compliant</li>
                      <li>• End-to-end encryption</li>
                      <li>• Air-gapped training options</li>
                    </ul>
                  </CardContent>
                </Card>
              </div>
            </div>
          </section>

          {/* CTA Section */}
          <section className="py-20 bg-gradient-to-r from-blue-600 to-purple-600">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                Ready to build your perfect AI model?
              </h2>
              <p className="text-xl text-blue-100 mb-8">
                Transform your business with custom AI models trained specifically for your industry and needs.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-100">
                  Schedule Your Training Consultation
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </div>
            </div>
          </section>
        </main>
      </motion.div>
    </AnimatePresence>
  );
};

export default CustomLLMTrainingPage;