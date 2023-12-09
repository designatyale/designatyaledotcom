/*
 * utils.ts
 * Author: evan kirkiles
 * Created On Fri Nov 17 2023
 * 2023 Design at Yale
 */

export function removeBigInt(data: any) {
  return JSON.parse(
    JSON.stringify(
      data,
      (_, value) => (typeof value === 'bigint' ? value.toString() : value) // return everything else unchanged
    )
  );
}
