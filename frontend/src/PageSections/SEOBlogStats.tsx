import { motion } from 'framer-motion';

const stats = [
  { number: '400%', label: 'Faster Content Creation' },
  { number: '95+', label: 'Average SEO Score' },
  { number: '50K+', label: 'Content Pieces Generated' },
  { number: '99.9%', label: 'Client Satisfaction' }
];

export const SEOBlogStats = () => {
  return (
    <section className="py-24 bg-gradient-to-br from-background to-background/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              className="text-center"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <div className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-electric-purple to-neon-blue mb-2">
                {stat.number}
              </div>
              <p className="text-muted-foreground">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SEOBlogStats;
