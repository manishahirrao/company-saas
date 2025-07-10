import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, Variants } from 'framer-motion';
import { ChevronDown, LogIn, Menu, X, CreditCard, Zap, TrendingUp, Settings, Bell, User, Sparkles, Award, Shield, Sun, Moon } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useTheme } from 'next-themes';
import { VortexSVG } from '@/Logo/Logo';

// Types
interface LinkItem {
  href: string;
  label: string;
  desc?: string;
  icon?: React.ComponentType<{ className?: string }>;
  subItems?: LinkItem[];
}

interface DropdownMenuProps {
  label: string;
  links: LinkItem[];
  isActive: boolean;
  customContent?: React.ReactNode;
  onToggle: (label: string) => void;
  onItemClick: (e?: React.MouseEvent, to?: string) => void;
}

// Animation variants
const navVariants: Variants = {
  hidden: { y: -100, opacity: 0 },
  visible: { 
    y: 0, 
    opacity: 1,
    transition: { 
      type: 'spring',
      damping: 20,
      stiffness: 100,
      duration: 0.5
    }
  }
};

const mobileMenuVariants: Variants = {
  hidden: { opacity: 0, height: 0, overflow: 'hidden' },
  visible: { 
    opacity: 1, 
    height: 'auto',
    transition: { duration: 0.3, ease: 'easeInOut' }
  },
  exit: { 
    opacity: 0, 
    height: 0,
    transition: { duration: 0.2, ease: 'easeInOut' }
  }
};

const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { theme, setTheme } = useTheme();
  
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string>('');
  const [isSignupDropdownOpen, setIsSignupDropdownOpen] = useState(false);
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userState, setUserState] = useState({
    userType: 'professional',
    dropdownRef: useRef<HTMLDivElement>(null),
  });

  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  // Mock credit data
  const userData = {
    name: "Alex Johnson",
    plan: userState.userType === 'professional' ? "Pro" : "Business",
    credits: 1247,
    maxCredits: 5000,
    renewalDate: "Dec 15, 2024",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
  };

  const creditPercentage = (userData.credits / userData.maxCredits) * 100;
  const isLowCredits = creditPercentage < 20;

  const getProgressColor = () => {
    if (creditPercentage > 50) return 'from-emerald-500 to-emerald-600';
    if (creditPercentage > 20) return 'from-amber-500 to-amber-600';
    return 'from-red-500 to-red-600';
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      
      // Close signup dropdown if click is outside
      if (!target.closest('.signup-dropdown') && !target.closest('[data-signup-trigger]')) {
        setIsSignupDropdownOpen(false);
      }
      
      // Close profile dropdown if click is outside
      if (!target.closest('.profile-dropdown') && !target.closest('[data-profile-trigger]')) {
        setIsProfileDropdownOpen(false);
      }
      
      // Close main dropdowns if click is outside
      const isClickInsideDropdown = target.closest('.dropdown-container') || 
                                   target.closest('.dropdown-trigger') ||
                                   target.closest('[role="menu"]');
      
      if (!isClickInsideDropdown) {
        setActiveDropdown('');
      }
    };

    window.addEventListener('scroll', handleScroll);
    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const productLinks: LinkItem[] = [
    { href: '/products/job-postings', label: 'Post a Job', desc: 'Create and manage job listings' },
    { href: '/products/hiring', label: 'Hire Assist', desc: 'AI-powered hiring automation' },
    { href: '/products/ads-generator', label: 'Ads Copy AI', desc: 'Generate high-converting ad content' },
    { href: '/products/linkedin-posts', label: 'AI Post Builder', desc: 'Craft professional LinkedIn content' },
    { href: '/products/aioperation', label: 'AI Operational Page', desc: 'Automate business operations with AI' },
    { href: '/products/blog', label: 'AIO & SEO Blog', desc: 'Generate SEO-optimized blog content' },
    { href: '/products/llm', label: 'Custom LLM', desc: 'Train and deploy custom language models' },
  ];

  const solutionsLinks: LinkItem[] = [
    { href: '/solutions/why-us', label: 'Why Us?', desc: 'See our advantages' },
    { href: '/solutions/use-cases', label: 'By Use Case', desc: 'Industry solutions' },
  ];

  const aboutLinks: LinkItem[] = [
    { href: '/about', label: 'About Us', desc: 'Our story' },
    { href: '/about/careers', label: 'Careers', desc: 'Join our team' },
    { href: '/about/management', label: 'Management Team', desc: 'Meet the leaders' },
    { href: '/about/investors', label: 'Investor Relations', desc: 'For investors' },
  ];

  const contactLink: LinkItem = {
    href: '/contact',
    label: 'Contact Us',
    desc: 'Get in touch'
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
  };

  const handleDropdownToggle = (label: string) => {
    setActiveDropdown(prev => prev === label ? '' : label);
  };

  const handleDropdownItemClick = (e: React.MouseEvent, to?: string) => {
    e.preventDefault();
    e.stopPropagation();
    setActiveDropdown('');
    setIsMobileMenuOpen(false);
    
    if (to) {
      navigate(to);
    }
  };

  useEffect(() => {
    const handleDocumentClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!target.closest('.dropdown-container') && !target.closest('.dropdown-trigger')) {
        setActiveDropdown('');
      }
    };

    document.addEventListener('click', handleDocumentClick);
    return () => {
      document.removeEventListener('click', handleDocumentClick);
    };
  }, []);

  const handleMobileMenuToggle = (e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    setIsMobileMenuOpen(prev => !prev);
  };

  const handleMobileLinkClick = (e: React.MouseEvent, to?: string) => {
    e.preventDefault();
    e.stopPropagation();
    setIsMobileMenuOpen(false);
    
    if (to) {
      navigate(to);
    }
  };

  const MobileMenuLink = ({ to, children, className = '' }: { to: string; children: React.ReactNode; className?: string }) => (
    <Link
      to={to}
      className={cn('block px-3 py-2 text-sm rounded-md hover:bg-foreground/5', className)}
      onClick={(e) => {
        e.preventDefault();
        setIsMobileMenuOpen(false);
        navigate(to);
      }}
    >
      {children}
    </Link>
  );
  
  const MobileSubmenuLink = ({ to, children, className = '' }: { to: string; children: React.ReactNode; className?: string }) => (
    <Link
      to={to}
      className={cn('block pl-4 py-2 text-sm rounded-md hover:bg-foreground/5', className)}
      onClick={(e) => {
        e.preventDefault();
        setIsMobileMenuOpen(false);
        navigate(to);
      }}
    >
      {children}
    </Link>
  );
  
  const DropdownMenu: React.FC<DropdownMenuProps> = ({ 
    label, 
    links, 
    isActive, 
    customContent, 
    onToggle, 
    onItemClick 
  }) => {
    const dropdownRef = useRef<HTMLDivElement>(null);
    const buttonRef = useRef<HTMLButtonElement>(null);
    const firstItemRef = useRef<HTMLAnchorElement>(null);
    const lastItemRef = useRef<HTMLAnchorElement>(null);

    useEffect(() => {
      const handleClickOutside = (event: MouseEvent) => {
        if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node) && 
            buttonRef.current && !buttonRef.current.contains(event.target as Node)) {
          onToggle('');
        }
      };

      document.addEventListener('mousedown', handleClickOutside);
      return () => {
        document.removeEventListener('mousedown', handleClickOutside);
      };
    }, [onToggle]);

    useEffect(() => {
      if (!isActive) return;

      const dropdownItems = Array.from(
        dropdownRef.current?.querySelectorAll('a[role="menuitem"]') || []
      ) as HTMLElement[];

      const handleKeyDown = (e: KeyboardEvent) => {
        if (!dropdownRef.current) return;

        const activeElement = document.activeElement as HTMLElement;
        const isFocusInDropdown = dropdownRef.current.contains(activeElement);
        const currentIndex = dropdownItems.indexOf(activeElement);

        switch (e.key) {
          case 'Escape':
            e.preventDefault();
            onToggle('');
            buttonRef.current?.focus();
            break;
          case 'ArrowDown':
            e.preventDefault();
            if (!isFocusInDropdown && dropdownItems[0]) {
              dropdownItems[0].focus();
            } else if (currentIndex < dropdownItems.length - 1) {
              dropdownItems[currentIndex + 1].focus();
            }
            break;
          case 'ArrowUp':
            e.preventDefault();
            if (currentIndex > 0) {
              dropdownItems[currentIndex - 1].focus();
            } else {
              buttonRef.current?.focus();
            }
            break;
          case 'Home':
            e.preventDefault();
            dropdownItems[0]?.focus();
            break;
          case 'End':
            e.preventDefault();
            dropdownItems[dropdownItems.length - 1]?.focus();
            break;
          case 'Tab':
            if (e.shiftKey) {
              if (document.activeElement === firstItemRef.current) {
                e.preventDefault();
                buttonRef.current?.focus();
              }
            } else {
              if (document.activeElement === buttonRef.current && dropdownItems[0]) {
                e.preventDefault();
                dropdownItems[0].focus();
              } else if (document.activeElement === lastItemRef.current) {
                onToggle('');
              }
            }
            break;
        }
      };

      document.addEventListener('keydown', handleKeyDown);
      return () => document.removeEventListener('keydown', handleKeyDown);
    }, [isActive, onToggle, label]);

    useEffect(() => {
      if (!isActive) return;

      const focusableElements = Array.from(
        document.querySelectorAll('a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])')
      ).filter(el => {
        return el.matches('a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])');
      }) as HTMLElement[];

      const firstElement = focusableElements[0];
      const lastElement = focusableElements[focusableElements.length - 1];

      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === 'Tab') {
          if (e.shiftKey && document.activeElement === firstElement) {
            e.preventDefault();
            lastElement.focus();
          } else if (!e.shiftKey && document.activeElement === lastElement) {
            e.preventDefault();
            firstElement.focus();
          }
        }
      };

      document.addEventListener('keydown', handleKeyDown);
      return () => document.removeEventListener('keydown', handleKeyDown);
    }, [isActive]);

    const menuId = `${label.toLowerCase().replace(/\s+/g, '-')}-menu`;
    const buttonId = `${label.toLowerCase().replace(/\s+/g, '-')}-button`;

    return (
      <div className="relative">
        <button
          ref={buttonRef}
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            onToggle(label);
          }}
          className={cn(
            'flex items-center gap-1 px-3 py-2 text-sm font-medium transition-colors',
            'hover:text-primary focus:outline-none',
            isActive ? 'text-primary' : 'text-foreground/90',
            'group',
            'transition-all duration-200',
            'dropdown-trigger',
            `dropdown-trigger-${label.toLowerCase().replace(/\s+/g, '-')}`
          )}
          aria-expanded={isActive}
          aria-haspopup="menu"
          aria-controls={menuId}
          id={buttonId}
          data-testid={`dropdown-${label.toLowerCase().replace(/\s+/g, '-')}-button`}
        >
          {label}
          <ChevronDown 
            className={cn(
              'ml-1 h-4 w-4 transition-transform duration-200',
              isActive ? 'rotate-180' : ''
            )} 
            aria-hidden="true" 
          />
        </button>

        <AnimatePresence>
          {isActive && (
            <motion.div
              ref={dropdownRef}
              id={menuId}
              className={cn(
                'absolute left-0 mt-2 w-56 rounded-md shadow-lg bg-background text-foreground',
                'ring-1 ring-border/50 z-50',
                'focus:outline-none',
                'dark:bg-gray-900 dark:ring-gray-700',
                'origin-top-left transition-all duration-200',
                'py-1',
                'shadow-xl dark:shadow-black/20',
                'dropdown-container',
                `dropdown-container-${label.toLowerCase().replace(/\s+/g, '-')}`,
                'dark:bg-gray-900 dark:text-gray-100'
              )}
              data-testid={`dropdown-${label.toLowerCase().replace(/\s+/g, '-')}-menu`}
              initial={{ opacity: 0, y: 8, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 8, scale: 0.98, transition: { duration: 0.15 } }}
              transition={{ type: 'spring', damping: 25, stiffness: 300, mass: 0.5 }}
              role="menu"
              aria-orientation="vertical"
              aria-labelledby={buttonId}
              tabIndex={-1}
            >
              {customContent || (
                <div className="py-1" role="none">
                  {links.map((link, index) => {
                    const Icon = link.icon;
                    const isFirst = index === 0;
                    const isLast = index === links.length - 1;
                    
                    return (
                      <Link
                        key={link.href}
                        to={link.href}
                        ref={isFirst ? firstItemRef : isLast ? lastItemRef : null}
                        onClick={(e) => onItemClick(e, link.href)}
                        className={cn(
                          'flex items-center w-full px-4 py-2.5 text-sm',
                          'hover:bg-foreground/5 hover:text-foreground',
                          'focus:outline-none focus:bg-foreground/5 focus:text-foreground',
                          'transition-colors duration-150',
                          'group/item',
                          'focus:relative focus:z-10',
                          'border-l-2 border-transparent',
                          location.pathname === link.href 
                            ? 'text-primary border-primary' 
                            : 'text-foreground/90',
                          isFirst && 'rounded-t-md',
                          isLast && 'rounded-b-md',
                          'dark:hover:bg-gray-800/50',
                          'dark:focus:bg-gray-800/50',
                          'dark:active:bg-gray-700/50',
                          'dark:data-[state=open]:bg-gray-800/50'
                        )}
                        role="menuitem"
                        tabIndex={-1}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter' || e.key === ' ') {
                            e.preventDefault();
                            const target = e.currentTarget.getAttribute('to');
                            if (target) {
                              onItemClick(e as any, target);
                            }
                          }
                        }}
                      >
                        {Icon && (
                          <Icon 
                            className={cn(
                              'mr-3 h-4 w-4 flex-shrink-0',
                              'text-muted-foreground group-hover/item:text-accent-foreground',
                              location.pathname === link.href && 'text-accent-foreground'
                            )} 
                            aria-hidden="true"
                          />
                        )}
                        <div className="flex flex-col">
                          <span className="font-medium text-left">{link.label}</span>
                          {link.desc && (
                            <span className="text-xs text-foreground/70 dark:text-foreground/70 group-hover/item:text-foreground/90 text-left">
                              {link.desc}
                            </span>
                          )}
                        </div>
                      </Link>
                    );
                  })}
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    );
  };

  return (
    <motion.nav 
      initial="hidden"
      animate="visible"
      variants={navVariants}
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
        'bg-background/95 dark:bg-background/95 backdrop-blur-lg border-b border-border/20',
        'supports-[backdrop-filter]:bg-background/80 supports-[backdrop-filter]:dark:bg-background/80',
        isScrolled ? 'shadow-sm' : '',
        'dark:shadow-gray-900/20'
      )}
      style={{
        WebkitBackdropFilter: 'blur(12px)',
        backdropFilter: 'blur(12px)',
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center">
            <Link to="/" className="flex items-center group">
              <motion.div 
                className="relative w-10 h-10 flex items-center justify-center"
                whileHover={{ scale: 1.05, rotate: 10 }}
                whileTap={{ scale: 0.95 }}
                transition={{ type: 'spring', stiffness: 400, damping: 10 }}
              >
                <VortexSVG/>
              </motion.div>
              <span className="ml-3 text-xl font-bold bg-gradient-to-r from-[#8B5CF6] to-[#3B82F6] bg-clip-text text-transparent">
                Vortex
              </span>
            </Link>
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

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-1">
            <Link 
              to="/" 
              className={cn(
                'px-4 py-2 text-sm font-medium transition-all duration-200',
                'text-foreground/90 hover:text-primary',
                location.pathname === '/' ? 'text-primary font-semibold' : ''
              )}
            >
              Home
            </Link>

            <DropdownMenu 
              label="Product" 
              links={productLinks} 
              isActive={activeDropdown === 'Product'}
              onToggle={handleDropdownToggle}
              onItemClick={handleDropdownItemClick}
            />

            <DropdownMenu 
              label="Solutions" 
              links={solutionsLinks} 
              isActive={activeDropdown === 'Solutions'}
              onToggle={handleDropdownToggle}
              onItemClick={handleDropdownItemClick}
            />
            
            <Link 
              to="/pricing" 
              className="px-4 py-2 text-sm font-medium transition-all duration-200 text-foreground/90 hover:text-primary"
            >
              Pricing
            </Link>
            
            <Link 
              to="/resources" 
              className="px-4 py-2 text-sm font-medium transition-all duration-200 text-foreground/90 hover:text-primary"
            >
              Resources
            </Link>
            
            <DropdownMenu 
              label="About" 
              links={aboutLinks} 
              isActive={activeDropdown === 'About'}
              onToggle={handleDropdownToggle}
              onItemClick={handleDropdownItemClick}
            />
            
            <Link 
              to={contactLink.href} 
              className="px-4 py-2 text-sm font-medium transition-all duration-200 text-foreground/90 hover:text-primary"
            >
              {contactLink.label}
            </Link>
          </div>

          {/* Right side - Auth and Theme Toggle */}
          <div className="flex items-center space-x-2">
            <button
              onClick={toggleTheme}
              className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
              aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
            >
              {theme === 'dark' ? (
                <Sun className="h-5 w-5 text-yellow-400" />
              ) : (
                <Moon className="h-5 w-5 text-gray-600" />
              )}
            </button>

            {isAuthenticated ? (
              <div className="relative">
                <button
                  onClick={() => setIsProfileDropdownOpen(!isProfileDropdownOpen)}
                  className="flex items-center space-x-2 p-1 pr-2 rounded-full hover:bg-foreground/5 transition-colors"
                  aria-expanded={isProfileDropdownOpen}
                >
                  <div className="w-8 h-8 rounded-full bg-gradient-to-r from-indigo-500 to-purple-600 flex items-center justify-center text-white text-sm font-medium">
                    {userData.name.charAt(0)}
                  </div>
                </button>

                <AnimatePresence>
                  {isProfileDropdownOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      className="absolute right-0 mt-2 w-64 bg-background rounded-lg shadow-lg ring-1 ring-foreground/10 py-1 z-50"
                    >
                      <div className="px-4 py-3 border-b border-foreground/10">
                        <p className="text-sm font-medium">{userData.name}</p>
                        <p className="text-xs text-foreground/60">{userData.plan} Plan</p>
                      </div>
                      <div className="px-4 py-3">
                        <div className="flex justify-between text-xs mb-1">
                          <span>Credits:</span>
                          <span className="font-medium">
                            {userData.credits.toLocaleString()}/{userData.maxCredits.toLocaleString()}
                          </span>
                        </div>
                        <div className="w-full bg-foreground/10 rounded-full h-2 mb-1">
                          <div 
                            className={cn(
                              'h-full rounded-full bg-gradient-to-r',
                              getProgressColor()
                            )}
                            style={{ width: `${Math.min(creditPercentage, 100)}%` }}
                          />
                        </div>
                        <p className="text-xs text-foreground/60 text-right">
                          Renews: {userData.renewalDate}
                        </p>
                      </div>
                      <div className="py-1">
                        <Link
                          to="/dashboard"
                          className="block px-4 py-2 text-sm hover:bg-foreground/5"
                          onClick={() => setIsProfileDropdownOpen(false)}
                        >
                          Dashboard
                        </Link>
                        <Link
                          to="/settings"
                          className="block px-4 py-2 text-sm hover:bg-foreground/5"
                          onClick={() => setIsProfileDropdownOpen(false)}
                        >
                          Settings
                        </Link>
                        <button
                          onClick={() => {
                            setIsAuthenticated(false);
                            setIsProfileDropdownOpen(false);
                          }}
                          className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20"
                        >
                          Sign out
                        </button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ) : (
              <div className="flex items-center space-x-2">
                <Link
                  to="/signup"
                  className="px-4 py-2 text-sm font-medium rounded-lg hover:bg-foreground/5 transition-colors"
                >
                  Log in
                </Link>
                <Link
                  to="login"
                  className="px-4 py-2 text-sm font-medium text-white bg-gradient-to-r from-indigo-600 to-purple-600 rounded-lg hover:opacity-90 transition-opacity"
                >
                  Get Started
                </Link>
              </div>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="lg:hidden flex items-center">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-foreground/70 hover:text-foreground hover:bg-foreground/10 focus:outline-none"
              aria-expanded="false"
            >
              <span className="sr-only">Open main menu</span>
              {isMobileMenuOpen ? (
                <X className="block h-6 w-6" aria-hidden="true" />
              ) : (
                <Menu className="block h-6 w-6" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            className="lg:hidden bg-background/95 dark:bg-background/95 backdrop-blur-lg border-t border-border/20"
            style={{
              WebkitBackdropFilter: 'blur(12px)',
              backdropFilter: 'blur(12px)',
            }}
            initial="hidden"
            animate="visible"
            exit="hidden"
            variants={mobileMenuVariants}
          >
            <div className="px-2 pt-2 pb-3 space-y-1">
              <MobileMenuLink 
                to="/" 
                className="text-base font-medium text-foreground/90 hover:text-primary"
              >
                Home
              </MobileMenuLink>
              
              <div className="px-3 py-2">
                <p className="text-xs font-medium text-foreground/50 uppercase tracking-wider mb-2">
                  Product
                </p>
                <div className="space-y-1">
                  {productLinks.map((link, index) => (
                    <MobileSubmenuLink key={index} to={link.href}>
                      {link.label}
                    </MobileSubmenuLink>
                  ))}
                </div>
              </div>

              <div className="px-3 py-2">
                <p className="text-xs font-medium text-foreground/50 uppercase tracking-wider mb-2">
                  Solutions
                </p>
                <div className="space-y-1">
                  {solutionsLinks.map((link, index) => (
                    <MobileSubmenuLink key={index} to={link.href}>
                      {link.label}
                    </MobileSubmenuLink>
                  ))}
                </div>
              </div>

              <MobileMenuLink 
                to="/pricing" 
                className="text-base font-medium text-foreground/90 hover:text-primary"
              >
                Pricing
              </MobileMenuLink>

              <MobileMenuLink 
                to="/resources" 
                className="text-base font-medium text-foreground/90 hover:text-primary"
              >
                Resources
              </MobileMenuLink>

              <div className="px-3 py-2">
                <p className="text-xs font-medium text-foreground/50 uppercase tracking-wider mb-2">
                  About
                </p>
                <div className="space-y-1">
                  {aboutLinks.map((link, index) => (
                    <MobileSubmenuLink key={index} to={link.href}>
                      {link.label}
                    </MobileSubmenuLink>
                  ))}
                </div>
              </div>

              {!isAuthenticated && (
                <div className="pt-4 pb-3 border-t border-foreground/10">
                  <div className="space-y-3 px-2">
                    <MobileMenuLink 
                      to="/login"
                      className="w-full flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-foreground/90 bg-foreground/5 hover:bg-foreground/10"
                    >
                      Log in
                    </MobileMenuLink>
                    <MobileMenuLink 
                      to="/register"
                      className="w-full flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-gradient-to-r from-indigo-600 to-purple-600 hover:opacity-90"
                    >
                      Get Started
                    </MobileMenuLink>
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navbar;