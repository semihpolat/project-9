import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Copy, Check } from 'lucide-react';
import { Prompt } from '../data/prompts';

interface PromptModalProps {
  prompt: Prompt | null;
  isOpen: boolean;
  onClose: () => void;
}

const PromptModal: React.FC<PromptModalProps> = ({ prompt, isOpen, onClose }) => {
  const [copied, setCopied] = React.useState(false);

  const copyToClipboard = async () => {
    if (prompt) {
      await navigator.clipboard.writeText(prompt.prompt);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  if (!prompt) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 bg-black bg-opacity-80 backdrop-blur-sm flex items-center justify-center p-4 z-60"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.div
            className="bg-gray-900 border border-gray-700 rounded-2xl p-8 max-w-2xl w-full max-h-[80vh] overflow-y-auto backdrop-blur-sm"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-start mb-6">
              <h2 className="text-2xl font-bold text-white">{prompt.title}</h2>
              <button
                onClick={onClose}
                className="p-2 hover:bg-gray-800 rounded-full transition-colors text-gray-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-6">
              <div>
                <h3 className="font-semibold text-white mb-2">The Prompt:</h3>
                <div className="bg-black bg-opacity-50 p-4 rounded-lg relative border border-gray-700">
                  <p className="text-gray-300 leading-relaxed">{prompt.prompt}</p>
                  <button
                    onClick={copyToClipboard}
                    className="absolute top-2 right-2 p-2 hover:bg-gray-700 rounded-lg transition-colors text-gray-400 hover:text-white"
                  >
                    {copied ? (
                      <Check className="w-4 h-4 text-green-600" />
                    ) : (
                      <Copy className="w-4 h-4 text-gray-600" />
                    )}
                  </button>
                </div>
              </div>

              <div>
                <h3 className="font-semibold text-white mb-2">Why it works:</h3>
                <p className="text-gray-300 leading-relaxed">{prompt.whyItWorks}</p>
              </div>

              {prompt.example && (
                <div>
                  <h3 className="font-semibold text-white mb-2">Real example:</h3>
                  <p className="text-gray-300 leading-relaxed italic">{prompt.example}</p>
                </div>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default PromptModal;