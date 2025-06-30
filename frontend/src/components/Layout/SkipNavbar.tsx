import React from 'react';
import { Button } from '@/components/ui/button';

export const SkipNavbar: React.FC = () => {
  return (
    <a
      href="#main-content"
      className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-white focus:ring-2 focus:ring-blue-600 focus:rounded"
    >
      Skip to content
    </a>
  );
};

export default SkipNavbar;
