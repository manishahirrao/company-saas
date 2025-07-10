
import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ArrowRight, BookOpen, HelpCircle, MessageCircle, Video, FileText, Users, MapPin } from 'lucide-react';
import Blog from './Blog';

const ResourcesPage: React.FC = () => {
 const blogPosts = [
  {
    title: 'How LinkedIn Automation Can Supercharge Your Job Search in 2025',
    excerpt: 'Discover how automation tools can personalize outreach, increase visibility, and speed up your job hunt.',
    category: 'Job Search',
    author: 'Manish Ahirrao',
    date: 'June 8, 2025',
    readTime: '5 min read',
  },
  {
    title: 'The Future of Recruiting: Why Every Company Needs LinkedIn Content Automation',
    excerpt: 'Recruiters and hiring managers are saving time and finding better candidates—here’s how.',
    category: 'Recruiting',
    author: 'Manish Ahirrao',
    date: 'June 7, 2025',
    readTime: '6 min read',
  },
  // {
  //   title: 'LinkedIn Post Generator Tools: How AI is Changing the Way We Network Professionally',
  //   excerpt: 'AI-generated LinkedIn posts are reshaping professional networking and brand building.',
  //   category: 'Networking',
  //   author: 'Manish Ahirrao',
  //   date: 'June 6, 2025',
  //   readTime: '4 min read',
  // },
  // {
  //   title: 'Build Your Personal Brand on LinkedIn in 10 Minutes a Day with AI',
  //   excerpt: 'Short on time? Here’s how to grow your personal brand with automation.',
  //   category: 'Personal Branding',
  //   author: 'Manish Ahirrao',
  //   date: 'June 5, 2025',
  //   readTime: '5 min read',
  // },
  // {
  //   title: 'Top LinkedIn Strategies for Startup Founders to Attract Investors and Talent',
  //   excerpt: 'Learn how founders are using LinkedIn content to build credibility and recruit top talent.',
  //   category: 'Startups',
  //   author: 'Manish Ahirrao',
  //   date: 'June 4, 2025',
  //   readTime: '6 min read',
  // },
  // {
  //   title: 'How to Write LinkedIn Posts That Get 10x More Engagement—Automatically!',
  //   excerpt: 'Unlock tips for creating high-engagement posts with the help of AI.',
  //   category: 'Content Marketing',
  //   author: 'Manish Ahirrao',
  //   date: 'June 3, 2025',
  //   readTime: '5 min read',
  // },
  // {
  //   title: '5 Ways LinkedIn Content Automation Saves Time for Busy Professionals',
  //   excerpt: 'From scheduling to smart post suggestions, automation helps you stay active without the hassle.',
  //   category: 'Productivity',
  //   author: 'Manish Ahirrao',
  //   date: 'June 2, 2025',
  //   readTime: '4 min read',
  // },
  // {
  //   title: 'The Beginner\'s Guide to LinkedIn Automation: Grow Faster, Smarter, Better',
  //   excerpt: 'Just starting out with LinkedIn automation? Here’s everything you need to know.',
  //   category: 'Beginner Guide',
  //   author: 'Manish Ahirrao',
  //   date: 'June 1, 2025',
  //   readTime: '5 min read',
  // },
  // {
  //   title: 'How Recruiters Can Use AI to Source Better Candidates on LinkedIn',
  //   excerpt: 'AI tools help recruiters discover, vet, and connect with top talent more efficiently.',
  //   category: 'HR Tech',
  //   author: 'Manish Ahirrao',
  //   date: 'May 31, 2025',
  //   readTime: '6 min read',
  // },
  // {
  //   title: 'Why Every Freelancer Should Be Using LinkedIn AI Tools in 2025',
  //   excerpt: 'Build authority, generate leads, and maintain presence with AI-driven automation.',
  //   category: 'Freelancing',
  //   author: 'Manish Ahirrao',
  //   date: 'May 30, 2025',
  //   readTime: '4 min read',
  // },
  // {
  //   title: 'The Top 7 Mistakes Job Seekers Make on LinkedIn (And How Automation Fixes Them)',
  //   excerpt: 'Avoid common pitfalls and let automation elevate your profile and messaging.',
  //   category: 'Career Tips',
  //   author: 'Manish Ahirrao',
  //   date: 'May 29, 2025',
  //   readTime: '5 min read',
  // },
  // {
  //   title: 'From Ghosted to Hired: How LinkedIn Automation Tools Boost Response Rates',
  //   excerpt: 'More replies, more interviews—see how smart automation makes you stand out.',
  //   category: 'Success Stories',
  //   author: 'Manish Ahirrao',
  //   date: 'May 28, 2025',
  //   readTime: '5 min read',
  // },
  // {
  //   title: 'How Our AI Resume and LinkedIn Toolkit is Revolutionizing the Hiring Game',
  //   excerpt: 'A deep dive into how resume builders and LinkedIn optimizers work together to land your next role.',
  //   category: 'AI Tools',
  //   author: 'Manish Ahirrao',
  //   date: 'May 27, 2025',
  //   readTime: '6 min read',
  // },
  // {
  //   title: 'Hiring for Startups? Why You Should Automate Your LinkedIn Job Posting',
  //   excerpt: 'Scale your hiring efforts with less effort and more results using automation.',
  //   category: 'Startup Hiring',
  //   author: 'Manish Ahirrao',
  //   date: 'May 26, 2025',
  //   readTime: '5 min read',
  // },
  // {
  //   title: 'AI + LinkedIn = Gamechanger for Career Growth—Here’s How',
  //   excerpt: 'Learn how AI-enhanced LinkedIn strategies are shaping the future of work.',
  //   category: 'Future of Work',
  //   author: 'Manish Ahirrao',
  //   date: 'May 25, 2025',
  //   readTime: '5 min read',
  // },
  // {
  //   title: 'Why Manual LinkedIn Posting is Dead in 2025',
  //   excerpt: 'The shift to AI-driven social engagement is here. Don’t get left behind.',
  //   category: 'Trends',
  //   author: 'Manish Ahirrao',
  //   date: 'May 24, 2025',
  //   readTime: '4 min read',
  // },
  // {
  //   title: 'Get Hired Faster: How Our LinkedIn Optimization Tool Helps You Stand Out',
  //   excerpt: 'Perfect your profile, headline, and posts to get noticed by top employers.',
  //   category: 'Job Hunt',
  //   author: 'Manish Ahirrao',
  //   date: 'May 23, 2025',
  //   readTime: '5 min read',
  // },
  // {
  //   title: 'The Ultimate LinkedIn Content Calendar for Founders and Creators (Free Template Inside)',
  //   excerpt: 'Plan, post, and profit with this free template and AI tool for effortless execution.',
  //   category: 'Founders',
  //   author: 'Manish Ahirrao',
  //   date: 'May 22, 2025',
  //   readTime: '6 min read',
  // },
];

const navigate = useNavigate();

  const helpTopics = [
    {
      icon: <FileText className="w-6 h-6 text-blue-600" />,
      title: 'Getting Started',
      description: 'Learn the basics of using PostPilot',
      articles: 12
    },
    {
      icon: <Users className="w-6 h-6 text-green-600" />,
      title: 'LinkedIn Integration',
      description: 'Connect and manage your LinkedIn account',
      articles: 8
    },
    {
      icon: <Video className="w-6 h-6 text-purple-600" />,
      title: 'Content Creation',
      description: 'Master AI-powered content generation',
      articles: 15
    },
    {
      icon: <MessageCircle className="w-6 h-6 text-orange-600" />,
      title: 'Troubleshooting',
      description: 'Solutions to common issues',
      articles: 6
    }
  ];

  return (
    <AnimatePresence>
      <motion.div 
        className="min-h-screen pt-16 relative"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
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
                Resources
              </motion.h1>
              
              <motion.p 
                className="text-2xl md:text-3xl text-foreground/90 dark:text-foreground/90 font-space font-light mb-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.6 }}
              >
                Learning Center & Guides
              </motion.p>
              
              <motion.div 
                className="inline-block px-6 py-2 bg-gradient-to-r from-electric-purple/20 to-neon-blue/20 rounded-full border border-electric-purple/30"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.8 }}
              >
                <span className="text-electric-purple font-inter font-medium">EXPERT CONTENT</span>
              </motion.div>
            </motion.div>
            
            <motion.div 
              className="mb-12 space-y-8"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1 }}
            >
              <p className="text-xl text-foreground/90 dark:text-foreground/90 max-w-3xl mx-auto font-inter leading-relaxed">
                Everything you need to master LinkedIn for Professional and Social Media for Company, 
                advance your career, and get the most out of PostPilot.
              </p>
            </motion.div>
          </div>
        </section>

      {/* Quick Access */}
      <section className="py-16 relative">
        <div className="absolute inset-0 bg-gradient-to-br from-electric-purple/5 via-transparent to-neon-blue/5" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <motion.div 
              whileHover={{ y: -5 }}
              transition={{ duration: 0.2 }}
            >
              <Card className="h-full bg-card/80 dark:bg-card/90 backdrop-blur-sm border border-border/30 dark:border-border/50 hover:shadow-lg transition-all duration-300">
                <CardContent className="p-8 text-center h-full flex flex-col">
                  <div className="bg-gradient-to-r from-electric-purple/10 to-neon-blue/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                    <BookOpen className="w-8 h-8 text-electric-purple" />
                  </div>
                  <h3 className="text-xl font-semibold text-foreground dark:text-foreground/95 mb-3 font-inter">Blog</h3>
                  <p className="text-foreground/90 dark:text-foreground/80 mb-6 flex-grow">
                    Expert insights, tips, and strategies for career growth and LinkedIn success.
                  </p>
                  <Button 
                    variant="outline" 
                    className="group border-2 border-electric-purple text-electric-purple hover:bg-electric-purple hover:text-white transition-all duration-200 mx-auto"
                  >
                    <span className="group-hover:translate-x-1 transition-transform duration-200">
                      Read Articles
                    </span>
                    <ArrowRight className="w-4 h-4 ml-2 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-200" />
                  </Button>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div 
              whileHover={{ y: -5 }}
              transition={{ duration: 0.2 }}
            >
              <Card className="h-full bg-card/80 dark:bg-card/90 backdrop-blur-sm border border-border/30 dark:border-border/50 hover:shadow-lg transition-all duration-300">
                <CardContent className="p-8 text-center h-full flex flex-col">
                  <div className="bg-gradient-to-r from-neon-blue/10 to-electric-purple/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                    <HelpCircle className="w-8 h-8 text-neon-blue" />
                  </div>
                  <h3 className="text-xl font-semibold text-foreground dark:text-foreground/95 mb-3 font-inter">Help Center</h3>
                  <p className="text-foreground/90 dark:text-foreground/80 mb-6 flex-grow">
                    Step-by-step guides, tutorials, and answers to frequently asked questions.
                  </p>
                  <Button 
                    variant="outline" 
                    className="group border-2 border-neon-blue text-neon-blue hover:bg-neon-blue hover:text-white transition-all duration-200 mx-auto"
                  >
                    <span className="group-hover:translate-x-1 transition-transform duration-200">
                      Get Help
                    </span>
                    <ArrowRight className="w-4 h-4 ml-2 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-200" />
                  </Button>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div 
              whileHover={{ y: -5 }}
              transition={{ duration: 0.2 }}
            >
              <Card className="h-full bg-card/80 dark:bg-card/90 backdrop-blur-sm border border-border/30 dark:border-border/50 hover:shadow-lg transition-all duration-300">
                <CardContent className="p-8 text-center h-full flex flex-col">
                  <div className="bg-gradient-to-r from-purple-500/10 to-pink-500/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                    <MessageCircle className="w-8 h-8 text-purple-500" />
                  </div>
                  <h3 className="text-xl font-semibold text-foreground dark:text-foreground/95 mb-3 font-inter">Customer Support</h3>
                  <p className="text-foreground/90 dark:text-foreground/80 mb-6 flex-grow">
                    Need personalized help? Our support team is ready to assist you.
                  </p>
                  <Link to="/support">
                    <Button 
                      variant="outline" 
                      className="group border-2 border-purple-500 text-purple-500 hover:bg-purple-500 hover:text-white transition-all duration-200 mx-auto"
                    >
                      <span className="group-hover:translate-x-1 transition-transform duration-200">
                        Contact Support
                      </span>
                      <ArrowRight className="w-4 h-4 ml-2 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-200" />
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Blog Section */}
      <section className="py-24 relative">
        <div className="absolute inset-0 bg-gradient-to-br from-electric-purple/5 via-transparent to-neon-blue/5" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <motion.div 
            className="text-center mb-16"
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
                Latest Articles
              </Badge>
            </motion.div>
            <motion.h2 
              className="text-3xl md:text-4xl font-bold text-foreground mb-4 font-space"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              Latest from Our Blog
            </motion.h2>
            <motion.p 
              className="text-xl text-foreground/90 dark:text-foreground/80 max-w-2xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              Stay up-to-date with the latest career advice and industry insights
            </motion.p>
          </motion.div>

          <Blog/>

          <motion.div 
            className="text-center mt-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <Button 
              size="lg" 
              className="group bg-gradient-to-r from-electric-purple to-neon-blue text-white hover:shadow-lg hover:shadow-electric-purple/25 transition-all duration-200"
            >
              <span className="group-hover:translate-x-1 transition-transform duration-200">
                View All Articles
              </span>
              <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform duration-200" />
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Help Topics */}
      <section className="py-24 bg-background relative">
        <div className="absolute inset-0 bg-grid-light dark:bg-grid-dark opacity-20 dark:opacity-10" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <motion.div 
            className="text-center mb-16"
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
                Help Center
              </Badge>
            </motion.div>
            <motion.h2 
              className="text-3xl md:text-4xl font-bold text-foreground mb-4 font-space"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              Help Center Topics
            </motion.h2>
            <motion.p 
              className="text-xl text-foreground/90 dark:text-foreground/80 max-w-2xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              Find answers to your questions organized by topic
            </motion.p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {helpTopics.map((topic, index) => (
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
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center">
                        <div className={`w-12 h-12 bg-gradient-to-br from-electric-purple to-neon-blue rounded-lg flex items-center justify-center mr-4 group-hover:scale-110 transition-transform duration-200`}>
                          {React.cloneElement(topic.icon, { className: 'text-white text-xl w-6 h-6' })}
                        </div>
                        <div>
                          <h3 className="text-xl font-space font-semibold text-foreground mb-1">{topic.title}</h3>
                          <div className="flex items-center gap-1">
                            <div className="w-2 h-2 bg-electric-green rounded-full animate-pulse" />
                            <span className="text-xs text-foreground/80 dark:text-foreground/90">{topic.articles} articles</span>
                          </div>
                        </div>
                      </div>
                      <motion.div 
                        className="text-electric-purple"
                        whileHover={{ rotate: 90 }}
                        transition={{ duration: 0.2 }}
                      >
                        →
                      </motion.div>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p className="text-foreground/80 dark:text-foreground/90 font-inter text-sm leading-relaxed">
                      {topic.description}
                    </p>
                    
                    {/* Progress Indicator */}
                    <div className="space-y-2">
                      <div className="flex justify-between text-xs text-foreground/80 dark:text-foreground/90">
                        <span>Completed</span>
                        <span>{Math.min(100, Math.floor((index + 1) / helpTopics.length * 100))}%</span>
                      </div>
                      <div className="w-full bg-muted rounded-full h-1.5">
                        <motion.div
                          className="h-1.5 rounded-full bg-gradient-to-r from-electric-purple to-neon-blue"
                          initial={{ width: 0 }}
                          whileInView={{ width: `${Math.min(100, Math.floor((index + 1) / helpTopics.length * 100))}%` }}
                          transition={{ duration: 1, delay: index * 0.1 }}
                          viewport={{ once: true }}
                        />
                      </div>
                    </div>

                    {/* Feature Benefits */}
                    <div className="pt-2 border-t border-electric-purple/10">
                      <div className="grid grid-cols-2 gap-2 text-xs">
                        <div className="flex items-center gap-1">
                          <div className="w-1 h-1 bg-electric-green rounded-full" />
                          <span className="text-foreground/80 dark:text-foreground/90">Step-by-step</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <div className="w-1 h-1 bg-neon-blue rounded-full" />
                          <span className="text-foreground/80 dark:text-foreground/90">Expert tips</span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Video Tutorials */}
      <section className="py-24 relative bg-gradient-to-br from-electric-purple/5 via-transparent to-neon-blue/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <motion.div 
                className="inline-block mb-4"
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.3 }}
              >
                <Badge className="bg-gradient-to-r from-electric-purple to-neon-blue text-white border-0">
                  Video Guides
                </Badge>
              </motion.div>
              <h2 className="text-3xl md:text-4xl font-bold text-foreground dark:text-foreground/95 mb-6 font-space">
                Video Tutorials
              </h2>
              <p className="text-lg text-foreground/90 dark:text-foreground/80 mb-8">
                Watch step-by-step video guides to master PostPilot's features and maximize your LinkedIn presence.
              </p>
              <ul className="space-y-3 mb-8">
                {[
                  'Getting Started with PostPilot (5 min)',
                  'Creating Your First LinkedIn Post (8 min)',
                  'Resume Enhancement Tutorial (12 min)',
                  'Advanced Job Matching Tips (10 min)'
                ].map((item, i) => (
                  <motion.li 
                    key={i}
                    className="flex items-center space-x-2"
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: 0.4 + i * 0.1 }}
                  >
                    <Video className="w-5 h-5 text-electric-purple" />
                    <span className="text-foreground/90 dark:text-foreground/90">{item}</span>
                  </motion.li>
                ))}
              </ul>
              <motion.div
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Button 
                  size="lg" 
                  className="group bg-gradient-to-r from-electric-purple to-neon-blue text-white hover:shadow-lg hover:shadow-electric-purple/25 transition-all duration-200"
                >
                  <span className="group-hover:translate-x-1 transition-transform duration-200">
                    Watch Tutorials
                  </span>
                  <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform duration-200" />
                </Button>
              </motion.div>
            </motion.div>
            
            <motion.div 
              className="relative"
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <Card className="bg-white/90 dark:bg-card/90 backdrop-blur-sm border border-border/50 dark:border-border/50 shadow-2xl overflow-hidden">
                <CardContent className="p-0">
                  <div className="aspect-video bg-gradient-to-br from-electric-purple/20 to-neon-blue/20 dark:from-electric-purple/10 dark:to-neon-blue/10 flex items-center justify-center">
                    <div className="text-center p-8">
                      <div className="bg-white/90 dark:bg-background/80 backdrop-blur-sm w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg border border-border/30 dark:border-border/20">
                        <Video className="w-10 h-10 text-electric-purple" />
                      </div>
                      <h3 className="text-xl font-semibold text-gray-900 dark:text-foreground/95 mb-2 font-inter">
                        PostPilot Masterclass
                      </h3>
                      <p className="text-gray-700 dark:text-foreground/80">45 minutes of expert tips</p>
                    </div>
                  </div>
                  <div className="p-6">
                    <Button className="w-full group bg-gradient-to-r from-electric-purple to-neon-blue text-white hover:shadow-lg hover:shadow-electric-purple/25 transition-all duration-200">
                      <span className="group-hover:translate-x-1 transition-transform duration-200">
                        Play Video
                      </span>
                      <ArrowRight className="w-5 h-5 ml-2 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-200" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Newsletter Signup */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-electric-purple to-neon-blue" />
        <div className="absolute inset-0 bg-grid-white/[0.05]" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <motion.h2 
              className="text-3xl md:text-5xl font-bold text-white mb-6 font-space"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              Stay Informed
            </motion.h2>
            <motion.p 
              className="text-xl text-white/90 mb-10 max-w-2xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              Get the latest career tips, product updates, and industry insights delivered to your inbox.
            </motion.p>
            <motion.div 
              className="max-w-md mx-auto flex flex-col sm:flex-row gap-4"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-6 py-4 rounded-xl border-2 border-white/20 bg-white/10 text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-white/30 focus:border-white/30 backdrop-blur-sm transition-all duration-200"
              />
              <motion.div
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
                className="w-full sm:w-auto"
              >
                <Button 
                  size="lg" 
                  className="w-full h-full bg-white text-electric-purple hover:bg-gray-100 px-8 py-4 text-lg font-medium shadow-lg hover:shadow-xl transition-all duration-200"
                >
                  <span className="group-hover:translate-x-1 transition-transform duration-200">
                    Subscribe
                  </span>
                  <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform duration-200" />
                </Button>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </section>
        </main>
      </motion.div>
    </AnimatePresence>
  );
};

export default ResourcesPage;
