import useSWR, { cache } from 'swr';

const fontSizeAtom = {
  key: 'fontSize',
  initData: parseInt(localStorage.getItem('__font_size') || '') || 40,
};

export function useFontSize() {
  const { data = fontSizeAtom.initData, mutate } = useSWR(fontSizeAtom.key, null, {
    shouldRetryOnError: false,
    refreshInterval: 0,
    revalidateOnReconnect: false,
    revalidateOnFocus: false,
  });

  if (!cache.has('fontSize')) {
    cache.set('fontSize', fontSizeAtom.initData);
  }

  return {
    data,
    mutate: value => {
      localStorage.setItem('__font_size', JSON.stringify(value));
      mutate(value);
    },
  };
}
