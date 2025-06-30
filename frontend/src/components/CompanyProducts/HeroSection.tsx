import React from 'react';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

interface HeroSectionProps {
  title: string | React.ReactNode;
  subtitle: string;
  description: string;
  ctaText?: string;
  secondaryCtaText?: string;
}

const HeroSection = ({ 
  title, 
  subtitle, 
  description, 
  ctaText = "Get Started",
  secondaryCtaText = "Request Demo",
}: HeroSectionProps) => {
  const renderTitle = () => {
    if (typeof title === 'string') {
      return (
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
          {title}
        </h1>
      );
    }
    return (
      <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
        {title}
      </h1>
    );
  };

  return (
    <section className="relative py-20 lg:py-32">
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center animate-fade-in">
          {renderTitle()}
          <p className="text-xl md:text-2xl lg:text-3xl font-light mb-6 text-gray-800">
            {subtitle}
          </p>
          <p className="text-lg md:text-xl max-w-3xl mx-auto mb-10 text-gray-600 leading-relaxed">
            {description}
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center animate-slide-up">
            <Button 
              size="lg" 
              className="bg-gradient-to-r from-purple-600 to-pink-500 text-white hover:from-purple-700 hover:to-pink-600 px-8 py-3 text-lg font-semibold transition-all duration-300 transform hover:scale-105"
            >
              {ctaText}
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Button 
              variant="outline" 
              size="lg"
              className="border-gray-800 text-gray-800 hover:bg-gray-800 hover:text-white px-8 py-3 text-lg font-semibold transition-all duration-300"
            >
              {secondaryCtaText}
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;