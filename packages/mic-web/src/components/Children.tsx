import React from 'react';

import { useChildren } from '@/store/useChildren';
import { useFontSize } from '@/store/useFontSize';

export function Children() {
  const { data: fontSize } = useFontSize();
  const { data } = useChildren();

  return (
    <div className="children" style={{ fontSize: `${fontSize}px` }}>
      {data.map((data, idx) => {
        return (
          <div className="name" key={idx}>
            {data}
          </div>
        );
      })}
    </div>
  );
}
