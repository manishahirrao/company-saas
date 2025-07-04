import { useState, useEffect, useCallback } from 'react';

type NotificationPermission = 'default' | 'granted' | 'denied';

interface NotificationOptions {
  title: string;
  body?: string;
  icon?: string;
  requireInteraction?: boolean;
  onClick?: () => void;
}

export const useNotifications = () => {
  const [permission, setPermission] = useState<NotificationPermission>('default');
  const [isSupported, setIsSupported] = useState(false);

  useEffect(() => {
    setIsSupported('Notification' in window);
    if ('Notification' in window) {
      setPermission(Notification.permission as NotificationPermission);
    }
  }, []);

  const requestPermission = useCallback(async (): Promise<NotificationPermission> => {
    if (!isSupported) return 'denied';
    
    try {
      const permissionResult = await Notification.requestPermission();
      setPermission(permissionResult as NotificationPermission);
      return permissionResult as NotificationPermission;
    } catch (error) {
      console.error('Error requesting notification permission:', error);
      return 'denied';
    }
  }, [isSupported]);

  const showNotification = useCallback(async ({
    title,
    body = '',
    icon = '/favicon.ico',
    requireInteraction = false,
    onClick
  }: NotificationOptions): Promise<Notification | null> => {
    if (!isSupported) return null;
    
    // If permission is not granted, request it
    if (permission !== 'granted') {
      const newPermission = await requestPermission();
      if (newPermission !== 'granted') {
        return null;
      }
    }

    // Create and show the notification
    const notification = new Notification(title, {
      body,
      icon,
      requireInteraction
    });

    // Handle click event if provided
    if (onClick) {
      notification.onclick = onClick;
    }

    return notification;
  }, [isSupported, permission, requestPermission]);

  return {
    isSupported,
    permission,
    requestPermission,
    showNotification
  };
};

export default useNotifications;
