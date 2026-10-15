import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import SectionHeader from '@/components/ui/SectionHeader';
import { skills } from '@/data/skills';
import { projects } from '@/data/projects';
import { useReducedMotion } from '@/hooks/useReducedMotion';

// Build a flat list of technologies with their evidence
const buildProofData = () => {
  const map = {};
  Object.entries(skills).forEach(([catKey, cat]) => {
    cat.items.forEach((skill) => {
      if (skill.usedIn && skill.usedIn.length > 0) {
        map[skill.name] = {
          name: skill.name,
          category: cat.label,
          color: cat.color,
          usedIn: skill.usedIn,
        };
      }
    });
  });
  return Object.values(map).sort((a, b) => b.usedIn.length - a.usedIn.length);
};

const proofData = buildProofData();

export default function ProofOfWorkSection() {
  const [selected, setSelected] = useState(null);
  const reducedMotion = useReducedMotion();

  return (
    <section id="proof-of-work" className="py-24 bg-surface/50" aria-labelledby="proof-heading">
      <div className="section-inner">
        <SectionHeader
          label="PROOF OF WORK"
          id="proof-heading"
          title="Where I've Used Each Technology"
          subtitle="Click any technology to see exactly where and how it was used. No skill bars — only evidence."
        />

        <div className="grid md:grid-cols-2 gap-8 items-start">
          {/* Tech grid */}
          <div className="grid grid-cols-2 gap-2">
            {proofData.map((tech, idx) => (
              <motion.button
                key={tech.name}
                initial={reducedMotion ? false : { opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.03, duration: 0.3 }}
                onClick={() => setSelected(selected?.name === tech.name ? null : tech)}
                className={`text-left p-3 rounded border transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent ${
                  selected?.name === tech.name
                    ? 'border-accent/60 bg-accent/5'
                    : 'border-surface-border hover:border-accent/30 bg-surface hover:bg-surface-raised'
                }`}
                aria-pressed={selected?.name === tech.name}
                aria-label={`${tech.name} — click to see where it was used`}
              >
                <div className="font-mono text-xs font-semibold text-text-primary mb-1">{tech.name}</div>
                <div className="font-mono text-xs" style={{ color: tech.color }}>{tech.category}</div>
                <div className="flex gap-1 mt-2">
                  {tech.usedIn.slice(0, 4).map((_, i) => (
                    <span key={i} className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: tech.color, opacity: 0.6 }} aria-hidden="true" />
                  ))}
                  {tech.usedIn.length > 4 && (
                    <span className="font-mono text-xs text-text-muted">+{tech.usedIn.length - 4}</span>
                  )}
                </div>
              </motion.button>
            ))}
          </div>

          {/* Detail panel */}
          <div className="sticky top-20">
            <AnimatePresence mode="wait">
              {selected ? (
                <motion.div
                  key={selected.name}
                  initial={reducedMotion ? false : { opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.25 }}
                  className="card p-6 border-accent/20"
                >
                  <div className="flex items-center gap-3 mb-5">
                    <div className="w-3 h-3 rounded-full flex-shrink-0" style={{ backgroundColor: selected.color }} aria-hidden="true" />
                    <h3 className="font-mono text-lg font-bold text-text-primary">{selected.name}</h3>
                  </div>

                  <div className="mb-5">
                    <p className="font-mono text-xs text-accent mb-3">USED IN:</p>
                    <div className="space-y-2">
                      {selected.usedIn.map((use) => {
                        const project = projects.find(
                          (p) => p.title === use || p.shortTitle === use || p.id === use.toLowerCase().replace(/\s/g, '-')
                        );
                        return (
                          <div key={use} className="flex items-center gap-3">
                            <span className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ backgroundColor: selected.color }} aria-hidden="true" />
                            <div>
                              <span className="font-mono text-sm text-text-primary">{use}</span>
                              {project && (
                                <span className="font-mono text-xs text-text-muted ml-2">— {project.category}</span>
                              )}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  <div className="pt-4 border-t border-surface-border">
                    <p className="font-mono text-xs text-text-muted">
                      <span className="text-accent font-semibold">{selected.usedIn.length}</span> project{selected.usedIn.length > 1 ? 's' : ''} · {selected.category}
                    </p>
                  </div>
                </motion.div>
              ) : (
                <motion.div
                  key="empty"
                  initial={reducedMotion ? false : { opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="card p-6 border-dashed text-center"
                >
                  <p className="font-mono text-xs text-text-muted">
                    ← SELECT A TECHNOLOGY<br />to see where it was used
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
