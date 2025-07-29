import React from 'react';
import styles from './QuizButton.module.css';

export default function QuizButton({
  i,
  currentQuestionIndex,
  selected,
  forksSelected,
  treasuresSelected,
  forksRevealed,
  treasuresRevealed,
  correct,
  fairyCount,
  treasuresFinalChoice,
  children,
  onClick,
  }) {
    
  const isforksSelected = (i === forksSelected || i === selected);
  const istreasuresSelected = i === treasuresSelected;
  const isforksRevealed = i === forksRevealed;
  const istreasuresRevealed = i === treasuresRevealed[0] || i === treasuresRevealed[1];
  const istreasuresFinalChoice = (i === treasuresFinalChoice );
  const fairyUsed = fairyCount === 0 && treasuresFinalChoice === null;

  function getButtonClassName() {
    if (currentQuestionIndex !== 3 ) {
      // 一問目、二問目、三問目
      if (isforksSelected) return styles.buttonSelected;
      if (isforksRevealed) return styles.buttonRevealed;
      if (forksSelected !== null || selected !== null) return styles.buttonBased;
      return styles.buttonDefault;
    } else {
      // 四問目
      if (correct){
        if (istreasuresSelected) return styles.buttonSelected;
        if (istreasuresRevealed) return styles.buttonRevealed;
        if (treasuresSelected !== null || fairyUsed) return styles.buttonBased;
        return styles.buttonDefault;
      } else {
        if (istreasuresFinalChoice) return styles.buttonSelected;
        if (treasuresSelected !== null || treasuresFinalChoice !== null) return styles.buttonBased;
        return styles.buttonDefault;
      }
    }
  }

  return (
    <button
      className={getButtonClassName()}
      onClick={onClick}
    >
      {children}
    </button>
  );
}