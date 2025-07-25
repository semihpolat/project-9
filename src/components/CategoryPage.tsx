import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { animate } from 'animejs';
import { Category, Prompt, prompts } from '../data/prompts';
import { romanNumerals } from '../data/categoryLayout';
import { getRandomQuote, Quote } from '../data/quotes';
import PromptCard from './PromptCard';

interface CategoryPageProps {
  category: Category;
  selectedCategorySlug: string | null;
  onPromptCopy: () => void;
  onBack: () => void;
}

type EnhancedPromptItem = Prompt | { type: 'quote'; quote: Quote; id: string };

const CategoryPage: React.FC<CategoryPageProps> = ({ category, selectedCategorySlug, onPromptCopy, onBack }) => {
  const categoryPrompts = prompts.filter(prompt => prompt.category === category.slug);
  const observerRef = useRef<IntersectionObserver | null>(null);
  const numeral = romanNumerals[category.slug as keyof typeof romanNumerals];
  
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

  // Hero numeral animation
  const heroVariants = {
    initial: {
      scale: 0.5,
      opacity: 0,
      y: -50,
    },
    animate: {
      scale: 1,
      opacity: 1,
      y: 0,
    }
  };

  const heroTransition = {
    duration: 0.8,
    ease: [0.6, -0.05, 0.01, 0.99] as const,
    delay: 0.2
  };

  useEffect(() => {
    // Setup IntersectionObserver for scroll-triggered reveals
    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const element = entry.target as HTMLElement;
            const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
            
            if (prefersReducedMotion) {
              // For reduced motion, just use opacity
              animate(element, {
                opacity: [0, 1],
                duration: 200,
                easing: 'easeInOutQuad'
              });
            } else {
              // Full animation
              animate(element, {
                translateY: [20, 0],
                opacity: [0, 1],
                duration: 500,
                easing: 'easeOutQuart',
                delay: 100
              });
            }
            
            observerRef.current?.unobserve(element);
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
    );

    // Observe all prompt cards and quotes
    const elements = document.querySelectorAll('.reveal-on-scroll');
    elements.forEach(el => observerRef.current?.observe(el));

    return () => {
      observerRef.current?.disconnect();
    };
  }, []);

  // Create enhanced prompt list with easter eggs
  const enhancedPrompts: EnhancedPromptItem[] = [];
  categoryPrompts.forEach((prompt, index) => {
    enhancedPrompts.push(prompt);
    
    // Add easter egg quote every 3-4 prompts
    if ((index + 1) % 3 === 0 && index < categoryPrompts.length - 1) {
      enhancedPrompts.push({ type: 'quote', quote: getRandomQuote(), id: `quote-${index}` });
    }
  });

  return (
    <motion.div
      className="min-h-screen bg-cartier-ivory relative overflow-hidden"
      variants={pageVariants}
      initial="initial"
      animate="in"
      exit="out"
      transition={pageTransition}
    >
      {/* Hero Roman Numeral - Large and Prominent */}
      <motion.div
        className="absolute inset-0 flex items-center justify-center pointer-events-none z-5"
        variants={heroVariants}
        initial="initial"
        animate="animate"
        transition={heroTransition}
      >
        <div className="text-[40vh] font-serif font-bold text-cartier-black/8 select-none">
          {numeral}
        </div>
      </motion.div>

      <div className="relative z-10 p-8">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <motion.div 
            className="mb-16"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <button
              onClick={onBack}
              className="mb-8 flex items-center space-x-3 text-cartier-black hover:text-cartier-red transition-all duration-300 group"
              aria-label="Go back to categories"
            >
              <div className="w-8 h-8 flex items-center justify-center">
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  className="transform group-hover:-translate-x-1 transition-transform duration-300"
                >
                  <path d="m15 18-6-6 6-6"/>
                </svg>
              </div>
              <span className="font-serif text-sm uppercase tracking-wider">Back</span>
            </button>
            
            <motion.div
              className="flex items-center space-x-4 mb-6"
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
            >
              <div className="w-12 h-12 bg-cartier-black flex items-center justify-center">
                <span className="font-serif text-cartier-ivory text-lg font-bold">
                  {numeral}
                </span>
              </div>
              <h1 className="font-serif text-4xl md:text-5xl text-cartier-black uppercase">
                {category.title}
              </h1>
            </motion.div>
            
            <motion.p
              className="text-cartier-black/60 font-sans text-sm uppercase tracking-wider max-w-xl"
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
            >
              Hover • Copy • Explore the depths
            </motion.p>
          </motion.div>

          {/* Enhanced Prompts List */}
          <motion.div 
            className="space-y-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.7 }}
          >
            {enhancedPrompts.map((item, index) => {
              if ('type' in item && item.type === 'quote') {
                // Easter egg quote
                return (
                  <motion.div
                    key={item.id}
                    className="reveal-on-scroll opacity-0 flex justify-center py-8"
                    initial={{ opacity: 0 }}
                  >
                    <div className="max-w-md text-center">
                      <div className="w-16 h-0.5 bg-cartier-red mx-auto mb-4"></div>
                      <blockquote className="font-serif text-cartier-black/70 italic text-lg mb-2">
                        "{item.quote.text}"
                      </blockquote>
                      <cite className="font-sans text-cartier-black/50 text-xs uppercase tracking-wider">
                        — {item.quote.author}
                      </cite>
                      <div className="w-16 h-0.5 bg-cartier-red mx-auto mt-4"></div>
                    </div>
                  </motion.div>
                );
              } else {
                // Regular prompt card
                const prompt = item as Prompt;
                return (
                  <div
                    key={prompt.id}
                    className="reveal-on-scroll opacity-0"
                  >
                    <PromptCard
                      prompt={prompt}
                      index={index}
                      onCopy={onPromptCopy}
                    />
                  </div>
                );
              }
            })}
          </motion.div>

          {/* Footer */}
          <motion.div
            className="mt-20 text-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.9 }}
          >
            <div className="w-24 h-0.5 bg-cartier-red mx-auto mb-6"></div>
            <p className="text-cartier-black/40 font-serif text-xs uppercase tracking-wider mb-2">
              {category.title} • Cartier Crash
            </p>
            <p className="text-cartier-black/30 font-sans text-xs">
              Ultra-minimal prompt exploration
            </p>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};

export default CategoryPage; 