'use client';

import React, { useState } from 'react';
import styles from './TimeAttack.module.css';
import { useProgress } from './hooks/useProgress';

export default function TimeAttack({ children, title, duration = 6000 }) {
  const [isRunning, setIsRunning] = useState(false);
  const [isFinished, setIsFinished] = useState(false);

  const handleFinish = () => {
    setIsFinished(true);
    setIsRunning(false); // 終了時に止める
  };

  const handleStart = () => {
    setIsRunning(true);
    setIsFinished(false);
  };

  const handleRetry = () => {
    setIsRunning(false); // フック内でstartRefがnullになって再準備される
    setIsFinished(false);
    // setTimeout で次の useEffect 再発火まで1tick待つと確実（任意）
    setTimeout(() => setIsRunning(true), 0);
  };

  const progress = useProgress(duration, handleFinish, isRunning);

  return (
    <div className={styles.container}>
      <div className={styles.title}>{title}タイムアタック</div>

      <div className={styles.questionBox}>
        {isFinished ? 'FINISH!!' : '問題の中身'}
      </div>

      <div className={styles.barWrapper}>
        <div
          className={styles.barFill}
          style={{ transform: `scaleX(${progress})` }}
        />
      </div>

      {/* スタートボタン */}
      {!isRunning && !isFinished && (
        <button onClick={handleStart} className={styles.startButton}>
          スタート
        </button>
      )}

        <button onClick={handleRetry} className={styles.retryButton}>
          やり直す
        </button>

      {children}
    </div>
  );
}
