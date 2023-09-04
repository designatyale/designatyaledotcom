/*
 * SocialType.ts
 * Author: evan kirkiles
 * Created On Thu Aug 31 2023
 * 2023 Design at Yale
 */

import { FiCompass, FiInstagram, FiMail, FiTwitter } from 'react-icons/fi';
import { defineField, defineType } from 'sanity';

const InstagramType = defineType({
  name: 'social_instagram',
  type: 'object' as const,
  title: 'Instagram',
  icon: FiInstagram,
  fields: [
    defineField({
      name: 'username',
      type: 'string' as const,
      title: 'Username',
    }),
  ],
});

const WebsiteType = defineType({
  name: 'social_website',
  type: 'object' as const,
  title: 'Website',
  icon: FiCompass,
  fields: [
    defineField({
      name: 'link',
      type: 'url' as const,
      title: 'Link',
    }),
  ],
});

const TwitterType = defineType({
  name: 'social_twitter',
  type: 'object' as const,
  title: 'Twitter',
  icon: FiTwitter,
  fields: [
    defineField({
      name: 'username',
      type: 'string' as const,
      title: 'Username',
    }),
  ],
});

const EmailType = defineType({
  name: 'social_email',
  type: 'object' as const,
  title: 'Email',
  icon: FiMail,
  fields: [
    defineField({
      name: 'email',
      type: 'email' as const,
      title: 'Email',
    }),
  ],
});

const Socials = [InstagramType, WebsiteType, TwitterType, EmailType];

export default Socials;
