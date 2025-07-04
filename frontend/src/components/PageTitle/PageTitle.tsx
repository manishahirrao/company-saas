import { useEffect } from 'react';
import { usePageVisibility } from '@/hooks/usePageVisibility';

interface PageTitleProps {
  title: string;
  inactiveTitle?: string;
}

const PageTitle = ({ title, inactiveTitle = '👋 Come back!' }: PageTitleProps) => {
  const isVisible = usePageVisibility();
  const originalTitle = title;

  useEffect(() => {
    document.title = isVisible ? originalTitle : inactiveTitle;
    
    // Reset title when component unmounts
    return () => {
      document.title = originalTitle;
    };
  }, [isVisible, originalTitle, inactiveTitle]);

  return null;
};

export default PageTitle;
