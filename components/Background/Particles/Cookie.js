'use client';
import React from 'react';
import styles from './Cookie.module.css';

export default function Cookie() {
  return (
    <div className={styles.cookie}>
      <span className={`${styles.piece} ${styles.red}`} />
      <span className={`${styles.piece} ${styles.yellow}`} />
      <span className={`${styles.piece} ${styles.green}`} />
      <span className={`${styles.piece} ${styles.blue}`} />
    </div>
  );
}
