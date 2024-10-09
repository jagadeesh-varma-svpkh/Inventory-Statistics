import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts } from './redux/inventorySlice';
import Header from './components/Header';
import StatsGrid from './components/StatsGrid';
import ProductTable from './components/ProductTable';
import Loader from './components/Loader';

function App() {
  const dispatch = useDispatch();
  const status = useSelector((state) => state.inventory.status);
  const error = useSelector((state) => state.inventory.error);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  if (status === 'loading') {
    return <Loader />;
  }

  if (status === 'failed') {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Error Loading Products</h2>
          <p className="text-xl mb-4">{error}</p>
          <button
            onClick={() => dispatch(fetchProducts())}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white p-8">
      <div className="max-w-7xl mx-auto">
        <Header />
        <StatsGrid />
        <ProductTable />
      </div>
    </div>
  );
}

export default App;