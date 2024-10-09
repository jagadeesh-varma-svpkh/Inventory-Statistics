import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const CACHE_KEY = 'inventoryData';
const CACHE_EXPIRATION = 5 * 60 * 1000; // 5 minutes

const getFromCache = () => {
  const cached = sessionStorage.getItem(CACHE_KEY);
  if (cached) {
    const { data, timestamp } = JSON.parse(cached);
    if (Date.now() - timestamp < CACHE_EXPIRATION) {
      return data;
    }
  }
  return null;
};

const saveToCache = (data) => {
  const cacheData = {
    data,
    timestamp: Date.now(),
  };
  sessionStorage.setItem(CACHE_KEY, JSON.stringify(cacheData));
};

export const fetchProducts = createAsyncThunk(
  'inventory/fetchProducts',
  async (_, { rejectWithValue }) => {
    const cachedData = getFromCache();
    if (cachedData) {
      return cachedData;
    }

    try {
      const response = await axios.get('https://dev-0tf0hinghgjl39z.api.raw-labs.com/inventory');
      saveToCache(response.data);
      return response.data;
    } catch (error) {
      return rejectWithValue('Failed to fetch products. Please try again later.');
    }
  }
);

const inventorySlice = createSlice({
  name: 'inventory',
  initialState: {
    products: [],
    isAdmin: true,
    status: 'idle',
    error: null,
  },
  reducers: {
    updateProduct: (state, action) => {
      const index = state.products.findIndex(product => product.name === action.payload.name);
      if (index !== -1) {
        state.products[index] = action.payload;
      }
      saveToCache(state.products);
    },
    deleteProduct: (state, action) => {
      state.products = state.products.filter(product => product.name !== action.payload);
      saveToCache(state.products);
    },
    toggleProductStatus: (state, action) => {
      const product = state.products.find(product => product.name === action.payload);
      if (product) {
        product.disabled = !product.disabled;
      }
      saveToCache(state.products);
    },
    toggleAdminMode: (state) => {
      state.isAdmin = !state.isAdmin;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.products = action.payload.map(product => ({
          ...product,
          disabled: false,
          quantity: parseInt(product.quantity, 10),
          price: typeof product.price === 'string' ? parseFloat(product.price.replace('$', '')) : product.price,
          value: typeof product.value === 'string' ? parseFloat(product.value.replace('$', '')) : product.value,
        }));
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      });
  },
});

export const { updateProduct, deleteProduct, toggleProductStatus, toggleAdminMode } = inventorySlice.actions;

export default inventorySlice.reducer;