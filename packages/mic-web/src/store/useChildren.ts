import axios from 'axios';
import useSWR from 'swr';

const fetcher = url => axios.get(url).then(res => res.data);
export function useChildren() {
  const { data, error } = useSWR('/api/v1/pick-up', fetcher, { refreshInterval: 1000 });

  return {
    data,
    error,
    loading: !data && !error,
  };
}
