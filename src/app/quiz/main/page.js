"use client"; 

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { quizData } from '../quizData';
import Link from 'next/link'
import GameArea from '../../../../components/GameArea/GameArea'
import QuestionBox from './QuestionBox';
import styles from './page.module.css';

export default function Page() {
  const images = ['/mountain.jpg', '/sea.jpg', '/plain.jpg'];
  const [bgIndex, setBgIndex] = useState(0);

  const changeBackground = (index) => {
    setBgIndex(index);
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
        <GameArea imageUrl={images[bgIndex]}>
          <div className={styles.header}>
            <Link href="../quiz">HOME </Link>
            <button onClick={() => changeBackground(0)}>山</button>
            <button onClick={() => changeBackground(1)}>海</button>
            <button onClick={() => changeBackground(2)}>平原</button>
          </div>
          <div className={styles.answereBox}>
            <button onClick={() => changeBackground(0)}>{quizData[0].options[0]}</button>
            <button onClick={() => changeBackground(1)}>{quizData[0].options[1]}</button>
            <button onClick={() => changeBackground(2)}>{quizData[0].options[2]}</button>
          </div>
          <QuestionBox className={styles.questionBox}>
            {quizData[0].question}
          </QuestionBox>
        </GameArea>
      </motion.div>
    </AnimatePresence>
  );
}