export const promoteExpanded = <T>(
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

  const expanded = indexed[expandedIndex];
  const rest = indexed.filter((_, index) => index !== expandedIndex);

  return [expanded, ...rest];
};
