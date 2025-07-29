import React from 'react';
import styles from './AdditionalQuizButton.module.css';

export default function AdditionalQuizButton({i, children, onClick,}) {
  return (
    <button
      className={styles.baseButton}
      onClick={onClick}
    >
      {children}
    </button>
  );
}