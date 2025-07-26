'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useFadeNavigate } from '@/hooks/useFadeNavigate';
import { useIsMobile } from "@/hooks/useIsMobile";
import { fadeWithLeave } from '@/animation/fade';
import GameArea from '@/components/GameArea/GameArea';
import styles from "./page.module.css";


export default function Page() {
  const { isLeaving, fadeNavigate } = useFadeNavigate(1000);
  const isMobile = useIsMobile();

  return (
  <AnimatePresence mode="wait">
    <motion.div {...fadeWithLeave(isLeaving)}>
      <GameArea imageUrl="/sea.jpg">
        <div className={styles.title}>QUIZ GAME</div>
        {!isMobile && (
          <div className={styles.buttonWrapper}>
            <button className={styles.buttonDefault} onClick={() => fadeNavigate('/quiz/main')}>START</button>
            <button className={styles.buttonDefault} onClick={() => fadeNavigate('/quiz/result')}>RESULT</button>
          </div>
        )}
      </GameArea>
      {isMobile && (
        <div className={styles.buttonWrapper}>
          <button className={styles.buttonDefault} onClick={() => fadeNavigate('/quiz/main')}>START</button>
          <button className={styles.buttonDefault} onClick={() => fadeNavigate('/quiz/result')}>RESULT</button>
        </div>
      )}
    </motion.div>
  </AnimatePresence>
  )
}
