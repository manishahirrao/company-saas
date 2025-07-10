import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Check, ArrowRight, Shield, Zap, Users, BarChart2, Lock, Globe, Award } from 'lucide-react';

const features = [
  {
    title: 'Industry-Leading AI',
    description: 'Our advanced AI models are trained on the latest data to deliver accurate and relevant content generation.',
    icon: <Zap className="text-yellow-500 w-6 h-6" />,
    color: 'from-yellow-500/10 to-yellow-500/5',
  },
  {
    title: 'Enterprise-Grade Security',
    description: 'Your data is protected with bank-level encryption and strict access controls.',
    icon: <Shield className="text-blue-500 w-6 h-6" />,
    color: 'from-blue-500/10 to-blue-500/5',
  },
  {
    title: 'Global Support',
    description: '24/7 customer support with teams across all time zones to assist you whenever you need help.',
    icon: <Globe className="text-green-500 w-6 h-6" />,
    color: 'from-green-500/10 to-green-500/5',
  },
  {
    title: 'Proven Results',
    description: 'Trusted by Fortune 500 companies to boost their content strategy and engagement.',
    icon: <BarChart2 className="text-purple-500 w-6 h-6" />,
    color: 'from-purple-500/10 to-purple-500/5',
  },
];

const stats = [
  { value: '10,000+', label: 'Businesses Trust Us' },
  { value: '98%', label: 'Customer Satisfaction' },
  { value: '24/7', label: 'Support Available' },
  { value: '99.9%', label: 'Uptime Guarantee' },
];

const WhyUs = () => {
  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      {/* Background Grid Pattern */}
      <div className="fixed inset-0 bg-grid-light dark:bg-grid-dark opacity-20 dark:opacity-100 pointer-events-none" />
      
      <div className="relative z-10">
        {/* Hero Section */}
        <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8 relative">
          <div className="max-w-7xl mx-auto text-center">
            <motion.div 
              className="inline-block mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <Badge className="bg-gradient-to-r from-electric-purple/10 to-neon-blue/10 text-foreground border border-electric-purple/20">
                Why Choose Us
              </Badge>
            </motion.div>
            
            <motion.h1 
              className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-foreground to-foreground/80 mb-6 font-space"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              Built for the Future of Work
            </motion.h1>
            
            <motion.p 
              className="text-xl text-foreground/80 dark:text-foreground/90 max-w-3xl mx-auto mb-10"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              We're not just another SaaS company. Our platform is designed to help your business thrive in the digital age.
            </motion.p>
            
            <motion.div 
              className="flex flex-wrap justify-center gap-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <Button asChild>
                <Link to="/contact" className="group">
                  Get Started
                  <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </Button>
              <Button variant="outline" asChild>
                <Link to="/demo">
                  Request Demo
                </Link>
              </Button>
            </motion.div>
          </div>
        </section>

        {/* Features Grid */}
        <section className="py-20 px-4 sm:px-6 lg:px-8 relative">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {features.map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  whileHover={{ y: -8 }}
                >
                  <Card className="glow-card bg-card/50 backdrop-blur-sm border-electric-purple/20 hover:border-electric-purple/50 transition-all duration-300 h-full group">
                    <CardHeader>
                      <div className={`w-12 h-12 rounded-lg flex items-center justify-center mb-4 ${feature.color}`}>
                        {feature.icon}
                      </div>
                      <CardTitle className="text-xl font-space font-semibold text-foreground">
                        {feature.title}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-foreground/80 dark:text-foreground/90">
                        {feature.description}
                      </p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-20 bg-gradient-to-r from-electric-purple/5 to-neon-blue/5">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
              {stats.map((stat, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <div className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-electric-purple to-neon-blue mb-2">
                    {stat.value}
                  </div>
                  <p className="text-foreground/80 dark:text-foreground/90">{stat.label}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="bg-gradient-to-br from-electric-purple/10 to-neon-blue/10 p-8 rounded-2xl border border-electric-purple/20"
            >
              <div className="w-16 h-16 bg-gradient-to-r from-electric-purple to-neon-blue rounded-2xl flex items-center justify-center mx-auto mb-6">
                <Award className="h-8 w-8 text-white" />
              </div>
              <h2 className="text-3xl font-bold text-foreground mb-4">Ready to Transform Your Business?</h2>
              <p className="text-xl text-foreground/80 dark:text-foreground/90 mb-8 max-w-2xl mx-auto">
                Join thousands of businesses that trust our platform to drive their success.
              </p>
              <div className="flex flex-col sm:flex-row justify-center gap-4">
                <Button size="lg" asChild>
                  <Link to="/pricing" className="group">
                    View Pricing
                    <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </Button>
                <Button size="lg" variant="outline" asChild>
                  <Link to="/contact">
                    Contact Sales
                  </Link>
                </Button>
              </div>
            </motion.div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default WhyUs;
