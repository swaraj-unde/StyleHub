import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  isLoading: false,
  productList: [],
};

export const addProduct = createAsyncThunk(
  "/products/add",
  async (formData) => {
    const res = await axios.post(
      `${process.env.API_URL}/admin/products/add`,
      formData,
    );
    return res?.data;
  },
);

export const fetchAllProducts = createAsyncThunk("/products/get", async () => {
  const res = await axios.get(`${process.env.API_URL}/admin/products/get`);
  return res?.data;
});

export const editProduct = createAsyncThunk(
  "/products/edit",
  async ({ id, formData }) => {
    const res = await axios.put(
      `${process.env.API_URL}/admin/products/edit/${id}`,
      formData,
    );
    return res?.data;
  },
);
export const deleteProduct = createAsyncThunk(
  "/products/delete",
  async (id) => {
    const res = await axios.delete(
      `${process.env.API_URL}/admin/products/delete/${id}`,
    );
    return res?.data;
  },
);

const AdminProductSlice = createSlice({
  name: "adminProducts",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllProducts.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchAllProducts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.productList = action.payload.data;
      })
      .addCase(fetchAllProducts.rejected, (state, action) => {
        state.isLoading = false;
        state.productList = [];
      });
  },
});

export default AdminProductSlice.reducer;