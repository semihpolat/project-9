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
    if (layout.isActive) {
      onCategorySelect(layout.slug);
    }
  };

  const numeral = romanNumerals[layout.slug as keyof typeof romanNumerals];

  // Simple horizontal distortion based on position
  const getHorizontalWarpEffect = (layout: CategoryLayout, isHovered: boolean) => {
    if (!layout.isActive) {
      return {
        transform: `
          scale(${layout.scale})
          rotate(${layout.rotation}deg)
          skewX(1deg)
        `
      };
    }

    // Simple distortion effects for active items
    const position = parseInt(layout.x.replace('%', ''));
    const isEven = position % 2 === 0;
    
    const baseDistortion = {
      scaleX: isEven ? 1.1 : 0.9,
      scaleY: isEven ? 0.9 : 1.2,
      skewX: isEven ? -5 : 8,
      skewY: isEven ? 3 : -4,
      rotateX: isEven ? 5 : -8,
      rotateY: isEven ? -3 : 6,
    };

    const hoverMultiplier = isHovered ? 1.4 : 1;
    
    return {
      transform: `
        scale(${layout.scale})
        scaleX(${baseDistortion.scaleX * hoverMultiplier})
        scaleY(${baseDistortion.scaleY * hoverMultiplier})
        skewX(${baseDistortion.skewX * hoverMultiplier}deg)
        skewY(${baseDistortion.skewY * hoverMultiplier}deg)
        rotate(${layout.rotation}deg)
        perspective(1000px)
        rotateX(${baseDistortion.rotateX * hoverMultiplier}deg)
        rotateY(${baseDistortion.rotateY * hoverMultiplier}deg)
      `
    };
  };

  const warpEffect = getHorizontalWarpEffect(layout, isHovered);

  return (
    <div
      className={`absolute select-none ${layout.isActive ? 'cursor-pointer' : 'cursor-default'}`}
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
      {/* Roman numeral with spiral warp distortion */}
      <div 
        className="relative flex items-center justify-center transform-gpu"
        style={{
          transition: 'all 0.6s cubic-bezier(0.23, 1, 0.32, 1)',
        }}
      >
        <span
          className={`font-serif font-bold transition-all duration-600 select-none ${
            layout.isActive 
              ? 'text-cartier-black hover:text-cartier-red' 
              : 'text-gray-500 hover:text-gray-400'
          }`}
          style={{ 
            fontSize: 'clamp(48px, 12vw, 180px)',
            lineHeight: '1',
            textShadow: layout.isActive 
              ? (isHovered ? '0 4px 12px rgba(176,18,27,0.4)' : '0 2px 6px rgba(0,0,0,0.15)')
              : '0 1px 3px rgba(0,0,0,0.1)',
            transform: warpEffect.transform,
            transformOrigin: 'center center',
            filter: layout.isActive 
              ? `
                contrast(${isHovered ? '1.1' : '1.0'})
                ${isHovered ? 'drop-shadow(0 0 15px rgba(176,18,27,0.3))' : ''}
              `
              : 'contrast(0.8) brightness(1.2)',
            transition: 'all 0.6s cubic-bezier(0.23, 1, 0.32, 1)',
            opacity: layout.isActive ? 1 : 0.7,
          }}
        >
          {numeral}
        </span>
        
        {/* Glass refraction overlay effect - only for active */}
        {layout.isActive && (
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
        )}
      </div>

      {/* Tooltip - for both active and inactive categories */}
      <div
        className={`absolute top-full left-1/2 transform -translate-x-1/2 mt-4 transition-all duration-300 ${
          showTooltip ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2 pointer-events-none'
        }`}
      >
        <span className={`px-4 py-2 text-sm font-sans uppercase tracking-widest whitespace-nowrap shadow-lg ${
          layout.isActive 
            ? 'bg-cartier-black text-cartier-ivory'
            : 'bg-gray-400 text-white'
        }`}>
          {layout.isActive ? title : 'Coming Soon'}
        </span>
        <div className={`w-0 h-0 border-l-4 border-r-4 border-b-4 border-transparent mx-auto transform -translate-y-1 ${
          layout.isActive ? 'border-b-cartier-black' : 'border-b-gray-400'
        }`}></div>
      </div>
    </div>
  );
};

export default CategoryIcon; 