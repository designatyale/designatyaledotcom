/*
 * index.tsx
 * Author: evan kirkiles
 * Created On Tue Sep 05 2023
 * 2023 Design at Yale
 */

import TagPill from '@/components/TagPill';
import { DesignTag, PeTable } from '@/sanity/schema';
import {
  ExpandedState,
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
import { RxCaretRight } from 'react-icons/rx';
import { PortableText } from '@portabletext/react';
import components from '@/components/PortableText';
import SOCIAL_MAP, { Social } from '@/util/socials';

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
            header: ({ table }) => (
              <button {...{ onClick: table.getToggleAllRowsExpandedHandler() }}>
                <RxCaretRight
                  style={{
                    transform: table.getIsAllRowsExpanded()
                      ? 'rotate(90deg)'
                      : '',
                  }}
                />{' '}
                Name
              </button>
            ),
            cell: ({ row, getValue }) => (
              <button
                {...{ onClick: row.getToggleExpandedHandler() }}
                style={{
                  pointerEvents: !row.getCanExpand() ? 'none' : undefined,
                }}
              >
                <RxCaretRight
                  style={{
                    transform:
                      row.getCanExpand() && row.getIsExpanded()
                        ? 'rotate(90deg)'
                        : '',
                    opacity: !row.getCanExpand() ? 0.2 : undefined,
                  }}
                />{' '}
                {getValue()}
              </button>
            ),
          }),
          columnHelper.accessor('design_tags', {
            id: 'specialties',
            header: 'Specialties',
            cell: ({ getValue }) => {
              const value = getValue();
              if (!value) return null;
              return (
                <ul>
                  {value.map((tag: DesignTag) => {
                    return <TagPill key={tag._id} tag={tag} />;
                  })}
                </ul>
              );
            },
          }),
          columnHelper.accessor('class_year', {
            id: 'class_year',
            header: 'Class',
            cell: ({ getValue }) => {
              const value = getValue();
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
  const [expanded, setExpanded] = useState<ExpandedState>({});
  const table = useReactTable({
    data,
    columns,
    state: { expanded },
    getCoreRowModel: getCoreRowModel(),
    getExpandedRowModel: getExpandedRowModel(),
    getSubRows: (row) =>
      row.about || row.socials
        ? [{ contents: row.about, links: row.socials }]
        : [],
    onExpandedChange: setExpanded,
  });

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
        {table.getRowModel().rows.map((row) => (
          <tr
            key={row.id}
            style={{
              borderBottom:
                row.getCanExpand() && row.getIsExpanded() ? 'none' : undefined,
              paddingTop: row.depth > 0 ? 0 : undefined,
            }}
          >
            {row.depth === 0 ? (
              row.getVisibleCells().map((cell) => (
                <td
                  key={cell.id}
                  className={s.td}
                  data-column-id={cell.column.id}
                  style={{
                    borderBottom:
                      row.getCanExpand() && row.getIsExpanded()
                        ? 'none'
                        : undefined,
                  }}
                >
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))
            ) : (
              <td colSpan={3} className={s.td_subrow}>
                {row.original.contents && (
                  <PortableText
                    value={row.original.contents}
                    components={components}
                  />
                )}
                {row.original.links && (
                  <ol>
                    {row.original.links.map((social: Social, i: number) => {
                      const { Icon, link, text } = SOCIAL_MAP(social);
                      return (
                        <li key={i}>
                          <a
                            href={link}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            <Icon />
                            {text}
                          </a>
                        </li>
                      );
                    })}
                  </ol>
                )}
              </td>
            )}
          </tr>
        ))}
      </tbody>
    </table>
  );
}
