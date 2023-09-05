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
  const initialItems = await getClient().fetch(
    tableGroq(value.additional_query),
    {
      assetType: value.asset_type,
      lastId: '',
    },
    { next: { tags: [`${value.asset_type}:list`] } }
  );
  console.log(initialItems);

  return <TableContents value={value} initialItems={initialItems} />;
}
