import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Check, ArrowRight, User, Building, TrendingUp, Users, Target } from 'lucide-react';

interface Testimonial {
  quote: string;
  author: string;
  role: string;
  company: string;
  result: string;
}

interface UseCase {
  title: string;
  description: string;
  icon: React.ReactNode;
  color: string;
  features: string[];
}

const UseCasesPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState('professionals');

  // Animation variants
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  // Data for professionals tab
  const professionalBenefits = [
    'Streamline your workflow with AI-powered automation',
    'Generate high-quality content in minutes, not hours',
    'Access advanced analytics to track performance',
    'Collaborate seamlessly with your team'
  ];

  const professionalUseCases: UseCase[] = [
    {
      title: 'Content Creation',
      description: 'Generate engaging blog posts, social media content, and marketing copy in seconds.',
      icon: <TrendingUp className="w-6 h-6" />,
      color: 'from-blue-500 to-cyan-400',
      features: [
        'AI-powered content generation',
        'SEO optimization',
        'Tone and style customization',
        'Plagiarism checking'
      ]
    },
    // Add more use cases as needed
  ];

  // Data for companies tab
  const companyBenefits = [
    'Scale your content production 10x',
    'Maintain brand consistency across all channels',
    'Reduce content creation costs by up to 70%',
    'Get actionable insights from content performance'
  ];

  const companyUseCases: UseCase[] = [
    {
      title: 'Enterprise Content',
      description: 'Produce consistent, on-brand content at scale across all departments.',
      icon: <Building className="w-6 h-6" />,
      color: 'from-purple-500 to-pink-500',
      features: [
        'Team collaboration tools',
        'Brand voice consistency',
        'Content approval workflows',
        'Performance analytics'
      ]
    },
    // Add more use cases as needed
  ];

  const professionalTestimonials: Testimonial[] = [
    {
      quote: "This tool has transformed how I create content. What used to take hours now takes minutes.",
      author: "Sarah Johnson",
      role: "Content Marketer",
      company: "TechCorp",
      result: "3x more content output"
    },
    // Add more testimonials as needed
  ];

  const companyTestimonials: Testimonial[] = [
    {
      quote: "We've been able to scale our content production while maintaining quality and brand voice.",
      author: "Michael Chen",
      role: "Head of Marketing",
      company: "StartUp Inc.",
      result: "70% cost reduction"
    },
    // Add more testimonials as needed
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 text-white pt-16">
      {/* Hero Section */}
      <section className="relative pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-6"
          >
            <Badge variant="secondary" className="text-sm font-medium px-3 py-1 rounded-full bg-gray-800 text-blue-400">
              Powerful AI Solutions
            </Badge>
          </motion.div>
          
          <motion.h1 
            className="text-4xl md:text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-cyan-400 mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            Transform Your Workflow
          </motion.h1>
          
          <motion.p 
            className="text-xl text-gray-300 max-w-3xl mx-auto mb-10"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            Discover how our AI-powered tools can help you achieve more in less time, whether you're an individual professional or a growing company.
          </motion.p>
          
          <motion.div 
            className="flex flex-col sm:flex-row justify-center gap-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <Button size="lg" className="bg-blue-600 hover:bg-blue-700 transition-colors">
              Get Started Free
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
            <Button size="lg" variant="outline" className="border-gray-600 hover:bg-gray-800">
              Schedule Demo
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Tabs Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <Tabs 
            defaultValue="professionals" 
            className="w-full"
            onValueChange={(value) => setActiveTab(value as 'professionals' | 'companies')}
          >
            <div className="flex justify-center mb-12">
              <TabsList className="bg-gray-800 p-1 rounded-xl">
                <TabsTrigger 
                  value="professionals" 
                  className={`px-6 py-2 rounded-lg transition-colors ${activeTab === 'professionals' ? 'bg-gray-700 text-white' : 'text-gray-400 hover:text-white'}`}
                >
                  <User className="mr-2 h-4 w-4" />
                  For Professionals
                </TabsTrigger>
                <TabsTrigger 
                  value="companies" 
                  className={`px-6 py-2 rounded-lg transition-colors ${activeTab === 'companies' ? 'bg-gray-700 text-white' : 'text-gray-400 hover:text-white'}`}
                >
                  <Building className="mr-2 h-4 w-4" />
                  For Companies
                </TabsTrigger>
              </TabsList>
            </div>

            {/* Professionals Tab */}
            <TabsContent value="professionals" className="mt-8">
              <motion.div
                variants={container}
                initial="hidden"
                animate="show"
                className="grid md:grid-cols-2 gap-8 mb-16"
              >
                <motion.div variants={item} className="space-y-6">
                  <h2 className="text-3xl font-bold">Built for Modern Professionals</h2>
                  <p className="text-gray-300 text-lg">
                    Our AI tools are designed to help you work smarter, not harder. Focus on what matters most while we handle the rest.
                  </p>
                  <ul className="space-y-4">
                    {professionalBenefits.map((benefit, index) => (
                      <li key={index} className="flex items-start">
                        <Check className="h-5 w-5 text-green-400 mt-0.5 mr-3 flex-shrink-0" />
                        <span>{benefit}</span>
                      </li>
                    ))}
                  </ul>
                </motion.div>
                
                <motion.div variants={item} className="grid gap-6">
                  {professionalUseCases.map((useCase, index) => (
                    <Card key={index} className="bg-gray-800 border-gray-700 overflow-hidden">
                      <CardHeader className="pb-3">
                        <div className={`w-12 h-12 rounded-lg flex items-center justify-center mb-4 bg-gradient-to-br ${useCase.color}`}>
                          {useCase.icon}
                        </div>
                        <CardTitle className="text-xl">{useCase.title}</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-gray-300 mb-4">{useCase.description}</p>
                        <ul className="space-y-2">
                          {useCase.features.map((feature, i) => (
                            <li key={i} className="flex items-center text-sm text-gray-400">
                              <Check className="h-4 w-4 text-green-400 mr-2" />
                              {feature}
                            </li>
                          ))}
                        </ul>
                      </CardContent>
                    </Card>
                  ))}
                </motion.div>
              </motion.div>

              {/* Testimonials */}
              {professionalTestimonials.length > 0 && (
                <motion.div 
                  className="mt-20"
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5 }}
                >
                  <h3 className="text-2xl font-bold text-center mb-10">Trusted by Professionals Worldwide</h3>
                  <div className="grid md:grid-cols-3 gap-6">
                    {professionalTestimonials.map((testimonial, index) => (
                      <Card key={index} className="bg-gray-800 border-gray-700 p-6">
                        <p className="text-gray-300 italic mb-6">"{testimonial.quote}"</p>
                        <div className="flex items-center">
                          <div className="w-10 h-10 rounded-full bg-gray-700 flex items-center justify-center mr-3">
                            <User className="h-5 w-5 text-gray-400" />
                          </div>
                          <div>
                            <p className="font-medium">{testimonial.author}</p>
                            <p className="text-sm text-gray-400">{testimonial.role} • {testimonial.company}</p>
                          </div>
                          <div className="ml-auto bg-gray-700 px-3 py-1 rounded-full text-sm">
                            {testimonial.result}
                          </div>
                        </div>
                      </Card>
                    ))}
                  </div>
                </motion.div>
              )}
            </TabsContent>

            {/* Companies Tab */}
            <TabsContent value="companies" className="mt-8">
              <motion.div
                variants={container}
                initial="hidden"
                animate="show"
                className="grid md:grid-cols-2 gap-8 mb-16"
              >
                <motion.div variants={item} className="space-y-6">
                  <h2 className="text-3xl font-bold">Enterprise-Grade Solutions</h2>
                  <p className="text-gray-300 text-lg">
                    Scale your business with AI tools designed for teams and organizations of all sizes.
                  </p>
                  <ul className="space-y-4">
                    {companyBenefits.map((benefit, index) => (
                      <li key={index} className="flex items-start">
                        <Check className="h-5 w-5 text-green-400 mt-0.5 mr-3 flex-shrink-0" />
                        <span>{benefit}</span>
                      </li>
                    ))}
                  </ul>
                </motion.div>
                
                <motion.div variants={item} className="grid gap-6">
                  {companyUseCases.map((useCase, index) => (
                    <Card key={index} className="bg-gray-800 border-gray-700 overflow-hidden">
                      <CardHeader className="pb-3">
                        <div className={`w-12 h-12 rounded-lg flex items-center justify-center mb-4 bg-gradient-to-br ${useCase.color}`}>
                          {useCase.icon}
                        </div>
                        <CardTitle className="text-xl">{useCase.title}</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-gray-300 mb-4">{useCase.description}</p>
                        <ul className="space-y-2">
                          {useCase.features.map((feature, i) => (
                            <li key={i} className="flex items-center text-sm text-gray-400">
                              <Check className="h-4 w-4 text-green-400 mr-2" />
                              {feature}
                            </li>
                          ))}
                        </ul>
                      </CardContent>
                    </Card>
                  ))}
                </motion.div>
              </motion.div>

              {/* Testimonials */}
              {companyTestimonials.length > 0 && (
                <motion.div 
                  className="mt-20"
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5 }}
                >
                  <h3 className="text-2xl font-bold text-center mb-10">Trusted by Leading Companies</h3>
                  <div className="grid md:grid-cols-3 gap-6">
                    {companyTestimonials.map((testimonial, index) => (
                      <Card key={index} className="bg-gray-800 border-gray-700 p-6">
                        <p className="text-gray-300 italic mb-6">"{testimonial.quote}"</p>
                        <div className="flex items-center">
                          <div className="w-10 h-10 rounded-full bg-gray-700 flex items-center justify-center mr-3">
                            <Building className="h-5 w-5 text-gray-400" />
                          </div>
                          <div>
                            <p className="font-medium">{testimonial.author}</p>
                            <p className="text-sm text-gray-400">{testimonial.role} • {testimonial.company}</p>
                          </div>
                          <div className="ml-auto bg-gray-700 px-3 py-1 rounded-full text-sm">
                            {testimonial.result}
                          </div>
                        </div>
                      </Card>
                    ))}
                  </div>
                </motion.div>
              )}
            </TabsContent>
          </Tabs>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-blue-900/30 to-cyan-900/30">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Transform Your Workflow?</h2>
            <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
              Join thousands of professionals and companies who are already boosting their productivity with our AI tools.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Button size="lg" className="bg-blue-600 hover:bg-blue-700 transition-colors">
                Start Free Trial
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
              <Button size="lg" variant="outline" className="border-gray-600 hover:bg-gray-800">
                Contact Sales
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default UseCasesPage;
