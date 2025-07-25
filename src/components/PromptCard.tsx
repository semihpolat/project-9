import { motion } from 'framer-motion';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { Prompt } from '../data/prompts';

interface PromptCardProps {
  prompt: Prompt;
  index: number;
  onCopy: () => void;
}

const PromptCard: React.FC<PromptCardProps> = ({ prompt, index, onCopy }) => {
  return (
    <motion.div
      className="group relative bg-cartier-ivory border border-cartier-black/20 p-6 hover:shadow-lg transition-all duration-150"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.15, delay: index * 0.05 }}
      whileHover={{ y: -2 }}
    >
      {/* Copy button */}
      <div className="absolute top-4 right-4">
        <CopyToClipboard text={prompt.text} onCopy={onCopy}>
          <button
            className="opacity-0 group-hover:opacity-100 transition-opacity duration-150 p-2 hover:bg-cartier-black/5 rounded-none"
            aria-label="Copy prompt to clipboard"
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              className="text-cartier-red hover:text-cartier-black transition-colors duration-150"
            >
              <rect width="14" height="14" x="8" y="8" rx="2" ry="2"/>
              <path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"/>
            </svg>
          </button>
        </CopyToClipboard>
      </div>

      {/* Prompt text */}
      <div className="pr-12">
        <p className="text-cartier-black text-sm leading-relaxed font-sans">
          {prompt.text}
        </p>
      </div>

      {/* Bottom accent line */}
      <motion.div
        className="absolute bottom-0 left-0 h-0.5 bg-cartier-red"
        initial={{ width: 0 }}
        whileHover={{ width: '100%' }}
        transition={{ duration: 0.15 }}
      />
    </motion.div>
  );
};

export default PromptCard; 