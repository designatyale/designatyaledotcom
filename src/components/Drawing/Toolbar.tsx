/*
 * Toolbar.tsx
 * Author: Evan Kirkiles
 * Created On Thu Nov 16 2023
 * 2023 Design at Yale
 */

import { MutableRefObject, useReducer, useRef, useState } from 'react';
import { ReactSketchCanvasRef } from 'react-sketch-canvas';
import { BsPencil, BsEraser } from 'react-icons/bs';
import { LuRedo2, LuUndo2 } from 'react-icons/lu';
import {
  HiOutlineCloudUpload,
  HiOutlineQuestionMarkCircle,
} from 'react-icons/hi';
import Draggable from 'react-draggable';
import s from './Drawing.module.scss';
import { VscClearAll, VscClose } from 'react-icons/vsc';
import { RiDraggable } from 'react-icons/ri';

interface DrawingToolbarProps {
  canvasRef: MutableRefObject<ReactSketchCanvasRef | null>;
}

export default function DrawingToolbar({ canvasRef }: DrawingToolbarProps) {
  const draggableRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [eraseMode, setEraseMode] = useReducer((_: boolean, action: boolean) => {
    canvasRef.current?.eraseMode(action);
    return action;
  }, false);

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
          <button>
            <HiOutlineCloudUpload />
          </button>
          <button>
            <HiOutlineQuestionMarkCircle />
          </button>
          <p className={s.todays_prompt}>Design Prompt: TUESDAY!</p>
        </div>
      </Draggable>
    </nav>
  );
}
