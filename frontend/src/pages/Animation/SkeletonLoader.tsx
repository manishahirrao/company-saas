import { motion } from "framer-motion";

interface SkeletonProps {
  className?: string;
  variant?: "text" | "circular" | "rectangular" | "card";
  animation?: "pulse" | "wave" | "shimmer";
}

export function Skeleton({ 
  className = "", 
  variant = "rectangular", 
  animation = "shimmer" 
}: SkeletonProps) {
  const baseClasses = "bg-muted rounded animate-pulse";
  
  const variantClasses = {
    text: "h-4 w-full",
    circular: "rounded-full w-10 h-10",
    rectangular: "h-24 w-full",
    card: "h-48 w-full"
  };

  const shimmerAnimation = {
    backgroundPosition: ["200% 0", "-200% 0"],
  };

  const waveAnimation = {
    scale: [1, 1.05, 1],
    opacity: [0.7, 1, 0.7]
  };

  const getAnimation = () => {
    switch (animation) {
      case "shimmer":
        return {
          background: [
            "linear-gradient(90deg, hsl(var(--muted)) 25%, hsl(var(--muted-foreground) / 0.1) 50%, hsl(var(--muted)) 75%)",
            "linear-gradient(90deg, hsl(var(--muted)) 25%, hsl(var(--muted-foreground) / 0.1) 50%, hsl(var(--muted)) 75%)"
          ],
          backgroundPosition: shimmerAnimation.backgroundPosition,
        };
      case "wave":
        return waveAnimation;
      default:
        return {};
    }
  };

  return (
    <motion.div
      className={`${baseClasses} ${variantClasses[variant]} ${className}`}
      animate={getAnimation()}
      transition={{
        duration: animation === "shimmer" ? 2 : 1.5,
        repeat: Infinity,
        ease: "easeInOut"
      }}
      style={animation === "shimmer" ? {
        backgroundSize: "200% 100%",
        background: "linear-gradient(90deg, hsl(var(--muted)) 25%, hsl(var(--muted-foreground) / 0.1) 50%, hsl(var(--muted)) 75%)"
      } : {}}
    />
  );
}

export function SkeletonCard() {
  return (
    <div className="space-y-4 p-4 border border-border rounded-lg">
      <div className="flex items-center space-x-4">
        <Skeleton variant="circular" />
        <div className="space-y-2 flex-1">
          <Skeleton variant="text" className="h-4 w-3/4" />
          <Skeleton variant="text" className="h-3 w-1/2" />
        </div>
      </div>
      <Skeleton variant="rectangular" className="h-32" />
      <div className="space-y-2">
        <Skeleton variant="text" className="h-3 w-full" />
        <Skeleton variant="text" className="h-3 w-4/5" />
        <Skeleton variant="text" className="h-3 w-3/5" />
      </div>
    </div>
  );
}

export function SkeletonNav() {
  return (
    <div className="flex items-center justify-between p-4">
      <div className="flex items-center space-x-4">
        <Skeleton variant="circular" className="w-8 h-8" />
        <Skeleton variant="text" className="h-6 w-20" />
      </div>
      <div className="hidden md:flex space-x-6">
        {Array.from({ length: 4 }).map((_, i) => (
          <Skeleton key={i} variant="text" className="h-4 w-16" />
        ))}
      </div>
      <div className="flex space-x-2">
        <Skeleton variant="circular" className="w-8 h-8" />
        <Skeleton variant="rectangular" className="h-8 w-20" />
      </div>
    </div>
  );
}