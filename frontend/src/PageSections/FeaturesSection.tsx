import { motion } from "framer-motion";
import { Share, Users, Brain, Link } from "lucide-react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { useScrollAnimation } from "@/pages/Animation/useScrollAnimation";

const features = [
  {
    title: "Social Automation",
    description: "Automate your social media presence with AI-driven content creation and scheduling across all platforms.",
    icon: Share,
    gradient: "from-electric-purple to-neon-blue",
    delay: 0,
  },
  {
    title: "HR Outsourcing",
    description: "Streamline human resources with intelligent recruitment, onboarding, and employee management solutions.",
    icon: Users,
    gradient: "from-aqua-teal to-electric-green",
    delay: 0.1,
  },
  {
    title: "AI Ops Hub",
    description: "Centralized AI operations dashboard for monitoring, managing, and optimizing all your automated processes.",
    icon: Brain,
    gradient: "from-neon-blue to-warm-yellow",
    delay: 0.2,
  },
  {
    title: "Joint Platform",
    description: "Unified workspace connecting all your tools and teams for seamless collaboration and productivity.",
    icon: Link,
    gradient: "from-warm-yellow to-electric-green",
    delay: 0.3,
  },
];

export function FeaturesSection() {
  const sectionRef = useScrollAnimation();

  return (
    <section id="features" className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <motion.div 
          ref={sectionRef}
          className="text-center mb-16 animate-on-scroll"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="text-5xl font-space font-bold gradient-text mb-6">
            Powerful Features
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto font-inter">
            Experience the next generation of AI-powered business automation with our comprehensive suite of enterprise tools.
          </p>
        </motion.div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: feature.delay }}
              viewport={{ once: true }}
              whileHover={{ y: -8 }}
            >
              <Card className="glow-card bg-card/50 backdrop-blur-sm border-electric-purple/20 hover:border-electric-purple/50 transition-all duration-300 h-full group">
                <CardHeader>
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center">
                      <div className={`w-12 h-12 bg-gradient-to-br ${feature.gradient} rounded-lg flex items-center justify-center mr-4 group-hover:scale-110 transition-transform duration-200`}>
                        <feature.icon className="text-white text-xl" size={24} />
                      </div>
                      <div>
                        <h3 className="text-xl font-space font-semibold text-foreground mb-1">{feature.title}</h3>
                        <div className="flex items-center gap-1">
                          <div className="w-2 h-2 bg-electric-green rounded-full animate-pulse" />
                          <span className="text-xs text-muted-foreground">Active</span>
                        </div>
                      </div>
                    </div>
                    <motion.div 
                      className="text-electric-purple"
                      whileHover={{ rotate: 90 }}
                      transition={{ duration: 0.2 }}
                    >
                      →
                    </motion.div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-muted-foreground font-inter text-sm leading-relaxed">
                    {feature.description}
                  </p>
                  
                  {/* Progress Indicators */}
                  <div className="space-y-2">
                    <div className="flex justify-between text-xs text-muted-foreground">
                      <span>Efficiency</span>
                      <span>{85 + index * 3}%</span>
                    </div>
                    <div className="w-full bg-muted rounded-full h-1.5">
                      <motion.div
                        className="h-1.5 rounded-full bg-gradient-to-r from-electric-purple to-neon-blue"
                        initial={{ width: 0 }}
                        whileInView={{ width: `${85 + index * 3}%` }}
                        transition={{ duration: 1, delay: feature.delay + 0.5 }}
                        viewport={{ once: true }}
                      />
                    </div>
                  </div>

                  {/* Feature Benefits */}
                  <div className="pt-2 border-t border-electric-purple/10">
                    <div className="grid grid-cols-2 gap-2 text-xs">
                      <div className="flex items-center gap-1">
                        <div className="w-1 h-1 bg-electric-green rounded-full" />
                        <span className="text-muted-foreground">24/7 Active</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <div className="w-1 h-1 bg-neon-blue rounded-full" />
                        <span className="text-muted-foreground">Auto-scale</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
