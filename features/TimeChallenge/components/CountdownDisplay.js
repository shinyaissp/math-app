'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { BlockMath } from 'react-katex';
import { fade } from '@/animation/fade';

export default function CountdownDisplay({
  countdownIndex,
  countdownSteps,
  isFinished,
  problem,
}) {
  if (countdownIndex !== null) {
    return (
      <motion.div key={countdownIndex} {...fade}>
        {countdownSteps[countdownIndex]}
      </motion.div>
    );
  }

  if (isFinished) {
    return <motion.div {...fade}>FINISH!!</motion.div>;
  }

  return <BlockMath math={problem || ''} />;
}
