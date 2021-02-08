import React, { useCallback } from 'react';

import { useFontSize } from '@/store/useFontSize';

export function Font() {
  const { mutate: setFontSize } = useFontSize();
  const plus = useCallback(() => {
    setFontSize(10 + 2);
  }, [setFontSize]);
  const minus = useCallback(() => {
    setFontSize(10 - 2);
  }, [setFontSize]);

  console.log('!');

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
