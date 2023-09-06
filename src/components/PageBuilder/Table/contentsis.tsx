/*
 * contentsis.tsx
 * Author: evan kirkiles
 * Created On Tue Sep 05 2023
 * 2023 Design at Yale
 */
'use client';

import { FacetDropdown } from '@/components/PageBuilder/Table/FacetDropdown';
import { PeTable } from '@/sanity/schema';
import { searchClient } from '@/util/algolia';
import { InstantSearch, RefinementList } from 'react-instantsearch';
import s from './Table.module.scss';
import Search from '@/components/PageBuilder/Table/Search';
import TabledHits from '@/components/PageBuilder/Table/TabledHits';

const closeOnChange = () => window.innerWidth > 375;

interface TableContentsProps<T = PeTable['asset_type']> {
  value: Omit<PeTable, 'asset_type'> & { asset_type: T };
  initialState?: Parameters<typeof InstantSearch>[0]['initialUiState'];
}

export default function TableContents<T = PeTable['asset_type']>({
  value,
  initialState,
}: TableContentsProps<T>) {
  return (
    <InstantSearch
      initialUiState={initialState}
      searchClient={searchClient}
      indexName={value.asset_type as string | undefined}
    >
      <div className={s.container}>
        <section className={s.search_fields} role="search">
          <Search />
          <div className={s.filters}>
            <FacetDropdown
              closeOnChange={closeOnChange}
              classNames={{ root: 'my-BrandDropdown' }}
            >
              <RefinementList
                attribute="class_year"
                searchable={true}
                searchablePlaceholder="Search..."
              />
            </FacetDropdown>
            <FacetDropdown
              closeOnChange={closeOnChange}
              classNames={{ root: 'my-BrandDropdown' }}
            >
              <RefinementList
                attribute="design_tags.title"
                searchable={true}
                searchablePlaceholder="Search..."
              />
            </FacetDropdown>
          </div>
        </section>
        <TabledHits value={value} />
      </div>
    </InstantSearch>
  );
}
