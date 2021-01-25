import useSWR from 'swr';

let fontSize = 0;
export function useFontSize() {
  const { data = 0, mutate } = useSWR('state', () => fontSize);

  return {
    data,
    mutate: size => {
      fontSize = size;

      return mutate();
    },
  };
}
