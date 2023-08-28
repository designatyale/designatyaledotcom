/*
 * getPreview.ts
 * Author: evan kirkiles
 * Created On Sun Aug 27 2023
 * 2023 Design at Yale
 */

import { draftMode } from "next/headers";
import { SANITY_API_READ_TOKEN } from "@/env";

/**
 * If draft mode is enabled, returns an object with the Sanity API read token.
 * This is only ever called server-side.
 *
 * @returns The Sanity API read token for live queries.
 */
export default function getPreview() {
  if (!draftMode().isEnabled) return undefined;
  return { token: SANITY_API_READ_TOKEN };
}
