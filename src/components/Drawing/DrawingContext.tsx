/*
 * DrawingContext.ts
 * Author: Evan Kirkiles
 * Created On Fri Nov 17 2023
 * 2023 Design at Yale
 */
'use client';

import {
  MutableRefObject,
  PropsWithChildren,
  createContext,
  createRef,
  useContext,
  useRef,
  useState,
} from 'react';
import { ReactSketchCanvasRef } from 'react-sketch-canvas';

interface DrawingContext {
  prompt: {
    name: string;
    id: number;
  };
  dimensions: MutableRefObject<{
    innerWidth: number;
    innerHeight: number;
  } | null>;
  submitting: boolean;
  setSubmitting: (a0: boolean) => void;
  canvasRef: MutableRefObject<ReactSketchCanvasRef | null>;
}

const DrawingContext = createContext<DrawingContext>({
  prompt: {
    name: 'Anything you want!',
    id: 0,
  },
  dimensions: createRef(),
  canvasRef: createRef(),
  submitting: false,
  setSubmitting() {},
});

interface DrawingContextProviderProps extends PropsWithChildren {}

export const useDrawingContext = () => useContext(DrawingContext);

/**
 * The Drawing context provides a couple shared resources—mainly, the canvasRef
 * to components of the Drawing interface.
 */
export default function DrawingContextProvider({
  children,
}: DrawingContextProviderProps) {
  const [submitting, setSubmitting] = useState(false);
  const canvasRef = useRef<ReactSketchCanvasRef | null>(null);
  const dimensions = useRef({
    innerHeight: typeof window !== 'undefined' ? window.innerHeight : 0,
    innerWidth: typeof window !== 'undefined' ? window.innerWidth : 0,
  });

  return (
    <DrawingContext.Provider
      value={{
        prompt: {
          name: 'Anything you want!',
          id: 0,
        },
        dimensions,
        canvasRef,
        submitting,
        setSubmitting,
      }}
    >
      {children}
    </DrawingContext.Provider>
  );
}
