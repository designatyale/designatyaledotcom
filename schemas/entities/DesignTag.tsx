/*
 * DesignTag.ts
 * Author: evan kirkiles
 * Created On Mon Sep 04 2023
 * 2023 Design at Yale
 */

import { FiTag } from 'react-icons/fi';
import { defineField, defineType } from 'sanity';

const DesignTag = defineType({
  name: 'design_tag',
  type: 'document' as const,
  title: 'Design Tag',
  description:
    'Represents a "tag" to signify and filter by different types of design.',
  icon: FiTag,
  fields: [
    defineField({
      name: 'color',
      title: 'Color',
      type: 'color',
      description: 'The color to signify this tag by.',
    }),
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string' as const,
      description: 'The title of this design tag.',
    }),
  ],
  preview: {
    select: {
      title: 'title',
      status: 'color',
    },
    prepare({ title, status }) {
      return {
        title,
        media: (
          <div
            style={{
              width: '60%',
              height: '60%',
              backgroundColor: status.hex,
            }}
          />
        ),
      };
    },
  },
});

export default DesignTag;
