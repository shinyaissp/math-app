'use client';

import React from 'react';
import GameArea from '@/components/GameArea/GameArea';
import { useFadeNavigate } from '@/hooks/useFadeNavigate';
import { motion } from 'framer-motion';

export default function Page() {
  const { isLeaving, fadeNavigate } = useFadeNavigate(1000);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={isLeaving ? { opacity: 0 } : { opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1 }}
    >
      <GameArea imageUrl="/sea.jpg">
        <div>RESULT</div>
        <button onClick={() => fadeNavigate('/quiz')}>QUIZ TOP</button>
      </GameArea>
    </motion.div>
  );
}
