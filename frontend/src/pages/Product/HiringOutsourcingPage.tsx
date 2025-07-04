import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { 
  CheckCircle, Users, Clock, Star, ArrowRight, Target, Zap, Shield, Trophy, 
  MessageCircle, Phone, Mail, Sparkles, Award, TrendingUp, Briefcase, 
  UserCheck, BarChart2, Globe, ShieldCheck 
} from 'lucide-react';
import Navbar from '@/components/Layout/Navbar';
import Footer from '@/components/Layout/Footer';
import { cn } from '@/lib/utils';
import HRHiringForm from '../Form/HROutSourcingForm';

// Types
type ContactForm = {
  name: string;
  email: string;
  company: string;
  companySize: string;
  package: string;
  message: string;
};

type Package = {
  id: string;
  name: string;
  price: string;
  period: string;
  description: string;
  gradient: string;
  features: string[];
  popular: boolean;
  savings: string;
};

type Benefit = {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  description: string;
  color: string;
};

type TrustedCompany = {
  name: string;
  color: string;
};

const HiringOutsourcingPage = () => {
  // Data
  const packages: Package[] = [
    {
      id: 'basic',
      name: 'Intern Talent-Link',
      price: 'Flat ₹2,000',
      period: 'per intern placement',
      description: 'Perfect for small teams with straightforward hiring needs',
      gradient: 'from-blue-500 to-cyan-500',
      features: [
        'Dedicated intern sourcing & screening',
        'Interview scheduling & coordination',
        'Onboarding support materials',
        'Monthly check-ins & progress reports',
        'Compliance with internship regulations',
        '1-month replacement guarantee if intern departs early'
      ],
      popular: false,
      savings: '60% Time Saved'
    },
    {
      id: 'pro',
      name: 'Full-Time ExpertCare',
      price: '10%',
      period: 'of employee\'s annual salary',
      description: 'Comprehensive hiring solution for growing companies',
      gradient: 'from-purple-500 to-pink-500',
      features: [
        'End-to-end recruitment (sourcing, screening, interviewing)',
        'Offer negotiation & onboarding',
        'Payroll setup & processing',
        'Benefits administration & statutory compliance',
        'Dedicated HR account manager',
        'Quarterly performance insights',
        '1-month replacement guarantee if hire exits within 30 days'
      ],
      popular: true,
      savings: 'Most Popular'
    },
    {
      id: 'enterprise',
      name: 'Project-Flex Freelance',
      price: '5%',
      period: 'of contractor\'s project fee',
      description: 'Full-service recruitment for large organizations',
      gradient: 'from-indigo-500 to-purple-500',
      features: [
        'Curated freelancer marketplace access',
        'Skill-based vetting & portfolio review',
        'Contract drafting & milestone tracking',
        'Invoicing support & payment facilitation',
        'Quick scale-up/down flexibility',
        'Project delivery check-ins',
        '1-month replacement guarantee if contractor disengages early'
      ],
      popular: false,
      savings: 'Flexible Scale'
    }
  ];

  const trustedCompanies: TrustedCompany[] = [
    { name: 'TechCorp', color: 'from-blue-500 to-blue-600' },
    { name: 'InnovateLab', color: 'from-green-500 to-green-600' },
    { name: 'StartupXYZ', color: 'from-purple-500 to-purple-600' },
    { name: 'DigitalFlow', color: 'from-pink-500 to-pink-600' },
    { name: 'CloudTech', color: 'from-indigo-500 to-indigo-600' },
    { name: 'DataDriven', color: 'from-orange-500 to-orange-600' }
  ];

  const benefits: Benefit[] = [
    {
      icon: Clock,
      title: 'Save 60% Time',
      description: 'Reduce hiring time significantly with our streamlined process and dedicated team',
      color: 'from-blue-500 to-cyan-500'
    },
    {
      icon: Users,
      title: 'Expert Recruiters',
      description: 'Work with experienced recruiters who specialize in your industry vertical',
      color: 'from-purple-500 to-pink-500'
    },
    {
      icon: Target,
      title: 'Quality Candidates',
      description: 'Access to pre-vetted, high-quality talent pool with proven track records',
      color: 'from-indigo-500 to-purple-500'
    },
    {
      icon: Shield,
      title: 'Risk-Free Hiring',
      description: 'Comprehensive replacement guarantee and compliance support included',
      color: 'from-green-500 to-emerald-500'
    },
    {
      icon: Zap,
      title: 'Rapid Deployment',
      description: 'Get candidates in front of you within 48 hours of request submission',
      color: 'from-orange-500 to-red-500'
    },
    {
      icon: Trophy,
      title: '98% Success Rate',
      description: 'Industry-leading placement success rate with long-term retention focus',
      color: 'from-yellow-500 to-orange-500'
    }
  ];

  // State
  const [contactForm, setContactForm] = useState<ContactForm>({
    name: '',
    email: '',
    company: '',
    companySize: '',
    package: '',
    message: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedPackage, setSelectedPackage] = useState<string | null>(null);
  const [formErrors, setFormErrors] = useState<Partial<ContactForm>>({});

  // Effects
  useEffect(() => {
    document.title = "Hiring & Outsourcing - VORTEX AI";
    
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

  // Handlers
  const handleInputChange = (field: keyof ContactForm, value: string) => {
    setContactForm(prev => ({ ...prev, [field]: value }));
    // Clear error when field is updated
    if (formErrors[field]) {
      setFormErrors(prev => ({ ...prev, [field]: undefined }));
    }
  };

  const validateForm = (): boolean => {
    const errors: Partial<ContactForm> = {};
    if (!contactForm.name.trim()) errors.name = 'Name is required';
    if (!contactForm.email.trim()) {
      errors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(contactForm.email)) {
      errors.email = 'Please enter a valid email';
    }
    if (!contactForm.company.trim()) errors.company = 'Company name is required';

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setIsSubmitting(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      console.log('Contact form submitted:', contactForm);
      
      // Reset form
      setContactForm({
        name: '',
        email: '',
        company: '',
        companySize: '',
        package: '',
        message: ''
      });
      setSelectedPackage(null);
      
      // Show success message
      alert('Thank you! We\'ll get back to you within 2 hours with a custom proposal.');
    } catch (error) {
      console.error('Submission error:', error);
      alert('There was an error submitting your request. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handlePackageSelect = (packageName: string) => {
    setSelectedPackage(packageName);
    handleInputChange('package', packageName);
  };

  return (
    <AnimatePresence>
      <motion.div 
        className="min-h-screen bg-background relative"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5 }}
      >
        {/* Background Grid Pattern */}
        <div className="fixed inset-0 bg-grid-light dark:bg-grid-dark opacity-40 dark:opacity-20 pointer-events-none" />
        
        {/* Animated background elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-40 -right-40 w-[40rem] h-[40rem] bg-gradient-to-br from-purple-500/10 to-transparent rounded-full blur-3xl animate-pulse parallax-bg" />
          <div className="absolute -bottom-40 -left-40 w-[40rem] h-[40rem] bg-gradient-to-tr from-blue-500/10 to-transparent rounded-full blur-3xl animate-pulse delay-1000 parallax-bg" />
        </div>
        
        <Navbar />
        
        <main className="relative z-10 px-4 sm:px-6 lg:px-8">
          {/* Page content */}
          {/* Hero Section */}
          <section className="relative overflow-hidden pt-24 pb-20 max-w-7xl mx-auto">
            <div className="absolute inset-0 bg-gradient-to-b from-background/80 to-background/60" />
            
            <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
              <div className="text-center mb-16">
                <motion.div 
                  className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm rounded-full px-6 py-3 mb-8"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6 }}
                >
                  <Sparkles className="w-5 h-5 text-yellow-300" />
                  <span className="text-foreground dark:text-white/90 font-medium">Trusted by 500+ Companies</span>
                </motion.div>
                
                <motion.h1 
                  className="text-5xl md:text-7xl font-bold text-foreground dark:text-white mb-8 leading-tight"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6 }}
                >
                  Hire Smarter,
                  <br />
                  <span className="bg-gradient-to-r from-yellow-300 via-pink-300 to-cyan-300 bg-clip-text text-transparent">
                    Not Harder
                  </span>
                </motion.h1>
                
                <motion.p 
                  className="text-xl md:text-2xl text-foreground/90 dark:text-white/90 max-w-4xl mx-auto leading-relaxed mb-12"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.1 }}
                >
                  Let our expert recruiters handle your entire hiring process. From sourcing to onboarding, 
                  we deliver quality candidates while you focus on growing your business.
                </motion.p>
                
                <motion.div 
                  className="flex flex-col sm:flex-row gap-4 justify-center"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                >
                  <Button 
                    className="h-14 px-8 bg-gradient-to-r from-yellow-400 to-orange-500 hover:from-yellow-500 hover:to-orange-600 text-black font-bold rounded-xl shadow-2xl hover:shadow-3xl transform hover:scale-105 transition-all duration-200"
                    onClick={() => document.getElementById('HRHiringForm')?.scrollIntoView({ behavior: 'smooth' })}
                    aria-label="Get started with hiring services"
                  >
                    <MessageCircle className="w-5 h-5 mr-2" />
                    Get Started Free
                  </Button>
                  <Button 
                    variant="outline" 
                    className="h-14 px-8 border-2 border-white/30 text-white hover:bg-white/10 backdrop-blur-sm rounded-xl font-semibold"
                    onClick={() => document.getElementById('packages')?.scrollIntoView({ behavior: 'smooth' })}
                    aria-label="View hiring packages"
                  >
                    <Phone className="w-5 h-5 mr-2" />
                    View Packages
                  </Button>
                </motion.div>
                
                {/* Stats */}
                <motion.div 
                  className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-16 max-w-4xl mx-auto"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.3 }}
                >
                  {[
                    { value: '98%', label: 'Success Rate' },
                    { value: '48h', label: 'First Candidates' },
                    { value: '500+', label: 'Happy Clients' },
                    { value: '60%', label: 'Time Saved' }
                  ].map((stat, index) => (
                    <div key={index} className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 text-center">
                      <div className="text-3xl font-bold text-white mb-2">{stat.value}</div>
                      <div className="text-white/80 text-sm">{stat.label}</div>
                    </div>
                  ))}
                </motion.div>
              </div>
            </div>
          </section>

          {/* Benefits Section */}
          <section id="benefits" className="py-20 bg-background/80 backdrop-blur-sm">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <motion.div 
                className="text-center mb-16"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <div className="inline-flex items-center gap-2 bg-gradient-to-r from-purple-500/20 to-blue-500/20 rounded-full px-6 py-3 mb-6">
                  <Award className="w-5 h-5 text-foreground" />
                  <span className="text-foreground text-sm font-medium">Why Choose Us</span>
                </div>
                <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
                  Streamline Your Hiring
                  <br />
                  <span className="bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">
                    Process Today
                  </span>
                </h2>
                <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                  Our comprehensive solutions are designed to meet all your hiring needs with efficiency and excellence.
                </p>
              </motion.div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {benefits.map((benefit, index) => {
                  const Icon = benefit.icon;
                  return (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.4, delay: index * 0.1 }}
                    >
                      <Card className="group h-full bg-card/80 backdrop-blur-sm border border-border/50 shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-[1.02] hover:border-primary/20">
                        <CardContent className="p-8 text-center">
                          <div 
                            className={`w-20 h-20 bg-gradient-to-r ${benefit.color} rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300`}
                            aria-hidden="true"
                          >
                            <Icon className="w-10 h-10 text-white" />
                          </div>
                          <h3 className="text-xl font-bold text-foreground mb-4">{benefit.title}</h3>
                          <p className="text-muted-foreground leading-relaxed">{benefit.description}</p>
                        </CardContent>
                      </Card>
                    </motion.div>
                  );
                })}
              </div>
            </div>
          </section>

          {/* Packages Section */}
          <section id="packages" className="py-20 bg-background/80">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <motion.div 
                className="text-center mb-16"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <div className="inline-flex items-center gap-2 bg-gradient-to-r from-purple-500/20 to-blue-500/20 rounded-full px-6 py-3 mb-6">
                  <Award className="w-5 h-5 text-foreground" />
                  <span className="text-foreground text-sm font-medium">Choose Your Plan</span>
                </div>
                <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
                  Pricing That Scales
                  <br />
                  <span className="bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">
                    With Your Business
                  </span>
                </h2>
                <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                  Transparent pricing with no hidden fees. Pay only for successful placements.
                </p>
              </motion.div>
          
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {packages.map((pkg) => (
                  <motion.div
                    key={pkg.id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4 }}
                  >
                    <Card 
                      className={`relative group cursor-pointer transition-all duration-300 hover:scale-105 border border-border/50 ${
                        selectedPackage === pkg.name 
                          ? 'ring-2 ring-primary/50 shadow-xl' 
                          : 'hover:shadow-xl'
                      } ${pkg.popular ? 'shadow-xl scale-105 border-primary/30' : ''}`}
                      onClick={() => handlePackageSelect(pkg.name)}
                      aria-labelledby={`package-${pkg.id}-title`}
                    >
                      {pkg.popular && (
                        <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                          <Badge className="bg-gradient-to-r from-purple-500 to-blue-500 text-white px-6 py-1.5 text-sm font-bold">
                            <Star className="w-4 h-4 mr-1" />
                            {pkg.savings}
                          </Badge>
                        </div>
                      )}
                      
                      <CardHeader className={`bg-gradient-to-r ${pkg.gradient} text-card-foreground rounded-t-lg relative overflow-hidden p-8`}>
                        <div className="absolute inset-0 bg-black/10" />
                        <div className="relative">
                          <CardTitle id={`package-${pkg.id}-title`} className="text-2xl font-bold mb-2">{pkg.name}</CardTitle>
                          <div className="mb-4">
                            <span className="text-4xl font-bold">{pkg.price}</span>
                            <span className="text-card-foreground/80 ml-2">{pkg.period}</span>
                          </div>
                          <p className="text-card-foreground/90">{pkg.description}</p>
                          
                          {!pkg.popular && (
                            <div className="mt-4">
                              <Badge variant="secondary" className="bg-card-foreground/10 text-card-foreground hover:bg-card-foreground/20">
                                {pkg.savings}
                              </Badge>
                            </div>
                          )}
                        </div>
                      </CardHeader>
                      
                      <CardContent className="p-8 bg-card/50">
                        <ul className="space-y-4 mb-8">
                          {pkg.features.map((feature, index) => (
                            <li key={index} className="flex items-start gap-3">
                              <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                              <span className="text-foreground/90 leading-relaxed">{feature}</span>
                            </li>
                          ))}
                        </ul>
                        
                        <Button 
                          className={`w-full h-12 bg-gradient-to-r ${pkg.gradient} hover:shadow-xl transform hover:scale-[1.02] transition-all duration-200 font-semibold`}
                          onClick={(e) => {
                            e.stopPropagation();
                            handlePackageSelect(pkg.name);
                            document.getElementById('contact-form')?.scrollIntoView({ behavior: 'smooth' });
                          }}
                          aria-label={`Choose ${pkg.name} package`}
                        >
                          Choose {pkg.name}
                          <ArrowRight className="w-4 h-4 ml-2" />
                        </Button>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>

          {/* Contact Form */}
          <section className="max-w-4xl mx-auto mb-20 px-4 sm:px-6">
            {/* <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <Card id="contact-form" className="shadow-2xl border border-border/50 bg-card/80 backdrop-blur-sm overflow-hidden">
                <CardHeader className="bg-gradient-to-r from-foreground to-muted-foreground text-card rounded-t-lg text-center py-12 px-8">
                  <div className="w-16 h-16 bg-card/20 rounded-2xl flex items-center justify-center mx-auto mb-6" aria-hidden="true">
                    <MessageCircle className="w-8 h-8 text-card" />
                  </div>
                  <CardTitle className="text-3xl font-bold mb-4 text-card">Ready to Transform Your Hiring?</CardTitle>
                  <p className="text-card/90 text-lg max-w-2xl mx-auto">
                    Tell us about your hiring needs and we'll create a custom solution tailored for your business.
                    Get a response within 2 hours!
                  </p>
                </CardHeader>
                
                <CardContent className="p-6 sm:p-10 bg-card/50">
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="name" className="text-sm font-semibold text-foreground/90">
                          Full Name *
                        </Label>
                        <Input
                          id="name"
                          value={contactForm.name}
                          onChange={(e) => handleInputChange('name', e.target.value)}
                          placeholder="Enter your full name"
                          className="h-12 border border-border/50 bg-card/50 focus:border-primary/50 rounded-lg"
                          required
                          aria-invalid={!!formErrors.name}
                          aria-describedby={formErrors.name ? "name-error" : undefined}
                        />
                        {formErrors.name && (
                          <p id="name-error" className="text-sm text-red-500">
                            {formErrors.name}
                          </p>
                        )}
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="email" className="text-sm font-semibold text-foreground/90">
                          Work Email *
                        </Label>
                        <Input
                          id="email"
                          type="email"
                          value={contactForm.email}
                          onChange={(e) => handleInputChange('email', e.target.value)}
                          placeholder="you@company.com"
                          className="h-12 border border-border/50 bg-card/50 focus:border-primary/50 rounded-lg"
                          required
                          aria-invalid={!!formErrors.email}
                          aria-describedby={formErrors.email ? "email-error" : undefined}
                        />
                        {formErrors.email && (
                          <p id="email-error" className="text-sm text-red-500">
                            {formErrors.email}
                          </p>
                        )}
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="company" className="text-sm font-semibold text-foreground/90">
                          Company Name *
                        </Label>
                        <Input
                          id="company"
                          value={contactForm.company}
                          onChange={(e) => handleInputChange('company', e.target.value)}
                          placeholder="Your company name"
                          className="h-12 border border-border/50 bg-card/50 focus:border-primary/50 rounded-lg"
                          required
                          aria-invalid={!!formErrors.company}
                          aria-describedby={formErrors.company ? "company-error" : undefined}
                        />
                        {formErrors.company && (
                          <p id="company-error" className="text-sm text-red-500">
                            {formErrors.company}
                          </p>
                        )}
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="companySize" className="text-sm font-semibold text-foreground/90">
                          Company Size
                        </Label>
                        <Select 
                          value={contactForm.companySize} 
                          onValueChange={(value) => handleInputChange('companySize', value)}
                        >
                          <SelectTrigger className="h-12 border border-border/50 bg-card/50 focus:border-primary/50 rounded-lg">
                            <SelectValue placeholder="Select company size" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="1-10">1-10 employees</SelectItem>
                            <SelectItem value="11-50">11-50 employees</SelectItem>
                            <SelectItem value="51-200">51-200 employees</SelectItem>
                            <SelectItem value="201-1000">201-1000 employees</SelectItem>
                            <SelectItem value="1000+">1000+ employees</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="package" className="text-sm font-semibold text-foreground/90">
                        Interested Package
                      </Label>
                      <Select 
                        value={contactForm.package} 
                        onValueChange={(value) => handleInputChange('package', value)}
                      >
                        <SelectTrigger className="h-12 border border-border/50 bg-card/50 focus:border-primary/50 rounded-lg">
                          <SelectValue placeholder="Select a package" />
                        </SelectTrigger>
                        <SelectContent>
                          {packages.map((pkg) => (
                            <SelectItem key={pkg.id} value={pkg.name}>
                              {pkg.name}
                            </SelectItem>
                          ))}
                          <SelectItem value="Custom Solution">Custom Solution</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="message" className="text-sm font-semibold text-foreground/90">
                        Tell us about your hiring needs
                      </Label>
                      <Textarea
                        id="message"
                        value={contactForm.message}
                        onChange={(e) => handleInputChange('message', e.target.value)}
                        placeholder="Describe the roles you're hiring for, timeline, specific requirements, budget range, etc."
                        rows={5}
                        className="border border-border/50 bg-card/50 focus:border-primary/50 rounded-lg resize-none"
                      />
                    </div>

                    <Button 
                      type="submit"
                      className="w-full h-14 text-lg bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 hover:from-blue-700 hover:via-purple-700 hover:to-pink-700 text-white font-bold rounded-xl shadow-2xl hover:shadow-3xl transform hover:scale-[1.02] transition-all duration-200"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? (
                        <div className="flex items-center gap-3">
                          <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                          Sending Request...
                        </div>
                      ) : (
                        <div className="flex items-center gap-3">
                          <Mail className="w-6 h-6" />
                          Get Custom Proposal (2 Hour Response)
                        </div>
                      )}
                    </Button>
                    
                    <div className="text-center text-sm text-muted-foreground">
                      <ShieldCheck className="inline-block w-4 h-4 mr-1" />
                      Your information is secure and will never be shared with third parties
                    </div>
                  </form>
                </CardContent>
              </Card>
            </motion.div> */}
            <div id="HRHiringForm">
              <HRHiringForm/>
            </div>

            {/* Trusted By Section */}
            <motion.div 
              className="text-center mb-20"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h3 className="text-3xl font-bold text-foreground mb-4">Trusted by Industry Leaders</h3>
              <p className="text-muted-foreground mb-12 text-lg">Join 500+ companies that have transformed their hiring process</p>
              
              <div className="grid grid-cols-2 md:grid-cols-6 gap-6 items-center">
                {trustedCompanies.map((company, index) => (
                  <motion.div 
                    key={index}
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                    className="group cursor-pointer"
                  >
                    <div 
                      className={`h-20 bg-gradient-to-r ${company.color} rounded-2xl flex items-center justify-center shadow-lg group-hover:shadow-xl group-hover:scale-110 transition-all duration-300`}
                      aria-label={company.name}
                    >
                      <span className="text-white font-bold text-sm px-2">{company.name}</span>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Success Metrics */}
            <motion.div 
              className="p-8 bg-gradient-to-r from-green-50 to-emerald-50 rounded-2xl"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4 text-green-800">
                <TrendingUp className="w-8 h-8 flex-shrink-0" />
                <div className="text-center sm:text-left">
                  <div className="text-2xl font-bold">Average 98% Client Satisfaction</div>
                  <div className="text-green-700">Based on 1000+ successful placements</div>
                </div>
              </div>
            </motion.div>
          </section>
        </main>
        
        <Footer />

        
        {/* Smooth scroll behavior */}
        <style jsx global>{`
          html {
            scroll-behavior: smooth;
          }
        `}</style>
      </motion.div>
    </AnimatePresence>
  );
};

export default HiringOutsourcingPage;