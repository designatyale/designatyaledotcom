/*
 * SiteHome.ts
 * Author: Evan Kirkiles
 * Created On Sat Dec 09 2023
 * 2023 Design at Yale
 */

import { HomeIcon } from '@sanity/icons';
import { defineField, defineType } from 'sanity';

export default defineType({
  name: 'site_home',
  type: 'document',
  title: 'Site Home',
  icon: HomeIcon,
  groups: [
    { name: 'content', title: 'Content', default: true },
    { name: 'seo', title: 'SEO' },
  ],
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      description: 'The title of the home page, used for SEO.',
      type: 'string' as const,
      group: 'seo',
    }),
    defineField({
      name: 'description',
      title: 'Description',
      description: 'A description of the website, used for SEO.',
      type: 'array' as const,
      of: [{ type: 'block' }],
      group: 'seo',
    }),
  ],
  preview: {
    prepare() {
      return {
        title: 'Landing Page',
      };
    },
  },
});
