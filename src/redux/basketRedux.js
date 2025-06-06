import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  basketItems: [],
  basketCount: 0,
  animate: false,
};

export const basketSlice = createSlice({
  name: "basket",
  initialState,
  reducers: {
    addToBasket: (state, action) => {
      state.basketItems = [...state.basketItems, action.payload];
      state.basketCount += 1;
    },
    removeFromBasket: (state, action) => {
      state.basketItems = state.basketItems.filter(
        (item, index) => index !== action.payload
      );
      state.basketCount -= 1;
    },
    clearBasket: (state) => {
      state.basketItems = [];
      state.basketCount = 0;
    },
  },
});

export const { addToBasket, removeFromBasket, clearBasket } =
  basketSlice.actions;
export default basketSlice.reducer;
