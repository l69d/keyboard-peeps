import { motion } from 'framer-motion';

export default function WelcomeScreen({ onStart }) {
  return (
    <motion.div
      className="flex flex-col items-center justify-center min-h-svh px-4 py-16 text-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
    >
      {/* Doodle decoration */}
      <motion.div
        className="font-doodle text-5xl md:text-7xl text-key-400 mb-4"
        animate={{ rotate: [-2, 2, -2] }}
        transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
      >
        ⌨️
      </motion.div>

      {/* Title */}
      <motion.h1
        className="font-display text-5xl md:text-7xl font-bold text-ink mb-4"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.5 }}
      >
        key{' '}
        <span className="inline-block">
          <span className="font-doodle text-key-500" style={{ fontSize: '1.1em' }}>
            peeps
          </span>
        </span>
      </motion.h1>

      {/* Subtitle */}
      <motion.p
        className="text-xl md:text-2xl text-ink-muted max-w-lg font-body leading-relaxed mb-3"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.35, duration: 0.5 }}
      >
        Find the mechanical keyboard that matches your vibe.
      </motion.p>

      {/* Doodle subtitle */}
      <motion.p
        className="font-hand text-2xl text-key-400 mb-10"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.45, duration: 0.5 }}
      >
        ~ a little quiz for your fingertips ~
      </motion.p>

      {/* Start button */}
      <motion.button
        onClick={onStart}
        className="px-10 py-4 bg-key-500 text-white font-display text-xl font-semibold
                   rounded-2xl shadow-lg shadow-key-500/25 hover:bg-key-600
                   hover:shadow-xl hover:shadow-key-500/30 transition-all duration-200
                   active:scale-95 cursor-pointer"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6, duration: 0.4 }}
        whileHover={{ scale: 1.03 }}
        whileTap={{ scale: 0.97 }}
      >
        Start the quiz →
      </motion.button>

      {/* Footer doodle */}
      <motion.p
        className="mt-16 text-sm text-ink-muted font-body opacity-60"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.9 }}
      >
        {questionsCount} questions · ~2 minutes
      </motion.p>
    </motion.div>
  );
}

const questionsCount = 6;
