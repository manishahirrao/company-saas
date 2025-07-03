import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ArrowRight, Shield, Zap, Users, Award, Check, Star, TrendingUp } from 'lucide-react';
import { GridBackground } from '@/components/GridBackground';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export const WhyUsPage: React.FC = () => {
  const differentiators = [
    {
      icon: <Shield className="w-6 h-6" />,
      title: 'Enterprise Security & Compliance',
      description: 'Enterprise-grade security with SOC 2 Type II, ISO 27001, and GDPR compliance. Your data is protected with end-to-end encryption.',
      features: ['SOC 2 Type II certified', 'ISO 27001 compliant', 'GDPR compliant', 'End-to-end encryption'],
      gradient: 'from-blue-500/10 to-blue-600/10 text-blue-500'
    },
    {
      icon: <Zap className="w-6 h-6" />,
      title: 'Enterprise Integration Platform',
      description: 'Seamless integration with enterprise systems and workflows. Native API support for custom integrations.',
      features: ['Custom API endpoints', 'Enterprise SSO', 'LDAP integration', 'Custom workflows'],
      gradient: 'from-purple-500/10 to-purple-600/10 text-purple-500'
    },
    {
      icon: <Users className="w-6 h-6" />,
      title: 'Dedicated Support Team',
      description: '24/7 dedicated support with guaranteed SLAs. Your success is our top priority.',
      features: ['24/7 support', 'Dedicated account manager', 'Guaranteed response times', 'Proactive monitoring'],
      gradient: 'from-green-500/10 to-green-600/10 text-green-500'
    },
    {
      icon: <Award className="w-6 h-6" />,
      title: 'Proven Track Record',
      description: 'Trusted by Fortune 500 companies and high-growth startups alike.',
      features: ['Proven results', 'Enterprise-grade reliability', 'Scalable solutions', 'Industry expertise'],
      gradient: 'from-amber-500/10 to-amber-600/10 text-amber-500'
    }
  ];

  const stats = [
    { number: '99.9%', label: 'Uptime SLA', icon: <TrendingUp className="w-6 h-6" /> },
    { number: '24/7', label: 'Support', icon: <Users className="w-6 h-6" /> },
    { number: '100+', label: 'Enterprise Clients', icon: <Award className="w-6 h-6" /> },
    { number: '1M+', label: 'Daily Users', icon: <Zap className="w-6 h-6" /> }
  ];

  const features = [
    'Advanced analytics dashboard',
    'Custom reporting',
    'Role-based access control',
    'Audit logs',
    'Compliance reporting',
    'Data encryption at rest and in transit'
  ];

  const testimonials = [
    {
      quote: "PostPilot has transformed how we manage our social media presence. The platform is intuitive and powerful.",
      author: "Sarah Johnson",
      role: "Marketing Director, TechCorp",
      rating: 5
    },
    {
      quote: "The level of support and customization options are unmatched. Truly an enterprise-grade solution.",
      author: "Michael Chen",
      role: "CTO, InnovateX",
      rating: 5
    }
  ];

  return (
    <GridBackground>
      <div className="min-h-screen pt-16 overflow-hidden">

      {/* Hero Section */}
      <section className="relative py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Badge variant="outline" className="mb-6 bg-background/50 border-border/50 text-foreground/80">
              Why Choose Us
            </Badge>
            <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-6">
              Enterprise-Grade Solutions
              <span className="gradient-text"> Built for Scale</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
              Trusted by leading companies worldwide to power their most critical business operations with reliability, security, and performance.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="gap-2 group">
                <Link to="/contact" className="relative overflow-hidden">
                  <span className="relative z-10">Get Started</span>
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                  <span className="absolute inset-0 bg-gradient-to-r from-electric-purple to-neon-blue opacity-0 group-hover:opacity-100 transition-opacity"></span>
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link to="/contact/sales" className="group">
                  <span className="relative z-10">Contact Sales</span>
                </Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-12 bg-gradient-to-r from-background/50 to-muted/30 border-y border-border/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                className="text-center p-6 bg-card/50 backdrop-blur-sm rounded-xl border border-border/30"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-gradient-to-br from-electric-purple/20 to-neon-blue/20 flex items-center justify-center text-foreground">
                  {stat.icon}
                </div>
                <div className="text-3xl font-bold text-foreground mb-2">{stat.number}</div>
                <div className="text-muted-foreground text-sm">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Differentiators */}
      <section className="py-20 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center gap-2 bg-gradient-to-r from-electric-purple/20 to-neon-blue/20 rounded-full px-6 py-3 mb-6">
              <span className="text-foreground text-sm font-medium">Why Choose Us</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
              Enterprise-Grade Excellence
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              We deliver the highest standards of quality, security, and performance for your business
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {differentiators.map((item, index) => (
              <motion.div
                key={index}
                className="group relative bg-card/80 backdrop-blur-sm rounded-2xl p-8 border border-border/50 hover:border-primary/30 transition-all duration-300 hover:shadow-xl overflow-hidden"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-electric-purple to-neon-blue" />
                
                <div className="flex items-start mb-6">
                  <div className={`p-3 rounded-xl ${item.gradient} mr-4`}>
                    {item.icon}
                  </div>
                  <h3 className="text-xl font-semibold text-foreground">
                    {item.title}
                  </h3>
                </div>

                <p className="text-muted-foreground mb-6 leading-relaxed">
                  {item.description}
                </p>

                <ul className="space-y-2">
                  {item.features.map((feature, i) => (
                    <li key={i} className="flex items-start text-sm text-muted-foreground">
                      <Check className="w-4 h-4 text-green-500 mt-0.5 mr-2 flex-shrink-0" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-gradient-to-br from-background/50 to-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center gap-2 bg-gradient-to-r from-electric-purple/20 to-neon-blue/20 rounded-full px-6 py-3 mb-6">
              <span className="text-foreground text-sm font-medium">Testimonials</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
              Trusted by Industry Leaders
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                className="bg-card/80 backdrop-blur-sm rounded-2xl p-8 border border-border/50 hover:border-primary/30 transition-all duration-300 hover:shadow-xl"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
              >
                <div className="flex items-center gap-2 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star 
                      key={i} 
                      className={`w-5 h-5 ${i < testimonial.rating ? 'text-amber-400 fill-amber-400' : 'text-muted-foreground/20'}`} 
                    />
                  ))}
                </div>
                <blockquote className="text-lg text-foreground/90 mb-6 italic">"{testimonial.quote}"</blockquote>
                <div className="flex items-center">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-electric-purple to-neon-blue flex items-center justify-center text-white font-bold text-lg mr-4">
                    {testimonial.author.charAt(0)}
                  </div>
                  <div>
                    <div className="font-medium text-foreground">{testimonial.author}</div>
                    <div className="text-sm text-muted-foreground">{testimonial.role}</div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            className="relative z-10"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-5xl font-bold text-foreground mb-6">
              Ready to Transform Your Business?
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
              Join thousands of businesses that trust us with their most critical operations.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="gap-2 group">
                <Link to="/contact" className="relative overflow-hidden">
                  <span className="relative z-10">Get Started</span>
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                  <span className="absolute inset-0 bg-gradient-to-r from-electric-purple to-neon-blue opacity-0 group-hover:opacity-100 transition-opacity"></span>
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link to="/contact/sales" className="group">
                  <span className="relative z-10">Contact Sales</span>
                </Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
      </div>
    </GridBackground>
  );
};

export default WhyUsPage;