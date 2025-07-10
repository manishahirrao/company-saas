import { motion } from "framer-motion";
import { useState, useEffect } from "react";

interface AdvancedVortexAnimationProps {
  size?: "sm" | "md" | "lg" | "xl";
  complexity?: "simple" | "medium" | "complex" | "hypnotic";
  className?: string;
}

export function AdvancedVortexAnimation({ 
  size = "lg", 
  complexity = "complex",
  className = "" 
}: AdvancedVortexAnimationProps) {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const sizeMap = {
    sm: { container: 80, radius: 30, core: 8 },
    md: { container: 150, radius: 60, core: 12 },
    lg: { container: 200, radius: 80, core: 16 },
    xl: { container: 300, radius: 120, core: 24 }
  };

  const dimensions = sizeMap[size];

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const rect = document.getElementById('vortex-container')?.getBoundingClientRect();
      if (rect) {
        setMousePosition({
          x: (e.clientX - rect.left - rect.width / 2) / rect.width,
          y: (e.clientY - rect.top - rect.height / 2) / rect.height
        });
      }
    };

    if (isHovered) {
      window.addEventListener('mousemove', handleMouseMove);
    }

    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [isHovered]);

  const generateParticles = () => {
    const particleCount = complexity === "simple" ? 6 : 
                        complexity === "medium" ? 12 : 
                        complexity === "complex" ? 18 : 24;

    return Array.from({ length: particleCount }, (_, i) => {
      const angle = (360 / particleCount) * i;
      const radius = dimensions.radius * (0.7 + Math.random() * 0.6);
      const x = Math.cos((angle * Math.PI) / 180) * radius;
      const y = Math.sin((angle * Math.PI) / 180) * radius;

      return (
        <motion.circle
          key={i}
          cx={x}
          cy={y}
          r={3}
          fill="url(#vortexGradient)"
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ 
            opacity: [0.2, 0.8, 0.2],
            scale: [0.8, 1.2, 0.8],
          }}
          transition={{
            duration: 2 + Math.random() * 2,
            repeat: Infinity,
            delay: i * 0.1,
            ease: "easeInOut"
          }}
        />
      );
    });
  };

  return (
    <div 
      id="vortex-container"
      className={`relative ${className}`}
      style={{ width: dimensions.container, height: dimensions.container }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <svg 
        viewBox={`0 0 ${dimensions.container} ${dimensions.container}`} 
        className="w-full h-full"
      >
        <defs>
          <linearGradient id="vortexGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#ff0080" />
            <stop offset="25%" stopColor="#7c3aed" />
            <stop offset="50%" stopColor="#2563eb" />
            <stop offset="75%" stopColor="#06b6d4" />
            <stop offset="100%" stopColor="#10b981" />
          </linearGradient>
        </defs>
        
        <g transform={`translate(${dimensions.container/2}, ${dimensions.container/2})`}>
          <motion.g
            animate={{
              rotate: 360,
              x: mousePosition.x * 10,
              y: mousePosition.y * 10
            }}
            transition={{
              rotate: { duration: 20, ease: "linear", repeat: Infinity },
              x: { type: "spring", stiffness: 50, damping: 20 },
              y: { type: "spring", stiffness: 50, damping: 20 }
            }}
          >
            {generateParticles()}
          </motion.g>
          
          <motion.circle
            cx={0}
            cy={0}
            r={dimensions.core}
            fill="url(#vortexGradient)"
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.8, 1, 0.8]
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        </g>
      </svg>
    </div>
  );
}

export function VortexSVG() {
    return (
      <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
        <defs>
          {/* Revolutionary gradient inspired by cutting-edge AI companies */}
          <linearGradient id="vortexGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" style={{stopColor:"#ff0080", stopOpacity:1}} />
            <stop offset="25%" style={{stopColor:"#7c3aed", stopOpacity:1}} />
            <stop offset="50%" style={{stopColor:"#2563eb", stopOpacity:1}} />
            <stop offset="75%" style={{stopColor:"#06b6d4", stopOpacity:1}} />
            <stop offset="100%" style={{stopColor:"#10b981", stopOpacity:1}} />
          </linearGradient>
          
          {/* Vortex core energy */}
          <radialGradient id="vortexCore" cx="50%" cy="50%" r="50%">
            <stop offset="0%" style={{stopColor:"#ffffff", stopOpacity:1}} />
            <stop offset="30%" style={{stopColor:"#ff0080", stopOpacity:0.8}} />
            <stop offset="60%" style={{stopColor:"#7c3aed", stopOpacity:0.6}} />
            <stop offset="100%" style={{stopColor:"#2563eb", stopOpacity:0.3}} />
          </radialGradient>
          
          {/* Premium glow effect */}
          <filter id="premiumGlow">
            <feGaussianBlur stdDeviation="6" result="coloredBlur"/>
            <feMerge> 
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
        </defs>
        
        {/* Outer vortex rings */}
        <g opacity="0.4">
          <circle cx="50" cy="50" r="45" fill="none" stroke="url(#vortexGradient)" strokeWidth="2">
            <animateTransform attributeName="transform" type="rotate" values="0 50 50;360 50 50" dur="20s" repeatCount="indefinite"/>
          </circle>
          <circle cx="50" cy="50" r="35" fill="none" stroke="url(#vortexGradient)" strokeWidth="1.5" opacity="0.7">
            <animateTransform attributeName="transform" type="rotate" values="360 50 50;0 50 50" dur="15s" repeatCount="indefinite"/>
          </circle>
          <circle cx="50" cy="50" r="25" fill="none" stroke="url(#vortexGradient)" strokeWidth="1" opacity="0.5">
            <animateTransform attributeName="transform" type="rotate" values="0 50 50;360 50 50" dur="10s" repeatCount="indefinite"/>
          </circle>
        </g>
        
        {/* Dynamic vortex spirals */}
        <g stroke="url(#vortexGradient)" strokeWidth="3" fill="none" opacity="0.8">
          <path d="M50,10 Q70,30 50,50 Q30,70 50,90 Q70,70 50,50 Q30,30 50,10">
            <animateTransform attributeName="transform" type="rotate" values="0 50 50;360 50 50" dur="8s" repeatCount="indefinite"/>
            <animate attributeName="opacity" values="0.8;1;0.8" dur="4s" repeatCount="indefinite"/>
          </path>
          <path d="M50,15 Q65,35 50,50 Q35,65 50,85 Q65,65 50,50 Q35,35 50,15">
            <animateTransform attributeName="transform" type="rotate" values="180 50 50;540 50 50" dur="6s" repeatCount="indefinite"/>
            <animate attributeName="opacity" values="0.6;0.9;0.6" dur="3s" repeatCount="indefinite"/>
          </path>
        </g>
        
        {/* AI operation nodes (representing different services) */}
        <g filter="url(#premiumGlow)">
          {/* Social Media Node */}
          <circle cx="25" cy="25" r="8" fill="url(#vortexGradient)" opacity="0.9">
            <animate attributeName="r" values="8;12;8" dur="4s" repeatCount="indefinite"/>
            <animate attributeName="opacity" values="0.9;1;0.9" dur="4s" repeatCount="indefinite"/>
          </circle>
          
          {/* HR Operations Node */}
          <circle cx="75" cy="25" r="8" fill="url(#vortexGradient)" opacity="0.9">
            <animate attributeName="r" values="8;12;8" dur="4s" begin="1s" repeatCount="indefinite"/>
            <animate attributeName="opacity" values="0.9;1;0.9" dur="4s" begin="1s" repeatCount="indefinite"/>
          </circle>
          
          {/* AI Automation Node */}
          <circle cx="25" cy="75" r="8" fill="url(#vortexGradient)" opacity="0.9">
            <animate attributeName="r" values="8;12;8" dur="4s" begin="2s" repeatCount="indefinite"/>
            <animate attributeName="opacity" values="0.9;1;0.9" dur="4s" begin="2s" repeatCount="indefinite"/>
          </circle>
          
          {/* Operations Hub Node */}
          <circle cx="75" cy="75" r="8" fill="url(#vortexGradient)" opacity="0.9">
            <animate attributeName="r" values="8;12;8" dur="4s" begin="3s" repeatCount="indefinite"/>
            <animate attributeName="opacity" values="0.9;1;0.9" dur="4s" begin="3s" repeatCount="indefinite"/>
          </circle>
        </g>
        
        {/* Central vortex core */}
        <circle cx="50" cy="50" r="15" fill="url(#vortexCore)" filter="url(#premiumGlow)"/>
        <circle cx="50" cy="50" r="8" fill="white" opacity="0.95"/>
        <circle cx="50" cy="50" r="4" fill="url(#vortexGradient)">
          <animate attributeName="r" values="4;7;4" dur="2s" repeatCount="indefinite"/>
        </circle>
        
        {/* Data streams flowing into vortex */}
        <g stroke="url(#vortexGradient)" strokeWidth="2" fill="none" opacity="0.6">
          <path d="M25,25 Q37,37 50,50">
            <animate attributeName="stroke-dasharray" values="0,100;50,50;100,0" dur="3s" repeatCount="indefinite"/>
          </path>
          <path d="M75,25 Q63,37 50,50">
            <animate attributeName="stroke-dasharray" values="0,100;50,50;100,0" dur="3s" begin="0.75s" repeatCount="indefinite"/>
          </path>
          <path d="M25,75 Q37,63 50,50">
            <animate attributeName="stroke-dasharray" values="0,100;50,50;100,0" dur="3s" begin="1.5s" repeatCount="indefinite"/>
          </path>
          <path d="M75,75 Q63,63 50,50">
            <animate attributeName="stroke-dasharray" values="0,100;50,50;100,0" dur="3s" begin="2.25s" repeatCount="indefinite"/>
          </path>
        </g>
      </svg>
    );
  }