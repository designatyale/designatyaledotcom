/*
 * index.ts
 * author: Evan Kirkiles
 * created on Sun Nov 19 2023
 * 2023 Design at Yale
 */

import { SchemaTypeDefinition, defineArrayMember } from 'sanity';

const BlockElements: SchemaTypeDefinition[] = [];

export const BlockEditorElementsArray = [
  ...BlockElements.map(({ name }) => defineArrayMember({ type: name })),
  defineArrayMember({
    type: 'image',
    // Replace the preview of all block images
    // with the edit form for that image, bypassing
    // the modal step.
    // components: {
    //   inlineBlock: (props) => {
    //     return props.renderDefault({
    //       ...props,
    //       renderPreview: () => props.children,
    //     });
    //   },
    // },
  }),
  defineArrayMember({
    type: 'block' as const,
    marks: {
      decorators: [
        { title: 'Strong', value: 'strong' },
        { title: 'Emphasis', value: 'em' },
        { title: 'Code', value: 'code' },
      ],
    },
  }),
];

export default BlockElements;
