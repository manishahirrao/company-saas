import { useState, useEffect, useCallback } from 'react';

interface IdleTimerOptions {
  timeout?: number; // in milliseconds
  onIdle?: () => void;
  onActive?: () => void;
  onPrompt?: () => void;
  promptBeforeIdle?: number; // in milliseconds
}

export const useIdleTimer = ({
  timeout = 1000 * 60 * 15, // 15 minutes
  onIdle,
  onActive,
  onPrompt,
  promptBeforeIdle = 1000 * 60, // 1 minute before idle
}: IdleTimerOptions = {}) => {
  const [isIdle, setIsIdle] = useState(false);
  const [isPromptVisible, setIsPromptVisible] = useState(false);
  const [remainingTime, setRemainingTime] = useState(0);
  
  let idleTimer: NodeJS.Timeout;
  let promptTimer: NodeJS.Timeout;
  let lastActiveTime = Date.now();
  
  const clearTimers = useCallback(() => {
    if (idleTimer) clearTimeout(idleTimer);
    if (promptTimer) clearTimeout(promptTimer);
  }, []);
  
  const handleEvent = useCallback(() => {
    lastActiveTime = Date.now();
    
    if (isIdle) {
      setIsIdle(false);
      setIsPromptVisible(false);
      onActive?.();
    }
    
    // Reset the timers
    clearTimers();
    
    // Set up the prompt timer
    if (promptBeforeIdle > 0) {
      promptTimer = setTimeout(() => {
        setIsPromptVisible(true);
        setRemainingTime((timeout - promptBeforeIdle) / 1000);
        onPrompt?.();
        
        // Update remaining time every second
        const interval = setInterval(() => {
          const timeLeft = Math.max(0, Math.ceil((timeout - (Date.now() - lastActiveTime)) / 1000));
          setRemainingTime(timeLeft);
          
          if (timeLeft <= 0) {
            clearInterval(interval);
          }
        }, 1000);
        
        return () => clearInterval(interval);
      }, timeout - promptBeforeIdle);
    }
    
    // Set up the idle timer
    idleTimer = setTimeout(() => {
      setIsIdle(true);
      onIdle?.();
    }, timeout);
    
    return () => {
      clearTimers();
    };
  }, [timeout, promptBeforeIdle, isIdle, onIdle, onActive, onPrompt, clearTimers]);
  
  const resetTimer = useCallback(() => {
    lastActiveTime = Date.now();
    setIsIdle(false);
    setIsPromptVisible(false);
    handleEvent();
  }, [handleEvent]);
  
  const extendSession = useCallback(() => {
    resetTimer();
  }, [resetTimer]);
  
  const logOut = useCallback(() => {
    clearTimers();
    onIdle?.();
  }, [clearTimers, onIdle]);
  
  useEffect(() => {
    // Set up event listeners
    const events = [
      'mousemove',
      'keydown',
      'wheel',
      'DOMMouseScroll',
      'mouseWheel',
      'mousedown',
      'touchstart',
      'touchmove',
      'MSPointerDown',
      'MSPointerMove',
      'visibilitychange'
    ];
    
    events.forEach(event => {
      window.addEventListener(event, handleEvent, { passive: true });
    });
    
    // Initialize the timer
    handleEvent();
    
    // Clean up event listeners
    return () => {
      events.forEach(event => {
        window.removeEventListener(event, handleEvent);
      });
      clearTimers();
    };
  }, [handleEvent, clearTimers]);
  
  return {
    isIdle,
    isPromptVisible,
    remainingTime,
    resetTimer,
    extendSession,
    logOut,
  };
};

export default useIdleTimer;
