import { useState, useCallback } from 'react';
import { AnimatePresence } from 'framer-motion';
import HomeScreen from './components/HomeScreen';
import QuizQuestion from './components/QuizQuestion';
import ProgressBar from './components/ProgressBar';
import Results from './components/Results';
import BrowseKeyboards from './components/BrowseKeyboards';
import TypingTest from './components/TypingTest';
import { questions } from './data/questions';
import { scoreKeyboards } from './data/scorer';

export default function App() {
  const [screen, setScreen] = useState('home');
  const [currentQ, setCurrentQ] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [direction, setDirection] = useState(0);
  const [results, setResults] = useState([]);
  const [soundFilter, setSoundFilter] = useState(null);

  const navigate = useCallback((target) => {
    if (target === 'quiz') {
      setScreen('quiz');
      setCurrentQ(0);
      setAnswers([]);
      setDirection(0);
    } else if (target === 'browse') {
      setSoundFilter(null);
      setScreen('browse');
    } else if (target === 'typing-test') {
      setScreen('typing-test');
    }
  }, []);

  const handleFindKeyboards = useCallback((sounds) => {
    setSoundFilter(sounds);
    setScreen('browse');
  }, []);

  const handleAnswer = useCallback(
    (option) => {
      const newAnswers = [...answers, option];
      setAnswers(newAnswers);

      if (currentQ + 1 < questions.length) {
        setDirection(1);
        setCurrentQ(currentQ + 1);
      } else {
        const scored = scoreKeyboards(newAnswers);
        setResults(scored);
        setScreen('results');
      }
    },
    [answers, currentQ],
  );

  const handleBack = useCallback(() => {
    if (currentQ > 0) {
      setDirection(-1);
      setCurrentQ(currentQ - 1);
      setAnswers(answers.slice(0, -1));
    }
  }, [currentQ, answers]);

  const goHome = useCallback(() => {
    setScreen('home');
    setCurrentQ(0);
    setAnswers([]);
    setResults([]);
    setSoundFilter(null);
  }, []);

  const handleRestart = useCallback(() => {
    setScreen('quiz');
    setCurrentQ(0);
    setAnswers([]);
    setResults([]);
    setDirection(0);
  }, []);

  return (
    <div className="min-h-svh bg-cream relative">
      {screen === 'home' && (
        <div className="bg-blobs">
          <div className="bg-blob bg-blob-1" />
          <div className="bg-blob bg-blob-2" />
          <div className="bg-blob bg-blob-3" />
        </div>
      )}

      <div className="relative z-10">
        {screen === 'home' && <HomeScreen onNavigate={navigate} />}

        {screen === 'browse' && (
          <BrowseKeyboards onBack={goHome} initialSoundFilter={soundFilter} />
        )}

        {screen === 'typing-test' && (
          <TypingTest onBack={goHome} onFindKeyboards={handleFindKeyboards} />
        )}

        {screen === 'quiz' && (
          <div className="min-h-svh flex flex-col">
            <div className="pt-6 sm:pt-8 pb-1 px-4 sm:px-6">
              <div className="max-w-3xl mx-auto">
                <div className="relative flex items-center justify-center mb-2">
                  <button
                    onClick={currentQ === 0 ? goHome : handleBack}
                    className="absolute left-0 inline-flex items-center gap-2 text-ink-muted hover:text-ink font-body text-base
                               transition-colors cursor-pointer px-3 py-2 rounded-lg hover:bg-white/60"
                  >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                      strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="15 18 9 12 15 6" />
                    </svg>
                    {currentQ === 0 ? 'Exit' : 'Back'}
                  </button>
                  <span className="font-hand text-2xl text-key-400">key peeps</span>
                </div>
                <ProgressBar current={currentQ} total={questions.length} />
              </div>
            </div>

            <div className="flex-1 flex items-center justify-center overflow-auto py-4">
              <AnimatePresence mode="wait" custom={direction}>
                <QuizQuestion
                  key={questions[currentQ].id}
                  question={questions[currentQ]}
                  onSelect={handleAnswer}
                  direction={direction}
                />
              </AnimatePresence>
            </div>
          </div>
        )}

        {screen === 'results' && (
          <Results
            keyboards={results}
            answers={answers}
            onRestart={handleRestart}
            onHome={goHome}
          />
        )}
      </div>
    </div>
  );
}
