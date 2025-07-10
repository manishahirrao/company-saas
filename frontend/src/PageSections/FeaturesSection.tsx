import { motion } from "framer-motion";
import { Briefcase, Zap, FileText, MessageSquare, Wrench, BookOpen, Cpu, ArrowRight } from "lucide-react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { useScrollAnimation } from "@/pages/Animation/useScrollAnimation";
import { Link } from "react-router-dom";

const products = [
  {
    title: "Post a Job",
    description: "Create and manage job listings with our powerful job posting platform.",
    icon: Briefcase,
    href: "/products/job-postings",
    gradient: "from-blue-500 to-purple-500",
    delay: 0,
  },
  {
    title: "Hire Assist",
    description: "AI-powered hiring automation to streamline your recruitment process.",
    icon: Zap,
    href: "/products/hiring",
    gradient: "from-green-500 to-teal-500",
    delay: 0.1,
  },
  {
    title: "Ads Copy AI",
    description: "Generate high-converting ad content with our AI-powered copywriting tool.",
    icon: FileText,
    href: "/products/ads-generator",
    gradient: "from-yellow-500 to-orange-500",
    delay: 0.2,
  },
  {
    title: "AI Post Builder",
    description: "Craft professional LinkedIn content with our AI-powered post builder.",
    icon: MessageSquare,
    href: "/products/linkedin-posts",
    gradient: "from-purple-500 to-pink-500",
    delay: 0.3,
  },
  {
    title: "AI Operational Page",
    description: "Automate business operations with our AI-powered operations platform.",
    icon: Wrench,
    href: "/products/aioperation",
    gradient: "from-indigo-500 to-blue-500",
    delay: 0.4,
  },
  {
    title: "AIO & SEO Blog",
    description: "Generate SEO-optimized blog content with our AI writing assistant.",
    icon: BookOpen,
    href: "/products/blog",
    gradient: "from-pink-500 to-rose-500",
    delay: 0.5,
  },
  {
    title: "Custom LLM",
    description: "Train and deploy custom language models for your specific needs.",
    icon: Cpu,
    href: "/products/llm",
    gradient: "from-cyan-500 to-blue-500",
    delay: 0.6,
  },
];

export function FeaturesSection() {
  const sectionRef = useScrollAnimation();

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8" id="products">
      <div className="max-w-7xl mx-auto">
        <motion.div 
          ref={sectionRef}
          className="text-center mb-16"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="text-5xl font-space font-bold bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent mb-6">
            Our Products
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto font-inter">
            Discover our comprehensive suite of AI-powered tools designed to streamline your business operations.
          </p>
        </motion.div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {products.map((product, index) => {
            const Icon = product.icon;
            const efficiency = 85 + index * 3;
            
            return (
              <motion.div
                key={product.title}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: product.delay }}
                viewport={{ once: true }}
                whileHover={{ y: -8 }}
              >
                <Link to={product.href} className="block h-full">
                  <Card className="glow-card bg-card/50 backdrop-blur-sm border-electric-purple/20 hover:border-electric-purple/50 transition-all duration-300 h-full group">
                    <CardHeader>
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex items-center">
                          <div className={`w-12 h-12 bg-gradient-to-br ${product.gradient} rounded-lg flex items-center justify-center mr-4 group-hover:scale-110 transition-transform duration-200`}>
                            <Icon className="text-white" size={24} />
                          </div>
                          <div>
                            <h3 className="text-xl font-space font-semibold text-foreground mb-1">{product.title}</h3>
                            <div className="flex items-center gap-1">
                              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                              <span className="text-xs text-muted-foreground">Active</span>
                            </div>
                          </div>
                        </div>
                        <motion.div 
                          className="text-electric-purple"
                          whileHover={{ rotate: 90 }}
                          transition={{ duration: 0.2 }}
                        >
                          <ArrowRight className="w-5 h-5" />
                        </motion.div>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <p className="text-muted-foreground font-inter text-sm leading-relaxed">
                        {product.description}
                      </p>
                      
                      {/* Progress Indicators */}
                      <div className="space-y-2">
                        <div className="flex justify-between text-xs text-muted-foreground">
                          <span>Efficiency</span>
                          <span>{efficiency}%</span>
                        </div>
                        <div className="w-full bg-muted rounded-full h-1.5">
                          <motion.div
                            className="h-1.5 rounded-full bg-gradient-to-r from-blue-500 to-purple-500"
                            initial={{ width: 0 }}
                            whileInView={{ width: `${efficiency}%` }}
                            transition={{ duration: 1, delay: product.delay + 0.5 }}
                            viewport={{ once: true }}
                          />
                        </div>
                      </div>

                      {/* Feature Benefits */}
                      <div className="pt-2 border-t border-electric-purple/10">
                        <div className="grid grid-cols-2 gap-2 text-xs">
                          <div className="flex items-center gap-1">
                            <div className="w-1.5 h-1.5 bg-green-500 rounded-full" />
                            <span className="text-muted-foreground">24/7 Active</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <div className="w-1.5 h-1.5 bg-blue-500 rounded-full" />
                            <span className="text-muted-foreground">Auto-scale</span>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
