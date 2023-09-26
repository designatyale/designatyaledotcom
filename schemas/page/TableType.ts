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
  initialValue: {
    asset_type: 'member',
    date_filter: 'all',
  },
  fields: [
    defineField({
      name: 'asset_type',
      title: 'Algolia Index Name',
      description: 'The name of the Algolia index to pull results from.',
      type: 'string' as const,
      initialValue: 'member',
      options: {
        list: [
          { title: 'Members', value: 'member' },
          { title: 'Events', value: 'event' },
        ],
        layout: 'radio',
      },
      validation: (Rule) => Rule.required(),
      codegen: { required: true },
    }),
    defineField({
      name: 'date_filter',
      title: 'Date Filter',
      description:
        'How to filter the events displayed in this table, based on the current date.',
      type: 'string' as const,
      options: {
        list: [
          { title: 'All', value: 'all' },
          { title: 'Upcoming', value: 'upcoming' },
          { title: 'Past', value: 'past' },
        ],
        layout: 'radio',
      },
      hidden: ({ parent }) => parent.asset_type !== 'event',
      validation: (Rule) => Rule.required(),
      codegen: { required: true },
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
        'If true, allow searching for elements based on their textual information.',
      type: 'boolean' as const,
      initialValue: true,
      validation: (Rule) => Rule.required(),
      codegen: { required: true },
    }),
    defineField({
      name: 'search_placeholder',
      title: 'Search Placeholder',
      description: "A placeholder string for the table's search bar.",
      type: 'string' as const,
      hidden: ({ parent }) => !parent.is_searchable,
      placeholder: 'E.g. Search for a designer...',
    }),
    defineField({
      name: 'is_filterable',
      title: 'Filterable?',
      description:
        'If true, allow filtering for elements based on Algolia-defined facets.',
      type: 'boolean' as const,
      initialValue: true,
      validation: (Rule) => Rule.required(),
      codegen: { required: true },
    }),
  ],
});

export default TableType;
