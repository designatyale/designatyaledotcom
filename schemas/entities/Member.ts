/*
 * Member.ts
 * Author: evan kirkiles
 * Created On Thu Aug 31 2023
 * 2023 Design at Yale
 */

import { defineArrayMember, defineField, defineType } from 'sanity';
import pageElements from '../page';
import { FiUser } from 'react-icons/fi';
import Socials from '../types/SocialType';

const Member = defineType({
  name: 'member',
  type: 'document' as const,
  title: 'Member',
  icon: FiUser,
  groups: [
    { name: 'information', title: 'Information', default: true },
    { name: 'page', title: 'Page' },
  ],
  fields: [
    /* ------------------------------- Information ------------------------------ */

    defineField({
      name: 'name',
      type: 'string' as const,
      title: 'Name',
      validation: (Rule) => Rule.required(),
      codegen: { required: true },
      group: 'information',
      description: 'The name of the member',
    }),
    defineField({
      name: 'picture',
      type: 'image' as const,
      title: 'Image',
      description: 'A picture of the member, usually square.',
      validation: (Rule) => Rule.required(),
      codegen: { required: true },
      group: 'information',
      options: {
        metadata: ['lqip'],
      },
    }),
    defineField({
      name: 'position',
      type: 'string' as const,
      title: 'Position',
      group: 'information',
      description:
        '(Optional) What position the member occupies in the community.',
    }),
    defineField({
      name: 'about',
      type: 'array' as const,
      description: 'A short tag line for the team member.',
      title: 'About',
      of: [{ type: 'block' }],
      group: 'information',
    }),
    defineField({
      name: 'socials',
      type: 'array' as const,
      of: Socials.map(({ name }) => ({ type: name })),
      group: 'information',
      validation: (Rule) => Rule.unique(),
    }),
    defineField({
      name: 'design_tags',
      type: 'array' as const,
      title: 'Design Focuses',
      of: [{ type: 'reference', to: [{ type: 'design_tag' }] }],
      validation: (Rule) => Rule.unique().max(4),
      group: 'information',
    }),
    defineField({
      name: 'start_date',
      type: 'date' as const,
      title: 'Start Date',
      description: '(Optional) When this member joined DAY.',
      options: {
        dateFormat: 'dddd, MMMM Do YYYY,',
      },
      group: 'information',
    }),
    defineField({
      name: 'end_date',
      type: 'date' as const,
      title: 'End Date',
      description: '(Optional) When this member graduated from DAY.',
      options: {
        dateFormat: 'dddd, MMMM Do YYYY,',
      },
      group: 'information',
    }),

    /* ---------------------------------- Page ---------------------------------- */

    defineField({
      name: 'slug',
      type: 'slug' as const,
      title: 'Slug',
      group: 'page',
      description: "(Optional) A slug for the member's page on the site.",
    }),
    defineField({
      name: 'pageBuilder',
      type: 'array' as const,
      title: 'Page Builder',
      group: 'page',
      description: 'The members page on the DAY site.',
      // map all of our page elements to pageBuilder sub-types
      of: pageElements.map(({ title, name }) =>
        defineArrayMember({
          title,
          type: name,
        })
      ),
    }),

    /* ------------------------------ Revalidation ------------------------------ */

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
