import React from 'react';

import { useFontSize } from '@/store/useFontSize';

export function Children() {
  const { data: fontSize } = useFontSize();

  console.log('?');

  return (
    <div className="children">
      <div className="name" style={{ fontSize }}>
        aaaaaaa
      </div>
    </div>
  );
}
