import axios from 'axios';
import React from 'react';
import useSWR from 'swr';

import { Children } from '@/components/Children';
import { Font } from '@/components/Font';

const fetcher = url => axios.get(url).then(res => res.data);
export function App() {
  const { data, error } = useSWR('/api/v1/pick-up', fetcher, { refreshInterval: 5000 });

  if (error) {
    return <div className="error">Something wrong. 😥</div>;
  }

  if (!data) {
    return <div className="loading">loading</div>;
  }

  return (
    <>
      <Font />
      <Children />
    </>
  );
}
