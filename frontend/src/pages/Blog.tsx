
import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Calendar, Clock, ArrowRight, BookOpen } from 'lucide-react';


const blogArticles = [
  {
    id: 'linkedin-automation-boost-engagement',
    title: 'Boost Your LinkedIn Engagement with Automated Post Creation',
    excerpt: 'Maintaining a consistent LinkedIn presence can be challenging for busy professionals. Our LinkedIn automation tool uses GPT-powered content generation to create and schedule posts.',
    readTime: '5 min read',
    date: 'Dec 15, 2024',
    category: 'LinkedIn Automation',
    image: '/Blog1.jpeg'
  },
  {
    id: 'ai-resume-builder-stand-out',
    title: 'AI Resume Builder: Stand Out to Recruiters with a Polished AI-Enhanced Resume',
    excerpt: 'In a competitive job market, a well-crafted resume is crucial. An AI resume builder can transform your CV by correcting spelling/grammar and highlighting key skills.',
    readTime: '4 min read',
    date: 'Dec 19, 2024',
    category: 'AI Tools',
    image: '/Blog2.jpeg'
  },
  {
    id: 'job-description-matching-ai',
    title: 'Match the Right Candidates: How AI Improves Job Description Matching',
    excerpt: 'Traditional recruitment often results in mismatches. AI-powered job matching tools solve this by cross-referencing job descriptions with candidate profiles.',
    readTime: '6 min read',
    date: 'Dec 23, 2024',
    category: 'Recruitment',
    image: '/Blog3.jpeg'
  },
  {
    id: 'gpt-powered-content-analytics',
    title: 'Revolutionize Your Hiring with GPT-Powered Content and Analytics',
    excerpt: 'Our platform uses GPT content generation to automatically draft engaging LinkedIn posts, job descriptions, and ads while providing actionable insights.',
    readTime: '5 min read',
    date: 'Dec 28, 2024',
    category: 'AI Tools',
    image: '/Blog4.jpeg'
  },
  {
    id: 'career-growth-tools-2025',
    title: 'Top 10 Career Growth Tools for 2025: AI and Automation You Need',
    excerpt: 'Staying competitive in 2025 means leveraging AI tools designed for career advancement. Here are ten must-have tools for professionals.',
    readTime: '7 min read',
    date: 'Jan 1, 2025',
    category: 'Career Growth',
    image: '/Blog5.jpeg'
  },
  {
    id: 'automated-job-posting-outsourcing',
    title: 'Streamline Hiring with Automated Job Posting and Outsourcing Solutions',
    excerpt: 'Automated job posting platforms let companies advertise positions across multiple free job boards with one click, reaching a wide pool of candidates.',
    readTime: '5 min read',
    date: 'Jan 10, 2025',
    category: 'Recruitment',
    image: '/Blog6.jpeg'
  },
  {
    id: 'linkedin-video-content-automation',
    title: 'Maximizing LinkedIn with Automated Video Content Creation',
    excerpt: 'Video content is dominating LinkedIn feeds. Statistics show that video posts on LinkedIn drive 5× higher interaction rates than text posts.',
    readTime: '4 min read',
    date: 'Jan 19, 2025',
    category: 'LinkedIn Automation',
    image: '/Blog7.jpeg'
  },
  {
    id: 'hiring-teams-linkedin-automation',
    title: 'Why Hiring Teams Are Embracing LinkedIn Automation and AI Chatbots',
    excerpt: 'Recruiters and hiring managers are turning to AI tools to gain a competitive edge. LinkedIn automation allows teams to connect with hundreds of prospects.',
    readTime: '5 min read',
    date: 'Jan 23, 2025',
    category: 'Recruitment',
    image: '/Blog8.jpeg'
  },
  {
    id: 'future-job-search-ai-tools',
    title: 'The Future of Job Search: AI Tools for Resumes, Profiles, and Applications',
    excerpt: 'Job seekers can leverage AI at every step of their search. Research shows that AI-assisted resume writing can yield 7.8% more job offers.',
    readTime: '6 min read',
    date: 'Jan 27, 2025',
    category: 'Career Growth',
    image: '/Blog9.jpeg'
  },
  {
    id: 'ai-chatbots-recruitment-support',
    title: 'How AI-Powered Chatbots Enhance Recruitment and Customer Support',
    excerpt: 'AI chatbots are revolutionizing support for both candidates and clients. Companies can offer 24/7 assistance to job applicants instantly.',
    readTime: '5 min read',
    date: 'Feb 2, 2025',
    category: 'AI Tools',
    image: '/Blog10.jpeg'
  },
  {
    id: 'linkedin-profile-optimization-ai',
    title: 'Optimizing Your LinkedIn Profile with AI for Better Career Outcomes',
    excerpt: 'In today\'s job market, a strong LinkedIn profile is essential. AI can help you optimize every section with keyword suggestions and improvements.',
    readTime: '4 min read',
    date: 'Feb 5, 2025',
    category: 'LinkedIn Automation',
    image: '/Blog11.jpeg'
  },
  {
    id: 'hiring-automation-best-practices',
    title: 'Implementing Hiring Automation: Best Practices for HR Teams',
    excerpt: 'Hiring automation can greatly boost efficiency, but it must be done responsibly. Follow these best practices for successful implementation.',
    readTime: '6 min read',
    date: 'Feb 9, 2025',
    category: 'Recruitment',
    image: '/Blog12.jpeg'
  },
  {
    id: 'free-job-posting-strategies',
    title: 'Increase Your Reach: Free Job Posting Strategies for Companies',
    excerpt: 'Posting jobs online doesn\'t have to break the bank. Free job portals and social platforms can connect you with great candidates.',
    readTime: '4 min read',
    date: 'Feb 13, 2025',
    category: 'Recruitment',
    image: '/Blog13.jpeg'
  },
  {
    id: 'recruitment-outsourcing-benefits',
    title: 'Supercharge Recruitment: The Benefits of Hiring Outsourcing Services',
    excerpt: 'Outsourcing recruitment (RPO) lets companies tap into expert recruiting teams and tools. Key benefits include scalability and cost savings.',
    readTime: '5 min read',
    date: 'Feb 17, 2025',
    category: 'Recruitment',
    image: '/Blog14.jpeg'
  },
  {
    id: 'gpt-content-creation-linkedin',
    title: 'Content Creation with GPT: Crafting LinkedIn Posts that Convert',
    excerpt: 'Writing posts that drive action is easy with AI. Using GPT content generation, you can brainstorm headlines and outlines in seconds.',
    readTime: '4 min read',
    date: 'Feb 21, 2025',
    category: 'LinkedIn Automation',
    image: '/Blog15.jpeg'
  },
  {
    id: 'ai-career-development-analytics',
    title: 'Leveraging AI for Personalized Career Development and Analytics',
    excerpt: 'Modern career growth tools use AI to give employees tailored insights. AI platforms can map out personalized development plans.',
    readTime: '6 min read',
    date: 'Feb 28, 2025',
    category: 'Career Growth',
    image: '/Blog16.jpeg'
  },
  {
    id: 'linkedin-automation-networking',
    title: '10 Ways LinkedIn Automation Can Grow Your Professional Network',
    excerpt: 'Leveraging automation can supercharge your LinkedIn networking. Here are ten strategies to exponentially grow your LinkedIn network.',
    readTime: '7 min read',
    date: 'March 2, 2025',
    category: 'LinkedIn Automation',
    image: '/Blog17.jpeg'
  },
  {
    id: 'hiring-automation-trends-2025',
    title: 'Hiring Automation Trends 2025: What HR Professionals Need to Know',
    excerpt: 'As AI continues to reshape HR, several key trends are emerging. Automation in recruiting is becoming the norm across industries.',
    readTime: '8 min read',
    date: 'March 8, 2025',
    category: 'Recruitment',
    image: '/Blog18.jpeg'
  }
];

const Blog = () => {
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
          <section className="pt-20 pb-16 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
            <div className="max-w-7xl mx-auto text-center relative z-10">
              <motion.div 
                className="inline-block mb-4"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <Badge className="bg-gradient-to-r from-electric-purple to-neon-blue text-white border-0">
                  Insights & Updates
                </Badge>
              </motion.div>
              
              <motion.h1 
                className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-foreground to-foreground/80 mb-6 font-space"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
              >
                Blog & Resources
              </motion.h1>
              
              <motion.p 
                className="text-xl text-foreground/80 dark:text-foreground/80 max-w-3xl mx-auto mb-8"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
              >
                Discover the latest insights, tips, and strategies to enhance your career and professional growth.
              </motion.p>
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.5 }}
                className="flex flex-wrap justify-center gap-4"
              >
                <Button variant="outline" className="group">
                  <BookOpen className="w-4 h-4 mr-2" />
                  View All Categories
                  <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </Button>
              </motion.div>
            </div>
          </section>

          {/* Articles Grid */}
          <section className="py-16 relative">
            <div className="absolute inset-0 bg-gradient-to-br from-electric-purple/5 via-transparent to-neon-blue/5" />
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {blogArticles.map((article, index) => (
                  <motion.article 
                    key={article.id} 
                    className="group"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    whileHover={{ y: -5 }}
                  >
                    <div className="h-full bg-card/80 dark:bg-card/90 backdrop-blur-sm rounded-2xl overflow-hidden border border-border/30 dark:border-border/50 hover:shadow-xl transition-all duration-300 flex flex-col">
                      <div className="relative overflow-hidden aspect-video">
                        <img 
                          src={article.image} 
                          alt={article.title}
                          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
                          <span className="bg-gradient-to-r from-electric-purple to-neon-blue text-white px-3 py-1 rounded-full text-xs font-medium">
                            {article.category}
                          </span>
                        </div>
                      </div>
                      
                      <div className="p-6 flex-1 flex flex-col">
                        <div className="flex items-center gap-3 text-sm text-foreground/70 dark:text-foreground/70 mb-4">
                          <div className="flex items-center gap-1">
                            <Calendar className="h-4 w-4" />
                            {article.date}
                          </div>
                          <span>•</span>
                          <div className="flex items-center gap-1">
                            <Clock className="h-4 w-4" />
                            {article.readTime}
                          </div>
                        </div>
                        
                        <h2 className="text-xl font-semibold text-foreground dark:text-foreground/95 mb-3 line-clamp-2 font-inter">
                          {article.title}
                        </h2>
                        
                        <p className="text-foreground/80 dark:text-foreground/80 mb-6 line-clamp-3 flex-grow">
                          {article.excerpt}
                        </p>
                        
                        <div className="mt-auto">
                          <Link to={`/blog/${article.id}`} className="block w-full">
                            <Button 
                              variant="outline" 
                              className="w-full group border-border/30 bg-transparent hover:bg-background/50"
                            >
                              <span className="group-hover:translate-x-1 transition-transform duration-200">
                                Read Article
                              </span>
                              <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform duration-200" />
                            </Button>
                          </Link>
                        </div>
                      </div>
                    </div>
                  </motion.article>
                ))}
              </div>
              
              <motion.div 
                className="text-center mt-16"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <Button 
                  size="lg" 
                  className="group bg-gradient-to-r from-electric-purple to-neon-blue text-white hover:shadow-lg hover:shadow-electric-purple/25 transition-all duration-200"
                >
                  <span className="group-hover:translate-x-1 transition-transform duration-200">
                    Load More Articles
                  </span>
                  <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform duration-200" />
                </Button>
              </motion.div>
            </div>
          </section>
          
          {/* Newsletter Section */}
          <section className="py-20 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-electric-purple to-neon-blue" />
            <div className="absolute inset-0 bg-grid-white/[0.05]" />
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10 py-16">
              <motion.h2 
                className="text-3xl md:text-4xl font-bold text-white mb-6 font-space"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                Stay Updated with Our Latest Articles
              </motion.h2>
              <motion.p 
                className="text-xl text-white/90 mb-10"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.1 }}
              >
                Subscribe to our newsletter to receive the latest career tips and industry insights.
              </motion.p>
              <motion.div 
                className="max-w-md mx-auto flex flex-col sm:flex-row gap-4"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="flex-1 px-6 py-4 rounded-xl border-2 border-white/20 bg-white/10 text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-white/30 focus:border-white/30 backdrop-blur-sm transition-all duration-200"
                />
                <Button 
                  size="lg" 
                  className="bg-white text-electric-purple hover:bg-gray-100 px-8 py-4 text-lg font-medium shadow-lg hover:shadow-xl transition-all duration-200"
                >
                  Subscribe
                </Button>
              </motion.div>
            </div>
          </section>
        </main>
      </motion.div>
    </AnimatePresence>
  );
};

export default Blog;