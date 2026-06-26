import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  approvalURL: null,
  isLoading: false,
  orderId: null,
  orderList: [],
  orderDetails: null,
};

export const createNewOrder = createAsyncThunk(
  "/order/create",
  async (orderData) => {
    const res = await axios.post(
      `${import.meta.env.VITE_API_URL}/shop/order/create`,
      orderData,
    );
    return res.data;
  },
);

export const capturePayment = createAsyncThunk(
  "/order/capture",
  async ({ paymentId, payerId, orderId }) => {
    const res = await axios.post(`${import.meta.env.VITE_API_URL}/shop/order/capture`, {
      paymentId,
      orderId,
      payerId,
    });
    return res.data;
  },
);

export const getAllOrders = createAsyncThunk("/order/get", async (userId) => {
  const res = await axios.get(
    `${import.meta.env.VITE_API_URL}/shop/order/list/${userId}`,
  );
  return res.data;
});
export const getOrderDetails = createAsyncThunk(
  "/order/get/details",
  async (orderId) => {
    const res = await axios.get(
      `${import.meta.env.VITE_API_URL}/shop/order/details/${orderId}`,
    );
    return res.data;
  },
);

const shoppingOrderSlice = createSlice({
  name: "shoppingOrderSlice",
  initialState,
  reducers: {
    resetOrderDetails: (state) => {
      state.orderDetails = null;
    },
  },
  extraReducers: (builder) => {
    builder

      .addCase(createNewOrder.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createNewOrder.fulfilled, (state, action) => {
        state.approvalURL = action.payload.approvalURL;
        state.orderId = action.payload.orderId;
        sessionStorage.setItem(
          "currOrderId",
          JSON.stringify(action.payload.orderId),
        );
        state.isLoading = false;
      })
      .addCase(createNewOrder.rejected, (state) => {
        state.isLoading = false;
        state.approvalURL = null;
        state.orderId = null;
      })
      .addCase(getAllOrders.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAllOrders.fulfilled, (state, action) => {
        state.isLoading = false;
        state.orderList = action.payload.data;
      })
      .addCase(getAllOrders.rejected, (state) => {
        state.isLoading = false;
        state.orderList = [];
      })
      .addCase(getOrderDetails.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getOrderDetails.fulfilled, (state, action) => {
        state.isLoading = false;
        state.orderDetails = action.payload.data;
      })
      .addCase(getOrderDetails.rejected, (state) => {
        state.isLoading = false;
        state.orderDetails = null;
      });
  },
});

export const { resetOrderDetails } = shoppingOrderSlice.actions;

export default shoppingOrderSlice.reducer;
