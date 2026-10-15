import { cn } from '@/utils/cn';

const statusConfig = {
  LIVE: { dot: 'bg-success animate-pulse-slow', text: 'text-success', label: 'LIVE' },
  OFFLINE: { dot: 'bg-error', text: 'text-error', label: 'OFFLINE' },
  'IN DEVELOPMENT': { dot: 'bg-warning animate-pulse-slow', text: 'text-warning', label: 'IN DEV' },
  'NOT DEPLOYED': { dot: 'bg-text-muted', text: 'text-text-muted', label: 'NOT DEPLOYED' },
};

export default function StatusDot({ status = 'IN DEVELOPMENT', showLabel = true, className }) {
  const config = statusConfig[status] || statusConfig['IN DEVELOPMENT'];
  return (
    <span className={cn('inline-flex items-center gap-1.5', className)}>
      <span className={cn('w-2 h-2 rounded-full', config.dot)} />
      {showLabel && (
        <span className={cn('font-mono text-xs tracking-wider', config.text)}>
          {config.label}
        </span>
      )}
    </span>
  );
}
