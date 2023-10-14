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
import { Configure, InstantSearch, useHitsPerPage } from 'react-instantsearch';
import s from './Table.module.scss';
import Search from '@/components/PageBuilder/Table/Search';
import TabledHits from '@/components/PageBuilder/Table/TabledHits';
import RefinementList from '@/components/PageBuilder/Table/RefinementList';
import GroupedHits from '@/components/PageBuilder/Table/GroupedHits';

const closeOnChange = () => false;

interface TableContentsProps<T = PeTable['asset_type']> {
  value: Omit<PeTable, 'asset_type'> & { asset_type: T };
  initialState?: Parameters<typeof InstantSearch>[0]['initialUiState'];
}

function FakeHitsPerPage(props: Parameters<typeof useHitsPerPage>[0]) {
  useHitsPerPage(props);
  return null;
}

const ALGOLIA_FACETS: {
  [key in PeTable['asset_type']]: { attribute: string; buttonText: string }[];
} = {
  member: [
    { attribute: 'class_year', buttonText: 'Class' },
    { attribute: 'design_tags.title', buttonText: 'Specialty' },
  ],
  event: [{ attribute: 'design_tags.title', buttonText: 'Topic' }],
};

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
          {value.is_searchable && (
            <Search placeholder={value.search_placeholder} />
          )}
          {value.is_filterable && (
            <div className={s.filters}>
              {ALGOLIA_FACETS[value.asset_type as PeTable['asset_type']].map(
                ({ attribute, buttonText }) => (
                  <FacetDropdown
                    key={attribute}
                    buttonText={buttonText}
                    closeOnChange={closeOnChange}
                  >
                    <RefinementList
                      attribute={attribute}
                      searchable={true}
                      searchablePlaceholder="Search..."
                    />
                  </FacetDropdown>
                )
              )}
            </div>
          )}
        </section>
        {value.asset_type === 'event' ? (
          <GroupedHits value={value} />
        ) : (
          <TabledHits value={value} />
        )}
      </div>
    </InstantSearch>
  );
}
