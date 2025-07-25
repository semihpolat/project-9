import React, { useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import { categories, Category } from './data/prompts';
import Home from './components/Home';
import CategoryPage from './components/CategoryPage';
import CopyToast from './components/CopyToast';

function App() {
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);
  const [selectedCategorySlug, setSelectedCategorySlug] = useState<string | null>(null);
  const [showToast, setShowToast] = useState(false);

  const handleCategorySelect = (slug: string) => {
    const category = categories.find(cat => cat.slug === slug);
    if (category) {
      setSelectedCategorySlug(slug);
      setSelectedCategory(category);
    }
  };

  const handleBack = () => {
    setSelectedCategory(null);
    setSelectedCategorySlug(null);
  };

  const handlePromptCopy = () => {
    setShowToast(true);
  };

  const handleToastClose = () => {
    setShowToast(false);
  };

  return (
    <div className="min-h-screen">
      <AnimatePresence mode="wait">
        {selectedCategory ? (
          <CategoryPage
            key="category-page"
            category={selectedCategory}
            selectedCategorySlug={selectedCategorySlug}
            onPromptCopy={handlePromptCopy}
            onBack={handleBack}
          />
        ) : (
          <Home 
            key="home-page"
            onCategorySelect={handleCategorySelect} 
          />
        )}
      </AnimatePresence>
      <CopyToast show={showToast} onClose={handleToastClose} />
    </div>
  );
}

export default App;