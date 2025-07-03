import React from 'react';

interface GridBackgroundProps {
  children: React.ReactNode;
  className?: string;
}

export function GridBackground({ children, className = '' }: GridBackgroundProps) {
  return (
    <div className={`relative ${className}`}>
      {/* Grid Pattern */}
      <div className="fixed inset-0 bg-grid-light dark:bg-grid-dark opacity-20 dark:opacity-50 pointer-events-none -z-10" />
      
      {/* Gradient Overlay */}
      <div className="fixed inset-0 bg-gradient-to-b from-background/90 to-background/70 dark:from-background/95 dark:to-background/90 pointer-events-none -z-10" />
      
      {/* Content */}
      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
}
