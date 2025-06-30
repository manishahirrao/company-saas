
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Phone, Mail, Clock, CheckCircle, Users, Shield, Headphones } from 'lucide-react';

const ContactSalesPage: React.FC = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    company: '',
    companySize: '',
    jobTitle: '',
    interestedIn: [] as string[],
    message: '',
    hasUrgentNeed: false
  });

  const handleInputChange = (field: string, value: string | boolean | string[]) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleInterestedInChange = (feature: string, checked: boolean) => {
    if (checked) {
      setFormData(prev => ({
        ...prev,
        interestedIn: [...prev.interestedIn, feature]
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        interestedIn: prev.interestedIn.filter(item => item !== feature)
      }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Sales form submitted:', formData);
    alert('Thank you for your interest! A sales representative will contact you within 24 hours.');
  };

  const features = [
    'Enterprise Content Automation',
    'Brand Management Suite',
    'Analytics & Insights',
    'Security & Compliance',
    'Team Collaboration',
    'API Integration',
    'Custom Solutions',
    'White-label Implementation'
  ];

  const benefits = [
    {
      icon: <Shield className="w-6 h-6 text-blue-600" />,
      title: 'Enterprise Security',
      description: 'SOC 2 Type II, ISO 27001, and GDPR compliance'
    },
    {
      icon: <Users className="w-6 h-6 text-green-600" />,
      title: 'Dedicated Enterprise Team',
      description: 'Personalized implementation and ongoing support'
    },
    {
      icon: <Headphones className="w-6 h-6 text-purple-600" />,
      title: 'SLA-Backed Support',
      description: '24/7 support with guaranteed response times'
    }
  ];

  return (
    <div className="min-h-screen pt-16 bg-gray-50">
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-blue-50 via-white to-purple-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
            Let's Discuss Your
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
              {" "}Business Needs
            </span>
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Get a personalized demo and learn how PostPilot can transform your team's 
            LinkedIn presence and accelerate your business growth.
          </p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Form */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle className="text-2xl">Get a Personalized Demo</CardTitle>
                <p className="text-gray-600">
                  Tell us about your needs and we'll show you how PostPilot can help your business succeed.
                </p>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Name Fields */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="firstName">First Name *</Label>
                      <Input
                        id="firstName"
                        value={formData.firstName}
                        onChange={(e) => handleInputChange('firstName', e.target.value)}
                        placeholder="John"
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="lastName">Last Name *</Label>
                      <Input
                        id="lastName"
                        value={formData.lastName}
                        onChange={(e) => handleInputChange('lastName', e.target.value)}
                        placeholder="Doe"
                        required
                      />
                    </div>
                  </div>

                  {/* Contact Fields */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="email">Business Email *</Label>
                      <Input
                        id="email"
                        type="email"
                        value={formData.email}
                        onChange={(e) => handleInputChange('email', e.target.value)}
                        placeholder="john@company.com"
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="phone">Phone Number</Label>
                      <Input
                        id="phone"
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => handleInputChange('phone', e.target.value)}
                        placeholder="+1 (555) 123-4567"
                      />
                    </div>
                  </div>

                  {/* Company Fields */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="company">Company Name *</Label>
                      <Input
                        id="company"
                        value={formData.company}
                        onChange={(e) => handleInputChange('company', e.target.value)}
                        placeholder="Acme Corporation"
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="jobTitle">Job Title *</Label>
                      <Input
                        id="jobTitle"
                        value={formData.jobTitle}
                        onChange={(e) => handleInputChange('jobTitle', e.target.value)}
                        placeholder="VP of Marketing"
                        required
                      />
                    </div>
                  </div>

                  {/* Company Size */}
                  <div>
                    <Label htmlFor="companySize">Company Size *</Label>
                    <Select value={formData.companySize} onValueChange={(value) => handleInputChange('companySize', value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select company size" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="1-10">1-10 employees</SelectItem>
                        <SelectItem value="11-50">11-50 employees</SelectItem>
                        <SelectItem value="51-200">51-200 employees</SelectItem>
                        <SelectItem value="201-1000">201-1,000 employees</SelectItem>
                        <SelectItem value="1000+">1,000+ employees</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Interested In */}
                  <div>
                    <Label className="text-base font-medium">What are you interested in? *</Label>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-3">
                      {features.map((feature) => (
                        <div key={feature} className="flex items-center space-x-2">
                          <Checkbox
                            id={feature}
                            checked={formData.interestedIn.includes(feature)}
                            onCheckedChange={(checked) => handleInterestedInChange(feature, checked as boolean)}
                          />
                          <Label htmlFor={feature} className="text-sm font-normal">
                            {feature}
                          </Label>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Message */}
                  <div>
                    <Label htmlFor="message">Tell us about your needs</Label>
                    <Textarea
                      id="message"
                      value={formData.message}
                      onChange={(e) => handleInputChange('message', e.target.value)}
                      placeholder="Describe your current challenges, goals, or any specific requirements..."
                      rows={4}
                    />
                  </div>

                  {/* Urgent Need */}
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="urgent"
                      checked={formData.hasUrgentNeed}
                      onCheckedChange={(checked) => handleInputChange('hasUrgentNeed', checked as boolean)}
                    />
                    <Label htmlFor="urgent" className="text-sm">
                      I have an urgent need and would like to be contacted today
                    </Label>
                  </div>

                  <Button type="submit" size="lg" className="w-full bg-blue-600 hover:bg-blue-700">
                    Request Demo
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Contact Info */}
            <Card>
              <CardHeader>
                <CardTitle>Get in Touch</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center space-x-3">
                  <Phone className="w-5 h-5 text-blue-600" />
                  <div>
                    <p className="font-medium text-gray-900">Sales Hotline</p>
                    <p className="text-gray-600">+1 (555) 123-SALES</p>
                  </div>
                </div>

                <div className="flex items-center space-x-3">
                  <Mail className="w-5 h-5 text-green-600" />
                  <div>
                    <p className="font-medium text-gray-900">Email Sales</p>
                    <p className="text-gray-600">sales@postpilot.com</p>
                  </div>
                </div>

                <div className="flex items-center space-x-3">
                  <Clock className="w-5 h-5 text-purple-600" />
                  <div>
                    <p className="font-medium text-gray-900">Business Hours</p>
                    <p className="text-gray-600">Mon-Fri, 9 AM - 6 PM EST</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* What to Expect */}
            <Card>
              <CardHeader>
                <CardTitle>What to Expect</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <CheckCircle className="w-5 h-5 text-green-500 mt-0.5" />
                    <div>
                      <p className="font-medium text-gray-900">Quick Response</p>
                      <p className="text-sm text-gray-600">A sales rep will contact you within 24 hours</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-3">
                    <CheckCircle className="w-5 h-5 text-green-500 mt-0.5" />
                    <div>
                      <p className="font-medium text-gray-900">Personalized Demo</p>
                      <p className="text-sm text-gray-600">Tailored to your specific use case and needs</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-3">
                    <CheckCircle className="w-5 h-5 text-green-500 mt-0.5" />
                    <div>
                      <p className="font-medium text-gray-900">Custom Pricing</p>
                      <p className="text-sm text-gray-600">Flexible plans designed for your organization</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-3">
                    <CheckCircle className="w-5 h-5 text-green-500 mt-0.5" />
                    <div>
                      <p className="font-medium text-gray-900">No Pressure</p>
                      <p className="text-sm text-gray-600">Learn about our solution at your own pace</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Enterprise Benefits */}
            <Card>
              <CardHeader>
                <CardTitle>Enterprise Benefits</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {benefits.map((benefit, index) => (
                    <div key={index} className="flex items-start space-x-3">
                      {benefit.icon}
                      <div>
                        <p className="font-medium text-gray-900">{benefit.title}</p>
                        <p className="text-sm text-gray-600">{benefit.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Trust Signals */}
            <Card className="bg-gradient-to-br from-blue-50 to-purple-50">
              <CardContent className="p-6 text-center">
                <h3 className="font-semibold text-gray-900 mb-3">Trusted by 50,000+ Professionals</h3>
                <div className="flex justify-center space-x-6 text-sm text-gray-600">
                  <div>
                    <p className="font-bold text-blue-600">99.9%</p>
                    <p>Uptime</p>
                  </div>
                  <div>
                    <p className="font-bold text-green-600">SOC 2</p>
                    <p>Certified</p>
                  </div>
                  <div>
                    <p className="font-bold text-purple-600">4.9/5</p>
                    <p>Rating</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactSalesPage;
