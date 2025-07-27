import { motion } from 'framer-motion'
import styles from './CountdownDisplay.module.css'

export default function CountdownDisplay({ stepIndex, countdownSteps }) {
  return (
    <motion.div
      key={stepIndex}
      className={styles.countdown}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      {countdownSteps[stepIndex]}
    </motion.div>
  )
}
