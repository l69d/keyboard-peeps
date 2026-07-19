import { motion } from 'framer-motion';

export default function ProgressBar({ current, total }) {
  const pct = ((current / total) * 100).toFixed(0);
  const prevPct = current > 0 ? (((current - 1) / total) * 100).toFixed(0) : 0;

  return (
    <div className="w-full mb-3" role="progressbar" aria-valuenow={current} aria-valuemin={0} aria-valuemax={total} aria-valuetext={`Question ${current + 1} of ${total}`}>
      <div className="flex justify-between items-center mb-2 gap-2">
        <span className="text-sm font-medium text-ink-muted font-body shrink-0">
          Question {current + 1} of {total}
        </span>
        <span className="text-sm font-medium text-key-500 font-body shrink-0">{pct}%</span>
      </div>
      <div className="w-full h-2 bg-warm-200 rounded-full overflow-hidden">
        <motion.div
          className="h-full bg-gradient-to-r from-key-400 to-key-600 rounded-full"
          initial={{ width: `${prevPct}%` }}
          animate={{ width: `${pct}%` }}
          transition={{ duration: 0.4, ease: 'easeOut' }}
        />
      </div>
    </div>
  );
}
