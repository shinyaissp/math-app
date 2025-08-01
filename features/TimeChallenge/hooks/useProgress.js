import { useEffect, useRef, useState } from 'react';

export function useProgress(duration, onFinish, isRunning = false, resetFlag = 0) {
  const [progress, setProgress] = useState(1);
  const intervalRef = useRef(null);
  const startRef = useRef(null);

  useEffect(() => {
    if (!isRunning) return;
    if (!startRef.current) {
      startRef.current = Date.now();
    }

    intervalRef.current = setInterval(() => {
      const elapsed = Date.now() - startRef.current;
      const p = Math.max(1 - elapsed / duration, 0);
      setProgress(p);

      if (p <= 0) {
        clearInterval(intervalRef.current);
        if (onFinish) onFinish();
      }
    }, 1000 / 60);

    return () => clearInterval(intervalRef.current);
  }, [isRunning, duration, onFinish]);

  useEffect(() => {
    setProgress(1);
    startRef.current = null;
  }, [resetFlag]);

  return progress;
}
