import { motion } from 'framer-motion';
import SectionHeader from '@/components/ui/SectionHeader';
import { skills } from '@/data/skills';

function SkillCategory({ categoryKey, data, delay = 0 }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay, duration: 0.4 }}
      className="card p-5"
    >
      <div className="flex items-center gap-2 mb-4">
        <span role="img" aria-hidden="true">{data.icon}</span>
        <h3 className="font-mono text-sm font-semibold" style={{ color: data.color }}>{data.label}</h3>
      </div>
      <div className="space-y-3">
        {data.items.map((skill) => (
          <div key={skill.name}>
            <div className="flex items-center justify-between mb-1">
              <span className="font-mono text-xs text-text-primary">{skill.name}</span>
            </div>
            {skill.usedIn && skill.usedIn.length > 0 && (
              <p className="font-mono text-xs text-text-muted">
                Used in: {skill.usedIn.join(', ')}
              </p>
            )}
          </div>
        ))}
      </div>
    </motion.div>
  );
}

export default function SkillMatrixSection() {
  return (
    <section id="skills" className="py-24" aria-labelledby="skills-heading">
      <div className="section-inner">
        <SectionHeader
          label="SKILL MATRIX"
          id="skills-heading"
          title="What I Work With"
          subtitle="No fake percentages. Every skill shown is backed by actual project use."
        />

        {/* No fake percentage disclaimer */}
        <div className="mb-10 inline-flex items-center gap-2 font-mono text-xs border border-accent/20 bg-accent/5 text-accent px-3 py-2 rounded">
          <span aria-hidden="true">ℹ</span>
          Skill evidence: where I actually used each technology is listed under each skill.
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
          {Object.entries(skills).map(([key, data], idx) => (
            <SkillCategory key={key} categoryKey={key} data={data} delay={idx * 0.06} />
          ))}
        </div>
      </div>
    </section>
  );
}
