"use client";

import { useRef, useEffect, useCallback } from "react";
import styles from "./page.module.css";
import GameArea from "../../../components/GameArea/GameArea";
import { motion, AnimatePresence } from "framer-motion";

export default function Page() {
  const canvasRef = useRef(null);
  const numLines = 19;
  const numPoints = 40;

  const draw = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    const width = canvas.width;
    const height = canvas.height;
    const cellSize = width / numLines;

    // ランダム点生成
    const points = Array.from({ length: numPoints }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
    }));

    // 各セルに点がいくつあるか
    const gridCounts = Array.from({ length: numLines }, () =>
      Array(numLines).fill(0)
    );

    for (const p of points) {
      const col = Math.floor(p.x / cellSize);
      const row = Math.floor(p.y / cellSize);
      gridCounts[row][col]++;
    }

    ctx.clearRect(0, 0, width, height);

    // 2つ以上あるセルを塗る
    ctx.fillStyle = "rgba(255,0,0,0.3)";
    for (let row = 0; row < numLines; row++) {
      for (let col = 0; col < numLines; col++) {
        if (gridCounts[row][col] >= 2) {
          ctx.fillRect(col * cellSize, row * cellSize, cellSize, cellSize);
        }
      }
    }

    // 格子
    ctx.strokeStyle = "gray";
    ctx.lineWidth = 0.5;
    ctx.beginPath();
    for (let i = 0; i <= numLines; i++) {
      const pos = i * cellSize;
      ctx.moveTo(pos, 0);
      ctx.lineTo(pos, height);
      ctx.moveTo(0, pos);
      ctx.lineTo(width, pos);
    }
    ctx.stroke();

    // 点
    ctx.fillStyle = "white";
    for (const p of points) {
      ctx.beginPath();
      ctx.arc(p.x, p.y, 4, 0, Math.PI * 2);
      ctx.fill();
    }
  }, [numLines, numPoints]);

  useEffect(() => {
    draw();
  }, [draw]);

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key="prob"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5 }}
      >
        <GameArea>
          <div className={styles.container}>
            <div>BIRTHDAY</div>
            <canvas
              ref={canvasRef}
              id="myCanvas"
              width={600}
              height={600}
              onClick={draw}
              className={styles.canvas}
            />
          </div>
        </GameArea>
      </motion.div>
    </AnimatePresence>
  );
}
