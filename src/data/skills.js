export const skills = {
  aws: {
    label: 'AWS CLOUD SERVICES',
    icon: '☁️',
    color: '#ff9900',
    items: [
      { name: 'Amazon ECS', usedIn: ['CloudSentinel', 'Bdreams Internship'] },
      { name: 'AWS Fargate', usedIn: ['CloudSentinel', 'Bdreams Internship'] },
      { name: 'Amazon ECR', usedIn: ['CloudSentinel', 'Bdreams Internship'] },
      { name: 'AWS Lambda', usedIn: ['LIFEGRID', 'CloudSentinel'] },
      { name: 'Amazon API Gateway', usedIn: ['LIFEGRID'] },
      { name: 'Amazon DynamoDB', usedIn: ['LIFEGRID'] },
      { name: 'Amazon S3', usedIn: ['Cloud Deployments'] },
      { name: 'Amazon EventBridge', usedIn: ['CloudSentinel', 'LIFEGRID'] },
      { name: 'Amazon CloudWatch', usedIn: ['CloudSentinel', 'LIFEGRID', 'Bdreams Internship'] },
      { name: 'AWS IAM', usedIn: ['LIFEGRID', 'CloudSentinel'] },
      { name: 'VPC & Subnets', usedIn: ['Bdreams Internship', 'CloudSentinel'] },
      { name: 'Security Groups', usedIn: ['Bdreams Internship', 'CloudSentinel'] },
    ],
  },
  devops: {
    label: 'DEVOPS & INFRASTRUCTURE AS CODE',
    icon: '⚙️',
    color: '#00d4ff',
    items: [
      { name: 'Docker', usedIn: ['CloudSentinel', 'Bdreams Internship'] },
      { name: 'AWS CLI', usedIn: ['CloudSentinel', 'Bdreams Internship'] },
      { name: 'AWS SAM', usedIn: ['LIFEGRID'] },
      { name: 'AWS CloudFormation', usedIn: ['LIFEGRID'] },
      { name: 'Git', usedIn: ['CloudSentinel', 'LIFEGRID', 'All Projects'] },
      { name: 'GitHub', usedIn: ['CloudSentinel', 'LIFEGRID', 'All Projects'] },
      { name: 'CI/CD Fundamentals', usedIn: ['Cloud Deployments'] },
    ],
  },
  programming: {
    label: 'PROGRAMMING & BACKEND',
    icon: '🐍',
    color: '#3776ab',
    items: [
      { name: 'Python', usedIn: ['CloudSentinel', 'LIFEGRID', 'Bdreams Internship'] },
      { name: 'FastAPI', usedIn: ['CloudSentinel', 'LIFEGRID', 'Bdreams Internship'] },
      { name: 'REST APIs', usedIn: ['CloudSentinel', 'LIFEGRID'] },
    ],
  },
  frontend: {
    label: 'FRONTEND',
    icon: '⚛️',
    color: '#61dafb',
    items: [
      { name: 'React', usedIn: ['LIFEGRID', 'Developer Portfolio'] },
    ],
  },
  networking: {
    label: 'NETWORKING & OPERATING SYSTEMS',
    icon: '🌐',
    color: '#10b981',
    items: [
      { name: 'Networking Fundamentals', usedIn: ['CCNA', 'AWS VPC'] },
      { name: 'Linux Fundamentals', usedIn: ['Docker Containers', 'CloudSentinel'] },
      { name: 'CCNA Networking Concepts', usedIn: ['CCNA Certification'] },
    ],
  },
};
