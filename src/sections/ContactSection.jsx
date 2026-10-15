import { motion } from 'framer-motion';
import { Github, Linkedin, Mail, Download, MapPin } from 'lucide-react';
import { socialLinks } from '@/data/socialLinks';
import { useReducedMotion } from '@/hooks/useReducedMotion';

const contactItems = [
  {
    label: 'LinkedIn',
    icon: Linkedin,
    href: () => socialLinks.linkedin.url,
    sublabel: 'Connect professionally',
    color: '#0a66c2',
  },
  {
    label: 'GitHub',
    icon: Github,
    href: () => socialLinks.github.url,
    sublabel: 'View my repositories',
    color: '#f0f0f5',
  },
  {
    label: 'Email',
    icon: Mail,
    href: () => socialLinks.email.url,
    sublabel: 'Send an email',
    color: '#00d4ff',
  },
  {
    label: 'Download Resume',
    icon: Download,
    href: () => socialLinks.resume.url,
    download: socialLinks.resume.downloadName,
    sublabel: 'Download PDF',
    color: '#10b981',
  },
];

export default function ContactSection() {
  const reducedMotion = useReducedMotion();

  return (
    <section id="contact" className="py-24 relative" aria-labelledby="contact-heading">
      {/* Glow line top */}
      <div className="glow-line mb-12" aria-hidden="true" />

      <div className="section-inner text-center">
        {/* Final tagline */}
        <motion.div
          initial={reducedMotion ? false : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-12 lg:mb-16"
        >
          <p className="font-mono text-xs text-accent tracking-[0.3em] mb-4">ENGINEERING CONTACT</p>
          <h2 id="contact-heading" className="text-4xl md:text-5xl font-bold text-text-primary mb-4">
            LET'S CONNECT &<br />
            <span className="text-accent">BUILD TOGETHER</span>
          </h2>
          <p className="text-text-secondary max-w-lg mx-auto mb-6 text-sm sm:text-base leading-relaxed">
            Open to opportunities as a Junior AWS Cloud Engineer, Associate Cloud Engineer,
            Junior DevOps Engineer, or Cloud Support Engineer.
          </p>

          {/* You saw... summary */}
          <div className="inline-flex flex-wrap justify-center gap-2 mb-8">
            {['AWS', 'CONTAINERS', 'SERVERLESS', 'IAC', 'NETWORKING', 'DEVOPS'].map((word) => (
              <span key={word} className="font-mono text-xs px-3 py-1 border border-accent/30 text-accent rounded bg-accent/5">
                {word}
              </span>
            ))}
          </div>
        </motion.div>

        {/* Identity */}
        <motion.div
          initial={reducedMotion ? false : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="card p-8 mb-8 text-center max-w-xl mx-auto"
        >
          <div className="w-16 h-16 rounded-full bg-accent/10 border-2 border-accent/30 flex items-center justify-center mx-auto mb-4">
            <span className="font-mono text-2xl font-bold text-accent">SM</span>
          </div>
          <h3 className="text-2xl font-bold text-text-primary">SOORYA M</h3>
          <p className="font-mono text-accent text-sm mt-1">AWS Cloud Engineer | DevOps Engineer</p>
          <div className="flex items-center justify-center gap-1.5 mt-2 text-text-muted">
            <MapPin size={14} aria-hidden="true" />
            <span className="font-mono text-xs">Chennai, Tamil Nadu, India</span>
          </div>
          <div className="flex flex-wrap items-center justify-center gap-x-5 gap-y-1 mt-4 font-mono text-xs">
            <a
              href={socialLinks.email.url}
              className="text-text-secondary hover:text-accent transition-colors underline-offset-2 hover:underline"
            >
              sooryamathanagopal07@gmail.com
            </a>
            <span className="text-surface-border hidden sm:inline">•</span>
            <a
              href={socialLinks.phone.url}
              className="text-text-secondary hover:text-accent transition-colors underline-offset-2 hover:underline"
            >
              +91 9843729832
            </a>
          </div>
        </motion.div>

        {/* Contact grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {contactItems.map((item, idx) => {
            const { label, icon: Icon, href, sublabel, color, download } = item;
            return (
              <motion.a
                key={label}
                href={href()}
                download={download}
                target={label !== 'Email' && !download ? '_blank' : undefined}
                rel={label !== 'Email' && !download ? 'noopener noreferrer' : undefined}
                initial={reducedMotion ? false : { opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 + idx * 0.08, duration: 0.4 }}
                className="card p-5 hover:border-accent/30 transition-all duration-300 group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
                aria-label={`${label} — ${sublabel}`}
              >
                <div
                  className="w-10 h-10 rounded-lg flex items-center justify-center mb-3 mx-auto"
                  style={{ backgroundColor: `${color}22`, border: `1px solid ${color}44` }}
                >
                  <Icon size={20} style={{ color }} aria-hidden="true" />
                </div>
                <div className="font-mono text-sm font-semibold text-text-primary group-hover:text-accent transition-colors">{label}</div>
                <div className="font-mono text-xs text-text-muted mt-0.5">{sublabel}</div>
              </motion.a>
            );
          })}
        </div>

        {/* Footer */}
        <motion.div
          initial={reducedMotion ? false : { opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="font-mono text-xs text-text-muted space-y-1"
        >
          <p>SOORYA M // CLOUD ENGINEERING LAB</p>
          <p>BUILD. DEPLOY. DEBUG. MONITOR. LEARN.</p>
          <p className="flex flex-wrap justify-center gap-x-4 gap-y-1 mt-2">
            <a href={socialLinks.email.url} className="hover:text-accent transition-colors">sooryamathanagopal07@gmail.com</a>
            <a href={socialLinks.phone.url} className="hover:text-accent transition-colors">9843729832</a>
          </p>
          <p className="mt-4 text-surface-border">
            Built with React · Vite · Tailwind CSS · Framer Motion
          </p>
        </motion.div>
      </div>
    </section>
  );
}
