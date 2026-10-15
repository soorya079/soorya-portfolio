import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, ChevronUp } from 'lucide-react';
import SectionHeader from '@/components/ui/SectionHeader';
import Badge from '@/components/ui/Badge';
import { experience } from '@/data/experience';
import { useReducedMotion } from '@/hooks/useReducedMotion';

const careerPath = [
  { label: 'NETWORKING', desc: 'CCNA Concepts · TCP/IP · Subnets', color: '#10b981' },
  { label: 'PYTHON & FASTAPI', desc: 'REST APIs · Backend Services', color: '#3776ab' },
  { label: 'DOCKER', desc: 'Containerization · Images', color: '#2496ed' },
  { label: 'AWS CLOUD', desc: 'ECS Fargate · ECR · CloudWatch', color: '#ff9900' },
  { label: 'DEVOPS & IAC', desc: 'SAM · CloudFormation · CI/CD', color: '#00d4ff' },
];

export default function ExperienceSection() {
  const reducedMotion = useReducedMotion();
  const exp = experience[0];

  return (
    <section id="experience" className="py-24 bg-surface/30" aria-labelledby="experience-heading">
      <div className="section-inner">
        <SectionHeader
          label="EXPERIENCE"
          id="experience-heading"
          title="Professional Experience"
          subtitle="Hands-on internship experience deploying containerized Python/FastAPI services to Amazon ECS with AWS Fargate, configuring ECR, VPC networking, and CloudWatch troubleshooting."
        />

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main experience card */}
          <div className="lg:col-span-2 space-y-6">
            {/* Company header */}
            <div className="card p-6">
              <div className="flex items-start justify-between gap-4 mb-4">
                <div>
                  <h3 className="text-xl font-bold text-text-primary">{exp.company}</h3>
                  <p className="font-mono text-accent text-sm mt-1">{exp.role}</p>
                  <p className="font-mono text-xs text-text-muted mt-1">{exp.type} · {exp.period} · {exp.location}</p>
                </div>
                <div className="flex items-center gap-1.5 px-2.5 py-1 bg-accent/10 border border-accent/30 rounded">
                  <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse-slow" aria-hidden="true" />
                  <span className="font-mono text-xs text-accent font-semibold">{exp.status}</span>
                </div>
              </div>
              <p className="text-text-secondary text-sm leading-relaxed mb-6">{exp.description}</p>

              {/* Technologies used */}
              <div>
                <p className="font-mono text-xs text-accent mb-2">KEY TECHNOLOGIES:</p>
                <div className="flex flex-wrap gap-1.5">
                  {exp.technologies.map((tech) => (
                    <Badge key={tech} variant="cloud">{tech}</Badge>
                  ))}
                </div>
              </div>
            </div>

            {/* Responsibilities */}
            <div className="card p-6">
              <p className="font-mono text-xs text-accent mb-4 tracking-wider">KEY RESPONSIBILITIES & CONTRIBUTIONS:</p>
              <div className="space-y-3">
                {exp.responsibilities.map((resp, idx) => (
                  <motion.div
                    key={idx}
                    initial={reducedMotion ? false : { opacity: 0, x: -15 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: idx * 0.06, duration: 0.35 }}
                    className="flex items-start gap-3 p-3 rounded bg-surface border border-surface-border hover:border-accent/30 transition-colors"
                  >
                    <span className="font-mono text-xs text-accent bg-accent/10 border border-accent/20 px-1.5 py-0.5 rounded flex-shrink-0 mt-0.5">
                      0{idx + 1}
                    </span>
                    <p className="text-text-secondary text-sm leading-relaxed">{resp}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>

          {/* Right column */}
          <div className="space-y-6">
            {/* Transferable skills */}
            <div className="card p-5">
              <p className="font-mono text-xs text-accent mb-4">CORE COMPETENCIES:</p>
              <div className="space-y-2">
                {exp.transferableSkills.map((skill) => (
                  <div key={skill} className="flex items-start gap-2">
                    <span className="text-accent text-xs mt-0.5 flex-shrink-0">›</span>
                    <span className="text-text-secondary text-xs">{skill}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Career narrative */}
            <div className="card p-5">
              <p className="font-mono text-xs text-accent mb-4">CAREER PATH:</p>
              <div className="space-y-2">
                {careerPath.map(({ label, desc, color }, idx) => (
                  <div key={label} className="flex items-center gap-3">
                    <div className="flex flex-col items-center">
                      <div className="w-2 h-2 rounded-full flex-shrink-0" style={{ backgroundColor: color }} aria-hidden="true" />
                      {idx < careerPath.length - 1 && (
                        <div className="w-px h-4 bg-surface-border mt-1" aria-hidden="true" />
                      )}
                    </div>
                    <div>
                      <div className="font-mono text-xs font-semibold" style={{ color }}>{label}</div>
                      <div className="font-mono text-xs text-text-muted">{desc}</div>
                    </div>
                  </div>
                ))}
              </div>
              <p className="mt-4 text-xs text-text-muted leading-relaxed">{exp.careerNarrative}</p>
            </div>

            {/* Education */}
            <div className="card p-5">
              <p className="font-mono text-xs text-accent mb-3">EDUCATION:</p>
              <div className="space-y-4">
                <div className="border-b border-surface-border/50 pb-3">
                  <p className="font-mono text-sm font-semibold text-text-primary">Bachelor of Engineering (B.E.) — Computer Science and Engineering</p>
                  <p className="font-mono text-xs text-text-secondary mt-1">National Engineering College</p>
                  <p className="font-mono text-xs text-accent mt-0.5">Graduated: May 2026</p>
                </div>
                <div>
                  <p className="font-mono text-sm font-semibold text-text-primary">Diploma in Mechanical Engineering (D.M.E.)</p>
                  <p className="font-mono text-xs text-text-secondary mt-1">Lakshmi Ammal Polytechnic College</p>
                  <p className="font-mono text-xs text-accent mt-0.5">Graduated: May 2023</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
