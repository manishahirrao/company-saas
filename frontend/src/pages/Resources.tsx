
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ArrowRight, BookOpen, HelpCircle, MessageCircle, Video, FileText, Users, Clock } from 'lucide-react';
import Navbar from '@/components/Layout/Navbar';
import Footer from '@/components/Layout/Footer';
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
      articles: 6,
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-purple-50">
      <Navbar />
      {/* Hero Section */}
      <section className="relative py-24 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-50 via-white to-pink-50 opacity-60"></div>
        <div className="absolute top-20 left-10 w-72 h-72 bg-gradient-to-r from-purple-200 to-pink-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-72 h-72 bg-gradient-to-r from-blue-200 to-purple-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-pulse"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="space-y-8">
            <div className="space-y-4">
              <Badge className="bg-gradient-to-r from-purple-100 to-pink-100 text-purple-800 border-0 px-4 py-2 text-sm font-medium">
                <BookOpen className="inline w-4 h-4 mr-2 text-purple-400" />
                Professional Resources
              </Badge>
              <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-gray-900 via-purple-900 to-pink-900 bg-clip-text text-transparent leading-tight">
                Master Your Career with Expert Resources
              </h1>
              <p className="text-xl text-gray-600 leading-relaxed max-w-2xl mx-auto">
                Curated guides, tutorials, and insights to help you grow professionally and master LinkedIn with AI-powered tools.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Blog Posts */}
      <section className="py-24 bg-gradient-to-br from-slate-50 via-white to-purple-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <Badge className="bg-gradient-to-r from-purple-100 to-pink-100 text-purple-800 border-0 px-4 py-2 text-sm font-medium">
              <BookOpen className="inline w-4 h-4 mr-2 text-purple-400" />
              Latest Insights
            </Badge>
            <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-gray-900 via-purple-900 to-pink-900 bg-clip-text text-transparent leading-tight mb-4">
              Expert Blog Posts
            </h2>
            <p className="text-xl text-gray-600 leading-relaxed max-w-2xl mx-auto">
              Discover our latest articles on LinkedIn strategy, AI-powered tools, and career growth.
            </p>
          </div>

          <div className="grid gap-8 md:gap-10 md:grid-cols-2 lg:grid-cols-3">
            {blogPosts.map((post, i) => (
              <Card key={i} className="bg-white rounded-xl shadow-lg transition-all hover:-translate-y-1 hover:shadow-xl">
                <CardHeader className="pb-2">
                  <Badge className="mb-2 bg-gradient-to-r from-purple-100 to-pink-100 text-purple-800 border-0">
                    {post.category}
                  </Badge>
                  <CardTitle className="text-2xl font-semibold text-gray-900 mb-1">
                    {post.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 mb-4 min-h-[60px]">{post.excerpt}</p>
                  <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                    <span className="flex items-center">
                      <Users className="w-4 h-4 mr-1 text-gray-400" />
                      {post.author}
                    </span>
                    <span className="flex items-center">
                      <Clock className="w-4 h-4 mr-1 text-gray-400" />
                      {post.date}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-purple-600 font-semibold bg-purple-50 rounded-full px-3 py-1">
                      {post.readTime}
                    </span>
                    <Link to="/blog" className="flex items-center text-purple-600 hover:text-purple-700 transition-colors">
                      Read More
                      <ArrowRight className="w-4 h-4 ml-1" />
                    </Link>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Quick Access */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="hover:shadow-lg transition-shadow">
              <CardContent className="p-8 text-center">
                <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <BookOpen className="w-8 h-8 text-blue-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Blog</h3>
                <p className="text-gray-600 mb-4">
                  Expert insights, tips, and strategies for career growth and LinkedIn success.
                </p>
                <Button variant="outline">
                  Read Articles
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardContent className="p-8 text-center">
                <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <HelpCircle className="w-8 h-8 text-green-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Help Center</h3>
                <p className="text-gray-600 mb-4">
                  Step-by-step guides, tutorials, and answers to frequently asked questions.
                </p>
                <Button variant="outline">
                  Get Help
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardContent className="p-8 text-center">
                <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <MessageCircle className="w-8 h-8 text-purple-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Customer Support</h3>
                <p className="text-gray-600 mb-4">
                  Need personalized help? Our support team is ready to assist you.
                </p>
                <Link to="/support">
                  <Button variant="outline">
                    Contact Support
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Blog Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Latest from Our Blog
            </h2>
            <p className="text-xl text-gray-600">
              Stay up-to-date with the latest career advice and industry insights
            </p>
          </div>

          <Blog />

          <div className="text-center mt-12">
            <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white">
              View All Articles
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
          </div>
        </div>
      </section>

      {/* Help Topics */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Help Center Topics
            </h2>
            <p className="text-xl text-gray-600">
              Find answers to your questions organized by topic
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {helpTopics.map((topic, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow cursor-pointer">
                <CardContent className="p-6 text-center">
                  <div className="mb-4">{topic.icon}</div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">{topic.title}</h3>
                  <p className="text-gray-600 text-sm mb-3">{topic.description}</p>
                  <p className="text-sm text-blue-600 font-medium">{topic.articles} articles</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Video Tutorials */}
      <section className="py-24 bg-gradient-to-br from-blue-50 via-white to-purple-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-8">
              <Badge className="bg-gradient-to-r from-blue-100 to-purple-100 text-blue-800 border-0 px-4 py-2 text-sm font-medium">
                <Video className="w-4 h-4 mr-2 text-blue-400" />
                Video Guides
              </Badge>
              <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-gray-900 via-blue-900 to-purple-900 bg-clip-text text-transparent leading-tight">
                Expert Video Tutorials
              </h2>
              <p className="text-xl text-gray-600 max-w-2xl">
                Master PostPilot's features with our step-by-step video guides designed to help you grow your LinkedIn presence.
              </p>
              <div className="space-y-4">
                {[
                  { icon: <Video className="w-6 h-6 text-blue-600" />,
                    title: 'Getting Started with PostPilot',
                    duration: '5 min',
                    description: 'Learn the basics of using PostPilot for LinkedIn automation'
                  },
                  { icon: <Video className="w-6 h-6 text-blue-600" />,
                    title: 'Creating Your First LinkedIn Post',
                    duration: '8 min',
                    description: 'Step-by-step guide to crafting engaging LinkedIn content'
                  },
                  { icon: <Video className="w-6 h-6 text-blue-600" />,
                    title: 'Resume Enhancement Tutorial',
                    duration: '12 min',
                    description: 'Advanced techniques for optimizing your LinkedIn profile'
                  },
                  { icon: <Video className="w-6 h-6 text-blue-600" />,
                    title: 'Advanced Job Matching Tips',
                    duration: '10 min',
                    description: 'Maximize your job search effectiveness with PostPilot'
                  }
                ].map((item, i) => (
                  <div key={i} className="flex items-center space-x-4 p-4 bg-white rounded-lg shadow-sm">
                    <div className="p-3 bg-blue-50 rounded-lg">
                      {item.icon}
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-900">{item.title}</h3>
                      <p className="text-gray-600">{item.description}</p>
                      <span className="mt-2 text-sm text-blue-600">{item.duration}</span>
                    </div>
                  </div>
                ))}
              </div>
              <Button size="lg" className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-4 rounded-xl font-semibold shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-200">
                Watch All Tutorials
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </div>
            
            <div className="relative">
              <Card className="bg-white shadow-2xl">
                <CardContent className="p-0">
                  <div className="aspect-video rounded-t-lg overflow-hidden">
                    <div className="relative">
                      <div className="absolute inset-0 bg-gradient-to-br from-blue-100 to-purple-100 opacity-70"></div>
                      <div className="absolute inset-0 bg-black/30"></div>
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="bg-white w-20 h-20 rounded-full flex items-center justify-center shadow-lg">
                          <Video className="w-10 h-10 text-blue-600" />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="p-6">
                    <h3 className="text-2xl font-semibold text-gray-900 mb-2">PostPilot Masterclass</h3>
                    <p className="text-gray-600 mb-4">45 minutes of expert tips and strategies</p>
                    <Button className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white">
                      Watch Masterclass
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter Signup */}
      <section className="py-24 bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="space-y-8">
            <div className="space-y-4">
              <Badge className="bg-gradient-to-r from-white/20 to-white/10 text-white border-0 px-4 py-2 text-sm font-medium">
                <MessageCircle className="inline w-4 h-4 mr-2 text-white/90" />
                Stay Updated
              </Badge>
              <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent leading-tight">
                Join Our Community
              </h2>
              <p className="text-xl text-white/90 max-w-2xl mx-auto">
                Get the latest career tips, product updates, and industry insights delivered straight to your inbox.
              </p>
            </div>
            
            <div className="max-w-md mx-auto">
              <div className="relative">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="w-full px-6 py-4 rounded-lg border border-white/20 bg-white/5 text-white/70 placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-white/30 transition-all duration-200"
                />
                <Button asChild className="absolute right-0 top-0 bottom-0 bg-white text-blue-600 hover:bg-gray-100 px-8 rounded-r-lg">
                  <Link to="/subscribe">
                    Subscribe
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default ResourcesPage;
