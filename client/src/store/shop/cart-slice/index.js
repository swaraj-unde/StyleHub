import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  cartItems: [],
  isLoading: false,
};

export const addToCart = createAsyncThunk(
  "cart/addtoCart",
  async ({ userId, productId, quantity }) => {
    const res = await axios.post(`${process.env.API_URL}/shop/cart/add`, {
      userId,
      productId,
      quantity,
    });
    return res.data;
  },
);
export const fetchCartItems = createAsyncThunk(
  "cart/fetchCart",
  async ({ userId }) => {
    const res = await axios.get(
      `${process.env.API_URL}/shop/cart/get/${userId}`,
    );
    return res.data;
  },
);
export const deleteCartItem = createAsyncThunk(
  "cart/deleteItem",
  async ({ userId, productId }) => {
    const res = await axios.delete(
      `${process.env.API_URL}/shop/cart/delete/${userId}/${productId}`,
    );
    return res.data;
  },
);
export const updateCartQuantity = createAsyncThunk(
  "cart/updateCartItem",
  async ({ userId, productId, quantity }) => {
    const res = await axios.put(`${process.env.API_URL}/shop/cart/update`, {
      userId,
      productId,
      quantity,
    });
    return res.data;
  },
);
const shoppingCartSlice = createSlice({
  name: "shoppingCart",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder

      .addCase(fetchCartItems.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchCartItems.fulfilled, (state, action) => {
        state.isLoading = false;
        state.cartItems = action.payload.data;
      })
      .addCase(fetchCartItems.rejected, (state) => {
        state.isLoading = false;
        state.cartItems = [];
      })

      .addCase(addToCart.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(addToCart.fulfilled, (state, action) => {
        state.isLoading = false;
        state.cartItems = action.payload.data;
      })
      .addCase(addToCart.rejected, (state) => {
        state.isLoading = false;
      })

      .addCase(updateCartQuantity.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateCartQuantity.fulfilled, (state, action) => {
        state.isLoading = false;
        state.cartItems = action.payload.data;
      })
      .addCase(updateCartQuantity.rejected, (state) => {
        state.isLoading = false;
      })

      .addCase(deleteCartItem.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteCartItem.fulfilled, (state, action) => {
        state.isLoading = false;
        state.cartItems = action.payload.data;
      })
      .addCase(deleteCartItem.rejected, (state) => {
        state.isLoading = false;
      });
  },
});

export default shoppingCartSlice.reducer;
