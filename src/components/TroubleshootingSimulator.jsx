import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import { AlertTriangle, CheckCircle, ChevronRight } from 'lucide-react';

const scenario = {
  title: 'SERVICE DEGRADED — CLOUDSENTINEL API',
  description: 'Your ECS Fargate service launched but the API is not responding. CloudWatch shows the task started. What do you investigate first?',
  options: [
    {
      id: 'ecs-task',
      label: 'ECS Task Status',
      icon: '🚀',
      response: {
        finding: 'ECS task shows RUNNING state. The task started successfully.',
        insight: 'Good first step. Task status confirms the container is alive, but it doesn\'t tell you if the application inside is working correctly.',
        next: 'The task is running, but something else is wrong. What next?',
        correct: false,
      },
    },
    {
      id: 'container-logs',
      label: 'CloudWatch Container Logs',
      icon: '📋',
      response: {
        finding: 'Logs show: "Address already in use: [::]:8000" — Port conflict inside the container.',
        insight: 'Excellent. Container logs are the most direct evidence of what\'s happening inside. This reveals a port binding failure — the application couldn\'t start.',
        next: 'Root cause found. Fix: Check the Dockerfile CMD and ensure no conflicting processes.',
        correct: true,
      },
    },
    {
      id: 'network',
      label: 'VPC / Network Config',
      icon: '🌐',
      response: {
        finding: 'VPC, subnets, and route tables are correctly configured.',
        insight: 'Reasonable check. Network issues would prevent external access. But if the task is RUNNING and unreachable, the problem is often at the application or security group level first.',
        next: 'Network looks fine. The issue is closer to the container itself.',
        correct: false,
      },
    },
    {
      id: 'security-group',
      label: 'Security Group Rules',
      icon: '🔒',
      response: {
        finding: 'Security group allows inbound on port 8000. Rules look correct.',
        insight: 'Smart check. Security groups are a very common reason services are unreachable. In this case they\'re fine, which narrows the problem to the application layer.',
        next: 'Security groups are not the issue. The problem is inside the container.',
        correct: false,
      },
    },
    {
      id: 'logs',
      label: 'ECS Service Events',
      icon: '📊',
      response: {
        finding: 'ECS service events show: "Task stopped — exit code 1".',
        insight: 'Service events are valuable. Exit code 1 confirms the application crashed. Now you need the logs to find out why.',
        next: 'Exit code 1 means application crash. Check CloudWatch container logs for details.',
        correct: false,
      },
    },
  ],
  resolution: {
    rootCause: 'The Dockerfile CMD was starting Uvicorn on port 8000, but a previous container process had left a socket open. Fix: explicitly set `host="0.0.0.0"` and ensure clean container startup.',
    lesson: 'When debugging ECS failures: (1) Check task status, (2) Read CloudWatch container logs, (3) Verify security groups, (4) Check network. Logs are always the most direct evidence.',
  },
};

export default function TroubleshootingSimulator() {
  const [selectedOption, setSelectedOption] = useState(null);
  const [showResolution, setShowResolution] = useState(false);
  const [attempted, setAttempted] = useState([]);
  const reducedMotion = useReducedMotion();

  function handleSelect(option) {
    setSelectedOption(option);
    setAttempted((prev) => [...new Set([...prev, option.id])]);
  }

  function reset() {
    setSelectedOption(null);
    setShowResolution(false);
    setAttempted([]);
  }

  return (
    <div className="rounded-lg border border-warning/30 bg-warning/5 overflow-hidden" role="region" aria-label="Interactive troubleshooting simulation">
      {/* Header */}
      <div className="flex items-center gap-3 px-5 py-4 bg-warning/10 border-b border-warning/20">
        <AlertTriangle size={18} className="text-warning flex-shrink-0" aria-hidden="true" />
        <div>
          <p className="font-mono text-xs text-warning tracking-widest">INTERACTIVE TROUBLESHOOTING SIMULATION</p>
          <p className="font-mono text-xs text-text-muted mt-0.5">This is a learning exercise — not a real production incident</p>
        </div>
      </div>

      <div className="p-5 space-y-6">
        {/* Scenario */}
        <div>
          <div className="flex items-center gap-2 mb-3">
            <span className="w-2 h-2 rounded-full bg-warning animate-pulse-slow" aria-hidden="true" />
            <h3 className="font-mono text-sm font-semibold text-warning">{scenario.title}</h3>
          </div>
          <p className="text-text-secondary text-sm leading-relaxed">{scenario.description}</p>
        </div>

        {/* Options */}
        <div>
          <p className="font-mono text-xs text-text-muted mb-3">WHAT WOULD YOU CHECK FIRST?</p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-2">
            {scenario.options.map((option) => {
              const isAttempted = attempted.includes(option.id);
              const isSelected = selectedOption?.id === option.id;

              return (
                <button
                  key={option.id}
                  onClick={() => handleSelect(option)}
                  className={`text-left p-3 rounded border transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent ${
                    isSelected
                      ? option.response.correct
                        ? 'border-success/60 bg-success/10'
                        : 'border-accent/60 bg-accent/5'
                      : isAttempted
                      ? 'border-surface-border opacity-60'
                      : 'border-surface-border hover:border-accent/40 hover:bg-surface-raised'
                  }`}
                  aria-pressed={isSelected}
                  aria-label={`Investigate: ${option.label}`}
                >
                  <div className="flex items-center gap-2">
                    <span role="img" aria-hidden="true">{option.icon}</span>
                    <span className="font-mono text-xs text-text-primary">{option.label}</span>
                    {isSelected && option.response.correct && (
                      <CheckCircle size={14} className="text-success ml-auto flex-shrink-0" />
                    )}
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Response panel */}
        <AnimatePresence mode="wait">
          {selectedOption && (
            <motion.div
              key={selectedOption.id}
              initial={reducedMotion ? false : { opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.25 }}
              className={`rounded border p-4 space-y-3 ${
                selectedOption.response.correct
                  ? 'border-success/30 bg-success/5'
                  : 'border-accent/20 bg-surface-raised'
              }`}
            >
              <div>
                <p className="font-mono text-xs text-accent mb-1">FINDING:</p>
                <p className="font-mono text-xs text-text-secondary">{selectedOption.response.finding}</p>
              </div>
              <div>
                <p className="font-mono text-xs text-accent mb-1">INSIGHT:</p>
                <p className="text-sm text-text-secondary">{selectedOption.response.insight}</p>
              </div>
              <div className="border-t border-surface-border pt-3">
                <p className="font-mono text-xs text-text-muted">
                  <ChevronRight size={12} className="inline mr-1" aria-hidden="true" />
                  {selectedOption.response.next}
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Resolution */}
        {attempted.length >= 2 && !showResolution && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <button
              onClick={() => setShowResolution(true)}
              className="font-mono text-xs border border-surface-border text-text-muted px-4 py-2 rounded hover:border-accent/40 hover:text-accent transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
            >
              SHOW FULL RESOLUTION →
            </button>
          </motion.div>
        )}

        <AnimatePresence>
          {showResolution && (
            <motion.div
              initial={reducedMotion ? false : { opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="rounded border border-success/30 bg-success/5 p-4 space-y-3"
            >
              <p className="font-mono text-xs text-success">✓ INCIDENT RESOLVED</p>
              <div>
                <p className="font-mono text-xs text-text-muted mb-1">ROOT CAUSE:</p>
                <p className="text-sm text-text-secondary">{scenario.resolution.rootCause}</p>
              </div>
              <div>
                <p className="font-mono text-xs text-text-muted mb-1">LESSON:</p>
                <p className="text-sm text-text-secondary">{scenario.resolution.lesson}</p>
              </div>
              <button
                onClick={reset}
                className="font-mono text-xs border border-surface-border text-text-muted px-4 py-2 rounded hover:border-accent/40 hover:text-accent transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
              >
                RESET SIMULATION
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
