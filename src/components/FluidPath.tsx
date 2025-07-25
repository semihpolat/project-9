import React, { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { animate } from 'animejs';
import { Category, Prompt } from '../data/prompts';

interface FluidPathProps {
  category: Category | null;
  onPromptSelect: (prompt: Prompt) => void;
  onClose: () => void;
}

const FluidPath: React.FC<FluidPathProps> = ({ category, onPromptSelect, onClose }) => {
  const pathRef = useRef<SVGPathElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [animationComplete, setAnimationComplete] = useState(false);

  useEffect(() => {
    if (category && pathRef.current && containerRef.current) {
      setAnimationComplete(false);
      
      // Get path length for animation
      const pathLength = pathRef.current.getTotalLength();
      
      // Set initial stroke-dasharray and stroke-dashoffset
      pathRef.current.style.strokeDasharray = `${pathLength}`;
      pathRef.current.style.strokeDashoffset = `${pathLength}`;
      
      // Animate the fluid path
      animate(pathRef.current, {
        strokeDashoffset: 0,
        ease: 'inOutSine',
        duration: 2000,
        onComplete: () => {
          setAnimationComplete(true);
        }
      });

      // Animate container entrance
      animate(containerRef.current, {
        opacity: [0, 1],
        scale: [0.8, 1],
        duration: 1000,
        ease: 'outElastic(1, .8)'
      });
    }
  }, [category]);

  if (!category) return null;

  // Generate fluid path coordinates
  const generateFluidPath = (prompts: Prompt[]) => {
    const width = 1200;
    const height = 800;
    const centerX = width / 2;
    const centerY = height / 2;
    
    let path = `M ${centerX} ${centerY - 200}`;
    
    prompts.forEach((_, index) => {
      const angle = (index * 360) / prompts.length;
      const radius = 150 + Math.sin(angle * 0.02) * 50;
      const x = centerX + Math.cos((angle * Math.PI) / 180) * radius;
      const y = centerY + Math.sin((angle * Math.PI) / 180) * radius;
      
      // Create flowing curves
      const controlX1 = centerX + Math.cos(((angle - 30) * Math.PI) / 180) * (radius * 0.7);
      const controlY1 = centerY + Math.sin(((angle - 30) * Math.PI) / 180) * (radius * 0.7);
      const controlX2 = centerX + Math.cos(((angle + 30) * Math.PI) / 180) * (radius * 0.7);
      const controlY2 = centerY + Math.sin(((angle + 30) * Math.PI) / 180) * (radius * 0.7);
      
      path += ` C ${controlX1} ${controlY1}, ${controlX2} ${controlY2}, ${x} ${y}`;
    });
    
    return path;
  };

  const getPromptPosition = (index: number, total: number) => {
    const angle = (index * 360) / total;
    const radius = 150 + Math.sin(angle * 0.02) * 50;
    const x = 600 + Math.cos((angle * Math.PI) / 180) * radius;
    const y = 400 + Math.sin((angle * Math.PI) / 180) * radius;
    return { x, y };
  };

  return (
    <AnimatePresence>
      <motion.div
        ref={containerRef}
        className="fixed inset-0 bg-gradient-to-br from-black via-gray-900 to-black z-50 overflow-hidden"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.8 }}
      >
        {/* Close button */}
        <motion.button
          onClick={onClose}
          className="absolute top-8 right-8 z-60 text-white hover:text-gold-400 transition-colors"
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.5 }}
        >
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </motion.button>

        {/* Category title */}
        <motion.div
          className="absolute top-16 left-1/2 transform -translate-x-1/2 text-center"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.8 }}
        >
          <h1 className="text-4xl font-light text-white mb-2 tracking-wider">
            {category.name}
          </h1>
          <div 
            className="w-16 h-1 mx-auto rounded-full"
            style={{ backgroundColor: category.color }}
          />
        </motion.div>

        {/* Fluid SVG Path */}
        <svg
          className="absolute inset-0 w-full h-full"
          viewBox="0 0 1200 800"
          preserveAspectRatio="xMidYMid meet"
        >
          <defs>
            <linearGradient id="fluidGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor={category.color} stopOpacity="0.8" />
              <stop offset="50%" stopColor="#FFD700" stopOpacity="0.6" />
              <stop offset="100%" stopColor={category.color} stopOpacity="0.4" />
            </linearGradient>
            <filter id="glow">
              <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
              <feMerge> 
                <feMergeNode in="coloredBlur"/>
                <feMergeNode in="SourceGraphic"/>
              </feMerge>
            </filter>
          </defs>
          
          <path
            ref={pathRef}
            d={generateFluidPath(category.prompts)}
            fill="none"
            stroke="url(#fluidGradient)"
            strokeWidth="3"
            strokeDasharray="10 5"
            filter="url(#glow)"
            opacity="0.7"
          />
        </svg>

        {/* Floating Prompt Bubbles */}
        {animationComplete && category.prompts.map((prompt, index) => {
          const position = getPromptPosition(index, category.prompts.length);
          
          return (
            <motion.div
              key={prompt.id}
              className="absolute cursor-pointer group"
              style={{
                left: position.x - 100,
                top: position.y - 30,
              }}
              initial={{ opacity: 0, scale: 0, rotate: -180 }}
              animate={{ 
                opacity: 1, 
                scale: 1, 
                rotate: 0,
                y: [0, -10, 0],
              }}
              transition={{ 
                delay: index * 0.2,
                duration: 0.8,
                y: {
                  repeat: Infinity,
                  duration: 3 + index * 0.5,
                  ease: "easeInOut"
                }
              }}
              whileHover={{ 
                scale: 1.1,
                rotate: 5,
                transition: { duration: 0.3 }
              }}
              onClick={() => onPromptSelect(prompt)}
            >
              {/* Melted plate background */}
              <div 
                className="absolute inset-0 rounded-full blur-sm opacity-30 group-hover:opacity-50 transition-opacity duration-300"
                style={{
                  background: `radial-gradient(circle, ${category.color}40, transparent)`,
                  width: '220px',
                  height: '80px',
                  transform: 'skew(-10deg, 2deg)',
                }}
              />
              
              {/* Content bubble */}
              <div className="relative bg-black bg-opacity-80 backdrop-blur-sm border border-gray-700 rounded-2xl p-4 w-48 group-hover:border-opacity-100 transition-all duration-300">
                <div 
                  className="absolute top-0 left-0 w-full h-1 rounded-t-2xl"
                  style={{ backgroundColor: category.color }}
                />
                
                <h3 className="text-white text-sm font-medium leading-tight mb-2 group-hover:text-opacity-100 transition-colors">
                  {prompt.title}
                </h3>
                
                <p className="text-gray-400 text-xs leading-relaxed group-hover:text-gray-300 transition-colors">
                  {prompt.description}
                </p>
                
                {/* Floating particles */}
                <div className="absolute -top-2 -right-2 w-2 h-2 rounded-full opacity-60 animate-pulse"
                     style={{ backgroundColor: category.color }} />
                <div className="absolute -bottom-1 -left-1 w-1 h-1 rounded-full opacity-40 animate-pulse"
                     style={{ backgroundColor: category.color }} />
              </div>
            </motion.div>
          );
        })}

        {/* Ambient particles */}
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 rounded-full opacity-30"
            style={{
              backgroundColor: category.color,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -100, 0],
              opacity: [0.3, 0.8, 0.3],
              scale: [1, 1.5, 1],
            }}
            transition={{
              duration: 4 + Math.random() * 4,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </motion.div>
    </AnimatePresence>
  );
};

export default FluidPath;