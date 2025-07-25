import React, { useRef } from 'react';
import { motion } from 'framer-motion';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { animate } from 'animejs';
import { Prompt } from '../data/prompts';

interface PromptCardProps {
  prompt: Prompt;
  index: number;
  onCopy: () => void;
}

const PromptCard: React.FC<PromptCardProps> = ({ prompt, index, onCopy }) => {
  const cardRef = useRef<HTMLDivElement>(null);

  const createConfetti = () => {
    const card = cardRef.current;
    if (!card) return;

    // Create confetti elements
    const confettiCount = 12;
    const confettiElements: HTMLDivElement[] = [];

    for (let i = 0; i < confettiCount; i++) {
      const confetti = document.createElement('div');
      confetti.className = 'confetti absolute w-1 h-1 bg-cartier-red pointer-events-none';
      confetti.style.left = '50%';
      confetti.style.top = '20px';
      confetti.style.zIndex = '100';
      card.appendChild(confetti);
      confettiElements.push(confetti);
    }

    // Animate confetti burst
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    
    if (!prefersReducedMotion) {
      confettiElements.forEach((confetti, index) => {
        animate(confetti, {
          translateX: Math.random() * 160 - 80,
          translateY: Math.random() * 120 - 60,
          rotate: Math.random() * 360,
          scale: [1, 0],
          opacity: [1, 0],
          duration: 800,
          easing: 'easeOutQuart',
          delay: index * 50,
          complete: () => {
            confetti.remove();
          }
        });
      });
    } else {
      // For reduced motion, just clean up immediately
      setTimeout(() => {
        confettiElements.forEach(el => el.remove());
      }, 100);
    }
  };

  const handleCopy = () => {
    createConfetti();
    onCopy();
  };

  return (
    <motion.div
      ref={cardRef}
      className="group relative bg-cartier-ivory border border-cartier-ivory shadow-sm hover:shadow-inner hover:border-cartier-black/10 p-8 transition-all duration-300"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
      whileHover={{ y: -1 }}
    >
      {/* Copy button */}
      <div className="absolute top-6 right-6">
        <CopyToClipboard text={prompt.text} onCopy={handleCopy}>
          <button
            className="opacity-30 group-hover:opacity-100 transition-all duration-300 p-3 hover:bg-cartier-black/5 border border-transparent hover:border-cartier-black/10"
            aria-label="Copy prompt to clipboard"
          >
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              className="text-cartier-black hover:text-cartier-red transition-colors duration-300"
            >
              <rect width="14" height="14" x="8" y="8" rx="2" ry="2"/>
              <path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"/>
            </svg>
          </button>
        </CopyToClipboard>
      </div>

      {/* Prompt text */}
      <div className="pr-16">
        <p className="text-cartier-black text-sm leading-loose font-sans tracking-wide">
          {prompt.text}
        </p>
      </div>

      {/* Subtle accent line */}
      <motion.div
        className="absolute bottom-0 left-0 h-px bg-cartier-red"
        initial={{ width: 0 }}
        whileHover={{ width: '100%' }}
        transition={{ duration: 0.4, ease: [0.165, 0.84, 0.44, 1] }}
      />

      {/* Corner detail */}
      <div className="absolute top-0 left-0 w-4 h-4 border-l border-t border-cartier-black/5"></div>
    </motion.div>
  );
};

export default PromptCard; 