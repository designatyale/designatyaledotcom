/*
 * queries.ts
 * Author: Evan Kirkiles
 * Created On Sat Dec 09 2023
 * 2023 Design at Yale
 */

import { groq } from 'next-sanity';
import * as Fragment from './fragments';

export const homeQuery = groq`
  *[_type == "site_home"][0]{
    _id,
    title,
    description
  }
`;

export const pageBySlugQuery = groq`*[_type == "site_page" && slug.current == $slug][0] {
  _id,
  title,
  slug,
  pageBuilder[] {
    ...,
    ${[Fragment.PageBlocks].join(',\n')}
  }
}`;

export const settingsQuery = groq`*[_type == "site_settings"][0] {
  ...,
  nav_links[] -> {
    ...,
  },
  footer_links[] -> {
    ...,
  }
}`;
