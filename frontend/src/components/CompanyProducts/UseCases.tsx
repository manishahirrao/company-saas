
import React from 'react';
import { motion } from 'framer-motion';
import { Badge } from '@/components/ui/badge';

interface UseCase {
  title: string;
  description: string;
  industry: string;
  challenge: string;
  solution: string;
  results: string[];
  icon: React.ReactNode;
  gradient: string;
}

interface UseCasesProps {
  title: string;
  subtitle: string;
  useCases: UseCase[];
}

const UseCases = ({ title, subtitle, useCases }: UseCasesProps) => {
  return (
    <section className="relative py-24 overflow-hidden bg-background">
      {/* Background elements */}
      <div className="absolute inset-0 grid-pattern opacity-50" />
      <div className="absolute inset-0 bg-gradient-to-b from-background/90 to-background/70 backdrop-blur-sm" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div 
          className="text-center mb-20"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-electric-purple/20 to-neon-blue/20 rounded-full px-6 py-3 mb-6">
            <span className="text-foreground text-sm font-medium">Use Cases</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
            {title}
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            {subtitle}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {useCases.map((useCase, index) => (
            <motion.div
              key={index}
              className="group relative bg-card/80 backdrop-blur-sm rounded-2xl p-8 border border-border/50 hover:border-primary/30 transition-all duration-300 hover:shadow-xl overflow-hidden"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-electric-purple to-neon-blue" />
              
              <div className="flex items-start mb-6">
                <div className={`p-3 rounded-xl ${useCase.gradient} mr-4`}>
                  {useCase.icon}
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-foreground mb-2">
                    {useCase.title}
                  </h3>
                  <Badge variant="outline" className="bg-background/50 text-foreground/80 border-border/50">
                    {useCase.industry}
                  </Badge>
                </div>
              </div>

              <p className="text-muted-foreground mb-6 leading-relaxed">
                {useCase.description}
              </p>

              <div className="space-y-6">
                <div className="p-4 bg-background/50 rounded-lg border border-border/30">
                  <h4 className="font-semibold text-foreground mb-2 flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-rose-500"></span>
                    Challenge
                  </h4>
                  <p className="text-muted-foreground text-sm">{useCase.challenge}</p>
                </div>

                <div className="p-4 bg-background/50 rounded-lg border border-border/30">
                  <h4 className="font-semibold text-foreground mb-2 flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-blue-500"></span>
                    Solution
                  </h4>
                  <p className="text-muted-foreground text-sm">{useCase.solution}</p>
                </div>

                <div className="p-4 bg-background/50 rounded-lg border border-border/30">
                  <h4 className="font-semibold text-foreground mb-3 flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-green-500"></span>
                    Results
                  </h4>
                  <ul className="space-y-2">
                    {useCase.results.map((result, resultIndex) => (
                      <li key={resultIndex} className="flex items-start text-sm text-muted-foreground">
                        <svg className="h-4 w-4 text-green-500 mt-0.5 mr-2 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                        {result}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default UseCases;
