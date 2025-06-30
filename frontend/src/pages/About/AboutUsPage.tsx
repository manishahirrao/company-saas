
import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ArrowRight, Target, Heart, Users, Award, Rocket, Globe, BarChart, Zap } from 'lucide-react';
import Navbar from '@/components/Layout/Navbar';
import Footer from '@/components/Layout/Footer';

const AboutUsPage: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    document.title = 'About Us - VORTEX AI';
  }, []);

  const values = [
    {
      icon: <Rocket className="w-6 h-6 text-electric-purple" />,
      title: 'Innovation First',
      description: 'We constantly push the boundaries of what\'s possible with AI to give our users competitive advantages.'
    },
    {
      icon: <Heart className="w-6 h-6 text-pink-500" />,
      title: 'User-Centric',
      description: 'Every feature we build starts with understanding our users\' real challenges and needs.'
    },
    {
      icon: <Users className="w-6 h-6 text-neon-blue" />,
      title: 'Inclusive Growth',
      description: 'We believe everyone deserves equal opportunities to advance their career, regardless of background.'
    },
    {
      icon: <Zap className="w-6 h-6 text-yellow-500" />,
      title: 'Excellence',
      description: 'We strive for excellence in everything we do, from product quality to customer support.'
    }
  ];

  const timeline = [
    {
      year: '2025',
      title: 'Company Founded',
      description: 'VORTEX AI was founded with a mission to revolutionize how professionals leverage AI for career growth.'
    },
    {
      year: '2025',
      title: 'First 10,000 Users',
      description: 'Reached our first major milestone of 10,000 active users within 3 months of launch.'
    },
    {
      year: '2025',
      title: 'Series A Funding',
      description: 'Secured $10M in Series A funding to accelerate product development and global expansion.'
    },
    {
      year: '2026',
      title: 'Global Expansion',
      description: 'Expanded our services to support professionals in over 150 countries worldwide.'
    }
  ];

  const stats = [
    { number: '50,000+', label: 'Active Users', icon: <Users className="w-6 h-6" /> },
    { number: '2M+', label: 'AI Generations', icon: <Zap className="w-6 h-6" /> },
    { number: '150+', label: 'Countries', icon: <Globe className="w-6 h-6" /> },
    { number: '99.9%', label: 'Uptime', icon: <BarChart className="w-6 h-6" /> }
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
        
        <main className="relative z-10">
          {/* Hero Section */}
          <section className="relative py-20 md:py-28 overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-electric-purple/5 via-transparent to-neon-blue/5" />
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
              <div className="text-center max-w-4xl mx-auto">
                <Badge className="mb-6 bg-gradient-to-r from-electric-purple to-neon-blue text-white border-0">
                  Our Story
                </Badge>
                <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-6 bg-clip-text text-transparent bg-gradient-to-r from-foreground to-foreground/70">
                  Empowering Careers with AI
                </h1>
                <p className="text-xl text-foreground/80 max-w-2xl mx-auto mb-8">
                  We're on a mission to revolutionize professional growth through innovative AI solutions that help individuals and businesses thrive in the digital age.
                </p>
                <div className="flex flex-wrap justify-center gap-4">
                  <Button className="group" size="lg">
                    <span className="group-hover:translate-x-1 transition-transform duration-200">
                      Join Our Team
                    </span>
                    <ArrowRight className="ml-2 h-4 w-4 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-200" />
                  </Button>
                  <Button variant="outline" size="lg" className="group">
                    <span className="group-hover:translate-x-1 transition-transform duration-200">
                      Learn More
                    </span>
                    <ArrowRight className="ml-2 h-4 w-4 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-200" />
                  </Button>
                </div>
              </div>
            </div>
          </section>

          {/* Values Section */}
          <section className="py-16 md:py-24 bg-muted/30">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center max-w-3xl mx-auto mb-16">
                <Badge className="mb-4 bg-gradient-to-r from-electric-purple to-neon-blue text-white border-0">
                  Our Values
                </Badge>
                <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                  What We Stand For
                </h2>
                <p className="text-foreground/70">
                  These core principles guide everything we do at VORTEX AI, from product development to customer support.
                </p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {values.map((value, index) => (
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
                          {value.icon}
                        </div>
                        <h3 className="text-xl font-semibold text-foreground mb-2">
                          {value.title}
                        </h3>
                        <p className="text-foreground/70">
                          {value.description}
                        </p>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>

          {/* Timeline Section */}
          <section className="py-16 md:py-24">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center max-w-3xl mx-auto mb-16">
                <Badge className="mb-4 bg-gradient-to-r from-electric-purple to-neon-blue text-white border-0">
                  Our Journey
                </Badge>
                <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                  Milestones & Achievements
                </h2>
                <p className="text-foreground/70">
                  From our humble beginnings to becoming an industry leader in AI-powered career solutions.
                </p>
              </div>
              <div className="relative">
                <div className="absolute left-1/2 w-0.5 h-full bg-gradient-to-b from-electric-purple/20 via-neon-blue/50 to-electric-purple/20 -translate-x-1/2"></div>
                <div className="space-y-12">
                  {timeline.map((item, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5 }}
                      className={`relative flex ${index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'} items-center`}
                    >
                      <div className="w-1/2 px-8">
                        <div className={`p-6 bg-card border border-border/50 rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300 ${index % 2 === 0 ? 'text-right' : 'text-left'}`}>
                          <div className="text-sm font-medium text-primary mb-1">{item.year}</div>
                          <h3 className="text-xl font-semibold text-foreground mb-2">{item.title}</h3>
                          <p className="text-foreground/70">{item.description}</p>
                        </div>
                      </div>
                      <div className="w-1/2 flex justify-center">
                        <div className="w-4 h-4 rounded-full bg-gradient-to-r from-electric-purple to-neon-blue"></div>
                      </div>
                      <div className="w-1/2 px-8"></div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* Stats Section */}
          <section className="py-16 md:py-24 bg-muted/30">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {stats.map((stat, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1, duration: 0.5 }}
                    className="text-center"
                  >
                    <Card className="border-border/50 hover:border-primary/30 transition-all duration-300 h-full">
                      <CardContent className="p-8">
                        <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4 text-primary">
                          {stat.icon}
                        </div>
                        <h3 className="text-4xl font-bold text-foreground mb-2">
                          {stat.number}
                        </h3>
                        <p className="text-foreground/70">
                          {stat.label}
                        </p>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>

          {/* CTA Section */}
          <section className="py-16 md:py-24 bg-gradient-to-br from-electric-purple/5 via-transparent to-neon-blue/5">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
                Ready to transform your career with AI?
              </h2>
              <p className="text-xl text-foreground/80 mb-8 max-w-2xl mx-auto">
                Join thousands of professionals who are already accelerating their careers with VORTEX AI.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <Button size="lg" className="group">
                  <span className="group-hover:translate-x-1 transition-transform duration-200">
                    Get Started
                  </span>
                  <ArrowRight className="ml-2 h-4 w-4 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-200" />
                </Button>
                <Button variant="outline" size="lg" className="group">
                  <span className="group-hover:translate-x-1 transition-transform duration-200">
                    Contact Sales
                  </span>
                  <ArrowRight className="ml-2 h-4 w-4 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-200" />
                </Button>
              </div>
            </div>
          </section>
        </main>
        
        <Footer />
      </motion.div>
    </AnimatePresence>
  );
};

export default AboutUsPage;
//               About PostPilot
//             </Badge>
//             <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
//               Transforming Enterprise Social Media
//               <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
//                 {" "}Through AI Innovation
//               </span>
//             </h1>
//             <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
//               Leading organizations trust us to power their digital transformation with enterprise-grade AI solutions for social media automation and brand management.
//             </p>
//           </div>

//           {/* Stats */}
//           <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-16">
//             {stats.map((stat, index) => (
//               <div key={index} className="text-center">
//                 <div className="text-4xl font-bold text-blue-600 mb-2">{stat.number}</div>
//                 <div className="text-gray-600">{stat.label}</div>
//               </div>
//             ))}
//           </div>
//         </div>
//       </section>

//       {/* Mission & Vision */}
//       <section className="py-20 bg-white">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//           <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
//             <div>
//               <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">Our Mission</h2>
//               <p className="text-lg text-gray-600 mb-6">
//                 To empower every professional with AI-driven tools that remove barriers to career 
//                 advancement and help them achieve their full potential in the modern workplace.
//               </p>
//               <p className="text-lg text-gray-600 mb-8">
//                 We believe that career success shouldn't depend on who you know or where you went 
//                 to school. With the right tools and insights, anyone can build a strong professional 
//                 brand and find opportunities that match their skills and aspirations.
//               </p>
//               <Link to="/contact-sales">
//                 <Button size="lg" className="bg-blue-600 hover:bg-blue-700">
//                   Join Our Mission
//                   <ArrowRight className="w-5 h-5 ml-2" />
//                 </Button>
//               </Link>
//             </div>
            
//             <div className="relative">
//               <Card className="bg-gradient-to-br from-blue-50 to-purple-50">
//                 <CardContent className="p-8">
//                   <h3 className="text-2xl font-bold text-gray-900 mb-4">Our Vision</h3>
//                   <p className="text-gray-700 mb-6">
//                     A world where every professional has equal access to career advancement 
//                     opportunities, powered by intelligent technology that understands and 
//                     amplifies human potential.
//                   </p>
//                   <div className="space-y-3">
//                     <div className="flex items-center space-x-2">
//                       <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
//                       <span className="text-gray-700">Democratize professional networking</span>
//                     </div>
//                     <div className="flex items-center space-x-2">
//                       <div className="w-2 h-2 bg-purple-600 rounded-full"></div>
//                       <span className="text-gray-700">Eliminate bias in hiring</span>
//                     </div>
//                     <div className="flex items-center space-x-2">
//                       <div className="w-2 h-2 bg-green-600 rounded-full"></div>
//                       <span className="text-gray-700">Accelerate career growth globally</span>
//                     </div>
//                   </div>
//                 </CardContent>
//               </Card>
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* Values */}
//       <section className="py-20 bg-gray-50">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//           <div className="text-center mb-16">
//             <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
//               Our Values
//             </h2>
//             <p className="text-xl text-gray-600">
//               The principles that guide everything we do
//             </p>
//           </div>
          
//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
//             {values.map((value, index) => (
//               <Card key={index} className="text-center hover:shadow-lg transition-shadow">
//                 <CardContent className="p-8">
//                   <div className="mb-4 flex justify-center">{value.icon}</div>
//                   <h3 className="text-xl font-semibold text-gray-900 mb-3">{value.title}</h3>
//                   <p className="text-gray-600">{value.description}</p>
//                 </CardContent>
//               </Card>
//             ))}
//           </div>
//         </div>
//       </section>

//       {/* Timeline */}
//       <section className="py-20 bg-white">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//           <div className="text-center mb-16">
//             <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
//               Our Journey
//             </h2>
//             <p className="text-xl text-gray-600">
//               Key milestones in our mission to transform careers
//             </p>
//           </div>
          
//           <div className="relative">
//             <div className="absolute left-1/2 transform -translate-x-0.5 w-0.5 h-full bg-blue-200"></div>
//             <div className="space-y-12">
//               {timeline.map((item, index) => (
//                 <div key={index} className={`relative flex items-center ${
//                   index % 2 === 0 ? 'justify-start' : 'justify-end'
//                 }`}>
//                   <div className={`w-5/12 ${index % 2 === 0 ? 'pr-8 text-right' : 'pl-8 text-left'}`}>
//                     <Card className="bg-gradient-to-br from-blue-50 to-purple-50">
//                       <CardContent className="p-6">
//                         <div className="text-2xl font-bold text-blue-600 mb-2">{item.year}</div>
//                         <h3 className="text-lg font-semibold text-gray-900 mb-2">{item.title}</h3>
//                         <p className="text-gray-600">{item.description}</p>
//                       </CardContent>
//                     </Card>
//                   </div>
//                   <div className="absolute left-1/2 transform -translate-x-1/2 w-4 h-4 bg-blue-600 rounded-full border-4 border-white"></div>
//                 </div>
//               ))}
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* Team Preview */}
//       <section className="py-20 bg-blue-50">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
//           <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
//             Meet Our Team
//           </h2>
//           <p className="text-xl text-gray-600 mb-8">
//             Passionate professionals dedicated to transforming careers worldwide
//           </p>
          
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
//             <Card>
//               <CardContent className="p-6 text-center">
//                 <div className="w-20 h-20 bg-gradient-to-br from-blue-400 to-purple-600 rounded-full mx-auto mb-4 flex items-center justify-center">
//                   <span className="text-white font-bold text-xl">HR</span>
//                 </div>
//                 <h3 className="font-semibold text-gray-900">Harsh Singh Rajput</h3>
//                 <p className="text-gray-600 text-sm">Founder</p>
//               </CardContent>
//             </Card>
            
//             <Card>
//               <CardContent className="p-6 text-center">
//                 <div className="w-20 h-20 bg-gradient-to-br from-green-400 to-blue-600 rounded-full mx-auto mb-4 flex items-center justify-center">
//                   <span className="text-white font-bold text-xl">MA</span>
//                 </div>
//                 <h3 className="font-semibold text-gray-900">Manish Ahirrao</h3>
//                 <p className="text-gray-600 text-sm">Co-founder</p>
//               </CardContent>
//             </Card>
            
//           </div>
          
//           <Link to="/about/management">
//             <Button size="lg" className="bg-blue-600 hover:bg-blue-700">
//               Meet the Full Team
//               <ArrowRight className="w-5 h-5 ml-2" />
//             </Button>
//           </Link>
//         </div>
//       </section>

//       {/* CTA Section */}
//       <section className="py-20 bg-gradient-to-r from-blue-600 to-purple-600">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
//           <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
//             Ready to transform your career?
//           </h2>
//           <p className="text-xl text-blue-100 mb-8">
//             Join thousands of professionals who are already using PostPilot to accelerate their success.
//           </p>
//           <div className="flex flex-col sm:flex-row gap-4 justify-center">
//             <Link to="/auth/register">
//               <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-100">
//                 Get Started Free
//                 <ArrowRight className="w-5 h-5 ml-2" />
//               </Button>
//             </Link>
//             <Link to="/contact-sales">
//               <Button size="lg" variant="outline" className="text-white border-white hover:bg-white hover:text-blue-600">
//                 Contact Sales
//               </Button>
//             </Link>
//           </div>
//         </div>
//       </section>
//     </div>
//   );
// };

// export default AboutUsPage;
