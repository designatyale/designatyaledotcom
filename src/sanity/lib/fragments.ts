/*
 * fragments.ts
 * Author: Evan Kirkiles
 * Created On Sat Dec 09 2023
 * 2023 Design at Yale
 *
 * This file defines "fragments" similar to GraphQL fragments. Use them in your
 * GROQ queries with string interpolation for easier query building.
 */

import { groq } from 'next-sanity';

export const PageBlocks = groq`
_type == "pe_blocks" => {
  ...,
  content[] {
    ...,
    _type == "image" => {
      ...,
      asset ->
    }
  }
}`;
