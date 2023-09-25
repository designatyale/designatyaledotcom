/*
 * socials.tsx
 * Author: Evan Kirkiles
 * Created On Mon Sep 25 2023
 * 2023 Design at Yale
 */
import { Member } from '@/sanity/schema';
import { IconType } from 'react-icons';
import { FiHome, FiInstagram, FiMail, FiTwitter } from 'react-icons/fi';

export type Social = NonNullable<Member['socials']>[number];

const SOCIAL_MAP = <T extends Social>(social: T) => {
  switch (social._type) {
    case 'social_instagram':
      return {
        Icon: FiInstagram,
        link: `https://instagram.com/${social.username}`,
        text: `@${social.username}`,
      };
    case 'social_email':
      return {
        Icon: FiMail,
        link: `mailto:${social.email}`,
        text: social.email,
      };
    case 'social_twitter':
      return {
        Icon: FiTwitter,
        link: `https://twitter.com/${social.username}`,
        text: `@${social.username}`,
      };
    case 'social_website':
      return {
        Icon: FiHome,
        link: social.link,
        text: new URL(social.link).hostname,
      };
  }
};

export default SOCIAL_MAP;
