/*
 * ShowcaseType.ts
 * Author: evan kirkiles
 * Created On Wed Sep 06 2023
 * 2023 Design at Yale
 */

import { LuRows } from 'react-icons/lu';
import { defineField, defineType } from 'sanity';

const GalleryType = defineType({
  name: 'pe_showcase',
  type: 'object' as const,
  title: 'Showcase',
  description:
    'A scrolling full-bleed display of assets, with an optional legend to show for jumping to items.',
  icon: LuRows,
  fields: [
    defineField({
      name: 'assets',
      title: 'Assets',
      type: 'array' as const,
      of: [{ type: 'reference' as const, to: [{ type: 'project' }] }],
      description: 'Assets to display in the gallery.',
    }),
    defineField({
      name: 'show_legend',
      title: 'Show legend?',
      description:
        'If true, displays a list of items to jump to next to the portfolio.',
      type: 'boolean' as const,
      validation: (Rule) => Rule.required(),
      codegen: { required: true },
    }),
    defineField({
      name: 'copy',
      title: 'Copy',
      description: '(Optional) Copy to display above the gallery legend.)',
      type: 'array' as const,
      of: [{ type: 'block' }],
    }),
  ],
});

export default GalleryType;
