import { create } from "zustand";

export const useProductStore = create((set) => ({
  products: [],
  setProducts: (products) => set({ products }),
  createProduct: async (newProduct) => {
    if (!newProduct.name || !newProduct.image || !newProduct.price) {
      return { success: false, message: "Please fill all fields" };
    }

    try {
      const response = await fetch("/api/products/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newProduct),
      });

      if (!response.ok) {
        throw new Error("Failed to add product");
      }

      const data = await response.json();
      set((state) => ({ products: [...state.products, data] }));
      return { success: true, message: "Product added successfully" };
    } catch (error) {
      return { success: false, message: error.message };
    }
  },
  fetchProducts: async () => {
    try {
      const res = await fetch("/api/products/");
      const data = await res.json();
      set({ products: data.data });
      return { success: true, message: "Products fetched successfully" };
    } catch (error) {
      return { success: false, message: error.message };
    }
  },
  deleteProduct: async (productId) => {
    try {
      const response = await fetch(`/api/products/delete/${productId}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Failed to delete product");
      }

      set((state) => ({
        products: state.products.filter((product) => product._id !== productId),
      }));
      return { success: true, message: "Product deleted successfully" };
    } catch (error) {
      return { success: false, message: error.message };
    }
  },
  updateProduct: async (productId, updatedProduct) => {
    try {
      const response = await fetch(`/api/products/update/${productId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedProduct),
      });

      if (!response.ok) {
        throw new Error("Failed to update product");
      }

      const data = await response.json();
      set((state) => ({
        products: state.products.map((product) =>
          product._id === productId ? data.data : product
        ),
      }));
      return { success: true, message: "Product updated successfully" };
    } catch (error) {
      return { success: false, message: error.message };
    }
  },
}));
