
import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  ArrowRight, 
  Target, 
  Heart, 
  Users, 
  Award, 
  Rocket, 
  Globe, 
  BarChart, 
  Zap, 
  ArrowUpRight, 
  Check, 
  Sparkles,
  Lightbulb,
  Handshake,
  ShieldCheck,
  TrendingUp,
  Code2,
  BrainCircuit
} from 'lucide-react';
import { cn } from '@/lib/utils';

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
        <div className="fixed inset-0 bg-grid-light dark:bg-grid-dark opacity-20 dark:opacity-100 pointer-events-none" />
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
        {/* Animated background elements */}
        <div className="absolute inset-0 -z-10 overflow-hidden">
          <div className="absolute top-1/4 -right-1/4 w-96 h-96 bg-gradient-to-r from-electric-purple/20 to-neon-blue/20 rounded-full filter blur-3xl opacity-30"></div>
          <div className="absolute bottom-1/4 -left-1/4 w-96 h-96 bg-gradient-to-r from-neon-blue/20 to-electric-purple/20 rounded-full filter blur-3xl opacity-30"></div>
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHZpZXdCb3g9IjAgMCA0MCA0MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiM5OTkiIGZpbGwtb3BhY2l0eT0iMC4wNSI+PHBhdGggZD0iTTIxIDIxYzAtLjI4LS4yMi0uNS0uNS0uVjIxLjVjMCAuMjguMjIuNS41LjVoLjV2LS41aC0uNXpNMjAgMTBjNS41MjMgMCAxMCA0LjQ3NyAxMCAxMHMtNC40NzcgMTAtMTAgMTBTMTAgMjUuNTIzIDEwIDIwYzAtMS4wMTYuMTUtMS45OTYuNDM0LTIuOTExLjA5LS4yOTYtLjE0LS41ODktLjQ0Ny0uNTg5aC0uOTc0Yy0uMjc1IDAtLjUuMjI0LS41LjV2LjA1Yy4wMDEuMDIuMDAzLjA0LjAwNi4wNjEuMzI3IDIuMTM4IDEuMjM5IDQuMTEgMi41NjYgNS44MzRDNi4xODMgMjUuODUxIDQgMjMuMTkzIDQgMjBjMC00LjQxOCAzLjU4Mi04IDgtOHpNTEgMjBjMCAxLjEwNS0uMTQ2IDIuMTc2LS40MjUgMy4yMDMtLjA5LjMzLjEzLjY3LjQ4Mi42N2guOTg2Yy4yNzUgMCAuNS0uMjI0LjUtLjV2LS4wNWMtLjAwMS0uMDItLjAwMy0uMDQtLjAwNi0uMDYxLS4zMjctMi4xMzgtMS4yMzktNC4xMS0yLjU2Ni01LjgzNEM0OS44MTcgMTQuMTQ5IDUyIDE2LjgwNyA1MiAyMGMwIDQuNDE4LTMuNTgyIDgtOCA4LTUuNTIzIDAtMTAtNC40NzctMTAtMTBzNC40NzctMTAgMTAtMTBjNS4zNTIgMCA5LjY4OCA0LjE2IDkuOTc1IDkuNXoiLz48L2c+PC9nPjwvc3ZnPg==')]"></div>
        </div>

        <main className="relative z-10">
          {/* Hero Section */}
          <section className="relative pt-24 pb-16 md:pt-32 md:pb-24 overflow-hidden">
            <div className="absolute inset-0 -z-10">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-electric-purple/5 via-background to-background"></div>
              <div className="absolute inset-0 [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]"></div>
              <div className="absolute inset-0 bg-gradient-to-b from-background/0 via-background/30 to-background"></div>
            </div>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center max-w-4xl mx-auto">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gradient-to-r from-electric-purple/10 to-neon-blue/10 border border-electric-purple/20 mb-6 backdrop-blur-sm"
                >
                  <Sparkles className="h-4 w-4 text-electric-purple" />
                  <span className="text-sm font-medium bg-clip-text text-transparent bg-gradient-to-r from-electric-purple to-neon-blue">
                    Innovating the Future
                  </span>
                </motion.div>
                
                <div className="relative">
                  <motion.div 
                    className="absolute -inset-4 bg-gradient-to-r from-electric-purple/20 to-neon-blue/20 rounded-2xl blur-2xl opacity-30"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 0.3, scale: 1 }}
                    transition={{ duration: 1, delay: 0.2 }}
                  />
                  <motion.h1
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.1 }}
                    className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-6 font-space relative"
                  >
                    <span className="bg-clip-text text-transparent bg-gradient-to-r from-foreground to-foreground/80">
                      About Our
                    </span>{' '}
                    <span className="relative">
                      <span className="relative z-10 bg-clip-text text-transparent bg-gradient-to-r from-electric-purple to-neon-blue">
                        Vision
                      </span>
                      <span className="absolute -bottom-1 left-0 w-full h-2 bg-gradient-to-r from-electric-purple/30 to-neon-blue/30 -z-0 rounded-full"></span>
                    </span>
                  </motion.h1>
                </div>
                
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  className="text-xl text-foreground/90 dark:text-foreground/90 leading-relaxed"
                >
                  We're on a mission to revolutionize the way people interact with technology, making it more intuitive, accessible, and impactful for everyone.
                </motion.p>
                
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                  className="flex flex-wrap justify-center gap-4"
                >
                  <Button 
                    size="lg" 
                    className="group relative overflow-hidden"
                    asChild
                  >
                    <Link to="/contact">
                      <span className="relative z-10 flex items-center">
                        Get in Touch
                        <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                      </span>
                      <span className="absolute inset-0 bg-gradient-to-r from-electric-purple to-neon-blue opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                    </Link>
                  </Button>
                  <Button 
                    variant="outline" 
                    size="lg" 
                    className="group relative overflow-hidden border border-border/50 hover:border-electric-purple/50 transition-all"
                    asChild
                  >
                    <Link to="/careers">
                      <span className="relative z-10 flex items-center">
                        Join Our Team
                        <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                      </span>
                      <span className="absolute inset-0 bg-gradient-to-r from-electric-purple/5 to-neon-blue/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                    </Link>
                  </Button>
                </motion.div>
              </div>
            </div>
          </section>

          {/* Values Section */}
          <section className="py-16 md:py-24 relative overflow-hidden">
            <div className="absolute inset-0 -z-10">
              <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-electric-purple/5 via-background to-background"></div>
              <div className="absolute inset-0 [mask-image:radial-gradient(ellipse_at_center,transparent_30%,black)]"></div>
            </div>
            
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <motion.div 
                className="text-center max-w-3xl mx-auto mb-16"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
              >
                <Badge className="bg-gradient-to-r from-electric-purple/10 to-neon-blue/10 text-foreground border border-electric-purple/20 mb-4 px-4 py-1.5 rounded-full">
                  <Sparkles className="h-4 w-4 mr-2 text-electric-purple" />
                  Our Values
                </Badge>
                <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4 font-space">
                  Guiding <span className="bg-clip-text text-transparent bg-gradient-to-r from-electric-purple to-neon-blue">Principles</span>
                </h2>
                <p className="text-foreground/90 dark:text-foreground/90 text-lg">
                  These core values shape everything we do and how we work together to create impact.
                </p>
              </motion.div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {values.map((value, index) => (
                  <motion.div
                    key={value.title}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ 
                      duration: 0.5, 
                      delay: index * 0.1,
                      type: "spring",
                      stiffness: 100
                    }}
                    className="group"
                  >
                    <Card className="h-full bg-card/50 backdrop-blur-sm border border-border/20 hover:border-electric-purple/50 transition-all duration-300 group-hover:shadow-xl group-hover:-translate-y-1 overflow-hidden">
                      <div className="absolute inset-0 bg-gradient-to-br from-electric-purple/5 to-neon-blue/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                      <CardHeader className="relative z-10 pb-3">
                        <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-electric-purple/10 to-neon-blue/10 flex items-center justify-center mb-4 text-electric-purple group-hover:scale-110 transition-transform duration-300">
                          {React.cloneElement(value.icon, { className: 'w-6 h-6' })}
                        </div>
                        <CardTitle className="text-xl font-semibold bg-clip-text text-transparent bg-gradient-to-r from-foreground to-foreground/80">
                          {value.title}
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="relative z-10">
                        <p className="text-foreground/90 dark:text-foreground/90 mb-8">
                          {value.description}
                        </p>
                      </CardContent>
                      <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-electric-purple/0 via-electric-purple/50 to-neon-blue/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    </Card>
                  </motion.div>
                ))}
              </div>
              
              <motion.div 
                className="mt-16 text-center"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.3 }}
              >
                <p className="text-foreground/90 dark:text-foreground/90 mb-6">
                  Want to learn more about our culture and values?
                </p>
                <Button variant="outline" className="group" asChild>
                  <Link to="/careers">
                    <span className="relative z-10 flex items-center">
                      Join Our Team
                      <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                    </span>
                    <span className="absolute inset-0 bg-gradient-to-r from-electric-purple/5 to-neon-blue/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                  </Link>
                </Button>
              </motion.div>
            </div>
          </section>

          {/* Timeline Section */}
          <section className="py-10 px-4 sm:px-6 lg:px-8 relative">
            <div className="max-w-7xl mx-auto">
              <motion.div 
                className="text-center max-w-3xl mx-auto mb-16"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
              >
                <Badge className="bg-gradient-to-r from-electric-purple/10 to-neon-blue/10 text-foreground border border-electric-purple/20 mb-4">
                  Our Journey
                </Badge>
                <h2 className="text-3xl md:text-4xl font-bold font-space text-foreground mb-4">
                  Milestones & Achievements
                </h2>
                <p className="text-foreground/90 dark:text-foreground/90">
                  From our humble beginnings to becoming an industry leader in AI-powered career solutions.
                </p>
              </motion.div>
              
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
                        <div className={`p-6 glow-card bg-card/50 backdrop-blur-sm border border-electric-purple/20 hover:border-electric-purple/50 rounded-xl transition-all duration-300 ${index % 2 === 0 ? 'text-right' : 'text-left'}`}>
                          <div className="text-sm font-medium text-electric-purple mb-1">{item.year}</div>
                          <h3 className="text-xl font-semibold text-foreground mb-2">{item.title}</h3>
                          <p className="text-foreground/90 dark:text-foreground/90">{item.description}</p>
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
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="group"
                  >
                    <div className="p-6 bg-card/50 backdrop-blur-sm border border-border/20 rounded-xl hover:border-electric-purple/50 transition-all duration-300 h-full">
                      <div className="flex justify-center mb-4">
                        {React.cloneElement(stat.icon, { 
                          className: 'w-8 h-8 text-electric-purple group-hover:scale-110 transition-transform' 
                        })}
                      </div>
                      <div className="text-3xl md:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-electric-purple to-neon-blue mb-2">
                        {stat.number}
                      </div>
                      <div className="text-foreground/90 dark:text-foreground/90">{stat.label}</div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>

          {/* CTA Section */}
          <section className="py-24 px-4 sm:px-6 lg:px-8 relative">
            <div className="absolute inset-0 bg-gradient-to-r from-electric-purple/5 to-neon-blue/5" />
            <div className="max-w-4xl mx-auto text-center relative z-10">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="bg-background/50 backdrop-blur-sm p-8 rounded-2xl border border-electric-purple/20 shadow-xl"
              >
                <div className="w-16 h-16 bg-gradient-to-r from-electric-purple to-neon-blue rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <Rocket className="h-8 w-8 text-white" />
                </div>
                <h2 className="text-3xl font-bold text-foreground mb-4">
                  Ready to Transform Your Career?
                </h2>
                <p className="text-foreground/90 dark:text-foreground/90 mb-8">
                  Join thousands of professionals who are already advancing their careers with our AI-powered platform.
                </p>
                <div className="flex flex-col sm:flex-row justify-center gap-4">
                  <Button size="lg" asChild className="group">
                    <Link to="/signup">
                      Get Started Free
                      <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </Button>
                  <Button size="lg" variant="outline" asChild>
                    <Link to="/demo">
                      Schedule a Demo
                    </Link>
                  </Button>
                </div>
              </motion.div>
            </div>
          </section>
        </main>
      </motion.div>
    </AnimatePresence>
  );
};

export default AboutUsPage;
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
