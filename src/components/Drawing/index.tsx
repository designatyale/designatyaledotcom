/*
 * index.tsx
 * Author: Evan Kirkiles
 * Created On Thu Nov 16 2023
 * 2023 Design at Yale
 */
'use client';

import DrawingToolbar from '@/components/Drawing/DrawingToolbar';
import DrawingContextProvider from '@/components/Drawing/DrawingContext';
import DrawingCanvas from '@/components/Drawing/DrawingCanvas';
import { useState } from 'react';
import DrawingSubmitForm from '@/components/Drawing/DrawingSubmitForm';
import s from './Drawing.module.scss';
import { Transition } from 'transition-hook';
import classNames from 'classnames';

export default function Drawing({ className }: { className?: string }) {
  const [uploading, setUploading] = useState(false);

  return (
    <DrawingContextProvider>
      <DrawingCanvas className={className} />
      <DrawingToolbar uploading={uploading} setUploading={setUploading} />
      <Transition state={uploading} timeout={300}>
        {(stage, shouldMount) =>
          shouldMount && (
            <div
              className={classNames(s.backdrop, stage)}
              onClick={() => setUploading(false)}
            >
              <DrawingSubmitForm setUploading={setUploading} />
            </div>
          )
        }
      </Transition>
    </DrawingContextProvider>
  );
}
