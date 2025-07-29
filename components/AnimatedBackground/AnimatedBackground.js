'use client';

import React, { useEffect, useState } from 'react';
import styles from './AnimatedBackground.module.css';
import { motion } from 'framer-motion';

function getNeighbors(index, rows, cols) {
  const neighbors = [];
  const row = Math.floor(index / cols);
  const col = index % cols;
  if (row > 0) neighbors.push(index - cols);
  if (row < rows - 1) neighbors.push(index + cols);
  if (col > 0) neighbors.push(index - 1);
  if (col < cols - 1) neighbors.push(index + 1);
  return neighbors;
}

export default function AnimatedBackground() {
  const [boxSize, setBoxSize] = useState(40);
  const [rows, setRows] = useState(6);
  const [cols, setCols] = useState(10);
  const [positions, setPositions] = useState([]);
  const [started, setStarted] = useState(false);

  useEffect(() => {
    const updateLayout = () => {
      if (window.innerWidth < 768) {
        setCols(6);  
        setRows(8);
        setBoxSize(20);
      } else {
        setCols(10);
        setRows(6);
        setBoxSize(40);
      }
    };

    updateLayout();
    window.addEventListener('resize', updateLayout);
    return () => window.removeEventListener('resize', updateLayout);
  }, []);

  useEffect(() => {
    const totalBoxes = rows * cols;
    setPositions(Array.from({ length: totalBoxes }, (_, i) => i));
    setStarted(true);
  }, [rows, cols]);

  useEffect(() => {
    if (!started) return;

    const interval = setInterval(() => {
      setPositions((prev) => {
        const totalBoxes = rows * cols;
        const idx = Math.floor(Math.random() * totalBoxes);
        const neighbors = getNeighbors(idx, rows, cols);
        const swapWith = neighbors[Math.floor(Math.random() * neighbors.length)];

        const newPositions = [...prev];
        [newPositions[idx], newPositions[swapWith]] = [newPositions[swapWith], newPositions[idx]];
        return newPositions;
      });
    }, 3000);

    return () => clearInterval(interval);
  }, [started, rows, cols]);

  const totalBoxes = rows * cols;

  return (
    <div className={styles.container}>
      {positions.map((posIndex, i) => {
        const row = Math.floor(posIndex / cols);
        const col = posIndex % cols;
        const top = `${(row / (rows - 1)) * 100}%`;
        const left = `${(col / (cols - 1)) * 100}%`;

        return (
          <motion.div
            key={i}
            className={styles.box}
            animate={{
              top,
              left,
              translateX: '-50%',
              translateY: '-50%',
            }}
            style={{
              position: 'absolute',
              width: `${boxSize}px`,
              height: `${boxSize}px`,
              top,
              left,
              backgroundColor: 'rgba(255,255,255,0.05)',
              borderRadius: '8px',
              translateX: '-50%',
              translateY: '-50%',
            }}
            transition={{ duration: 7.5, ease: 'easeInOut' }}
          />
        );
      })}
    </div>
  );
}
