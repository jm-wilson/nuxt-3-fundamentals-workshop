export function useQueryFilters<TItem>(config: Record<string, (item: TItem) => boolean>) {
  const { query } = useRoute();

  const filters = [];
  for (const queryKey in config) {
    if (query[queryKey] !== undefined) {
        filters.push(config[queryKey]);
    }
  }

  return filters;
}
