import { useState, useCallback } from 'react';
import { AnimatePresence } from 'framer-motion';
import WelcomeScreen from './components/WelcomeScreen';
import QuizQuestion from './components/QuizQuestion';
import ProgressBar from './components/ProgressBar';
import Results from './components/Results';
import { questions } from './data/questions';
import { scoreKeyboards } from './data/scorer';

export default function App() {
  const [screen, setScreen] = useState('welcome'); // welcome | quiz | results
  const [currentQ, setCurrentQ] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [direction, setDirection] = useState(0);
  const [results, setResults] = useState([]);

  const startQuiz = useCallback(() => {
    setScreen('quiz');
    setCurrentQ(0);
    setAnswers([]);
    setDirection(0);
  }, []);

  const handleAnswer = useCallback(
    (option) => {
      const newAnswers = [...answers, option];
      setAnswers(newAnswers);

      if (currentQ + 1 < questions.length) {
        setDirection(1);
        setCurrentQ(currentQ + 1);
      } else {
        // Quiz complete — score results
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

  const handleRestart = useCallback(() => {
    setScreen('welcome');
    setCurrentQ(0);
    setAnswers([]);
    setResults([]);
  }, []);

  return (
    <div className="min-h-svh bg-cream">
      {screen === 'welcome' && <WelcomeScreen onStart={startQuiz} />}

      {screen === 'quiz' && (
        <div className="min-h-svh flex flex-col">
          {/* Top bar */}
          <div className="pt-8 pb-4 px-4">
            <div className="max-w-2xl mx-auto flex items-center justify-between mb-4">
              <button
                onClick={currentQ === 0 ? handleRestart : handleBack}
                className="text-ink-muted hover:text-ink font-body text-sm transition-colors cursor-pointer"
              >
                ← {currentQ === 0 ? 'Back to start' : 'Previous'}
              </button>
              <span className="font-hand text-xl text-key-400">key peeps</span>
              <div className="w-20" />
            </div>
            <ProgressBar current={currentQ} total={questions.length} />
          </div>

          {/* Question area */}
          <div className="flex-1 flex items-center justify-center py-8">
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
        />
      )}
    </div>
  );
}
