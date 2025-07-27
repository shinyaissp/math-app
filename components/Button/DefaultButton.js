'use client'

import React from 'react'
import styles from './DefaultButton.module.css'

export default function DefaultButton({ onClick }) {
  return (
    <button onClick={onClick} className={styles.buttonDefault}>
      やり直し
    </button>
  )
}
