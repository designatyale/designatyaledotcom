/*
 * index.tsx
 * Author: Evan Kirkiles
 * Created On Thu Nov 16 2023
 * 2023 Design at Yale
 */
'use client';

import classNames from 'classnames';
import { useEffect, useReducer, useRef } from 'react';
import { ReactSketchCanvas, ReactSketchCanvasRef } from 'react-sketch-canvas';
import s from './Drawing.module.scss';
import DrawingToolbar from '@/components/Drawing/Toolbar';

export default function Drawing({ className }: { className?: string }) {
  const canvasRef = useRef<ReactSketchCanvasRef | null>(null);
  const [eraseMode, setEraseMode] = useReducer((_: boolean, action: boolean) => {
    canvasRef.current?.eraseMode(action);
    return action;
  }, false);
  const prevDims = useRef({
    innerHeight: typeof window !== 'undefined' ? window.innerHeight : 0,
    innerWidth: typeof window !== 'undefined' ? window.innerWidth : 0,
  });

  useEffect(() => {
    // Keybindings
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

    // clear canvas on window resize
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

  // load paths from localStorage if they exist for this screen size.
  const hasMountedRef = useRef(false);
  useEffect(() => {
    if (!canvasRef.current) return;
    hasMountedRef.current = true;
    const paths = localStorage.getItem('day-current-sketch');
    if (!paths) return;
    canvasRef.current.loadPaths(JSON.parse(paths));
  }, []);

  return (
    <>
      <ReactSketchCanvas
        className={classNames(s.canvas, className)}
        style={{}}
        ref={canvasRef}
        canvasColor="transparent"
        strokeWidth={15}
        eraserWidth={15}
        onChange={(updatedPaths) => {
          if (hasMountedRef.current) {
            localStorage.setItem(
              'day-current-sketch',
              JSON.stringify(updatedPaths)
            );
          }
        }}
      />
      <DrawingToolbar canvasRef={canvasRef} />
    </>
  );
}
