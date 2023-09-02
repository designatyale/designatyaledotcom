/*
 * GalleryType.ts
 * Author: evan kirkiles
 * Created On Sat Sep 02 2023
 * 2023 Design at Yale
 */

import { FiGrid } from 'react-icons/fi';
import { defineField, defineType } from 'sanity';

const GalleryType = defineType({
  name: 'pe_gallery',
  type: 'object' as const,
  title: 'Gallery',
  description:
    'A grid-like display of assets. Note that this should only contain assets with directly correlated media, e.g. members or posters. Any other assets will not appear.',
  icon: FiGrid,
  fields: [
    defineField({
      name: 'layout',
      title: 'Layout',
      description: 'The type of layout.',
      type: 'string' as const,
      options: {
        list: [{ title: 'Columnar', value: 'columnar' }],
      },
      initialValue: 'Grid',
      validation: (Rule) => Rule.required(),
      codegen: { required: true },
    }),
    defineField({
      name: 'assets',
      title: 'Assets',
      type: 'array' as const,
      of: [{ type: 'reference' as const, to: [{ type: 'member' }] }],
      description: 'Assets to display in the gallery.',
      validation: (Rule) => Rule.required(),
      codegen: { required: true },
    }),
    defineField({
      name: 'copy',
      title: 'Copy',
      description: '(Optional) Copy to display next to or above the gallery.)',
      type: 'array' as const,
      of: [{ type: 'block' }],
      validation: (Rule) => Rule.required(),
      codegen: { required: true },
    }),
  ],
});

export default GalleryType;
