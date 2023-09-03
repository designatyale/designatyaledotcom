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
import { useCallback, useMemo, useState } from 'react';
import { useInfiniteQuery } from '@tanstack/react-query';
import getClient from '@/sanity/client';
import { tableGroq } from '@/components/PageBuilder/Table';
import { Virtuoso } from 'react-virtuoso';

interface TableContentsProps<T extends PeTable['asset_type']> {
  value: PeTable & { asset_type: T };
  initialItems?: AssetType<T>[];
}

type AssetType<T extends PeTable['asset_type']> = T extends 'member'
  ? Member
  : Member;

export default function TableContents<T extends PeTable['asset_type']>({
  value,
  initialItems = [],
}: TableContentsProps<T>) {
  // data fetching
  const fetchItems = ({ pageParam = '' }): Promise<AssetType<T>[]> =>
    getClient().fetch(tableGroq(value.additional_query), {
      assetType: value.asset_type,
      lastId: pageParam,
    });
  const { data, fetchNextPage } = useInfiniteQuery(
    [value.asset_type],
    fetchItems,
    {
      initialData: {
        pages: [initialItems],
        pageParams: [initialItems[initialItems.length - 1]._id],
      },
      getNextPageParam: (lastPage) => {
        if (lastPage.length < 20) return null;
        return lastPage[lastPage.length - 1]._id;
      },
    }
  );

  // columns
  const columns = useMemo(() => {
    const columnHelper = createColumnHelper<AssetType<T>>();
    const columnList = [
      columnHelper.accessor('name' as any, {
        id: 'name',
        header: 'Name',
        cell: (props) => <div>HI</div>,
      }),
    ];
    return columnList;
  }, []);

  // rows
  const itemContent = useCallback<
    NonNullable<Parameters<typeof Virtuoso<Row<AssetType<T>>>>[0]['itemContent']>
  >((_, row) => {
    return row
      .getAllCells()
      .map((cell) => (
        <div key={cell.id}>
          {flexRender(cell.column.columnDef.cell, cell.getContext())}
        </div>
      ));
  }, []);

  // table creation
  const [expanded, setExpanded] = useState({});
  const table = useReactTable({
    data: data?.pages.flatMap((x) => x) ?? [],
    columns,
    state: { expanded },
    // initialState: { expanded: !value.is_compact },
    enableExpanding: true,
    getCoreRowModel: getCoreRowModel(),
    getExpandedRowModel: getExpandedRowModel(),
    onExpandedChange: setExpanded,
  });

  return (
    <div role="table">
      <div role="rowgroup">
        <Virtuoso
          data={table.getExpandedRowModel().rows}
          useWindowScroll={true}
          increaseViewportBy={200}
          itemContent={itemContent}
        />
      </div>
    </div>
  );
}
