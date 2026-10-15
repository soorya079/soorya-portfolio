import { useState } from 'react';
import Navigation from '@/components/Navigation';
import RecruiterMode from '@/components/RecruiterMode';
import HeroSection from '@/sections/HeroSection';
import SystemMapSection from '@/sections/SystemMapSection';
import ProofOfWorkSection from '@/sections/ProofOfWorkSection';
import SkillMatrixSection from '@/sections/SkillMatrixSection';
import CloudSentinelCaseStudy from '@/sections/CloudSentinelCaseStudy';
import IncidentRoomSection from '@/sections/IncidentRoomSection';
import JourneySection from '@/sections/JourneySection';
import ProjectLabSection from '@/sections/ProjectLabSection';
import EngineeringJournalSection from '@/sections/EngineeringJournalSection';
import ExperienceSection from '@/sections/ExperienceSection';
import CertificationsSection from '@/sections/CertificationsSection';
import ContactSection from '@/sections/ContactSection';

export default function App() {
  const [recruiterMode, setRecruiterMode] = useState(false);

  return (
    <>
      <Navigation onRecruiterMode={() => setRecruiterMode(true)} />
      <main>
        <HeroSection />
        <SystemMapSection />
        <ProofOfWorkSection />
        <SkillMatrixSection />
        <CloudSentinelCaseStudy />
        <IncidentRoomSection />
        <JourneySection />
        <ProjectLabSection />
        <EngineeringJournalSection />
        <ExperienceSection />
        <CertificationsSection />
        <ContactSection />
      </main>

      {recruiterMode && <RecruiterMode onClose={() => setRecruiterMode(false)} />}
    </>
  );
}