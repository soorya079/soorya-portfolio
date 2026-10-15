import { cn } from '@/utils/cn';

const variants = {
  primary: 'bg-accent text-bg font-semibold hover:bg-accent/90 shadow-[0_0_20px_rgba(0,212,255,0.3)] hover:shadow-[0_0_30px_rgba(0,212,255,0.5)]',
  secondary: 'border border-accent text-accent hover:bg-accent/10',
  ghost: 'border border-surface-border text-text-secondary hover:border-accent/50 hover:text-text-primary',
};

export default function GlowButton({ children, variant = 'secondary', onClick, href, target, download, className, disabled, icon }) {
  const cls = cn(
    'inline-flex items-center gap-2 px-5 py-2.5 rounded font-mono text-sm tracking-wider transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent',
    variants[variant],
    disabled && 'opacity-50 cursor-not-allowed pointer-events-none',
    className
  );

  if (href) {
    return (
      <a href={href} target={target} download={download} rel={target === '_blank' ? 'noopener noreferrer' : undefined} className={cls}>
        {icon}{children}
      </a>
    );
  }
  return (
    <button onClick={onClick} disabled={disabled} className={cls}>
      {icon}{children}
    </button>
  );
}
