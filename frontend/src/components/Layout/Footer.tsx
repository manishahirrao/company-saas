import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  Twitter, 
  Linkedin, 
  Github, 
  Instagram,
  Zap,
  Users,
  TrendingUp,
  Shield,
  Globe,
  Mail,
  MessageSquare,
  FileText,
  Briefcase,
  Settings,
  HelpCircle,
  Star,
  Info,
  Users as Users2,
  Newspaper,
  CreditCard,
  BarChart2,
  Code2,
  BookOpen,
  Signal
} from 'lucide-react';
import { VortexSVG } from '@/Logo/Logo';

interface FooterLink {
  name: string;
  href: string;
  icon?: React.ReactNode;
  className?: string;
  external?: boolean;
}

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  // Products section
  const productLinks: FooterLink[] = [
    { name: 'Post a Job', href: '/products/job-postings', icon: <Users className="w-4 h-4" /> },
    { name: 'Hire Assist', href: '/products/hiring', icon: <Zap className="w-4 h-4" /> },
    { name: 'Ads Copy AI', href: '/products/ads-generator', icon: <TrendingUp className="w-4 h-4" /> },
    { name: 'AI Post Builder', href: '/products/linkedin-posts', icon: <MessageSquare className="w-4 h-4" /> },
    { name: 'AI Operational Page', href: '/products/aioperation', icon: <Shield className="w-4 h-4" /> },
    { name: 'AIO & SEO Blog', href: '/products/blog', icon: <FileText className="w-4 h-4" /> },
    { name: 'Custom LLM', href: '/products/llm', icon: <Globe className="w-4 h-4" /> },
  ];

  // Solutions section
  const solutionsLinks: FooterLink[] = [
    { name: 'Why Us?', href: '/solutions/why-us', icon: <Star className="w-4 h-4" /> },
    { name: 'By Use Case', href: '/solutions/use-cases', icon: <HelpCircle className="w-4 h-4" /> },
  ];

  // About section
  const aboutLinks: FooterLink[] = [
    { name: 'About Us', href: '/about', icon: <Info className="w-4 h-4" /> },
    { name: 'Careers', href: '/careers', icon: <Briefcase className="w-4 h-4" /> },
    { name: 'Team', href: '/team', icon: <Users2 className="w-4 h-4" /> },
    { name: 'Blog', href: '/blog', icon: <Newspaper className="w-4 h-4" /> },
  ];

  // Pricing section
  const pricingLinks: FooterLink[] = [
    { name: 'Pricing Plans', href: '/pricing', icon: <CreditCard className="w-4 h-4" /> },
    { name: 'Enterprise', href: '/enterprise', icon: <Briefcase className="w-4 h-4" /> },
    { name: 'Compare Plans', href: '/pricing/compare', icon: <BarChart2 className="w-4 h-4" /> },
    { name: 'Free Trial', href: '/free-trial', icon: <Zap className="w-4 h-4" /> },
  ];

  // Resources section
  const resourcesLinks: FooterLink[] = [
    { name: 'Documentation', href: '/docs', icon: <FileText className="w-4 h-4" /> },
    { name: 'API Reference', href: '/api', icon: <Code2 className="w-4 h-4" /> },
    { name: 'Guides', href: '/guides', icon: <BookOpen className="w-4 h-4" /> },
    { name: 'Community', href: '/community', icon: <Users2 className="w-4 h-4" /> },
  ];

  // Contact section
  const contactLinks: FooterLink[] = [
    { name: 'Contact Us', href: '/contact', icon: <Mail className="w-4 h-4" /> },
    { name: 'Support', href: '/support', icon: <HelpCircle className="w-4 h-4" /> },
    { name: 'Documentation', href: '/docs', icon: <FileText className="w-4 h-4" /> },
    { name: 'Status', href: '/status', icon: <Signal className="w-4 h-4" /> },
  ];

  // Social links
  const socialLinks = [
    { 
      name: 'Twitter', 
      href: 'https://twitter.com/vortexai', 
      icon: <Twitter className="w-4 h-4" />,
      className: 'text-blue-400 hover:bg-blue-500/10',
      external: true
    },
    { 
      name: 'LinkedIn', 
      href: 'https://linkedin.com/company/vortexai', 
      icon: <Linkedin className="w-4 h-4" />,
      className: 'text-blue-500 hover:bg-blue-500/10',
      external: true
    },
    { 
      name: 'GitHub', 
      href: 'https://github.com/vortexai', 
      icon: <Github className="w-4 h-4" />,
      className: 'text-foreground hover:bg-foreground/10',
      external: true
    },
    { 
      name: 'Instagram', 
      href: 'https://instagram.com/vortexai', 
      icon: <Instagram className="w-4 h-4" />,
      className: 'text-pink-500 hover:bg-pink-500/10',
      external: true
    },
  ];

  return (
    <footer className="bg-background/95 dark:bg-background/95 border-t border-border/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
          {/* Company Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="col-span-2"
          >
            <div className="flex items-center mb-6">
              <motion.div 
                className="w-10 h-10 flex items-center justify-center mr-3"
                whileHover={{ rotate: 10 }}
                transition={{ type: 'spring', stiffness: 400, damping: 10 }}
              >
                <VortexSVG />
              </motion.div>
              <h2 className="text-2xl font-bold bg-gradient-to-r from-[#8B5CF6] to-[#3B82F6] bg-clip-text text-transparent">
                Vortex
              </h2>
              <motion.div 
                className="ml-1 w-2 h-2 bg-gradient-to-r from-[#8B5CF6] to-[#3B82F6] rounded-full"
                animate={{ 
                  scale: [1, 1.2, 1],
                  opacity: [0.7, 1, 0.7]
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: 'easeInOut'
                }}
              />
            </div>
            <p className="text-muted-foreground mb-5 text-sm max-w-md">
              Transform your business operations with our cutting-edge AI automation platform.
              Streamline workflows and unlock the full potential of artificial intelligence.
            </p>
            
            {/* Social Links */}
            <div className="flex space-x-2 mt-4">
              {socialLinks.map((social, index) => (
                <motion.a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`w-8 h-8 rounded-md flex items-center justify-center hover:bg-accent hover:text-accent-foreground transition-colors border ${social.className || 'border-border'}`}
                  aria-label={social.name}
                  whileHover={{ y: -2, scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.1 + (index * 0.1) }}
                  viewport={{ once: true }}
                >
                  {social.icon}
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Products */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true }}
          >
            <h3 className="text-sm font-semibold mb-3 text-foreground flex items-center">
              <Briefcase className="w-4 h-4 mr-2 text-muted-foreground" />
              Products
            </h3>
            <div className="space-y-1.5">
              {productLinks.map((link, index) => (
                <motion.div
                  key={link.name}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.2 + (index * 0.05) }}
                  viewport={{ once: true }}
                >
                  <Link
                    to={link.href}
                    className="flex items-center text-muted-foreground hover:text-foreground transition-colors text-xs py-1"
                  >
                    {link.icon}
                    <span className="ml-2.5">{link.name}</span>
                  </Link>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Solutions */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <h3 className="text-sm font-semibold mb-3 text-foreground flex items-center">
              <Star className="w-4 h-4 mr-2 text-muted-foreground" />
              Solutions
            </h3>
            <div className="space-y-1.5">
              {solutionsLinks.map((link, index) => (
                <motion.div
                  key={link.name}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.2 + (index * 0.05) }}
                  viewport={{ once: true }}
                >
                  <Link
                    to={link.href}
                    className="flex items-center text-muted-foreground hover:text-foreground transition-colors text-xs py-1"
                  >
                    {link.icon}
                    <span className="ml-2.5">{link.name}</span>
                  </Link>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* About */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            viewport={{ once: true }}
          >
            <h3 className="text-sm font-semibold mb-3 text-foreground flex items-center">
              <Shield className="w-4 h-4 mr-2 text-muted-foreground" />
              About
            </h3>
            <div className="space-y-1.5">
              {aboutLinks.map((link, index) => (
                <motion.div
                  key={link.name}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.2 + (index * 0.05) }}
                  viewport={{ once: true }}
                >
                  <Link
                    to={link.href}
                    className="flex items-center text-muted-foreground hover:text-foreground transition-colors text-xs py-1"
                  >
                    {link.icon}
                    <span className="ml-2.5">{link.name}</span>
                  </Link>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Pricing */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
          >
            <h3 className="text-sm font-semibold mb-3 text-foreground flex items-center">
              <CreditCard className="w-4 h-4 mr-2 text-muted-foreground" />
              Pricing
            </h3>
            <div className="space-y-1.5">
              {pricingLinks.map((link, index) => (
                <motion.div
                  key={link.name}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.2 + (index * 0.05) }}
                  viewport={{ once: true }}
                >
                  <Link
                    to={link.href}
                    className="flex items-center text-muted-foreground hover:text-foreground transition-colors text-xs py-1"
                  >
                    {link.icon}
                    <span className="ml-2.5">{link.name}</span>
                  </Link>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Resources */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            viewport={{ once: true }}
          >
            <h3 className="text-sm font-semibold mb-3 text-foreground flex items-center">
              <BookOpen className="w-4 h-4 mr-2 text-muted-foreground" />
              Resources
            </h3>
            <div className="space-y-1.5">
              {resourcesLinks.map((link, index) => (
                <motion.div
                  key={link.name}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.2 + (index * 0.05) }}
                  viewport={{ once: true }}
                >
                  <Link
                    to={link.href}
                    className="flex items-center text-muted-foreground hover:text-foreground transition-colors text-xs py-1"
                  >
                    {link.icon}
                    <span className="ml-2.5">{link.name}</span>
                  </Link>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Contact */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            viewport={{ once: true }}
          >
            <h3 className="text-sm font-semibold mb-3 text-foreground flex items-center">
              <Mail className="w-4 h-4 mr-2 text-muted-foreground" />
              Contact
            </h3>
            <div className="space-y-1.5">
              {contactLinks.map((link, index) => (
                <motion.div
                  key={link.name}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.2 + (index * 0.05) }}
                  viewport={{ once: true }}
                >
                  <Link
                    to={link.href}
                    className="flex items-center text-muted-foreground hover:text-foreground transition-colors text-xs py-1"
                  >
                    {link.icon}
                    <span className="ml-2.5">{link.name}</span>
                  </Link>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Copyright */}
        <motion.div 
          className="border-t border-border/20 mt-8 pt-6 text-center text-muted-foreground text-xs"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          viewport={{ once: true }}
        >
          <p>&copy; {currentYear} Vortex AI. All rights reserved.</p>
          <div className="mt-2 flex justify-center space-x-4 text-xs">
            <Link to="/privacy" className="hover:text-foreground transition-colors">Privacy Policy</Link>
            <span>•</span>
            <Link to="/terms" className="hover:text-foreground transition-colors">Terms of Service</Link>
            <span>•</span>
            <Link to="/cookies" className="hover:text-foreground transition-colors">Cookie Policy</Link>
          </div>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;