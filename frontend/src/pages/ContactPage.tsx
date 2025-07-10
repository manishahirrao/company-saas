
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { MapPin, Phone, Mail, Clock, MessageCircle, Send, Map, MailCheck, PhoneCall } from 'lucide-react';
import Navbar from '@/components/Layout/Navbar';
import Footer from '@/components/Layout/Footer';
import { Badge } from '@/components/ui/badge';

const ContactPage: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    category: '',
    message: ''
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Contact form submitted:', formData);
    alert('Thank you for your message! We\'ll get back to you within 24 hours.');
    setFormData({ name: '', email: '', subject: '', category: '', message: '' });
  };

  const contactMethods = [
    {
      icon: <MailCheck className="w-6 h-6 text-electric-purple" />,
      title: 'Email Us',
      description: 'Send us an email and we\'ll respond within 24 hours',
      contact: 'hello@vortexai.com',
      action: 'Send Email'
    },
    {
      icon: <PhoneCall className="w-6 h-6 text-neon-blue" />,
      title: 'Call Us',
      description: 'Speak with our team during business hours',
      contact: '+1 (555) 123-VORTEX',
      action: 'Call Now'
    },
    {
      icon: <MessageCircle className="w-6 h-6 text-purple-500" />,
      title: 'Live Chat',
      description: 'Chat with our support team in real-time',
      contact: 'Available 24/7',
      action: 'Start Chat'
    }
  ];

  const offices = [
    {
      city: 'San Francisco',
      address: '123 Market Street, Suite 450',
      zipcode: 'San Francisco, CA 94105',
      phone: '+1 (555) 123-SF01',
      type: 'Headquarters'
    },
    {
      city: 'New York',
      address: '456 Broadway, Floor 15',
      zipcode: 'New York, NY 10013',
      phone: '+1 (555) 123-NYC1',
      type: 'East Coast Office'
    },
    {
      city: 'Austin',
      address: '789 Congress Ave, Suite 200',
      zipcode: 'Austin, TX 78701',
      phone: '+1 (555) 123-ATX1',
      type: 'Operations Center'
    }
  ];

  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    document.title = "Contact Us - VORTEX AI";
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background relative">
        <div className="fixed inset-0 bg-grid-light dark:bg-grid-dark opacity-20 dark:opacity-10 pointer-events-none" />
        <Navbar />
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
        <div className="fixed inset-0 bg-grid-light dark:bg-grid-dark opacity-20 dark:opacity-10 pointer-events-none" />
        
        <main className="relative z-10">
          {/* Hero Section */}
          <section className="pt-12 pb-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
            {/* Background Grid Pattern */}
            <div className="absolute inset-0 grid-pattern dark:grid-pattern opacity-50" />
            
            <div className="max-w-7xl mx-auto text-center relative z-10">
              <motion.div 
                className="mb-12"
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
              >
                {/* Main Title */}
                <motion.h1 
                  className="text-7xl md:text-8xl font-space font-bold gradient-text mb-6"
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.4 }}
                >
                  Contact Us
                </motion.h1>
                
                <motion.p 
                  className="text-2xl md:text-3xl text-foreground/80 dark:text-foreground/90 font-space font-light mb-4"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.6 }}
                >
                  We're Here to Help
                </motion.p>
                
                <motion.div 
                  className="inline-block px-6 py-2 bg-gradient-to-r from-electric-purple/20 to-neon-blue/20 rounded-full border border-electric-purple/30"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.6, delay: 0.8 }}
                >
                  <span className="text-electric-purple font-inter font-medium">24/7 SUPPORT</span>
                </motion.div>
              </motion.div>
              
              <motion.div 
                className="mb-12 space-y-8"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 1 }}
              >
                <p className="text-xl text-foreground/80 dark:text-foreground/90 max-w-3xl mx-auto font-inter leading-relaxed">
                  Have questions about VORTEX? Need help with your account? Want to share feedback?
                  We'd love to hear from you and help you succeed.
                </p>
              </motion.div>
            </div>
          </section>

          <section className="py-16 md:py-24 bg-background relative">
            <div className="absolute inset-0 bg-gradient-to-br from-electric-purple/5 via-transparent to-neon-blue/5" />
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Contact Methods */}
                <div className="space-y-6">
                  <div className="space-y-2">
                    <h2 className="text-2xl font-bold text-foreground dark:text-foreground/95">Contact Information</h2>
                    <p className="text-foreground/80 dark:text-foreground/80">
                      We're here to help and answer any questions you might have. We look forward to hearing from you.
                    </p>
                  </div>
                  {contactMethods.map((method, index) => (
                    <Card key={index} className="hover:shadow-lg transition-shadow cursor-pointer bg-card/50 dark:bg-card/90 border border-border/30 dark:border-border/50">
                      <CardContent className="p-6">
                        <div className="flex items-start space-x-4">
                          <div className="flex-shrink-0">{method.icon}</div>
                          <div className="flex-1">
                            <h3 className="font-semibold text-foreground dark:text-foreground/95 mb-1">{method.title}</h3>
                            <p className="text-foreground/80 dark:text-foreground/80 text-sm mb-2">{method.description}</p>
                            <p className="font-medium text-foreground dark:text-foreground/95 mb-3">{method.contact}</p>
                            <Button size="sm" variant="outline" className="border-border/50 hover:border-primary/50 dark:border-border/60 dark:hover:border-primary/70">
                              {method.action}
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>

                {/* Contact Form */}
                <div className="lg:col-span-2">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                  >
                    <Card className="border-0 shadow-lg bg-card/90 dark:bg-card/95 backdrop-blur-sm border border-border/30 dark:border-border/50">
                      <CardHeader className="border-b border-border/30 dark:border-border/50">
                        <CardTitle className="text-2xl font-bold text-foreground dark:text-foreground/95">Send us a message</CardTitle>
                        <CardDescription className="text-foreground/80 dark:text-foreground/80">
                          Fill out the form and we'll get back to you as soon as possible
                        </CardDescription>
                      </CardHeader>
                      <CardContent className="p-6">
                        <form onSubmit={handleSubmit} className="space-y-6">
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                              <Label htmlFor="name" className="text-foreground/80">Full Name</Label>
                              <Input
                                id="name"
                                value={formData.name}
                                onChange={(e) => handleInputChange('name', e.target.value)}
                                placeholder="John Doe"
                                className="bg-background/50 dark:bg-background/80 border-border/50 dark:border-border/70 focus:border-primary/50 dark:focus:border-primary/70"
                                required
                              />
                            </div>
                            <div className="space-y-2">
                              <Label htmlFor="email" className="text-foreground/80">Email Address</Label>
                              <Input
                                id="email"
                                type="email"
                                value={formData.email}
                                onChange={(e) => handleInputChange('email', e.target.value)}
                                placeholder="you@example.com"
                                className="bg-background/50 dark:bg-background/80 border-border/50 dark:border-border/70 focus:border-primary/50 dark:focus:border-primary/70"
                                required
                              />
                            </div>
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="subject" className="text-foreground/80">Subject</Label>
                            <Input
                              id="subject"
                              value={formData.subject}
                              onChange={(e) => handleInputChange('subject', e.target.value)}
                              placeholder="How can we help you?"
                              className="bg-background/50 border-border/50 focus:border-primary/50"
                              required
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="category" className="text-foreground/80">Category</Label>
                            <Select
                              value={formData.category}
                              onValueChange={(value) => handleInputChange('category', value)}
                              required
                            >
                              <SelectTrigger className="bg-background/50 dark:bg-background/80 border-border/50 dark:border-border/70 focus:border-primary/50 dark:focus:border-primary/70 text-foreground dark:text-foreground/90">
                                <SelectValue placeholder="Select a category" className="placeholder-foreground/50 dark:placeholder-foreground/60" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="general">General Inquiry</SelectItem>
                                <SelectItem value="support">Technical Support</SelectItem>
                                <SelectItem value="billing">Billing Question</SelectItem>
                                <SelectItem value="feedback">Feedback</SelectItem>
                                <SelectItem value="partnership">Partnership</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="message" className="text-foreground/80">Your Message</Label>
                            <Textarea
                              id="message"
                              value={formData.message}
                              onChange={(e) => handleInputChange('message', e.target.value)}
                              placeholder="Tell us how we can help you..."
                              rows={5}
                              className="bg-background/50 dark:bg-background/80 border-border/50 dark:border-border/70 focus:border-primary/50 dark:focus:border-primary/70 text-foreground dark:text-foreground/90 placeholder-foreground/50 dark:placeholder-foreground/60"
                              required
                            />
                          </div>
                          <Button 
                            type="submit" 
                            className="w-full group bg-gradient-to-r from-electric-purple to-neon-blue hover:opacity-90 transition-all duration-200 text-white"
                            size="lg"
                          >
                            <span className="group-hover:translate-x-1 transition-transform duration-200">
                              Send Message
                            </span>
                            <Send className="ml-2 h-4 w-4 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-200" />
                          </Button>
                        </form>
                      </CardContent>
                    </Card>
                  </motion.div>
                </div>
              </div>
            </div>
          </section>

          {/* Office Locations */}
          <section className="py-16 md:py-24 bg-card/30 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-neon-blue/5 via-transparent to-electric-purple/5" />
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
              <motion.div 
                className="text-center mb-12"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <motion.div 
                  className="inline-block mb-4"
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                >
                  <Badge className="bg-gradient-to-r from-electric-purple to-neon-blue text-white border-0">
                    Our Offices
                  </Badge>
                </motion.div>
                <motion.h2 
                  className="text-3xl md:text-4xl font-bold text-foreground mb-4 font-space"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.3 }}
                >
                  Find Us Around the Globe
                </motion.h2>
                <motion.p 
                  className="text-foreground/80 dark:text-foreground/80 max-w-2xl mx-auto text-lg"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                >
                  We have offices in key locations to serve you better. Drop by or schedule a meeting with our team.
                </motion.p>
              </motion.div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {offices.map((office, index) => (
                  <motion.div 
                    key={index} 
                    className="bg-card rounded-xl border border-border/50 overflow-hidden hover:shadow-lg transition-shadow duration-300"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.1 * index }}
                    whileHover={{ y: -5 }}
                  >
                    <div className="p-6">
                      <div className="flex items-center mb-4">
                        <div className="p-2 rounded-lg bg-primary/5">
                          <MapPin className="w-5 h-5 text-primary" />
                        </div>
                        <h3 className="text-lg font-medium text-foreground ml-3">{office.city}</h3>
                        <span className="ml-auto text-xs font-medium px-2.5 py-0.5 rounded-full bg-primary/10 text-primary">
                          {office.type}
                        </span>
                      </div>
                      <div className="space-y-2 text-sm text-foreground/80">
                        <p>{office.address}</p>
                        <p>{office.zipcode}</p>
                        <p className="mt-2 flex items-center">
                          <Phone className="w-4 h-4 mr-2 text-foreground/60" />
                          {office.phone}
                        </p>
                      </div>
                    </div>
                    <div className="bg-card/50 px-6 py-4 border-t border-border/30">
                      <Button variant="outline" className="w-full group">
                        <span className="group-hover:translate-x-1 transition-transform duration-200">
                          Get Directions
                        </span>
                        <Map className="ml-2 h-4 w-4 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-200" />
                      </Button>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>

          {/* Map Section */}
          <section className="py-16 md:py-24 bg-background relative">
            <div className="absolute inset-0 bg-grid-light dark:bg-grid-dark opacity-20 dark:opacity-10" />
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
              <motion.div 
                className="bg-card/80 dark:bg-card/90 backdrop-blur-sm rounded-2xl p-8 md:p-12 border border-border/30 dark:border-border/50 shadow-lg"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <div className="text-center mb-8">
                  <motion.div 
                    className="inline-block mb-4"
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                  >
                    <Badge className="bg-gradient-to-r from-electric-purple to-neon-blue text-white border-0">
                      Find Us
                    </Badge>
                  </motion.div>
                  <motion.h2 
                    className="text-3xl md:text-4xl font-bold text-foreground mb-4 font-space"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.3 }}
                  >
                    Our Global Presence
                  </motion.h2>
                  <motion.p 
                    className="text-foreground/80 dark:text-foreground/80 max-w-2xl mx-auto text-lg"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.4 }}
                  >
                    We're located in major tech hubs around the world to better serve our global community.
                  </motion.p>
                </div>
                <motion.div 
                  className="bg-card/90 dark:bg-card/95 backdrop-blur-sm rounded-xl border border-border/30 dark:border-border/50 h-96 flex items-center justify-center shadow-lg overflow-hidden"
                  initial={{ opacity: 0, scale: 0.98 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.3 }}
                >
                  <div className="text-center p-8">
                    <MapPin className="w-12 h-12 text-primary/30 dark:text-primary/40 mx-auto mb-4" />
                    <h3 className="text-xl font-semibold text-foreground dark:text-foreground/95 mb-2 font-inter">Interactive Map</h3>
                    <p className="text-foreground/70 dark:text-foreground/80 mb-6 max-w-md mx-auto">
                      Map integration would be displayed here with our office locations worldwide.
                    </p>
                    <motion.div
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Button 
                        variant="outline" 
                        className="group border-2 border-electric-purple text-electric-purple hover:bg-electric-purple hover:text-white transition-all duration-200 px-6 py-3"
                      >
                        <span className="group-hover:translate-x-1 transition-transform duration-200 font-inter font-medium">
                          View Full Map
                        </span>
                        <Map className="ml-2 h-4 w-4 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-200" />
                      </Button>
                    </motion.div>
                  </div>
                </motion.div>
              </motion.div>
            </div>
          </section>
        </main>
        
        
      </motion.div>
    </AnimatePresence>
  );
};

export default ContactPage;
