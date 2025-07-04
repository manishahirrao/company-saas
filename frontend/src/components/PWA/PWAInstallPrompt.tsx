import { Button } from "@/components/ui/button";
import { X, Bell, BellOff } from 'lucide-react';
import { usePWAPrompt } from "@/hooks/usePWAPrompt";
import { useNotifications } from "@/hooks/useNotifications";
import { useState, useEffect } from 'react';

export const PWAInstallPrompt = () => {
  const { isSupported: isNotificationsSupported, permission, requestPermission } = useNotifications();
  const [isInstallPromptVisible, triggerInstall] = usePWAPrompt();
  const [isDismissed, setIsDismissed] = useState(false);
  
  const handleInstallClick = async () => {
    await triggerInstall();
  };
  
  const handleEnableNotifications = async () => {
    if (permission === 'default') {
      await requestPermission();
    } else if (permission === 'denied') {
      // If previously denied, we can guide the user to enable it manually
      alert('Please enable notifications in your browser settings to receive updates.');
    }
  };
  
  if (!isInstallPromptVisible || isDismissed) return null;
  
  const NotificationsButton = () => {
    if (!isNotificationsSupported) return null;
    
    return (
      <Button
        variant="outline"
        size="sm"
        onClick={handleEnableNotifications}
        className="h-8 gap-1"
      >
        {permission === 'granted' ? (
          <>
            <Bell className="h-4 w-4" />
            <span>Notifications Enabled</span>
          </>
        ) : (
          <>
            <BellOff className="h-4 w-4" />
            <span>Enable Notifications</span>
          </>
        )}
      </Button>
    );
  };

  return (
    <div className="fixed bottom-4 right-4 z-50 flex flex-col gap-4">
      <div className="flex items-center gap-4 bg-background border border-border rounded-lg shadow-lg p-4 max-w-md">
        <div className="flex-1">
          <h3 className="font-medium">Install VORTEX</h3>
          <p className="text-sm text-muted-foreground">Add VORTEX to your home screen for a better experience.</p>
        </div>
        <div className="flex items-center gap-2">
          <Button 
            variant="outline" 
            size="sm" 
            onClick={() => setIsDismissed(true)}
            className="h-8 w-8 p-0 flex items-center justify-center"
          >
            <X className="h-4 w-4" />
            <span className="sr-only">Dismiss</span>
          </Button>
          <Button 
            size="sm" 
            onClick={handleInstallClick}
            className="h-8"
          >
            Install
          </Button>
        </div>
      </div>
      
      {isNotificationsSupported && permission !== 'granted' && (
        <div className="flex items-center gap-4 bg-background border border-border rounded-lg shadow-lg p-4 max-w-md">
          <div className="flex-1">
            <h3 className="font-medium">Enable Notifications</h3>
            <p className="text-sm text-muted-foreground">Get important updates and alerts.</p>
          </div>
          <NotificationsButton />
        </div>
      )}
    </div>
  );
};

export default PWAInstallPrompt;
