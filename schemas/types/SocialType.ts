/*
 * SocialType.ts
 * Author: evan kirkiles
 * Created On Thu Aug 31 2023
 * 2023 Design at Yale
 */

import { defineField, defineType } from 'sanity';

const SocialType = defineType({
  name: 'social',
  type: 'object' as const,
  title: 'Social',
  description: 'A social link.',
  fields: [
    defineField({
      name: 'platform',
      type: 'string' as const,
      title: 'Platform',
      validation: (Rule) => Rule.required(),
      codegen: { required: true },
      initialValue: 'href',
      options: {
        list: ['instagram', 'facebook', 'twitter', 'email', 'href'],
      },
    }),
    defineField({
      name: 'link',
      type: 'url' as const,
      title: 'Link',
      hidden: ({ document }) => document?.platform === 'email',
    }),
    defineField({
      name: 'email',
      type: 'string' as const,
      title: 'Email',
      hidden: ({ document }) => document?.platform !== 'email',
      validation: (Rule) => Rule.email(),
    }),
  ],
});

export default SocialType;
