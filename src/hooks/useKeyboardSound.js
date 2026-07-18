import { useCallback, useRef } from 'react';

/**
 * Preset sound profiles that map to slider positions.
 */
export const PRESETS = {
  'thocky':   { thock: 90, clack: 10, pop: 20, volume: 70, label: 'Thocky', icon: '🌧️', desc: 'Deep, muted, bass-heavy' },
  'creamy':   { thock: 30, clack: 15, pop: 85, volume: 65, label: 'Creamy', icon: '🧈', desc: 'Smooth, rounded, poppy' },
  'clacky':   { thock: 15, clack: 90, pop: 25, volume: 75, label: 'Clacky', icon: '🎵', desc: 'Bright, sharp, percussive' },
  'marbly':   { thock: 40, clack: 55, pop: 60, volume: 70, label: 'Marbly', icon: '🪨', desc: 'High-pitched thock, like marbles' },
  'silent':   { thock: 25, clack: 5,  pop: 15, volume: 35, label: 'Silent', icon: '🤫', desc: 'Quiet, office-friendly' },
  'balanced': { thock: 50, clack: 40, pop: 50, volume: 65, label: 'Balanced', icon: '⚖️', desc: 'Even mix of everything' },
};

/**
 * Hook that plays synthesized keyboard sounds.
 * - playCustomSound(params): play with { thock, clack, pop, volume } 0-100
 * - playPreset(key): play a named preset
 */
export function useKeyboardSound() {
  const ctxRef = useRef(null);

  const getCtx = useCallback(() => {
    if (!ctxRef.current) {
      ctxRef.current = new (window.AudioContext || window.webkitAudioContext)();
    }
    if (ctxRef.current.state === 'suspended') {
      ctxRef.current.resume();
    }
    return ctxRef.current;
  }, []);

  /**
   * Play a sound with full parameter control.
   * @param {Object} params
   * @param {number} params.thock  - 0-100, deep bass body
   * @param {number} params.clack  - 0-100, high-frequency click
   * @param {number} params.pop    - 0-100, mid-frequency pop/tactile
   * @param {number} params.volume - 0-100, overall loudness
   * @param {string} [keyChar]     - for pitch variation
   */
  const playCustomSound = useCallback(
    (params, keyChar = '') => {
      try {
        const ctx = getCtx();
        const t = params.thock / 100;
        const c = params.clack / 100;
        const p = params.pop / 100;
        const v = params.volume / 100;

        const now = ctx.currentTime;
        const charCode = keyChar ? keyChar.charCodeAt(0) : 65;
        const pitchVar = 1 + ((charCode % 10) - 5) * 0.02;

        // --- Thock: low-frequency body oscillator ---
        if (t > 0.02) {
          const body = ctx.createOscillator();
          const bodyGain = ctx.createGain();
          body.type = 'sine';
          body.frequency.value = (80 + t * 120) * pitchVar;
          bodyGain.gain.setValueAtTime(t * 0.4 * v, now);
          bodyGain.gain.exponentialRampToValueAtTime(0.001, now + 0.15 + t * 0.1);
          body.connect(bodyGain);
          bodyGain.connect(ctx.destination);
          body.start(now);
          body.stop(now + 0.3);
        }

        // --- Pop: mid-frequency tactile bump ---
        if (p > 0.02) {
          const pop = ctx.createOscillator();
          const popGain = ctx.createGain();
          pop.type = 'triangle';
          pop.frequency.value = (300 + p * 500) * pitchVar;
          popGain.gain.setValueAtTime(p * 0.3 * v, now + 0.005);
          popGain.gain.exponentialRampToValueAtTime(0.001, now + 0.06 + p * 0.08);
          pop.connect(popGain);
          popGain.connect(ctx.destination);
          pop.start(now + 0.005);
          pop.stop(now + 0.15);
        }

        // --- Clack: high-frequency click ---
        if (c > 0.02) {
          const click = ctx.createOscillator();
          const clickGain = ctx.createGain();
          click.type = 'square';
          click.frequency.value = (600 + c * 2400) * pitchVar;
          clickGain.gain.setValueAtTime(c * 0.35 * v, now);
          clickGain.gain.exponentialRampToValueAtTime(0.001, now + 0.04 + c * 0.06);
          click.connect(clickGain);
          clickGain.connect(ctx.destination);
          click.start(now);
          click.stop(now + 0.12);

          // Noise burst for texture on clacky sounds
          if (c > 0.3) {
            const noiseLen = 0.03;
            const noiseBuf = ctx.createBuffer(1, ctx.sampleRate * noiseLen, ctx.sampleRate);
            const noiseData = noiseBuf.getChannelData(0);
            for (let i = 0; i < noiseData.length; i++) {
              noiseData[i] = (Math.random() * 2 - 1) * (1 - i / noiseData.length);
            }
            const noise = ctx.createBufferSource();
            const noiseGain = ctx.createGain();
            const noiseFilter = ctx.createBiquadFilter();
            noise.buffer = noiseBuf;
            noiseFilter.type = 'highpass';
            noiseFilter.frequency.value = 2000;
            noiseGain.gain.setValueAtTime(c * 0.08 * v, now);
            noiseGain.gain.exponentialRampToValueAtTime(0.001, now + 0.025);
            noise.connect(noiseFilter);
            noiseFilter.connect(noiseGain);
            noiseGain.connect(ctx.destination);
            noise.start(now);
            noise.stop(now + noiseLen);
          }
        }
      } catch (e) { /* silent fail */ }
    },
    [getCtx],
  );

  /** Play a named preset */
  const playPreset = useCallback(
    (presetKey, keyChar = '') => {
      const preset = PRESETS[presetKey];
      if (preset) playCustomSound(preset, keyChar);
    },
    [playCustomSound],
  );

  /** Get a preset by key */
  const getPreset = useCallback((key) => PRESETS[key] || PRESETS.balanced, []);

  return { playCustomSound, playPreset, getPreset, PRESETS };
}
