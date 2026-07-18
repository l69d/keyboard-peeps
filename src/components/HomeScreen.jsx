import { motion } from 'framer-motion';

const options = [
  {
    id: 'quiz',
    emoji: '🎯',
    title: 'Take the Quiz',
    subtitle: 'Find your match',
    description: 'Answer a few quick questions and we\'ll recommend the perfect keyboard for your style.',
    color: 'from-purple-100 to-pink-100',
    iconBg: 'bg-purple-100',
    cta: 'Start quiz →',
  },
  {
    id: 'browse',
    emoji: '🔍',
    title: 'Browse Keyboards',
    subtitle: 'Explore the collection',
    description: 'Scroll through popular keyboards, filter by size, switch type, budget, and more.',
    color: 'from-blue-100 to-cyan-100',
    iconBg: 'bg-blue-100',
    cta: 'Browse all →',
  },
  {
    id: 'typing-test',
    emoji: '🎵',
    title: 'Sound Test',
    subtitle: 'Hear the difference',
    description: 'Type and hear what different switches sound like — thocky, creamy, or clicky.',
    color: 'from-amber-100 to-orange-100',
    iconBg: 'bg-amber-100',
    cta: 'Try it out →',
  },
];

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  show: (i) => ({
    opacity: 1,
    y: 0,
    transition: { delay: 0.15 + i * 0.1, duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] },
  }),
};

export default function HomeScreen({ onNavigate }) {
  return (
    <motion.div
      className="relative flex flex-col items-center justify-center min-h-svh px-4 py-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      {/* Background blobs */}
      <div className="bg-blobs">
        <div className="bg-blob bg-blob-1" />
        <div className="bg-blob bg-blob-2" />
        <div className="bg-blob bg-blob-3" />
      </div>

      <div className="relative z-10 w-full max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <motion.div
            className="text-4xl md:text-5xl mb-2"
            animate={{ y: [-4, 4, -4] }}
            transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
          >
            ⌨️
          </motion.div>

          <motion.h1
            className="font-display text-4xl md:text-5xl font-bold text-ink mb-1 tracking-tight"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.4 }}
          >
            key{' '}
            <span className="font-doodle text-key-500 inline-block" style={{ fontSize: '1.1em' }}>
              peeps
            </span>
          </motion.h1>

          <motion.p
            className="font-hand text-xl md:text-2xl text-key-400"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.4 }}
          >
            ~ find the keyboard that matches your vibe ~
          </motion.p>
        </div>

        {/* Option cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {options.map((opt, i) => (
            <motion.button
              key={opt.id}
              custom={i}
              variants={cardVariants}
              initial="hidden"
              animate="show"
              onClick={() => onNavigate(opt.id)}
              className="group relative flex flex-col items-center text-center p-6 rounded-2xl overflow-hidden
                         bg-white shadow-md shadow-black/3 ring-1 ring-black/5
                         hover:shadow-xl hover:shadow-purple-200/20 hover:-translate-y-1
                         hover:ring-purple-300/30 transition-all duration-300 cursor-pointer"
            >
              <div
                className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${opt.color} opacity-0 group-hover:opacity-40 transition-opacity duration-300 pointer-events-none`}
              />

              <div className="relative z-10">
                <div
                  className={`inline-flex items-center justify-center w-16 h-16 rounded-xl ${opt.iconBg} text-2xl mb-3
                              group-hover:scale-110 transition-transform duration-300 overflow-hidden leading-none`}
                >
                  {opt.emoji}
                </div>

                <p className="text-[11px] font-bold text-key-500 font-body uppercase tracking-wider mb-0.5">
                  {opt.subtitle}
                </p>
                <h2 className="font-display font-bold text-xl text-ink mb-1.5 group-hover:text-key-600 transition-colors">
                  {opt.title}
                </h2>
                <p className="text-sm text-ink-muted font-body leading-snug mb-5 max-w-60 mx-auto">
                  {opt.description}
                </p>

                <span className="inline-flex items-center gap-1 text-sm font-semibold text-key-500 font-body
                                 group-hover:gap-2 transition-all duration-300">
                  {opt.cta}
                </span>
              </div>
            </motion.button>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
