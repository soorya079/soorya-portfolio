import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ExternalLink, Github, ChevronDown, ChevronUp } from 'lucide-react';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import SectionHeader from '@/components/ui/SectionHeader';
import ArchitectureAnimation from '@/components/ArchitectureAnimation';
import TroubleshootingSimulator from '@/components/TroubleshootingSimulator';
import StatusDot from '@/components/ui/StatusDot';
import Badge from '@/components/ui/Badge';
import { cloudSentinel } from '@/data/projects';

const steps = cloudSentinel.caseStudy.steps;

export default function CloudSentinelCaseStudy() {
  const [activeStep, setActiveStep] = useState(null);
  const reducedMotion = useReducedMotion();

  return (
    <section id="cloudsentinel" className="py-24 relative" aria-labelledby="cloudsentinel-heading">
      {/* Decorative top border */}
      <div className="glow-line mb-12" aria-hidden="true" />

      <div className="section-inner">
        {/* Header */}
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center mb-12 lg:mb-16">
          <div>
            <p className="font-mono text-xs text-accent tracking-[0.2em] mb-3 uppercase">FEATURED AWS DEPLOYMENT & RECOVERY</p>
            <h2 id="cloudsentinel-heading" className="text-3xl sm:text-4xl font-bold text-text-primary tracking-tight mb-3">
              Cloud<span className="text-accent">Sentinel</span>
              <span className="block text-lg font-medium text-text-secondary font-mono mt-1">
                AWS Cloud Deployment and Recovery Project
              </span>
            </h2>
            <p className="text-sm sm:text-base text-text-secondary leading-relaxed mb-4">{cloudSentinel.description}</p>

            {cloudSentinel.bullets && (
              <div className="space-y-2 mb-6">
                {cloudSentinel.bullets.map((b, i) => (
                  <div key={i} className="flex items-start gap-2 text-xs text-text-secondary leading-relaxed">
                    <span className="text-accent flex-shrink-0 mt-0.5">›</span>
                    <span>{b}</span>
                  </div>
                ))}
              </div>
            )}

            <div className="flex flex-wrap gap-2 mb-6">
              {cloudSentinel.technologies.map((tech) => (
                <Badge key={tech} variant="cloud">{tech}</Badge>
              ))}
            </div>

            <div className="flex flex-wrap gap-3 mb-6">
              <StatusDot status={cloudSentinel.status} />
              <a
                href={cloudSentinel.github}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 font-mono text-xs border border-surface-border text-text-muted hover:border-accent/40 hover:text-accent px-4 py-2 rounded transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
                aria-label="View CloudSentinel on GitHub"
              >
                <Github size={14} />
                SOURCE CODE
              </a>
              {cloudSentinel.liveDemo ? (
                <a
                  href={cloudSentinel.liveDemo}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 font-mono text-xs border border-accent text-accent hover:bg-accent/10 px-4 py-2 rounded transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
                >
                  <ExternalLink size={14} />
                  LIVE DEMO
                </a>
              ) : (
                <span className="inline-flex items-center gap-2 font-mono text-xs border border-surface-border text-text-muted px-4 py-2 rounded opacity-50 cursor-not-allowed" title="Live demo unavailable">
                  <ExternalLink size={14} />
                  DEMO UNAVAILABLE
                </span>
              )}
            </div>
          </div>

          {/* Proof of work */}
          <div className="card p-5">
            <p className="font-mono text-xs text-accent mb-4">PROOF OF WORK — TECHNOLOGIES USED:</p>
            <div className="grid grid-cols-2 gap-2">
              {cloudSentinel.proofOfWork.map((tech) => (
                <div key={tech} className="flex items-center gap-2 font-mono text-xs text-text-secondary">
                  <span className="w-1.5 h-1.5 rounded-full bg-accent flex-shrink-0" aria-hidden="true" />
                  {tech}
                </div>
              ))}
            </div>
            <div className="mt-4 pt-4 border-t border-surface-border">
              <p className="font-mono text-xs text-text-muted">PIPELINE:</p>
              <div className="font-mono text-xs text-accent mt-2 space-y-1">
                {cloudSentinel.architecture.map((stage, idx) => (
                  <div key={stage.id} className="flex items-center gap-2">
                    {idx > 0 && <span className="text-text-muted ml-2">↓</span>}
                    <span style={{ color: stage.color }}>{stage.label}</span>
                    <span className="text-text-muted">— {stage.sublabel}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Architecture animation */}
        <div className="mb-16">
          <div className="flex items-center gap-3 mb-6">
            <div className="h-px flex-1 bg-surface-border" aria-hidden="true" />
            <p className="font-mono text-xs text-accent tracking-widest">DEPLOYMENT PIPELINE</p>
            <div className="h-px flex-1 bg-surface-border" aria-hidden="true" />
          </div>
          <ArchitectureAnimation />
        </div>

        {/* Case study steps */}
        <div className="mb-16">
          <div className="flex items-center gap-3 mb-8">
            <div className="h-px flex-1 bg-surface-border" aria-hidden="true" />
            <p className="font-mono text-xs text-accent tracking-widest">CASE STUDY</p>
            <div className="h-px flex-1 bg-surface-border" aria-hidden="true" />
          </div>

          <div className="space-y-3">
            {steps.map((step, idx) => (
              <motion.div
                key={step.id}
                initial={reducedMotion ? false : { opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.05, duration: 0.4 }}
              >
                <button
                  onClick={() => setActiveStep(activeStep === step.id ? null : step.id)}
                  className="w-full text-left card p-4 hover:border-accent/30 transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
                  aria-expanded={activeStep === step.id}
                  aria-controls={`step-content-${step.id}`}
                >
                  <div className="flex items-center gap-4">
                    <span className="font-mono text-2xl font-bold text-text-muted w-12 flex-shrink-0">{step.id}</span>
                    <span className="font-mono text-sm font-semibold text-text-primary flex-1">{step.title}</span>
                    {activeStep === step.id
                      ? <ChevronUp size={16} className="text-accent flex-shrink-0" />
                      : <ChevronDown size={16} className="text-text-muted flex-shrink-0" />
                    }
                  </div>
                </button>

                <AnimatePresence>
                  {activeStep === step.id && (
                    <motion.div
                      id={`step-content-${step.id}`}
                      initial={reducedMotion ? false : { height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25 }}
                      className="overflow-hidden"
                    >
                      <div className="border border-t-0 border-surface-border rounded-b-lg bg-surface-raised px-4 pb-4 pt-3">
                        <p className="text-text-secondary text-sm leading-relaxed">{step.content}</p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Break the system */}
        <div>
          <div className="flex items-center gap-3 mb-8">
            <div className="h-px flex-1 bg-surface-border" aria-hidden="true" />
            <p className="font-mono text-xs text-warning tracking-widest">⚠ SIMULATE FAILURE</p>
            <div className="h-px flex-1 bg-surface-border" aria-hidden="true" />
          </div>
          <TroubleshootingSimulator />
        </div>
      </div>

      <div className="glow-line mt-16" aria-hidden="true" />
    </section>
  );
}
