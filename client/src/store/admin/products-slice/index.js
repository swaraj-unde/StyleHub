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
      "http://localhost:3000/api/admin/products/add",
      formData,
    );
    return res?.data;
  },
);

export const fetchAllProducts = createAsyncThunk("/products/get", async () => {
  const res = await axios.get("http://localhost:3000/api/admin/products/get");
  return res?.data;
});

export const editProduct = createAsyncThunk(
  "/products/edit",
  async ({ id, formData }) => {
    const res = await axios.put(
      `http://localhost:3000/api/admin/products/edit/${id}`,
      formData,
    );
    return res?.data;
  },
);
export const deleteProduct = createAsyncThunk(
  "/products/delete",
  async (id) => {
    const res = await axios.delete(
      `http://localhost:3000/api/admin/products/delete/${id}`,
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