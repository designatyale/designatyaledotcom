import { Kysely, sql } from 'kysely';

export async function up(db: Kysely<any>): Promise<void> {
  await db.schema
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
}

export async function down(db: Kysely<any>): Promise<void> {
  await db.schema.dropTable('sketches').execute();
}
