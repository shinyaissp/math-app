"use client";

import { useRef, useEffect, useCallback, useState } from "react";
import styles from "./page.module.css";
import GameArea from "../../../components/GameArea/GameArea";
import { motion, AnimatePresence } from "framer-motion";

export default function Page() {
  const canvasRef = useRef(null);
  const numCols = 30;
  const numRows = 12;
  const cellSize = 30;

  const canvasWidth = numCols * cellSize;
  const canvasHeight = numRows * cellSize;

  const [numPoints, setNumPoints] = useState(40);
  const [history, setHistory] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  const calcProbability = (people, days) => {
    if (people > days) return 1;
    let probNoDup = 1;
    for (let i = 0; i < people; i++) {
      probNoDup *= (days - i) / days;
    }
    return 1 - probNoDup;
  };

  const theoreticalProb = calcProbability(numPoints, 360);

  // const currentCount = history[currentIndex]?.count ?? 0;

  const draw = useCallback((pointsFromHistory = null, pointCount = 40, resetHistory = false) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");

    const points = pointsFromHistory
      ? pointsFromHistory
      : Array.from({ length: pointCount }, () => ({
          x: Math.random() * canvasWidth,
          y: Math.random() * canvasHeight,
        }));

    const gridCounts = Array.from({ length: numRows }, () =>
      Array(numCols).fill(0)
    );

    for (const p of points) {
      const col = Math.floor(p.x / cellSize);
      const row = Math.floor(p.y / cellSize);
      if (row >= 0 && row < numRows && col >= 0 && col < numCols) {
        gridCounts[row][col]++;
      }
    }

    ctx.clearRect(0, 0, canvasWidth, canvasHeight);

    ctx.fillStyle = "rgba(255,0,0,0.3)";
    let count = 0;
    for (let row = 0; row < numRows; row++) {
      for (let col = 0; col < numCols; col++) {
        if (gridCounts[row][col] >= 2) {
          ctx.fillRect(col * cellSize, row * cellSize, cellSize, cellSize);
          count++;
        }
      }
    }

    ctx.strokeStyle = "gray";
    ctx.lineWidth = 1;
    ctx.beginPath();
    for (let i = 0; i <= numCols; i++) {
      const x = i * cellSize;
      ctx.moveTo(x, 0);
      ctx.lineTo(x, canvasHeight);
    }
    for (let i = 0; i <= numRows; i++) {
      const y = i * cellSize;
      ctx.moveTo(0, y);
      ctx.lineTo(canvasWidth, y);
    }
    ctx.stroke();

    ctx.fillStyle = "white";
    for (const p of points) {
      ctx.beginPath();
      ctx.arc(p.x, p.y, 4, 0, Math.PI * 2);
      ctx.fill();
    }

    if (!pointsFromHistory) {
      if (resetHistory) {
        setHistory([{ count, points }]);
      } else {
        setHistory(prev => [{ count, points }, ...prev].slice(0, 10));
      }
      setCurrentIndex(0);
    }
  }, [numCols, numRows, cellSize, canvasWidth, canvasHeight]);

  useEffect(() => {
    draw(null, numPoints, true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handlePrev = () => {
    if (currentIndex + 1 < history.length) {
      const nextIndex = currentIndex + 1;
      setCurrentIndex(nextIndex);
      draw(history[nextIndex].points);
    }
  };

  const handleNext = () => {
    if (currentIndex > 0) {
      const nextIndex = currentIndex - 1;
      setCurrentIndex(nextIndex);
      draw(history[nextIndex].points);
    } else {
      draw(null, numPoints);
    }
  };

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
            <div className={styles.container_left}>
              <div className={styles.title}>ＣＡＬＥＮＤＡＲ</div>
              <canvas
                ref={canvasRef}
                width={canvasWidth}
                height={canvasHeight}
                className={styles.canvas}
                style={{ border: "1px solid #ccc" }}
              />
              <div style={{ marginTop: "2rem" }}>
                <button
                  onClick={handlePrev}
                  disabled={currentIndex + 1 >= history.length}
                  className={styles.button}
                >
                  戻る
                </button>
                <button
                  onClick={handleNext}
                  disabled={false}
                  style={{ marginLeft: "5rem" }}
                  className={styles.button}
                >
                  進む
                </button>
              </div>
              <div style={{ marginTop: "1rem", fontSize: "1.5rem", fontWeight: "bold" }}>
                同じ誕生日がいる確率：
                <p style={{ display: "inline", fontSize: "2.2rem"}}>{(theoreticalProb * 100).toFixed(0)}</p> %
              </div>
            </div>
            <div className={styles.container_right}>
              <div style={{ marginTop: "1rem" }}>
                <table className={styles.historyTable}>
                  <thead>
                    <tr>
                      <th>No.</th>
                      <th>同じ誕生日（組）</th>
                    </tr>
                  </thead>
                  <tbody>
                    {Array.from({ length: 10 }).map((_, i) => {
                      const item = history[i];
                      return (
                        <tr key={i} className={i === currentIndex ? styles.activeRow : ""}>
                          <td>{i + 1}</td>
                          <td>{item ? `${item.count}` : "―"}</td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
              <div style={{ marginTop: "1.45rem", fontWeight: "bold", fontSize: "1.2rem"}}>
                クラスの人数: {numPoints}人
              </div>
              <div style={{ marginTop: "0.1rem" }}>
                <button
                  onClick={() => {
                    const newN = Math.max(1, numPoints - 1);
                    setNumPoints(newN);
                    draw(null, newN, true);
                  }}
                  className={styles.classButton}
                >
                  −
                </button>
                <button
                  onClick={() => {
                    const newN = Math.min(50, numPoints + 1);
                    setNumPoints(newN);
                    draw(null, newN, true);
                  }}
                  style={{ marginLeft: "0.5rem" }}
                  className={styles.classButton}
                >
                  ＋
                </button>
              </div>
            </div>
          </div>
        </GameArea>
      </motion.div>
    </AnimatePresence>
  );
}
