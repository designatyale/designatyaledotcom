/*
 * groq.ts
 * Author: evan kirkiles
 * Created On Sun Aug 27 2023
 * 2023 Design at Yale
 *
 * Define any shared GROQs you'll have to use here. These can get quite huge
 * with a lot of references to expand.
 */

import { groq } from 'next-sanity';

export const pagesQuery = groq`*[_type == "site_page" && slug.current != "/"] {
  _id, slug
}`;

export const pageQuery = groq`*[_type == "site_page" && slug.current == $pageSlug][0] {
  _id,
  title,
  pageBuilder[] {
    ...,
    _type == "pe_gallery" || _type == "pe_showcase" => {
      ...,
      assets[] -> {
        ...,
        _type == "member" || _type == "project" => {
          ...,
          picture {
            ...,
            asset ->
          }
        }
      }
    }
  },
  subpageOrder[] -> ,
  rootSubPageTitle,
  rootSubPageBuilder[] {
    ...,
    _type == "pe_gallery" || _type == "pe_showcase" => {
      ...,
      assets[] -> {
        ...,
        _type == "member" || _type == "project" => {
          ...,
          picture {
            ...,
            asset ->
          }
        }
      }
    }
  }
}`;

export const subpageQuery = groq`*[_type == "site_page" && slug.current match ($pageSlug + "/*") && slug.current != $pageSlug] {
  _id, title, slug
}`;
