// 一番単純なcanvas react
import { useRef, useEffect } from "react";

export default function MyCanvas() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;  // ←これが実際の <canvas> DOM 要素
    const ctx = canvas.getContext("2d");
    ctx.fillStyle = "blue";
    ctx.fillRect(10, 10, 100, 100);
  }, []);

  return (
    <canvas ref={canvasRef} width={400} height={400} />
  );
}
