import React from 'react';
import { motion } from 'framer-motion';
import { categories } from '../data/prompts';
import { categoryLayouts } from '../data/categoryLayout';
import CategoryIcon from './CategoryIcon';

interface HomeProps {
  onCategorySelect: (slug: string) => void;
}

const Home: React.FC<HomeProps> = ({ onCategorySelect }) => {
  return (
    <div className="min-h-screen bg-cartier-ivory overflow-hidden">
      {/* Hero Section */}
      <div className="relative max-w-6xl mx-auto px-6 py-6 text-center z-50">
        <motion.h1
          className="font-serif text-4xl md:text-5xl text-cartier-black mb-3 uppercase"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          Prompt Explorer
        </motion.h1>
        
        <motion.p
          className="text-cartier-black/60 font-sans text-xs uppercase tracking-widest max-w-sm mx-auto mb-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          Hover to reveal • Click to explore
        </motion.p>
      </div>

      {/* Irregular Grid of Category Icons */}
      <div className="relative w-full h-[80vh] px-4 -mt-8">
        {/* Central crash point - more visible */}
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10">
          <div className="w-2 h-2 bg-cartier-red opacity-30 rounded-full animate-pulse"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-6 h-6 border border-cartier-red opacity-10 rounded-full"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-12 h-12 border border-cartier-red opacity-5 rounded-full"></div>
        </div>
        
        {/* Desktop: Spiral positioning */}
        <div className="hidden sm:block relative w-full h-full">
          {categoryLayouts.map((layout, index) => {
            const category = categories.find(cat => cat.slug === layout.slug);
            const title = category?.title || 'Coming Soon';
            
            return (
              <motion.div
                key={layout.slug}
                initial={{ 
                  opacity: 0, 
                  scale: 0.2, 
                  rotate: layout.spiralAngle - 180,
                  x: '50%',
                  y: '50%'
                }}
                animate={{ 
                  opacity: layout.isActive ? 1 : 0.3, 
                  scale: 1, 
                  rotate: 0,
                  x: '0%',
                  y: '0%'
                }}
                transition={{ 
                  duration: 1.5, 
                  delay: 0.8 + (index * 0.08),
                  ease: [0.19, 1, 0.22, 1],
                  type: "spring",
                  damping: layout.isActive ? 12 : 20
                }}
              >
                <CategoryIcon
                  layout={layout}
                  title={title}
                  onCategorySelect={onCategorySelect}
                />
              </motion.div>
            );
          })}
        </div>

        {/* Mobile: Vertical stack - only active categories */}
        <div className="sm:hidden flex flex-col items-center space-y-8 py-4">
          {categoryLayouts.filter(layout => layout.isActive).map((layout, index) => {
            const category = categories.find(cat => cat.slug === layout.slug);
            if (!category) return null;
            
            const mobileLayout = {
              ...layout,
              x: '50%',
              y: '0%',
              rotation: 0,
              scale: 0.6
            };
            
            return (
              <motion.div
                key={layout.slug}
                className="relative"
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ 
                  duration: 0.5, 
                  delay: 0.3 + (index * 0.1),
                  ease: [0.165, 0.84, 0.44, 1]
                }}
              >
                <CategoryIcon
                  layout={mobileLayout}
                  title={category.title}
                  onCategorySelect={onCategorySelect}
                />
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Footer */}
      <motion.div
        className="relative text-center pb-6 z-50"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 1.2 }}
      >
        <div className="w-16 h-0.5 bg-cartier-red mx-auto mb-3"></div>
        <p className="text-cartier-black/40 font-serif text-xs uppercase tracking-wider">
          Ultra-minimal prompt exploration
        </p>
      </motion.div>
    </div>
  );
};

export default Home; 