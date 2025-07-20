"use client";

import React, { useState, useMemo } from "react";
import { useFadeNavigate } from '@/hooks/useFadeNavigate';
import { motion, AnimatePresence } from "framer-motion";
import { quizData } from "../constants/quizData";
import { ANS_MESSAGES } from "../constants/ansMessages";
import { shuffle } from "../utils/shuffle";
import GameArea from "@/components/GameArea/GameArea";
import QuestionBox from "../components/QuestionBox";
import QuizButton from "../components/QuizButton";
import styles from "./page.module.css";
import AdditionalQuizButton from "../components/AdditionalQuizButton";

const images = ["/sea.jpg", "/sea.jpg", "/mountain.jpg", "/sea.jpg"];

export default function Page() {
  const { isLeaving, fadeNavigate } = useFadeNavigate(1000);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const currentQuiz = quizData[currentQuestionIndex];
  const [message, setMessage] = useState("");
  const [bgIndex, setBgIndex] = useState(0);
  // 一問目
  const forks = useMemo(() => shuffle([true, false, false]), []);
  const [forksSelected, setForksSelected] = useState(null);
  const [forksRevealed, setForksRevealed] = useState(null);
  const [forksFinalChoice, setForksFinalChoice] = useState(null);
  // 二,三問目
  const [selected, setSelected] = useState(null);
  // 四問目
  const treasures = useMemo(() => shuffle([true, false, false, false]), []);
  const [treasuresSelected, setTreasuresSelected] = useState(null);
  const [treasuresRevealed, setTreasuresRevealed] = useState([]);
  const [treasuresFinalChoice, setTreasuresFinalChoice] = useState(null);
  // 妖精ゲット数
  const [fairyCount, setFairyCount] = useState(0);
  // 正解数カウント
  const [correct, setCorrect] = useState([]);
  // 判断カウント
  const [decision, setDecision] = useState([]);

  // 一問目の処理
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
    setCorrect((prev) => [...prev, true]);
    setDecision( i === forksSelected ? (prev) => [...prev, false] : (prev) => [...prev, true] );
    setMessage( i === forksSelected ? ANS_MESSAGES.LUCKY : ANS_MESSAGES.PERFECT );
  } else {
    setMessage( i !== forksSelected ? ANS_MESSAGES.UNLUCKY : ANS_MESSAGES.FAIL);
  }
};

  // 二,三問目の処理（A:1/3、B:1/2の確率で正解）
  const handleSelect = (index) => {
    if (selected !== null) return;
    setSelected(index);
    let isCorrect = false;
    if (index === 0) {
      isCorrect = Math.random() < 1;
      setMessage(isCorrect ? ANS_MESSAGES.LUCKY : ANS_MESSAGES.FAIL);
      setDecision((prev) => [...prev, false]);
      setCorrect(isCorrect ? (prev) => [...prev, true] : (prev) => [...prev, false]);
    } else if (index === 1) {
      isCorrect = Math.random() < 1;
      setMessage(isCorrect ? ANS_MESSAGES.PERFECT : ANS_MESSAGES.UNLUCKY);
      setDecision((prev) => [...prev, true]);
      setCorrect(isCorrect ? (prev) => [...prev, true] : (prev) => [...prev, false]);
    }
    if (isCorrect) {
      setFairyCount((prev) => prev + 1);
    }
  };

  //四問目の処理  
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
    if (treasures[i]) {
      setMessage( i === treasuresSelected ? ANS_MESSAGES.LUCKY : ANS_MESSAGES.PERFECT );
    } else {
      setMessage( i !== treasuresSelected ? ANS_MESSAGES.UNLUCKY : ANS_MESSAGES.FAIL);
    }
  };

  const nextQuestion = () => {
    setCurrentQuestionIndex((prev) => (prev + 1) % quizData.length);
    resetGame();
    setBgIndex((prev) => (prev + 1) % images.length);
  };

  const resetGame = () => {
    setForksSelected(null);
    setForksRevealed(null);
    setForksFinalChoice(null);
    setSelected(null);
    setMessage("");
  };

  return (
    <AnimatePresence mode="wait">
      <motion.div 
        key={bgIndex}
        initial={{ opacity: 0 }}
        animate={isLeaving ? { opacity: 0 } : { opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 1 }}
      >
        <div style={{ position: 'absolute', top: 20, right: 30, zIndex: 10, fontWeight: 'bold', fontSize: '1.2rem', background: 'rgba(255, 255, 255, 0.36)', padding: '8px 16px', borderRadius: '16px' }}>
          妖精: {fairyCount}
        </div>
        <GameArea imageUrl={images[bgIndex]}>
          {/* 選択肢 */}
          <div className={styles.answereBox}>
            {currentQuiz.options.map((option, i) => (
              <QuizButton
                key={i}
                i={i}
                currentQuestionIndex={currentQuestionIndex}
                selected={selected}
                forksSelected={forksSelected}
                treasuresSelected={treasuresSelected}
                forksRevealed={forksRevealed}
                treasuresRevealed={treasuresRevealed}
                correct={(correct[1] || correct[2])}
                fairyCount={fairyCount}
                treasuresFinalChoice={treasuresFinalChoice}
                onClick={() => {
                  if (currentQuestionIndex === 1 || currentQuestionIndex === 2) {
                    // 二三問目
                    handleSelect(i);
                  } else if (currentQuestionIndex === 3) {
                    // 四問目
                    if (!correct[1] && !correct[2]) {
                      handleTreasureDecision(i);
                    }else {
                      handleSelectTreasure(i);
                    }
                  } else {
                    // 一問目
                    handleSelectFork(i);
                  }
                }}
              >
                {option}
              </QuizButton>
            ))}
          </div>

          {/* 一問目の小道選択 */}
          {forksSelected !== null && forksRevealed !== null && forksFinalChoice === null && currentQuestionIndex !== 1 && (
            <motion.div className={styles.additionalSelect} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, ease: "easeOut" }}>
              <p>{currentQuiz.options[forksRevealed]} の道が落盤で塞がれた。選び直しますか？</p>
              <div className={styles.buttonGroup}>
                {[0, 1, 2].map((i) =>
                  i !== forksRevealed && (
                    <AdditionalQuizButton
                      key={i}
                      color="rgba(184, 184, 184, 0.5)"
                      onClick={() => handleForkDecision(i)}
                    >
                      {currentQuiz.options[i]}
                    </AdditionalQuizButton>
                  )
                )}
              </div>
            </motion.div>
          )}

          {/* 四問目で妖精使用選択肢 */}
          {currentQuestionIndex === 3 && fairyCount > 0 && (
            <div className={styles.fairySelect}>
              <p>妖精に出動要請をしますか？</p>
              <div className={styles.buttonGroup}>
                {[...Array(fairyCount)].map((_, i) => (
                  <AdditionalQuizButton key={i+1} color="rgba(184, 184, 184, 0.5)"  onClick={() => handleUseFairy(i+1)}>
                    {i+1}匹出動
                  </AdditionalQuizButton>
                ))}
              </div>
            </div>
          )}

          {currentQuestionIndex === 3 && fairyCount == 0 && treasuresFinalChoice === null && (correct[1] || correct[2]) && (
            <motion.div className={styles.fairySelect} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, ease: "easeOut" }}>
              <p>最終的にどれを選びますか？</p>
              <div className={styles.buttonGroup}>
                {treasures.map((_, i) => (!treasuresRevealed.includes(i) && (
                    <AdditionalQuizButton key={i} onClick={() => handleTreasureDecision(i)}
                    >
                      {`選択肢 ${i + 1}`}
                    </AdditionalQuizButton>
                  )
                ))}
              </div>
            </motion.div>
          )}
          {/* メッセージと次のステップ */}
          {(forksFinalChoice !== null || selected !== null || treasuresFinalChoice !== null) && (
            <motion.div className={styles.message} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, ease: "easeOut" }}>
              <h2>{message}</h2>
              <div style={{ textAlign: 'center'}}>
                {currentQuestionIndex === 0 && (
                  forksFinalChoice !== null && forks[forksFinalChoice] ? (
                    <AdditionalQuizButton onClick={nextQuestion}>次の問題へ</AdditionalQuizButton>
                  ) : (
                    <AdditionalQuizButton onClick={resetGame}>やり直す</AdditionalQuizButton>
                  )
                )}
                {(currentQuestionIndex === 1 || currentQuestionIndex === 2)  && (
                  <AdditionalQuizButton onClick={nextQuestion}>次の問題へ</AdditionalQuizButton>
                )}
                {currentQuestionIndex === 3 && (
                  <button onClick={() => fadeNavigate('/quiz/result')}>RESULT</button>
                )}
              </div>
            </motion.div>
          )}
          <QuestionBox className={styles.questionBox}>
            {currentQuiz.question}<br />
            {`上手くいった数： ${correct.filter(Boolean).length}`}<br />
            {`正しい判断： ${decision.filter(Boolean).length}`}
          </QuestionBox>
        </GameArea>
      </motion.div>
    </AnimatePresence>
  );
}