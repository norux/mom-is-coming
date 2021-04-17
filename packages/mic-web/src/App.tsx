import React from 'react';

import { Children } from '@/components/Children';
import { Font } from '@/components/Font';

import { Loading } from './components/Loading';
import { useChildren } from './store/useChildren';

export function App() {
  const { error, loading } = useChildren();
  if (error) {
    return <div className="error">Something wrong. 😥</div>;
  }

  if (loading) {
    return <Loading />;
  }

  return (
    <>
      <Font />
      <Children />
    </>
  );
}
