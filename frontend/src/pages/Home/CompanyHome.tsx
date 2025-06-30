import { useEffect, useState } from "react";
import Navbar from "@/components/Layout/Navbar";
import { HeroSection } from "@/PageSections/HeroSection";
import { FeaturesSection } from "@/PageSections/FeaturesSection";
import { StatsSection } from "@/PageSections/StatsSection";
import { PlatformSection } from "@/PageSections/PlatformSection";
import { CTASection } from "@/PageSections/CTASection";
import Footer from "@/components/Layout/Footer";
import { AIPoweredHelpSystem } from "../Animation/AIPoweredHelpSystem";
import { SkeletonCard,SkeletonNav } from "../Animation/SkeletonLoader";
import { motion, AnimatePresence } from "framer-motion";

export default function CompanyHome() {
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    document.title = "VORTEX - Advanced AI Operations Platform";

    // Parallax effect for background elements
    const handleScroll = () => {
      const scrolled = window.pageYOffset;
      const parallaxElements = document.querySelectorAll('.parallax-bg');
      
      parallaxElements.forEach((el) => {
        const speed = 0.5;
        const element = el as HTMLElement;
        element.style.transform = `translateY(${scrolled * speed}px)`;
      });
    };

    window.addEventListener('scroll', handleScroll);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background relative">
        {/* Background Grid Pattern */}
        <div className="fixed inset-0 bg-grid-light dark:bg-grid-dark opacity-20 dark:opacity-50 pointer-events-none" />
        
        <SkeletonNav />
        
        <main className="relative z-10 px-4 sm:px-6 lg:px-8">
          {/* Hero Skeleton */}
          <div className="max-w-7xl mx-auto py-24 text-center space-y-8">
            <div className="h-16 bg-gradient-to-r from-electric-purple/20 to-neon-blue/20 rounded-lg animate-pulse mx-auto max-w-2xl" />
            <div className="h-6 bg-muted/50 rounded mx-auto max-w-3xl animate-pulse" />
            <div className="h-6 bg-muted/30 rounded mx-auto max-w-xl animate-pulse" />
            <div className="flex gap-4 justify-center">
              <div className="h-12 w-32 bg-electric-purple/20 rounded-lg animate-pulse" />
              <div className="h-12 w-32 bg-muted/30 rounded-lg animate-pulse" />
            </div>
          </div>

          {/* Features Skeleton */}
          <div className="max-w-7xl mx-auto py-20">
            <div className="h-12 bg-muted/30 rounded mx-auto max-w-md mb-12 animate-pulse" />
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {[...Array(4)].map((_, i) => (
                <SkeletonCard key={i} />
              ))}
            </div>
          </div>
        </main>
      </div>
    );
  }

  return (
    <AnimatePresence>
      <motion.div 
        className="min-h-screen bg-background relative"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        {/* Background Grid Pattern */}
        <div className="fixed inset-0 bg-grid-light dark:bg-grid-dark opacity-20 dark:opacity-10 pointer-events-none" />
        
        
        
        <main className="relative z-10">
          <HeroSection />
          <FeaturesSection />
          <StatsSection />
          <PlatformSection />
          <CTASection />
        </main>
        
        
        <AIPoweredHelpSystem />
      </motion.div>
    </AnimatePresence>
  );
}
