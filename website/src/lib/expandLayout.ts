export const promoteExpandedPair = <T>(
  items: readonly T[],
  expandedIndex: number | null,
): T[] => {
  if (
    expandedIndex === null ||
    expandedIndex < 0 ||
    expandedIndex >= items.length
  ) {
    return [...items];
  }

  const pairStart = expandedIndex - (expandedIndex % 2);
  const pairEnd = Math.min(pairStart + 2, items.length);
  const expanded = items[expandedIndex];
  const sibling = items
    .slice(pairStart, pairEnd)
    .filter((_, offset) => pairStart + offset !== expandedIndex);

  return [
    ...items.slice(0, pairStart),
    expanded,
    ...sibling,
    ...items.slice(pairEnd),
  ];
};
