/*
 * index.tsx
 * Author: evan kirkiles
 * Created On Wed Sep 06 2023
 * 2023 Design at Yale
 */

import { UseRefinementListProps, useRefinementList } from 'react-instantsearch';
import s from './RefinementList.module.scss';
import { TagPillCheckbox } from '@/components/TagPill';

interface RefinementListProps extends UseRefinementListProps {
  component?: (props: {
    item: ReturnType<typeof useRefinementList>['items'][0];
  }) => JSX.Element;
  searchable?: boolean;
  searchablePlaceholder?: string;
}

export default function RefinementList({
  component,
  searchable,
  searchablePlaceholder,
  ...props
}: RefinementListProps) {
  const {
    items,
    refine,
    searchForItems,
    canToggleShowMore,
    isShowingMore,
    toggleShowMore,
  } = useRefinementList(props);

  return (
    <>
      {searchable && (
        <input
          type="search"
          autoComplete="off"
          autoCorrect="off"
          autoCapitalize="off"
          spellCheck={false}
          maxLength={512}
          placeholder={searchablePlaceholder}
          className={s.search}
          onChange={(event) => searchForItems(event.currentTarget.value)}
        />
      )}
      <ul className={s.ul}>
        {items.map((item) => (
          <TagPillCheckbox refine={refine} item={item} key={item.label} />
        ))}
      </ul>
      {canToggleShowMore && (
        <button
          className={s.showmore}
          onClick={toggleShowMore}
          disabled={!canToggleShowMore}
        >
          {isShowingMore ? 'Show less' : 'Show more'}
        </button>
      )}
    </>
  );
}
