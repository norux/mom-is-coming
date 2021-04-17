import React from 'react';

export function Loading() {
  return (
    <div className="loading">
      <div className="loading-indicator" />
      <div className="loading-description">Now loading...</div>
    </div>
  );
}
