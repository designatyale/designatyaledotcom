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
import { InstantSearch, useHitsPerPage } from 'react-instantsearch';
import s from './Table.module.scss';
import Search from '@/components/PageBuilder/Table/Search';
import TabledHits from '@/components/PageBuilder/Table/TabledHits';
import RefinementList from '@/components/PageBuilder/Table/RefinementList';

const closeOnChange = () => false;

interface TableContentsProps<T = PeTable['asset_type']> {
  value: Omit<PeTable, 'asset_type'> & { asset_type: T };
  initialState?: Parameters<typeof InstantSearch>[0]['initialUiState'];
}

function FakeHitsPerPage(props: Parameters<typeof useHitsPerPage>[0]) {
  useHitsPerPage(props);
  return null;
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
      <FakeHitsPerPage
        items={[{ label: '20 items per page.', value: 20, default: true }]}
      />
      <div className={s.container}>
        <section className={s.search_fields} role="search">
          <Search placeholder="Find a student designer..." />
          <div className={s.filters}>
            <FacetDropdown buttonText={'Class'} closeOnChange={closeOnChange}>
              <RefinementList
                attribute="class_year"
                searchable={true}
                searchablePlaceholder="Search..."
              />
            </FacetDropdown>
            <FacetDropdown
              buttonText={'Specialty'}
              closeOnChange={closeOnChange}
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
