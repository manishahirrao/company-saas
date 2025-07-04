import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { ArrowRight, Play } from 'lucide-react';
import { AdvancedVortexAnimation } from '@/Logo/logo';
import { useNavigate } from 'react-router-dom';

export const SEOBlogHero = () => {

  const navigate=useNavigate();
  
  return (
    <section className="pt-24 pb-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden bg-background">
      <div className="max-w-7xl mx-auto text-center relative z-10">
        <motion.div 
          className="mb-12"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          {/* Large Advanced Vortex Logo */}
          {/* <div className="flex justify-center mb-8">
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 1, delay: 0.2 }}
            >
              <AdvancedVortexAnimation size="xl" complexity="hypnotic" className="scale-125" />
            </motion.div>
          </div> */}
          
          {/* Main Title */}
          <motion.h1 
            className="text-5xl md:text-7xl font-space font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-500 to-blue-500 dark:from-purple-400 dark:to-blue-400 mb-6"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            AI-POWERED SEO BLOG PLATFORM
          </motion.h1>
          
          <motion.p 
            className="text-xl md:text-2xl text-muted-foreground font-space font-light mb-4 max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            Create, optimize, and publish high-quality content that ranks with our AI-powered platform.
          </motion.p>
          
          <motion.div 
            className="flex flex-col sm:flex-row gap-4 justify-center mt-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
          >
            <Button size="lg" 
            onClick={()=>navigate('/login')}
            className="gap-2 bg-gradient-to-r from-electric-purple to-neon-blue hover:from-electric-purple/90 hover:to-neon-blue/90 text-white px-8 py-6 rounded-xl font-semibold shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-200">
              Start Free Trial
              <ArrowRight className="w-5 h-5" />
            </Button>
            <Button size="lg" variant="outline" className="gap-2 border-2 border-border hover:border-electric-purple px-8 py-6 rounded-xl font-semibold hover:bg-card/50 transition-all duration-200">
              <Play className="w-5 h-5" />
              Watch Demo
            </Button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default SEOBlogHero;
