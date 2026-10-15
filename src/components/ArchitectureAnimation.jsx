import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useReducedMotion } from '@/hooks/useReducedMotion';

const pipelineStages = [
  { id: 'local', label: 'LOCAL API', sublabel: 'Python · FastAPI · Uvicorn', icon: '🐍', color: '#3776ab' },
  { id: 'docker', label: 'DOCKER IMAGE', sublabel: 'Containerized App', icon: '🐳', color: '#2496ed' },
  { id: 'ecr', label: 'AMAZON ECR', sublabel: 'Container Registry', icon: '📦', color: '#ff9900' },
  { id: 'ecs', label: 'ECS FARGATE', sublabel: 'Serverless Compute', icon: '🚀', color: '#ff9900' },
  { id: 'cloudwatch', label: 'CLOUDWATCH', sublabel: 'Monitoring & Logs', icon: '📊', color: '#10b981' },
];

const stageDetails = {
  local: {
    title: 'Python FastAPI Application',
    code: `# app/main.py
from fastapi import FastAPI
import uvicorn

app = FastAPI(title="CloudSentinel")

@app.get("/health")
async def health():
    return {"status": "running"}

if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000)`,
  },
  docker: {
    title: 'Dockerfile',
    code: `FROM python:3.11-slim
WORKDIR /app
COPY requirements.txt .
RUN pip install -r requirements.txt
COPY . .
EXPOSE 8000
CMD ["uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "8000"]`,
  },
  ecr: {
    title: 'Push to Amazon ECR',
    code: `# Authenticate Docker to ECR
aws ecr get-login-password --region ap-south-1 \\
  | docker login --username AWS \\
    --password-stdin \\
    123456.dkr.ecr.ap-south-1.amazonaws.com

# Tag and push
docker tag cloudsentinel:latest \\
  123456.dkr.ecr.ap-south-1.amazonaws.com/cloudsentinel:latest
docker push \\
  123456.dkr.ecr.ap-south-1.amazonaws.com/cloudsentinel:latest`,
  },
  ecs: {
    title: 'ECS Task Definition',
    code: `{
  "family": "cloudsentinel-task",
  "requiresCompatibilities": ["FARGATE"],
  "networkMode": "awsvpc",
  "cpu": "256",
  "memory": "512",
  "containerDefinitions": [{
    "name": "cloudsentinel",
    "image": "123456.dkr.ecr.ap-south-1.amazonaws.com/cloudsentinel:latest",
    "portMappings": [{"containerPort": 8000}],
    "logConfiguration": {
      "logDriver": "awslogs",
      "options": {
        "awslogs-group": "/ecs/cloudsentinel",
        "awslogs-region": "ap-south-1"
      }
    }
  }]
}`,
  },
  cloudwatch: {
    title: 'CloudWatch Logs',
    code: `# View ECS logs
aws logs tail /ecs/cloudsentinel --follow

# Sample output:
[INFO]  Started server process [1]
[INFO]  Waiting for application startup.
[INFO]  Application startup complete.
[INFO]  Uvicorn running on http://0.0.0.0:8000
[INFO]  GET /health HTTP/1.1 200 OK`,
  },
};

export default function ArchitectureAnimation({ onStageClick }) {
  const [activeStage, setActiveStage] = useState(0);
  const [autoPlay, setAutoPlay] = useState(true);
  const reducedMotion = useReducedMotion();
  const intervalRef = useRef(null);

  useEffect(() => {
    if (!autoPlay || reducedMotion) return;
    intervalRef.current = setInterval(() => {
      setActiveStage((s) => (s + 1) % pipelineStages.length);
    }, 3000);
    return () => clearInterval(intervalRef.current);
  }, [autoPlay, reducedMotion]);

  function handleStageClick(idx) {
    setAutoPlay(false);
    setActiveStage(idx);
    clearInterval(intervalRef.current);
  }

  const currentStage = pipelineStages[activeStage];
  const currentDetail = stageDetails[currentStage.id];

  return (
    <div className="space-y-6">
      {/* Pipeline visualization */}
      <div className="flex items-center justify-between overflow-x-auto pb-2" role="list" aria-label="Deployment pipeline stages">
        {pipelineStages.map((stage, idx) => (
          <div key={stage.id} className="flex items-center" role="listitem">
            <button
              onClick={() => handleStageClick(idx)}
              className={`flex flex-col items-center gap-2 p-3 rounded-lg transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent min-w-[80px] ${
                idx === activeStage
                  ? 'bg-surface-raised border border-accent/40'
                  : idx < activeStage
                  ? 'opacity-60 hover:opacity-80'
                  : 'opacity-40 hover:opacity-60'
              }`}
              aria-pressed={idx === activeStage}
              aria-label={`${stage.label} — ${stage.sublabel}`}
            >
              <span className="text-2xl" role="img" aria-hidden="true">{stage.icon}</span>
              <div className="text-center">
                <div
                  className="font-mono text-xs font-semibold"
                  style={{ color: idx <= activeStage ? stage.color : '#555568' }}
                >
                  {stage.label}
                </div>
                <div className="font-mono text-xs text-text-muted hidden sm:block">{stage.sublabel}</div>
              </div>
              {idx === activeStage && (
                <span className="w-1.5 h-1.5 rounded-full animate-pulse-slow" style={{ backgroundColor: stage.color }} />
              )}
            </button>

            {/* Connector arrow */}
            {idx < pipelineStages.length - 1 && (
              <div className="flex-shrink-0 mx-1 sm:mx-2" aria-hidden="true">
                <svg width="24" height="16" viewBox="0 0 24 16">
                  <line
                    x1="0" y1="8" x2="16" y2="8"
                    stroke={idx < activeStage ? '#00d4ff' : 'rgba(136,136,170,0.3)'}
                    strokeWidth="1.5"
                    style={{ transition: 'stroke 0.5s' }}
                  />
                  <polyline
                    points="12,4 20,8 12,12"
                    fill="none"
                    stroke={idx < activeStage ? '#00d4ff' : 'rgba(136,136,170,0.3)'}
                    strokeWidth="1.5"
                    style={{ transition: 'stroke 0.5s' }}
                  />
                </svg>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Code panel */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentStage.id}
          initial={reducedMotion ? false : { opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.25 }}
          className="rounded-lg border border-surface-border overflow-hidden"
        >
          <div className="flex items-center gap-2 px-4 py-3 bg-surface-raised border-b border-surface-border">
            <span className="w-3 h-3 rounded-full bg-error opacity-80" />
            <span className="w-3 h-3 rounded-full bg-warning opacity-80" />
            <span className="w-3 h-3 rounded-full bg-success opacity-80" />
            <span className="ml-2 font-mono text-xs text-text-muted flex-1">{currentDetail.title}</span>
            <span className="font-mono text-xs" style={{ color: currentStage.color }}>
              STAGE {activeStage + 1}/{pipelineStages.length}
            </span>
          </div>
          <pre className="bg-bg p-4 overflow-x-auto">
            <code className="font-mono text-xs text-text-secondary leading-relaxed whitespace-pre">
              {currentDetail.code}
            </code>
          </pre>
        </motion.div>
      </AnimatePresence>

      {/* Auto-play control */}
      <div className="flex items-center justify-between">
        <p className="font-mono text-xs text-text-muted">
          Click any stage to explore · {!autoPlay ? 'Auto-play paused' : 'Auto-playing'}
        </p>
        <button
          onClick={() => setAutoPlay((v) => !v)}
          className="font-mono text-xs text-text-muted hover:text-accent transition-colors border border-surface-border px-3 py-1 rounded focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
          aria-label={autoPlay ? 'Pause auto-play' : 'Resume auto-play'}
        >
          {autoPlay ? '⏸ PAUSE' : '▶ PLAY'}
        </button>
      </div>
    </div>
  );
}
