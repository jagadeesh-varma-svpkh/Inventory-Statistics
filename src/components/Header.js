import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { toggleAdminMode } from '../redux/inventorySlice';
import { Switch } from '@headlessui/react';

export default function Header() {
  const dispatch = useDispatch();
  const isAdmin = useSelector((state) => state.inventory.isAdmin);

  return (
    <div className="flex justify-between items-center mb-8">
      <h1 className="text-3xl font-bold text-white">Inventory Management</h1>
      <div className="flex items-center space-x-2">
        <span className={`text-sm ${isAdmin ? 'text-blue-600' : 'text-gray-500'}`}>Admin</span>
        <Switch
          checked={isAdmin}
          onChange={() => dispatch(toggleAdminMode())}
          className={`${
            isAdmin ? 'bg-blue-600' : 'bg-gray-200'
          } relative inline-flex h-6 w-11 items-center rounded-full`}
        >
          <span className="sr-only">Enable admin mode</span>
          <span
            className={`${
              isAdmin ? 'translate-x-6' : 'translate-x-1'
            } inline-block h-4 w-4 transform rounded-full bg-white transition`}
          />
        </Switch>
        <span className={`text-sm ${!isAdmin ? 'text-blue-600' : 'text-gray-500'}`}>User</span>
      </div>
    </div>
  );
}