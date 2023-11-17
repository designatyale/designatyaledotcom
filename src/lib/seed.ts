/*
 * seed.ts
 * Author: Evan Kirkiles
 * Created On Fri Nov 17 2023
 * 2023 Design at Yale
 */
import { db, sql } from '@/lib/kysely';

export default async function seed() {
  const createSketchTable = await db.schema
    .createTable('sketches')
    .ifNotExists()
    .addColumn('id', 'serial', (cb) => cb.primaryKey())
    .addColumn('name', 'varchar(255)', (cb) => cb.notNull())
    .addColumn('email', 'varchar(255)', (cb) => cb.notNull())
    .addColumn('image_pathname', 'varchar(255)', (cb) => cb.notNull())
    .addColumn('image_url', 'varchar(255)', (cb) => cb.notNull())
    .addColumn('width', 'integer', (cb) => cb.notNull())
    .addColumn('height', 'integer', (cb) => cb.notNull())
    .addColumn('prompt_id', 'integer', (cb) => cb.notNull())
    .addColumn('createdAt', sql`timestamp with time zone`, (cb) =>
      cb.defaultTo(sql`current_timestamp`)
    )
    .execute();
  console.log('Created `sketches` table.');
  const createPromptTable = await db.schema
    .createTable('prompts')
    .ifNotExists()
    .addColumn('id', 'serial', (cb) => cb.primaryKey())
    .addColumn('name', 'varchar(255)', (cb) => cb.notNull())
    .addColumn('createdAt', sql`timestamp with time zone`, (cb) =>
      cb.defaultTo(sql`current_timestamp`)
    )
    .execute();
  console.log('Created `prompts` table.');
  const addPrompt = await db
    .insertInto('prompts')
    .values([
      {
        id: 0,
        name: 'Anything you want!',
      },
    ])
    .execute();
  console.log('Created initial prompt table.');
  return {
    createSketchTable,
    createPromptTable,
    addPrompt,
  };
}
