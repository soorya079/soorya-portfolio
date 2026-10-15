import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AlertTriangle, ChevronDown, ChevronUp } from 'lucide-react';
import SectionHeader from '@/components/ui/SectionHeader';
import Badge from '@/components/ui/Badge';
import { incidents } from '@/data/incidents';
import { useReducedMotion } from '@/hooks/useReducedMotion';

const severityConfig = {
  HIGH: { color: 'text-error', border: 'border-error/30', bg: 'bg-error/5' },
  MEDIUM: { color: 'text-warning', border: 'border-warning/30', bg: 'bg-warning/5' },
  LOW: { color: 'text-accent', border: 'border-accent/30', bg: 'bg-accent/5' },
};

const incidentSteps = ['symptom', 'investigation', 'rootCause', 'fix', 'lesson'];
const stepLabels = {
  symptom: 'SYMPTOM',
  investigation: 'INVESTIGATION',
  rootCause: 'ROOT CAUSE',
  fix: 'FIX',
  lesson: 'LESSON',
};

export default function IncidentRoomSection() {
  const [active, setActive] = useState(null);
  const reducedMotion = useReducedMotion();

  return (
    <section id="incident-room" className="py-24" aria-labelledby="incident-heading">
      <div className="section-inner">
        <SectionHeader
          label="INCIDENT ROOM"
          id="incident-heading"
          title="Real Debugging Stories"
          subtitle="Engineering is debugging. These are real troubleshooting experiences from actual projects."
        />

        <div className="space-y-4">
          {incidents.map((incident, idx) => {
            const config = severityConfig[incident.severity] || severityConfig.LOW;
            const isOpen = active === incident.id;

            return (
              <motion.div
                key={incident.id}
                initial={reducedMotion ? false : { opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1, duration: 0.4 }}
                className={`rounded-lg border ${config.border} ${config.bg} overflow-hidden`}
              >
                <button
                  onClick={() => setActive(isOpen ? null : incident.id)}
                  className="w-full text-left px-5 py-4 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
                  aria-expanded={isOpen}
                  aria-controls={`incident-${incident.id}`}
                >
                  <div className="flex items-start gap-3">
                    <AlertTriangle size={16} className={`${config.color} flex-shrink-0 mt-0.5`} aria-hidden="true" />
                    <div className="flex-1">
                      <div className="flex items-center gap-3 flex-wrap">
                        <h3 className="font-mono text-sm font-semibold text-text-primary">{incident.title}</h3>
                        <span className={`font-mono text-xs ${config.color} border ${config.border} px-2 py-0.5 rounded`}>
                          {incident.severity}
                        </span>
                        <span className="font-mono text-xs text-text-muted border border-surface-border px-2 py-0.5 rounded">
                          {incident.project}
                        </span>
                      </div>
                      {!isOpen && (
                        <p className="font-mono text-xs text-text-muted mt-1">{incident.symptom.slice(0, 80)}...</p>
                      )}
                    </div>
                    {isOpen ? <ChevronUp size={14} className={config.color} /> : <ChevronDown size={14} className="text-text-muted" />}
                  </div>
                </button>

                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      id={`incident-${incident.id}`}
                      initial={reducedMotion ? false : { height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <div className="px-5 pb-5 space-y-4 border-t border-surface-border/50 pt-4">
                        {incidentSteps.map((step) => {
                          const value = incident[step];
                          if (!value) return null;
                          return (
                            <div key={step}>
                              <p className={`font-mono text-xs mb-1.5 ${config.color}`}>{stepLabels[step]}:</p>
                              {Array.isArray(value) ? (
                                <ul className="space-y-1">
                                  {value.map((item, i) => (
                                    <li key={i} className="flex items-start gap-2 text-text-secondary text-sm">
                                      <span className="text-text-muted flex-shrink-0">›</span>
                                      {item}
                                    </li>
                                  ))}
                                </ul>
                              ) : (
                                <p className="text-text-secondary text-sm leading-relaxed">{value}</p>
                              )}
                            </div>
                          );
                        })}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
