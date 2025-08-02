'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useFadeNavigate } from '@/hooks/useFadeNavigate';
import { useIsMobile } from '@/hooks/useIsMobile';
import { fadeWithLeave } from '@/animation/fade';
import GameArea from '@/components/GameArea/GameArea';
import styles from './page.module.css';
import DefaultButton from '@/components/Button/DefaultButton';

export default function Page() {
  const { isLeaving, fadeNavigate } = useFadeNavigate(1000);
  const isMobile = useIsMobile();

  const [questionsType, setQuestionsType] = useState('attack');
  const [problemsType, setProblemsType] = useState('deg');
  const [selectedCategories, setSelectedCategories] = useState(['H1']);
  const categories = [
    { id: 'H0', label: '-360° ~ -30°' },
    { id: 'H1', label: '0° ~ 180°' },
    { id: 'H2', label: '210° ~ 360°' },
    { id: 'H3', label: '390° ~ 720°' },
  ];

  const handleCategoryChange = (value) => {
    setSelectedCategories((prev) => {
      if (prev.includes(value)) {
        if (prev.length === 1) {
          return prev;
        }
        return prev.filter((c) => c !== value);
      } else {
        return [...prev, value];
      }
    });
  };

  const handleStart = () => {
    const categoryQuery = selectedCategories.length > 0 ? selectedCategories.join(',') : '';
    const query = `?question=${questionsType}&type=${problemsType}&category=${encodeURIComponent(categoryQuery)}`;
    fadeNavigate('/trigRatioChallenge/main' + query);
  };

  return (
    <AnimatePresence mode="wait">
      <motion.div {...fadeWithLeave(isLeaving)}>
        <GameArea>
          <div className={styles.title}>三角比チャレンジ</div>
          
            {/* タイムアタック / トライアル */}
            <div className={styles.comment}>～ 問題種類 ～</div>
            <div className={styles.radioGroup}>
              <label>
                <input
                  type="radio"
                  name="quiestionType"
                  value="attack"
                  checked={questionsType === 'attack'}
                  onChange={() => setQuestionsType('attack')}
                  className={styles.radioInput}
                />
                <span className={styles.radioButton}>タイムアタック</span>
              </label>
              <label>
                <input
                  type="radio"
                  name="quiestionType"
                  value="trial"
                  checked={questionsType === 'trial'}
                  onChange={() => setQuestionsType('trial')}
                  className={styles.radioInput}
                />
                <span className={styles.radioButton}>タイムトライアル</span>
              </label>
            </div>

          <div className={styles.selectWrapper}>
            {/* 度数法 / 弧度法 */}
            <div className={styles.comment}>～ 角度単位 ～</div>
            <div className={styles.radioGroup}>
              <label>
                <input
                  type="radio"
                  name="problemsType"
                  value="deg"
                  checked={problemsType === 'deg'}
                  onChange={() => setProblemsType('deg')}
                  className={styles.radioInput}
                />
                <span className={styles.radioButton}>度数法</span>
              </label>
              <label>
                <input
                  type="radio"
                  name="problemsType"
                  value="rad"
                  checked={problemsType === 'rad'}
                  onChange={() => setProblemsType('rad')}
                  className={styles.radioInput}
                />
                <span className={styles.radioButton}>弧度法</span>
              </label>
            </div>

            {/* カテゴリーチェックボックス */}
            <div className={styles.comment}>～ 角度範囲 ～</div>
            <div className={styles.checkboxGroup}>
              {categories.map(({ id, label }) => (
                <label
                  key={id}
                  className={`${styles.checkboxLabel} ${selectedCategories.includes(id) ? styles.checked : ''}`}
                >
                  <input
                    type="checkbox"
                    value={id}
                    checked={selectedCategories.includes(id)}
                    onChange={() => handleCategoryChange(id)}
                    className={styles.checkboxInput}
                  />
                  <span className={styles.checkboxText}>{label}</span>
                </label>
              ))}
            </div>
          </div>

          {/* ボタン群 */}
          <div className={styles.buttonWrapper}>
            <DefaultButton onClick={handleStart}>START</DefaultButton>
            <DefaultButton onClick={() => fadeNavigate('/trigRatioChallenge/result')}>RESULT</DefaultButton>
          </div>
        </GameArea>
      </motion.div>
    </AnimatePresence>
  );
}