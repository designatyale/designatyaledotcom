/*
 * index.tsx
 * Author: Evan Kirkiles
 * Created On Fri Nov 17 2023
 * 2023 Design at Yale
 */
import s from './DrawingSubmitForm.module.scss';
import { useEffect, useReducer, useRef, useState } from 'react';
import { VscClose } from 'react-icons/vsc';
import Pencil from '@/assets/svg/Pencil';
import uploadSketch from '@/components/Drawing/DrawingSubmitForm/uploadSketch';
import { useDrawingContext } from '@/components/Drawing/DrawingContext';
import { experimental_useFormStatus } from 'react-dom';
import { Transition } from 'transition-hook';
import classNames from 'classnames';
import useColorScheme from '@/hooks/useColorScheme';

interface DrawingToolbarProps {
  setUploading: (a0: boolean) => void;
}

type LoadStatus = 'success' | 'loading' | 'error';

export default function DrawingSubmitForm({
  setUploading,
}: DrawingToolbarProps) {
  const { canvasRef, dimensions, prompt } = useDrawingContext();
  const {
    colorScheme: { evalScheme },
  } = useColorScheme();
  const [status, setStatus] = useState<LoadStatus | null>(null);

  // add the image from the canvas to the file input on mount
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  useEffect(() => {
    if (!fileInputRef.current || !canvasRef.current) return;
    let isSubscribed = true;
    canvasRef.current.exportSvg().then((data) => {
      if (!isSubscribed || !fileInputRef.current) return;
      let fileName = 'day_sketch.svg';
      let file = new File([data], fileName, {
        type: 'image/svg',
        lastModified: new Date().getTime(),
      });
      let container = new DataTransfer();
      container.items.add(file);
      fileInputRef.current.files = container.files;
    });
    return () => {
      isSubscribed = false;
    };
  }, [canvasRef]);

  // synchronize "remember me" state with storage
  const nameRef = useRef<HTMLInputElement | null>(null);
  const emailRef = useRef<HTMLInputElement | null>(null);
  const [rememberMe, setRememberMe] = useReducer(
    (_: boolean, action: boolean) => {
      if (action) {
        // when remember me is enabled, save info to local storage
        localStorage.setItem('day-sketch-form-remembered', 'y');
        localStorage.setItem(
          'day-sketch-form-info',
          JSON.stringify({
            name: nameRef?.current?.value,
            email: emailRef?.current?.value,
          })
        );
      } else {
        // otherwise, remove the information
        localStorage.removeItem('day-sketch-form-remembered');
        localStorage.removeItem('day-sketch-form-info');
      }
      return action;
    },
    !!localStorage.getItem('day-sketch-form-remembered') || false
  );
  useEffect(() => {
    if (rememberMe) {
      const creds = JSON.parse(
        localStorage.getItem('day-sketch-form-info') || '{}'
      );
      if (creds['name'] && nameRef.current)
        nameRef.current.value = creds['name'];
      if (creds['email'] && emailRef.current)
        emailRef.current.value = creds['email'];
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const innerWidth = dimensions?.current?.innerWidth || 0;
  const innerHeight = dimensions?.current?.innerHeight || 0;

  return (
    <form
      className={s.form}
      onClick={(e) => {
        e.stopPropagation();
        return false;
      }}
      onSubmit={() => {
        setStatus('loading');
        setRememberMe(rememberMe);
      }}
      action={async (e) => {
        try {
          const results = await uploadSketch(e);
          setStatus('success');
          canvasRef.current?.resetCanvas();
          setUploading(false);
        } catch (e) {
          console.error(e);
          setStatus('error');
        }
      }}
    >
      <Pencil role="img" className={s.pencil} />
      <button
        className={s.submit_close}
        onClick={(e) => {
          e.stopPropagation();
          e.preventDefault();
          setUploading(false);
          return false;
        }}
      >
        <VscClose />
      </button>
      <h2>DAY Doodle Slip</h2>
      <p>Fill out the form below to send us your doodle!</p>
      <div className={s.field_row}>
        <label htmlFor="day-sketch-submit-name">Name</label>
        <input
          type="text"
          id="day-sketch-submit-name"
          name="name"
          ref={nameRef}
          required
        />
      </div>
      <div className={s.field_row}>
        <label htmlFor="day-sketch-submit-email">Email</label>
        <input
          type="email"
          id="day-sketch-submit-email"
          name="email"
          ref={emailRef}
          required
        />
      </div>
      <div className={s.field_row}>
        <label>Prompt</label>
        <input
          type="text"
          name="display-prompt-name"
          value={`"${prompt.name}"`}
          readOnly
        />
      </div>
      <div className={s.field_row}>
        <label>Size</label>
        <input
          type="text"
          value={`${innerWidth}x${innerHeight}px`}
          name="display-prompt-dimensions"
          readOnly
        />
        <label>Colors</label>
        <input
          type="text"
          value={evalScheme === 'dark' ? 'Dark' : 'Light'}
          name="display-color-scheme"
          readOnly
        />
      </div>
      <input type="submit" value="Submit" tabIndex={0} />
      {/* Hidden inputs for metadata stuff */}
      <input
        type="file"
        readOnly
        ref={fileInputRef}
        name="image_svg"
        className={s.hidden_input}
      />
      <input
        type="number"
        value={innerWidth}
        name="width"
        readOnly
        className={s.hidden_input}
      />
      <input
        type="number"
        value={innerHeight}
        name="height"
        readOnly
        className={s.hidden_input}
      />
      <input
        type="number"
        value={prompt.id}
        name="prompt-id"
        readOnly
        className={s.hidden_input}
      />
      <input
        type="text"
        value={'dark'}
        name="color-scheme"
        readOnly
        className={s.hidden_input}
      />
      <div className={s.field_additional}>
        <label htmlFor="day-sketch-remembered">Remember Me?</label>
        <input
          type="checkbox"
          id="day-sketch-remembered"
          checked={rememberMe}
          onChange={(e) => setRememberMe(!rememberMe)}
        />
        <div>{new Date().toLocaleString()}</div>
      </div>
      <Transition state={status === 'loading'} timeout={300}>
        {(stage, shouldMount) =>
          shouldMount && (
            <div className={classNames(s.load_overlay, stage)}>Loading...</div>
          )
        }
      </Transition>
    </form>
  );
}
