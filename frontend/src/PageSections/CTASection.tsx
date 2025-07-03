import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Calendar, Play, ArrowRight, Users, Shield, Star, CheckCircle } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export function CTASection() {
  const [hoveredFeature, setHoveredFeature] = useState<number | null>(null);

  const navigate = useNavigate();

  const handleStartTrial = () => {
    console.log("Starting free trial...");
    navigate('/company/register');
  };

  const handleScheduleDemo = () => {
    console.log("Scheduling demo...");
  };

  const trustIndicators = [
    { icon: Users, text: "500+ Enterprise Clients", color: "text-electric-green" },
    { icon: Shield, text: "SOC 2 Type II Certified", color: "text-neon-blue" },
    { icon: Star, text: "4.9/5 Customer Rating", color: "text-warm-yellow" }
  ];

  const quickFeatures = [
    "Deploy in under 5 minutes",
    "99.9% uptime guarantee", 
    "24/7 expert support",
    "Enterprise-grade security"
  ];

  return (
    <section id="contact" className="py-24 bg-gradient-to-br from-electric-purple/5 to-neon-blue/5 relative overflow-hidden">
      {/* Enhanced Background Elements */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-10 left-10 w-72 h-72 bg-electric-purple/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-10 right-10 w-72 h-72 bg-neon-blue/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-electric-green/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }} />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="space-y-12"
        >
          {/* Header */}
          <div className="space-y-6">
            <motion.h2 
              className="text-4xl md:text-5xl font-space font-bold gradient-text"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
            >
              Ready to Transform Your Operations?
            </motion.h2>
            
            <motion.p 
              className="text-xl text-muted-foreground max-w-3xl mx-auto font-inter leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              viewport={{ once: true }}
            >
              Join hundreds of enterprises already using VORTEX to revolutionize their business processes.
            </motion.p>
          </div>

          {/* Trust Indicators */}
          <div className="flex flex-wrap justify-center gap-6 max-w-4xl mx-auto">
            {trustIndicators.map((indicator, index) => (
              <motion.div
                key={indicator.text}
                className="flex items-center gap-3 px-6 py-3 bg-card/30 backdrop-blur-sm rounded-full border border-electric-purple/20"
                whileHover={{ scale: 1.05, borderColor: "hsl(283, 91%, 57%, 0.5)" }}
                onHoverStart={() => setHoveredFeature(index)}
                onHoverEnd={() => setHoveredFeature(null)}
                transition={{ duration: 0.2 }}
              >
                <motion.div
                  animate={{ 
                    scale: hoveredFeature === index ? 1.2 : 1,
                    rotate: hoveredFeature === index ? 360 : 0 
                  }}
                  transition={{ duration: 0.3 }}
                >
                  <indicator.icon className={`w-5 h-5 ${indicator.color}`} />
                </motion.div>
                <span className="text-sm font-medium whitespace-nowrap">{indicator.text}</span>
              </motion.div>
            ))}
          </div>

          {/* Quick Features Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto">
            {quickFeatures.map((feature, index) => (
              <motion.div
                key={feature}
                className="flex items-center gap-2 p-3 bg-card/20 backdrop-blur-sm rounded-lg border border-electric-purple/10"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -2, borderColor: "hsl(283, 91%, 57%, 0.3)" }}
                viewport={{ once: true }}
              >
                <CheckCircle className="w-4 h-4 text-electric-green flex-shrink-0" />
                <span className="text-xs font-medium text-center">{feature}</span>
              </motion.div>
            ))}
          </div>
          
          {/* CTA Buttons */}
          <motion.div 
            className="flex flex-col sm:flex-row gap-6 justify-center items-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            viewport={{ once: true }}
          >
            <motion.div 
              whileHover={{ scale: 1.05 }} 
              whileTap={{ scale: 0.95 }}
              className="relative group"
            >
              <div className="absolute -inset-1 bg-gradient-to-r from-electric-purple to-neon-blue rounded-lg blur opacity-25 group-hover:opacity-75 transition duration-300" />
              <Button 
                size="lg" 
                className="relative bg-gradient-to-r from-electric-purple to-neon-blue text-white px-8 py-4 text-lg font-inter font-medium hover:shadow-lg hover:shadow-electric-purple/25 transition-all duration-200"
                onClick={handleStartTrial}
              >
                <Play className="w-5 h-5 mr-2" />
                Start Free Trial
                <motion.div
                  className="ml-2"
                  animate={{ x: [0, 5, 0] }}
                  transition={{ repeat: Infinity, duration: 1.5 }}
                >
                  <ArrowRight size={16} />
                </motion.div>
              </Button>
            </motion.div>
            
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button 
                variant="outline" 
                size="lg" 
                className="border-electric-purple text-electric-purple hover:bg-electric-purple hover:text-white px-8 py-4 text-lg font-inter font-medium transition-all duration-200 backdrop-blur-sm"
                onClick={handleScheduleDemo}
              >
                <Calendar className="w-5 h-5 mr-2" />
                Schedule Demo
              </Button>
            </motion.div>
          </motion.div>
          
          {/* Fine Print */}
          <motion.div
            className="space-y-2"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            viewport={{ once: true }}
          >
            <p className="text-sm text-muted-foreground font-inter">
              No credit card required • 14-day free trial • Cancel anytime
            </p>
            <div className="flex items-center justify-center gap-4 text-xs text-muted-foreground">
              <span className="flex items-center gap-1">
                <div className="w-1 h-1 bg-electric-green rounded-full" />
                GDPR Compliant
              </span>
              <span className="flex items-center gap-1">
                <div className="w-1 h-1 bg-neon-blue rounded-full" />
                ISO 27001 Certified
              </span>
              <span className="flex items-center gap-1">
                <div className="w-1 h-1 bg-warm-yellow rounded-full" />
                99.9% Uptime SLA
              </span>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
