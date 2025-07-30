import { motion } from 'framer-motion'

export default function CountdownDisplay({ stepIndex, countdownSteps, className }) {
  return (
    <motion.div
      key={stepIndex}
      className={className}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      {countdownSteps[stepIndex]}
    </motion.div>
  )
}
