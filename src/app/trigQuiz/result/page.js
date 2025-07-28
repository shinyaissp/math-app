'use client';

import React from 'react';
import { useTrigQuizContext } from '../contexts/TrigQuizContext';
import { useRouter } from 'next/navigation'
import styles from './page.module.css';
import DefaultButton from '@/components/Button/DefaultButton';
import { BlockMath } from 'react-katex'
import answers from '../constants/answers';

export default function Page() {
  const router = useRouter()
  const { results } = useTrigQuizContext();
  const getLatexById = (id) => {
    const ans = answers.find(a => a.id === id);
    return ans ? ans.latex : id;
  };

  const correctCount = results.filter(r => r.isCorrect).length;

  return (
    <div className={styles.container}>
      <h1>結果発表</h1>
      <p>正解数: {correctCount} / {results.length}</p>

      <table className={styles.table}>
        <thead>
          <tr>
            <th>#</th>
            <th>問題</th>
            <th>あなたの答え</th>
            <th>正解</th>
            <th>判定</th>
          </tr>
        </thead>
        <tbody>
          {results.map((r, i) => (
            <tr key={`result-${r.id}-${i}`}>
              <td>{i + 1}</td>
              <td><BlockMath math={r.question} /></td>
              <td><BlockMath math={getLatexById(r.selected)} /></td>
              <td><BlockMath math={getLatexById(r.correct)} /></td>
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
  );
}
