import React, { useState } from 'react';
import { categories, Category } from './data/prompts';
import Home from './components/Home';
import CategoryPage from './components/CategoryPage';
import CopyToast from './components/CopyToast';

function App() {
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);
  const [showToast, setShowToast] = useState(false);

  const handleCategorySelect = (slug: string) => {
    const category = categories.find(cat => cat.slug === slug);
    if (category) {
      setSelectedCategory(category);
    }
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
    <>
      <Home onCategorySelect={handleCategorySelect} />
      <CopyToast show={showToast} onClose={handleToastClose} />
    </>
  );
}

export default App;