import { useState, useEffect } from 'react';

export const usePWAPrompt = (): [boolean, () => Promise<boolean>] => {
  const [installPromptEvent, setInstallPromptEvent] = useState<any>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const checkIfAppInstalled = () => {
      return (
        window.matchMedia('(display-mode: standalone)').matches ||
        (window.navigator as any).standalone ||
        document.referrer.includes('android-app://')
      );
    };

    const handleBeforeInstallPrompt = (e: Event) => {
      // Prevent the default browser install prompt
      e.preventDefault();
      // Stash the event so it can be triggered later
      setInstallPromptEvent(e);
      setIsVisible(true);
    };

    const handleAppInstalled = () => {
      console.log('App was installed');
      setIsVisible(false);
      setInstallPromptEvent(null);
    };

    // Check if the app is already installed
    if (checkIfAppInstalled()) {
      setIsVisible(false);
    } else {
      window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    }
    
    window.addEventListener('appinstalled', handleAppInstalled);

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
      window.removeEventListener('appinstalled', handleAppInstalled);
    };
  }, []);

  const triggerInstall = async (): Promise<boolean> => {
    if (!installPromptEvent) return false;
    
    try {
      // Show the install prompt
      installPromptEvent.prompt();
      
      // Wait for the user to respond to the prompt
      const { outcome } = await installPromptEvent.userChoice;
      console.log(`User response to the install prompt: ${outcome}`);
      
      // Clear the installPromptEvent so it can be garbage collected
      setInstallPromptEvent(null);
      setIsVisible(false);
      
      return outcome === 'accepted';
    } catch (error) {
      console.error('Error triggering install prompt:', error);
      return false;
    }
  };

  return [isVisible, triggerInstall];
};

export default usePWAPrompt;
