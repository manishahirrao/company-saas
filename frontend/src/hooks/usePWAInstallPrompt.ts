import { useState, useEffect } from 'react';

export const usePWAInstallPrompt = () => {
  const [canInstall, setCanInstall] = useState(false);
  const [prompt, setPrompt] = useState<any>(null);
  const [isAppInstalled, setIsAppInstalled] = useState(false);

  useEffect(() => {
    // Check if the app is already installed
    const checkIfAppInstalled = () => {
      return (
        window.matchMedia('(display-mode: standalone)').matches ||
        (window.navigator as any).standalone ||
        document.referrer.includes('android-app://')
      );
    };

    setIsAppInstalled(checkIfAppInstalled());

    const handler = (e: any) => {
      e.preventDefault();
      setPrompt(e);
      setCanInstall(true);
    };

    window.addEventListener('beforeinstallprompt', handler);
    
    // Listen for app installed event
    const handleAppInstalled = () => {
      console.log('App was installed');
      setIsAppInstalled(true);
      setCanInstall(false);
    };
    
    window.addEventListener('appinstalled', handleAppInstalled);

    return () => {
      window.removeEventListener('beforeinstallprompt', handler);
      window.removeEventListener('appinstalled', handleAppInstalled);
    };
  }, []);

  const triggerInstall = async () => {
    if (!prompt) return false;
    
    try {
      prompt.prompt();
      const { outcome } = await prompt.userChoice;
      
      setPrompt(null);
      setCanInstall(false);
      
      return outcome === 'accepted';
    } catch (error) {
      console.error('Error triggering install prompt:', error);
      return false;
    }
  };

  return {
    canInstall: canInstall && !isAppInstalled,
    isAppInstalled,
    triggerInstall,
  };
};

export default usePWAInstallPrompt;
