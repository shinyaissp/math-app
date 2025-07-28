import React from 'react'
import { BlockMath } from 'react-katex'
import 'katex/dist/katex.min.css'
import styles from './AnswerButton.module.css'
import answers from '../constants/answers' // answersは配列

export default function AnswerButtons({ onSelect, disabled = false }) {
  return (
    <div className={styles.container}>
      {answers.map(({ id, latex }) => (
        <button
          key={id}
          onClick={() => onSelect(id)}
          className={`${styles.button} ${disabled ? styles.disabled : ''}`} // 任意で無効時クラス追加
          type="button"
          disabled={disabled} // ここで無効化
        >
          <BlockMath math={latex} />
        </button>
      ))}
    </div>
  )
}
