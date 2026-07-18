import { motion } from 'framer-motion';

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.08 },
  },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
};

export default function QuizQuestion({ question, onSelect, direction }) {
  return (
    <motion.div
      key={question.id}
      initial={{ opacity: 0, x: direction * 50 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: direction * -50 }}
      transition={{ duration: 0.35, ease: 'easeOut' }}
      className="w-full max-w-2xl mx-auto px-4"
    >
      {/* Question text */}
      <div className="text-center mb-10">
        <motion.h2
          className="text-3xl md:text-4xl font-display font-semibold text-ink mb-3"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          {question.question}
        </motion.h2>
        <motion.p
          className="text-ink-muted text-lg font-body"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.15 }}
        >
          {question.subtitle}
        </motion.p>
      </div>

      {/* Options */}
      <motion.div
        className="grid grid-cols-1 sm:grid-cols-2 gap-3"
        variants={container}
        initial="hidden"
        animate="show"
      >
        {question.options.map((option, i) => (
          <motion.button
            key={option.id}
            variants={item}
            onClick={() => onSelect(option)}
            className="group relative text-left p-5 rounded-2xl border-2 border-warm-200 bg-white
                       hover:border-key-400 hover:shadow-lg hover:shadow-key-400/10
                       transition-all duration-200 cursor-pointer active:scale-[0.98]"
          >
            <div className="flex items-start gap-3">
              <span className="text-2xl shrink-0">{option.emoji}</span>
              <div className="min-w-0">
                <div className="font-display font-semibold text-lg text-ink group-hover:text-key-600 transition-colors">
                  {option.label}
                </div>
                <div className="text-sm text-ink-muted mt-1 font-body leading-snug">
                  {option.description}
                </div>
              </div>
            </div>
          </motion.button>
        ))}
      </motion.div>
    </motion.div>
  );
}
