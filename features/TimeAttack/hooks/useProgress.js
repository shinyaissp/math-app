import { useEffect, useRef, useState } from 'react';


// 時間に対しての進捗率を返すフックス
// 親コンポーネントで定義したonfinishの内容の実行
export function useProgress(duration, onFinish, isRunning = false) {
  const [progress, setProgress] = useState(1);
  const intervalRef = useRef(null);
  const startRef = useRef(null);

  useEffect(() => {
    if (!isRunning) return;
    if (!startRef.current) {
      startRef.current = Date.now();
    }

    intervalRef.current = setInterval(() => {
      const elapsed = Date.now() - startRef.current;
      const p = Math.max(1 - elapsed / duration, 0);
      setProgress(p);

      if (p <= 0) {
        clearInterval(intervalRef.current);
        if (onFinish) onFinish();
      }
    }, 1000 / 30);

    return () => clearInterval(intervalRef.current);
  }, [isRunning, duration, onFinish]);

  // runningがfalseになったらstart時間もリセット
  useEffect(() => {
    if (!isRunning) {
      startRef.current = null;
      setProgress(1);
    }
  }, [isRunning]);

  return progress;
}
