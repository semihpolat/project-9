import React from 'react';
import { motion } from 'framer-motion';
import { categories } from '../data/prompts';
import { categoryLayouts } from '../data/categoryLayout';
import CategoryIcon from './CategoryIcon';

interface HomeProps {
  onCategorySelect: (slug: string) => void;
}

const Home: React.FC<HomeProps> = ({ onCategorySelect }) => {
  // Page transition animations
  const pageVariants = {
    initial: {
      opacity: 0,
      scale: 0.95,
    },
    in: {
      opacity: 1,
      scale: 1,
    },
    out: {
      opacity: 0,
      scale: 1.05,
    }
  };

  const pageTransition = {
    type: 'tween' as const,
    ease: 'anticipate' as const,
    duration: 0.6
  };

  return (
    <motion.div 
      className="min-h-screen bg-cartier-ivory overflow-hidden"
      variants={pageVariants}
      initial="initial"
      animate="in"
      exit="out"
      transition={pageTransition}
    >
      {/* Hero Section */}
      <div className="relative max-w-6xl mx-auto px-6 pt-8 pb-4 text-center z-50">
        <motion.h1
          className="font-serif text-4xl md:text-5xl text-cartier-black mb-3 uppercase"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          Dial Of Prompts
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

      {/* Horizontal Grid of Category Icons */}
      <div className="relative w-full h-[60vh] px-4 flex items-center justify-center">
        {/* Desktop: Horizontal positioning */}
        <div className="hidden sm:block relative w-full h-full">
          {categoryLayouts.map((layout, index) => {
            const category = categories.find(cat => cat.slug === layout.slug);
            const title = category?.title || 'Coming Soon';
            
            return (
              <motion.div
                key={layout.slug}
                initial={{ 
                  opacity: 0
                }}
                animate={{ 
                  opacity: layout.isActive ? 1 : 0.7
                }}
                transition={{ 
                  duration: 0.6, 
                  delay: 0.2 + (index * 0.08),
                  ease: "easeOut"
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
        <div className="sm:hidden flex flex-col items-center space-y-6 py-4">
          {categoryLayouts.filter(layout => layout.isActive).map((layout, index) => {
            const category = categories.find(cat => cat.slug === layout.slug);
            if (!category) return null;
            
            const mobileLayout = {
              ...layout,
              x: '50%',
              y: '50%',
              rotation: 0,
              scale: 0.7
            };
            
            return (
              <motion.div
                key={layout.slug}
                className="relative"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ 
                  duration: 0.5, 
                  delay: 0.3 + (index * 0.1),
                  ease: "easeOut"
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

      {/* Footer - moved up */}
      <motion.div
        className="relative text-center pb-6 z-50 -mt-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 1.2 }}
      >
        <div className="w-16 h-0.5 bg-cartier-red mx-auto mb-3"></div>
        <p className="text-cartier-black/40 font-serif text-xs uppercase tracking-wider">
          Ultra-minimal prompt exploration
        </p>
      </motion.div>
    </motion.div>
  );
};

export default Home; 