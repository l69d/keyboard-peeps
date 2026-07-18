import { motion } from 'framer-motion';
import { dimensionLabel } from '../data/scorer';

const rankBadges = [
  { emoji: '👑', label: 'Best match', bg: 'bg-key-500 text-white' },
  { emoji: '🌟', label: 'Runner-up', bg: 'bg-warm-100 text-ink-muted' },
  { emoji: '💫', label: 'Also great', bg: 'bg-warm-100 text-ink-muted' },
];

const cardAccents = [
  'ring-purple-400/30 bg-gradient-to-br from-purple-50/50 to-pink-50/50',
  'ring-blue-400/20 bg-gradient-to-br from-blue-50/50 to-cyan-50/50',
  'ring-emerald-400/20 bg-gradient-to-br from-green-50/50 to-emerald-50/50',
];

function MatchDot({ matched, dim }) {
  return (
    <div className="flex items-center gap-1.5" title={dimensionLabel(dim)}>
      <div className={`w-2 h-2 rounded-full ${matched ? 'bg-emerald-400 shadow-[0_0_6px_rgba(52,211,153,0.5)]' : 'bg-warm-200'}`} />
      <span className={`text-xs font-body ${matched ? 'text-ink' : 'text-ink-muted/40'}`}>
        {dimensionLabel(dim)}
      </span>
    </div>
  );
}

export default function Results({ keyboards, answers, onRestart, onHome }) {
  const top3 = keyboards.slice(0, 3);
  const allDimensions = answers
    .flatMap((a) => Object.keys(a.tags))
    .filter((d, i, arr) => arr.indexOf(d) === i);

  return (
    <motion.div className="min-h-svh px-4 py-10" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
      <div className="max-w-4xl mx-auto relative z-10">
        {/* Header */}
        <div className="text-center mb-8">
          <motion.div
            className="font-doodle text-4xl mb-2"
            initial={{ scale: 0, rotate: -10 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ delay: 0.1, type: 'spring', stiffness: 150 }}
          >
            🎉
          </motion.div>
          <motion.h2
            className="text-2xl md:text-3xl font-display font-bold text-ink mb-2"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
          >
            Your perfect{' '}
            <span className="font-doodle text-key-500">matches</span>
          </motion.h2>
          <motion.p
            className="text-sm text-ink-muted font-body"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            Based on your vibe, here are the keyboards that get you
          </motion.p>
        </div>

        {/* Cards — vertical stack, all same width */}
        <div className="flex flex-col gap-4 mb-8">
          {top3.map((kb, i) => (
            <motion.a
              key={kb.id}
              href={kb.url}
              target="_blank"
              rel="noopener noreferrer"
              className={`group block rounded-2xl p-5 md:p-6 shadow-sm ring-1 transition-all duration-200 overflow-hidden
                hover:shadow-lg hover:-translate-y-0.5 cursor-pointer no-underline
                ${cardAccents[i % cardAccents.length]}`}
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.25 + i * 0.08, duration: 0.35 }}
            >
              <div className="flex flex-wrap items-start justify-between gap-3 mb-3">
                <div className="flex items-center gap-3 min-w-0">
                  <span className="text-2xl">{rankBadges[i].emoji}</span>
                  <div className="min-w-0">
                    <div className="flex items-center gap-2 mb-0.5">
                      <span className={`px-2 py-0.5 rounded-full text-[11px] font-bold font-body ${rankBadges[i].bg}`}>
                        {rankBadges[i].label}
                      </span>
                      <span className="text-xs text-ink-muted font-body">{kb.score}/{kb.maxScore} match</span>
                    </div>
                    <h3 className="font-display font-bold text-xl text-ink group-hover:text-key-600 transition-colors truncate">
                      {kb.name}
                    </h3>
                    <p className="text-sm text-ink-muted font-body">{kb.brand}</p>
                  </div>
                </div>
                <div className="text-right shrink-0">
                  <p className="text-2xl font-display font-bold text-key-500">{kb.price}</p>
                  <p className="text-[10px] text-ink-muted font-body">approx</p>
                </div>
              </div>

              <p className="text-sm text-ink-muted font-body leading-relaxed mb-3">{kb.description}</p>

              <div className="flex flex-wrap gap-1.5 mb-3">
                {kb.highlights.map((h) => (
                  <span key={h} className="px-2.5 py-1 bg-white/70 text-ink-muted rounded-lg text-xs font-body border border-black/5">
                    {h}
                  </span>
                ))}
              </div>

              <div className="flex flex-wrap gap-x-5 gap-y-1.5 pt-2 border-t border-black/5">
                {allDimensions.map((dim) => (
                  <MatchDot key={dim} dim={dim} matched={kb.matchedOn.includes(dim)} />
                ))}
              </div>
            </motion.a>
          ))}
        </div>

        {/* Actions */}
        <motion.div
          className="flex justify-center gap-3 flex-wrap"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          <motion.button
            onClick={onRestart}
            className="inline-flex items-center gap-2 px-6 py-3 bg-white rounded-2xl text-ink-muted
                       font-body text-sm shadow-sm ring-1 ring-black/5 hover:ring-key-400/40 hover:text-key-600
                       hover:shadow-md transition-all duration-200 active:scale-95 cursor-pointer"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.97 }}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="1 4 1 10 7 10" />
              <path d="M3.51 15a9 9 0 1 0 2.13-9.36L1 10" />
            </svg>
            Retake quiz
          </motion.button>
          <motion.button
            onClick={onHome}
            className="inline-flex items-center gap-2 px-6 py-3 bg-key-500 text-white rounded-2xl
                       font-body text-sm shadow-lg shadow-key-500/25 hover:bg-key-600
                       hover:shadow-xl hover:shadow-key-500/30 transition-all duration-200 active:scale-95 cursor-pointer"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.97 }}
          >
            Back to home
          </motion.button>
        </motion.div>
      </div>
    </motion.div>
  );
}
