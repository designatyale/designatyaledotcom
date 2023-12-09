/*
 * uploadSketch.ts
 * Author: Evan Kirkiles
 * Created On Fri Nov 17 2023
 * 2023 Design at Yale
 */
'use server';

import { put } from '@vercel/blob';
import { z } from 'zod';
import { db } from '@/lib/kysely';
import { randomUUID } from 'crypto';

const sketchSchema = z.object({
  name: z.string(),
  email: z.string(),
  prompt_id: z.string(),
  width: z.coerce.number(),
  height: z.coerce.number(),
  dark_mode: z.coerce.boolean(),
});

/**
 * Creates the sketch as an SVG in the Postgres blob store, and creates an
 * entry for the sketch in the Postgres table.
 */
export default async function uploadSketch(formData: FormData) {
  const parsed = sketchSchema.parse({
    name: formData.get('name'),
    email: formData.get('email'),
    prompt_id: formData.get('prompt-id'),
    width: formData.get('width'),
    height: formData.get('height'),
    dark_mode: formData.get('dark-mode'),
  });
  console.log(`Received sketch from: ${parsed.name} <${parsed.email}>`);

  // upload the blob SVG
  const blob = formData.get('image_svg') as File;
  const identifier = randomUUID().substring(0, 20);
  const uploadedFile = await put(`${identifier}.svg`, blob, {
    access: 'public',
  });

  // insert the data into Kysely once the blob has been uploaded
  const sketch = await db
    .insertInto('sketches')
    .values({
      ...parsed,
      image_pathname: uploadedFile.pathname,
      image_url: uploadedFile.url,
    })
    .execute();

  // return data
  return { success: true, sketch };
}
