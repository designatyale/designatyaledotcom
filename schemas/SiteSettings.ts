/*
 * SiteSettings.ts
 * Author: evan kirkiles
 * Created On Sun Aug 27 2023
 * 2023 Design at Yale
 */

import { SchemaTypeDefinition, defineField } from 'sanity';

const SiteSettings: SchemaTypeDefinition<'document'> = {
  name: 'site_settings',
  type: 'document',
  title: 'Site Settings',
  fields: [
    defineField({
      name: 'title',
      type: 'string' as const,
      title: 'Site Title',
      description:
        'The name of the site (what shows in tab bar). Should be under 66 characters.',
    }),
    defineField({
      name: 'description',
      type: 'string' as const,
      title: 'Site Description',
    }),
    defineField({
      name: 'instagram',
      type: 'string' as const,
      title: 'Instagram Link',
    }),
    defineField({
      name: 'twitter',
      type: 'string' as const,
      title: 'Twitter Link',
    }),
    defineField({
      name: 'facebook',
      type: 'string' as const,
      title: 'Facebook Link',
    }),
    defineField({
      name: 'contact_email',
      type: 'string' as const,
      title: 'Contact Email',
    }),
  ],
};

export default SiteSettings;
