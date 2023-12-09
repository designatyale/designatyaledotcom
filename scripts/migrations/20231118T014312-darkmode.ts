import { Kysely } from 'kysely';

export async function up(db: Kysely<any>): Promise<void> {
  await db.schema
    .alterTable('sketches')
    .addColumn('dark_mode', 'boolean', (cb) => cb.notNull().defaultTo(false))
    .execute();
}

export async function down(db: Kysely<any>): Promise<void> {
  await db.schema.alterTable('sketches').dropColumn('dark_mode').execute();
}
