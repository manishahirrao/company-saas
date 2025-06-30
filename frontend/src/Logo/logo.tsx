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
      const radiusVariant = 0.6 + (i % 3) * 0.2;
      const speed = complexity === "hypnotic" ? 8 + (i % 3) * 4 : 12 + (i % 3) * 8;
      
      return (
        <motion.div
          key={`particle-${i}`}
          className="absolute"
          style={{
            width: dimensions.core / 2,
            height: dimensions.core / 2,
            left: '50%',
            top: '50%',
            transformOrigin: 'center',
          }}
          animate={{
            rotate: 360,
            scale: isHovered ? [1, 1.5, 1] : 1,
            x: isHovered ? mousePosition.x * 20 : 0,
            y: isHovered ? mousePosition.y * 20 : 0,
          }}
          transition={{
            rotate: {
              duration: speed,
              repeat: Infinity,
              ease: "linear",
            },
            scale: {
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
            },
            x: { duration: 0.5 },
            y: { duration: 0.5 },
          }}
        >
          <motion.div
            className={`w-full h-full rounded-full ${
              i % 4 === 0 ? 'bg-electric-purple' :
              i % 4 === 1 ? 'bg-neon-blue' :
              i % 4 === 2 ? 'bg-aqua-teal' : 'bg-warm-yellow'
            }`}
            style={{
              transform: `translateX(${dimensions.radius * radiusVariant}px) translateY(-50%)`,
              filter: complexity === "hypnotic" ? 
                `drop-shadow(0 0 ${8 + i % 3 * 4}px currentColor)` : 
                'drop-shadow(0 0 6px currentColor)',
            }}
            animate={{
              opacity: complexity === "hypnotic" ? [0.4, 1, 0.4] : [0.6, 1, 0.6],
            }}
            transition={{
              opacity: {
                duration: 2 + (i % 3),
                repeat: Infinity,
                ease: "easeInOut",
              },
            }}
          />
        </motion.div>
      );
    });
  };

  const generateOrbitRings = () => {
    const ringCount = complexity === "simple" ? 2 : 
                     complexity === "medium" ? 3 : 4;

    return Array.from({ length: ringCount }, (_, i) => (
      <motion.div
        key={`ring-${i}`}
        className="absolute border rounded-full"
        style={{
          width: dimensions.radius * 2 * (0.4 + i * 0.3),
          height: dimensions.radius * 2 * (0.4 + i * 0.3),
          left: '50%',
          top: '50%',
          transform: 'translate(-50%, -50%)',
          borderColor: `hsla(283, 91%, 57%, ${0.1 + i * 0.05})`,
          borderWidth: 1,
        }}
        animate={{
          rotate: i % 2 === 0 ? 360 : -360,
          scale: isHovered ? [1, 1.1, 1] : 1,
        }}
        transition={{
          rotate: {
            duration: 20 + i * 5,
            repeat: Infinity,
            ease: "linear",
          },
          scale: {
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut",
          },
        }}
      />
    ));
  };

  return (
    <div 
      id="vortex-container"
      className={`relative ${className}`}
      style={{ width: dimensions.container, height: dimensions.container }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Background Rings */}
      {generateOrbitRings()}

      {/* Central Core */}
      <motion.div
        className="absolute bg-gradient-to-br from-electric-purple via-neon-blue to-aqua-teal rounded-full"
        style={{
          width: dimensions.core,
          height: dimensions.core,
          left: '50%',
          top: '50%',
          transform: 'translate(-50%, -50%)',
          filter: 'drop-shadow(0 0 20px hsla(283, 91%, 57%, 0.8))',
        }}
        animate={{
          scale: isHovered ? [1, 1.3, 1] : [1, 1.1, 1],
          rotate: 360,
        }}
        transition={{
          scale: {
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
          },
          rotate: {
            duration: 4,
            repeat: Infinity,
            ease: "linear",
          },
        }}
      />

      {/* Orbiting Particles */}
      {generateParticles()}

      {/* Energy Waves */}
      {complexity === "hypnotic" && (
        <motion.div
          className="absolute inset-0"
          animate={{
            background: [
              'radial-gradient(circle, hsla(283, 91%, 57%, 0.1) 0%, transparent 70%)',
              'radial-gradient(circle, hsla(191, 100%, 50%, 0.1) 0%, transparent 70%)',
              'radial-gradient(circle, hsla(169, 100%, 44%, 0.1) 0%, transparent 70%)',
            ],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          style={{ borderRadius: '50%' }}
        />
      )}
    </div>
  );
}