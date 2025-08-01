'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useFadeNavigate } from '@/hooks/useFadeNavigate';
import { useTrigQuizContext } from '../contexts/TrigQuizContext';
import { useRouter } from 'next/navigation'
import { fadeWithLeave } from '@/animation/fade';
import styles from './page.module.css';
import DefaultButton from '@/components/Button/DefaultButton';
import { BlockMath } from 'react-katex'
import answers from '../constants/answers';

export default function Page() {
  const router = useRouter()
  const { isLeaving, fadeNavigate } = useFadeNavigate(1000);
  const { results, trialTime } = useTrigQuizContext();
  const getLatexById = (id) => {
    const ans = answers.find(a => a.id === id);
    return ans ? ans.latex : id;
  };
  console.log(results)

  const correctCount = results.filter(r => r.isCorrect).length;

  return (
    <AnimatePresence mode="wait">
      <motion.div {...fadeWithLeave(isLeaving)}>
      <div className={styles.container}>
        <h1>結果</h1>
        <p>正解数: {correctCount} / {results.length}</p>
        {trialTime != null && (
          <p>経過時間: {trialTime.toFixed(2)} 秒</p>
        )}

        <table className={styles.table}>
          <thead>
            <tr>
              <th>#</th>
              <th>問題</th>
              <th>解答</th>
              <th>正解</th>
              <th>判定</th>
            </tr>
          </thead>
          <tbody>
            {results.map((r, i) => (
              <tr key={`result-${r.id}-${i}`}>
                <td>{i + 1}</td>
                <td><BlockMath math={r.question} /></td>
                <td><BlockMath math={getLatexById(r.selectedAnswerId)} /></td>
                <td><BlockMath math={getLatexById(r.correctAnswerId)} /></td>
                <td>{r.isCorrect ? '〇' : '×'}</td>
              </tr>
            ))}
          </tbody>
        </table>

        <div style={{ marginTop: '1rem' }}>
          <DefaultButton onClick={() => router.push('/trigQuiz')}>
            戻る
          </DefaultButton>
        </div>
      </div>
    </motion.div>
  </AnimatePresence>
  );
}
