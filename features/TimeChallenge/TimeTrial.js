'use client'

import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useCountdown } from './hooks/useCountdown'
import { useTimeController } from './hooks/useTimeController'
import styles from './TimeTrial.module.css'
import DefaultButton from '@/components/Button/DefaultButton'
import { motion } from 'framer-motion'
import CountdownDisplay from './components/CountdownDisplay'

const countdownSteps = ['3', '2', '1', 'Start!']

export default function TimeTrial({ 
  children,
  title,
  backPath,
  resultPath,
  problem,
  lastResult,
  correctCount,
  onRunningChange,
  onRetry,
  totalCount,
  answeredCount,
}) {
  const router = useRouter()
  const remaining = totalCount - answeredCount

  const [startTime, setStartTime] = useState(null)
  const [elapsedTime, setElapsedTime] = useState(0)
  const [endTime, setEndTime] = useState(null)

  const [countdownIndex, setCountdownIndex] = useCountdown(countdownSteps, () => {
    const now = Date.now()
    setStartTime(now)
    setElapsedTime(0)
    setIsRunning(true)
  })

  const {
    isRunning,
    isFinished,
    resetFlag,
    handleStart,
    handleFinish,
    handleRetry,
    setIsRunning,
  } = useTimeController(setCountdownIndex, onRetry)

  // onRunningChange へ isRunning 状態を伝える
  useEffect(() => {
    if (onRunningChange) {
      onRunningChange(isRunning)
    }
  }, [isRunning, onRunningChange])

  // 初回マウントでカウントダウン開始
  useEffect(() => {
    handleStart()
  }, [handleStart])

  // 全問回答で終了判定
  useEffect(() => {
    if (remaining === 0 && isRunning && !isFinished) {
      setEndTime(Date.now())
      handleFinish()
    }
  }, [remaining, isRunning, isFinished, handleFinish])

  // タイマー処理（10ms間隔で elapsedTime 更新）
  useEffect(() => {
    let interval = null

    if (isRunning && startTime !== null) {
      interval = setInterval(() => {
        setElapsedTime(Date.now() - startTime)
      }, 10)
    }

    return () => {
      if (interval) clearInterval(interval)
    }
  }, [isRunning, startTime])

  // リセット時に時間関連stateをクリア
  useEffect(() => {
    if (resetFlag) {
      setStartTime(null)
      setEndTime(null)
      setElapsedTime(0)
    }
  }, [resetFlag])

  const displayTime = (endTime && startTime)
    ? ((endTime - startTime) / 1000).toFixed(2)
    : (elapsedTime / 1000).toFixed(2)

  return (
    <div className={styles.container}>
      <div className={styles.title}>{title}タイムトライアル</div>

      <div className={styles.questionBox}>
        <CountdownDisplay
          countdownIndex={countdownIndex}
          countdownSteps={countdownSteps}
          isFinished={isFinished}
          problem={problem}
        />
      </div>

      <div className={styles.timer}>
        経過時間: {displayTime} 秒
      </div>

      <div className={styles.progressBarContainer}>
        <motion.div
          className={styles.progressBar}
          style={{ width: `${(answeredCount / totalCount) * 100}%` }}
        />
      </div>

      <div className={styles.commentBox}>
        {lastResult && (
          <p className={styles.comment}>
            {lastResult.isCorrect ? '正解' : '不正解'}
          </p>
        )}
        <div className={styles.remaining}>
          残り: {remaining} / {totalCount} 正解数: {correctCount} / {totalCount}
        </div>
      </div>

      {children}

      <div>
        <DefaultButton onClick={() => router.push(backPath)}>戻る</DefaultButton>
        <DefaultButton onClick={handleRetry}>やり直す</DefaultButton>
        {isFinished && (
          <DefaultButton onClick={() => router.push(resultPath)}>RESULT</DefaultButton>
        )}
      </div>
    </div>
  )
}
