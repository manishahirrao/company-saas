
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { TrendingUp, Users, Globe, Award } from 'lucide-react';

const InvestorsPage: React.FC = () => {
  const investors = [
    {
      name: 'Andreessen Horowitz',
      type: 'Series A Lead',
      logo: 'a16z',
      amount: '$15M',
      description: 'Leading venture capital firm focused on software and AI companies.'
    },
    {
      name: 'Sequoia Capital',
      type: 'Series A',
      logo: 'SQA',
      amount: '$5M',
      description: 'Premier venture capital firm with investments in Apple, Google, and LinkedIn.'
    },
    {
      name: 'Bessemer Venture Partners',
      type: 'Seed Round',
      logo: 'BVP',
      amount: '$3M',
      description: 'Early investor in LinkedIn, Shopify, and other category-defining companies.'
    },
    {
      name: 'First Round Capital',
      type: 'Seed Round',
      logo: 'FRC',
      amount: '$2M',
      description: 'First investors in Uber, Square, and other transformative companies.'
    }
  ];

  const metrics = [
    {
      icon: <TrendingUp className="w-8 h-8 text-green-600" />,
      title: 'Revenue Growth',
      value: '400%',
      period: 'Year-over-year',
      description: 'Consistent triple-digit growth across all segments'
    },
    {
      icon: <Users className="w-8 h-8 text-blue-600" />,
      title: 'User Growth',
      value: '50,000+',
      period: 'Active users',
      description: 'Serving professionals across 150+ countries'
    },
    {
      icon: <Globe className="w-8 h-8 text-purple-600" />,
      title: 'Market Expansion',
      value: '12',
      period: 'New markets',
      description: 'Expanded to enterprise and international markets'
    },
    {
      icon: <Award className="w-8 h-8 text-orange-600" />,
      title: 'Product Innovation',
      value: '25+',
      period: 'AI features',
      description: 'Industry-leading AI capabilities for career advancement'
    }
  ];

  const milestones = [
    { date: 'Q1 2025', event: 'Company Founded', description: 'PostPilot incorporated with founding team' },
    // { date: 'Q2 2023', event: 'Seed Funding', description: '$5M seed round led by First Round Capital' },
    { date: 'Q3 2025', event: 'Product Launch', description: 'Beta launch with 1,000 early users' },
    { date: 'Q4 2025', event: 'Market Validation', description: 'Achieved product-market fit metrics' },
    // { date: 'Q1 2024', event: 'Scale Phase', description: 'Crossed 10,000 active users milestone' },
    // { date: 'Q2 2024', event: 'Series A', description: '$20M Series A led by Andreessen Horowitz' },
    // { date: 'Q3 2024', event: 'Enterprise Launch', description: 'Launched enterprise features and team plans' },
    // { date: 'Q4 2024', event: 'International Expansion', description: 'Expanded to European and Asian markets' }
  ];

  return (
    <div className="min-h-screen pt-16">
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-green-50 via-white to-blue-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
            Investor
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600">
              {" "}Relations
            </span>
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            PostPilot is backed by world-class investors who share our vision of democratizing 
            professional success through AI-powered career tools.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-green-700 hover:to-blue-700">
              Download Investment Deck
            </Button>
            <Button size="lg" variant="outline">
              Contact Investor Relations
            </Button>
          </div>
        </div>
      </section>

      {/* Key Metrics */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Key Performance Metrics
            </h2>
            <p className="text-xl text-gray-600">
              Strong fundamentals driving sustainable growth
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {metrics.map((metric, index) => (
              <Card key={index} className="text-center hover:shadow-lg transition-shadow">
                <CardContent className="p-8">
                  <div className="mb-4 flex justify-center">{metric.icon}</div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">{metric.title}</h3>
                  <div className="text-3xl font-bold text-gray-900 mb-1">{metric.value}</div>
                  <div className="text-sm text-gray-600 mb-3">{metric.period}</div>
                  <p className="text-sm text-gray-600">{metric.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Investors */}
      {/* <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Our Investors
            </h2>
            <p className="text-xl text-gray-600">
              Backed by leading venture capital firms with a track record of success
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {investors.map((investor, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardContent className="p-8">
                  <div className="flex items-start space-x-6">
                    <div className="flex-shrink-0">
                      <div className="w-16 h-16 bg-gradient-to-br from-blue-400 to-purple-600 rounded-lg flex items-center justify-center">
                        <span className="text-white font-bold text-sm">{investor.logo}</span>
                      </div>
                    </div>
                    
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-2">
                        <h3 className="text-xl font-bold text-gray-900">{investor.name}</h3>
                        <Badge variant="outline">{investor.type}</Badge>
                      </div>
                      <div className="text-2xl font-bold text-green-600 mb-3">{investor.amount}</div>
                      <p className="text-gray-600">{investor.description}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
          
          <div className="text-center mt-12">
            <div className="bg-blue-50 rounded-lg p-8 max-w-2xl mx-auto">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Total Funding Raised</h3>
              <div className="text-4xl font-bold text-blue-600 mb-2">$25 Million</div>
              <p className="text-gray-600">Across seed and Series A rounds to accelerate growth and innovation</p>
            </div>
          </div>
        </div>
      </section> */}

      {/* Company Milestones */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Company Milestones
            </h2>
            <p className="text-xl text-gray-600">
              Key achievements on our journey to transform careers globally
            </p>
          </div>
          
          <div className="relative">
            <div className="absolute left-1/2 transform -translate-x-0.5 w-0.5 h-full bg-blue-200"></div>
            <div className="space-y-8">
              {milestones.map((milestone, index) => (
                <div key={index} className={`relative flex items-center ${
                  index % 2 === 0 ? 'justify-start' : 'justify-end'
                }`}>
                  <div className={`w-5/12 ${index % 2 === 0 ? 'pr-8 text-right' : 'pl-8 text-left'}`}>
                    <Card className="bg-gradient-to-br from-blue-50 to-green-50">
                      <CardContent className="p-6">
                        <div className="text-sm font-bold text-blue-600 mb-1">{milestone.date}</div>
                        <h3 className="text-lg font-semibold text-gray-900 mb-2">{milestone.event}</h3>
                        <p className="text-gray-600">{milestone.description}</p>
                      </CardContent>
                    </Card>
                  </div>
                  <div className="absolute left-1/2 transform -translate-x-1/2 w-4 h-4 bg-blue-600 rounded-full border-4 border-white"></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Market Opportunity */}
      <section className="py-20 bg-blue-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                Massive Market Opportunity
              </h2>
              <p className="text-lg text-gray-600 mb-8">
                The global career services market is experiencing unprecedented growth, 
                driven by digital transformation and the need for continuous reskilling.
              </p>
              
              <div className="space-y-6">
                <div>
                  <h4 className="text-lg font-semibold text-gray-900 mb-2">Total Addressable Market</h4>
                  <div className="text-3xl font-bold text-blue-600">$15.2B</div>
                  <p className="text-gray-600">Global career services and professional development market</p>
                </div>
                
                <div>
                  <h4 className="text-lg font-semibold text-gray-900 mb-2">Market Growth Rate</h4>
                  <div className="text-3xl font-bold text-green-600">18.5%</div>
                  <p className="text-gray-600">Annual growth rate driven by AI adoption and remote work trends</p>
                </div>
              </div>
            </div>
            
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Key Market Drivers</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-start space-x-3">
                      <div className="w-2 h-2 bg-blue-600 rounded-full mt-2"></div>
                      <div>
                        <h5 className="font-semibold text-gray-900">Digital Transformation</h5>
                        <p className="text-gray-600 text-sm">Accelerated adoption of AI in HR and recruiting</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start space-x-3">
                      <div className="w-2 h-2 bg-green-600 rounded-full mt-2"></div>
                      <div>
                        <h5 className="font-semibold text-gray-900">Skills Gap Crisis</h5>
                        <p className="text-gray-600 text-sm">Growing demand for reskilling and career transitions</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start space-x-3">
                      <div className="w-2 h-2 bg-purple-600 rounded-full mt-2"></div>
                      <div>
                        <h5 className="font-semibold text-gray-900">Remote Work</h5>
                        <p className="text-gray-600 text-sm">Increased focus on professional networking and personal branding</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start space-x-3">
                      <div className="w-2 h-2 bg-orange-600 rounded-full mt-2"></div>
                      <div>
                        <h5 className="font-semibold text-gray-900">Generational Shift</h5>
                        <p className="text-gray-600 text-sm">Millennials and Gen Z expect AI-powered career tools</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Information */}
      {/* <section className="py-20 bg-gradient-to-r from-green-600 to-blue-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Investor Relations Contact
          </h2>
          <p className="text-xl text-green-100 mb-8">
            For investor inquiries, financial information, or partnership opportunities
          </p>
          
          <div className="bg-white/10 rounded-lg p-8 max-w-md mx-auto mb-8">
            <h3 className="text-xl font-semibold text-white mb-4">Sarah Chen</h3>
            <p className="text-green-100 mb-2">CEO & Founder</p>
            <p className="text-green-100 mb-4">investors@postpilot.com</p>
            <p className="text-green-100">+1 (555) 123-INVEST</p>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-white text-green-600 hover:bg-gray-100">
              Download Investor Deck
            </Button>
            <Button size="lg" variant="outline" className="text-white border-white hover:bg-white hover:text-green-600">
              Schedule Meeting
            </Button>
          </div>
        </div>
      </section> */}
    </div>
  );
};

export default InvestorsPage;
