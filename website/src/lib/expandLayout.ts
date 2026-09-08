export const promoteExpandedPair = <T>(
  items: readonly T[],
  expandedIndex: number | null,
): { item: T; originalIndex: number }[] => {
  const indexed = items.map((item, originalIndex) => ({ item, originalIndex }));

  if (
    expandedIndex === null ||
    expandedIndex < 0 ||
    expandedIndex >= items.length
  ) {
    return indexed;
  }

  const pairStart = expandedIndex - (expandedIndex % 2);
  const pairEnd = Math.min(pairStart + 2, indexed.length);
  const expanded = indexed[expandedIndex];
  const sibling = indexed
    .slice(pairStart, pairEnd)
    .filter((_, offset) => pairStart + offset !== expandedIndex);

  return [
    ...indexed.slice(0, pairStart),
    expanded,
    ...sibling,
    ...indexed.slice(pairEnd),
  ];
};
