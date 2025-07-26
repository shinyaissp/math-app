"use client";

import React, { useEffect, useState, useCallback } from 'react';
import styles from './GameArea.module.css';

const GameArea = ({ imageUrl, children }) => {
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const [isMobile, setIsMobile] = useState(false);
  const aspectRatio = 16 / 9;

  const resizeGameArea = useCallback(() => {
    const windowWidth = window.innerWidth;
    const windowHeight = window.innerHeight;
    let width, height;

    if (windowWidth / windowHeight > aspectRatio) {
      height = windowHeight;
      width = height * aspectRatio;
    } else {
      width = windowWidth;
      height = width / aspectRatio;
    }

    setDimensions({ width, height });
    setIsMobile(windowWidth <= 767);  // 画面幅が767以下ならスマホ用と判定
  }, [aspectRatio]);

  useEffect(() => {
    resizeGameArea();
    window.addEventListener('resize', resizeGameArea);
    return () => window.removeEventListener('resize', resizeGameArea);
  }, [resizeGameArea]);

  return (
    <>
      {!isMobile && (
        <div
          className={styles.gameArea}
          style={{
            width: `${dimensions.width}px`,
            height: `${dimensions.height}px`,
            backgroundImage: imageUrl ? `url(${imageUrl})` : "none"
          }}
        >
          {children}
        </div>
      )}

      {isMobile && (
        <div
          className={styles.gameArea_sm}
          style={{
            backgroundImage: imageUrl ? `url(${imageUrl})` : "none"
          }}
        >
          {children}
        </div>
      )}
    </>
  );
};

export default GameArea;
