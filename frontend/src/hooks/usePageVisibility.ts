import { useState, useEffect } from 'react';

export const usePageVisibility = () => {
  const [isVisible, setIsVisible] = useState(!document.hidden);
  const [visibilityChange, setVisibilityChange] = useState('');

  useEffect(() => {
    // Set the name of the hidden property and the change event for visibility
    let hidden: string | undefined;
    let visibilityChangeEvent: string | undefined;

    if (typeof document.hidden !== 'undefined') { // Standard
      hidden = 'hidden';
      visibilityChangeEvent = 'visibilitychange';
    } else if (typeof (document as any).msHidden !== 'undefined') { // IE 10 and earlier
      hidden = 'msHidden';
      visibilityChangeEvent = 'msvisibilitychange';
    } else if (typeof (document as any).webkitHidden !== 'undefined') { // Chrome, Firefox < 17, Safari < 7
      hidden = 'webkitHidden';
      visibilityChangeEvent = 'webkitvisibilitychange';
    }

    setVisibilityChange(visibilityChangeEvent || 'visibilitychange');

    const handleVisibilityChange = () => {
      if (hidden) {
        setIsVisible(!(document as any)[hidden]);
      }
    };

    // Warn if the browser doesn't support addEventListener or the Page Visibility API
    if (typeof document.addEventListener === 'undefined' || hidden === undefined) {
      console.warn('This browser does not support the Page Visibility API.');
      return;
    }

    // Handle page visibility change
    document.addEventListener(visibilityChangeEvent, handleVisibilityChange, false);

    return () => {
      document.removeEventListener(visibilityChangeEvent, handleVisibilityChange);
    };
  }, []);

  return isVisible;
};

export default usePageVisibility;
