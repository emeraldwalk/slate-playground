import { useCallback, useMemo } from 'react';

export function useFilter<
  T extends string,
>(
  data: T[],
  filterBy: string,
) {
  const filter = useCallback((method: string) => {
    return filterBy === '' || method.toLowerCase().indexOf(filterBy.toLowerCase()) > -1;
  }, [filterBy]);

  return useMemo(
    () => data.filter(filter),
    [data, filter],
  );
}