import useSWR, { responseInterface } from 'swr';

type PropType<T, K extends keyof T> = T[K];
export function useSharedState<T = any>(
  key: string,
  initialData: T
): { data?: T; mutate: PropType<responseInterface<T, any>, 'mutate'> } {
  const { data, mutate } = useSWR<T>(key, {
    initialData,
    fetcher: null,
    refreshInterval: 0,
  });

  return { data: data, mutate };
}
