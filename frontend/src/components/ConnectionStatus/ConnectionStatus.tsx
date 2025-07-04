import { useConnectionStatus } from "@/hooks/useConnectionStatus";
import { Wifi, WifiOff } from 'lucide-react';
import { useEffect, useState } from 'react';

const ConnectionStatus = () => {
  const { isOnline, wasOffline } = useConnectionStatus();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (!isOnline || wasOffline) {
      setIsVisible(true);
      
      if (isOnline && wasOffline) {
        const timer = setTimeout(() => {
          setIsVisible(false);
        }, 3000);
        
        return () => clearTimeout(timer);
      }
    } else {
      setIsVisible(false);
    }
  }, [isOnline, wasOffline]);

  if (!isVisible) return null;

  return (
    <div 
      className={`fixed bottom-4 left-4 z-50 flex items-center gap-2 px-4 py-2 rounded-lg shadow-lg transition-all duration-300 ${
        isOnline 
          ? 'bg-green-500/90 text-white' 
          : 'bg-red-500/90 text-white'
      }`}
    >
      {isOnline ? (
        <>
          <Wifi className="h-4 w-4" />
          <span>Back online</span>
        </>
      ) : (
        <>
          <WifiOff className="h-4 w-4" />
          <span>You're offline. Some features may be limited.</span>
        </>
      )}
    </div>
  );
};

export default ConnectionStatus;
