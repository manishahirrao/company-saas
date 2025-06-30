
import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { MapPin, Clock, DollarSign, Users, Coffee, Laptop, Heart, TrendingUp, IndianRupee, ArrowRight, Zap, Briefcase } from 'lucide-react';
import Navbar from '@/components/Layout/Navbar';
import Footer from '@/components/Layout/Footer';

const CareersPage: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    document.title = 'Careers - VORTEX AI';
  }, []);
  const openPositions = [
    {
      title: 'Senior Software Engineer',
      department: 'Engineering',
      location: 'San Francisco, CA / Remote',
      type: 'Full-time',
      salary: '130k - 180k',
      description: 'Join our engineering team to build the next generation of AI-powered career tools.',
      requirements: ['5+ years of React/Node.js experience', 'Experience with AI/ML systems', 'Strong CS fundamentals'],
      posted: '2 days ago'
    },
    {
      title: 'Product Marketing Manager',
      department: 'Marketing',
      location: 'New York, NY / Remote',
      type: 'Full-time',
      salary: '90k - 130k',
      description: 'Drive product marketing strategy and go-to-market execution for our AI features.',
      requirements: ['3+ years product marketing experience', 'B2B SaaS background', 'Data-driven mindset'],
      posted: '1 week ago'
    },
    {
      title: 'UX/UI Designer',
      department: 'Design',
      location: 'Austin, TX / Remote',
      type: 'Full-time',
      salary: '85k - 120k',
      description: 'Design intuitive user experiences for our AI-powered career advancement platform.',
      requirements: ['4+ years UX/UI design experience', 'Figma proficiency', 'User research skills'],
      posted: '3 days ago'
    },
    {
      title: 'Customer Success Manager',
      department: 'Customer Success',
      location: 'Chicago, IL / Remote',
      type: 'Full-time',
      salary: '70k - 95k',
      description: 'Help our enterprise customers achieve success with PostPilot\'s platform.',
      requirements: ['2+ years customer success experience', 'SaaS experience preferred', 'Excellent communication'],
      posted: '5 days ago'
    },
    {
      title: 'AI/ML Engineer',
      department: 'Engineering',
      location: 'Remote',
      type: 'Full-time',
      salary: '150k - 200k',
      description: 'Build and improve our AI models for content generation and job matching.',
      requirements: ['PhD or MS in CS/ML', 'Experience with LLMs', 'Python/PyTorch expertise'],
      posted: '1 day ago'
    }
  ];

  const benefits = [
    {
      icon: <Heart className="w-6 h-6 text-red-500" />,
      title: 'Health & Wellness',
      description: 'Comprehensive health, dental, and vision insurance plus wellness stipend'
    },
    {
      icon: <Laptop className="w-6 h-6 text-blue-500" />,
      title: 'Remote-First',
      description: 'Work from anywhere with flexible hours and home office setup allowance'
    },
    {
      icon: <TrendingUp className="w-6 h-6 text-green-500" />,
      title: 'Growth & Learning',
      description: '$2,000 annual learning budget and mentorship programs'
    },
    {
      icon: <Coffee className="w-6 h-6 text-orange-500" />,
      title: 'Work-Life Balance',
      description: 'Unlimited PTO, parental leave, and mental health support'
    },
    {
      icon: <Users className="w-6 h-6 text-purple-500" />,
      title: 'Equity Package',
      description: 'Competitive equity compensation for all employees'
    },
    {
      icon: <IndianRupee className="w-6 h-6 text-yellow-500" />,
      title: 'Competitive Pay',
      description: 'Market-leading salaries with annual reviews and bonuses'
    }
  ];

  const values = [
    'Innovation & Excellence',
    'Diversity & Inclusion',
    'Transparency & Trust',
    'Customer Obsession',
    'Continuous Learning',
    'Work-Life Balance'
  ];

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background relative">
        <div className="fixed inset-0 bg-grid-light dark:bg-grid-dark opacity-40 dark:opacity-30 pointer-events-none" />
        <main className="relative z-10 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto py-24 text-center space-y-8">
            <div className="h-16 bg-gradient-to-r from-electric-purple/20 to-neon-blue/20 rounded-lg animate-pulse mx-auto max-w-2xl" />
            <div className="h-6 bg-muted/50 rounded mx-auto max-w-3xl animate-pulse" />
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
        <div className="fixed inset-0 bg-grid-light dark:bg-grid-dark opacity-40 dark:opacity-30 pointer-events-none" />
        
        <Navbar />
        
        <main className="relative z-10">
          {/* Hero Section */}
          <section className="relative py-20 md:py-28 overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-electric-purple/5 via-transparent to-neon-blue/5" />
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
              <div className="text-center max-w-4xl mx-auto">
                <Badge className="mb-6 bg-gradient-to-r from-electric-purple to-neon-blue text-white border-0">
                  Join Our Team
                </Badge>
                <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-6 bg-clip-text text-transparent bg-gradient-to-r from-foreground to-foreground/70">
                  Build the Future of
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-electric-purple to-neon-blue">
                    {" "}Career Technology
                  </span>
                </h1>
                <p className="text-xl text-foreground/80 max-w-2xl mx-auto mb-8">
                  Join our mission to democratize professional success. We're looking for passionate 
                  individuals who want to make a real impact on millions of careers worldwide.
                </p>
                <div className="flex flex-wrap justify-center gap-4">
                  <Button className="group" size="lg">
                    <span className="group-hover:translate-x-1 transition-transform duration-200">
                      View Open Positions
                    </span>
                    <ArrowRight className="ml-2 h-4 w-4 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-200" />
                  </Button>
                  <Button variant="outline" size="lg" className="group">
                    <span className="group-hover:translate-x-1 transition-transform duration-200">
                      Learn About Our Culture
                    </span>
                    <ArrowRight className="ml-2 h-4 w-4 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-200" />
                  </Button>
                </div>
              </div>
            </div>
          </section>

          {/* Benefits Section */}
          <section className="py-16 md:py-24 bg-muted/30">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center max-w-3xl mx-auto mb-16">
                <Badge className="mb-4 bg-gradient-to-r from-electric-purple to-neon-blue text-white border-0">
                  Why Join Us
                </Badge>
                <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                  More Than Just a Job
                </h2>
                <p className="text-foreground/70">
                  We offer a comprehensive benefits package and a culture that supports your growth and well-being.
                </p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {benefits.map((benefit, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1, duration: 0.5 }}
                    className="h-full"
                  >
                    <Card className="h-full border-border/50 hover:border-primary/30 transition-all duration-300 hover:shadow-lg">
                      <CardContent className="p-6">
                        <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4 text-primary">
                          {benefit.icon}
                        </div>
                        <h3 className="text-xl font-semibold text-foreground mb-2">
                          {benefit.title}
                        </h3>
                        <p className="text-foreground/70">
                          {benefit.description}
                        </p>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>

          {/* Values Section */}
          <section className="py-16 md:py-24">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="bg-gradient-to-br from-card to-card/80 border border-border/50 rounded-2xl p-8 md:p-12 overflow-hidden">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                  <motion.div
                    initial={{ opacity: 0, x: -50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                  >
                    <Badge className="mb-4 bg-gradient-to-r from-electric-purple to-neon-blue text-white border-0">
                      Our Culture
                    </Badge>
                    <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
                      Our Values Drive Everything We Do
                    </h2>
                    <p className="text-foreground/80 mb-8 text-lg">
                      We're building more than a product - we're creating a culture where everyone 
                      can thrive and do their best work while making a meaningful impact on the world.
                    </p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {values.map((value, index) => (
                        <div key={index} className="flex items-center space-x-3">
                          <div className="w-2 h-2 rounded-full bg-gradient-to-r from-electric-purple to-neon-blue"></div>
                          <span className="text-foreground/90">{value}</span>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                  
                  <motion.div 
                    className="relative"
                    initial={{ opacity: 0, x: 50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                  >
                    <Card className="bg-card/80 backdrop-blur-sm border-border/50 shadow-sm">
                      <CardContent className="p-6">
                        <h3 className="text-xl font-semibold text-foreground mb-6 flex items-center">
                          <Briefcase className="w-5 h-5 mr-2 text-primary" />
                          Life at VORTEX AI
                        </h3>
                        <div className="space-y-4">
                          <div className="flex items-center justify-between">
                            <span className="text-foreground/80">Team Size</span>
                            <span className="font-medium text-foreground">45 people</span>
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="text-foreground/80">Average Age</span>
                            <span className="font-medium text-foreground">32 years</span>
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="text-foreground/80">Remote Workers</span>
                            <span className="font-medium text-foreground">80%</span>
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="text-foreground/80">Countries</span>
                            <span className="font-medium text-foreground">12</span>
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="text-foreground/80">Diversity</span>
                            <span className="font-medium text-foreground">60% underrepresented</span>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                </div>
              </div>
            </div>
          </section>

          {/* Open Positions */}
          <section className="py-16 md:py-24 bg-muted/10">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center max-w-3xl mx-auto mb-16">
                <Badge className="mb-4 bg-gradient-to-r from-electric-purple to-neon-blue text-white border-0">
                  Join Our Team
                </Badge>
                <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                  Open Positions
                </h2>
                <p className="text-foreground/70">
                  Find your perfect role and help us shape the future of work
                </p>
              </div>
              
              <motion.div 
                className="max-w-4xl mx-auto space-y-6"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
              >
                {openPositions.map((position, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1, duration: 0.5 }}
                  >
                    <Card className="hover:shadow-lg transition-all duration-300 border-l-4 border-primary/80 group hover:border-primary">
                      <CardContent className="p-6">
                        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                          <div>
                            <h3 className="text-xl font-bold text-foreground group-hover:text-primary transition-colors">
                              {position.title}
                            </h3>
                            <div className="flex flex-wrap items-center gap-3 mt-2 text-sm text-muted-foreground">
                              <span className="flex items-center">
                                <MapPin className="w-4 h-4 mr-1" />
                                {position.location}
                              </span>
                              <span className="text-muted-foreground/30">•</span>
                              <span className="flex items-center">
                                <Clock className="w-4 h-4 mr-1" />
                                {position.type}
                              </span>
                              <span className="text-muted-foreground/30">•</span>
                              <span className="flex items-center">
                                <DollarSign className="w-4 h-4 mr-1" />
                                {position.salary}
                              </span>
                            </div>
                          </div>
                          <Button className="group" variant="outline">
                            <span className="group-hover:translate-x-1 transition-transform duration-200">
                              Apply Now
                            </span>
                            <ArrowRight className="ml-2 h-4 w-4 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-200" />
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </motion.div>
              
              <motion.div 
                className="text-center mt-16"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <p className="text-foreground/80 mb-6">
                  Don't see a role that fits? We're always looking for talented individuals.
                </p>
                <Button variant="outline" className="border-dashed group">
                  <span className="group-hover:translate-x-1 transition-transform duration-200">
                    Contact Us About Future Opportunities
                  </span>
                  <ArrowRight className="ml-2 h-4 w-4 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-200" />
                </Button>
              </motion.div>
            </div>
          </section>

          {/* CTA Section */}
          <section className="relative py-20 md:py-28 overflow-hidden bg-gradient-to-br from-electric-purple to-neon-blue text-white">
            <div className="absolute inset-0 opacity-10">
              <div className="absolute inset-0 bg-grid-light pointer-events-none" />
            </div>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
              <motion.div 
                className="text-center max-w-4xl mx-auto"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
              >
                <Badge className="mb-6 bg-white/10 text-white border-white/20 backdrop-blur-sm">
                  We're Hiring
                </Badge>
                <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-6">
                  Ready to Join Our Team?
                </h2>
                <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
                  We're always looking for talented individuals who are passionate about making a difference.
                  Browse our open positions and start your journey with us today.
                </p>
                <div className="flex flex-wrap justify-center gap-4">
                  <Button 
                    size="lg" 
                    className="bg-white text-electric-purple hover:bg-white/90 group"
                  >
                    <span className="group-hover:translate-x-1 transition-transform duration-200">
                      View Open Positions
                    </span>
                    <ArrowRight className="ml-2 h-4 w-4 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-200" />
                  </Button>
                  <Button 
                    size="lg" 
                    variant="outline" 
                    className="text-white border-white/30 hover:bg-white/10 group"
                  >
                    <span className="group-hover:translate-x-1 transition-transform duration-200">
                      Contact Our Team
                    </span>
                    <ArrowRight className="ml-2 h-4 w-4 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-200" />
                  </Button>
                </div>
              </motion.div>
            </div>
          </section>
        </main>
        
        <Footer />
      </motion.div>
    </AnimatePresence>
  );
};

export default CareersPage;
