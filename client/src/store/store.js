import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./auth-slice/index.js";
import adminProductReducer from "./admin/products-slice/index.js";
import adminOrderReducer from "./admin/orders-slice/index.js";
import shopProductReducer from "./shop/product-slice/index.js";
import shopCartReducer from "./shop/cart-slice/index.js";
import shopAddressReducer from "./shop/address-slice/index.js";
import shopOrderReducer from "./shop/order-slice/index.js";
import shopSeachReducer from "./shop/search-slice/index.js";

const store = configureStore({
  reducer: {
    auth: authReducer,
    adminProduct: adminProductReducer,
    adminOrder: adminOrderReducer,
    shopProduct: shopProductReducer,
    shopCart: shopCartReducer,
    shopAddress: shopAddressReducer,
    shopOrder: shopOrderReducer,
    shopSearch: shopSeachReducer,
  },
});

export default store;
