import { useState } from 'react';
import { motion } from 'framer-motion';
import { ExternalLink, Github, ChevronRight, Layers, ShieldCheck } from 'lucide-react';
import SectionHeader from '@/components/ui/SectionHeader';
import StatusDot from '@/components/ui/StatusDot';
import Badge from '@/components/ui/Badge';
import { featuredProjects, projects } from '@/data/projects';

function ArchRow({ stages }) {
  if (!stages) return null;
  return (
    <div className="flex flex-wrap items-center gap-1.5 my-3">
      {stages.map((stage, idx) => (
        <span key={stage.id} className="flex items-center gap-1.5">
          <span
            className="font-mono text-xs px-2 py-0.5 rounded bg-surface border border-surface-border"
            style={{ color: stage.color || '#8888aa' }}
          >
            {stage.label}
          </span>
          {idx < stages.length - 1 && (
            <span className="text-text-muted text-xs">→</span>
          )}
        </span>
      ))}
    </div>
  );
}

function FeaturedProjectCard({ project, delay = 0 }) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay, duration: 0.45 }}
      className="card hover:border-accent/40 transition-all duration-300 flex flex-col h-full bg-surface/70"
      aria-label={`Featured Project: ${project.title}`}
    >
      <div className="p-6 flex-1 flex flex-col">
        {/* Category & Status */}
        <div className="flex items-start justify-between gap-3 mb-3">
          <div className="inline-flex items-center gap-1.5 font-mono text-xs text-accent border border-accent/30 bg-accent/10 px-2.5 py-1 rounded">
            <ShieldCheck size={13} />
            <span>FEATURED CLOUD PROJECT</span>
          </div>
          <StatusDot status={project.status} />
        </div>

        {/* Title */}
        <h3 className="font-mono text-xl font-bold text-text-primary mb-1">
          {project.title}
        </h3>
        <p className="font-mono text-xs text-text-muted mb-4">{project.category}</p>

        {/* Short readable description */}
        <p className="text-text-secondary text-sm leading-relaxed mb-4">
          {project.description}
        </p>

        {/* Architectural pipeline */}
        {project.architecture && (
          <div className="mb-4 pt-3 border-t border-surface-border">
            <p className="font-mono text-xs text-accent mb-1 tracking-wider">PIPELINE ARCHITECTURE:</p>
            <ArchRow stages={project.architecture} />
          </div>
        )}

        {/* Bullet highlights */}
        {project.bullets && (
          <div className="space-y-2 mb-5">
            {project.bullets.map((b, i) => (
              <div key={i} className="flex items-start gap-2 text-xs text-text-secondary leading-relaxed">
                <span className="text-accent mt-0.5 flex-shrink-0">›</span>
                <span>{b}</span>
              </div>
            ))}
          </div>
        )}

        {/* Technology tags */}
        <div className="mt-auto pt-4 border-t border-surface-border">
          <p className="font-mono text-xs text-text-muted mb-2 tracking-wider">TECHNOLOGIES:</p>
          <div className="flex flex-wrap gap-1.5">
            {project.technologies.map((tech) => (
              <Badge key={tech} variant="cloud">{tech}</Badge>
            ))}
          </div>
        </div>
      </div>

      {/* Footer links */}
      <div className="px-6 pb-6 pt-4 border-t border-surface-border flex items-center justify-between gap-3">
        <a
          href={project.github}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 font-mono text-xs bg-accent/10 border border-accent/40 text-accent hover:bg-accent hover:text-bg px-4 py-2 rounded font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
          aria-label={`View ${project.shortTitle || project.title} on GitHub`}
        >
          <Github size={14} />
          VIEW REPOSITORY
        </a>
        {project.liveDemo ? (
          <a
            href={project.liveDemo}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 font-mono text-xs text-accent hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent rounded"
            aria-label={`View ${project.shortTitle || project.title} live demo`}
          >
            <ExternalLink size={14} />
            LIVE DEMO
          </a>
        ) : (
          <span className="inline-flex items-center gap-1.5 font-mono text-xs text-text-muted/60" title="Live demo link only available if verified">
            <ExternalLink size={13} />
            NO LIVE DEMO
          </span>
        )}
      </div>
    </motion.article>
  );
}

export default function ProjectLabSection() {
  const [activeTab, setActiveTab] = useState('FEATURED');
  const otherProjects = projects.filter((p) => !p.featured);

  return (
    <section id="projects" className="py-24" aria-labelledby="projects-heading">
      <div className="section-inner">
        <SectionHeader
          label="FEATURED PROJECTS"
          title="Featured Projects"
          subtitle="Two core cloud engineering projects demonstrating containerized microservice deployment on Amazon ECS Fargate and serverless event-driven architecture with AWS Lambda and EventBridge."
          id="projects-heading"
        />

        {/* Tabs for Featured vs Archived Repositories */}
        <div className="flex gap-2 mb-8" role="group" aria-label="Project view filter">
          <button
            onClick={() => setActiveTab('FEATURED')}
            className={`font-mono text-xs px-4 py-2 rounded border transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent ${
              activeTab === 'FEATURED'
                ? 'border-accent text-accent bg-accent/10 font-semibold'
                : 'border-surface-border text-text-muted hover:border-accent/40'
            }`}
            aria-pressed={activeTab === 'FEATURED'}
          >
            FEATURED CLOUD PROJECTS (2)
          </button>
          <button
            onClick={() => setActiveTab('ARCHIVE')}
            className={`font-mono text-xs px-4 py-2 rounded border transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent ${
              activeTab === 'ARCHIVE'
                ? 'border-accent text-accent bg-accent/10 font-semibold'
                : 'border-surface-border text-text-muted hover:border-accent/40'
            }`}
            aria-pressed={activeTab === 'ARCHIVE'}
          >
            OTHER REPOSITORIES ({otherProjects.length})
          </button>
        </div>

        {/* Projects View */}
        {activeTab === 'FEATURED' ? (
          <div className="grid lg:grid-cols-2 gap-8">
            {featuredProjects.map((project, idx) => (
              <FeaturedProjectCard key={project.id} project={project} delay={idx * 0.1} />
            ))}
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {otherProjects.map((project, idx) => (
              <motion.article
                key={project.id}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.05, duration: 0.35 }}
                className="card p-5 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-mono font-semibold text-text-primary text-sm">{project.title}</h4>
                    <span className="font-mono text-xs text-text-muted border border-surface-border px-1.5 py-0.5 rounded">
                      TIER {project.tier}
                    </span>
                  </div>
                  <p className="font-mono text-xs text-text-muted mb-2">{project.category}</p>
                  <p className="text-text-secondary text-xs leading-relaxed mb-4">{project.tagline}</p>
                  <div className="flex flex-wrap gap-1 mb-4">
                    {project.technologies.slice(0, 5).map((tech) => (
                      <Badge key={tech}>{tech}</Badge>
                    ))}
                  </div>
                </div>
                <div className="pt-3 border-t border-surface-border flex items-center justify-between">
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 font-mono text-xs text-text-muted hover:text-accent transition-colors"
                  >
                    <Github size={13} />
                    SOURCE
                  </a>
                  <span className="font-mono text-xs text-text-muted/60">NO DEMO</span>
                </div>
              </motion.article>
            ))}
          </div>
        )}

        {/* GitHub CTA */}
        <div className="mt-12 text-center">
          <a
            href="https://github.com/soorya079"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 font-mono text-sm border border-surface-border text-text-muted hover:border-accent/40 hover:text-accent px-6 py-3 rounded transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
          >
            <Github size={16} />
            EXPLORE ALL REPOSITORIES ON GITHUB
            <ChevronRight size={14} />
          </a>
        </div>
      </div>
    </section>
  );
}
