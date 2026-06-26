import { Routes, Route } from "react-router-dom";
import AuthLayout from "./components/auth/layout";
import AuthLogin from "./pages/auth/login";
import AuthRegister from "./pages/auth/register";
import AdminLayout from "./components/admin-view/layout";
import AdminDashboard from "./pages/admin-view/dashboard";
import AdminOrders from "./pages/admin-view/orders";
import AdminProducts from "./pages/admin-view/products";
import ShopLayout from "./components/shopping-view/layout";
import NotFound from "./pages/not-found";
import ShopHome from "./pages/shopping-view/home";
import ShopListing from "./pages/shopping-view/listing";
import ShopAccount from "./pages/shopping-view/account";
import ShopCheckout from "./pages/shopping-view/checkout";
import CheckAuth from "./components/common/check-auth";
import UnAuthPage from "./pages/unauth-page";
import { Toaster } from "sonner";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { checkAuth } from "./store/auth-slice";
import LoadingScreen from "./components/common/loading";
import PaypalReturnPage from "./pages/shopping-view/paypal-return";
import PaymentSuccessPage from "./pages/shopping-view/payment-success";
import SearchPage from "./pages/shopping-view/search";

import { Navigate } from "react-router-dom";

function App() {
  const { isAuthenticated, user, isLoading } = useSelector(
    (state) => state.auth,
  );
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(checkAuth());
  }, [dispatch]);

  if (isLoading) {
    return <LoadingScreen />;
  }
  return (
    <div>
      <Routes>
        <Route path="/" element={<Navigate to="/auth/login" replace />} />
        <Route
          path="/auth"
          element={
            <CheckAuth isAuthenticated={isAuthenticated} user={user}>
              <AuthLayout />
            </CheckAuth>
          }
        >
          <Route path="login" element={<AuthLogin />} />
          <Route path="register" element={<AuthRegister />} />
        </Route>

        <Route
          path="/admin"
          element={
            <CheckAuth isAuthenticated={isAuthenticated} user={user}>
              <AdminLayout />
            </CheckAuth>
          }
        >
          <Route path="dashboard" element={<AdminDashboard />}></Route>
          <Route path="orders" element={<AdminOrders />}></Route>
          <Route path="products" element={<AdminProducts />}></Route>
        </Route>
        <Route
          path="/shop"
          element={
            <CheckAuth isAuthenticated={isAuthenticated} user={user}>
              <ShopLayout />
            </CheckAuth>
          }
        >
          <Route path="home" element={<ShopHome />}></Route>
          <Route path="listing" element={<ShopListing />}></Route>
          <Route path="account" element={<ShopAccount />}></Route>
          <Route path="checkout" element={<ShopCheckout />}></Route>
          <Route path="paypal-return" element={<PaypalReturnPage />}></Route>
          <Route
            path="payment-success"
            element={<PaymentSuccessPage />}
          ></Route>
          <Route path="search" element={<SearchPage />}></Route>
        </Route>
        <Route path="/unauth-page" element={<UnAuthPage />}></Route>
        <Route path="*" element={<NotFound />}></Route>
      </Routes>
      <Toaster position="top-center" richColors theme="dark" />
    </div>
  );
}

export default App;
