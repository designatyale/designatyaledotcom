/*
 * NewsletterSignUpType.ts
 * Author: Evan Kirkiles
 * Created On Thu Sep 28 2023
 * 2023 Design at Yale
 */

import { HiOutlineNewspaper } from 'react-icons/hi2';
import { defineField, defineType } from 'sanity';

const NewsletterSignUpType = defineType({
  name: 'pe_nlsignup',
  type: 'object' as const,
  title: 'Newsletter Signup',
  description: 'A form for signing up for the DAY newsletter.',
  icon: HiOutlineNewspaper,
  fields: [
    defineField({
      name: 'copy',
      title: 'Copy',
      type: 'string' as const,
      description:
        'Text to display above the newsletter signup form. (Optional)',
    }),
    defineField({
      name: 'placeholder',
      title: 'Placeholder',
      type: 'string' as const,
      initialValue: 'Your email...',
      description: 'Placeholder text for the email input field.',
    }),
  ],
});

export default NewsletterSignUpType;
