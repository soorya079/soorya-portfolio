import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Github, Linkedin, ExternalLink } from 'lucide-react';
import { socialLinks } from '@/data/socialLinks';
import { cn } from '@/utils/cn';

const navItems = [
  { label: 'LAB', href: '#hero' },
  { label: 'PROJECTS', href: '#projects' },
  { label: 'SKILLS', href: '#skills' },
  { label: 'EXPERIENCE', href: '#experience' },
  { label: 'CERTIFICATIONS', href: '#certifications' },
  { label: 'CONTACT', href: '#contact' },
];

export default function Navigation({ onRecruiterMode }) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <>
      <header
        className={cn(
          'fixed top-0 left-0 right-0 z-40 transition-all duration-300',
          scrolled
            ? 'bg-bg/90 backdrop-blur-md border-b border-surface-border'
            : 'bg-transparent'
        )}
        role="banner"
      >
        <nav className="section-inner h-14 flex items-center justify-between" aria-label="Main navigation">
          {/* Logo */}
          <a
            href="#hero"
            className="font-mono text-sm text-text-primary tracking-widest hover:text-accent transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent rounded"
            aria-label="Soorya M Cloud Engineering Lab"
          >
            <span className="text-accent">SM</span>
            <span className="text-text-muted mx-2">//</span>
            <span className="hidden sm:inline">CLOUD LAB</span>
          </a>

          {/* Desktop nav */}
          <ul className="hidden md:flex items-center gap-1" role="list">
            {navItems.map((item) => (
              <li key={item.label}>
                <a
                  href={item.href}
                  className="font-mono text-xs text-text-muted hover:text-accent px-3 py-1.5 rounded transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>

          {/* Desktop right */}
          <div className="hidden md:flex items-center gap-2">
            <button
              onClick={onRecruiterMode}
              className="font-mono text-xs border border-accent/50 text-accent px-3 py-1.5 rounded hover:bg-accent/10 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
              aria-label="Activate recruiter mode"
            >
              RECRUITER MODE
            </button>
            <a
              href={socialLinks.github.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-text-muted hover:text-text-primary p-2 rounded transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
              aria-label="GitHub profile"
            >
              <Github size={18} />
            </a>
            <a
              href={socialLinks.resume.url}
              download={socialLinks.resume.downloadName}
              target="_blank"
              rel="noopener noreferrer"
              className="font-mono text-xs bg-accent text-bg px-3 py-1.5 rounded font-semibold hover:bg-accent/90 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
              aria-label="Download resume"
            >
              RESUME
            </a>
          </div>

          {/* Mobile hamburger */}
          <button
            onClick={() => setMobileOpen(true)}
            className="md:hidden text-text-muted hover:text-text-primary p-2 rounded focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
            aria-label="Open navigation menu"
            aria-expanded={mobileOpen}
          >
            <Menu size={22} />
          </button>
        </nav>
      </header>

      {/* Mobile drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              key="overlay"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 bg-bg/80 backdrop-blur-sm"
              onClick={() => setMobileOpen(false)}
            />
            <motion.div
              key="drawer"
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'tween', duration: 0.25 }}
              className="fixed top-0 right-0 bottom-0 z-50 w-72 bg-surface border-l border-surface-border flex flex-col"
              role="dialog"
              aria-modal="true"
              aria-label="Navigation menu"
            >
              <div className="flex items-center justify-between px-6 h-14 border-b border-surface-border">
                <span className="font-mono text-sm text-accent">NAVIGATION</span>
                <button
                  onClick={() => setMobileOpen(false)}
                  className="text-text-muted hover:text-text-primary p-1 rounded focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
                  aria-label="Close navigation menu"
                >
                  <X size={20} />
                </button>
              </div>

              <nav className="flex-1 px-6 py-8">
                <ul className="space-y-2" role="list">
                  {navItems.map((item) => (
                    <li key={item.label}>
                      <a
                        href={item.href}
                        onClick={() => setMobileOpen(false)}
                        className="font-mono text-sm text-text-muted hover:text-accent flex items-center gap-3 py-2 rounded transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
                      >
                        <span className="text-text-muted text-xs">›</span>
                        {item.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </nav>

              <div className="px-6 pb-8 space-y-3 border-t border-surface-border pt-6">
                <button
                  onClick={() => { setMobileOpen(false); onRecruiterMode?.(); }}
                  className="w-full font-mono text-xs border border-accent/50 text-accent px-4 py-2.5 rounded hover:bg-accent/10 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
                >
                  RECRUITER MODE
                </button>
                <a
                  href={socialLinks.resume.url}
                  download={socialLinks.resume.downloadName}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full font-mono text-xs bg-accent text-bg px-4 py-2.5 rounded font-semibold hover:bg-accent/90 transition-colors text-center block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
                >
                  DOWNLOAD RESUME
                </a>
                <div className="flex gap-4 justify-center pt-2">
                  <a href={socialLinks.github.url} target="_blank" rel="noopener noreferrer" className="text-text-muted hover:text-text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent rounded" aria-label="GitHub">
                    <Github size={20} />
                  </a>
                  <a href={socialLinks.linkedin.url} target="_blank" rel="noopener noreferrer" className="text-text-muted hover:text-text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent rounded" aria-label="LinkedIn">
                    <Linkedin size={20} />
                  </a>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
