import { useNetworkStatus } from "@/hooks/useNetworkStatus";
import { Wifi, WifiOff } from 'lucide-react';

const NetworkStatus = () => {
  const { isOnline, wasOffline } = useNetworkStatus();

  if (isOnline && !wasOffline) return null;

  return (
    <div className={`fixed bottom-4 left-4 z-50 flex items-center gap-2 px-4 py-2 rounded-lg shadow-lg ${
      isOnline ? 'bg-green-500/90 text-white' : 'bg-red-500/90 text-white'
    }`}>
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

export default NetworkStatus;
