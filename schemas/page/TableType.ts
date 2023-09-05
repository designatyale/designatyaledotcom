/*
 * TableType.ts
 * Author: evan kirkiles
 * Created On Sat Sep 02 2023
 * 2023 Design at Yale
 */

import { FiColumns } from 'react-icons/fi';
import { defineField, defineType } from 'sanity';

const TableType = defineType({
  name: 'pe_table',
  type: 'object' as const,
  title: 'Table',
  description:
    'A searchable table of text-based assets——generally, designers or events.',
  icon: FiColumns,
  fields: [
    defineField({
      name: 'asset_type',
      title: 'Asset Type',
      description: 'The type of assets',
      type: 'string' as const,
      initialValue: 'designers',
      options: {
        list: [
          { title: 'Members', value: 'member' },
          { title: 'Events', value: 'events' },
        ],
      },
      validation: (Rule) => Rule.required(),
      codegen: { required: true },
    }),
    defineField({
      name: 'additional_query',
      title: 'Additional Query',
      description: 'An additiional query to filter the results by.',
      type: 'string' as const,
    }),
    defineField({
      name: 'is_compact',
      title: 'Compact?',
      description: 'If true, show all rows as "compact" initially.',
      type: 'boolean' as const,
      initialValue: true,
      validation: (Rule) => Rule.required(),
      codegen: { required: true },
    }),
    defineField({
      name: 'is_searchable',
      title: 'Searchable?',
      description:
        'If true, allow searching for elements based on the "title" field.',
      type: 'boolean' as const,
      initialValue: true,
      validation: (Rule) => Rule.required(),
      codegen: { required: true },
    }),
    defineField({
      name: 'is_filterable',
      title: 'Filterable?',
      description:
        'If true, allow filtering for elements based on the "design tags" field.',
      type: 'boolean' as const,
      initialValue: true,
      validation: (Rule) => Rule.required(),
      codegen: { required: true },
    }),
  ],
});

export default TableType;
