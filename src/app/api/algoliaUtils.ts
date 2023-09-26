/*
 * utils.ts
 * Author: Evan Kirkiles
 * Created On Mon Sep 25 2023
 * 2023 Design at Yale
 */

import { SearchClient } from 'algoliasearch';
import { SanityDocumentStub } from 'next-sanity';
import indexer from 'sanity-algolia';
import { Event } from '@/sanity/schema';

/**
 * A shared indexer for syncing Sanity documents with Algolia.
 * @param algolia An instantiated Algolia search client.
 * @returns An indexer for converting Sanity documents to Algolia entities.
 */
export default function buildSanityAlgolia(algolia: SearchClient) {
  return indexer(
    {
      member: {
        index: algolia.initIndex('member'),
        projection: `{
      name,
      slug,
      about,
      class_year,
      search_hidden,
      socials[] { ... },
      design_tags[] -> {
        _id,
        title,
        color {
          hex
        }
      }
    }`,
      },
      event: {
        index: algolia.initIndex('event'),
        projection: `{
        title,
        slug,
        "pictureUrl": picture.asset->url,
        about,
        search_hidden,
        location,
        date,
        design_tags[] -> {
          _id,
          title,
          color {
            hex
          }
        }
    }`,
      },
    },
    // Transformation function
    (document) => {
      switch (document._type) {
        case 'event':
          const { date } = document as Event;
          return {
            ...document,
            date_timestamp: date
              ? Math.floor(new Date(date).getTime() / 1000)
              : undefined,
          };
        case 'member':
        default:
          return document;
      }
    },
    // Visibility function
    (document: SanityDocumentStub) => {
      if (document.hasOwnProperty('search_hidden'))
        return !document.search_hidden;
      return true;
    }
  );
}
