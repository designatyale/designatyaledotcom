/*
 * index.tsx
 * Author: evan kirkiles
 * Created On Sat Sep 02 2023
 * 2023 Design at Yale
 */
import { PeTable } from '@/sanity/schema';
import getClient from '@/sanity/client';
import groq from 'groq';
import TableContents from '@/components/PageBuilder/Table/contents';
import { searchClient } from '@/util/algolia';
import { cache } from 'react';
import { getInitialSearchState } from '@/components/PageBuilder/Table/getSearch';

export const TABLE_ITEMS_PER_PAGE = 20;

export const tableGroq = (
  additionalQuery?: string
) => groq`*[_type == $assetType ${
  additionalQuery ? `&& ${additionalQuery} &&` : ''
} && _id > $lastId] | order(_id) [0...${TABLE_ITEMS_PER_PAGE}] {
  ...,
  _type == "member" => {
    ...,
    design_tags[] ->
  }
}`;

export default async function Table({ value }: { value: PeTable }) {
  const initialState = await getInitialSearchState(value.asset_type);
  return (
    <TableContents
      value={value}
      initialState={{ [value.asset_type]: initialState }}
    />
  );
}
