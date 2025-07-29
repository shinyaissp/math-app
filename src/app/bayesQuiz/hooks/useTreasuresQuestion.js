import { useState, useMemo } from "react";
import { useQuizContext } from '../contexts/QuizContext';
import { ANS_MESSAGES } from "../constants/ansMessages";
import { shuffle } from "../utils/shuffle";

export default function useTreasuresQuestion (setMessage, setFairyCount, fairyCount) {
  const { correctCount, setCorrectCount } = useQuizContext();
  const treasures = useMemo(() => shuffle([true, false, false, false]), []);
  const [treasuresSelected, setTreasuresSelected] = useState(null);
  const [treasuresRevealed, setTreasuresRevealed] = useState([]);
  const [treasuresFinalChoice, setTreasuresFinalChoice] = useState(null);

  const handleSelectTreasure = (index) => {
    if (treasuresSelected !== null) return;
    if (fairyCount == 0) return;
    setTreasuresSelected(index);
  }

  const handleUseFairy = (num) => {
    let candidates = treasures
      .map((val, i) => (!val && i !== treasuresSelected && i !== treasuresRevealed[0] ? i : null))
      .filter((i) => i !== null);
    const revealed = [];
    for (let i = 0; i < num && candidates.length > 0; i++) {
      const randIndex = Math.floor(Math.random() * candidates.length);
      revealed.push(candidates[randIndex]);
      candidates.splice(randIndex, 1); 
    }
    setTreasuresRevealed(prev => [...prev, ...revealed]);
    setFairyCount((prev) => prev - num);
  };

  const handleTreasureDecision = (i) => {
    if (treasuresFinalChoice !== null) return;
    setTreasuresFinalChoice(i);
    if (!correctCount[0][1] || !correctCount[0][2]){
      setCorrectCount((prev) => [
        [...prev[0], treasures[i]],
        [...prev[1], false],
      ]);
      setMessage( treasures[i] ? ANS_MESSAGES.LUCKY : ANS_MESSAGES.UNLUCKY );
    } else if (treasuresSelected === null){
      setCorrectCount((prev) => [
        [...prev[0], treasures[i]],
        [...prev[1], false],
      ]);      
      setMessage( treasures[i] ? ANS_MESSAGES.LUCKY : ANS_MESSAGES.FAIL );
    }  else if (treasures[i]) {
      setCorrectCount((prev) => [
        [...prev[0], treasures[i]],
        [...prev[1], i !== treasuresSelected],
      ]);
      setMessage( i === treasuresSelected ? ANS_MESSAGES.LUCKY : ANS_MESSAGES.PERFECT );
    } else {
      setCorrectCount((prev) => [
        [...prev[0], treasures[i]],
        [...prev[1], i !== treasuresSelected],
      ]);
      setMessage( i === treasuresSelected ? ANS_MESSAGES.FAIL : ANS_MESSAGES.UNLUCKY);
    }

  };
  return {
    treasures,
    treasuresSelected,
    treasuresRevealed,
    treasuresFinalChoice,
    handleSelectTreasure,
    handleUseFairy,
    handleTreasureDecision
  };
}
