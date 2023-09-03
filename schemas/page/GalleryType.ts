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
      name: 'title',
      title: 'Title',
      type: 'string' as const,
      description: 'The title of the gallery to show above it.',
    }),
    defineField({
      name: 'assets',
      title: 'Assets',
      type: 'array' as const,
      of: [{ type: 'reference' as const, to: [{ type: 'member' }] }],
      description: 'Assets to display in the gallery.',
    }),
    defineField({
      name: 'copy',
      title: 'Copy',
      description: '(Optional) Copy to display next to or above the gallery.)',
      type: 'array' as const,
      of: [{ type: 'block' }],
    }),
  ],
});

export default GalleryType;
