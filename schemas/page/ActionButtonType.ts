/*
 * ActionButton.ts
 * author: evan kirkiles
 * created on Mon Aug 14 2023
 * 2023 17o1 Records
 */
/*
 * ActionBar.ts
 * author: evan kirkiles
 * created on Mon Aug 14 2023
 * 2023 17o1 Records
 */

import { defineField, defineType } from 'sanity';
import { AiOutlineLink } from 'react-icons/ai';

const ActionButtonType = defineType({
  name: 'pe_action_button',
  type: 'object' as const,
  title: 'Action Button',
  icon: AiOutlineLink,
  fields: [
    defineField({
      name: 'content',
      title: 'Items',
      description:
        'The display text of the button, or an accessible name if using an SVG.',
      type: 'string' as const,
      validation: (Rule) => Rule.required(),
      codegen: { required: true },
    }),
    defineField({
      name: 'icon',
      type: 'image' as const,
      title: 'Icon',
      description:
        'An optional (preferably SVG) icon to use in place of the standard button.',
    }),
    defineField({
      name: 'href',
      title: 'URL',
      description: 'The URL this button will point to.',
      type: 'url' as const,
      validation: (Rule) =>
        Rule.required().uri({
          scheme: ['http', 'https', 'mailto', 'tel'],
          allowRelative: true,
        }),
      codegen: { required: true },
    }),
  ],
});

export default ActionButtonType;
