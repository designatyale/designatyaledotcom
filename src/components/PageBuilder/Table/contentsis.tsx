/*
 * contentsis.tsx
 * Author: evan kirkiles
 * Created On Tue Sep 05 2023
 * 2023 Design at Yale
 */
'use client';

import { FacetDropdown } from '@/components/PageBuilder/Table/FacetDropdown';
import { Member, PeTable } from '@/sanity/schema';
import { searchClient } from '@/util/algolia';
import { Hit as AlgoliaHit } from 'instantsearch.js';
import { useId } from 'react';
import {
  DynamicWidgets,
  Highlight,
  Hits,
  InstantSearch,
  RefinementList,
  SearchBox,
} from 'react-instantsearch';
import s from './Table.module.scss';

type HitProps = {
  hit: AlgoliaHit<{
    name: string;
    price: number;
  }>;
};

const closeOnChange = () => window.innerWidth > 375;

function Hit({ hit }: HitProps) {
  return (
    <>
      <Highlight hit={hit} attribute="name" className="Hit-label" />
      <span className="Hit-price">${hit.price}</span>
    </>
  );
}

interface TableContentsProps<T = PeTable['asset_type']> {
  value: Omit<PeTable, 'asset_type'> & { asset_type: T };
  initialState?: Parameters<typeof InstantSearch>[0]['initialUiState'];
}

type AssetType<T = PeTable['asset_type']> = T extends 'member' ? Member : Member;

let TIMER_ID: number | undefined = undefined;

export default function TableContents<T = PeTable['asset_type']>({
  value,
  initialState,
}: TableContentsProps<T>) {
  const tableId = useId();

  return (
    <InstantSearch
      initialUiState={initialState}
      searchClient={searchClient}
      indexName={'designers'}
    >
      <div className={s.container}>
        <section className={s.search_fields} role="search">
          <SearchBox
            queryHook={(query, search) => {
              if (TIMER_ID) window.clearTimeout(TIMER_ID);
              TIMER_ID = window.setTimeout(() => search(query), 500);
            }}
          />
          <FacetDropdown
            closeOnChange={closeOnChange}
            classNames={{ root: 'my-BrandDropdown' }}
          >
            <RefinementList
              attribute="brand"
              searchable={true}
              searchablePlaceholder="Search..."
            />
          </FacetDropdown>
        </section>
        <Hits hitComponent={Hit} />
      </div>
    </InstantSearch>
  );
}
