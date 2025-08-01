import { useState, useCallback } from 'react';

export function useTimeController(setCountdownIndex, onRetry) {
  const [isRunning, setIsRunning] = useState(false);
  const [isFinished, setIsFinished] = useState(false);
  const [resetFlag, setResetFlag] = useState(0);

  const handleStart = useCallback(() => {
    setIsFinished(false);
    setCountdownIndex(0);
  }, [setCountdownIndex]);

  const handleFinish = () => {
    setIsFinished(true);
    setIsRunning(false);
  };

  const handleRetry = () => {
    if (onRetry) onRetry();
    setIsRunning(false);
    setIsFinished(false);
    setCountdownIndex(0);
    setResetFlag((prev) => prev + 1);
  };

  return {
    isRunning,
    isFinished,
    resetFlag,
    handleStart,
    handleFinish,
    handleRetry,
    setIsRunning, 
  };
}
