/*
 * DoodlePrompt.ts
 * Author: Evan Kirkiles
 * Created On Fri Nov 17 2023
 * 2023 Design at Yale
 */

import { MdOutlineDraw } from 'react-icons/md';
import { defineField, defineType } from 'sanity';

const DoodlePrompt = defineType({
  name: 'doodle',
  type: 'document' as const,
  title: 'Doodle Prompt',
  description: 'Represents a prompt that people can draw on the website for!',
  icon: MdOutlineDraw,
  fields: [
    defineField({
      name: 'name',
      title: 'Prompt',
      type: 'string' as const,
      description: 'The prompt.',
      validation: (Rule) => Rule.required(),
      codegen: { required: true },
    }),
    defineField({
      name: 'link',
      title: 'Link',
      type: 'url' as const,
      description: 'An optional link for the prompt to provide more context.',
    }),
  ],
  preview: {
    select: {
      title: 'name',
      subtitle: '_createdAt',
    },
    prepare({ title, subtitle }) {
      return {
        title,
        subtitle: new Date(subtitle).toLocaleDateString('en-us', {
          dateStyle: 'long',
        }),
      };
    },
  },
});

export default DoodlePrompt;
