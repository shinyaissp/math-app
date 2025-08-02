import React from 'react'
import { BlockMath } from 'react-katex'
import 'katex/dist/katex.min.css'
import styles from './AnswersButton.module.css'
import answers from '../constants/answers'

export default function AnswerButtons({ onSelect, disabled = false }) {
  return (
    <div className={styles.container}>
      {answers.map(({ id, latex }) => (
        <button
          key={id}
          onClick={() => onSelect(id)}
          className={`${styles.button} ${disabled ? styles.disabled : ''}`}
          type="button"
          disabled={disabled}
        >
          <BlockMath math={latex} />
        </button>
      ))}
    </div>
  )
}
