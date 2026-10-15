import { cn } from '@/utils/cn';

const variants = {
  default: 'bg-surface-raised border border-surface-border text-text-secondary',
  cloud: 'bg-amber-950/40 border border-amber-800/40 text-amber-400',
  devops: 'bg-cyan-950/40 border border-cyan-800/40 text-cyan-400',
  web: 'bg-purple-950/40 border border-purple-800/40 text-purple-400',
  data: 'bg-emerald-950/40 border border-emerald-800/40 text-emerald-400',
};

export default function Badge({ children, variant = 'default', className }) {
  return (
    <span className={cn('inline-block font-mono text-xs px-2 py-0.5 rounded', variants[variant], className)}>
      {children}
    </span>
  );
}
