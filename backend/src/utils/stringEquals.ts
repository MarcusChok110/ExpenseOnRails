/**
 * Performs a strict equality comparison by converting the args to strings
 */
export default function stringEquals(id1: any, id2: any): boolean {
  return String(id1) === String(id2);
}
