import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { AdvancedVortexAnimation } from "@/Logo/logo";
import { Play } from "lucide-react";

export function HeroSection() {
  const handleStartTrial = () => {
    console.log("Starting free trial...");
  };

  const handleWatchDemo = () => {
    console.log("Opening demo...");
  };

  return (
    <section className="pt-24 pb-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Background Grid Pattern */}
      <div className="absolute inset-0 grid-pattern dark:grid-pattern opacity-50" />
      
      <div className="max-w-7xl mx-auto text-center relative z-10">
        <motion.div 
          className="mb-12"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          {/* Large Advanced Vortex Logo */}
          <div className="flex justify-center mb-16">
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 1, delay: 0.2 }}
            >
              <AdvancedVortexAnimation size="xl" complexity="hypnotic" className="scale-125" />
            </motion.div>
          </div>
          
          {/* Main Title */}
          <motion.h1 
            className="text-7xl md:text-8xl font-space font-bold gradient-text mb-6 animate-float"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            VORTEX
          </motion.h1>
          
          <motion.p 
            className="text-2xl md:text-3xl text-muted-foreground font-space font-light mb-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            AI OPERATIONS
          </motion.p>
          
          <motion.div 
            className="inline-block px-6 py-2 bg-gradient-to-r from-electric-purple/20 to-neon-blue/20 rounded-full border border-electric-purple/30"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.8 }}
          >
            <span className="text-electric-purple font-inter font-medium">ENTERPRISE READY</span>
          </motion.div>
        </motion.div>
        
        {/* Enhanced Description with Email Capture */}
        <motion.div 
          className="mb-12 space-y-8"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1 }}
        >
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto font-inter leading-relaxed">
            Transform your business operations with cutting-edge AI automation. 
            Streamline workflows, enhance productivity, and unlock the full potential of artificial intelligence.
          </p>

          {/* Social Proof Pills */}
          <div className="flex flex-wrap justify-center gap-4 max-w-2xl mx-auto">
            <motion.div 
              className="flex items-center gap-2 px-4 py-2 bg-card/30 backdrop-blur-sm rounded-full border border-electric-purple/20"
              whileHover={{ scale: 1.05, borderColor: "hsl(283, 91%, 57%, 0.5)" }}
              transition={{ duration: 0.2 }}
            >
              <div className="w-2 h-2 bg-electric-green rounded-full animate-pulse" />
              <span className="text-sm font-medium">500+ Enterprise Clients</span>
            </motion.div>
            <motion.div 
              className="flex items-center gap-2 px-4 py-2 bg-card/30 backdrop-blur-sm rounded-full border border-electric-purple/20"
              whileHover={{ scale: 1.05, borderColor: "hsl(283, 91%, 57%, 0.5)" }}
              transition={{ duration: 0.2 }}
            >
              <div className="w-2 h-2 bg-neon-blue rounded-full animate-pulse" />
              <span className="text-sm font-medium">99.9% Uptime SLA</span>
            </motion.div>
            <motion.div 
              className="flex items-center gap-2 px-4 py-2 bg-card/30 backdrop-blur-sm rounded-full border border-electric-purple/20"
              whileHover={{ scale: 1.05, borderColor: "hsl(283, 91%, 57%, 0.5)" }}
              transition={{ duration: 0.2 }}
            >
              <div className="w-2 h-2 bg-warm-yellow rounded-full animate-pulse" />
              <span className="text-sm font-medium">SOC 2 Certified</span>
            </motion.div>
          </div>
        </motion.div>
        
        {/* CTA Buttons */}
        <motion.div 
          className="flex flex-col sm:flex-row gap-4 justify-center"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.2 }}
        >
          <motion.div 
            whileHover={{ scale: 1.05 }} 
            whileTap={{ scale: 0.95 }}
          >
            <Button 
              size="lg"
              className="bg-gradient-to-r from-electric-purple to-neon-blue text-white px-8 py-4 text-lg font-inter font-semibold hover:shadow-lg hover:shadow-electric-purple/25 transition-all duration-200"
              onClick={handleStartTrial}
            >
              Start Free Trial
            </Button>
          </motion.div>
          
          <motion.div 
            whileHover={{ scale: 1.05 }} 
            whileTap={{ scale: 0.95 }}
          >
            <Button 
              size="lg"
              variant="outline"
              className="border-2 border-electric-purple text-electric-purple px-8 py-4 text-lg font-inter font-semibold hover:bg-electric-purple hover:text-white transition-all duration-200"
              onClick={handleWatchDemo}
            >
              <Play className="w-5 h-5 mr-2" />
              Watch Demo
            </Button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
