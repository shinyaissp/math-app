"use client";

import React, { useState,useEffect } from "react";
import { useQuizContext } from '../contexts/QuizContext';
import { useFadeNavigate } from '@/hooks/useFadeNavigate';
import { fadeWithLeave } from '@/animation/fade';
import { useIsMobile } from "@/hooks/useIsMobile";
import { motion, AnimatePresence } from "framer-motion";
import { quizData } from "../constants/quizData";
import GameArea from "@/components/GameArea/GameArea";
import useForksQuestion from "../hooks/useForksQuestion";
import useNomalQuestion from "../hooks/useNomalQuestion";
import useTreasuresQuestion from "../hooks/useTreasuresQuestion";
import QuestionBox from "../components/QuestionBox";
import QuizButton from "../components/QuizButton";
import styles from "./page.module.css";
import AdditionalQuizButton from "../components/AdditionalQuizButton";

const images = ["/cave.jpg", "/plain.jpg", "/mountain.jpg", "/sea.jpg"];

export default function Page() {
  const { correctCount, setCorrectCount } = useQuizContext();
  const { isLeaving, fadeNavigate } = useFadeNavigate(1000);
  const isMobile = useIsMobile();
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const currentQuiz = quizData[currentQuestionIndex];
  const [message, setMessage] = useState("");
  const [bgIndex, setBgIndex] = useState(0);
  const [fairyCount, setFairyCount] = useState(0);

  useEffect(() => {
    setCorrectCount([[], []]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // 一問目 useForksQuestion
  const { 
    forks,forksSelected,forksRevealed,forksFinalChoice, 
    handleSelectFork,handleForkDecision, resetForks,
  } = useForksQuestion({ setMessage});
  // 二,三問目 useNomalQuestion
  const {
    selected, 
    handleSelect, resetSelected,
  } = useNomalQuestion({ setMessage, setFairyCount, currentQuestionIndex});
  // 四問目 useTreasuresQuestion
  const {
    treasures, treasuresSelected, treasuresRevealed,treasuresFinalChoice,
    handleSelectTreasure, handleUseFairy, handleTreasureDecision
  } = useTreasuresQuestion(setMessage, setFairyCount, fairyCount);

// 次の問題への処理
  const nextQuestion = () => {
    setCurrentQuestionIndex((prev) => (prev + 1) % quizData.length);
    resetGame();
    setBgIndex((prev) => (prev + 1) % images.length);
  };

  const resetGame = () => {
    resetForks();
    resetSelected();
    setMessage("");
  };

  return (
    <AnimatePresence mode="wait">
      <motion.div key={bgIndex} {...fadeWithLeave(isLeaving)}>
        <GameArea imageUrl={images[bgIndex]}>
          {isMobile ? (
            <div className={styles.questionNumberBoxWrapper}>
              <div className={styles.questionNumberBox_sm}>
                第 {currentQuestionIndex + 1} 問
              </div>
              <div className={styles.statusBox_sm}>
                {`幸運： ${correctCount[0].filter(Boolean).length}`}<br />
                {`知恵： ${correctCount[1].filter(Boolean).length}`}<br />
                {`妖精： ${fairyCount}`}
              </div>
            </div>
          ) : (
          <>
            <div className={styles.questionNumberBox}>
              第 {currentQuestionIndex + 1} 問
            </div>
            <div className={styles.statusBox}>
              {`幸運： ${correctCount[0].filter(Boolean).length}`}<br />
              {`知恵： ${correctCount[1].filter(Boolean).length}`}<br />
              {`妖精： ${fairyCount}`}
            </div>
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
                  correct={(correctCount[0][1] || correctCount[0][2])}
                  fairyCount={fairyCount}
                  treasuresFinalChoice={treasuresFinalChoice}
                  onClick={() => {
                    if (currentQuestionIndex === 0) {
                      // 一問目
                      handleSelectFork(i);
                    } else if (currentQuestionIndex === 1 || currentQuestionIndex === 2) {
                      // 二問目・三問目
                      handleSelect(i);
                    } else if (currentQuestionIndex === 3) {
                      // 四問目
                      if (!correctCount[0][1] && !correctCount[0][2]) {
                        handleTreasureDecision(i);
                      } else {
                        handleSelectTreasure(i);
                      }
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
                <p>{currentQuiz.options[forksRevealed]} の道が塞がれた。選び直しますか？</p>
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

            {currentQuestionIndex === 3 && fairyCount == 0 && treasuresFinalChoice === null && (correctCount[0][1] || correctCount[0][2]) && (
              <motion.div className={styles.fairySelect} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, ease: "easeOut" }}>
                <p>最終的にどれを選びますか？</p>
                <div className={styles.buttonGroup}>
                  {treasures.map((_, i) => (!treasuresRevealed.includes(i) && (
                      <AdditionalQuizButton key={i} onClick={() => handleTreasureDecision(i)}
                      >
                      {`宝箱 ${["A", "B", "C", "D"][i]}`}
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
                    <button className={styles.buttonDefault} onClick={() => fadeNavigate('/bayesQuiz/result')}>RESULT</button>
                  )}
                </div>
              </motion.div>
            )}
            <QuestionBox className={styles.questionBox}>
              {currentQuiz.question.split('\n').map((line, index) => (
                <React.Fragment key={index}>
                  {line}
                  <br />
                </React.Fragment>
              ))}
            </QuestionBox>
          </>
          )}
        </GameArea>
          {isMobile && (
            <>
            <QuestionBox className={styles.questionBox}>
              {currentQuiz.question.split('\n').map((line, index) => (
                <React.Fragment key={index}>
                  {line}
                  <br />
                </React.Fragment>
              ))}
            </QuestionBox>
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
                  correct={(correctCount[0][1] || correctCount[0][2])}
                  fairyCount={fairyCount}
                  treasuresFinalChoice={treasuresFinalChoice}
                  onClick={() => {
                    if (currentQuestionIndex === 0) {
                      // 一問目
                      handleSelectFork(i);
                    } else if (currentQuestionIndex === 1 || currentQuestionIndex === 2) {
                      // 二問目・三問目
                      handleSelect(i);
                    } else if (currentQuestionIndex === 3) {
                      // 四問目
                      if (!correctCount[0][1] && !correctCount[0][2]) {
                        handleTreasureDecision(i);
                      } else {
                        handleSelectTreasure(i);
                      }
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
                <p>{currentQuiz.options[forksRevealed]} の道が塞がれた。選び直しますか？</p>
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

            {currentQuestionIndex === 3 && fairyCount == 0 && treasuresFinalChoice === null && (correctCount[0][1] || correctCount[0][2]) && (
              <motion.div className={styles.fairySelect} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, ease: "easeOut" }}>
                <p>最終的にどれを選びますか？</p>
                <div className={styles.buttonGroup}>
                  {treasures.map((_, i) => (!treasuresRevealed.includes(i) && (
                      <AdditionalQuizButton key={i} onClick={() => handleTreasureDecision(i)}
                      >
                      {`宝箱 ${["A", "B", "C", "D"][i]}`}
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
                    <button className={styles.buttonDefault} onClick={() => fadeNavigate('/bayesQuiz/result')}>RESULT</button>
                  )}
                </div>
              </motion.div>
            )}
          </>
          )}
      </motion.div>
    </AnimatePresence>
  );
}