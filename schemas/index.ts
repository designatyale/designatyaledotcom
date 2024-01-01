/*
 * index.ts
 * Author: evan kirkiles
 * Created On Sun Aug 27 2023
 * 2023 Design at Yale
 *
 * This is the base export which exposes your Schema types to Sanity. All new
 * types and documents should be added to this array.
 */

import { SchemaTypeDefinition } from '@sanity/types';
import SitePage from './SitePage';
import PageElements from './objects/PageElements';
import BlockElements from './objects/BlockElements';
import Socials from './objects/Socials';
import Singletons from './singletons';

const schemas: SchemaTypeDefinition[] = [
  SitePage,
  ...Socials,
  ...Singletons,
  ...PageElements,
  ...BlockElements,
];

export default schemas;
