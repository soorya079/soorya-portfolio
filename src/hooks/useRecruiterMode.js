import { useState, useCallback } from 'react';

export function useRecruiterMode() {
  const [isActive, setIsActive] = useState(false);

  const activate = useCallback(() => setIsActive(true), []);
  const deactivate = useCallback(() => setIsActive(false), []);
  const toggle = useCallback(() => setIsActive((v) => !v), []);

  return { isActive, activate, deactivate, toggle };
}
