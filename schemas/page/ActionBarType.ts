/*
 * ActionBar.ts
 * author: evan kirkiles
 * created on Mon Aug 14 2023
 * 2023 17o1 Records
 */

import { defineArrayMember, defineField, defineType } from 'sanity';
import { RxButton } from 'react-icons/rx';

const ActionBarType = defineType({
  name: 'pe_action_bar',
  type: 'object' as const,
  title: 'Action Bar',
  icon: RxButton,
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      description: 'An internal title for the action bar.',
      type: 'string' as const,
    }),
    defineField({
      name: 'items',
      title: 'Items',
      description: 'Action items in the bar.',
      type: 'array' as const,
      initialValue: [],
      validation: (Rule) => Rule.required(),
      codegen: { required: true },
      of: [
        defineArrayMember({
          type: 'pe_action_button',
          title: 'Action Button',
        }),
      ],
    }),
    defineField({
      name: 'flex_dir',
      title: 'Layout Direction',
      description: 'The layout flow of the action buttons',
      type: 'string' as const,
      initialValue: 'row',
      validation: (Rule) => Rule.required(),
      codegen: { required: true },
      options: {
        list: [
          { title: 'Horizontal', value: 'row' },
          { title: 'Vertical', value: 'column' },
        ],
      },
    }),
    defineField({
      name: 'justification',
      title: 'Justification',
      description: 'How the buttons are justified.',
      type: 'string',
      initialValue: 'flex-start',
      validation: (Rule) => Rule.required(),
      codegen: { required: true },
      options: {
        list: [
          { title: 'Start', value: 'flex-start' },
          { title: 'End', value: 'flex-end' },
          { title: 'Center', value: 'center' },
          { title: 'Space evenly', value: 'space-evenly' },
          { title: 'Space between', value: 'space-between' },
          { title: 'Space around', value: 'space-around' },
        ],
      },
    }),
    defineField({
      name: 'alignment',
      title: 'Alignment',
      description: 'How the buttons are aligned.',
      type: 'string',
      initialValue: 'flex-start',
      validation: (Rule) => Rule.required(),
      codegen: { required: true },
      options: {
        list: [
          { title: 'Start', value: 'flex-start' },
          { title: 'End', value: 'flex-end' },
          { title: 'Center', value: 'center' },
        ],
      },
    }),
  ],
});

export default ActionBarType;
