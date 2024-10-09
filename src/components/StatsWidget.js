import React from 'react';
import { useSelector } from 'react-redux';
import { CubeIcon, CurrencyDollarIcon, ExclamationCircleIcon, TagIcon } from '@heroicons/react/24/outline';

const icons = {
  'total-products': CubeIcon,
  'total-store-value': CurrencyDollarIcon,
  'out-of-stock': ExclamationCircleIcon,
  'categories': TagIcon,
};

const labels = {
  'total-products': 'Total Products',
  'total-store-value': 'Total Store Value',
  'out-of-stock': 'Out of Stock',
  'categories': 'Categories',
};

export default function StatsWidget({ type }) {
  const products = useSelector((state) => state.inventory.products);
  const Icon = icons[type];

  const getValue = () => {
    const activeProducts = products.filter(product => !product.disabled);
    switch (type) {
      case 'total-products':
        return activeProducts.length;
      case 'total-store-value':
        return activeProducts.reduce((sum, product) => sum + product.value, 0).toLocaleString('en-US', { style: 'currency', currency: 'USD' });
      case 'out-of-stock':
        return activeProducts.filter((product) => product.quantity === 0).length;
      case 'categories':
        return new Set(activeProducts.map((product) => product.category)).size;
      default:
        return 0;
    }
  };

  return (
    <div className="bg-gray-800 p-6 rounded-lg shadow">
      <div className="flex items-center">
        <Icon className="w-8 h-8 text-blue-400 mr-3" />
        <div>
          <p className="text-gray-400 text-sm">{labels[type]}</p>
          <p className="text-2xl font-semibold text-white">{getValue()}</p>
        </div>
      </div>
    </div>
  );
}