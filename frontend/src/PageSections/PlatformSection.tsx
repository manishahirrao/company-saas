import { motion } from "framer-motion";
import { Check } from "lucide-react";
import { useScrollAnimation } from "@/pages/Animation/useScrollAnimation";

const features = [
  "RESTful APIs & GraphQL Support",
  "Multi-language SDKs",
  "Real-time Webhooks",
];

export function PlatformSection() {
  const sectionRef = useScrollAnimation();

  return (
    <section id="platform" className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="text-5xl font-space font-bold gradient-text mb-6">
            Enterprise Platform
          </h2>
          <p className="text-xl text-foreground/80 dark:text-foreground/90 max-w-3xl mx-auto font-inter">
            Built for scale, designed for simplicity. Our enterprise-grade platform handles millions of operations while maintaining security and compliance.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <div className="bg-gradient-to-br from-electric-purple/10 to-neon-blue/10 rounded-2xl p-8 border border-electric-purple/20">
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-card/50 rounded-lg p-4 backdrop-blur-sm">
                  <div className="w-full h-20 bg-gradient-to-r from-electric-purple/20 to-neon-blue/20 rounded mb-2"></div>
                  <div className="space-y-1">
                    <div className="w-3/4 h-2 bg-muted rounded"></div>
                    <div className="w-1/2 h-2 bg-muted rounded"></div>
                  </div>
                </div>
                <div className="bg-card/50 rounded-lg p-4 backdrop-blur-sm">
                  <div className="w-full h-20 bg-gradient-to-r from-aqua-teal/20 to-electric-green/20 rounded mb-2"></div>
                  <div className="space-y-1">
                    <div className="w-2/3 h-2 bg-muted rounded"></div>
                    <div className="w-3/4 h-2 bg-muted rounded"></div>
                  </div>
                </div>
                <div className="bg-card/50 rounded-lg p-4 backdrop-blur-sm col-span-2">
                  <div className="w-full h-16 bg-gradient-to-r from-neon-blue/20 to-warm-yellow/20 rounded mb-2"></div>
                  <div className="space-y-1">
                    <div className="w-4/5 h-2 bg-muted rounded"></div>
                    <div className="w-3/5 h-2 bg-muted rounded"></div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <h3 className="text-3xl font-space font-bold text-foreground mb-6">
              Built for Developers
            </h3>
            <p className="text-lg text-foreground/80 dark:text-foreground/90 mb-8 font-inter">
              Comprehensive APIs, SDKs, and development tools that make integration seamless. Deploy AI operations in minutes, not months.
            </p>
            
            <div className="space-y-4">
              {features.map((feature, index) => (
                <motion.div
                  key={feature}
                  className="flex items-center"
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4, delay: 0.3 + index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <div className="w-8 h-8 bg-electric-purple rounded-full flex items-center justify-center mr-4">
                    <Check className="text-white text-sm" size={16} />
                  </div>
                  <span className="text-foreground font-inter">{feature}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
