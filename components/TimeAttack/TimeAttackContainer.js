'use client'

import CountdownDisplay from './CountdownDisplay'
import styles from './TimeAttackContainer.module.css'

export default function TimeAttackContainer({ children, title, stepIndex, countdownSteps, countdownFinished}) {
  return (
    <div className={styles.container}>
      <div className={styles.title}>{title}タイムアタック</div>
      <div className={styles.questionBox}>
        <div className={styles.content}>
          {!countdownFinished ? (
            <CountdownDisplay stepIndex={stepIndex} countdownSteps={countdownSteps} />
          ): (<div>{children}</div>)
        }
        </div>
      </div>
    </div>
  )
}

