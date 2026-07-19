import { motion, AnimatePresence } from 'framer-motion';
import { useState, useCallback, useRef } from 'react';
import { useKeyboardSound, PRESETS } from '../hooks/useKeyboardSound';

const SLIDERS = [
  { key: 'thock', label: 'Thock', icon: '🌧️', hint: 'Deep bass body' },
  { key: 'pop',   label: 'Pop',   icon: '🫧', hint: 'Mid-range bump' },
  { key: 'clack', label: 'Clack', icon: '🎵', hint: 'High-end click' },
  { key: 'volume',label: 'Volume',icon: '🔊', hint: 'Overall loudness' },
];

export default function TypingTest({ onBack, onFindKeyboards }) {
  const [params, setParams] = useState({ thock: 50, clack: 40, pop: 50, volume: 65 });
  const [text, setText] = useState('');
  const [pressedKeys, setPressedKeys] = useState([]);
  const [keyCount, setKeyCount] = useState(0);
  const [activePreset, setActivePreset] = useState(null);
  const textareaRef = useRef(null);
  const { playCustomSound } = useKeyboardSound();

  const applyPreset = (key) => {
    const preset = PRESETS[key];
    if (preset) {
      setParams({ thock: preset.thock, clack: preset.clack, pop: preset.pop, volume: preset.volume });
      setActivePreset(key);
    }
  };

  const updateParam = (key, value) => {
    setParams((p) => ({ ...p, [key]: value }));
    setActivePreset(null); // manual adjustment clears preset
  };

  const handleKeyDown = useCallback(
    (e) => {
      if (!['Shift', 'Control', 'Alt', 'Meta', 'CapsLock', 'Tab', 'Escape'].includes(e.key)) {
        playCustomSound(params, e.key);
        const keyId = `${e.key}-${Date.now()}`;
        setPressedKeys((prev) => [...prev, { id: keyId, key: e.key }].slice(-14));
        setTimeout(() => setPressedKeys((prev) => prev.filter((k) => k.id !== keyId)), 350);
        setKeyCount((c) => c + 1);
      }
    },
    [playCustomSound, params],
  );

  // Determine dominant sound for matching keyboards
  const dominantSound = () => {
    if (activePreset) return [activePreset];
    const sounds = [];
    if (params.thock > 60) sounds.push('thocky');
    if (params.pop > 60) sounds.push('creamy');
    if (params.clack > 60) sounds.push('clacky');
    if (params.volume < 40) sounds.push('silent');
    if (sounds.length === 0) sounds.push('balanced');
    return sounds;
  };

  return (
    <motion.div className="min-h-svh flex flex-col" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
      <div className="w-full max-w-xl mx-auto px-4 sm:px-6 pt-6 sm:pt-8">
        {/* Top bar */}
        <div className="flex items-center justify-between">
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
          <span className="font-hand text-xl text-key-400">key peeps</span>
          <div className="w-10" />
        </div>
      </div>

      <div className="flex-1 flex items-center justify-center px-4 sm:px-6">
        <div className="w-full max-w-xl mx-auto py-6">
          <h1 className="font-display text-2xl font-bold text-ink mb-1 text-center">Sound Mixer</h1>
          <p className="text-sm text-ink-muted font-body mb-6 text-center">
            Blend your perfect keyboard sound, then find matching keyboards
          </p>

          {/* Presets */}
          <div className="mb-6">
            <p className="text-[11px] font-semibold text-ink-muted uppercase tracking-wider mb-2 text-center">Quick presets</p>
            <div className="flex flex-wrap justify-center gap-2">
              {Object.entries(PRESETS).map(([key, p]) => (
                <button
                  key={key}
                  onClick={() => applyPreset(key)}
                  className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-body transition-all duration-200 cursor-pointer
                    ${activePreset === key
                      ? 'bg-key-500 text-white shadow-md shadow-key-500/20'
                      : 'bg-white text-ink-muted ring-1 ring-black/5 hover:ring-key-300/40'
                    }`}
                >
                  {p.icon} {p.label}
                </button>
              ))}
            </div>
            {activePreset && (
              <p className="text-center text-xs text-ink-muted mt-1.5 font-body">
                {PRESETS[activePreset].desc} — tweak sliders to customize
              </p>
            )}
          </div>

          {/* Sliders */}
          <div className="bg-white rounded-2xl p-5 mb-6 shadow-sm ring-1 ring-black/5 space-y-6">
            {SLIDERS.map((s) => (
              <div key={s.key}>
                <div className="flex items-center justify-between mb-1.5">
                  <span className="flex items-center gap-1.5 text-xs font-semibold text-ink font-body">
                    {s.icon} {s.label}
                  </span>
                  <span className="text-xs text-ink-muted font-body tabular-nums w-8 text-right">
                    {params[s.key]}
                  </span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={params[s.key]}
                  onChange={(e) => updateParam(s.key, parseInt(e.target.value))}
                  className="w-full h-1.5 rounded-full appearance-none cursor-pointer
                             bg-warm-200 accent-key-500
                             [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-4
                             [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:rounded-full
                             [&::-webkit-slider-thumb]:bg-key-500 [&::-webkit-slider-thumb]:shadow-md
                             [&::-webkit-slider-thumb]:cursor-pointer"
                />
                <p className="text-[10px] text-ink-muted/50 font-body mt-1.5">{s.hint}</p>
              </div>
            ))}
          </div>

          {/* Keypress indicators */}
          <div className="flex justify-center gap-1 mb-4 min-h-[32px] flex-wrap items-end">
            <AnimatePresence mode="popLayout">
              {pressedKeys.map((k) => (
                <motion.div
                  key={k.id}
                  initial={{ opacity: 0, y: 10, scale: 0.5 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -10, scale: 0.5 }}
                  transition={{ duration: 0.15 }}
                  className="flex items-center justify-center w-7 h-7 rounded-lg bg-white shadow-sm
                             ring-1 ring-black/5 font-display font-bold text-[11px] text-ink"
                >
                  {k.key === ' ' ? '␣' : k.key.length === 1 ? k.key.toUpperCase() : k.key.slice(0, 2)}
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          {/* Typing area */}
          <div className="relative bg-white rounded-2xl p-4 shadow-sm ring-1 ring-black/5 hover:ring-key-300/20 transition-all min-h-[140px] mb-6">
            <textarea
              ref={textareaRef}
              value={text}
              onChange={(e) => setText(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Type here to test your custom sound mix..."
              className="w-full min-h-[100px] bg-transparent border-none outline-none resize-none
                         font-body text-base text-ink placeholder:text-ink-muted/30 leading-relaxed"
              autoFocus
            />
            <div className="text-right text-[11px] text-ink-muted font-body opacity-40">
              {keyCount} keystroke{keyCount !== 1 ? 's' : ''}
            </div>
          </div>

          {/* Find matching keyboards button */}
          <motion.button
            onClick={() => onFindKeyboards(dominantSound())}
            className="w-full py-3.5 bg-key-500 text-white font-display font-semibold text-base
                       rounded-2xl shadow-lg shadow-key-500/25 hover:bg-key-600
                       hover:shadow-xl hover:shadow-key-500/30 transition-all duration-200
                       active:scale-[0.98] cursor-pointer flex items-center justify-center gap-2"
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.98 }}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="11" cy="11" r="8" />
              <polyline points="21 21 16.65 16.65" />
            </svg>
            Find keyboards with this sound →
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
}
