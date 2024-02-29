/*
 * Event.tsx
 * Author: Evan Kirkiles
 * Created On Mon Sep 25 2023
 * 2023 Design at Yale
 */

import { FiCalendar, FiTag } from 'react-icons/fi';
import { defineArrayMember, defineField, defineType } from 'sanity';
import pageElements from '../page';

const Event = defineType({
  name: 'event',
  type: 'document' as const,
  title: 'Event',
  icon: FiCalendar,
  groups: [
    { name: 'information', title: 'Information', default: true },
    { name: 'featured', title: 'Featured' },
  ],
  fields: [
    /* ------------------------------- Information ------------------------------ */

    defineField({
      name: 'title',
      type: 'string' as const,
      title: 'Title',
      validation: (Rule) => Rule.required(),
      codegen: { required: true },
      group: 'information',
      description: 'The title of the event',
    }),
    defineField({
      name: 'picture',
      type: 'image' as const,
      title: 'Image',
      description:
        'A picture to use as a promotional icon of the event—this should be square. Also note that the page this image is displayed on can have either a black or white background.',
      validation: (Rule) => Rule.required(),
      codegen: { required: true },
      group: 'information',
      options: {
        metadata: ['lqip'],
      },
    }),
    defineField({
      name: 'about',
      type: 'array' as const,
      description: 'A short description of the event.',
      title: 'About',
      of: [{ type: 'block' }],
      group: 'information',
    }),
    defineField({
      name: 'design_tags',
      type: 'array' as const,
      title: 'Design Tags',
      of: [{ type: 'reference', to: [{ type: 'design_tag' }] }],
      validation: (Rule) => Rule.unique().max(4),
      group: 'information',
    }),
    defineField({
      name: 'location',
      type: 'array' as const,
      title: 'Location',
      description:
        'Where will/did this event take place? (Keep this short, but add a link to Google Maps or the Zoom meeting if possible)',
      of: [{ type: 'block' }],
      group: 'information',
    }),
    defineField({
      name: 'date',
      type: 'datetime' as const,
      title: 'Date & Time',
      description: 'When will/did this event take place?',
      group: 'information',
      options: {
        dateFormat: 'dddd, MMMM Do YYYY,',
        timeFormat: 'h:mm A',
      },
    }),
    defineField({
      name: 'calendar_link',
      type: 'url' as const,
      title: 'GCal Link',
      description: 'A link to the Google Calendar event.',
      group: 'information',
    }),
    defineField({
      name: 'more_info',
      type: 'url' as const,
      title: 'More Info Link',
      description: 'A link to any additional information.',
      group: 'information',
    }),

    /* -------------------------------- Featured -------------------------------- */

    defineField({
      name: 'featureDescription',
      type: 'array' as const,
      title: 'Featured Event Description',
      description:
        'A short event description to go on the homepage when this event is featured.',
      of: [{ type: 'block' }],
      group: 'featured',
    }),
    defineField({
      name: 'featureImages',
      type: 'array' as const,
      title: 'Featured Event Images',
      description:
        'Images to cycle through on the homepage when this event is featured.',
      of: [
        defineArrayMember({
          type: 'image' as const,
          options: {
            metadata: ['lqip'],
            hotspot: true,
          },
          fields: [
            {
              type: 'number',
              name: 'topOffset',
              title: 'Top Offset',
              description:
                'Percentage to offset the top by (0-100). Defaults to -1 (centers instead).',
              initialValue: -1,
            },
          ],
        }),
      ],
      group: 'featured',
      options: {
        layout: 'grid',
      },
    }),

    /* ------------------------------ Revalidation ------------------------------ */

    defineField({
      name: 'search_hidden',
      type: 'boolean' as const,
      title: 'Hidden from Search',
      description: 'If true, hide this event from the DAY Directory search.',
      initialValue: false,
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
  preview: {
    select: {
      title: 'title',
      date: 'date',
      media: 'picture',
    },
    prepare(selection) {
      const { title, date, media } = selection;
      return {
        title: title,
        media: media,
        subtitle: new Date(date).toLocaleString('en-us', {
          dateStyle: 'long',
          timeStyle: 'short',
        }), // YYYY-MM-DDT --> YYYY
      };
    },
  },
});

export default Event;
