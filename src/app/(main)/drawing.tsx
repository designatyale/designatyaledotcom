/*
 * drawing.tsx
 * Author: Evan Kirkiles
 * Created On Mon Sep 25 2023
 * 2023 Design at Yale
 */
'use client';

import useColorScheme from '@/hooks/useColorScheme';
import { useEffect, useRef } from 'react';
import { ReactSketchCanvas, ReactSketchCanvasRef } from 'react-sketch-canvas';

export default function Drawing({ className }: { className?: string }) {
  const canvasRef = useRef<ReactSketchCanvasRef | null>(null);
  const { colorScheme } = useColorScheme();
  const prevDims = useRef({
    innerHeight: typeof window !== 'undefined' ? window.innerHeight : 0,
    innerWidth: typeof window !== 'undefined' ? window.innerWidth : 0,
  });

  useEffect(() => {
    const keyListener = (e: KeyboardEvent) => {
      if (!canvasRef.current) return;
      switch (e.key) {
        case 'z':
          if (e.metaKey) {
            if (e.shiftKey) {
              canvasRef.current.redo();
            } else {
              canvasRef.current.undo();
            }
            e.preventDefault();
          }
          break;
        case 'y':
          if (e.metaKey) {
            canvasRef.current.redo();
            e.preventDefault();
          }
          break;
        case 'Escape':
          canvasRef.current.clearCanvas();
          e.preventDefault();
          break;
      }
    };
    window.addEventListener('keydown', keyListener, false);

    // clear canvas on windo wresize
    function resizeHandler() {
      if (!canvasRef.current || typeof window === 'undefined') return;
      const { innerHeight, innerWidth } = window;
      if (
        innerWidth === prevDims.current.innerWidth &&
        Math.abs(innerHeight - prevDims.current.innerHeight) < 100
      )
        return;
      canvasRef.current.resetCanvas();
      prevDims.current = {
        innerHeight,
        innerWidth,
      };
    }
    window.addEventListener('resize', resizeHandler, false);

    return () => {
      window.removeEventListener('keydown', keyListener, false);
      window.removeEventListener('resize', resizeHandler, false);
    };
  }, []);

  return (
    <ReactSketchCanvas
      className={className}
      style={{}}
      ref={canvasRef}
      canvasColor="transparent"
      strokeWidth={15}
      strokeColor={colorScheme.evalScheme === 'light' ? '#070707' : '#fff'}
    />
  );
}
