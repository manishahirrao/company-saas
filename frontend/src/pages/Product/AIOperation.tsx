import { useEffect, useState } from 'react';
import Navbar from "@/components/Layout/Navbar";
import Footer from "@/components/Layout/Footer";
import { motion, AnimatePresence } from "framer-motion";
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ArrowRight, Bot, Workflow, MessageSquare, BarChart3, Settings, Target, Zap, Shield, Globe, ChevronDown, Menu, X, Star, CheckCircle, Users, TrendingUp, Clock, Award } from 'lucide-react';

interface Solution {
  icon: JSX.Element;
  title: string;
  description: string;
  features: string[];
}

interface Industry {
  title: string;
  solutions: string[];
}

interface ProcessStep {
  step: string;
  title: string;
  description: string;
}

interface Stat {
  number: string;
  label: string;
  icon: JSX.Element;
}

interface Testimonial {
  quote: string;
  author: string;
  role: string;
  rating: number;
}

const AIOperationsLanding = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [selectedIndustry, setSelectedIndustry] = useState('retail');

  const industries: Record<string, Industry> = {
    retail: {
      title: 'Retail & E-commerce',
      solutions: [
        'Intelligent customer service chatbots',
        'Automated returns processing workflows',
        'Personalized product recommendation engines',
        'Inventory management automation'
      ]
    },
    finance: {
      title: 'Finance & Banking',
      solutions: [
        'AI agents for fraud detection',
        'Automated KYC onboarding processes',
        'KPI dashboards for transaction analytics',
        'Compliance monitoring systems'
      ]
    },
    healthcare: {
      title: 'Healthcare',
      solutions: [
        'Appointment scheduling assistants',
        'Patient record update automation',
        'Predictive analytics for treatment planning',
        'Medical billing workflow optimization'
      ]
    },
    manufacturing: {
      title: 'Manufacturing & Logistics',
      solutions: [
        'Smart supply chain agents',
        'Real-time production metrics dashboard',
        'AI-based demand forecasting',
        'Quality control automation'
      ]
    },
    hr: {
      title: 'Human Resources',
      solutions: [
        'Resume screening and ranking workflows',
        'Career growth analytics dashboards',
        'Employee onboarding automation',
        'Performance review assistance'
      ]
    },
    saas: {
      title: 'SaaS & IT Services',
      solutions: [
        'Integrated ticket triage bots',
        'Performance monitoring dashboards',
        'Automated client onboarding workflows',
        'System health monitoring'
      ]
    }
  };

  const solutions: Solution[] = [
    {
      icon: <Workflow className="w-8 h-8 text-blue-600" />,
      title: 'Workflow Automation',
      description: 'Automate repetitive tasks and integrate seamlessly with any platform to boost operational efficiency.',
      features: ['Cross-platform integration', 'Smart task routing', 'Real-time monitoring']
    },
    {
      icon: <Bot className="w-8 h-8 text-purple-600" />,
      title: 'AI Agents',
      description: 'Autonomous agents that intelligently plan, execute, and optimize your business processes.',
      features: ['Autonomous decision making', 'Process optimization', 'Adaptive learning']
    },
    {
      icon: <MessageSquare className="w-8 h-8 text-green-600" />,
      title: 'AI Chatbot & Support',
      description: '24/7 intelligent customer service with seamless handover to human agents when needed.',
      features: ['Natural language processing', 'Multi-channel support', 'Smart escalation']
    },
    {
      icon: <BarChart3 className="w-8 h-8 text-orange-600" />,
      title: 'Analytics Dashboard',
      description: 'Real-time metrics and KPIs tailored to each department\'s specific goals and objectives.',
      features: ['Custom KPI tracking', 'Predictive analytics', 'Executive reporting']
    },
    {
      icon: <Settings className="w-8 h-8 text-red-600" />,
      title: 'Integration Services',
      description: 'Connect your existing CRM, ERP, and SaaS applications seamlessly for unified operations.',
      features: ['API connectivity', 'Data synchronization', 'Legacy system support']
    }
  ];

  const process: ProcessStep[] = [
    {
      step: '01',
      title: 'Onboarding & Requirements',
      description: 'Dedicated solution architect conducts deep-dive workshops to understand your unique challenges.'
    },
    {
      step: '02',
      title: 'Tailored Implementation',
      description: 'Build and integrate AI modules seamlessly into your existing technology environment.'
    },
    {
      step: '03',
      title: 'Continuous Optimization',
      description: 'Data-driven refinement cycles with SLA-backed support for ongoing improvement.'
    },
    {
      step: '04',
      title: 'Enterprise Dashboard',
      description: 'Unified view of KPIs, operational health, and agent performance across all systems.'
    }
  ];

  const stats: Stat[] = [
    { number: '1.2M+', label: 'Automations Completed', icon: <Zap className="w-6 h-6" /> },
    { number: '2m 45s', label: 'Avg. Resolution Time', icon: <Clock className="w-6 h-6" /> },
    { number: '92%', label: 'Customer Satisfaction', icon: <Award className="w-6 h-6" /> },
    { number: '99.9%', label: 'System Uptime', icon: <Shield className="w-6 h-6" /> }
  ];

  const testimonials: Testimonial[] = [
    {
      quote: "Our support ticket volume dropped by 70% since deploying their AI chatbot. The ROI was immediate.",
      author: "Sarah Chen",
      role: "CTO, FinTech Solutions",
      rating: 5
    },
    {
      quote: "We automated 1M+ invoices in under 3 months. The efficiency gains are unprecedented.",
      author: "Michael Rodriguez",
      role: "Operations Lead, Manufacturing Inc.",
      rating: 5
    },
    {
      quote: "The analytics dashboard gives us insights we never had before. Game-changing for our operations.",
      author: "Emily Johnson",
      role: "VP of Operations, RetailCorp",
      rating: 5
    }
  ];

  useEffect(() => {
    document.title = "AI Operations - VORTEX";

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
      <div className="min-h-screen bg-background relative">
        <div className="fixed inset-0 grid-pattern dark:grid-pattern opacity-30 pointer-events-none" />
        <div className="h-16 bg-background/80 backdrop-blur-sm border-b border-border/40" />
        <main className="relative z-10 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto py-24 text-center space-y-8">
            <div className="h-16 bg-gradient-to-r from-purple-500/20 to-blue-500/20 rounded-lg animate-pulse mx-auto max-w-2xl" />
            <div className="h-6 bg-muted/50 rounded mx-auto max-w-3xl animate-pulse" />
            <div className="h-6 bg-muted/30 rounded mx-auto max-w-xl animate-pulse" />
            <div className="flex gap-4 justify-center">
              <div className="h-12 w-32 bg-purple-500/20 rounded-lg animate-pulse" />
              <div className="h-12 w-32 bg-muted/30 rounded-lg animate-pulse" />
            </div>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background relative">
      <div className="fixed inset-0 grid-pattern dark:grid-pattern opacity-30 pointer-events-none" />
   
      
      <main className="relative z-10">
        <AnimatePresence>
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            {/* Hero Section */}
            <section className="relative pt-24 pb-20 overflow-hidden">
              <div className="container mx-auto px-4">
                <div className="flex flex-wrap items-center -mx-4">
                  <div className="w-full lg:w-1/2 px-4 mb-12 lg:mb-0">
                    <Badge variant="outline" className="mb-4 bg-background/80 backdrop-blur-sm border-primary/20 text-primary">
                      <Zap className="w-4 h-4 mr-2" /> AI-Powered Operations
                    </Badge>
                    <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-purple-500 to-blue-500">
                      Transform Your Business with AI Operations
                    </h1>
                    <p className="text-lg text-foreground/80 mb-8 max-w-lg">
                      Automate workflows, enhance decision-making, and drive efficiency with our AI-powered operations platform.
                    </p>
                    <div className="flex flex-wrap gap-4">
                      <button className="px-8 py-3 bg-gradient-to-r from-purple-500 to-blue-500 text-white rounded-lg font-medium hover:opacity-90 transition-all duration-200">
                        Get Started
                      </button>
                      <button className="px-8 py-3 bg-background/80 backdrop-blur-sm border border-border/40 rounded-lg font-medium hover:bg-accent/50 transition-all duration-200">
                        Learn More
                      </button>
                    </div>
                  </div>
                  <div className="w-full lg:w-1/2 px-4">
                    <div className="relative">
                      <div className="absolute -top-6 -left-6 w-64 h-64 bg-gradient-to-r from-purple-500/20 to-blue-500/20 rounded-full filter blur-3xl opacity-70 animate-blob"></div>
                      <div className="absolute -bottom-8 -right-8 w-72 h-72 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-full filter blur-3xl opacity-70 animate-blob animation-delay-2000"></div>
                      <div className="relative bg-background/50 backdrop-blur-sm border border-border/30 rounded-2xl p-6 shadow-lg">
                        <div className="bg-muted/50 rounded-lg p-6 mb-6">
                          <div className="flex items-center space-x-4">
                            <div className="w-10 h-10 rounded-full bg-gradient-to-r from-purple-500 to-blue-500 flex items-center justify-center text-white">
                              <Bot className="w-5 h-5" />
                            </div>
                            <div>
                              <h3 className="font-medium">AI Operations Assistant</h3>
                              <p className="text-sm text-foreground/70">Ready to optimize your workflows</p>
                            </div>
                          </div>
                        </div>
                        <div className="space-y-4">
                          {solutions.slice(0, 3).map((solution, index) => (
                            <div key={index} className="flex items-start space-x-3 p-3 bg-muted/30 rounded-lg hover:bg-muted/50 transition-colors duration-200">
                              <div className="p-2 rounded-lg bg-background/80 backdrop-blur-sm shadow-sm">
                                {solution.icon}
                              </div>
                              <div>
                                <h4 className="font-medium">{solution.title}</h4>
                                <p className="text-sm text-foreground/80">{solution.description}</p>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Features Section */}
            <section className="py-20 bg-muted/30">
              <div className="container mx-auto px-4">
                <div className="text-center mb-16">
                  <Badge variant="outline" className="mb-4 bg-background/80 backdrop-blur-sm border-primary/20 text-primary">
                    <Workflow className="w-4 h-4 mr-2" /> AI Solutions
                  </Badge>
                  <h2 className="text-3xl md:text-4xl font-bold mb-4">Comprehensive AI Operations Platform</h2>
                  <p className="text-lg text-foreground/80 max-w-2xl mx-auto">
                    Our AI solutions are designed to transform your business operations across every department.
                  </p>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {solutions.map((solution, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.3, delay: index * 0.1 }}
                    >
                      <Card className="h-full border-border/30 bg-background/50 backdrop-blur-sm hover:shadow-lg transition-shadow duration-300">
                        <CardContent className="p-6">
                          <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-purple-500/10 to-blue-500/10 flex items-center justify-center mb-4">
                            {solution.icon}
                          </div>
                          <h3 className="text-xl font-semibold mb-2">{solution.title}</h3>
                          <p className="text-foreground/80 mb-4">{solution.description}</p>
                          <ul className="space-y-2">
                            {solution.features.map((feature, i) => (
                              <li key={i} className="flex items-start">
                                <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 mr-2 flex-shrink-0" />
                                <span className="text-sm">{feature}</span>
                              </li>
                            ))}
                          </ul>
                        </CardContent>
                      </Card>
                    </motion.div>
                  ))}
                </div>
              </div>
            </section>

            {/* Stats Section */}
            <section className="py-20 bg-gradient-to-r from-purple-500/5 to-blue-500/5">
              <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                  {stats.map((stat, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.3, delay: index * 0.1 }}
                    >
                      <Card className="bg-background/50 backdrop-blur-sm border-border/30 hover:shadow-lg transition-shadow">
                        <CardContent className="p-6 flex items-center">
                          <div className="p-3 rounded-full bg-gradient-to-r from-purple-500/10 to-blue-500/10 mr-4">
                            {stat.icon}
                          </div>
                          <div>
                            <h3 className="text-2xl font-bold">{stat.number}</h3>
                            <p className="text-foreground/80">{stat.label}</p>
                          </div>
                        </CardContent>
                      </Card>
                    </motion.div>
                  ))}
                </div>
              </div>
            </section>

            {/* Industries Section */}
            <section className="py-20 bg-muted/30">
              <div className="container mx-auto px-4">
                <div className="text-center mb-16">
                  <Badge variant="outline" className="mb-4 bg-background/80 backdrop-blur-sm border-primary/20 text-primary">
                    <Globe className="w-4 h-4 mr-2" /> Industries
                  </Badge>
                  <h2 className="text-3xl md:text-4xl font-bold mb-4">Industry-Specific Solutions</h2>
                  <p className="text-lg text-foreground/80 max-w-2xl mx-auto">
                    Tailored AI solutions designed for your specific industry challenges.
                  </p>
                </div>

                <div className="flex flex-wrap justify-center gap-2 mb-12">
                  {Object.keys(industries).map((key) => (
                    <button
                      key={key}
                      onClick={() => setSelectedIndustry(key)}
                      className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                        selectedIndustry === key
                          ? 'bg-gradient-to-r from-purple-500 to-blue-500 text-white'
                          : 'bg-background/80 backdrop-blur-sm border border-border/40 hover:bg-accent/50'
                      }`}
                    >
                      {industries[key].title}
                    </button>
                  ))}
                </div>

                <motion.div
                  key={selectedIndustry}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <Card className="bg-background/50 backdrop-blur-sm border-border/30">
                    <CardContent className="p-8">
                      <h3 className="text-2xl font-bold mb-6 text-center">{industries[selectedIndustry].title}</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {industries[selectedIndustry].solutions.map((solution, index) => (
                          <div key={index} className="flex items-start space-x-3">
                            <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                            <span className="text-foreground/80">{solution}</span>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              </div>
            </section>

            {/* Process Section */}
            <section className="py-20 bg-background">
              <div className="container mx-auto px-4">
                <div className="text-center mb-16">
                  <Badge variant="outline" className="mb-4 bg-background/80 backdrop-blur-sm border-primary/20 text-primary">
                    <Settings className="w-4 h-4 mr-2" /> Process
                  </Badge>
                  <h2 className="text-3xl md:text-4xl font-bold mb-4">How It Works</h2>
                  <p className="text-lg text-foreground/80 max-w-2xl mx-auto">
                    From onboarding to optimization, we guide you every step of the way.
                  </p>
                </div>

                <div className="relative">
                  <div className="absolute left-1/2 transform -translate-x-0.5 w-0.5 h-full bg-gradient-to-b from-purple-500/20 to-blue-500/20 hidden lg:block"></div>
                  <div className="space-y-12">
                    {process.map((item, index) => (
                      <div key={index} className={`relative flex items-center ${
                        index % 2 === 0 ? 'lg:justify-start' : 'lg:justify-end'
                      } justify-center`}>
                        <div className={`w-full lg:w-5/12 ${
                          index % 2 === 0 ? 'lg:pr-8 lg:text-right' : 'lg:pl-8 lg:text-left'
                        } text-center lg:text-left`}>
                          <Card className="bg-gradient-to-br from-purple-500/5 to-blue-500/5 hover:shadow-lg transition-shadow">
                            <CardContent className="p-8">
                              <div className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-500 to-blue-500 mb-4">{item.step}</div>
                              <h3 className="text-xl font-semibold mb-4">{item.title}</h3>
                              <p className="text-foreground/80">{item.description}</p>
                            </CardContent>
                          </Card>
                        </div>
                        <div className="absolute left-1/2 transform -translate-x-1/2 w-6 h-6 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full border-4 border-background hidden lg:block"></div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </section>

            {/* Testimonials Section */}
            <section className="py-20 bg-muted/30">
              <div className="container mx-auto px-4">
                <div className="text-center mb-16">
                  <Badge variant="outline" className="mb-4 bg-background/80 backdrop-blur-sm border-primary/20 text-primary">
                    <Users className="w-4 h-4 mr-2" /> Testimonials
                  </Badge>
                  <h2 className="text-3xl md:text-4xl font-bold mb-4">Client Success Stories</h2>
                  <p className="text-lg text-foreground/80 max-w-2xl mx-auto">
                    See how industry leaders are transforming their operations.
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  {testimonials.map((testimonial, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.3, delay: index * 0.1 }}
                    >
                      <Card className="bg-background/50 backdrop-blur-sm hover:shadow-lg transition-shadow">
                        <CardContent className="p-8">
                          <div className="flex mb-4">
                            {[...Array(testimonial.rating)].map((_, i) => (
                              <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                            ))}
                          </div>
                          <blockquote className="text-foreground/80 mb-6 italic">
                            "{testimonial.quote}"
                          </blockquote>
                          <div>
                            <div className="font-semibold">{testimonial.author}</div>
                            <div className="text-foreground/70 text-sm">{testimonial.role}</div>
                          </div>
                        </CardContent>
                      </Card>
                    </motion.div>
                  ))}
                </div>
              </div>
            </section>

            {/* CTA Section */}
            <section className="py-20 bg-gradient-to-r from-purple-500 to-blue-500">
              <div className="container mx-auto px-4 text-center">
                <Badge variant="outline" className="mb-4 bg-background/20 backdrop-blur-sm border-white/20 text-white">
                  <Zap className="w-4 h-4 mr-2" /> Get Started
                </Badge>
                <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">Ready to Transform Your Operations with AI?</h2>
                <p className="text-lg text-white/80 mb-8 max-w-2xl mx-auto">
                  Join thousands of businesses that are already automating their operations with our AI solutions.
                </p>
                <div className="flex flex-wrap justify-center gap-4">
                  <button className="px-8 py-3 bg-white text-purple-600 rounded-lg font-medium hover:bg-white/90 transition-all duration-200">
                    Start Free Trial
                  </button>
                  <button className="px-8 py-3 bg-transparent border border-white text-white rounded-lg font-medium hover:bg-white/10 transition-all duration-200">
                    Contact Sales
                  </button>
                </div>
              </div>
            </section>
            
         
          </motion.div>
        </AnimatePresence>
      </main>
    </div>
  );
};

export default AIOperationsLanding;