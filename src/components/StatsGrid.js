import React from 'react';
import StatsWidget from './StatsWidget';

export default function StatsGrid() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      <StatsWidget type="total-products" />
      <StatsWidget type="total-store-value" />
      <StatsWidget type="out-of-stock" />
      <StatsWidget type="categories" />
    </div>
  );
}