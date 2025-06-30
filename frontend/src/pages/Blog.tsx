
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Calendar, Clock, ArrowRight } from 'lucide-react';


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
    <div className="min-h-screen bg-white">
      
      {/* Articles Grid */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogArticles.map((article) => (
              <article key={article.id} className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden">
                <img 
                  src={article.image} 
                  alt={article.title}
                  className="w-full h-48 object-cover"
                />
                <div className="p-6">
                  <div className="flex items-center gap-4 text-sm text-gray-500 mb-3">
                    <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs font-medium">
                      {article.category}
                    </span>
                    <div className="flex items-center gap-1">
                      <Calendar className="h-4 w-4" />
                      {article.date}
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="h-4 w-4" />
                      {article.readTime}
                    </div>
                  </div>
                  
                  <h2 className="text-xl font-semibold text-gray-900 mb-3 line-clamp-2">
                    {article.title}
                  </h2>
                  
                  <p className="text-gray-600 mb-4 line-clamp-3">
                    {article.excerpt}
                  </p>
                  
                  <Link to={`/blog/${article.id}`} className="block w-full">
                    <Button variant="outline" className="w-full group">
                      Read Article
                      <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                    </Button>
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

     
    </div>
  );
};

export default Blog;