/*
 * Project.ts
 * Author: evan kirkiles
 * Created On Wed Sep 06 2023
 * 2023 Design at Yale
 */

import { RiProjector2Line } from 'react-icons/ri';
import { defineArrayMember, defineField, defineType } from 'sanity';
import pageElements from '../page';
import Socials from '../types/SocialType';

const Project = defineType({
  name: 'project',
  type: 'document' as const,
  title: 'Project',
  icon: RiProjector2Line,
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
      description: 'The name of the project',
    }),
    defineField({
      name: 'picture',
      type: 'image' as const,
      title: 'Hero Image',
      description: 'A hero picture of the project.',
      validation: (Rule) => Rule.required(),
      codegen: { required: true },
      group: 'information',
      options: {
        metadata: ['lqip'],
      },
    }),
    defineField({
      name: 'pictures',
      type: 'array' as const,
      of: [
        {
          type: 'image' as const,
          options: {
            metadata: ['lqip'],
          },
        },
      ],
      title: 'Additional Images',
      description: 'Additional pictures of the project',
      group: 'information',
    }),
    defineField({
      name: 'about',
      type: 'array' as const,
      description: 'A short tag line for the project.',
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
      name: 'date',
      type: 'string' as const,
      title: 'Date',
      description: 'When did this project take place?',
      group: 'information',
    }),

    /* ---------------------------------- Page ---------------------------------- */

    defineField({
      name: 'slug',
      type: 'slug' as const,
      title: 'Slug',
      group: 'page',
      description: "(Optional) A slug for the project's page on the site.",
    }),
    defineField({
      name: 'pageBuilder',
      type: 'array' as const,
      title: 'Page Builder',
      group: 'page',
      description: "The project's page on the DAY site.",
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

export default Project;
