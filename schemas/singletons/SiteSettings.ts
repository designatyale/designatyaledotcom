/*
 * SiteSettings.ts
 * author: evan kirkiles
 * created on Sun Aug 06 2023
 * 2023 Design at Yale
 */

import { CogIcon } from '@sanity/icons';
import { defineArrayMember, defineField, defineType } from 'sanity';
import Socials from '../objects/Socials';
import { BlockEditorElementsArray } from '../objects/BlockElements';

export default defineType({
  name: 'site_settings',
  type: 'document',
  title: 'Site Settings',
  icon: CogIcon,
  groups: [
    {
      name: 'nav',
      title: 'Navigator',
    },
    {
      name: 'footer',
      title: 'Footer',
    },
    {
      name: 'seo',
      title: 'SEO',
    },
  ],
  fields: [
    defineField({
      name: 'nav_links',
      title: 'Navigator Links',
      description: 'Links displayed on the navigator.',
      type: 'array' as const,
      group: 'nav',
      of: [
        defineArrayMember({
          title: 'Reference',
          type: 'reference',
          to: [
            {
              type: 'site_page',
            },
          ],
        }),
      ],
    }),
    defineField({
      name: 'socials',
      type: 'array' as const,
      of: Socials.map(({ name }) => ({ type: name })),
      group: 'nav',
      validation: (Rule) => Rule.unique(),
      options: {
        sortable: true,
      },
    }),
    defineField({
      name: 'footer_pane1',
      description:
        'A block of text that will be displayed at the bottom of the page.',
      title: 'Footer Pane 1',
      type: 'array' as const,
      group: 'footer',
      of: BlockEditorElementsArray,
    }),
    defineField({
      name: 'footer_links',
      title: 'Footer Links',
      description: 'Links displayed in the footer.',
      type: 'array' as const,
      group: 'footer',
      of: [
        {
          title: 'Reference',
          type: 'reference',
          to: [
            {
              type: 'site_page',
            },
          ],
        },
      ],
    }),
    defineField({
      name: 'description',
      type: 'string' as const,
      title: 'Site Description',
      group: 'seo',
    }),
  ],
  preview: {
    prepare() {
      return {
        title: 'Main Settings',
      };
    },
  },
});
