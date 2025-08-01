'use client';

import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useCountdown } from './hooks/useCountdown';
import styles from './TimeAttack.module.css';
import { useTimeController } from './hooks/useTimeController';
import { useProgress } from './hooks/useProgress';
import DefaultButton from '@/components/Button/DefaultButton';
import CountdownDisplay from './components/CountdownDisplay';

const countdownSteps = ['3', '2', '1', 'Start!'];

export default function TimeAttack({
  children,
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
  const router = useRouter();

  const [countdownIndex, setCountdownIndex] = useCountdown(countdownSteps, () => {
    setIsRunning(true);
  });

  const {
    isRunning,
    isFinished,
    resetFlag,
    handleStart,
    handleFinish,
    handleRetry,
    setIsRunning,
  } = useTimeController(setCountdownIndex, onRetry);

  useEffect(() => {
    if (onRunningChange) {
      onRunningChange(isRunning);
    }
  }, [isRunning, onRunningChange]);

  useEffect(() => {
    handleStart();
  }, [handleStart]);

  const progress = useProgress(duration, handleFinish, isRunning, resetFlag);

  return (
    <div className={styles.container}>
      <div className={styles.title}>{title}タイムアタック</div>

      <div className={styles.questionBox}>
        <CountdownDisplay
          countdownIndex={countdownIndex}
          countdownSteps={countdownSteps}
          isFinished={isFinished}
          problem={problem}
        />
      </div>

      <div className={styles.barWrapper}>
        <div
          className={styles.barFill}
          style={{ transform: `scaleX(${progress})` }}
        />
      </div>

      {children}

      <div className={styles.commentBox}>
        <p className={styles.comment}>
          正解数: {correctCount} / {questionNumber > 0 ? questionNumber : '0'}
        </p>
        {lastResult && (
          <p className={styles.comment}>
            {lastResult.isCorrect ? '正解' : '不正解'}
          </p>
        )}
      </div>

      <div>
        <DefaultButton onClick={() => router.push(backPath)}>戻る</DefaultButton>
        <DefaultButton onClick={handleRetry}>やり直す</DefaultButton>
        {isFinished && (
          <DefaultButton onClick={() => router.push(resultPath)}>RESULT</DefaultButton>
        )}
      </div>
    </div>
  );
}
