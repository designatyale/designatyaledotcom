/*
 * env.ts
 * Author: evan kirkiles
 * Created On Sun Aug 27 2023
 * 2023 Design at Yale
 *
 * A file to declare required .env variables for your app. Some standard ones
 * (for using Sanity with Next.js) have been defined already for you.
 */

export const NODE_ENV = process.env.NODE_ENV!;

// Should be the domain you want to host your site at, for generating metadata
// as well as sitemaps.
export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ||
  process.env.VERCEL_URL ||
  'http://localhost:3000';

// Sanity-specific variables [public]
export const SANITY_PROJECT_ID = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!;
export const SANITY_DATASET = process.env.NEXT_PUBLIC_SANITY_DATASET!;
export const SANITY_API_VERSION = process.env.NEXT_PUBLIC_SANITY_API_VERSION!;
// Sanity-specific variables [private]
export const SANITY_WEBHOOK_SECRET = process.env.SANITY_WEBHOOK_SECRET!;
export const SANITY_API_READ_TOKEN = process.env.SANITY_API_READ_TOKEN;

// GA4 Google tag id (e.g. G-XXXXXXXXXX)
export const GA4_TAG = process.env.NEXT_PUBLIC_GA4_TAG;

// Algolia stuff
export const ALGOLIA_APP_ID = process.env.NEXT_PUBLIC_ALGOLIA_APP_ID!;
export const ALGOLIA_SEARCH_API_KEY =
  process.env.NEXT_PUBLIC_ALGOLIA_SEARCH_API_KEY!;
export const ALGOLIA_ADMIN_API_KEY = process.env.ALGOLIA_ADMIN_API_KEY!;

// Shitty auth for sketch endpoint
export const API_BACKEND_SECRET = process.env.NEXT_PUBLIC_BACKEND_API_SECRET!;
