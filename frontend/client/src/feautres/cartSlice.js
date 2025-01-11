import { createSlice } from "@reduxjs/toolkit";
import productData from "../productData";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const initialState = {
  cart: [],
  items: productData,
  totalQuantity: 0,
  totalPrice: 0,
  product: [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      console.log(action.payload);
      // Check if the item already exists in the cart
      const index = state.cart.findIndex((item) => item.itemId === action.payload.itemId);
    
      if (index >= 0) {
        // If the item exists, increase its quantity
        state.cart[index].quantity += 1;
      } else {
        // If the item does not exist, add it with a quantity of 1
        state.cart.push({ ...action.payload, quantity: 1 });
      }
    },    
    getCartTotal: (state) => {
      // Recalculate cart totals
      const { totalQuantity, totalPrice } = state.cart.reduce(
        (cartTotal, cartItem) => {
          const { price, quantity } = cartItem;
          const itemTotal = price * quantity;

          cartTotal.totalPrice += itemTotal;
          cartTotal.totalQuantity += quantity;

          return cartTotal;
        },
        {
          totalPrice: 0,
          totalQuantity: 0,
        }
      );

      state.totalPrice = totalPrice;
      state.totalQuantity = totalQuantity;
    },
    removeFromCart: (state, action) => {
      state.cart = state.cart.filter((item) => item.itemId !== action.payload);
    },   
    increaseItemQuantity: (state, action) => {
      const index = state.cart.findIndex((item) => item.itemId === action.payload);
      if (index >= 0) {
        state.cart[index].quantity += 1;
      }
    },     
    decreaseItemQuantity: (state, action) => {
      const index = state.cart.findIndex((item) => item.itemId === action.payload);
      if (index >= 0 && state.cart[index].quantity > 1) {
        state.cart[index].quantity -= 1;
      }
    },
    productDetail: (state, action) => {
      state.product = [action.payload]; // Set product detail
    },
    productIncrease: (state, action) => {
      state.product = state.product.map((item) => {
        if (item.itemId === action.payload) {
          return { ...item, quantity: item.quantity + 1 };
        }
        return item;
      });
      const cartIndex = state.cart.findIndex((item) => item.itemId === action.payload);
      if (cartIndex !== -1) {
        state.cart[cartIndex].quantity += 1;
      }
    },
    productDecrease: (state, action) => {
      state.product = state.product.map((item) => {
        if (item.itemId === action.payload && item.quantity > 1) {
          return { ...item, quantity: item.quantity - 1 };
        }
        return item;
      });
      const cartIndex = state.cart.findIndex((item) => item.itemId === action.payload);
      if (cartIndex !== -1 && state.cart[cartIndex].quantity > 1) {
        state.cart[cartIndex].quantity -= 1;
      }
    },
    filterCategory: (state, action) => {
      state.product = state.items.filter((item) => item.category === action.payload);
    },
    clearProductDetail: (state) => {
      state.product = [];
    },
    setItems: (state, action) => {
      state.items = action.payload;
    },
  },
});

export const {
  addToCart,
  getCartTotal,
  removeFromCart,
  increaseItemQuantity,
  decreaseItemQuantity,
  productDetail,
  productIncrease,
  productDecrease,
  filterCategory,
  clearProductDetail,
  setItems,
} = cartSlice.actions;

export default cartSlice.reducer;
