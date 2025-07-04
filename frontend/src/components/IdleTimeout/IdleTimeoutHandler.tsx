import { useIdleTimer } from "@/hooks/useIdleTimer";
import IdleTimeoutDialog from "./IdleTimeoutDialog";
import { useAuth } from "@/contexts/AuthContext";
import { useNavigate } from "react-router-dom";

const IDLE_TIMEOUT = 1000 * 60 * 30; // 30 minutes
const PROMPT_BEFORE_IDLE = 1000 * 60 * 1; // 1 minute before idle

const IdleTimeoutHandler = () => {
  const { signOut } = useAuth();
  const navigate = useNavigate();
  
  const handleIdle = async () => {
    // User is idle, log them out
    console.log('User is idle, logging out...');
    await signOut();
    navigate('/login');
  };
  
  const handleLogout = async () => {
    console.log('User chose to log out');
    await signOut();
    navigate('/login');  
  };
  
  const {
    isIdle,
    isPromptVisible,
    remainingTime,
    extendSession,
    logOut,
  } = useIdleTimer({
    timeout: IDLE_TIMEOUT,
    promptBeforeIdle: PROMPT_BEFORE_IDLE,
    onIdle: handleIdle,
  });
  
  // Handle the case where the user is idle but we haven't logged them out yet
  if (isIdle) {
    return null;
  }
  
  return (
    <IdleTimeoutDialog
      isOpen={isPromptVisible}
      remainingTime={remainingTime}
      onExtend={extendSession}
      onLogout={handleLogout}
    />
  );
};

export default IdleTimeoutHandler;
