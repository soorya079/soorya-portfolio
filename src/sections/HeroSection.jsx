import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Github, Linkedin, Download, ArrowDown, Terminal, Cloud, Container } from 'lucide-react';
import { socialLinks } from '@/data/socialLinks';
import GlowButton from '@/components/ui/GlowButton';

const roles = ['AWS Cloud Engineer', 'DevOps Engineer', 'Associate Cloud Engineer', 'Cloud Support Engineer'];

const stats = [
  { value: 'AWS', label: 'ECS · Fargate · Lambda' },
  { value: 'DevOps', label: 'Docker · SAM · CloudFormation' },
  { value: 'CCNA', label: 'Networking Fundamentals' },
  { value: '6 Mos', label: 'Cloud Intern Experience' },
];

const systemStatus = [
  { label: 'CLOUD', status: 'ONLINE', color: '#10b981' },
  { label: 'DOCKER', status: 'ONLINE', color: '#2496ed' },
  { label: 'ECS', status: 'ONLINE', color: '#ff9900' },
  { label: 'MONITORING', status: 'ONLINE', color: '#10b981' },
];

export default function HeroSection() {
  return (
    <section
      id="hero"
      className="relative min-h-screen flex flex-col justify-center overflow-hidden"
      aria-label="Introduction"
    >
      {/* Background grid */}
      <div className="absolute inset-0 grid-bg" aria-hidden="true" />

      {/* Radial glow */}
      <div
        className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(ellipse, rgba(0,212,255,0.06) 0%, transparent 70%)' }}
        aria-hidden="true"
      />

      <div className="section-inner relative pt-24 pb-12">
        <div className="mx-auto w-full max-w-4xl text-center">
          {/* Main content */}
          <div>
            {/* System tag */}
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 font-mono text-xs text-accent border border-accent/30 bg-accent/5 px-3 py-1.5 rounded mb-6"
            >
              <span className="w-2 h-2 rounded-full bg-accent animate-pulse-slow" aria-hidden="true" />
              AWS CLOUD & DEVOPS ENGINEERING LAB — ACTIVE
            </motion.div>

            {/* Name */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-5xl sm:text-6xl lg:text-7xl font-bold text-text-primary tracking-tight leading-none mb-2"
            >
              SOORYA M
            </motion.h1>

            {/* Role */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="mb-6"
            >
              <p className="text-xl sm:text-2xl text-accent font-semibold tracking-wide">
                AWS Cloud Engineer | DevOps Engineer
              </p>
              <p className="font-mono text-text-muted text-sm mt-1 tracking-widest">
                AWS • DOCKER • ECS FARGATE • SERVERLESS • IAC • PYTHON
              </p>
            </motion.div>

            {/* Supporting statement / Professional summary */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="text-text-secondary max-w-3xl mx-auto mb-8 leading-relaxed text-sm sm:text-base"
            >
              Entry-level AWS Cloud Engineer and Junior DevOps candidate with hands-on experience deploying
              containerized Python/FastAPI applications on Amazon ECS Fargate, building serverless and event-driven
              systems with AWS Lambda, API Gateway, DynamoDB, and EventBridge, and defining infrastructure as code
              with AWS SAM and CloudFormation. Comfortable with Docker, AWS CLI, CloudWatch monitoring and
              troubleshooting, and AWS networking and security groups, backed by CCNA networking fundamentals.
              Completed a six-month Cloud Engineer internship and seeking Junior AWS Cloud Engineer, Associate
              Cloud Engineer, Junior DevOps Engineer, or Cloud Support Engineer roles.
            </motion.p>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="flex flex-wrap justify-center gap-3 mb-8"
            >
              <GlowButton
                variant="primary"
                href="#projects"
                aria-label="View featured cloud projects"
              >
                FEATURED PROJECTS
              </GlowButton>
              <GlowButton
                variant="secondary"
                href={socialLinks.resume.url}
                download={socialLinks.resume.downloadName}
                icon={<Download size={14} />}
              >
                Download Resume
              </GlowButton>
              <GlowButton
                variant="ghost"
                href={socialLinks.github.url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="View GitHub profile"
                icon={<Github size={14} />}
              >
                GITHUB
              </GlowButton>
              <GlowButton
                variant="ghost"
                href={socialLinks.linkedin.url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="View LinkedIn profile"
                icon={<Linkedin size={14} />}
              >
                LINKEDIN
              </GlowButton>
            </motion.div>

            {/* Quick info */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="flex flex-wrap justify-center gap-x-5 gap-y-2 font-mono text-xs text-text-muted"
            >
              <span>📍 Chennai, Tamil Nadu, India</span>
              <span>🎓 B.E. CSE — National Engineering College (May 2026)</span>
              <span>🎓 D.M.E. — Lakshmi Ammal Polytechnic (May 2023)</span>
              <span>📜 CCNA Completed</span>
              <a href={socialLinks.email.url} className="hover:text-accent transition-colors underline-offset-2 hover:underline">
                ✉ sooryamathanagopal07@gmail.com
              </a>
              <a href={socialLinks.phone.url} className="hover:text-accent transition-colors underline-offset-2 hover:underline">
                ☎ 9843729832
              </a>
            </motion.div>
          </div>
        </div>

        {/* Stats row */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-4"
        >
          {stats.map(({ value, label }) => (
            <div key={label} className="card p-4 text-center">
              <div className="font-mono text-xl font-bold text-accent">{value}</div>
              <div className="font-mono text-xs text-text-muted mt-1">{label}</div>
            </div>
          ))}
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 1 }}
          className="mt-12 flex justify-center"
          aria-hidden="true"
        >
          <a
            href="#cloudsentinel"
            className="flex flex-col items-center gap-2 text-text-muted hover:text-accent transition-colors group focus-visible:outline-none"
            aria-label="Scroll to CloudSentinel"
          >
            <span className="font-mono text-xs tracking-widest">SCROLL DOWN</span>
            <ArrowDown size={16} className="animate-bounce" />
          </a>
        </motion.div>
      </div>
    </section>
  );
}

function TermLine({ delay, prompt, text, color, blink }) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => setVisible(true), delay * 1000);
    return () => clearTimeout(timeout);
  }, [delay]);

  if (!visible) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.2 }}
      className={`flex items-start gap-2 ${color}`}
    >
      {prompt && <span className="text-accent flex-shrink-0">{prompt}</span>}
      <span className={blink ? 'animate-pulse' : ''}>{text}</span>
    </motion.div>
  );
}
