/*
 * assertUnreachable.ts
 * Author: Evan Kirkiles
 * Created On Sat Dec 09 2023
 * 2023 Design at Yale
 */

export default function assertUnreachable(x: never): never {
  throw new Error("Didn't expect to get here");
}
