'use client'

import React, { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation'
import { useCountdown } from './hooks/useCountdown';
import styles from './TimeAttack.module.css';
import { useProgress } from './hooks/useProgress';
import DefaultButton from '@/components/Button/DefaultButton';

const countdownSteps = ['3', '2', '1', 'Start!'];

export default function TimeAttack({ children, 
    title, 
    duration = 60000, 
    backPath, 
    resultPath,
    problem,
    lastResult,
    correctCount,
    questionNumber,
    onRunningChange,
    onRetry, 
  }) {
  const router = useRouter()
  const [isRunning, setIsRunning] = useState(false);
  const [isFinished, setIsFinished] = useState(false);
  const [resetFlag, setResetFlag] = useState(0);
  const [countdownIndex, setCountdownIndex] = useCountdown(countdownSteps, () => {
    setIsRunning(true);
  });

  useEffect(() => {
    if (onRunningChange) {
      onRunningChange(isRunning);
    }
  }, [isRunning, onRunningChange]);

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

    useEffect(() => {
    handleStart();
  }, [handleStart]);

  const progress = useProgress(duration, handleFinish, isRunning, resetFlag);

  const displayText =
    countdownIndex !== null
      ? countdownSteps[countdownIndex]
      : isFinished
      ? 'FINISH!!'
      : problem || 'Loading...';

  return (
    <div className={styles.container}>
      <div className={styles.title}>{title}タイムアタック</div>
      <div className={styles.questionBox}>{displayText}</div>
      <div className={styles.barWrapper}>
        <div
          className={styles.barFill}
          style={{ transform: `scaleX(${progress})` }}
        />
      </div>
      {children}
      <div className={styles.commentBox}>
        <p className={styles.comment}>正解数: {correctCount} / {questionNumber > 0 ? questionNumber - 1 : '0'}</p>
        {lastResult && (
            <p className={styles.comment}>
              {lastResult.isCorrect ? '正解' : '不正解'}
            </p>
        )}
      </div>
      <div>
        <DefaultButton onClick={() => router.push(backPath)}>
          戻る
        </DefaultButton>
        <DefaultButton onClick={handleRetry}>
          やり直す
        </DefaultButton>
        {isFinished  && (
          <DefaultButton onClick={() => router.push(resultPath)}>
            RESULT
          </DefaultButton>
        )}
      </div>
    </div>
  );
}