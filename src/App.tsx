import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { categories, Category } from './data/prompts';
import CategoryCard from './components/CategoryCard';
import CategoryPage from './components/CategoryPage';
import CopyToast from './components/CopyToast';

function App() {
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);
  const [showToast, setShowToast] = useState(false);

  const handleCategorySelect = (category: Category) => {
    setSelectedCategory(category);
  };

  const handleBack = () => {
    setSelectedCategory(null);
  };

  const handlePromptCopy = () => {
    setShowToast(true);
  };

  const handleToastClose = () => {
    setShowToast(false);
  };

  if (selectedCategory) {
    return (
      <>
        <CategoryPage
          category={selectedCategory}
          onPromptCopy={handlePromptCopy}
          onBack={handleBack}
        />
        <CopyToast show={showToast} onClose={handleToastClose} />
      </>
    );
  }

  return (
    <div className="min-h-screen bg-cartier-ivory">
      {/* Luxe Navbar */}
      <nav className="border-b border-cartier-black/10 p-6">
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <motion.div
            className="font-serif text-cartier-black text-lg uppercase tracking-wider"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.15 }}
          >
            Crash
          </motion.div>
          <motion.div
            className="w-8 h-0.5 bg-cartier-red"
            initial={{ width: 0 }}
            animate={{ width: 32 }}
            transition={{ duration: 0.15, delay: 0.1 }}
          />
        </div>
      </nav>

      {/* Landing Page */}
      <div className="max-w-6xl mx-auto px-6 py-16">
        {/* Hero Section */}
        <div className="text-center mb-20">
          <motion.h1
            className="font-serif text-6xl md:text-7xl text-cartier-black mb-8"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.15, delay: 0.2 }}
          >
            Prompt Explorer
          </motion.h1>
          
          <motion.p
            className="text-cartier-black/70 font-sans text-lg max-w-2xl mx-auto mb-12 leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.15, delay: 0.3 }}
          >
            Discover powerful AI prompts that unlock insights, solve problems, and accelerate your thinking. Each category contains carefully crafted prompts designed for maximum impact.
          </motion.p>

          <motion.div
            className="inline-block"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.15, delay: 0.4 }}
          >
            <div className="bg-cartier-black text-cartier-ivory px-8 py-3 font-serif text-sm uppercase tracking-wider">
              Select Category
            </div>
          </motion.div>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
          {categories.map((category, index) => (
            <CategoryCard
              key={category.slug}
              category={category}
              index={index}
              onClick={() => handleCategorySelect(category)}
            />
          ))}
        </div>

        {/* Footer */}
        <motion.div
          className="text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.15, delay: 0.6 }}
        >
          <div className="w-24 h-0.5 bg-cartier-red mx-auto mb-6"></div>
          <p className="text-cartier-black/50 font-serif text-sm uppercase tracking-wider mb-2">
            Cartier Crash
          </p>
          <p className="text-cartier-black/40 font-sans text-xs">
            Ultra-minimal prompt exploration
          </p>
        </motion.div>
      </div>

      <CopyToast show={showToast} onClose={handleToastClose} />
    </div>
  );
}

export default App;