/*
 * index.tsx
 * Author: evan kirkiles
 * Created On Tue Sep 05 2023
 * 2023 Design at Yale
 */

import { SearchBox } from 'react-instantsearch';
import s from './Search.module.scss';
import { TfiSearch, TfiClose } from 'react-icons/tfi';

let TIMER_ID: number | undefined = undefined;

interface SearchProps {
  placeholder?: string;
}

export default function Search({ placeholder }: SearchProps) {
  return (
    <SearchBox
      placeholder={placeholder}
      queryHook={(query, search) => {
        if (TIMER_ID) window.clearTimeout(TIMER_ID);
        TIMER_ID = window.setTimeout(() => search(query), 300);
      }}
      submitIconComponent={() => <TfiSearch />}
      resetIconComponent={() => <TfiClose />}
      classNames={{
        root: s.container,
        submit: s.button,
        reset: s.button,
        form: s.form,
        input: s.input,
      }}
    />
  );
}
