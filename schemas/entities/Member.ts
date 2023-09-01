/*
 * Member.ts
 * Author: evan kirkiles
 * Created On Thu Aug 31 2023
 * 2023 Design at Yale
 */

import { defineArrayMember, defineField, defineType } from 'sanity';
import pageElements from '../page';

const Member = defineType({
  name: 'member',
  type: 'document' as const,
  title: 'Member',
  groups: [{ name: 'page', title: 'Page' }],
  fields: [
    defineField({
      name: 'name',
      type: 'string' as const,
      title: 'Name',
      validation: (Rule) => Rule.required(),
      codegen: { required: true },
      description: 'The name of the member',
    }),
    defineField({
      name: 'slug',
      type: 'slug' as const,
      title: 'Slug',
      validation: (Rule) => Rule.required(),
      codegen: { required: true },
      description: 'The path to the page on the site',
    }),
    defineField({
      name: 'start_date',
      type: 'date' as const,
      title: 'Start Date',
      description: 'When this member joined DAY.',
      readOnly: true,
      options: {
        dateFormat: 'dddd, MMMM Do YYYY,',
      },
    }),
    defineField({
      name: 'about',
      type: 'array' as const,
      description: 'A short tag line for the team member.',
      title: 'About',
      of: [{ type: 'block' }],
    }),
    defineField({
      name: 'socials',
      type: 'array' as const,
      of: [{ type: 'social' }],
    }),
    defineField({
      name: 'pageBuilder',
      type: 'array' as const,
      title: 'Page Builder',
      group: 'page',
      description: 'Assemble your page using configurable modules.',
      validation: (Rule) => Rule.required(),
      // map all of our page elements to pageBuilder sub-types
      of: pageElements.map(({ title, name }) =>
        defineArrayMember({
          title,
          type: name,
        })
      ),
    }),

    defineField({
      name: 'last_revalidated',
      type: 'datetime' as const,
      title: 'Last Revalidated',
      description:
        'When this page was last revalidated. Re-publish or manually revalidate to change.',
      readOnly: true,
      options: {
        dateFormat: 'dddd, MMMM Do YYYY,',
        timeFormat: 'h:mm A',
      },
    }),
  ],
});

export default Member;
