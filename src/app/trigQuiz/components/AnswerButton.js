import React from 'react'
import { BlockMath } from 'react-katex'
import 'katex/dist/katex.min.css'
import styles from './AnswerButton.module.css'
import answers from '../constants/answers' // answersは配列

export default function AnswerButtons({ onSelect }) {
  return (
    <div className={styles.container}>
      {answers.map(({ id, latex }) => (
        <button
          key={id}
          onClick={() => onSelect(id)}  // idを渡す
          className={styles.button}
          type="button"
        >
          <BlockMath math={latex} />
        </button>
      ))}
    </div>
  )
}
