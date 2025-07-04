import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Zap, Search, BarChart3, Users } from 'lucide-react';

const features = [
  {
    title: 'SEO Optimization',
    description: 'Automated keyword research and on-page optimization for higher search rankings.',
    icon: Search,
    gradient: 'from-blue-500 to-purple-500',
    details: [
      'Keyword density optimization',
      'Schema markup automation',
      'Internal linking suggestions',
      'Search intent matching'
    ]
  },
  {
    title: 'AI Content Generation',
    description: 'Create high-quality, engaging content in minutes with our advanced AI.',
    icon: Zap,
    gradient: 'from-purple-500 to-pink-500',
    details: [
      'Brand voice consistency',
      'Multi-format adaptation',
      'Creative direction',
      'Style guide adherence'
    ]
  },
  {
    title: 'Performance Analytics',
    description: 'Track your content performance and optimize based on real data.',
    icon: BarChart3,
    gradient: 'from-pink-500 to-red-500',
    details: [
      'Engagement tracking',
      'SEO ranking monitoring',
      'Conversion analytics',
      'ROI measurement'
    ]
  },
  {
    title: 'Team Collaboration',
    description: 'Work seamlessly with your team on content creation and editing.',
    icon: Users,
    gradient: 'from-red-500 to-orange-500',
    details: [
      'Real-time collaboration',
      'Version control',
      'Comment and feedback',
      'Workflow automation'
    ]
  }
];

export const SEOBlogFeatures = () => {
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
          <h2 className="text-3xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-foreground to-purple-600 mb-4">
            Everything You Need for Content Success
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Our platform combines powerful AI with intuitive tools to streamline your content workflow.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card className="h-full bg-card/50 backdrop-blur-sm border-border/50 hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                <CardContent className="p-6">
                  <div className={`w-14 h-14 rounded-xl bg-gradient-to-r ${feature.gradient} flex items-center justify-center mb-6`}>
                    <feature.icon className="w-7 h-7 text-white" />
                  </div>
                  <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
                  <p className="text-muted-foreground mb-4">{feature.description}</p>
                  <ul className="space-y-2">
                    {feature.details.map((detail, i) => (
                      <li key={i} className="flex items-center text-sm text-muted-foreground">
                        <span className="w-1.5 h-1.5 rounded-full bg-current mr-2"></span>
                        {detail}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SEOBlogFeatures;
