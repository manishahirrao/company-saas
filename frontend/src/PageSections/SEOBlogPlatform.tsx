import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Zap, Search, BarChart3, Users, CheckCircle } from 'lucide-react';

const platformFeatures = [
  {
    title: 'AI-Powered Content Generation',
    description: 'Generate high-quality, SEO-optimized blog posts in minutes with our advanced AI technology.',
    icon: Zap,
    color: 'from-blue-500 to-purple-500'
  },
  {
    title: 'Keyword Research',
    description: 'Discover high-traffic, low-competition keywords to rank higher in search results.',
    icon: Search,
    color: 'from-purple-500 to-pink-500'
  },
  {
    title: 'Content Analytics',
    description: 'Track your content performance with detailed analytics and insights.',
    icon: BarChart3,
    color: 'from-pink-500 to-red-500'
  },
  {
    title: 'Team Collaboration',
    description: 'Collaborate with your team in real-time on content creation and editing.',
    icon: Users,
    color: 'from-red-500 to-orange-500'
  }
];

export const SEOBlogPlatform = () => {
  return (
    <section className="py-24 bg-gradient-to-br from-background to-background/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-electric-purple to-neon-blue mb-4">
            Powerful Platform for Content Creators
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Everything you need to create, optimize, and publish content that ranks.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {platformFeatures.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card className="h-full bg-card/50 backdrop-blur-sm border-border/50 hover:shadow-lg transition-all duration-300">
                <CardContent className="p-6">
                  <div className={`w-14 h-14 rounded-xl bg-gradient-to-r ${feature.color} flex items-center justify-center mb-6`}>
                    <feature.icon className="w-7 h-7 text-white" />
                  </div>
                  <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                  <p className="text-muted-foreground">{feature.description}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SEOBlogPlatform;
