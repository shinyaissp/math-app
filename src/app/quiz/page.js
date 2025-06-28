'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import GameArea from '../../../components/GameArea/GameArea';
import Link from 'next/link';

export default function Page() {
  return (
  <AnimatePresence mode="wait">
    <motion.div
      key="quizPage"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <GameArea imageUrl="/sea.jpg">
        <div>クイズページ</div>
        <Link href="/quiz/main">START</Link>
        <Link href="/quiz/result">RESULT</Link>
      </GameArea>
    </motion.div>
  </AnimatePresence>
  )
}
