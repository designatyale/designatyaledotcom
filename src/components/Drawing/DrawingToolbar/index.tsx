/*
 * index.tsx
 * Author: Evan Kirkiles
 * Created On Fri Nov 17 2023
 * 2023 Design at Yale
 */

import { useEffect, useReducer, useRef, useState } from 'react';
import { BsPencil, BsEraser } from 'react-icons/bs';
import { LuRedo2, LuUndo2 } from 'react-icons/lu';
import {
  HiOutlineCloudUpload,
  HiOutlineQuestionMarkCircle,
} from 'react-icons/hi';
import Draggable from 'react-draggable';
import s from './DrawingToolbar.module.scss';
import { VscClose } from 'react-icons/vsc';
import { RiDraggable } from 'react-icons/ri';
import { useDrawingContext } from '@/components/Drawing/DrawingContext';

interface DrawingToolbarProps {
  uploading: boolean;
  setUploading: (a0: boolean) => void;
}

export default function DrawingToolbar({
  uploading,
  setUploading,
}: DrawingToolbarProps) {
  const { canvasRef, prompt } = useDrawingContext();
  const draggableRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [eraseMode, setEraseMode] = useReducer((_: boolean, action: boolean) => {
    canvasRef.current?.eraseMode(action);
    return action;
  }, false);

  // attach keybindings to the canvas ref
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
        // case 'Escape':
        //   canvasRef.current.clearCanvas();
        //   e.preventDefault();
        //   break;
      }
    };
    window.addEventListener('keydown', keyListener, false);
    return () => {
      window.removeEventListener('keydown', keyListener, false);
    };
  }, [canvasRef]);

  return (
    <nav className={s.toolbar_container} role="menubar">
      <Draggable
        nodeRef={draggableRef}
        bounds="parent"
        handle="#day-sketch-draghandle"
        onStart={() => {
          setIsDragging(true);
        }}
        onStop={() => {
          setIsDragging(false);
        }}
      >
        <div className={s.toolbar} ref={draggableRef}>
          <RiDraggable
            className={s.handle}
            id="day-sketch-draghandle"
            onMouseDown={(e) => e.preventDefault()}
            style={{
              cursor: isDragging ? 'grabbing' : 'grab',
            }}
          />
          <button
            onClick={() => setEraseMode(false)}
            role="radio"
            aria-checked={!eraseMode}
          >
            <BsPencil />
          </button>
          <button
            onClick={() => setEraseMode(true)}
            role="radio"
            aria-checked={eraseMode}
          >
            <BsEraser />
          </button>
          <hr />
          <button onClick={() => canvasRef.current?.undo()}>
            <LuUndo2 />
          </button>
          <button onClick={() => canvasRef.current?.redo()}>
            <LuRedo2 />
          </button>
          <button onClick={() => canvasRef.current?.clearCanvas()}>
            <VscClose />
          </button>
          <hr />
          <button
            role="checkbox"
            aria-checked={uploading || undefined}
            onClick={() => setUploading(!uploading)}
          >
            <HiOutlineCloudUpload />
          </button>
          <button>
            <HiOutlineQuestionMarkCircle />
          </button>
          {prompt && <p className={s.todays_prompt}>Doodle: {prompt.name}</p>}
        </div>
      </Draggable>
    </nav>
  );
}
