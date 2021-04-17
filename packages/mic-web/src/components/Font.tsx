import React, { useCallback } from 'react';

import { useFontSize } from '@/store/useFontSize';

export function Font() {
  const { data, mutate } = useFontSize();
  const plus = useCallback(() => {
    mutate(data + 2);
  }, [mutate, data]);
  const minus = useCallback(() => {
    mutate(data - 2);
  }, [mutate, data]);

  return (
    <div className="font">
      <button className="button green" onClick={plus}>
        +
      </button>
      <button className="button red" onClick={minus}>
        -
      </button>
    </div>
  );
}
