import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useReducedMotion } from '@/hooks/useReducedMotion';

const bootLines = [
  { label: 'SYSTEM', text: 'SOORYA M // CLOUD ENGINEERING LAB', delay: 0 },
  { label: 'NETWORK', text: '............ ONLINE', delay: 400 },
  { label: 'COMPUTE', text: '............ ONLINE', delay: 800 },
  { label: 'CONTAINERS', text: '......... ONLINE', delay: 1200 },
  { label: 'DEPLOYMENT', text: '......... ONLINE', delay: 1600 },
  { label: 'MONITORING', text: '......... ONLINE', delay: 2000 },
];

function BootLine({ label, text, delay, reducedMotion }) {
  const [visible, setVisible] = useState(reducedMotion);
  const [dotCount, setDotCount] = useState(0);

  useEffect(() => {
    if (reducedMotion) return;
    const timeout = setTimeout(() => setVisible(true), delay);
    return () => clearTimeout(timeout);
  }, [delay, reducedMotion]);

  useEffect(() => {
    if (!visible || text.startsWith('SOORYA')) return;
    const interval = setInterval(() => {
      setDotCount((c) => {
        if (c >= 3) { clearInterval(interval); return c; }
        return c + 1;
      });
    }, 80);
    return () => clearInterval(interval);
  }, [visible, text]);

  if (!visible) return <div className="h-6" />;

  return (
    <motion.div
      initial={reducedMotion ? false : { opacity: 0, x: -10 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.3 }}
      className="flex items-start gap-4 font-mono text-sm"
    >
      <span className="text-text-muted w-24 flex-shrink-0">[{label}]</span>
      <span className="text-accent">{text}</span>
    </motion.div>
  );
}

export default function BootSequence({ onComplete }) {
  const reducedMotion = useReducedMotion();
  const [showEnter, setShowEnter] = useState(false);
  const [exiting, setExiting] = useState(false);

  useEffect(() => {
    const delay = reducedMotion ? 0 : 2600;
    const timeout = setTimeout(() => setShowEnter(true), delay);
    return () => clearTimeout(timeout);
  }, [reducedMotion]);

  function handleEnter() {
    setExiting(true);
    setTimeout(onComplete, reducedMotion ? 0 : 500);
  }

  return (
    <AnimatePresence>
      {!exiting && (
        <motion.div
          key="boot"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="fixed inset-0 z-50 bg-bg flex flex-col items-center justify-center px-6"
        >
          {/* Grid background */}
          <div className="absolute inset-0 grid-bg opacity-30 pointer-events-none" />

          {/* Scan line */}
          {!reducedMotion && (
            <div
              className="absolute inset-x-0 h-px bg-gradient-to-r from-transparent via-accent/20 to-transparent pointer-events-none animate-scan"
              style={{ animationDuration: '6s' }}
            />
          )}

          <div className="relative w-full max-w-lg space-y-3">
            {/* Logo */}
            <div className="mb-8">
              <div className="font-mono text-2xl text-text-primary tracking-widest">
                SOORYA M
              </div>
              <div className="font-mono text-xs text-accent tracking-[0.3em] mt-1">
                AWS CLOUD & DEVOPS LAB — v2.0
              </div>
            </div>

            {/* Boot lines */}
            {bootLines.map((line) => (
              <BootLine
                key={line.label}
                {...line}
                reducedMotion={reducedMotion}
              />
            ))}

            {/* Enter button */}
            <AnimatePresence>
              {showEnter && (
                <motion.div
                  initial={reducedMotion ? false : { opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4 }}
                  className="pt-8 flex gap-4"
                >
                  <button
                    onClick={handleEnter}
                    className="font-mono text-sm px-6 py-3 bg-accent text-bg font-semibold rounded hover:bg-accent/90 transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent shadow-[0_0_20px_rgba(0,212,255,0.4)]"
                    autoFocus
                  >
                    [ ENTER LAB ]
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Skip button */}
          <button
            onClick={handleEnter}
            className="absolute bottom-6 right-6 font-mono text-xs text-text-muted hover:text-text-secondary transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-accent rounded px-2 py-1"
            aria-label="Skip boot sequence"
          >
            [ SKIP ]
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
