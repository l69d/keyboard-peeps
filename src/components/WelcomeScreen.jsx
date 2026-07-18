import { motion } from 'framer-motion';

export default function WelcomeScreen({ onStart }) {
  return (
    <motion.div
      className="relative flex flex-col items-center justify-center min-h-svh px-4 py-16 text-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      {/* Background blobs */}
      <div className="bg-blobs">
        <div className="bg-blob bg-blob-1" />
        <div className="bg-blob bg-blob-2" />
        <div className="bg-blob bg-blob-3" />
      </div>

      <div className="relative z-10">
        {/* Floating emoji */}
        <motion.div
          className="text-6xl md:text-8xl mb-6"
          animate={{ y: [-6, 6, -6] }}
          transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
        >
          ⌨️
        </motion.div>

        {/* Title */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15, duration: 0.6 }}
        >
          <h1 className="font-display text-5xl md:text-7xl font-bold text-ink mb-2 tracking-tight">
            key{' '}
            <span className="font-doodle text-key-500 inline-block" style={{ fontSize: '1.15em' }}>
              peeps
            </span>
          </h1>
        </motion.div>

        {/* Subtitle */}
        <motion.p
          className="text-xl md:text-2xl text-ink-muted max-w-lg font-body leading-relaxed mb-2"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.5 }}
        >
          Find the mechanical keyboard that matches your vibe.
        </motion.p>

        {/* Handwritten tagline */}
        <motion.p
          className="font-hand text-2xl md:text-3xl text-key-400 mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.45, duration: 0.5 }}
        >
          ~ a little quiz for your fingertips ~
        </motion.p>

        {/* CTA button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.4 }}
        >
          <motion.button
            onClick={onStart}
            className="group relative inline-flex items-center gap-3 px-12 py-5
                       bg-key-500 text-white font-display text-xl font-semibold
                       rounded-3xl shadow-xl shadow-key-500/25
                       hover:bg-key-600 hover:shadow-2xl hover:shadow-key-500/30
                       transition-all duration-300 cursor-pointer"
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.96 }}
          >
            Start the quiz
            <motion.span
              animate={{ x: [0, 4, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              →
            </motion.span>
          </motion.button>
        </motion.div>

        {/* Footer meta */}
        <motion.p
          className="mt-16 text-sm text-ink-muted font-body opacity-50"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.9 }}
        >
          {questionsCount} questions · ~2 minutes · no sign-up
        </motion.p>
      </div>
    </motion.div>
  );
}

const questionsCount = 6;
