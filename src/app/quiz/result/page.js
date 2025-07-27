'use client';

import React from 'react';
import { useQuizContext } from '../contexts/QuizContext'
import { useFadeNavigate } from '@/hooks/useFadeNavigate';
import { fadeWithLeave } from '@/animation/fade';
import { motion } from 'framer-motion';
import GameArea from '@/components/GameArea/GameArea';
import styles from "./page.module.css";

export default function Page() {
  const { isLeaving, fadeNavigate } = useFadeNavigate(1000);
  const { correctCount } = useQuizContext();

  const corrects = correctCount[0];
  const decisions = correctCount[1];

  const totalCorrect = corrects.filter(Boolean).length;
  const totalDecided = decisions.filter(Boolean).length;

  return (
    <motion.div {...fadeWithLeave(isLeaving)}>
      <GameArea imageUrl="/sea.jpg">
        <div className={styles.title}>RESULT</div>

        <table className={styles.resultTable}>
          <thead>
            <tr>
              <th>問題</th>
              <th>幸運</th>
              <th>知恵</th>
            </tr>
          </thead>
          <tbody>
            {corrects.map((isCorrect, index) => (
              <tr key={index}>
                <td>{index + 1} 問目</td>
                <td>{isCorrect === true ? '○' : '×'}</td>
                <td>{decisions[index] === true ? '✔' : '-'}</td>
              </tr>
            ))}
          </tbody>
          <tfoot>
            <tr>
              <td><strong>合計</strong></td>
              <td><strong>{totalCorrect} / 4</strong></td>
              <td><strong>{totalDecided} / 4</strong></td>
            </tr>
          </tfoot>
        </table>

        <button className={styles.buttonDefault} onClick={() => fadeNavigate('/quiz')}>
          QUIZ TOP
        </button>

        {/* <div className={styles.firework}>
          {[...Array(8)].map((_, i) => (
            <div key={i} className={styles.fireworkLine} style={{ '--i': i }} />
          ))}
        </div> */}
      </GameArea>
    </motion.div>
  );
}
