import { create } from "zustand";
import { fakeStoreApi } from "../api/fakeStoreApi";

export const useProductStore = create((set, get) => ({
  products: [],
  isLoading: false,
  error: null,
  categories: [],
  selectedCategory: "all",

  fetchAllProducts: async () => {
    if (get().products.length > 0) return;

    set({ isLoading: true, error: null });
    try {
      const products = await fakeStoreApi.getAllProducts();
      const categories = await fakeStoreApi.getCategories();
      set({ products, categories, isLoading: false });
    } catch (err) {
      set({ error: err.message, isLoading: false });
    }
  },

  setSelectedCategory: (category) => {
    set({ selectedCategory: category });
  },

  getFilteredProducts: () => {
    const { products, selectedCategory } = get();
    if (selectedCategory === "all") {
      return products;
    }
    return products.filter((p) => p.category === selectedCategory);
  },
}));
