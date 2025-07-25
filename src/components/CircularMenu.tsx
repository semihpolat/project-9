import React, { useState } from 'react';
import { motion, AnimatePresence, useAnimation } from 'framer-motion';
import * as Icons from 'lucide-react';
import { categories, Category } from '../data/prompts';
import { animate } from 'animejs';

interface CircularMenuProps {
  onCategorySelect: (category: Category) => void;
}

const CircularMenu: React.FC<CircularMenuProps> = ({ onCategorySelect }) => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const controls = useAnimation();
  
  const centerX = 200;
  const centerY = 200;
  const radius = 120;
  
  const getPosition = (index: number, total: number) => {
    const angle = (index * 2 * Math.PI) / total - Math.PI / 2;
    const x = centerX + radius * Math.cos(angle);
    const y = centerY + radius * Math.sin(angle);
    return { x, y };
  };

  const handleCategoryClick = (category: Category, index: number) => {
    setSelectedIndex(index);
    
    // Create ripple effect
    animate(`.category-${index}`, {
      scale: [1, 1.3, 1],
      duration: 600,
      ease: 'outElastic(1, .6)'
    });
    
    // Animate other circles away
    categories.forEach((_, i) => {
      if (i !== index) {
        animate(`.category-${i}`, {
          scale: [1, 0],
          opacity: [1, 0],
          duration: 400,
          delay: i * 50,
          ease: 'inBack'
        });
      }
    });
    
    setTimeout(() => {
      onCategorySelect(category);
    }, 800);
  };
  return (
    <div className="relative w-96 h-96 mx-auto">
      {/* Center circle */}
      <motion.div
        className="absolute w-20 h-20 bg-white rounded-full shadow-lg flex items-center justify-center"
        style={{
          left: centerX - 40,
          top: centerY - 40,
        }}
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.5, type: "spring", stiffness: 200 }}
      >
        <Icons.Sparkles className="w-8 h-8 text-gray-600" />
      </motion.div>

      {/* Category circles */}
      {categories.map((category, index) => {
        const position = getPosition(index, categories.length);
        const IconComponent = Icons[category.icon as keyof typeof Icons] as React.ComponentType<any>;
        
        return (
          <motion.button
            key={category.id}
            className={`category-${index} absolute w-16 h-16 bg-white rounded-full shadow-lg hover:shadow-xl flex items-center justify-center transition-all duration-300 group overflow-hidden`}
            style={{
              left: position.x - 32,
              top: position.y - 32,
              backgroundColor: hoveredIndex === index ? category.color : 'white',
            }}
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ 
              delay: index * 0.1, 
              type: "spring", 
              stiffness: 200 
            }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            onMouseEnter={() => setHoveredIndex(index)}
            onMouseLeave={() => setHoveredIndex(null)}
            onClick={() => handleCategoryClick(category, index)}
          >
            {/* Liquid background effect */}
            <motion.div
              className="absolute inset-0 rounded-full"
              style={{
                background: `radial-gradient(circle at 30% 30%, ${category.color}20, transparent 70%)`,
              }}
              animate={{
                scale: hoveredIndex === index ? [1, 1.2, 1] : 1,
                rotate: hoveredIndex === index ? [0, 180, 360] : 0,
              }}
              transition={{
                duration: 2,
                repeat: hoveredIndex === index ? Infinity : 0,
                ease: "linear"
              }}
            />
            
            <IconComponent 
              className={`relative z-10 w-6 h-6 transition-colors duration-300 ${
                hoveredIndex === index ? 'text-white' : 'text-gray-600'
              }`}
            />
            
            {/* Category name tooltip */}
            <AnimatePresence>
              {hoveredIndex === index && (
                <motion.div
                  className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 bg-black bg-opacity-80 backdrop-blur-sm text-white px-3 py-1 rounded-full text-xs whitespace-nowrap border border-gray-700"
                  initial={{ opacity: 0, y: -5 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -5 }}
                  transition={{ duration: 0.3 }}
                >
                  {category.name}
                  <motion.div
                    className="absolute top-0 left-0 h-full rounded-full"
                    style={{ backgroundColor: category.color }}
                    initial={{ width: 0 }}
                    animate={{ width: '100%' }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                  />
                </motion.div>
              )}
            </AnimatePresence>
          </motion.button>
        );
      })}
    </div>
  );
};

export default CircularMenu;