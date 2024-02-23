/*
 * Socials.ts
 * Author: Evan Kirkiles
 * Created On Sat Dec 09 2023
 * 2023 Design at Yale
 */

import {
  FiCompass,
  FiFacebook,
  FiInstagram,
  FiMail,
  FiTwitter,
} from 'react-icons/fi';
import { defineField, defineType } from 'sanity';

const FB_REGEX =
  /(?:https?:\/\/)?(?:www\.)?(?:facebook|fb|m\.facebook)\.(?:com|me)\/(?:(?:\w)*#!\/)?(?:pages\/)?(?:[\w\-]*\/)*([\w\-\.]+)(?:\/)?/i;

const SocialInstagram = defineType({
  name: 'social_instagram',
  type: 'object' as const,
  title: 'Instagram',
  icon: FiInstagram,
  fields: [
    defineField({
      name: 'username',
      type: 'string' as const,
      title: 'Username',
      validation: (Rule) => Rule.required(),
      codegen: { required: true },
    }),
  ],
  preview: {
    select: {
      title: 'username',
    },
    prepare({ title }) {
      return {
        title: `@${title}`,
      };
    },
  },
});

const SocialFacebook = defineType({
  name: 'social_facebook',
  type: 'object' as const,
  title: 'Facebook',
  icon: FiFacebook,
  fields: [
    defineField({
      name: 'link',
      type: 'url' as const,
      title: 'Link',
      validation: (Rule) => Rule.required(),
      codegen: { required: true },
    }),
  ],
  preview: {
    select: {
      title: 'link',
    },
    prepare({ title }) {
      const username = title.match(FB_REGEX)?.[1];
      return {
        title: username || title,
      };
    },
  },
});

const SocialWebsite = defineType({
  name: 'social_website',
  type: 'object' as const,
  title: 'Website',
  icon: FiCompass,
  fields: [
    defineField({
      name: 'link',
      type: 'url' as const,
      title: 'Link',
      validation: (Rule) => Rule.required(),
      codegen: { required: true },
    }),
  ],
  preview: {
    select: {
      title: 'link',
    },
    prepare({ title }) {
      return {
        title: `${title}`,
      };
    },
  },
});

const SocialTwitter = defineType({
  name: 'social_twitter',
  type: 'object' as const,
  title: 'Twitter',
  icon: FiTwitter,
  fields: [
    defineField({
      name: 'username',
      type: 'string' as const,
      title: 'Username',
      validation: (Rule) => Rule.required(),
      codegen: { required: true },
    }),
  ],
  preview: {
    select: {
      title: 'username',
    },
    prepare({ title }) {
      return {
        title: `@${title}`,
      };
    },
  },
});

const SocialEmail = defineType({
  name: 'social_email',
  type: 'object' as const,
  title: 'Email',
  icon: FiMail,
  fields: [
    defineField({
      name: 'email',
      type: 'email' as const,
      title: 'Email',
      validation: (Rule) => Rule.required(),
      codegen: { required: true },
    }),
  ],
  preview: {
    select: {
      title: 'email',
    },
    prepare({ title }) {
      return {
        title,
      };
    },
  },
});

const Socials = [
  SocialInstagram,
  SocialFacebook,
  SocialTwitter,
  SocialEmail,
  SocialWebsite,
];

export default Socials;
