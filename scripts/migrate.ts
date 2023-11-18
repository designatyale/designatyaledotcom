/*
 * migrate.ts
 * Author: evan kirkiles
 * Created On Fri Nov 17 2023
 * 2023 Design at Yale
 */

import * as path from 'path';
import { promises as fs } from 'fs';
import { db } from '../src/lib/kysely';
import { FileMigrationProvider, Migrator } from 'kysely';
import { run } from 'kysely-migration-cli';

const migrator = new Migrator({
  db,
  provider: new FileMigrationProvider({
    fs,
    path,
    migrationFolder: path.join(__dirname, 'migrations'),
  }),
});

run(db, migrator, 'scripts/migrations');
