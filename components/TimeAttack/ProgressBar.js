'use client'

import React, { useState, useEffect } from 'react'
import styles from './ProgressBar.module.css'

export default function ProgressBar({ duration = 60000, onFinish }) {
  const [progress, setProgress] = useState(1)

  useEffect(() => {
    const start = Date.now()
    const interval = setInterval(() => {
      const elapsed = Date.now() - start
      const p = Math.max(1 - elapsed / duration, 0)
      setProgress(p)
      if (p <= 0) {
        clearInterval(interval)
        if (onFinish) onFinish()
      }
    }, 1000 / 30)

    return () => clearInterval(interval)
  }, [duration, onFinish])

  return (
    <div className={styles.barWrapper}>
      <div
        className={styles.barFill}
        style={{ transform: `scaleX(${progress})` }}
      />
    </div>
  )
}
