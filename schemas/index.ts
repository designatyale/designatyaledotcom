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
import pageElements from './page';
import Member from './entities/Member';
import SiteSettings from './SiteSettings';
import subTypes from './types';
import DesignTag from './entities/DesignTag';
import Project from './entities/Project';
import Event from './entities/Event';

const schemas: SchemaTypeDefinition[] = [
  DesignTag,
  Event,
  Member,
  Project,
  SiteSettings,
  SitePage,
  ...pageElements,
  ...subTypes,
];

export default schemas;
