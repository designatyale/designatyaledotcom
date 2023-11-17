/*
 * index.tsx
 * Author: Evan Kirkiles
 * Created On Fri Nov 17 2023
 * 2023 Design at Yale
 */
'use client';

import { useDrawingContext } from '@/components/Drawing/DrawingContext';
import classNames from 'classnames';
import { ReactSketchCanvas } from 'react-sketch-canvas';
import s from './DrawingCanvas.module.scss';
import { useEffect, useRef } from 'react';

interface DrawingCanvasProps {
  className?: string;
}

export default function DrawingCanvas({ className }: DrawingCanvasProps) {
  const { canvasRef, dimensions } = useDrawingContext();

  // load drawing from localStorage if they exist.
  // doesn't check for screen size atm, which we should do.
  const hasMountedRef = useRef(false);
  useEffect(() => {
    if (!canvasRef.current) return;
    hasMountedRef.current = true;
    const paths = localStorage.getItem('day-current-sketch');
    if (!paths) return;
    canvasRef.current.loadPaths(JSON.parse(paths));
  }, [canvasRef]);

  // clear canvas on window resize, as it doesn't make sense to have a huge drawing
  // on a small screen. if this messes up UX too much, maybe change this?
  useEffect(() => {
    function resizeHandler() {
      if (typeof window === 'undefined') return;
      if (!canvasRef.current || !dimensions.current) return;
      const { innerHeight, innerWidth } = window;
      if (
        innerWidth === dimensions.current.innerWidth &&
        Math.abs(innerHeight - dimensions.current.innerHeight) < 100
      )
        return;
      canvasRef.current.resetCanvas();
      dimensions.current = {
        innerHeight,
        innerWidth,
      };
    }
    window.addEventListener('resize', resizeHandler, false);
    return () => {
      window.removeEventListener('resize', resizeHandler, false);
    };
  }, [canvasRef, dimensions]);

  return (
    <ReactSketchCanvas
      className={classNames(s.canvas, className)}
      style={{}}
      ref={canvasRef}
      canvasColor="transparent"
      strokeWidth={15}
      eraserWidth={15}
      strokeColor={'#000'}
      onChange={(updatedPaths) => {
        if (hasMountedRef.current) {
          localStorage.setItem(
            'day-current-sketch',
            JSON.stringify(updatedPaths)
          );
        }
      }}
    />
  );
}
