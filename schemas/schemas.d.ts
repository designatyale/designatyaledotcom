/*
 * schemas.d.ts
 * Author: evan kirkiles
 * Created On Sun Aug 27 2023
 * 2023 Design at Yale
 *
 * Expands the default Sanity field definition type to support the
 * codegen tools' field.
 */

import * as s from 'sanity';

declare module 'sanity' {
  interface FieldDefinitionBase {
    codegen?: { required: boolean };
  }
}
