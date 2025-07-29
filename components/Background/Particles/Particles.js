'use client';

import React, { useState, useEffect } from 'react';
import styles from './Particles.module.css';

export default function Particles() {
  const [particles, setParticles] = useState([]);

  useEffect(() => {
    const newParticles = Array.from({ length: 50 }, () => {
      const top = Math.random() * 100;
      const left = Math.random() * 100;
      const delay = Math.random() * 5;
      const size = Math.random() * 10 + 5;

      return { top, left, delay, size };
    });
    setParticles(newParticles);
  }, []);

  if (particles.length === 0) return null;

  return (
    <>
      {particles.map(({ top, left, delay, size }, i) => (
        <div
          key={i}
          className={styles.blinkingParticle}
          style={{
            top: `${top}vh`,
            left: `${left}vw`,
            width: `${size}px`,
            height: `${size}px`,
            animationDelay: `${delay}s`,
          }}
        />
      ))}
    </>
  );
}
