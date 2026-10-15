import { cn } from '@/utils/cn';

export default function SectionHeader({ label, title, subtitle, className, align = 'left' }) {
  return (
    <div className={cn('mb-12', align === 'center' && 'text-center', className)}>
      {label && (
        <p className="font-mono text-xs text-accent tracking-[0.2em] mb-3 uppercase">{label}</p>
      )}
      <h2 className="text-3xl md:text-4xl font-bold text-text-primary tracking-tight">{title}</h2>
      {subtitle && (
        <p className="mt-3 text-text-secondary max-w-2xl" style={align === 'center' ? { marginLeft: 'auto', marginRight: 'auto' } : {}}>
          {subtitle}
        </p>
      )}
    </div>
  );
}
