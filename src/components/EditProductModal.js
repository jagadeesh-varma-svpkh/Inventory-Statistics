import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Dialog } from '@headlessui/react';
import { XMarkIcon } from '@heroicons/react/24/outline';
import { updateProduct } from '../redux/inventorySlice';

export default function EditProductModal({ product, onClose }) {
  const dispatch = useDispatch();
  const [editingProduct, setEditingProduct] = useState(product);

  useEffect(() => {
    setEditingProduct(product);
  }, [product]);

  const handleSave = () => {
    const updatedProduct = {
      ...editingProduct,
      value: parseFloat(editingProduct.price) * editingProduct.quantity
    };
    dispatch(updateProduct(updatedProduct));
    onClose();
  };

  return (
    <Dialog open={true} onClose={onClose} className="relative z-50">
      <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
      <div className="fixed inset-0 flex items-center justify-center p-4">
        <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-gray-800 p-6 text-left align-middle shadow-xl transition-all">
          <Dialog.Title as="h3" className="text-lg font-medium leading-6 text-white">
            Edit product
          </Dialog.Title>
          <button
            type="button"
            className="absolute top-3 right-3 text-gray-400 hover:text-gray-300"
            onClick={onClose}
          >
            <XMarkIcon className="h-6 w-6" aria-hidden="true" />
          </button>
          <div className="mt-2">
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <label htmlFor="name" className="text-right text-gray-300">
                  Name
                </label>
                <input
                  id="name"
                  value={editingProduct.name}
                  onChange={(e) => setEditingProduct({ ...editingProduct, name: e.target.value })}
                  className="col-span-3 p-2 border rounded bg-gray-700 text-white"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <label htmlFor="category" className="text-right text-gray-300">
                  Category
                </label>
                <input
                  id="category"
                  value={editingProduct.category}
                  onChange={(e) => setEditingProduct({ ...editingProduct, category: e.target.value })}
                  className="col-span-3 p-2 border rounded bg-gray-700 text-white"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <label htmlFor="price" className="text-right text-gray-300">
                  Price
                </label>
                <input
                  id="price"
                  type="number"
                  step="0.01"
                  value={editingProduct.price}
                  onChange={(e) => setEditingProduct({ ...editingProduct, price: parseFloat(e.target.value) })}
                  className="col-span-3 p-2 border rounded bg-gray-700 text-white"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <label htmlFor="quantity" className="text-right text-gray-300">
                  Quantity
                </label>
                <input
                  id="quantity"
                  type="number"
                  value={editingProduct.quantity}
                  onChange={(e) => setEditingProduct({ ...editingProduct, quantity: parseInt(e.target.value, 10) })}
                  className="col-span-3 p-2 border rounded bg-gray-700 text-white"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <label htmlFor="value" className="text-right text-gray-300">
                  Value
                </label>
                <input
                  id="value"
                  value={(editingProduct.price * editingProduct.quantity).toFixed(2)}
                  readOnly
                  className="col-span-3 p-2 border rounded bg-gray-700 text-white"
                />
              </div>
            
            </div>
          </div>
          <div className="mt-4 flex justify-end space-x-2">
            <button
              type="button"
              className="inline-flex justify-center rounded-md border border-transparent bg-gray-600 px-4 py-2 text-sm font-medium text-white hover:bg-gray-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
              onClick={onClose}
            >
              Cancel
            </button>
            <button
              type="button"
              className="inline-flex justify-center rounded-md border border-transparent bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
              onClick={handleSave}
            >
              Save
            </button>
          </div>
        </Dialog.Panel>
      </div>
    </Dialog>
  );
}