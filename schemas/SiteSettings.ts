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
  fieldsets: [{ name: 'SEO', title: 'SEO'}, { name: 'Homepage', title: 'Homepage' }],
  fields: [
    defineField({
      name: 'title',
      type: 'string' as const,
      title: 'Site Title',
      fieldset: 'SEO',
      description:
        'The name of the site (what shows in tab bar). Should be under 66 characters.',
    }),
    defineField({
      name: 'description',
      type: 'string' as const,
      title: 'Site Description',
      description: 'A short description of the site for SEO purposes. Should be under 160 characters.',
      fieldset: 'SEO',
    }),
    defineField({
      name: 'featuredEvent',
      type: 'reference' as const,
      title: 'Featured Event',
      description: 'An event to feature on the homepage—this should have all of the corresponding feature fields filled out (full bleed image, featured title, etc.)',
      fieldset: 'Homepage',
      to: [{ type: 'event' }],
    }),
  ],
};

export default SiteSettings;
