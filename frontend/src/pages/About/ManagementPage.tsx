
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

const ManagementPage: React.FC = () => {
  const executives = [
    {
      name: 'Harsh Singh Rajput',
      title: 'Founder',
      bio: 'Harsh Kumar Singh founded PostPilot with a mission to simplify customer engagement for modern businesses. With a B.Com. in Business Process Management and a specialization in CRM from Delhi Skills and Entrepreneurship University, Harsh brings a deep understanding of customer behavior, digital marketing, and data-driven decision-making. He has led multiple research and consulting projects focused on market analysis, process optimization, and digital transformation. His work reflects a passion for building strategic, customer-centric solutions that help businesses grow smarter and faster.',
      previousRoles: [`Market Research & CRM Strategy`,`Sales Manager` ],
      education: ['B.Com. in Business Process Management (BPM),Delhi'],
      linkedin: '#',
      image: 'HR'
    },
    {
      name: 'Manish Ahirrao',
      title: 'Co-founder',
      bio: 'Manish Ahirrao co-founded PostPilot to bridge the gap between intelligent automation and user-centric product experiences. With a background in Computer Science from Savitribai Phule Pune University and hands-on expertise in full-stack web development, Manish has built scalable tech solutions using modern frameworks like React, Node.js, and MongoDB. His deep interest in machine learning and AI led him to complete a Data Science & ML internship, where he applied predictive analytics to real-world problems. At PostPilot, Manish leads the technology vision—driving innovation at the intersection of AI and digital engagement.',
      previousRoles: ['Data Science & Machine Learning '],
      education: ['Bachelor of Engineering in Computer Science,Pune'],
      linkedin: '#',
      image: 'MA'
    },
    
  ];

  // const advisors = [
  //   {
  //     name: 'Dr. Jennifer Walsh',
  //     title: 'AI Advisor',
  //     company: 'Former VP AI at Google',
  //     bio: 'Leading AI researcher with 20+ publications in top-tier conferences.',
  //     image: 'JW'
  //   },
  //   {
  //     name: 'Robert Martinez',
  //     title: 'Go-to-Market Advisor',
  //     company: 'Former CMO at Slack',
  //     bio: 'Expert in scaling B2B SaaS companies from startup to IPO.',
  //     image: 'RM'
  //   },
  //   {
  //     name: 'Amanda Foster',
  //     title: 'HR Technology Advisor',
  //     company: 'Former Chief People Officer at Stripe',
  //     bio: 'Pioneer in people analytics and future of work technologies.',
  //     image: 'AF'
  //   }
  // ];

  return (
    <div className="min-h-screen pt-16">
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-blue-50 via-white to-purple-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
            Leadership
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
              {" "}Team
            </span>
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Meet the experienced leaders driving PostPilot's mission to democratize 
            professional success through AI-powered career tools.
          </p>
        </div>
      </section>

      {/* Executive Team */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Executive Team
            </h2>
            <p className="text-xl text-gray-600">
              Proven leaders with decades of experience building world-class products
            </p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {executives.map((executive, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardContent className="p-8">
                  <div className="flex items-start space-x-6">
                    <div className="flex-shrink-0">
                      <div className="w-24 h-24 bg-gradient-to-br from-blue-400 to-purple-600 rounded-full flex items-center justify-center">
                        <span className="text-white font-bold text-2xl">{executive.image}</span>
                      </div>
                    </div>
                    
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-gray-900 mb-1">{executive.name}</h3>
                      <p className="text-blue-600 font-medium mb-3">{executive.title}</p>
                      
                      <p className="text-gray-700 mb-4 text-sm leading-relaxed">{executive.bio}</p>
                      
                      <div className="space-y-3">
                        <div>
                          <h4 className="text-sm font-semibold text-gray-900 mb-1">Previous Roles</h4>
                          <div className="flex flex-wrap gap-1">
                            {executive.previousRoles.map((role, roleIndex) => (
                              <Badge key={roleIndex} variant="outline" className="text-xs">
                                {role}
                              </Badge>
                            ))}
                          </div>
                        </div>
                        
                        <div>
                          <h4 className="text-sm font-semibold text-gray-900 mb-1">Education</h4>
                          <div className="flex flex-wrap gap-1">
                            {executive.education.map((edu, eduIndex) => (
                              <Badge key={eduIndex} variant="secondary" className="text-xs">
                                {edu}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      </div>
                      
                      <div className="mt-4">
                        <Button variant="outline" size="sm">
                          <div className="w-4 h-4 mr-2 bg-blue-600 rounded flex items-center justify-center">
                            <span className="text-white font-bold text-xs">in</span>
                          </div>
                          Connect on LinkedIn
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Board of Advisors */}
      {/* <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Board of Advisors
            </h2>
            <p className="text-xl text-gray-600">
              Industry experts guiding our strategic direction
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {advisors.map((advisor, index) => (
              <Card key={index} className="text-center hover:shadow-lg transition-shadow">
                <CardContent className="p-8">
                  <div className="w-20 h-20 bg-gradient-to-br from-green-400 to-blue-600 rounded-full mx-auto mb-4 flex items-center justify-center">
                    <span className="text-white font-bold text-xl">{advisor.image}</span>
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 mb-1">{advisor.name}</h3>
                  <p className="text-blue-600 font-medium mb-2">{advisor.title}</p>
                  <p className="text-gray-600 text-sm mb-3">{advisor.company}</p>
                  <p className="text-gray-700 text-sm">{advisor.bio}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section> */}

      {/* Company Stats */}
      <section className="py-20 bg-blue-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Leadership by the Numbers
            </h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold text-blue-600 mb-2">100+</div>
              <div className="text-gray-600">Combined Years of Experience</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-purple-600 mb-2">$2B+</div>
              <div className="text-gray-600">Previous Company Valuations</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-green-600 mb-2">50M+</div>
              <div className="text-gray-600">Users at Previous Companies</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-orange-600 mb-2">15+</div>
              <div className="text-gray-600">Successful Exits</div>
            </div>
          </div>
        </div>
      </section>

      {/* Team Culture */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                Leadership Philosophy
              </h2>
              <p className="text-lg text-gray-600 mb-6">
                Our leadership team believes in transparency, empowerment, and leading by example. 
                We foster a culture where every team member can contribute to our mission and grow 
                their careers alongside our company.
              </p>
              
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-blue-600 rounded-full mt-2"></div>
                  <div>
                    <h4 className="font-semibold text-gray-900">Servant Leadership</h4>
                    <p className="text-gray-600 text-sm">We serve our team and customers, not the other way around</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-purple-600 rounded-full mt-2"></div>
                  <div>
                    <h4 className="font-semibold text-gray-900">Data-Driven Decisions</h4>
                    <p className="text-gray-600 text-sm">We make decisions based on data, not opinions or hierarchy</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-green-600 rounded-full mt-2"></div>
                  <div>
                    <h4 className="font-semibold text-gray-900">Continuous Learning</h4>
                    <p className="text-gray-600 text-sm">We're always learning and adapting to serve our users better</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-orange-600 rounded-full mt-2"></div>
                  <div>
                    <h4 className="font-semibold text-gray-900">Customer Obsession</h4>
                    <p className="text-gray-600 text-sm">Every decision starts with how it impacts our users' success</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="relative">
              <Card className="bg-gradient-to-br from-blue-50 to-purple-50">
                <CardContent className="p-8">
                  <h3 className="text-xl font-bold text-gray-900 mb-6">Team Diversity</h3>
                  
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-gray-700">Gender Diversity</span>
                        <span className="font-medium">50/50</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div className="bg-purple-600 h-2 rounded-full w-1/2"></div>
                      </div>
                    </div>
                    
                    <div>
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-gray-700">International Background</span>
                        <span className="font-medium">67%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div className="bg-blue-600 h-2 rounded-full w-2/3"></div>
                      </div>
                    </div>
                    
                    <div>
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-gray-700">Technical Background</span>
                        <span className="font-medium">83%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div className="bg-green-600 h-2 rounded-full w-5/6"></div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ManagementPage;
