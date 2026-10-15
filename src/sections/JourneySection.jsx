import { motion } from 'framer-motion';
import SectionHeader from '@/components/ui/SectionHeader';
import { journeyNodes } from '@/data/journey';
import { useReducedMotion } from '@/hooks/useReducedMotion';

export default function JourneySection() {
  const reducedMotion = useReducedMotion();

  return (
    <section id="journey" className="py-24" aria-labelledby="journey-heading">
      <div className="section-inner">
        <SectionHeader
          label="MY CLOUD JOURNEY"
          id="journey-heading"
          title="The Learning Path"
          subtitle="From Computer Science fundamentals to cloud infrastructure deployment. Every step built on the last."
          align="center"
        />

        {/* Timeline */}
        <div className="relative" role="list" aria-label="Learning journey timeline">
          {/* Vertical line */}
          <div
            className="absolute left-6 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-surface-border to-transparent -translate-x-1/2"
            aria-hidden="true"
          />

          {journeyNodes.map((node, idx) => {
            const isLast = idx === journeyNodes.length - 1;
            const isEven = idx % 2 === 0;

            return (
              <motion.div
                key={node.id}
                initial={reducedMotion ? false : { opacity: 0, x: isEven ? -20 : 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ delay: idx * 0.06, duration: 0.5 }}
                className={`relative flex items-start mb-8 ${isEven ? 'md:flex-row' : 'md:flex-row-reverse'}`}
                role="listitem"
              >
                {/* Center dot */}
                <div
                  className="absolute left-6 md:left-1/2 -translate-x-1/2 flex items-center justify-center z-10"
                  aria-hidden="true"
                >
                  <div
                    className="w-10 h-10 rounded-full flex items-center justify-center border-2 text-lg"
                    style={{ borderColor: node.color, backgroundColor: `${node.color}22` }}
                  >
                    <span role="img" aria-hidden="true">{node.icon}</span>
                  </div>
                </div>

                {/* Content card */}
                <div className={`ml-16 md:ml-0 md:w-5/12 ${isEven ? 'md:pr-12' : 'md:pl-12 md:ml-auto'}`}>
                  <div
                    className="card p-4 hover:border-accent/20 transition-all duration-300"
                    style={isLast ? { borderColor: `${node.color}40`, boxShadow: `0 0 20px ${node.color}22` } : {}}
                  >
                    <div className="flex items-center gap-2 mb-2">
                      <div className="w-2 h-2 rounded-full flex-shrink-0" style={{ backgroundColor: node.color }} aria-hidden="true" />
                      <h3 className="font-mono text-sm font-semibold" style={{ color: node.color }}>{node.label}</h3>
                    </div>
                    <p className="font-mono text-xs text-text-muted mb-2">{node.sublabel}</p>
                    <p className="text-text-secondary text-sm leading-relaxed">{node.description}</p>
                  </div>

                  {/* Arrow connector */}
                  {!isLast && (
                    <div
                      className={`hidden md:block absolute top-5 ${isEven ? 'right-[calc(50%-2.5rem)]' : 'left-[calc(50%-2.5rem)]'} w-10`}
                      aria-hidden="true"
                    />
                  )}
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Tagline */}
        <motion.div
          initial={reducedMotion ? false : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mt-12"
        >
          <p className="font-mono text-accent tracking-widest">
            COMPUTER SCIENCE → NETWORKING → AWS → CLOUD ENGINEERING
          </p>
        </motion.div>
      </div>
    </section>
  );
}
