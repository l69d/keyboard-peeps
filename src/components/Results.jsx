import { motion } from 'framer-motion';
import { dimensionLabel } from '../data/scorer';

const container = {
  hidden: { opacity: 0 },
  show: { transition: { staggerChildren: 0.1 } },
};

const cardItem = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0 },
};

function MatchBadge({ matched, dim }) {
  return (
    <span
      className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium font-body
        ${matched ? 'bg-green-100 text-green-700' : 'bg-warm-100 text-ink-muted opacity-50'}`}
    >
      {matched ? '✓' : '—'} {dimensionLabel(dim)}
    </span>
  );
}

export default function Results({ keyboards, answers, onRestart }) {
  // Show top 3 keyboards
  const top3 = keyboards.slice(0, 3);
  const allDimensions = answers
    .flatMap((a) => Object.keys(a.tags))
    .filter((d, i, arr) => arr.indexOf(d) === i);

  return (
    <motion.div
      className="min-h-svh px-4 py-12"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-10">
          <motion.div
            className="font-doodle text-4xl md:text-5xl text-key-400 mb-3"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
          >
            🎉
          </motion.div>
          <motion.h2
            className="text-3xl md:text-4xl font-display font-bold text-ink mb-2"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            Your perfect matches
          </motion.h2>
          <motion.p
            className="text-lg text-ink-muted font-body"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            Based on your preferences, here are your top keyboard picks
          </motion.p>
        </div>

        {/* Keyboard cards */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-12"
          variants={container}
          initial="hidden"
          animate="show"
        >
          {top3.map((kb, i) => (
            <motion.a
              key={kb.id}
              href={kb.url}
              target="_blank"
              rel="noopener noreferrer"
              variants={cardItem}
              className={`group block bg-white rounded-2xl border-2 p-6 transition-all duration-200
                hover:shadow-xl hover:-translate-y-1 cursor-pointer no-underline
                ${i === 0 ? 'border-key-400 shadow-lg shadow-key-400/10' : 'border-warm-200'}`}
            >
              {/* Rank badge */}
              <div className="flex items-center justify-between mb-3">
                <span
                  className={`text-xs font-bold px-2 py-0.5 rounded-full font-body
                    ${i === 0 ? 'bg-key-500 text-white' : 'bg-warm-100 text-ink-muted'}`}
                >
                  {i === 0 ? '🥇 Best match' : i === 1 ? '🥈 Runner-up' : '🥉 Also great'}
                </span>
                <span className="text-xs text-ink-muted font-body">
                  {kb.score}/{kb.maxScore} match
                </span>
              </div>

              {/* Keyboard name & brand */}
              <h3 className="font-display font-semibold text-xl text-ink group-hover:text-key-600 transition-colors">
                {kb.name}
              </h3>
              <p className="text-sm text-ink-muted font-body mb-1">{kb.brand}</p>
              <p className="text-2xl font-display font-bold text-key-500 mb-3">{kb.price}</p>

              {/* Description */}
              <p className="text-sm text-ink-muted font-body leading-relaxed mb-4">
                {kb.description}
              </p>

              {/* Highlights */}
              <div className="flex flex-wrap gap-1.5 mb-4">
                {kb.highlights.map((h) => (
                  <span
                    key={h}
                    className="px-2 py-0.5 bg-warm-50 text-ink-muted rounded-md text-xs font-body"
                  >
                    {h}
                  </span>
                ))}
              </div>

              {/* Match breakdown */}
              <div className="flex flex-wrap gap-1.5 pt-3 border-t border-warm-200">
                {allDimensions.map((dim) => (
                  <MatchBadge
                    key={dim}
                    dim={dim}
                    matched={kb.matchedOn.includes(dim)}
                  />
                ))}
              </div>
            </motion.a>
          ))}
        </motion.div>

        {/* Restart */}
        <div className="text-center">
          <motion.button
            onClick={onRestart}
            className="px-8 py-3 bg-white border-2 border-warm-200 text-ink-muted font-body
                       rounded-xl hover:border-key-400 hover:text-key-600 transition-all duration-200
                       active:scale-95 cursor-pointer"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.97 }}
          >
            ↻ Take the quiz again
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
}
