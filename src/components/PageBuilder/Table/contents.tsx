/*
 * contents.tsx
 * Author: evan kirkiles
 * Created On Sat Sep 02 2023
 * 2023 Design at Yale
 */
'use client';

import {
  Row,
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  getExpandedRowModel,
  useReactTable,
} from '@tanstack/react-table';
import { Member, PeTable } from '@/sanity/schema';
import { Fragment, useId, useMemo, useState } from 'react';
import { useInfiniteQuery } from '@tanstack/react-query';
import getClient from '@/sanity/client';
import { TABLE_ITEMS_PER_PAGE, tableGroq } from '@/components/PageBuilder/Table';
import s from './Table.module.scss';
import unwrapReference from '@/util/unwrapReference';
import TagPill from '@/components/TagPill';
import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';

interface TableContentsProps<T = PeTable['asset_type']> {
  value: Omit<PeTable, 'asset_type'> & { asset_type: T };
  initialItems?: AssetType<T>[];
}

type AssetType<T = PeTable['asset_type']> = T extends 'member' ? Member : Member;

export default function TableContents<T = PeTable['asset_type']>({
  value,
  initialItems = [],
}: TableContentsProps<T>) {
  const tableId = useId();

  // data fetching
  const { data, fetchNextPage } = useInfiniteQuery(
    [value.asset_type],
    async ({ pageParam = '' }) =>
      getClient().fetch(tableGroq(value.additional_query), {
        assetType: value.asset_type,
        lastId: pageParam,
      }),
    {
      initialData: initialItems.length
        ? {
            pages: [initialItems],
            pageParams: [initialItems[initialItems.length - 1]._id],
          }
        : undefined,
      staleTime: Infinity,
      keepPreviousData: true,
      refetchOnWindowFocus: false,
      getNextPageParam: (lastPage) => {
        if (lastPage.length < TABLE_ITEMS_PER_PAGE) return null;
        return lastPage[lastPage.length - 1]._id;
      },
    }
  );

  const flatData = useMemo(() => data?.pages?.flat() ?? [], [data]);
  const totalFetched = flatData.length;

  // columns
  const columns = useMemo(() => {
    switch (value.asset_type) {
      case 'member':
        const columnHelper = createColumnHelper<Member>();
        return [
          columnHelper.accessor('name', {
            id: 'name',
            header: 'Name',
          }),
          columnHelper.accessor('design_tags', {
            id: 'specialties',
            header: 'Specialties',
            cell: (hi) => {
              const value = hi.getValue();
              if (!value) return null;
              return (
                <ul key={hi.column.id}>
                  {value.map((val) => {
                    const tag = unwrapReference(val);
                    return <TagPill key={tag._id} tag={tag} />;
                  })}
                </ul>
              );
            },
          }),
          // columnHelper.accessor('')
        ];
      case 'events':
        return [];
    }
    return [];
  }, [value.asset_type]);

  // table creation
  const [expanded, setExpanded] = useState({});
  const table = useReactTable({
    data: flatData,
    columns,
    state: { expanded },
    // initialState: { expanded: !value.is_compact },
    enableExpanding: true,
    getCoreRowModel: getCoreRowModel(),
    getExpandedRowModel: getExpandedRowModel(),
    onExpandedChange: setExpanded,
  });
  const { rows } = table.getRowModel();

  return (
    <>
      {(value.is_filterable || value.is_searchable) && (
        <form role="search" aria-controls="#day-table">
          <fieldset className={s.search_fields}>
            <legend>Search form</legend>
            {value.is_searchable && (
              <div>
                <label htmlFor={`${tableId}-search`}>Search: </label>
                <input
                  id={`${tableId}-search`}
                  type="text"
                  placeholder="By name..."
                />
              </div>
            )}
            {value.is_filterable && (
              <div>
                <label htmlFor={`${tableId}-filter`}>Specialty: </label>
                <Dropdown
                  options={['hi', 'hi2']}
                  controlClassName={s.dropdown_control}
                />
              </div>
            )}
          </fieldset>
        </form>
      )}
      <table id="day-table" className={s.table}>
        <thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th
                  key={header.id}
                  colSpan={header.colSpan}
                  style={{ width: header.getSize() }}
                  className={s.th}
                >
                  {flexRender(
                    header.column.columnDef.header,
                    header.getContext()
                  )}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={row.id}>
              {row.getVisibleCells().map((cell) => (
                <td key={cell.id} className={s.td}>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}
