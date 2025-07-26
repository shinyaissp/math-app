"use client";

import { useRef, useEffect, useState } from "react";
import styles from "./page.module.css";
import GameArea from "@/components/GameArea/GameArea";
import { fade } from "@/animation/fade";
import { motion, AnimatePresence } from "framer-motion";
import useDrawCanvas from "./hooks/useDrawCanvas";

const calcProbability = (people, days) => {
  if (people > days) return 1;
  let probNoDup = 1;
  for (let i = 0; i < people; i++) {
    probNoDup *= (days - i) / days;
  }
  return 1 - probNoDup;
};

export default function Page() {
  const numCols = 30;
  const numRows = 12;
  const cellSize = 30;
  const canvasHeight = numRows * cellSize;
  const canvasRef = useRef(null);
  const [canvasWidth, setCanvasWidth] = useState(numCols * cellSize);
  const [history, setHistory] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [numPoints, setNumPoints] = useState(40);
  const theoreticalProb = calcProbability(numPoints, 360);  
  const { draw } = useDrawCanvas({
    numCols,
    numRows,
    cellSize,
    canvasRef,
    canvasWidth,
    canvasHeight,
    setHistory,
    setCurrentIndex,
  });

  useEffect(() => {
    const updateCanvasWidth = () => {
      const maxWidth = window.innerWidth < 768 ? window.innerWidth - 32 : numCols * cellSize;
      setCanvasWidth(Math.min(maxWidth, numCols * cellSize));
    };

    updateCanvasWidth();
    window.addEventListener("resize", updateCanvasWidth);
    return () => window.removeEventListener("resize", updateCanvasWidth);
  }, []);

  useEffect(() => {
    draw(null, numPoints, true);
  }, [canvasWidth, draw, numPoints]);

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
      <motion.div key="prob" {...fade}>
        <GameArea>
          <div className={styles.container}>
            <div className={styles.container_left}>
              <div className={styles.title}>ＣＡＬＥＮＤＡＲ</div>
              <canvas
                ref={canvasRef}
                width={canvasWidth}
                height={canvasHeight}
                className={styles.canvas}
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
                  style={{ marginLeft: "1rem" }}
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
                  }}
                  className={styles.classButton}
                >
                  −
                </button>
                <button
                  onClick={() => {
                    const newN = Math.min(50, numPoints + 1);
                    setNumPoints(newN);
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