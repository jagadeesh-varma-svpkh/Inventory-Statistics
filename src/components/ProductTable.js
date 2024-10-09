import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { PencilIcon, TrashIcon, EyeIcon, EyeSlashIcon } from '@heroicons/react/24/outline';
import { deleteProduct, toggleProductStatus } from '../redux/inventorySlice';
import EditProductModal from './EditProductModal';

export default function ProductTable() {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.inventory.products);
  const isAdmin = useSelector((state) => state.inventory.isAdmin);
  const [editingProduct, setEditingProduct] = useState(null);

  const handleEdit = (product) => {
    if (!product.disabled && isAdmin) {
      setEditingProduct(product);
    }
  };

  const handleDelete = (productName) => {
    if (isAdmin) {
      dispatch(deleteProduct(productName));
    }
  };

  const handleToggleStatus = (productName) => {
    if (isAdmin) {
      dispatch(toggleProductStatus(productName));
    }
  };

  return (
    <>
      <div className="bg-gray-800 shadow rounded-lg overflow-hidden">
        <table className="min-w-full divide-y divide-gray-700">
          <thead className="bg-gray-700">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Name</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Category</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Price</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Quantity</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Value</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Action</th>
            </tr>
          </thead>
          <tbody className="bg-gray-800 divide-y divide-gray-700">
            {products.map((product) => (
              <tr key={product.name} className={product.disabled ? 'bg-gray-700 text-gray-400' : ''}>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">{product.name}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm">{product.category}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm">${product.price.toFixed(2)}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm">{product.quantity}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm">${product.value.toFixed(2)}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <div className="flex space-x-2">
                    <button
                      onClick={() => handleEdit(product)}
                      className={`${
                        isAdmin && !product.disabled
                          ? 'text-blue-400 hover:text-blue-300'
                          : 'text-gray-500 cursor-not-allowed'
                      }`}
                      disabled={!isAdmin || product.disabled}
                    >
                      <PencilIcon className="w-5 h-5" />
                    </button>
                    <button
                      onClick={() => handleToggleStatus(product.name)}
                      className={`${
                        isAdmin
                          ? 'text-yellow-400 hover:text-yellow-300'
                          : 'text-gray-500 cursor-not-allowed'
                      }`}
                      disabled={!isAdmin}
                    >
                      {product.disabled ? (
                        <EyeIcon className="w-5 h-5" />
                      ) : (
                        <EyeSlashIcon className="w-5 h-5" />
                      )}
                    </button>
                    <button
                      onClick={() => handleDelete(product.name)}
                      className={`${
                        isAdmin
                          ? 'text-red-400 hover:text-red-300'
                          : 'text-gray-500 cursor-not-allowed'
                      }`}
                      disabled={!isAdmin}
                    >
                      <TrashIcon className="w-5 h-5" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {editingProduct && (
        <EditProductModal
          product={editingProduct}
          onClose={() => setEditingProduct(null)}
        />
      )}
    </>
  );
}