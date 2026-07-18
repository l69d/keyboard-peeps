import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import { keyboards } from '../data/keyboards';

const FILTER_GROUPS = [
  { cat: 'size', label: 'Size', options: ['full', 'tkl', '75%', '65%', '60%', '40%'] },
  { cat: 'switch', label: 'Switch feel', options: ['linear', 'tactile', 'clicky'] },
  { cat: 'budget', label: 'Budget', options: ['budget', 'mid', 'premium', 'enthusiast'] },
  { cat: 'connectivity', label: 'Connection', options: ['wired', 'wireless'] },
  { cat: 'sound', label: 'Sound', options: ['thocky', 'creamy', 'clacky', 'balanced', 'silent', 'marbly'] },
];

const sizeIcons = { full: '🏢', tkl: '🖥️', '75%': '⌨️', '65%': '🎯', '60%': '⚡', '40%': '🔮' };
const switchIcons = { linear: '🧈', tactile: '🤌', clicky: '🎵' };
const soundIcons = { thocky: '🌧️', creamy: '🧈', clacky: '🎵', balanced: '⚖️', silent: '🤫', marbly: '🪨' };

export default function BrowseKeyboards({ onBack, initialSoundFilter }) {
  const [activeFilters, setActiveFilters] = useState({});

  // Apply initial sound filter when arriving from typing test
  useEffect(() => {
    if (initialSoundFilter && initialSoundFilter.length > 0) {
      setActiveFilters((prev) => ({ ...prev, sound: initialSoundFilter }));
    }
  }, [initialSoundFilter]);

  const toggleFilter = (category, value) => {
    setActiveFilters((prev) => {
      const current = prev[category] || [];
      const next = current.includes(value)
        ? current.filter((v) => v !== value)
        : [...current, value];
      const newFilters = { ...prev, [category]: next };
      if (next.length === 0) delete newFilters[category];
      return newFilters;
    });
  };

  const filtered = keyboards.filter((kb) => {
    for (const [cat, values] of Object.entries(activeFilters)) {
      if (values.length === 0) continue;
      if (!values.some((v) => kb.tags[cat]?.includes(v))) return false;
    }
    return true;
  });

  const hasFilters = Object.keys(activeFilters).length > 0;

  return (
    <motion.div className="min-h-svh" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
      <div className="max-w-6xl mx-auto px-4 py-5">
        {/* Top bar — grid for true centering */}
        <div className="grid grid-cols-3 items-center mb-4">
          <div>
            <button
              onClick={onBack}
              className="inline-flex items-center gap-1.5 text-ink-muted hover:text-ink font-body text-sm
                         transition-colors cursor-pointer px-2.5 py-1.5 rounded-lg hover:bg-white/60"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="15 18 9 12 15 6" />
              </svg>
              Back
            </button>
          </div>
          <span className="font-hand text-xl text-key-400 text-center">key peeps</span>
          <div />
        </div>

        <h1 className="font-display text-2xl font-bold text-ink mb-4 text-center">Browse keyboards</h1>

        {/* Filters — consistent padding */}
        <div className="mb-4 p-4 bg-white rounded-2xl shadow-sm ring-1 ring-black/5">
          <div className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2.5">
            {FILTER_GROUPS.map(({ cat, label, options }) => (
              <div key={cat} className="flex items-center gap-1.5">
                <span className="text-xs font-semibold text-ink-muted uppercase tracking-wider shrink-0">
                  {label}
                </span>
                {options.map((opt) => {
                  const isActive = (activeFilters[cat] || []).includes(opt);
                  return (
                    <button
                      key={opt}
                      onClick={() => toggleFilter(cat, opt)}
                      className={`px-2.5 py-1 rounded-full text-xs font-body transition-all duration-200 cursor-pointer whitespace-nowrap
                        ${isActive
                          ? 'bg-key-500 text-white shadow-sm shadow-key-500/20'
                          : 'bg-warm-50 text-ink-muted hover:bg-warm-100 hover:text-ink'
                        }`}
                    >
                      {soundIcons[opt] ? `${soundIcons[opt]} ` : ''}{opt}
                    </button>
                  );
                })}
              </div>
            ))}
            {hasFilters && (
              <button
                onClick={() => setActiveFilters({})}
                className="text-xs text-key-500 font-body hover:underline cursor-pointer shrink-0"
              >
                Clear all
              </button>
            )}
          </div>
        </div>

        <p className="text-sm text-ink-muted font-body mb-4 text-center" role="status" aria-live="polite">
          {filtered.length} keyboard{filtered.length !== 1 ? 's' : ''}{hasFilters ? (filtered.length === 1 ? ' matches' : ' match') : ' total'}
        </p>

        {/* Keyboard grid */}
        <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <AnimatePresence mode="popLayout">
            {filtered.map((kb) => (
              <motion.a
                key={kb.id}
                href={kb.url}
                target="_blank"
                rel="noopener noreferrer"
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.2 }}
                className="group block bg-white rounded-2xl p-5 shadow-sm ring-1 ring-black/5 overflow-hidden
                           hover:shadow-lg hover:-translate-y-0.5 hover:ring-purple-200/30
                           transition-all duration-200 cursor-pointer no-underline"
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-3 min-w-0">
                    <span className="text-2xl shrink-0">{sizeIcons[kb.tags.size[0]] || '⌨️'}</span>
                    <div className="min-w-0">
                      <h3 className="font-display font-bold text-lg text-ink group-hover:text-key-600 transition-colors truncate">
                        {kb.name}
                      </h3>
                      <p className="text-xs text-ink-muted font-body">{kb.brand}</p>
                    </div>
                  </div>
                  <span className="font-display font-bold text-xl text-key-500 shrink-0 ml-3">{kb.price}</span>
                </div>

                <p className="text-sm text-ink-muted font-body leading-relaxed mb-3">
                  {kb.description}
                </p>

                <div className="flex flex-wrap gap-1.5 mb-3">
                  {kb.highlights.slice(0, 3).map((h) => (
                    <span key={h} className="px-2 py-0.5 bg-warm-50 text-ink-muted rounded-md text-xs font-body">
                      {h}
                    </span>
                  ))}
                </div>

                <div className="flex flex-wrap gap-1.5">
                  {kb.tags.size.slice(0, 2).map((s) => (
                    <span key={s} className="inline-flex items-center gap-1 px-2 py-0.5 bg-warm-100/60 rounded text-xs font-body text-ink-muted">
                      {sizeIcons[s] || ''} {s}
                    </span>
                  ))}
                  {kb.tags.switch.slice(0, 2).map((s) => (
                    <span key={s} className="inline-flex items-center gap-1 px-2 py-0.5 bg-warm-100/60 rounded text-xs font-body text-ink-muted">
                      {switchIcons[s] || ''} {s}
                    </span>
                  ))}
                  {kb.tags.sound && kb.tags.sound.slice(0, 2).map((s) => (
                    <span key={s} className="inline-flex items-center gap-1 px-2 py-0.5 bg-warm-100/60 rounded text-xs font-body text-ink-muted">
                      {soundIcons[s] || '🔊'} {s}
                    </span>
                  ))}
                </div>
              </motion.a>
            ))}
          </AnimatePresence>
        </motion.div>

        {filtered.length === 0 && (
          <div className="text-center py-10" role="alert">
            <p className="text-4xl mb-3">🏷️</p>
            <p className="text-ink-muted font-body mb-2">No keyboards match those filters</p>
            <button onClick={() => setActiveFilters({})} className="text-key-500 font-body text-sm hover:underline cursor-pointer">
              Clear all filters
            </button>
          </div>
        )}
      </div>
    </motion.div>
  );
}
