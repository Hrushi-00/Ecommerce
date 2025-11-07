import { createSlice } from "@reduxjs/toolkit";

const loadCartFromLocalStorage = () => {
  const savedCart = localStorage.getItem("cartItems");
  return savedCart ? JSON.parse(savedCart) : [];
};

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    items: loadCartFromLocalStorage(),
  },
  reducers: {
    addItem: (state, action) => {
      const existingItem = state.items.find(
        (item) => item._id === action.payload._id
      );

      if (existingItem) {
        existingItem.quantity += 1; 
      } else {
        state.items.push({ ...action.payload, quantity: 1 });
      }

      localStorage.setItem("cartItems", JSON.stringify(state.items));
    },

    removeItem: (state, action) => {
      state.items = state.items.filter((item) => item._id !== action.payload);
      localStorage.setItem("cartItems", JSON.stringify(state.items));
    },

    increaseQuantity: (state, action) => {
      const item = state.items.find((i) => i._id === action.payload);
      if (item) item.quantity += 1;
      localStorage.setItem("cartItems", JSON.stringify(state.items));
    },

    decreaseQuantity: (state, action) => {
      const item = state.items.find((i) => i._id === action.payload);
      if (item && item.quantity > 1) item.quantity -= 1;
      localStorage.setItem("cartItems", JSON.stringify(state.items));
    },

    clearCart: (state) => {
      state.items = [];
      localStorage.removeItem("cartItems");
    },
  },
});

export const {
  addItem,
  removeItem,
  clearCart,
  increaseQuantity,
  decreaseQuantity,
} = cartSlice.actions;
export default cartSlice.reducer;
