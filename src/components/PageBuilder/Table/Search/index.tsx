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

export default function Search() {
  return (
    <SearchBox
      placeholder={'Search for a designer...'}
      searchAsYouType={false}
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
