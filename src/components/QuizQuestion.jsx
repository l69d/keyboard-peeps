import { motion } from 'framer-motion';
import { useState } from 'react';

const cardColors = [
  'bg-card-lavender hover:bg-purple-100',
  'bg-card-blue hover:bg-blue-100',
  'bg-card-green hover:bg-green-100',
  'bg-card-yellow hover:bg-yellow-100',
  'bg-card-peach hover:bg-orange-100',
  'bg-card-pink hover:bg-pink-100',
];

const accentColors = [
  'text-purple-500',
  'text-blue-500',
  'text-emerald-500',
  'text-amber-500',
  'text-orange-500',
  'text-pink-500',
];

const container = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.06 } },
};

const item = {
  hidden: { opacity: 0, y: 12, scale: 0.99 },
  show: { opacity: 1, y: 0, scale: 1 },
};

export default function QuizQuestion({ question, onSelect, direction }) {
  const [hoveredIdx, setHoveredIdx] = useState(null);

  return (
    <motion.div
      key={question.id}
      initial={{ opacity: 0, x: direction * 30 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: direction * -30 }}
      transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
      className="w-full max-w-xl mx-auto px-4"
    >
      {/* Question text */}
      <div className="text-center mb-6">
        <motion.span
          className="inline-block font-hand text-lg text-key-400 mb-1"
          initial={{ opacity: 0, y: -4 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.03 }}
        >
          {question.subtitle}
        </motion.span>
        <motion.h2
          className="font-display font-bold text-xl md:text-2xl text-ink leading-snug"
          initial={{ opacity: 0, y: -4 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.06 }}
        >
          {question.question}
        </motion.h2>
      </div>

      {/* Options — single column, wide cards */}
      <motion.div
        className="flex flex-col gap-3"
        variants={container}
        initial="hidden"
        animate="show"
      >
        {question.options.map((option, i) => {
          const isHovered = hoveredIdx === i;
          const isOtherHovered = hoveredIdx !== null && hoveredIdx !== i;

          return (
            <motion.button
              key={option.id}
              variants={item}
              onClick={() => onSelect(option)}
              onMouseEnter={() => setHoveredIdx(i)}
              onMouseLeave={() => setHoveredIdx(null)}
              className={`group relative text-left p-5 rounded-2xl cursor-pointer overflow-hidden
                transition-all duration-250 ease-out
                ${cardColors[i % cardColors.length]}
                ${isOtherHovered ? 'opacity-35 scale-[0.98]' : ''}
                ${isHovered ? 'scale-[1.01] shadow-xl shadow-purple-200/40 -translate-y-0.5' : 'shadow-sm shadow-black/3'}
              `}
            >
              <div className="flex items-center gap-4">
                {/* Emoji */}
                <span className="text-xl shrink-0 transition-transform duration-250 group-hover:scale-110">
                  {option.emoji}
                </span>

                {/* Text */}
                <div className="min-w-0 flex-1">
                  <div className={`font-display font-bold text-lg text-ink mb-1 transition-colors duration-250
                    ${accentColors[i % accentColors.length]}`}>
                    {option.label}
                  </div>
                  <div className="text-sm text-ink-muted font-body leading-relaxed">
                    {option.description}
                  </div>
                </div>

                {/* Arrow on hover */}
                <div className={`shrink-0 w-8 h-8 rounded-full flex items-center justify-center
                  transition-all duration-250 bg-white/60
                  ${isHovered ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-2'}`}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                    strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"
                    className={accentColors[i % accentColors.length]}>
                    <polyline points="9 18 15 12 9 6" />
                  </svg>
                </div>
              </div>
            </motion.button>
          );
        })}
      </motion.div>
    </motion.div>
  );
}
