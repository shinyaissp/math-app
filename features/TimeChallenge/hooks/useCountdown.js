import { useState, useEffect } from 'react';

export function useCountdown(countdownSteps, onFinish) {
  const [countdownIndex, setCountdownIndex] = useState(null);

  useEffect(() => {
    if (countdownIndex === null) return;

    const timer = setTimeout(() => {
      if (countdownIndex < countdownSteps.length - 1) {
        setCountdownIndex((prev) => prev + 1);
      } else {
        setCountdownIndex(null);
        if (typeof onFinish === 'function') {
          onFinish();
        }
      }
    }, 1000);

    return () => clearTimeout(timer);
  }, [countdownIndex, countdownSteps.length, onFinish]);

  return [countdownIndex, setCountdownIndex];
}
