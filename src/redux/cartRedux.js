import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    products: [],
    quantity: 0,
    total: 0,
    loading: false,
    error: null,
  },
  reducers: {
    // Add product to cart
    addProduct: (state, action) => {
      const productToAdd = action.payload;
      const existingProductIndex = state.products.findIndex(
        (p) => p._id === productToAdd._id
      );

      if (existingProductIndex >= 0) {
        // Update existing product quantity
        state.products[existingProductIndex].quantity += productToAdd.quantity;
        state.total += productToAdd.price * productToAdd.quantity;
      } else {
        // Add new product to cart
        state.quantity += 1;
        state.products.push(productToAdd);
        state.total += productToAdd.price * productToAdd.quantity;
      }
    },

    // Remove product from cart
    removeProduct: (state, action) => {
      const productIdToRemove = action.payload;
      const productToRemove = state.products.find(
        (p) => p._id === productIdToRemove
      );

      if (productToRemove) {
        state.quantity -= 1;
        state.total -= productToRemove.price * productToRemove.quantity;
        state.products = state.products.filter(
          (p) => p._id !== productIdToRemove
        );
      }
    },

    // Decrease product quantity by one
    decreaseProductQuantity: (state, action) => {
      const productId = action.payload;
      const productIndex = state.products.findIndex((p) => p._id === productId);

      if (productIndex >= 0) {
        if (state.products[productIndex].quantity > 1) {
          // Decrease quantity by 1
          state.products[productIndex].quantity -= 1;
          state.total -= state.products[productIndex].price;
        } else {
          // If quantity is 1, remove the product
          state.quantity -= 1;
          state.total -= state.products[productIndex].price;
          state.products = state.products.filter((p) => p._id !== productId);
        }
      }
    },

    // Update product quantity
    updateProductQuantity: (state, action) => {
      const { productId, quantity } = action.payload;
      const productIndex = state.products.findIndex((p) => p._id === productId);

      if (productIndex >= 0 && quantity > 0) {
        const oldQuantity = state.products[productIndex].quantity;
        const priceDifference =
          state.products[productIndex].price * (quantity - oldQuantity);

        state.products[productIndex].quantity = quantity;
        state.total += priceDifference;
      }
    },

    // Clear cart
    clearCart: (state) => {
      state.products = [];
      state.quantity = 0;
      state.total = 0;
    },

    // Payment loading states
    paymentStart: (state) => {
      state.loading = true;
      state.error = null;
    },

    paymentSuccess: (state) => {
      state.loading = false;
      state.error = null;
    },

    paymentFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const {
  addProduct,
  removeProduct,
  decreaseProductQuantity,
  updateProductQuantity,
  clearCart,
  paymentStart,
  paymentSuccess,
  paymentFailure,
} = cartSlice.actions;

export default cartSlice.reducer;
