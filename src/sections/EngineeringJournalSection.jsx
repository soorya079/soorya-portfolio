import { motion } from 'framer-motion';
import SectionHeader from '@/components/ui/SectionHeader';
import { journal } from '@/data/journal';
import Badge from '@/components/ui/Badge';
import { useReducedMotion } from '@/hooks/useReducedMotion';

export default function EngineeringJournalSection() {
  const reducedMotion = useReducedMotion();

  return (
    <section id="journal" className="py-24 bg-surface/30" aria-labelledby="journal-heading">
      <div className="section-inner">
        <SectionHeader
          label="ENGINEERING JOURNAL"
          id="journal-heading"
          title="Technical Learning Log"
          subtitle="Notes from real deployment and debugging sessions. Every entry is a lesson from a real experience."
        />

        <div className="grid md:grid-cols-2 gap-6">
          {journal.map((entry, idx) => (
            <motion.article
              key={entry.id}
              initial={reducedMotion ? false : { opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1, duration: 0.4 }}
              className="card p-5 hover:border-accent/20 transition-all duration-300"
              aria-label={`Journal entry: ${entry.title}`}
            >
              {/* Header */}
              <div className="mb-4">
                <div className="flex flex-wrap gap-1 mb-2">
                  {entry.tags.map((tag) => (
                    <Badge key={tag} variant="devops">{tag}</Badge>
                  ))}
                </div>
                <h3 className="font-mono text-sm font-semibold text-text-primary leading-snug">{entry.title}</h3>
                {entry.date && (
                  <p className="font-mono text-xs text-text-muted mt-1">{entry.date}</p>
                )}
              </div>

              {/* Sections */}
              <div className="space-y-3">
                <div>
                  <p className="font-mono text-xs text-warning mb-1">PROBLEM:</p>
                  <p className="text-text-secondary text-xs leading-relaxed">{entry.problem}</p>
                </div>
                <div>
                  <p className="font-mono text-xs text-accent mb-1">WHAT I DID:</p>
                  <p className="text-text-secondary text-xs leading-relaxed font-mono">{entry.whatIDid}</p>
                </div>
                <div>
                  <p className="font-mono text-xs text-success mb-1">WHAT I LEARNED:</p>
                  <p className="text-text-secondary text-xs leading-relaxed">{entry.whatILearned}</p>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
