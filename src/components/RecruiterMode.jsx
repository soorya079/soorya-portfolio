import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronLeft, ChevronRight, Github, Linkedin, FileText, Mail, Phone } from 'lucide-react';
import { socialLinks } from '@/data/socialLinks';
import { cloudSentinel } from '@/data/projects';
import Badge from '@/components/ui/Badge';
import StatusDot from '@/components/ui/StatusDot';
import { useReducedMotion } from '@/hooks/useReducedMotion';

const slides = [
  {
    id: '01',
    label: 'WHO I AM',
    content: (
      <div className="text-center space-y-6">
        <div className="w-20 h-20 rounded-full bg-accent/10 border-2 border-accent/40 flex items-center justify-center mx-auto">
          <span className="font-mono text-3xl font-bold text-accent">SM</span>
        </div>
        <div>
          <h2 className="text-4xl font-bold text-text-primary">SOORYA M</h2>
          <p className="font-mono text-accent text-lg mt-2 font-semibold">AWS Cloud Engineer | DevOps Engineer</p>
          <p className="font-mono text-text-muted text-sm mt-1">AWS · Docker · ECS Fargate · Serverless · Python</p>
        </div>
        <p className="text-text-secondary max-w-lg mx-auto text-sm sm:text-base leading-relaxed">
          Entry-level AWS Cloud Engineer and Junior DevOps candidate with hands-on experience deploying containerized Python/FastAPI applications on Amazon ECS Fargate, building serverless and event-driven systems with AWS Lambda, API Gateway, DynamoDB, and EventBridge, and defining infrastructure as code with AWS SAM and CloudFormation.
        </p>
        <p className="font-mono text-xs text-text-muted leading-relaxed">
          📍 Chennai, Tamil Nadu, India · 🎓 B.E. CSE, National Engineering College (May 2026) · 🎓 D.M.E., Lakshmi Ammal Polytechnic (May 2023) · 📜 CCNA Completed
        </p>
      </div>
    ),
  },
  {
    id: '02',
    label: 'WHAT I KNOW',
    content: (
      <div className="space-y-6">
        <h2 className="text-2xl font-bold text-text-primary text-center">Technical Skills</h2>
        <div className="grid sm:grid-cols-2 gap-3">
          {[
            { category: 'AWS CLOUD', color: '#ff9900', items: ['Amazon ECS & AWS Fargate', 'Amazon ECR & S3', 'AWS Lambda & API Gateway', 'Amazon DynamoDB', 'Amazon EventBridge', 'CloudWatch & IAM', 'VPC & Security Groups'] },
            { category: 'DEVOPS & IAC', color: '#00d4ff', items: ['Docker & Containerization', 'AWS CLI', 'AWS SAM', 'AWS CloudFormation', 'Git & GitHub', 'CI/CD Fundamentals'] },
            { category: 'PROGRAMMING & BACKEND', color: '#3776ab', items: ['Python', 'FastAPI', 'REST APIs'] },
            { category: 'NETWORKING & OS', color: '#10b981', items: ['Networking Fundamentals', 'CCNA Concepts', 'Linux Fundamentals', 'TCP/IP & Subnets'] },
          ].map(({ category, color, items }) => (
            <div key={category} className="card p-4">
              <p className="font-mono text-xs font-semibold mb-2" style={{ color }}>{category}</p>
              <div className="space-y-1">
                {items.map((item) => (
                  <div key={item} className="flex items-center gap-2">
                    <span className="w-1 h-1 rounded-full flex-shrink-0" style={{ backgroundColor: color }} aria-hidden="true" />
                    <span className="font-mono text-xs text-text-secondary">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    ),
  },
  {
    id: '03',
    label: 'FEATURED PROJECTS',
    content: (
      <div className="space-y-4">
        <h2 className="text-2xl font-bold text-text-primary text-center">Featured Cloud & DevOps Projects</h2>
        <div className="grid gap-4">
          {[
            {
              title: 'CloudSentinel — AWS Cloud Deployment and Recovery Project',
              desc: 'Containerized Python/FastAPI backend published to Amazon ECR, deployed on Amazon ECS Fargate, with event-driven recovery using EventBridge, Lambda, and SNS.',
              tech: 'Python, FastAPI, Docker, ECR, ECS Fargate, CloudWatch, EventBridge, Lambda, SNS',
              github: 'https://github.com/soorya079/cloudsentinel',
              color: '#00d4ff',
            },
            {
              title: 'LIFEGRID — Event-Driven Disaster Coordination Platform',
              desc: 'Serverless disaster coordination platform using AWS Lambda, API Gateway, and DynamoDB with EventBridge risk assessment workflows and AWS SAM infrastructure as code.',
              tech: 'AWS Lambda, API Gateway, DynamoDB, EventBridge, CloudWatch, SAM, CloudFormation, React',
              github: 'https://github.com/soorya079/LIFEGRID',
              color: '#ff9900',
            },
          ].map(({ title, desc, tech, github, color }) => (
            <div key={title} className="card p-4 border-l-4" style={{ borderLeftColor: color }}>
              <div className="flex items-start justify-between gap-2 mb-1">
                <span className="font-mono text-sm font-bold text-text-primary">{title}</span>
              </div>
              <p className="text-xs text-text-secondary leading-relaxed mb-2">{desc}</p>
              <p className="font-mono text-xs text-accent mb-3">{tech}</p>
              <a
                href={github}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 font-mono text-xs text-accent hover:underline"
              >
                <Github size={13} />
                View on GitHub
              </a>
            </div>
          ))}
        </div>
      </div>
    ),
  },
  {
    id: '04',
    label: 'CLOUDSENTINEL',
    content: (
      <div className="space-y-5">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-text-primary">Cloud<span className="text-accent">Sentinel</span></h2>
          <p className="text-text-muted text-xs font-mono mt-1">AWS Cloud Deployment and Recovery Project</p>
        </div>
        <p className="text-text-secondary text-sm text-center leading-relaxed">
          {cloudSentinel.description}
        </p>
        <div>
          <p className="font-mono text-xs text-accent mb-2 text-center">DEPLOYMENT PIPELINE:</p>
          <div className="flex items-center justify-center flex-wrap gap-1.5">
            {cloudSentinel.architecture.map((stage, idx) => (
              <span key={stage.id} className="flex items-center gap-1.5">
                <span className="font-mono text-xs px-2.5 py-1 rounded border" style={{ color: stage.color, borderColor: `${stage.color}44`, backgroundColor: `${stage.color}11` }}>
                  {stage.label}
                </span>
                {idx < cloudSentinel.architecture.length - 1 && (
                  <ChevronRight size={12} className="text-text-muted" />
                )}
              </span>
            ))}
          </div>
        </div>
        <div className="flex flex-wrap gap-1.5 justify-center">
          {cloudSentinel.proofOfWork.map((tech) => (
            <Badge key={tech} variant="cloud">{tech}</Badge>
          ))}
        </div>
        <div className="text-center">
          <a
            href={cloudSentinel.github}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 font-mono text-xs border border-accent text-accent px-4 py-2 rounded hover:bg-accent/10 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
          >
            <Github size={14} />
            VIEW REPOSITORY
          </a>
        </div>
      </div>
    ),
  },
  {
    id: '05',
    label: 'AWS EXPERIENCE',
    content: (
      <div className="space-y-4">
        <h2 className="text-2xl font-bold text-text-primary text-center">AWS & Cloud Capabilities</h2>
        <div className="grid sm:grid-cols-2 gap-3">
          {[
            { service: 'Amazon ECS & Fargate', desc: 'Containerized workload deployment without managing virtual machines', icon: '🚀' },
            { service: 'Amazon ECR', desc: 'Docker image tagging, authentication via CLI, and container registry', icon: '📦' },
            { service: 'AWS Lambda & API Gateway', desc: 'Serverless compute and RESTful APIs with event-driven integration', icon: '⚡' },
            { service: 'Amazon DynamoDB', desc: 'NoSQL database for application state, simulated disaster data, and resources', icon: '🗄️' },
            { service: 'Amazon EventBridge', desc: 'Decoupled event routing for risk assessment workflows and automated recovery', icon: '🔄' },
            { service: 'AWS SAM & CloudFormation', desc: 'Infrastructure as Code to define, build, and deploy serverless resources', icon: '📄' },
            { service: 'CloudWatch & SNS', desc: 'Task log inspection, runtime troubleshooting, and automated alerting', icon: '📊' },
            { service: 'VPC & Security Groups', desc: 'Container networking, subnets, and stateful inbound/outbound rules', icon: '🔒' },
          ].map(({ service, desc, icon }) => (
            <div key={service} className="card p-3">
              <div className="flex items-center gap-2 mb-1">
                <span role="img" aria-hidden="true">{icon}</span>
                <span className="font-mono text-xs font-semibold text-warning">{service}</span>
              </div>
              <p className="font-mono text-xs text-text-muted">{desc}</p>
            </div>
          ))}
        </div>
      </div>
    ),
  },
  {
    id: '06',
    label: 'INTERNSHIP',
    content: (
      <div className="space-y-4">
        <h2 className="text-2xl font-bold text-text-primary text-center">Professional Experience</h2>
        <div className="card p-4 text-center border-accent/30 bg-accent/5">
          <p className="font-mono text-accent text-base font-bold">Bdreams Global Solutions, Chennai</p>
          <p className="font-mono text-xs text-text-primary mt-0.5">Cloud Engineer Intern</p>
          <p className="font-mono text-xs text-text-muted mt-1">Six-month internship · Completed September 2026</p>
        </div>
        <div className="space-y-2">
          <p className="font-mono text-xs text-accent tracking-wider">KEY RESPONSIBILITIES & CONTRIBUTIONS:</p>
          {[
            'Built and containerized a Python/FastAPI backend service using Docker.',
            'Created an Amazon ECR repository and pushed the Docker image for deployment.',
            'Deployed the containerized application using Amazon ECS with AWS Fargate.',
            'Worked with AWS VPC, subnets, security groups, and container networking.',
            'Used Amazon CloudWatch logs and AWS CLI to inspect deployments and troubleshoot application issues.',
            'Practiced AWS resource configuration, deployment, and troubleshooting.',
          ].map((resp, i) => (
            <div key={i} className="flex items-start gap-2 text-xs text-text-secondary leading-relaxed">
              <span className="text-accent flex-shrink-0 mt-0.5">›</span>
              <span>{resp}</span>
            </div>
          ))}
        </div>
      </div>
    ),
  },
  {
    id: '07',
    label: 'RESUME',
    content: (
      <div className="space-y-6 text-center">
        <h2 className="text-2xl font-bold text-text-primary">Resume</h2>
        <p className="text-text-secondary text-sm max-w-md mx-auto">
          Verified academic credentials, six-month Cloud Engineer internship, hands-on AWS projects, and complete technical skill sets.
        </p>
        <a
          href={socialLinks.resume.url}
          download={socialLinks.resume.downloadName}
          className="inline-flex items-center gap-2 bg-accent text-bg font-mono font-semibold px-8 py-4 rounded text-sm hover:bg-accent/90 transition-colors shadow-[0_0_20px_rgba(0,212,255,0.3)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
          aria-label="Download resume PDF"
        >
          <FileText size={18} />
          DOWNLOAD RESUME (PDF)
        </a>
      </div>
    ),
  },
  {
    id: '08',
    label: 'CONTACT',
    content: (
      <div className="space-y-6 text-center">
        <h2 className="text-2xl font-bold text-text-primary">Let's Connect</h2>
        <p className="text-text-secondary text-sm">
          Seeking Junior AWS Cloud Engineer, Associate Cloud Engineer, Junior DevOps Engineer, or Cloud Support Engineer roles.
        </p>
        <div className="grid grid-cols-2 gap-3 max-w-lg mx-auto">
          {[
            { label: 'LinkedIn', icon: Linkedin, href: socialLinks.linkedin.url, color: '#0a66c2' },
            { label: 'GitHub', icon: Github, href: socialLinks.github.url, color: '#f0f0f5' },
            { label: 'Email', icon: Mail, href: socialLinks.email.url, color: '#00d4ff' },
            { label: 'Mobile', icon: Phone, href: socialLinks.phone.url, color: '#f59e0b' },
          ].map(({ label, icon: Icon, href, color }) => (
            <a
              key={label}
              href={href}
              target={label !== 'Email' && label !== 'Mobile' ? '_blank' : undefined}
              rel={label !== 'Email' && label !== 'Mobile' ? 'noopener noreferrer' : undefined}
              className="card p-4 hover:border-accent/30 transition-all flex items-center gap-3 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
              aria-label={label}
            >
              <Icon size={20} style={{ color }} aria-hidden="true" />
              <span className="font-mono text-sm text-text-primary">{label}</span>
            </a>
          ))}
        </div>
      </div>
    ),
  },
];

export default function RecruiterMode({ onClose }) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const reducedMotion = useReducedMotion();
  const slide = slides[currentSlide];

  function prev() { if (currentSlide > 0) setCurrentSlide((s) => s - 1); }
  function next() { if (currentSlide < slides.length - 1) setCurrentSlide((s) => s + 1); }

  return (
    <motion.div
      initial={reducedMotion ? false : { opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 recruiter-overlay bg-bg/95 flex flex-col"
      role="dialog"
      aria-modal="true"
      aria-label="Recruiter Mode — curated candidate briefing"
    >
      {/* Header */}
      <div className="flex items-center justify-between px-6 py-4 border-b border-surface-border flex-shrink-0">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-accent animate-pulse-slow" aria-hidden="true" />
            <span className="font-mono text-xs text-accent tracking-widest">RECRUITER MODE</span>
          </div>
          <span className="font-mono text-xs text-text-muted border border-surface-border px-2 py-0.5 rounded">
            {slide.id} — {slide.label}
          </span>
        </div>
        <button
          onClick={onClose}
          className="text-text-muted hover:text-text-primary p-2 rounded transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
          aria-label="Exit recruiter mode"
        >
          <X size={20} />
        </button>
      </div>

      {/* Progress */}
      <div className="flex gap-1 px-6 py-2 flex-shrink-0" role="progressbar" aria-valuenow={currentSlide + 1} aria-valuemax={slides.length}>
        {slides.map((s, idx) => (
          <button
            key={s.id}
            onClick={() => setCurrentSlide(idx)}
            className={`h-1 rounded-full flex-1 transition-all duration-300 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-accent ${
              idx <= currentSlide ? 'bg-accent' : 'bg-surface-border'
            }`}
            aria-label={`Go to slide ${idx + 1}: ${s.label}`}
            aria-pressed={idx === currentSlide}
          />
        ))}
      </div>

      {/* Slide content */}
      <div className="flex-1 overflow-y-auto flex items-center justify-center px-6 py-8">
        <div className="w-full max-w-2xl">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentSlide}
              initial={reducedMotion ? false : { opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.25 }}
            >
              {slide.content}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Navigation */}
      <div className="flex items-center justify-between px-6 py-4 border-t border-surface-border flex-shrink-0">
        <button
          onClick={prev}
          disabled={currentSlide === 0}
          className="inline-flex items-center gap-2 font-mono text-xs border border-surface-border text-text-muted px-4 py-2 rounded hover:border-accent/40 hover:text-accent disabled:opacity-30 disabled:cursor-not-allowed transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
          aria-label="Previous slide"
        >
          <ChevronLeft size={14} />
          PREV
        </button>

        <span className="font-mono text-xs text-text-muted">
          {currentSlide + 1} / {slides.length}
        </span>

        {currentSlide < slides.length - 1 ? (
          <button
            onClick={next}
            className="inline-flex items-center gap-2 font-mono text-xs bg-accent text-bg px-4 py-2 rounded font-semibold hover:bg-accent/90 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
            aria-label="Next slide"
          >
            NEXT
            <ChevronRight size={14} />
          </button>
        ) : (
          <button
            onClick={onClose}
            className="inline-flex items-center gap-2 font-mono text-xs bg-success text-bg px-4 py-2 rounded font-semibold hover:bg-success/90 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
          >
            DONE ✓
          </button>
        )}
      </div>
    </motion.div>
  );
}
