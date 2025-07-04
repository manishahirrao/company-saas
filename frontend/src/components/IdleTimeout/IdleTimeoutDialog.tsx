import { Button } from "@/components/ui/button";
import { AlertCircle, Clock } from 'lucide-react';
import { useEffect, useState } from 'react';

interface IdleTimeoutDialogProps {
  isOpen: boolean;
  remainingTime: number;
  onExtend: () => void;
  onLogout: () => void;
  warningTime?: number; // in seconds
}

const IdleTimeoutDialog = ({
  isOpen,
  remainingTime,
  onExtend,
  onLogout,
  warningTime = 60, // 1 minute
}: IdleTimeoutDialogProps) => {
  const [showWarning, setShowWarning] = useState(false);
  
  useEffect(() => {
    if (isOpen && remainingTime <= warningTime) {
      setShowWarning(true);
    } else {
      setShowWarning(false);
    }
  }, [isOpen, remainingTime, warningTime]);
  
  if (!isOpen) return null;
  
  return (
    <div className="fixed inset-0 z-[100] bg-black/50 flex items-center justify-center p-4">
      <div className="bg-background rounded-lg shadow-xl max-w-md w-full p-6 space-y-4">
        <div className="flex items-start gap-3">
          <div className="mt-0.5">
            {showWarning ? (
              <AlertCircle className="h-5 w-5 text-yellow-500" />
            ) : (
              <Clock className="h-5 w-5 text-blue-500" />
            )}
          </div>
          <div className="space-y-2 flex-1">
            <h3 className="text-lg font-medium">
              {showWarning ? 'Session About to Expire' : 'Are you still there?'}
            </h3>
            <p className="text-sm text-muted-foreground">
              {showWarning 
                ? `Your session will expire in ${remainingTime} seconds due to inactivity.`
                : 'Your session is about to expire due to inactivity.'}
              {!showWarning && ' Would you like to continue?'}
            </p>
            
            {showWarning && (
              <div className="w-full bg-gray-200 rounded-full h-2.5 mt-3">
                <div 
                  className="h-2.5 rounded-full transition-all duration-1000 ease-linear"
                  style={{
                    width: `${(remainingTime / warningTime) * 100}%`,
                    backgroundColor: remainingTime <= 10 ? '#ef4444' : '#f59e0b',
                  }}
                />
              </div>
            )}
            
            <div className="flex justify-end gap-3 pt-2">
              {showWarning ? (
                <Button 
                  variant="outline" 
                  onClick={onExtend}
                  className="bg-blue-600 hover:bg-blue-700 text-white"
                >
                  Stay Signed In
                </Button>
              ) : (
                <>
                  <Button 
                    variant="outline" 
                    onClick={onLogout}
                  >
                    Sign Out
                  </Button>
                  <Button 
                    onClick={onExtend}
                  >
                    Continue Session
                  </Button>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default IdleTimeoutDialog;
