'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useFadeNavigate } from '@/hooks/useFadeNavigate';
import GameArea from '@/components/GameArea/GameArea';
import styles from "./page.module.css";

export default function Page() {
  const { isLeaving, fadeNavigate } = useFadeNavigate(1000);

  return (
  <AnimatePresence mode="wait">
    <motion.div
      initial={{ opacity: 0 }}
      animate={isLeaving ? { opacity: 0 } : { opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1 }}
    >
      <GameArea imageUrl="/sea.jpg">
        <div className={styles.title}>QUIZ GAME</div>
        <button className={styles.buttonDefault} onClick={() => fadeNavigate('/quiz/main')}>START</button>
        <button className={styles.buttonDefault} onClick={() => fadeNavigate('/quiz/result')}>RESULT</button>
      </GameArea>
    </motion.div>
  </AnimatePresence>
  )
}
