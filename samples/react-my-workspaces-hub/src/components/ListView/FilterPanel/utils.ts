/** Returns true if two string sets contain the same elements. */
export const areSetsEqual = (a: Set<string>, b: Set<string>): boolean => {
  if (a.size !== b.size) return false;
  for (const v of a) if (!b.has(v)) return false;
  return true;
};
