
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Search, HelpCircle, MessageCircle, Mail, Phone } from 'lucide-react';

const SupportPage: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [ticketForm, setTicketForm] = useState({
    name: '',
    email: '',
    subject: '',
    category: '',
    message: ''
  });

  const faqs = [
    {
      question: 'How do I connect my LinkedIn account?',
      answer: 'To connect your LinkedIn account, go to Settings > Integrations and click "Connect LinkedIn". You\'ll be redirected to LinkedIn to authorize the connection. Make sure you grant the necessary permissions for posting and profile access.'
    },
    {
      question: 'Why aren\'t my posts being published to LinkedIn?',
      answer: 'There are several possible reasons: 1) Check if your LinkedIn connection is still active in Settings. 2) Ensure you have the correct permissions granted. 3) LinkedIn may have rate limits - try again later. 4) Check if your content violates LinkedIn\'s posting guidelines.'
    },
    {
      question: 'How does the AI content generation work?',
      answer: 'Our AI analyzes your profile, industry, and preferences to generate relevant content. It uses advanced language models trained on professional content patterns. You can always edit and customize the generated content before posting.'
    },
    {
      question: 'Can I cancel my subscription anytime?',
      answer: 'Yes, you can cancel your subscription at any time from your account settings. Your access will continue until the end of your current billing period, and you won\'t be charged again.'
    },
    {
      question: 'What file formats are supported for resume uploads?',
      answer: 'We support PDF, DOC, and DOCX file formats for resume uploads. The maximum file size is 10MB. For best results, ensure your resume is text-based (not an image or scanned document).'
    },
    {
      question: 'How accurate is the job matching feature?',
      answer: 'Our job matching uses AI embeddings to analyze job descriptions and your profile for semantic similarity. Match scores above 80% indicate strong alignment. We continuously improve our algorithms based on user feedback and successful placements.'
    },
    {
      question: 'Is my data secure and private?',
      answer: 'Yes, we take security seriously. All data is encrypted in transit and at rest. We\'re SOC 2 compliant and follow GDPR guidelines. We never share your personal information with third parties without your explicit consent.'
    },
    {
      question: 'How can I improve my content engagement?',
      answer: 'Here are some tips: 1) Post consistently (3-5 times per week). 2) Engage with comments quickly. 3) Use our engagement optimization features. 4) Share industry insights and personal experiences. 5) Include relevant hashtags and tag relevant people.'
    }
  ];

  const filteredFaqs = faqs.filter(faq =>
    faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
    faq.answer.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleTicketSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle ticket submission
    console.log('Ticket submitted:', ticketForm);
    alert('Support ticket submitted successfully! We\'ll get back to you within 24 hours.');
    setTicketForm({ name: '', email: '', subject: '', category: '', message: '' });
  };

  const handleInputChange = (field: string, value: string) => {
    setTicketForm(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="min-h-screen pt-16 bg-gray-50">
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-blue-50 via-white to-purple-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
            Support
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
              {" "}Hub
            </span>
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Get the help you need to make the most of PostPilot. Search our knowledge base 
            or contact our support team directly.
          </p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Search */}
            <Card>
              <CardContent className="p-6">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <Input
                    placeholder="Search for help articles, guides, or common issues..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10 py-3 text-lg"
                  />
                </div>
                <p className="text-sm text-gray-500 mt-2">
                  Popular searches: LinkedIn connection, posting issues, resume upload, job matching
                </p>
              </CardContent>
            </Card>

            {/* FAQ Section */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <HelpCircle className="w-6 h-6" />
                  <span>Frequently Asked Questions</span>
                </CardTitle>
                <p className="text-gray-600">
                  {filteredFaqs.length} {filteredFaqs.length === 1 ? 'result' : 'results'} found
                </p>
              </CardHeader>
              <CardContent>
                <Accordion type="single" collapsible className="space-y-4">
                  {filteredFaqs.map((faq, index) => (
                    <AccordionItem key={index} value={`item-${index}`} className="border rounded-lg px-4">
                      <AccordionTrigger className="text-left hover:no-underline">
                        {faq.question}
                      </AccordionTrigger>
                      <AccordionContent className="text-gray-600 pt-4 pb-2">
                        {faq.answer}
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>

                {filteredFaqs.length === 0 && (
                  <div className="text-center py-8">
                    <p className="text-gray-600">No matching articles found. Try a different search term or contact support directly.</p>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Submit Ticket */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <MessageCircle className="w-6 h-6" />
                  <span>Still Need Help?</span>
                </CardTitle>
                <p className="text-gray-600">
                  Can't find what you're looking for? Submit a support ticket and we'll get back to you.
                </p>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleTicketSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="name">Name</Label>
                      <Input
                        id="name"
                        value={ticketForm.name}
                        onChange={(e) => handleInputChange('name', e.target.value)}
                        placeholder="Your full name"
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="email">Email</Label>
                      <Input
                        id="email"
                        type="email"
                        value={ticketForm.email}
                        onChange={(e) => handleInputChange('email', e.target.value)}
                        placeholder="your@email.com"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="category">Category</Label>
                    <Select value={ticketForm.category} onValueChange={(value) => handleInputChange('category', value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a category" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="general">General Question</SelectItem>
                        <SelectItem value="technical">Technical Issue</SelectItem>
                        <SelectItem value="billing">Billing & Payments</SelectItem>
                        <SelectItem value="linkedin">LinkedIn Integration</SelectItem>
                        <SelectItem value="content">Content Generation</SelectItem>
                        <SelectItem value="resume">Resume Builder</SelectItem>
                        <SelectItem value="jobs">Job Matching</SelectItem>
                        <SelectItem value="account">Account Management</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="subject">Subject</Label>
                    <Input
                      id="subject"
                      value={ticketForm.subject}
                      onChange={(e) => handleInputChange('subject', e.target.value)}
                      placeholder="Brief description of your issue"
                      required
                    />
                  </div>

                  <div>
                    <Label htmlFor="message">Message</Label>
                    <Textarea
                      id="message"
                      value={ticketForm.message}
                      onChange={(e) => handleInputChange('message', e.target.value)}
                      placeholder="Please provide as much detail as possible about your issue..."
                      rows={6}
                      required
                    />
                  </div>

                  <Button type="submit" size="lg" className="w-full bg-blue-600 hover:bg-blue-700">
                    Submit Ticket
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Quick Help */}
            <Card>
              <CardHeader>
                <CardTitle>Quick Help</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <h4 className="font-medium text-gray-900">Getting Started</h4>
                  <ul className="space-y-2 text-sm">
                    <li><a href="#" className="text-blue-600 hover:text-blue-700">Set up your account</a></li>
                    <li><a href="#" className="text-blue-600 hover:text-blue-700">Connect LinkedIn</a></li>
                    <li><a href="#" className="text-blue-600 hover:text-blue-700">Create your first post</a></li>
                  </ul>
                </div>
                
                <div className="space-y-3">
                  <h4 className="font-medium text-gray-900">Popular Guides</h4>
                  <ul className="space-y-2 text-sm">
                    <li><a href="#" className="text-blue-600 hover:text-blue-700">LinkedIn best practices</a></li>
                    <li><a href="#" className="text-blue-600 hover:text-blue-700">Resume optimization tips</a></li>
                    <li><a href="#" className="text-blue-600 hover:text-blue-700">Job search strategies</a></li>
                  </ul>
                </div>
              </CardContent>
            </Card>

            {/* Contact Options */}
            <Card>
              <CardHeader>
                <CardTitle>Contact Us</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center space-x-3 p-3 bg-blue-50 rounded-lg">
                  <MessageCircle className="w-5 h-5 text-blue-600" />
                  <div>
                    <p className="font-medium text-gray-900">Live Chat</p>
                    <p className="text-sm text-gray-600">Available 24/7</p>
                  </div>
                </div>

                <div className="flex items-center space-x-3 p-3 bg-green-50 rounded-lg">
                  <Mail className="w-5 h-5 text-green-600" />
                  <div>
                    <p className="font-medium text-gray-900">Email Support</p>
                    <p className="text-sm text-gray-600">support@postpilot.com</p>
                  </div>
                </div>

                <div className="flex items-center space-x-3 p-3 bg-purple-50 rounded-lg">
                  <Phone className="w-5 h-5 text-purple-600" />
                  <div>
                    <p className="font-medium text-gray-900">Phone Support</p>
                    <p className="text-sm text-gray-600">Business plan only</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Response Times */}
            <Card>
              <CardHeader>
                <CardTitle>Response Times</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Live Chat</span>
                    <span className="font-medium">Instant</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Email (Free)</span>
                    <span className="font-medium">24-48 hours</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Email (Pro)</span>
                    <span className="font-medium">2-6 hours</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Phone (Business)</span>
                    <span className="font-medium">Immediate</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Status Page */}
            <Card>
              <CardHeader>
                <CardTitle>System Status</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center space-x-2 mb-3">
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  <span className="text-sm font-medium text-gray-900">All systems operational</span>
                </div>
                <p className="text-xs text-gray-600">
                  Check our status page for real-time updates on service availability.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SupportPage;
