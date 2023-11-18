import { Kysely } from 'kysely';

const BASE_PROMPT_ID = '501bf4f3-ebfb-43bd-b882-ae2bf23fcd38';

export async function up(db: Kysely<any>): Promise<void> {
  await db.schema
    .alterTable('sketches')
    .addColumn('temp_prompt_id', 'varchar(255)', (cb) =>
      cb.notNull().defaultTo(BASE_PROMPT_ID)
    )
    .execute();
  await db.schema.alterTable('sketches').dropColumn('prompt_id').execute();
  await db.schema
    .alterTable('sketches')
    .renameColumn('temp_prompt_id', 'prompt_id')
    .execute();
  // also change the bigints columns to integers
  await db.schema
    .alterTable('sketches')
    .alterColumn('width', (c) => c.setDataType('int2'))
    .alterColumn('height', (c) => c.setDataType('int2'))
    .execute();
}

export async function down(db: Kysely<any>): Promise<void> {
  await db.schema
    .alterTable('sketches')
    .addColumn('temp_prompt_id', 'integer', (cb) => cb.notNull().defaultTo(0))
    .execute();
  await db.schema.alterTable('sketches').dropColumn('prompt_id').execute();
  await db.schema
    .alterTable('sketches')
    .renameColumn('temp_prompt_id', 'prompt_id')
    .execute();
  // change the bigints columns back integers
  await db.schema
    .alterTable('sketches')
    .alterColumn('width', (c) => c.setDataType('integer'))
    .alterColumn('height', (c) => c.setDataType('integer'))
    .execute();
}
