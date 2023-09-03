/*
 * index.tsx
 * Author: evan kirkiles
 * Created On Sat Sep 02 2023
 * 2023 Design at Yale
 */
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  getExpandedRowModel,
  getSortedRowModel,
  useReactTable,
} from '@tanstack/react-table';
import { PeTable } from '@/sanity/schema';
import { useMemo, useState } from 'react';
import getClient from '@/sanity/client';
import groq from 'groq';
import TableContents from '@/components/PageBuilder/Table/contents';

export const tableGroq = (
  additionalQuery?: string
) => groq`*[_type == $assetType ${
  additionalQuery ? `&& ${additionalQuery} &&` : ''
} && _id > $lastId] | order(_id) [0...20] {
  ...
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
