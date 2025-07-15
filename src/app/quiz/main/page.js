"use client"; 

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { quizData } from '../quizData';
import GameArea from '../../../../components/GameArea/GameArea';
import QuestionBox from './QuestionBox';
import styles from './page.module.css';
import { ANS_MESSAGES } from '../ansMessages';

function shuffle(array) {
  return array.sort(() => Math.random() - 0.5);
}

export default function Page() {
  const images = ['/mountain.jpg', '/sea.jpg', '/plain.jpg'];
  const [bgIndex, setBgIndex] = useState(0);
  const [forks , setFork] = useState(()=>shuffle([true,false,false]));
  const [selected, setSelected] = useState(null);
  const [revealed, setRevealed] = useState(null);
  const [finalChoice, setFinalChoice] = useState(null);
  const [message, setMessage] = useState('');

  const changeBackground = (index) => {
    setBgIndex(index);
  };

  const handleSelectFork = (index) => {
    if (selected !== null) return;
    setSelected(index);
    const candidates = forks
      .map((val, i) => (!val && i !== index ? i : null))
      .filter((i) => i !== null);
    const revealIndex = candidates[Math.floor(Math.random() * candidates.length)];
    setRevealed(revealIndex);
  };

  const handleFinalChoice = (switchfork) => {
    if (finalChoice !== null) return; // すでに決定済みは無視
    let choice = selected;
    if (switchfork) {
      choice = [0, 1, 2].find(
        (i) => i !== selected && i !== revealed
      );
    }
    setFinalChoice(choice);
    if (forks[choice]) {
      setMessage(ANS_MESSAGES.PERFECT);
    } else {
      setMessage(ANS_MESSAGES.FAIL);
    }
  };



  return (
    <AnimatePresence mode="wait">
      <motion.div key={bgIndex} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.5 }}>
        <GameArea imageUrl={images[bgIndex]}>
          <div className={styles.answereBox}>
            {[0, 1, 2].map((i) => (
              <button
                key={i}
                onClick={() => handleSelectFork(i)}
                disabled={selected !== null && i === revealed} // 司会者が開けたドアは選べない
                style={{
                  backgroundColor:
                    i === revealed
                      ? "lightgray"
                      : i === finalChoice
                      ? "lightgreen"
                      : i === selected
                      ? "lightblue"
                      : "white",
                }}
              >
                {quizData[0].options[i]}
              </button>
            ))}
          </div>

          {/* 「変更する？」を選ぶフェーズ */}
          {selected !== null && revealed !== null && finalChoice === null && (
            <div style={{ marginTop: "1rem" }}>
              <p>ドア {revealed + 1} はハズレでした！ドアを変えますか？</p>
              <button onClick={() => handleFinalChoice(false)}>
                変えない
              </button>
              <button onClick={() => handleFinalChoice(true)}>
                変える
              </button>
            </div>
          )}
          {finalChoice !== null && (
            <div style={{ marginTop: "1rem" }}>
              <h2>{message}</h2>
            </div>
          )}
          <QuestionBox className={styles.questionBox}>
            {quizData[0].question}
          </QuestionBox>
        </GameArea>
      </motion.div>
    </AnimatePresence>
  );
}