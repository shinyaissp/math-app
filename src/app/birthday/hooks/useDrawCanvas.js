import { useCallback } from "react";

export default function useDrawCanvas ({
  numCols,
  numRows,
  cellSize,
  canvasRef,
  canvasWidth,
  canvasHeight,
  setHistory,
  setCurrentIndex,
})  {
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

    const pointRadius = Math.max(cellSize * 0.1, 2); // 小さすぎないように最低1pxに制限
    
    ctx.fillStyle = "white";
    for (const p of points) {
      ctx.beginPath();
      ctx.arc(p.x, p.y, pointRadius, 0, Math.PI * 2);
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
  }, [ numCols, numRows, cellSize, canvasRef, canvasWidth, canvasHeight, setHistory, setCurrentIndex]);
  return {draw};
}