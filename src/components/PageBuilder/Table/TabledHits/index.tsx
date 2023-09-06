/*
 * index.tsx
 * Author: evan kirkiles
 * Created On Tue Sep 05 2023
 * 2023 Design at Yale
 */

import TagPill from '@/components/TagPill';
import { DesignTag, PeTable } from '@/sanity/schema';
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  getExpandedRowModel,
  useReactTable,
} from '@tanstack/react-table';
import { useMemo, useState } from 'react';
import { useInfiniteHits } from 'react-instantsearch';
import s from './TabledHits.module.scss';
import { AlgoliaMember } from '@/util/algolia';

type TabledHitsProps<T = PeTable['asset_type']> = {
  value: Omit<PeTable, 'asset_type'> & { asset_type: T };
} & Parameters<typeof useInfiniteHits>[0];

export default function TabledHits<T = PeTable['asset_type']>({
  value,
  ...props
}: TabledHitsProps<T>) {
  const { hits: data } = useInfiniteHits<AlgoliaMember>(props);

  // columns
  const columns = useMemo(() => {
    switch (value.asset_type) {
      case 'member':
        const columnHelper = createColumnHelper<AlgoliaMember>();
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
                  {value.map((tag: DesignTag) => {
                    return <TagPill key={tag._id} tag={tag} />;
                  })}
                </ul>
              );
            },
          }),
          columnHelper.accessor('class_year', {
            id: 'class_year',
            header: 'Year',
            cell: (hi) => {
              const value = hi.getValue();
              if (!value) return null;
              return (value as number).toString();
            },
          }),
        ];
      case 'events':
        return [];
    }
    return [];
  }, [value.asset_type]);

  // table creation
  const [expanded, setExpanded] = useState({});
  const table = useReactTable({
    data,
    columns,
    state: { expanded },
    enableExpanding: true,
    getCoreRowModel: getCoreRowModel(),
    getExpandedRowModel: getExpandedRowModel(),
    onExpandedChange: setExpanded,
  });
  const { rows } = table.getRowModel();

  return (
    <table id="day-table" className={s.table}>
      <thead>
        {table.getHeaderGroups().map((headerGroup) => (
          <tr key={headerGroup.id}>
            {headerGroup.headers.map((header) => (
              <th key={header.id} colSpan={header.colSpan} className={s.th}>
                {flexRender(header.column.columnDef.header, header.getContext())}
              </th>
            ))}
          </tr>
        ))}
      </thead>
      <tbody>
        {rows.map((row) => (
          <tr key={row.id}>
            {row.getVisibleCells().map((cell) => (
              <td key={cell.id} className={s.td} data-column-id={cell.column.id}>
                {flexRender(cell.column.columnDef.cell, cell.getContext())}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}
