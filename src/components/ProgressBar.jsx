import { motion } from 'framer-motion';

export default function ProgressBar({ current, total }) {
  const pct = ((current / total) * 100).toFixed(0);

  return (
    <div className="w-full mb-3">
      <div className="flex justify-between items-center mb-2">
        <span className="text-sm font-medium text-ink-muted font-body">
          Question {current + 1} of {total}
        </span>
        <span className="text-sm font-medium text-key-500 font-body">{pct}%</span>
      </div>
      <div className="w-full h-2 bg-warm-200 rounded-full overflow-hidden">
        <motion.div
          className="h-full bg-gradient-to-r from-key-400 to-key-600 rounded-full"
          initial={{ width: `${((current) / total) * 100}%` }}
          animate={{ width: `${pct}%` }}
          transition={{ duration: 0.4, ease: 'easeOut' }}
        />
      </div>
    </div>
  );
}
