import { motion } from 'framer-motion';
import SectionHeader from '@/components/ui/SectionHeader';
import { certifications, languages } from '@/data/certifications';
import { ExternalLink, CheckCircle2, Clock, Globe } from 'lucide-react';
import { useReducedMotion } from '@/hooks/useReducedMotion';

const categoryColors = {
  Networking: '#10b981',
  'Cloud Computing': '#ff9900',
  'Programming & Backend': '#3776ab',
  'DevOps & IaC': '#00d4ff',
  'Operating Systems': '#f59e0b',
};

export default function CertificationsSection() {
  const reducedMotion = useReducedMotion();

  return (
    <section id="certifications" className="py-24" aria-labelledby="cert-heading">
      <div className="section-inner">
        <SectionHeader
          label="CERTIFICATIONS & CONTINUOUS LEARNING"
          id="cert-heading"
          title="Certifications & Learning"
          subtitle="Direct technical learning covering CCNA networking, AWS cloud deployment, Python backend services, DevOps tooling, and Linux systems administration."
        />

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4 mb-8">
          {certifications.map((cert, idx) => {
            const color = categoryColors[cert.category] || '#8888aa';
            const isCompleted = cert.status.toLowerCase() === 'completed';
            return (
              <motion.div
                key={cert.id}
                initial={reducedMotion ? false : { opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.08, duration: 0.4 }}
                className="card p-5 flex flex-col justify-between border-surface-border hover:border-accent/30 transition-all duration-200"
              >
                <div>
                  {/* Category & Status header */}
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <span
                      className="font-mono text-xs px-2 py-0.5 rounded"
                      style={{ color, backgroundColor: `${color}18`, border: `1px solid ${color}33` }}
                    >
                      {cert.category}
                    </span>
                    <span
                      className={`inline-flex items-center gap-1 font-mono text-xs px-2 py-0.5 rounded ${
                        isCompleted
                          ? 'text-success bg-success/10 border border-success/30'
                          : 'text-accent bg-accent/10 border border-accent/30'
                      }`}
                    >
                      {isCompleted ? (
                        <>
                          <CheckCircle2 size={11} />
                          Completed
                        </>
                      ) : (
                        <>
                          <Clock size={11} className="animate-pulse-slow" />
                          Ongoing
                        </>
                      )}
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className="font-mono text-base font-bold text-text-primary mb-1">{cert.title}</h3>

                  {/* Type / Course label */}
                  <p className="font-mono text-xs text-text-muted mb-3">{cert.type}</p>

                  {/* Relevance */}
                  <p className="text-text-secondary text-xs leading-relaxed mb-4">{cert.relevance}</p>
                </div>

                {/* Footer status notice */}
                <div className="pt-3 border-t border-surface-border/60">
                  {cert.verificationUrl ? (
                    <a
                      href={cert.verificationUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 font-mono text-xs text-accent hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent rounded"
                      aria-label={`Verify ${cert.title}`}
                    >
                      <ExternalLink size={12} />
                      VERIFY
                    </a>
                  ) : (
                    <span className="font-mono text-xs text-text-muted">
                      {isCompleted ? '✓ Completed Curriculum' : '⏳ In Progress'}
                    </span>
                  )}
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Languages block */}
        <motion.div
          initial={reducedMotion ? false : { opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
          className="card p-5 max-w-xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 border-surface-border bg-surface/50"
        >
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-accent/10 border border-accent/30 flex items-center justify-center text-accent">
              <Globe size={18} />
            </div>
            <div>
              <h4 className="font-mono text-sm font-semibold text-text-primary">Languages</h4>
              <p className="font-mono text-xs text-text-muted">Communication & Professional Languages</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            {languages.map((lang) => (
              <span
                key={lang}
                className="font-mono text-xs px-3 py-1.5 rounded bg-surface-raised border border-accent/30 text-accent font-medium"
              >
                {lang}
              </span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
