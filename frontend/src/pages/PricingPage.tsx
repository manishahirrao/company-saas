
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { ArrowRight, Star, Zap, Crown, CheckCircle } from 'lucide-react';
import { motion } from 'framer-motion';

const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const PricingPage: React.FC = () => {
  const [isAnnual, setIsAnnual] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background relative">
        <div className="fixed inset-0 bg-grid-light dark:bg-grid-dark opacity-20 dark:opacity-100 pointer-events-none" />
        <div className="relative z-10 container mx-auto px-4 py-24">
          <div className="max-w-4xl mx-auto text-center space-y-8">
            <div className="h-16 bg-gradient-to-r from-electric-purple/20 to-neon-blue/20 rounded-lg animate-pulse mx-auto max-w-2xl" />
            <div className="h-6 bg-muted/50 rounded mx-auto max-w-3xl animate-pulse" />
          </div>
        </div>
      </div>
    );
  }

  const faq = [
    {
      question: "What's included in the free plan?",
      answer: "The free plan includes basic features like limited AI post generations, access to basic templates, and community support."
    },
    {
      question: "Can I upgrade or downgrade my plan later?",
      answer: "Yes, you can change your plan at any time. Upgrades take effect immediately, and downgrades will apply at your next billing cycle."
    },
    {
      question: "Is there a free trial?",
      answer: "Yes! All paid plans come with a 14-day free trial. No credit card is required to start your trial."
    },
    {
      question: "What payment methods do you accept?",
      answer: "We accept all major credit cards, PayPal, and bank transfers for enterprise plans."
    },
    {
      question: "How does the annual billing work?",
      answer: "Annual billing offers a 20% discount compared to monthly billing. You'll be billed once per year and can cancel anytime."
    },
    {
      question: "Do you offer discounts for non-profits?",
      answer: "Yes, we offer special pricing for non-profit organizations. Please contact our sales team for more information."
    }
  ];

  const plans = [
    {
      name: 'Free',
      icon: <Zap className="w-6 h-6 text-blue-600" />,
      price: { monthly: 0, annual: 0 },
      description: 'Perfect for getting started',
      features: [
        'Basic LinkedIn post drafts (5 per month)',
        'Resume enhancer beta',
        'Job search basics',
        'Community support',
        'Basic templates',
        'Email support'
      ],
      limitations: [
        'Limited AI generations',
        'Watermarked exports',
        'Basic analytics only'
      ],
      cta: 'Sign Up Free',
      ctaLink: '/auth/register',
      popular: false,
      gradient: 'from-blue-50 to-indigo-50'
    },
    {
      name: 'Professional',
      icon: <Star className="w-6 h-6 text-purple-600" />,
      price: { monthly: 29, annual: 24 },
      description: 'For serious professionals',
      features: [
        'Unlimited LinkedIn post generation',
        'Advanced resume builder/enhancer',
        'Job matcher with AI rankings',
        'Career analytics dashboard',
        'Priority email support',
        'Advanced templates',
        'Custom branding',
        'Export in multiple formats',
        'Content calendar',
        'Engagement analytics'
      ],
      limitations: [],
      cta: 'Start Free Trial',
      ctaLink: '/auth/register',
      popular: true,
      gradient: 'from-purple-50 to-pink-50'
    },
    {
      name: 'Business',
      icon: <Crown className="w-6 h-6 text-orange-600" />,
      price: { monthly: 99, annual: 79 },
      description: 'For teams and companies',
      features: [
        'Everything in Professional',
        'AI video generation for company pages',
        'Advanced team analytics',
        'White-label options',
        'API access',
        'Dedicated customer success manager',
        'Custom integrations',
        'Advanced security features',
        'Team collaboration tools',
        'Bulk operations',
        'Custom training sessions',
        'Priority phone support'
      ],
      limitations: [],
      cta: 'Contact Sales',
      ctaLink: '/contact-sales',
      popular: false,
      gradient: 'from-orange-50 to-red-50'
    }
  ];

  const savings = isAnnual ? 20 : 0;

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      {/* Background Grid Pattern */}
      <div className="fixed inset-0 bg-grid-light dark:bg-grid-dark opacity-40 dark:opacity-20 pointer-events-none" />
      
      <div className="relative z-10 py-24 px-4 sm:px-6 lg:px-8">
        <motion.div 
          initial="hidden"
          animate="visible"
          variants={staggerContainer}
          className="max-w-7xl mx-auto"
        >
          <motion.div 
            variants={fadeIn}
            className="text-center mb-16"
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-foreground bg-clip-text bg-gradient-to-r from-electric-purple to-neon-blue">
              Simple, Transparent Pricing
            </h1>
            <p className="mt-6 text-xl text-muted-foreground max-w-3xl mx-auto">
              Choose the perfect plan for your needs. Start with a 14-day free trial. No credit card required.
            </p>
            
            <motion.div 
              variants={fadeIn}
              className="mt-8 flex items-center justify-center space-x-4 bg-white/5 dark:bg-black/10 backdrop-blur-sm p-3 rounded-full inline-flex mx-auto"
            >
              <span className={`text-sm font-medium ${!isAnnual ? 'text-foreground' : 'text-foreground/80 dark:text-muted-foreground'}`}>
                Monthly
              </span>
              <Switch
                checked={isAnnual}
                onCheckedChange={setIsAnnual}
                className="data-[state=checked]:bg-primary"
              />
              <div className="flex items-center">
                <span className={`text-sm font-medium ${isAnnual ? 'text-foreground' : 'text-foreground/60 dark:text-muted-foreground'}`}>
                  Annual
                </span>
                <Badge className="ml-2 bg-green-500/10 text-green-500 hover:bg-green-500/20">
                  Save 20%
                </Badge>
              </div>
            </motion.div>
          </motion.div>
          <motion.div 
            variants={staggerContainer}
            className="grid gap-8 md:grid-cols-2 lg:grid-cols-3"
          >
            {plans.map((plan, index) => (
              <motion.div
                key={plan.name}
                variants={fadeIn}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ y: -8 }}
                className="h-full"
              >
                <Card className={`glow-card bg-card/50 backdrop-blur-sm border-electric-purple/20 hover:border-electric-purple/50 transition-all duration-300 h-full flex flex-col group ${plan.popular ? 'ring-2 ring-electric-purple/30' : ''}`}>
                  {plan.popular && (
                    <div className="bg-gradient-to-r from-electric-purple to-neon-blue text-white text-xs font-medium text-center py-1.5">
                      Most Popular
                    </div>
                  )}
                  <CardHeader className="pb-6">
                    <div className="flex items-center space-x-4">
                      <div className={`p-3 rounded-lg bg-gradient-to-br ${plan.gradient} shadow-md group-hover:scale-110 transition-transform duration-200`}>
                        {React.cloneElement(plan.icon, { className: 'w-6 h-6 text-white' })}
                      </div>
                      <div>
                        <CardTitle className="text-2xl font-space font-bold text-foreground">{plan.name}</CardTitle>
                        <p className="text-foreground/80 dark:text-foreground/90 text-sm">{plan.description}</p>
                      </div>
                    </div>
                    
                    <div className="mt-6 space-y-2">
                      <div className="flex items-baseline">
                        <span className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-electric-purple to-neon-blue">
                          ${isAnnual ? plan.price.annual : plan.price.monthly}
                        </span>
                        <span className="ml-2 text-foreground/80 dark:text-foreground/90 text-lg">
                          {plan.price.monthly === 0 ? '/forever' : isAnnual ? '/year' : '/month'}
                        </span>
                      </div>
                      {plan.price.monthly > 0 && (
                        <p className="text-sm text-foreground/80 dark:text-foreground/90">
                          {isAnnual 
                            ? `Billed as $${plan.price.annual * 12} per year (save 20%)`
                            : `Billed monthly, or $${Math.round(plan.price.monthly * 11.4)}/year if paid annually`
                          }
                        </p>
                      )}
                      
                      {/* Progress Indicator */}
                      <div className="pt-4">
                        <div className="flex justify-between text-xs text-foreground/80 dark:text-foreground/90 mb-1">
                          <span>Value</span>
                          <span>{100 - (index * 20)}%</span>
                        </div>
                        <div className="w-full bg-muted rounded-full h-1.5">
                          <motion.div
                            className="h-1.5 rounded-full bg-gradient-to-r from-electric-purple to-neon-blue"
                            initial={{ width: 0 }}
                            whileInView={{ width: `${100 - (index * 20)}%` }}
                            transition={{ duration: 1, delay: index * 0.1 }}
                            viewport={{ once: true }}
                          />
                        </div>
                      </div>
                    </div>
                  </CardHeader>
                  
                  <CardContent className="flex-1 pt-0">
                    <ul className="space-y-3">
                      {plan.features.map((feature, i) => (
                        <motion.li 
                          key={i} 
                          className="flex items-start"
                          initial={{ opacity: 0, x: -10 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.3, delay: 0.2 + (i * 0.05) }}
                        >
                          <div className="bg-electric-green/10 p-1 rounded-full mr-3">
                            <CheckCircle className="h-4 w-4 text-electric-green flex-shrink-0 mt-0.5" />
                          </div>
                          <span className="text-foreground/90 dark:text-foreground/90 text-sm">{feature}</span>
                        </motion.li>
                      ))}
                    </ul>
                    
                    {plan.limitations.length > 0 && (
                      <div className="mt-6 pt-6 border-t border-electric-purple/10">
                        <h4 className="text-sm font-medium text-foreground/80 dark:text-foreground/90 mb-3 flex items-center">
                          <span className="w-1 h-4 bg-amber-500 rounded-full mr-2"></span>
                          Limitations
                        </h4>
                        <ul className="space-y-2 text-sm text-foreground/80 dark:text-foreground/90">
                          {plan.limitations.map((limitation, i) => (
                            <li key={i} className="flex items-start">
                              <span className="text-foreground/50 mr-2">•</span>
                              <span>{limitation}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </CardContent>
                  
                  <CardFooter className="p-6 pt-0 mt-auto">
                    <Button 
                      asChild 
                      className={`w-full group ${plan.popular ? 'bg-gradient-to-r from-electric-purple to-neon-blue hover:shadow-lg hover:shadow-electric-purple/25' : 'bg-foreground hover:bg-foreground/90'}`}
                      size="lg"
                    >
                      <Link to={plan.ctaLink} className="font-space">
                        <span className="group-hover:translate-x-1 transition-transform duration-200">
                          {plan.cta}
                        </span>
                        <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform duration-200" />
                      </Link>
                    </Button>
                  </CardFooter>
                </Card>
              </motion.div>
            ))}
          </motion.div>
          
          {/* FAQ Section */}
          <motion.div 
            variants={fadeIn}
            className="mt-32 max-w-6xl mx-auto px-4"
          >
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Frequently Asked Questions</h2>
              <p className="text-foreground/80 dark:text-muted-foreground max-w-2xl mx-auto">
                Everything you need to know about our pricing and plans. Can't find the answer you're looking for?
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
              {faq.map((item, index) => (
                <motion.div 
                  key={index}
                  variants={fadeIn}
                  className="bg-white/5 dark:bg-black/10 backdrop-blur-sm p-6 rounded-xl border border-border/20 hover:border-primary/30 transition-all"
                >
                  <h3 className="text-lg font-medium text-foreground">{item.question}</h3>
                  <p className="mt-2 text-foreground/80 dark:text-muted-foreground">{item.answer}</p>
                </motion.div>
              ))}
            </div>
            
            <motion.div 
              variants={fadeIn}
              className="mt-16 text-center"
            >
              <p className="text-foreground/80 dark:text-muted-foreground mb-6">Still have questions? We're here to help!</p>
              <Button 
                variant="outline" 
                size="lg" 
                className="bg-transparent border-2 border-border/50 hover:border-primary/50 hover:bg-background/50"
                asChild
              >
                <Link to="/contact">
                  Contact our team <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default PricingPage;
