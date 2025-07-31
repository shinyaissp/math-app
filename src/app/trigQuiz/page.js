'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useFadeNavigate } from '@/hooks/useFadeNavigate';
import { useIsMobile } from '@/hooks/useIsMobile';
import { fadeWithLeave } from '@/animation/fade';
import GameArea from '@/components/GameArea/GameArea';
import styles from './page.module.css';

export default function Page() {
  const { isLeaving, fadeNavigate } = useFadeNavigate(1000);
  const isMobile = useIsMobile();

  const [problemsType, setProblemsType] = useState('deg');
  const [selectedCategories, setSelectedCategories] = useState(['H1']);
  const categories = [
    { id: 'H0', label: '-360°~-30°' },
    { id: 'H1', label: '0°~180°' },
    { id: 'H2', label: '210°~360°' },
    { id: 'H3', label: '390°~720°' },
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
    const query = `?type=${problemsType}&category=${encodeURIComponent(categoryQuery)}`;
    fadeNavigate('/trigQuiz/main' + query);
  };

  return (
    <AnimatePresence mode="wait">
      <motion.div {...fadeWithLeave(isLeaving)}>
        <GameArea>
          <div className={styles.title}>タイムアタック<br />( 三角比 )</div>

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
            <button className={styles.buttonDefault} onClick={handleStart}>START</button>
            <button className={styles.buttonDefault} onClick={() => fadeNavigate('/trigQuiz/result')}>RESULT</button>
          </div>
        </GameArea>
      </motion.div>
    </AnimatePresence>
  );
}
