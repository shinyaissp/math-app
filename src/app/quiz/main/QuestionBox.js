import React from 'react'
import styles from './QuestionBox.module.css';

export default function QuestionBox( {children} ) {
  return (
    <div className={styles.questionBox}>
      {children}
      <span aria-hidden="true"></span>
    </div>
  )
}

