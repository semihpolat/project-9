import { useEffect, useState } from 'react';
import { motion, useAnimation } from 'framer-motion';
import * as flubber from 'flubber';
import { Category } from '../data/prompts';

interface CategoryCardProps {
  category: Category;
  index: number;
  onClick: () => void;
}

const CategoryCard: React.FC<CategoryCardProps> = ({ category, index, onClick }) => {
  const controls = useAnimation();
  const [currentPath, setCurrentPath] = useState(category.iconPath);
  
  // Roman numerals for visual effect
  const romanNumerals = ['I', 'II', 'III', 'IV', 'V'];
  const romanNumeral = romanNumerals[index] || 'VI';

  // Create warped version of the path for hover effect
  const warpedPath = category.iconPath.replace(/(\d+)/g, (match) => {
    const num = parseInt(match);
    return (num + Math.sin(num) * 2).toString();
  });

  const handleHover = async () => {
    try {
      const interpolator = flubber.interpolate(category.iconPath, warpedPath);
      const morphedPath = interpolator(0.5);
      await controls.start({ 
        d: morphedPath,
        transition: { duration: 0.15 }
      });
    } catch (error) {
      // Fallback if flubber fails
      console.log('Morph animation failed, using fallback');
    }
  };

  const handleHoverEnd = async () => {
    try {
      await controls.start({ 
        d: category.iconPath,
        transition: { duration: 0.15 }
      });
    } catch (error) {
      console.log('Morph animation failed, using fallback');
    }
  };

  return (
    <motion.div
      className="group cursor-pointer"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.15, delay: index * 0.05 }}
      whileHover={{ scale: 1.03 }}
      onHoverStart={handleHover}
      onHoverEnd={handleHoverEnd}
      onClick={onClick}
    >
      <div className="relative bg-cartier-ivory border border-cartier-black/10 rounded-none p-8 h-48 flex flex-col items-center justify-center hover:shadow-lg transition-shadow duration-150">
        {/* Roman numeral background */}
        <div className="absolute top-4 left-4 text-cartier-black/20 font-serif text-sm uppercase tracking-wider">
          {romanNumeral}
        </div>
        
        {/* Icon */}
        <div className="mb-4">
          <svg
            width="48"
            height="48"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            className="text-cartier-red group-hover:text-cartier-black transition-colors duration-150"
            aria-label={`${category.title} icon`}
          >
            <motion.path
              d={category.iconPath}
              animate={controls}
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
        
        {/* Title */}
        <h3 className="font-serif text-cartier-black text-center text-sm uppercase tracking-wider leading-tight">
          {category.title}
        </h3>
        
        {/* Hover indicator */}
        <motion.div
          className="absolute bottom-4 right-4 w-2 h-2 bg-cartier-red rounded-full opacity-0 group-hover:opacity-100"
          initial={{ scale: 0 }}
          whileHover={{ scale: 1 }}
          transition={{ duration: 0.15 }}
        />
      </div>
    </motion.div>
  );
};

export default CategoryCard; 