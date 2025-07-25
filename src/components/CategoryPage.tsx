import { motion } from 'framer-motion';
import { Category, Prompt, prompts } from '../data/prompts';
import PromptCard from './PromptCard';

interface CategoryPageProps {
  category: Category;
  onPromptCopy: () => void;
  onBack: () => void;
}

const CategoryPage: React.FC<CategoryPageProps> = ({ category, onPromptCopy, onBack }) => {
  const categoryPrompts = prompts.filter(prompt => prompt.category === category.slug);

  return (
    <motion.div
      className="min-h-screen bg-cartier-ivory p-8"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.15 }}
    >
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-12">
          <button
            onClick={onBack}
            className="mb-6 flex items-center space-x-2 text-cartier-black hover:text-cartier-red transition-colors duration-150"
            aria-label="Go back to categories"
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
            >
              <path d="m15 18-6-6 6-6"/>
            </svg>
            <span className="font-serif text-sm uppercase tracking-wider">Back</span>
          </button>
          
          <motion.h1
            className="font-serif text-4xl text-cartier-black mb-4"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.15, delay: 0.1 }}
          >
            {category.title}
          </motion.h1>
          
          <motion.p
            className="text-cartier-black/70 font-sans max-w-2xl"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.15, delay: 0.15 }}
          >
            Select a prompt below to copy it to your clipboard. Each prompt is designed to unlock deeper insights and accelerate your thinking.
          </motion.p>
        </div>

        {/* Prompts Grid */}
        <div className="grid gap-6 md:grid-cols-2">
          {categoryPrompts.map((prompt, index) => (
            <PromptCard
              key={prompt.id}
              prompt={prompt}
              index={index}
              onCopy={onPromptCopy}
            />
          ))}
        </div>

        {/* Footer */}
        <motion.div
          className="mt-16 text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.15, delay: 0.3 }}
        >
          <div className="w-16 h-0.5 bg-cartier-red mx-auto mb-4"></div>
          <p className="text-cartier-black/50 font-serif text-sm uppercase tracking-wider">
            Cartier Crash Prompts
          </p>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default CategoryPage; 