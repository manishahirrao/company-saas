import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  Twitter, 
  Linkedin, 
  Github, 
  Instagram,
  ArrowRight,
  Zap,
  Users,
  TrendingUp,
  Shield,
  Globe,
  Mail,
  MapPin,
  Phone,
  MessageSquare,
  FileText,
  Briefcase,
  Settings,
  HelpCircle,
  Star
} from 'lucide-react';

interface FooterLink {
  name: string;
  href: string;
  icon?: React.ReactNode;
  className?: string;
  external?: boolean;
}

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  // Personal tools section links
  const personalTools: FooterLink[] = [
    { 
      name: 'LinkedIn Post Builder', 
      href: '/product/personalpostgeneration', 
      icon: <MessageSquare className="w-4 h-4" />,
      className: 'text-indigo-400 group-hover:translate-x-1 transition-transform'
    },
    { 
      name: 'Resume Enhancer', 
      href: '/product/resume-builder', 
      icon: <FileText className="w-4 h-4" />,
      className: 'text-indigo-400 group-hover:translate-x-1 transition-transform'
    },
    { 
      name: 'Career Match', 
      href: '/product/job-matcher', 
      icon: <Briefcase className="w-4 h-4" />,
      className: 'text-indigo-400 group-hover:translate-x-1 transition-transform'
    },
    { 
      name: 'AI Workflows', 
      href: '/product/ai-workflows', 
      icon: <Settings className="w-4 h-4" />,
      className: 'text-indigo-400 group-hover:translate-x-1 transition-transform'
    },
  ];

  const resourcesLinks: FooterLink[] = [
    { name: 'Documentation', href: '/docs' },
    { name: 'Tutorials', href: '/tutorials' },
    { name: 'Blog', href: '/blog' },
    { name: 'Community', href: '/community' },
  ];

  const legalLinks: FooterLink[] = [
    { name: 'Terms of Service', href: '/terms' },
    { name: 'Privacy Policy', href: '/privacy' },
    { name: 'Cookie Policy', href: '/cookies' },
    { name: 'GDPR', href: '/gdpr' },
  ];

  const socialLinks = [
    { 
      name: 'Twitter', 
      href: 'https://twitter.com/postpilot', 
      icon: <Twitter className="w-5 h-5" />,
      className: 'hover:text-blue-400 transition-colors',
      external: true
    },
    { 
      name: 'LinkedIn', 
      href: 'https://linkedin.com/company/postpilot', 
      icon: <Linkedin className="w-5 h-5" />,
      className: 'hover:text-blue-600 transition-colors',
      external: true
    },
    { 
      name: 'GitHub', 
      href: 'https://github.com/postpilot', 
      icon: <Github className="w-5 h-5" />,
      className: 'hover:text-gray-300 transition-colors',
      external: true
    },
    { 
      name: 'Instagram', 
      href: 'https://instagram.com/postpilot', 
      icon: <Instagram className="w-5 h-5" />,
      className: 'hover:text-pink-500 transition-colors',
      external: true
    },
  ];

  // Helper function to render links consistently
  const renderLink = (item: FooterLink) => {
    const linkContent = (
      <>
        {item.icon && <span className={`mr-2 ${item.className || ''}`}>{item.icon}</span>}
        {item.name}
      </>
    );

    if (item.external || item.href.startsWith('http')) {
      return (
        <a
          href={item.href}
          target="_blank"
          rel="noopener noreferrer"
          className="text-muted-foreground hover:text-electric-purple transition-colors duration-200 group flex items-center"
        >
          {linkContent}
        </a>
      );
    }

    return (
      <Link
        to={item.href}
        className="text-muted-foreground hover:text-electric-purple transition-colors duration-200 group flex items-center"
      >
        {linkContent}
      </Link>
    );
  };

  // Helper function to render a section with title and links
  const renderSection = (title: string, items: FooterLink[], icon?: React.ReactNode, delay = 0) => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.2 + delay }}
      viewport={{ once: true }}
      className="space-y-4"
    >
      <h4 className="text-lg font-space font-semibold text-foreground flex items-center">
        {icon && <span className="mr-2">{icon}</span>}
        {title}
      </h4>
      <ul className="space-y-2">
        {items.map((item, index) => (
          <motion.li 
            key={item.href}
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.3 + (index * 0.05) }}
            viewport={{ once: true }}
          >
            {renderLink(item)}
          </motion.li>
        ))}
      </ul>
    </motion.div>
  );

  // Navigation sections
  const sections = [
    {
      title: 'Tools',
      icon: <Settings className="w-5 h-5" />,
      links: personalTools
    },
    {
      title: 'Resources',
      icon: <HelpCircle className="w-5 h-5" />,
      links: resourcesLinks
    },
    {
      title: 'Legal',
      icon: <Shield className="w-5 h-5" />,
      links: legalLinks
    }
  ];

  return (
    <footer className="py-16 px-4 sm:px-6 lg:px-8 border-t border-electric-purple/20">
      <motion.div 
        className="max-w-7xl mx-auto"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
      >
        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand Section - Takes 2 columns on desktop */}
          <motion.div 
            className="col-span-1 md:col-span-2"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <div className="flex items-center mb-4">
              <div className="w-10 h-10 bg-gradient-to-br from-electric-purple to-indigo-600 rounded-lg flex items-center justify-center mr-3">
                <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h2 className="text-2xl font-space font-bold bg-gradient-to-r from-electric-purple to-indigo-500 bg-clip-text text-transparent">
                PostPilot
              </h2>
            </div>
            <motion.p 
              className="text-muted-foreground font-inter mb-6"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
            >
              Empowering professionals with AI-powered tools for career growth. 
              Enhance your professional journey with our intelligent solutions.
            </motion.p>
            
            {/* Social Links */}
            <motion.div 
              className="flex space-x-4"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              viewport={{ once: true }}
            >
              {socialLinks.map((social, index) => (
                <motion.a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full bg-background border border-border flex items-center justify-center hover:bg-accent hover:border-electric-purple/30 transition-colors"
                  aria-label={social.name}
                  whileHover={{ y: -2, scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.4 + (index * 0.1) }}
                  viewport={{ once: true }}
                >
                  {social.icon}
                </motion.a>
              ))}
            </motion.div>
          </motion.div>

          {/* Navigation Sections */}
          {sections.map((section, index) => (
            <motion.div
              key={section.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 + (index * 0.1) }}
              viewport={{ once: true }}
              className="space-y-4"
            >
              <h3 className="text-lg font-space font-semibold text-foreground flex items-center">
                {section.icon}
                <span className="ml-2">{section.title}</span>
              </h3>
              <ul className="space-y-2">
                {section.links.map((link, linkIndex) => (
                  <motion.li 
                    key={link.href}
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: 0.3 + (index * 0.1) + (linkIndex * 0.05) }}
                    viewport={{ once: true }}
                    className="group"
                  >
                    <Link 
                      to={link.href}
                      className="text-muted-foreground hover:text-foreground transition-colors flex items-center group-hover:translate-x-1"
                    >
                      {link.icon && <span className="mr-2">{link.icon}</span>}
                      {link.name}
                    </Link>
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        {/* Bottom Bar */}
        <motion.div 
          className="border-t border-border mt-12 pt-8"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          viewport={{ once: true }}
        >
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-muted-foreground/60 font-inter text-sm">
              &copy; {currentYear} PostPilot. All rights reserved.
            </p>
            <div className="flex flex-wrap justify-center gap-4 mt-4 md:mt-0">
              {legalLinks.map((link, index) => (
                <motion.div
                  key={link.href}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.6 + (index * 0.1) }}
                  viewport={{ once: true }}
                >
                  <Link 
                    to={link.href}
                    className="text-muted-foreground hover:text-foreground text-sm transition-colors"
                  >
                    {link.name}
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </motion.div>
    </footer>
  )
};

export default Footer;
