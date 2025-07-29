import { useState } from "react";
import { useQuizContext } from '../contexts/QuizContext';
import { ANS_MESSAGES } from "../constants/ansMessages"; 

export default function useNomalQuestion ({ setMessage,setFairyCount,currentQuestionIndex }) {
  const { setCorrectCount } = useQuizContext();
  const [selected, setSelected] = useState(null);
  const handleSelect = (index) => {
  if (selected !== null) return;
  setSelected(index);
  let isCorrect = false;

  if (index === 0) {
    if (currentQuestionIndex ===1){
      isCorrect = Math.random() < 0.33;
    } else {
      isCorrect = Math.random() < 0.4;
    }    
    setMessage(isCorrect ? ANS_MESSAGES.LUCKY : ANS_MESSAGES.FAIL);
    setCorrectCount((prev) => [
      [...prev[0], isCorrect],
      [...prev[1], false],
    ]);
  } else if (index === 1) {
    if (currentQuestionIndex ===1){
      isCorrect = Math.random() < 0.5;
    } else {
      isCorrect = Math.random() < 0.5;
    }
    setMessage(isCorrect ? ANS_MESSAGES.PERFECT : ANS_MESSAGES.UNLUCKY);
    setCorrectCount((prev) => [
      [...prev[0], isCorrect],
      [...prev[1], true],
    ]);
  }

  if (isCorrect) {
    setFairyCount((prev) => prev + 1);
    }
  };

  const resetSelected = () => {
    setSelected(null);
  };
  return {
    selected,
    handleSelect,
    resetSelected
  };
}