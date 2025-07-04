import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { ArrowRight, Shield } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export const SEOBlogCTA = () => {

  const navigate=useNavigate()

  return (
    <section className="py-24 bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-700 dark:to-purple-700 relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-full h-full">
        <div className="absolute top-20 left-10 w-40 h-40 bg-white/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-60 h-60 bg-white/10 rounded-full blur-3xl"></div>
      </div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div 
          className="text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
            Ready to revolutionize your content creation?
          </h2>
          <p className="text-xl text-blue-100 mb-8 max-w-3xl mx-auto">
            Join thousands of content creators, marketers, and agencies who are already scaling their success with AI-powered content generation.
          </p>
          
          <motion.div 
            className="flex flex-col sm:flex-row gap-4 justify-center mb-8"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <Button 
              size="lg" 
              onClick={()=>navigate('/login')}
              className="bg-white text-blue-600 hover:bg-gray-100 dark:bg-white/90 dark:text-blue-700 dark:hover:bg-white px-8 py-6 rounded-xl font-semibold shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-200"
            >
              Start Your Free Trial
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
            <Button 
              variant="outline" 
              size="lg"
              className="border-2 border-white text-white hover:bg-white/10 px-8 py-6 rounded-xl font-semibold transition-all duration-200"
            >
              Schedule a Demo
            </Button>
          </motion.div>
          
          <div className="flex items-center justify-center text-blue-100">
            <Shield className="w-5 h-5 mr-2" />
            <span className="text-sm">Generate 50 pieces of content in your first week or get your money back</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default SEOBlogCTA;
