import { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import SectionHeader from '@/components/ui/SectionHeader';

const nodes = [
  { id: 'soorya', label: 'SOORYA M', sublabel: 'Cloud / DevOps', x: 70, y: 70, color: '#00d4ff', size: 36, primary: true },
  { id: 'aws', label: 'AWS', sublabel: 'Cloud Platform', x: 25, y: 18, color: '#ff9900', size: 28 },
  { id: 'docker', label: 'DOCKER', sublabel: 'Containerization', x: 115, y: 18, color: '#2496ed', size: 28 },
  { id: 'linux', label: 'LINUX', sublabel: 'OS / CLI', x: 25, y: 91, color: '#f59e0b', size: 24 },
  { id: 'networking', label: 'NETWORKING', sublabel: 'CCNA', x: 115, y: 91, color: '#10b981', size: 24 },
  { id: 'python', label: 'PYTHON', sublabel: 'Programming', x: 25, y: 126, color: '#3776ab', size: 24 },
  { id: 'github', label: 'GITHUB', sublabel: 'Version Control', x: 115, y: 126, color: '#f0f0f5', size: 24 },
  { id: 'cloudsentinel', label: 'CLOUDSENTINEL', sublabel: 'ECS Fargate API', x: 25, y: 50, color: '#00d4ff', size: 22, isProject: true },
  { id: 'lifegrid', label: 'LIFEGRID', sublabel: 'Serverless Platform', x: 70, y: 50, color: '#00d4ff', size: 20, isProject: true },
  { id: 'ecs', label: 'ECS', sublabel: 'Container Compute', x: 115, y: 50, color: '#ff9900', size: 20 },
  { id: 'ecr', label: 'ECR', sublabel: 'Container Registry', x: 70, y: 18, color: '#ff9900', size: 18 },
  { id: 'cloudwatch', label: 'CLOUDWATCH', sublabel: 'Monitoring', x: 70, y: 105, color: '#10b981', size: 20 },
];

const connections = [
  ['soorya', 'aws'], ['soorya', 'docker'], ['soorya', 'linux'],
  ['soorya', 'networking'], ['soorya', 'python'], ['soorya', 'github'],
  ['aws', 'cloudsentinel'], ['aws', 'lifegrid'], ['aws', 'ecs'], ['aws', 'ecr'], ['aws', 'cloudwatch'],
  ['docker', 'cloudsentinel'], ['docker', 'ecr'], ['docker', 'ecs'],
  ['python', 'cloudsentinel'], ['python', 'lifegrid'],
  ['networking', 'ecs'], ['networking', 'cloudsentinel'],
  ['ecs', 'cloudsentinel'], ['ecr', 'cloudsentinel'],
  ['cloudwatch', 'cloudsentinel'], ['cloudwatch', 'lifegrid'],
  ['github', 'cloudsentinel'], ['github', 'lifegrid'],
];

const nodeDetails = {
  aws: { used: ['CloudSentinel', 'LIFEGRID'], services: ['ECS Fargate', 'ECR', 'Lambda', 'API Gateway', 'DynamoDB', 'EventBridge', 'CloudWatch', 'IAM', 'SAM', 'CloudFormation'] },
  docker: { used: ['CloudSentinel', 'Bdreams Internship'], details: ['Dockerfile', 'Image build', 'Container run', 'ECR push'] },
  linux: { used: ['CloudSentinel', 'Containers'], details: ['AWS CLI', 'SSH', 'Shell scripting', 'Container runtimes'] },
  networking: { used: ['CloudSentinel', 'Bdreams Internship', 'CCNA'], details: ['Security groups', 'VPC', 'Subnets', 'DNS', 'TCP/IP'] },
  python: { used: ['CloudSentinel', 'LIFEGRID', 'Bdreams Internship'], details: ['FastAPI', 'REST APIs', 'Event handling', 'Backend logic'] },
  github: { used: ['All projects'], details: ['Version control', 'Repository management', 'Collaboration'] },
  cloudsentinel: { description: 'Python FastAPI → Docker → ECR → ECS Fargate → EventBridge & Lambda → CloudWatch' },
  lifegrid: { description: 'React Dashboard → API Gateway → AWS Lambda → DynamoDB → EventBridge → SAM / CloudFormation' },
  ecs: { used: ['CloudSentinel', 'Bdreams Internship'], details: ['Task definitions', 'Services', 'Fargate launch type', 'Health checks'] },
  ecr: { used: ['CloudSentinel', 'Bdreams Internship'], details: ['Repository creation', 'Image push/pull', 'CLI authentication'] },
  cloudwatch: { used: ['CloudSentinel', 'LIFEGRID', 'Bdreams Internship'], details: ['Log groups', 'Container logs', 'Metric monitoring', 'Troubleshooting'] },
};

export default function SystemMapSection() {
  const [selected, setSelected] = useState(null);
  const [hoveredNode, setHoveredNode] = useState(null);
  const reducedMotion = useReducedMotion();
  const svgRef = useRef(null);

  const activeNode = selected || hoveredNode;

  const connectedIds = activeNode
    ? new Set(
        connections
          .filter(([a, b]) => a === activeNode || b === activeNode)
          .flatMap(([a, b]) => [a, b])
      )
    : null;

  const getNode = (id) => nodes.find((n) => n.id === id);

  return (
    <section id="system-map" className="py-24 relative" aria-label="Interactive system map">
      <div className="section-inner">
        <SectionHeader
          label="SYSTEM MAP"
          title="How It All Connects"
          subtitle="Click or hover any node to explore relationships between skills, tools, and projects."
        />

        <div className="grid lg:grid-cols-3 gap-8 items-start">
          {/* SVG Map */}
          <div className="lg:col-span-2">
            <div className="card p-2 overflow-hidden">
              <svg
                ref={svgRef}
                viewBox="0 0 140 140"
                className="w-full aspect-square"
                role="img"
                aria-label="Interactive technology relationship map"
              >
                {/* Connection lines */}
                {connections.map(([a, b]) => {
                  const nodeA = getNode(a);
                  const nodeB = getNode(b);
                  if (!nodeA || !nodeB) return null;

                  const isHighlighted = connectedIds
                    ? connectedIds.has(a) && connectedIds.has(b)
                    : false;
                  const isDimmed = connectedIds && !isHighlighted;

                  return (
                    <line
                      key={`${a}-${b}`}
                      x1={nodeA.x}
                      y1={nodeA.y}
                      x2={nodeB.x}
                      y2={nodeB.y}
                      stroke={isHighlighted ? '#00d4ff' : 'rgba(136, 136, 170, 0.15)'}
                      strokeWidth={isHighlighted ? '0.4' : '0.2'}
                      className="transition-all duration-300"
                      opacity={isDimmed ? 0.05 : 1}
                    />
                  );
                })}

                {/* Nodes */}
                {nodes.map((node) => {
                  const isActive = activeNode === node.id;
                  const isConnected = connectedIds ? connectedIds.has(node.id) : false;
                  const isDimmed = connectedIds && !isConnected;

                  return (
                    <g
                      key={node.id}
                      onClick={() => setSelected(selected === node.id ? null : node.id)}
                      onMouseEnter={() => setHoveredNode(node.id)}
                      onMouseLeave={() => setHoveredNode(null)}
                      style={{ cursor: 'pointer', opacity: isDimmed ? 0.2 : 1, transition: 'opacity 0.3s' }}
                      role="button"
                      aria-label={`${node.label} — ${node.sublabel}`}
                      aria-pressed={selected === node.id}
                      tabIndex={0}
                      onKeyDown={(e) => e.key === 'Enter' && setSelected(selected === node.id ? null : node.id)}
                    >
                      {/* Glow ring when active */}
                      {(isActive || isConnected) && !reducedMotion && (
                        <circle
                          cx={node.x}
                          cy={node.y}
                          r={(node.size / 30) + 4}
                          fill="none"
                          stroke={node.color}
                          strokeWidth="0.3"
                          opacity="0.4"
                        />
                      )}

                      <circle
                        cx={node.x}
                        cy={node.y}
                        r={(node.size / 30) + 2.4}
                        fill={node.primary ? node.color : `${node.color}22`}
                        stroke={node.color}
                        strokeWidth={isActive ? '0.5' : '0.2'}
                        style={{ transition: 'all 0.3s' }}
                      />

                      <text
                        x={node.x}
                        y={node.y + 7.5}
                        textAnchor="middle"
                        dominantBaseline="hanging"
                        fill={node.color}
                        stroke="#111118"
                        strokeWidth="2.4"
                        strokeLinejoin="round"
                        paintOrder="stroke"
                        fontSize="4.2"
                        fontFamily="JetBrains Mono, monospace"
                        fontWeight="600"
                        style={{ pointerEvents: 'none', userSelect: 'none' }}
                      >
                        {node.label}
                      </text>
                    </g>
                  );
                })}
              </svg>
            </div>
            <p className="font-mono text-xs text-text-muted mt-3 text-center">
              Click any node to highlight its connections
            </p>
          </div>

          {/* Info panel */}
          <div className="space-y-4">
            {activeNode ? (
              <motion.div
                key={activeNode}
                initial={reducedMotion ? false : { opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="card p-5 border-accent/30"
              >
                {(() => {
                  const node = getNode(activeNode);
                  const detail = nodeDetails[activeNode];
                  if (!node) return null;
                  return (
                    <>
                      <div className="flex items-center gap-2 mb-4">
                        <span
                          className="w-3 h-3 rounded-full flex-shrink-0"
                          style={{ backgroundColor: node.color }}
                        />
                        <h3 className="font-mono font-semibold text-text-primary">{node.label}</h3>
                      </div>
                      <p className="font-mono text-xs text-text-muted mb-4">{node.sublabel}</p>

                      {detail?.description && (
                        <p className="text-sm text-text-secondary mb-4">{detail.description}</p>
                      )}

                      {detail?.used && (
                        <div className="mb-4">
                          <p className="font-mono text-xs text-accent mb-2">USED IN:</p>
                          <div className="space-y-1">
                            {detail.used.map((u) => (
                              <div key={u} className="font-mono text-xs text-text-secondary flex items-center gap-2">
                                <span className="text-text-muted">›</span> {u}
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {detail?.services && (
                        <div className="mb-4">
                          <p className="font-mono text-xs text-accent mb-2">SERVICES:</p>
                          <div className="flex flex-wrap gap-1">
                            {detail.services.map((s) => (
                              <span key={s} className="font-mono text-xs bg-surface-raised border border-surface-border text-text-muted px-2 py-0.5 rounded">
                                {s}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}

                      {detail?.details && (
                        <div>
                          <p className="font-mono text-xs text-accent mb-2">TOPICS:</p>
                          <div className="flex flex-wrap gap-1">
                            {detail.details.map((d) => (
                              <span key={d} className="font-mono text-xs bg-surface-raised border border-surface-border text-text-muted px-2 py-0.5 rounded">
                                {d}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}
                    </>
                  );
                })()}
              </motion.div>
            ) : (
              <div className="card p-5 border-dashed">
                <p className="font-mono text-xs text-text-muted text-center">
                  ← SELECT A NODE<br />to explore connections
                </p>
              </div>
            )}

            {/* Quick legend */}
            <div className="card p-4 space-y-2">
              <p className="font-mono text-xs text-accent mb-3">LEGEND</p>
              {[
                { color: '#00d4ff', label: 'Core Identity' },
                { color: '#ff9900', label: 'AWS Services' },
                { color: '#2496ed', label: 'DevOps / Docker' },
                { color: '#10b981', label: 'Networking / Monitoring' },
                { color: '#7c3aed', label: 'Programming' },
              ].map(({ color, label }) => (
                <div key={label} className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full flex-shrink-0" style={{ backgroundColor: color }} />
                  <span className="font-mono text-xs text-text-muted">{label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
