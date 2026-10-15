import { useState, useEffect } from 'react';

const BOOT_KEY = 'cloud-lab-booted';

export function useBootSequence() {
  // Check if user has already seen boot sequence this session
  const hasBooted = typeof window !== 'undefined'
    ? sessionStorage.getItem(BOOT_KEY) === 'true'
    : false;

  const [showBoot, setShowBoot] = useState(!hasBooted);
  const [booting, setBooting] = useState(!hasBooted);

  function completeBoot() {
    sessionStorage.setItem(BOOT_KEY, 'true');
    setBooting(false);
    setTimeout(() => setShowBoot(false), 600);
  }

  function skipBoot() {
    completeBoot();
  }

  return { showBoot, booting, completeBoot, skipBoot };
}
