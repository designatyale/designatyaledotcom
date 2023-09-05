/*
 * index.tsx
 * Author: evan kirkiles
 * Created On Tue Sep 05 2023
 * 2023 Design at Yale
 */
'use client';

import { useEffect, useId, useState } from 'react';
import { connectSearchBox } from 'react-instantsearch-dom';
import s from './SearchBox.module.scss';
import { useDebounce } from '@uidotdev/usehooks';

export default connectSearchBox(function SearchBox({ refine, isSearchStalled }) {
  const searchId = useId();
  const [searchTerm, setSearchTerm] = useState('');
  const debouncedSearchTerm = useDebounce(searchTerm, 500);
  useEffect(() => {
    if (debouncedSearchTerm) {
      refine(searchTerm);
    } else {
      refine('');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedSearchTerm, refine]);

  return (
    <fieldset className={s.container}>
      <legend>Search</legend>
      <label htmlFor={`${searchId}-search`}>Search: </label>
      <input
        id={`${searchId}-search`}
        type="search"
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      {isSearchStalled && 'Search stalled.'}
    </fieldset>
  );
});
