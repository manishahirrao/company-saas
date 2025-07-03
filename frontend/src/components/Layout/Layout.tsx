import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useTheme } from 'next-themes';
import Navbar from './Navbar';
import Footer from './Footer';
import Breadcrumb from './Breadcrumb';
// import ScrollToTop from './ScrollToTop';
// import NetworkStatus from './NetworkStatus';
import { ErrorBoundary } from '@/components/ErrorBoundary';

interface LayoutProps {
  children: React.ReactNode;
  showFooter?: boolean;
  showScrollToTop?: boolean;
  className?: string;
}

const Layout: React.FC<LayoutProps> = ({
  children,
  showFooter = true,
  showScrollToTop = true,
  className = ''
}) => {
  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  const { theme } = useTheme();

  return (
    <ErrorBoundary>
      <div className={`min-h-screen flex flex-col relative bg-background text-foreground transition-colors duration-200 ${className}`}>
        {/* Grid background */}
        <div className="grid-pattern" />
        
        {/* Subtle gradient overlay */}
        <div 
          className="fixed inset-0 -z-10 opacity-30 dark:opacity-10 pointer-events-none"
          style={{
            background: 'radial-gradient(ellipse at center, rgba(99, 102, 241, 0.1) 0%, transparent 70%)',
          }}
          aria-hidden="true"
        />
        
        <div className="relative z-10 flex flex-col min-h-screen">
          
          <Navbar />
          <Breadcrumb />
          <main id="main-content" className="flex-grow relative z-0">
            <ErrorBoundary>
              {children}
            </ErrorBoundary>
          </main>
          {showFooter && <Footer />}
          {/* Temporarily disabled until components are implemented */}
          {/* {showScrollToTop && <ScrollToTop />} */}
          {/* <NetworkStatus /> */}
        </div>
      </div>
    </ErrorBoundary>
  );
};

export default Layout;