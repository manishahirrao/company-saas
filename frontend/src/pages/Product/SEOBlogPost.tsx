import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { 
  Search, 
  Clock, 
  Eye,
  Tag,
  ChevronRight,
  Filter,
  ChevronDown,
  Target,
  Zap,
  BarChart3,
  User,
  TrendingUp,
  Globe
} from 'lucide-react';
import Navbar from '@/components/Layout/Navbar';
import Footer from '@/components/Layout/Footer';

interface BlogPost {
  id: number;
  title: string;
  excerpt: string;
  category: string;
  type: string;
  author: string;
  date: string;
  readTime: string;
  views: string;
  image: string;
  tags: string[];
  featured?: boolean;
}

const SEOBlogPage: React.FC = () => {
  // State management
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedType, setSelectedType] = useState('All');
  const [isLoading, setIsLoading] = useState(true);
  const [featuredPost, setFeaturedPost] = useState<BlogPost | null>(null);
  const [regularPosts, setRegularPosts] = useState<BlogPost[]>([]);
  const [availableCategories, setAvailableCategories] = useState<string[]>([]);
  const [availablePostTypes, setAvailablePostTypes] = useState<string[]>([]);
  
  // Sample blog post data
  const blogPostsData: BlogPost[] = [
    {
      id: 1,
      title: 'The Complete Guide to LinkedIn Content Strategy in 2025',
      excerpt: 'Master the art of LinkedIn content creation with AI-powered insights and proven strategies that drive engagement and career growth.',
      category: 'LinkedIn Strategy',
      type: 'How-to Guide',
      author: 'Harsh Singh Rajput',
      date: '2025-06-20',
      readTime: '8 min read',
      views: '2.4k',
      image: 'https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=800&h=400&fit=crop',
      tags: ['LinkedIn', 'Content Strategy', 'AI', 'Social Media'],
      featured: true
    },
    {
      id: 2,
      title: '10 AI Tools Every Content Creator Should Know About',
      excerpt: 'Discover the most powerful AI tools that are revolutionizing content creation and helping professionals build stronger personal brands.',
      category: 'AI Tools',
      type: 'List Article',
      author: 'Manish Ahirrao',
      date: '2025-06-18',
      readTime: '6 min read',
      views: '1.8k',
      image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&h=400&fit=crop',
      tags: ['AI Tools', 'Content Creation', 'Productivity'],
      featured: false
    },
    {
      id: 3,
      title: 'Case Study: How PostPilot Increased Engagement by 300%',
      excerpt: 'Real results from enterprise clients who transformed their social media strategy using PostPilot\'s AI-powered platform.',
      category: 'Case Studies',
      type: 'Case Study',
      author: 'PostPilot Team',
      date: '2025-06-15',
      readTime: '12 min read',
      views: '3.2k',
      image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=400&fit=crop',
      tags: ['Case Study', 'Results', 'Enterprise', 'ROI'],
      featured: true
    },
    {
      id: 4,
      title: 'The Future of Personal Branding: AI-Driven Insights',
      excerpt: 'Explore how artificial intelligence is reshaping personal branding strategies and what it means for your career.',
      category: 'Personal Branding',
      type: 'Opinion/Editorial',
      author: 'Harsh Singh Rajput',
      date: '2025-06-12',
      readTime: '5 min read',
      views: '1.5k',
      image: 'https://images.unsplash.com/photo-1559136555-9303baea8ebd?w=800&h=400&fit=crop',
      tags: ['Personal Branding', 'AI', 'Future Trends'],
      featured: false
    },
    {
      id: 5,
      title: 'SEO Best Practices for Social Media Content',
      excerpt: 'Learn how to optimize your social media content for search engines and increase your online visibility.',
      category: 'SEO',
      type: 'Tutorial',
      author: 'Manish Ahirrao',
      date: '2025-06-10',
      readTime: '7 min read',
      views: '2.1k',
      image: 'https://images.unsplash.com/photo-1432888622747-4eb9a8efeb07?w=800&h=400&fit=crop',
      tags: ['SEO', 'Social Media', 'Content Optimization'],
      featured: false
    },
    {
      id: 6,
      title: 'Building Authentic Connections in the Digital Age',
      excerpt: 'Discover strategies for creating meaningful professional relationships through authentic social media engagement.',
      category: 'Networking',
      type: 'Blog Post',
      author: 'PostPilot Team',
      date: '2025-06-08',
      readTime: '6 min read',
      views: '1.9k',
      image: 'https://images.unsplash.com/photo-1521737711867-e3b97375f902?w=800&h=400&fit=crop',
      tags: ['Networking', 'Relationships', 'Authenticity'],
      featured: false
    }
  ];

  // Initialize data
  useEffect(() => {
    const timer = setTimeout(() => {
      // Set featured post
      const featured = blogPostsData.find(post => post.featured) || null;
      setFeaturedPost(featured);
      
      // Set regular posts (non-featured)
      const regular = blogPostsData.filter(post => !post.featured);
      setRegularPosts(regular);
      
      // Extract unique categories and types
      const categories = ['All', ...new Set(blogPostsData.map(post => post.category))];
      const types = ['All', ...new Set(blogPostsData.map(post => post.type))];
      
      setAvailableCategories(categories);
      setAvailablePostTypes(types);
      setIsLoading(false);
    }, 1000);
    
    // Set document title
    document.title = 'AI-Powered Blog - VORTEX';
    
    return () => clearTimeout(timer);
  }, []);

  // Filter posts based on search term, category, and type
  const filteredPosts = useMemo(() => {
    return blogPostsData.filter(post => {
      const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         post.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         post.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
      
      const matchesCategory = selectedCategory === 'All' || post.category === selectedCategory;
      const matchesType = selectedType === 'All' || post.type === selectedType;
      
      return matchesSearch && matchesCategory && matchesType;
    });
  }, [searchTerm, selectedCategory, selectedType, blogPostsData]);

  const categoryIcons = {
    'LinkedIn Strategy': <Target className="w-5 h-5" />,
    'AI Tools': <Zap className="w-5 h-5" />,
    'Case Studies': <BarChart3 className="w-5 h-5" />,
    'Personal Branding': <User className="w-5 h-5" />,
    'SEO': <TrendingUp className="w-5 h-5" />,
    'Networking': <Globe className="w-5 h-5" />
  };

  return (
    <div className="min-h-screen pt-16">
      <Navbar />
      
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-blue-50 via-white to-purple-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <Badge className="mb-4 bg-blue-100 text-blue-800">
              PostPilot Blog
            </Badge>
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
              Master Your Digital
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
                {" "}Presence
              </span>
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
              Expert insights, proven strategies, and actionable tips to help you build a powerful personal brand and advance your career through smart social media.
            </p>
          </div>
        </div>
      </section>

      {/* Search and Filters */}
      <section className="py-8 bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row gap-6 items-center justify-between">
            {/* Search */}
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search articles..."
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            {/* Filters */}
            <div className="flex flex-wrap gap-4">
              <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-full shadow-sm">
                <Filter className="h-4 w-4 text-gray-500" />
                <select 
                  className="bg-transparent border-none focus:ring-0 text-sm"
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                >
                  <option value="All">All Categories</option>
                  {availableCategories.map(category => (
                    <option key={category} value={category}>{category}</option>
                  ))}
                </select>
              </div>

              <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-full shadow-sm">
                <Filter className="h-4 w-4 text-gray-500" />
                <select 
                  className="bg-transparent border-none focus:ring-0 text-sm"
                  value={selectedType}
                  onChange={(e) => setSelectedType(e.target.value)}
                >
                  <option value="All">All Types</option>
                  {availablePostTypes.map(type => (
                    <option key={type} value={type}>{type}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Post */}
      {featuredPost && (
        <section className="py-12 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-8">Featured Post</h2>
            <Card className="overflow-hidden border-0 shadow-lg">
              <div className="md:flex">
                <div className="md:flex-shrink-0">
                  <img
                    className="h-48 w-full object-cover md:w-96"
                    src={featuredPost.image}
                    alt={featuredPost.title}
                  />
                </div>
                <div className="p-8">
                  <div className="flex items-center space-x-4 mb-2">
                    <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
                      {featuredPost.category}
                    </Badge>
                    <Badge variant="outline" className="bg-purple-50 text-purple-700 border-purple-200">
                      {featuredPost.type}
                    </Badge>
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">{featuredPost.title}</h3>
                  <p className="text-gray-600 mb-4">{featuredPost.excerpt}</p>
                  <div className="flex items-center text-sm text-gray-500 space-x-4">
                    <span>By {featuredPost.author}</span>
                    <span>•</span>
                    <span>{featuredPost.date}</span>
                    <span>•</span>
                    <div className="flex items-center">
                      <Clock className="h-4 w-4 mr-1" />
                      <span>{featuredPost.readTime}</span>
                    </div>
                    <div className="flex items-center">
                      <Eye className="h-4 w-4 mr-1" />
                      <span>{featuredPost.views}</span>
                    </div>
                  </div>
                  <div className="mt-4">
                    <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
                      Read More <ChevronRight className="ml-1 h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </section>
      )}

      {/* Latest Articles */}
      <section className="py-12 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl font-bold text-gray-900">Latest Articles</h2>
            <Button variant="outline" className="text-blue-600 border-blue-200 hover:bg-blue-50">
              View All <ChevronRight className="ml-1 h-4 w-4" />
            </Button>
          </div>

          {filteredPosts.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredPosts.map((post) => (
                <Card key={post.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                  <img
                    src={post.image}
                    alt={post.title}
                    className="h-48 w-full object-cover"
                  />
                  <CardContent className="p-6">
                    <div className="flex items-center space-x-2 mb-3">
                      <Badge variant="outline" className="text-xs">
                        {post.category}
                      </Badge>
                      <span className="text-xs text-gray-500">•</span>
                      <span className="text-xs text-gray-500">{post.type}</span>
                    </div>
                    <h3 className="font-bold text-lg mb-2 line-clamp-2">{post.title}</h3>
                    <p className="text-gray-600 text-sm mb-4 line-clamp-3">{post.excerpt}</p>
                    <div className="flex justify-between items-center text-xs text-gray-500">
                      <span>{post.date}</span>
                      <div className="flex items-center">
                        <Clock className="h-3 w-3 mr-1" />
                        <span>{post.readTime}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <h3 className="text-lg font-medium text-gray-900 mb-2">No articles found</h3>
              <p className="text-gray-500">Try adjusting your search or filter criteria</p>
            </div>
          )}
        </div>
      </section>

      {/* Categories Overview */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Explore by Category
            </h2>
            <p className="text-lg text-gray-600">
              Dive deep into the topics that matter most to your career
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {availableCategories.slice(1).map((category) => {
              const categoryPostCount = blogPostsData.filter((post) => post.category === category).length;
              return (
                <Card
                  key={category}
                  className="hover:shadow-lg transition-shadow cursor-pointer group"
                  onClick={() => setSelectedCategory(category)}
                >
                  <CardContent className="p-6 text-center">
                    <div className="mb-4 flex justify-center text-blue-600 group-hover:text-purple-600 transition-colors">
                      {categoryIcons[category as keyof typeof categoryIcons] || <Tag className="w-8 h-8" />}
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">{category}</h3>
                    <p className="text-gray-600 text-sm">
                      {categoryPostCount} article{categoryPostCount !== 1 ? 's' : ''}
                    </p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Stay Updated
          </h2>
          <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
            Subscribe to our newsletter to get the latest articles and updates delivered to your inbox.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <Input 
              type="email" 
              placeholder="Enter your email" 
              className="flex-1"
            />
            <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
              Subscribe
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default SEOBlogPage;