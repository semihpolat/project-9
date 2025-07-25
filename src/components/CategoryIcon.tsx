import React, { useRef, useEffect, useState } from 'react';
import { CategoryLayout, romanNumerals } from '../data/categoryLayout';

interface CategoryIconProps {
  layout: CategoryLayout;
  title: string;
  onCategorySelect: (slug: string) => void;
}

const CategoryIcon: React.FC<CategoryIconProps> = ({ layout, title, onCategorySelect }) => {
  const [showTooltip, setShowTooltip] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseEnter = () => {
    setShowTooltip(true);
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setShowTooltip(false);
    setIsHovered(false);
  };

  const handleClick = () => {
    onCategorySelect(layout.slug);
  };

  const numeral = romanNumerals[layout.slug as keyof typeof romanNumerals];

  // Crash distortion effects - physical deformation without clipping
  const getWarpEffect = (slug: string, isHovered: boolean) => {
    const effects = {
      'self-awareness': {
        transform: isHovered
          ? 'scaleY(1.6) scaleX(0.7) skewY(-12deg) perspective(800px) rotateX(8deg)'
          : 'scaleY(1.4) scaleX(0.8) skewY(-8deg) perspective(800px) rotateX(5deg)',
      },
      'decision-making': {
        transform: isHovered
          ? 'scaleX(1.5) scaleY(0.6) skewX(15deg) perspective(800px) rotateY(10deg)'
          : 'scaleX(1.3) scaleY(0.7) skewX(10deg) perspective(800px) rotateY(6deg)',
      },
      'problem-solving': {
        transform: isHovered
          ? 'scaleY(1.3) scaleX(1.2) skewX(-10deg) skewY(8deg) rotate(4deg) perspective(800px) rotateX(-5deg)'
          : 'scaleY(1.2) scaleX(1.1) skewX(-6deg) skewY(5deg) rotate(2deg) perspective(800px) rotateX(-3deg)',
      },
      'creativity': {
        transform: isHovered
          ? 'scaleX(0.5) scaleY(1.8) skewX(-20deg) skewY(15deg) perspective(800px) rotateY(-12deg)'
          : 'scaleX(0.6) scaleY(1.6) skewX(-15deg) skewY(10deg) perspective(800px) rotateY(-8deg)',
      },
      'communication': {
        transform: isHovered
          ? 'scaleX(1.6) scaleY(0.7) skewY(12deg) perspective(800px) rotateX(-8deg)'
          : 'scaleX(1.4) scaleY(0.8) skewY(8deg) perspective(800px) rotateX(-5deg)',
      }
    };
    
    return effects[slug as keyof typeof effects] || effects['self-awareness'];
  };

  const warpEffect = getWarpEffect(layout.slug, isHovered);

  return (
    <div
      className="absolute cursor-pointer select-none"
      style={{
        left: layout.x,
        top: layout.y,
        zIndex: layout.zIndex,
        transform: `rotate(${layout.rotation}deg) scale(${layout.scale})`,
        perspective: '1000px',
      }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={handleClick}
    >
      {/* Roman numeral with physical warp distortion - no clipping */}
      <div 
        className="relative flex items-center justify-center transform-gpu"
        style={{
          transition: 'all 0.6s cubic-bezier(0.23, 1, 0.32, 1)',
        }}
      >
        <span
          className="font-serif font-bold text-cartier-black transition-all duration-600 hover:text-cartier-red select-none"
          style={{ 
            fontSize: 'clamp(48px, 12vw, 180px)',
            lineHeight: '1',
            textShadow: isHovered ? '0 4px 12px rgba(176,18,27,0.4)' : '0 2px 6px rgba(0,0,0,0.15)',
            transform: warpEffect.transform,
            transformOrigin: 'center center',
            filter: `
              contrast(${isHovered ? '1.1' : '1.0'})
              ${isHovered ? 'drop-shadow(0 0 15px rgba(176,18,27,0.3))' : ''}
            `,
            transition: 'all 0.6s cubic-bezier(0.23, 1, 0.32, 1)',
          }}
        >
          {numeral}
        </span>
        
        {/* Glass refraction overlay effect */}
        <div 
          className="absolute inset-0 pointer-events-none opacity-30"
          style={{
            background: isHovered 
              ? 'linear-gradient(45deg, transparent 30%, rgba(255,255,255,0.15) 50%, transparent 70%)'
              : 'linear-gradient(135deg, transparent 40%, rgba(255,255,255,0.08) 60%, transparent 80%)',
            transform: warpEffect.transform,
            transition: 'all 0.6s cubic-bezier(0.23, 1, 0.32, 1)',
          }}
        />
      </div>

      {/* Tooltip */}
      <div
        className={`absolute top-full left-1/2 transform -translate-x-1/2 mt-4 transition-all duration-300 ${
          showTooltip ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2 pointer-events-none'
        }`}
      >
        <span className="bg-cartier-black text-cartier-ivory px-4 py-2 text-sm font-sans uppercase tracking-widest whitespace-nowrap shadow-lg">
          {title}
        </span>
        <div className="w-0 h-0 border-l-4 border-r-4 border-b-4 border-transparent border-b-cartier-black mx-auto transform -translate-y-1"></div>
      </div>
    </div>
  );
};

export default CategoryIcon; 