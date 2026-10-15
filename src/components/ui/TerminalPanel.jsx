import { cn } from '@/utils/cn';

export default function TerminalPanel({ title, children, className, headerRight }) {
  return (
    <div className={cn('rounded-lg border border-surface-border overflow-hidden', className)}>
      <div className="flex items-center gap-2 px-4 py-3 bg-surface-raised border-b border-surface-border">
        <span className="w-3 h-3 rounded-full bg-error opacity-80" />
        <span className="w-3 h-3 rounded-full bg-warning opacity-80" />
        <span className="w-3 h-3 rounded-full bg-success opacity-80" />
        <span className="ml-3 font-mono text-xs text-text-muted flex-1 truncate">{title}</span>
        {headerRight && <div className="flex-shrink-0">{headerRight}</div>}
      </div>
      <div className="bg-bg p-4">{children}</div>
    </div>
  );
}
