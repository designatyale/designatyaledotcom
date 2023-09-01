/*
 * SitePage.ts
 * Author: evan kirkiles
 * Created On Sun Aug 27 2023
 * 2023 Design at Yale
 */

import { defineArrayMember, defineField, defineType } from 'sanity';
import pageElements from './page';
import { groq } from 'next-sanity';

const SitePage = defineType({
  name: 'site_page',
  type: 'document' as const,
  title: 'Site Page',
  groups: [
    { name: 'content', title: 'Content', default: true },
    { name: 'subpages', title: 'Subroutes' },
    { name: 'seo', title: 'SEO' },
  ],
  fields: [
    defineField({
      name: 'title',
      type: 'string' as const,
      title: 'Title',
      validation: (Rule) => Rule.required(),
      codegen: { required: true },
      description: 'The title of the page.',
      group: 'content',
    }),
    defineField({
      name: 'slug',
      type: 'slug' as const,
      title: 'Slug',
      validation: (Rule) => Rule.required(),
      codegen: { required: true },
      description: 'The path to the page on the site',
      group: 'content',
    }),
    defineField({
      name: 'pageBuilder',
      type: 'array' as const,
      title: 'Page Builder',
      description: 'Assemble your page using configurable modules.',
      group: 'content',
      validation: (Rule) => Rule.required(),
      codegen: { required: true },
      // map all of our page elements to pageBuilder sub-types
      of: pageElements.map(({ title, name }) =>
        defineArrayMember({
          title,
          type: name,
        })
      ),
    }),

    // Sub pages
    defineField({
      name: 'subpageOrder',
      type: 'array' as const,
      title: 'Subpages',
      description:
        'Order of subpages (excluding the base subpage) in the nav bar.',
      group: 'subpages',
      hidden: ({ document }) =>
        ((document?.slug as any)?.current.split('/').length || 3) > 2,
      of: [
        {
          type: 'reference' as const,
          to: [{ type: 'site_page' }],
          options: {
            filter: ({
              document,
            }: {
              document: { slug: { current: string } };
            }) => {
              return {
                filter: groq`slug.current in path($rootSlug + "/*")`,
                params: {
                  rootSlug: document.slug?.current,
                },
              };
            },
          },
        },
      ],
    }),
    defineField({
      name: 'rootSubPageTitle',
      type: 'string' as const,
      title: 'Root Subpage Title',
      description:
        'If there are existing subroutes, use this as the initial title to display in the subroute nav.',
      group: 'subpages',
      hidden: ({ document }) =>
        ((document?.slug as any)?.current.split('/').length || 3) > 2,
    }),
    defineField({
      name: 'rootSubPageBuilder',
      type: 'array' as const,
      title: 'Base Subpage',
      description:
        'If there are existing subroutes, use this as the initial view to display in the subroute mechanism.',
      group: 'subpages',
      hidden: ({ document }) =>
        ((document?.slug as any)?.current.split('/').length || 3) > 2,
      // map all of our page elements to pageBuilder sub-types
      of: pageElements.map(({ title, name }) =>
        defineArrayMember({
          title,
          type: name,
        })
      ),
    }),

    /* -------------------------------- SEO Types ------------------------------- */

    defineField({
      name: 'seo_title',
      type: 'string' as const,
      title: 'SEO Title',
      group: 'seo',
      description:
        "An SEO title (appears in the tab bar). If unset, uses the page's title.",
    }),
    defineField({
      name: 'seo_description',
      type: 'string' as const,
      title: 'SEO Description',
      group: 'seo',
      description:
        "An SEO description. If unset, uses text from the page's content.",
    }),
    defineField({
      name: 'seo_keywords',
      type: 'string' as const,
      title: 'SEO Keywords',
      group: 'seo',
      description: 'SEO keywords.',
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
  preview: {
    select: {
      title: 'slug.current',
    },
  },
});

export default SitePage;
