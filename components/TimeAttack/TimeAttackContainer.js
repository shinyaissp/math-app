'use client'

import CountdownDisplay from './CountdownDisplay'
import { motion } from 'framer-motion'
import styles from './TimeAttackContainer.module.css'

export default function TimeAttackContainer({ children, title, stepIndex, countdownSteps, countdownFinished, isFinished }) {
  return (
    <div className={styles.container}>
      <div className={styles.title}>{title}タイムアタック</div>
      <div className={styles.questionBox}>
        <div className={styles.content}>
          {!countdownFinished ? (
            <CountdownDisplay className={styles.startFinish} stepIndex={stepIndex} countdownSteps={countdownSteps} />
          ) : isFinished ? (
            <motion.div
              className={styles.startFinish}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >FINISH!</motion.div>
          ) : (
            <div>{children}</div>
          )}
        </div>
      </div>
    </div>
  )
}

