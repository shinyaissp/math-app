"use client";

import React, { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { quizData } from "../constants/quizData";
import { ANS_MESSAGES } from "../constants/ansMessages";
import { shuffle } from "../utils/shuffle";
import { getButtonStyle } from "../utils/getButtonStyle";
import GameArea from "../../../../components/GameArea/GameArea";
import QuestionBox from "../components/QuestionBox";
import QuizButton from "../components/QuizButton";
import styles from "./page.module.css";

const images = ["/mountain.jpg", "/sea.jpg", "/fish.png", "/plain.jpg"];

export default function Page() {
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

  const handleForkDecision = (switchfork) => {
    if (forksFinalChoice !== null) return;
    const fork = switchfork
      ? [0, 1, 2].find((i) => i !== forksSelected && i !== forksRevealed)
      : forksSelected;
    setForksFinalChoice(fork);
    if (forks[fork]) {
      setMessage(switchfork ? ANS_MESSAGES.PERFECT : ANS_MESSAGES.LUCKY);
    } else {
      setMessage(switchfork ? ANS_MESSAGES.UNLUCKY : ANS_MESSAGES.FAIL);
    }
  };

  // 二,三問目の処理（A:1/3、B:1/2の確率で正解）
  const handleSelect = (index) => {
    if (selected !== null) return;
    setSelected(index);
    let isCorrect = false;
    if (index === 0) {
      isCorrect = Math.random() < 1;
    } else if (index === 1) {
      isCorrect = Math.random() < 1;
    }
    setMessage(isCorrect ? ANS_MESSAGES.PERFECT : ANS_MESSAGES.FAIL);
    if (isCorrect) {
      setFairyCount((prev) => prev + 1);
    }
  };

  //四問目の処理  
  const handleSelectTreasure = (index) => {
    if (treasuresSelected !== null) return;
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

    const handleTreasureDecision = () => {
      if (forksFinalChoice !== null) return;

      setForksFinalChoice(fork);
      if (forks[fork]) {
        setMessage(switchfork ? ANS_MESSAGES.PERFECT : ANS_MESSAGES.LUCKY);
      } else {
        setMessage(switchfork ? ANS_MESSAGES.UNLUCKY : ANS_MESSAGES.FAIL);
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
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5 }}
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
                onClick={() => {
                  if (currentQuestionIndex === 1 || currentQuestionIndex === 2) {
                    handleSelect(i);
                  } else if (currentQuestionIndex === 3) {
                    handleSelectTreasure(i);
                  } else {
                    handleSelectFork(i);
                  }
                }}
                disabled={(forksSelected !== null && i === forksRevealed)||
                          (treasuresSelected !== null && i === treasuresRevealed[0] && i === treasuresRevealed[1])}
                {...(currentQuestionIndex === 3
                  ? getButtonStyle(i, treasuresSelected, treasuresRevealed[0], treasuresRevealed[1])
                  : getButtonStyle(i, forksSelected, forksRevealed))}
              >
                {option}
              </QuizButton>
            ))}
          </div>

          {/* 一問目の小道選択 */}
          {forksSelected !== null && forksRevealed !== null && forksFinalChoice === null && currentQuestionIndex !== 1 && (
            <div className={styles.additionalSelect}>
              <p>ドア {forksRevealed + 1} はハズレでした！ドアを変えますか？</p>
              <div className={styles.buttonGroup}>
                <QuizButton color="rgba(184, 184, 184, 0.5)" onClick={() => handleForkDecision(false)}>
                  変えない
                </QuizButton>
                <QuizButton color="rgba(184, 184, 184, 0.5)" onClick={() => handleForkDecision(true)}>
                  変える
                </QuizButton>
              </div>
            </div>
          )}

          {/* 四問目で妖精使用選択肢 */}
          {currentQuestionIndex === 3 && fairyCount > 0 && (
            <div className={styles.fairySelect}>
              <p>妖精に出動要請をしますか？</p>
              <div className={styles.buttonGroup}>
                {[...Array(fairyCount)].map((_, i) => (
                  <QuizButton color="rgba(184, 184, 184, 0.5)" key={i+1} onClick={() => handleUseFairy(i+1)}>
                    {i+1}匹出動
                  </QuizButton>
                ))}
              </div>
            </div>
          )}

          {currentQuestionIndex === 3 && fairyCount == 0 && (
            <div className={styles.fairySelect}>
              <p>最終的にどれを選びますか？</p>
            </div>
          )}
          {/* メッセージと次のステップ */}
          {(forksFinalChoice !== null || selected !== null) && (
            <div className={styles.message}>
              <h2>{message}</h2>
              <div style={{ textAlign: 'center'}}>
                {(currentQuestionIndex === 1 || currentQuestionIndex === 2) ? (
                  <QuizButton color="rgba(206, 135, 135, 0.78)" onClick={nextQuestion}>次の問題へ</QuizButton>
                ) : (
                  forks[forksFinalChoice] ? (
                    <QuizButton color="rgba(206, 135, 135, 0.78)" onClick={nextQuestion}>次の問題へ</QuizButton>
                  ) : (
                    <QuizButton color="rgba(184, 184, 184, 0.5)" onClick={resetGame}>やり直す</QuizButton>
                  )
                )}
              </div>
            </div>
          )}

          <QuestionBox className={styles.questionBox}>{currentQuiz.question}</QuestionBox>
        </GameArea>
      </motion.div>
    </AnimatePresence>
  );
}
