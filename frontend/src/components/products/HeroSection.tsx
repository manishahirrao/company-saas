
import React from 'react';

interface HeroSectionProps {
  title: string;
  subtitle: string;
  backgroundGradient?: string;
}

const HeroSection: React.FC<HeroSectionProps> = ({ 
  title, 
  subtitle, 
  backgroundGradient = "from-indigo-600 to-purple-600" 
}) => {
  return (
    <section className={`relative bg-gradient-to-r ${backgroundGradient} text-white py-20`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            {title}
          </h1>
          <p className="text-xl md:text-2xl text-gray-100 max-w-3xl mx-auto">
            {subtitle}
          </p>
        </div>
      </div>
      <div className="absolute inset-0 bg-black opacity-10"></div>
    </section>
  );
};

export default HeroSection;
