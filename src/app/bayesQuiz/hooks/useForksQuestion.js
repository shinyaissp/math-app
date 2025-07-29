import { useState, useMemo } from "react";
import { useQuizContext } from '../contexts/QuizContext';
import { ANS_MESSAGES } from "../constants/ansMessages";
import { shuffle } from "../utils/shuffle";

export default function useForksQuestion({ setMessage }) {
  const { setCorrectCount } = useQuizContext();
  const forks = useMemo(() => shuffle([true, false, false]), []);
  const [forksSelected, setForksSelected] = useState(null);
  const [forksRevealed, setForksRevealed] = useState(null);
  const [forksFinalChoice, setForksFinalChoice] = useState(null);

  const handleSelectFork = (index) => {
    if (forksSelected !== null) return;
    setForksSelected(index);
    const candidates = forks
      .map((val, i) => (!val && i !== index ? i : null))
      .filter((i) => i !== null);
    const revealIndex = candidates[Math.floor(Math.random() * candidates.length)];
    setForksRevealed(revealIndex);
  };

  const handleForkDecision = (i) => {
    if (forksFinalChoice !== null) return;
    setForksFinalChoice(i);
    if (forks[i]) {
      setCorrectCount((prev) => [
        [...prev[0], true], 
        [...prev[1], i === forksSelected ? false : true]  
      ]);
      setMessage(i === forksSelected ? ANS_MESSAGES.LUCKY : ANS_MESSAGES.PERFECT);
    } else {
      setMessage(i !== forksSelected ? ANS_MESSAGES.UNLUCKY : ANS_MESSAGES.FAIL);
    }
  };

  const resetForks = () => {
    setForksSelected(null);
    setForksRevealed(null);
    setForksFinalChoice(null);
  };

  return {
    forks,
    forksSelected,
    forksRevealed,
    forksFinalChoice,
    handleSelectFork,
    handleForkDecision,
    resetForks,
  };
}
