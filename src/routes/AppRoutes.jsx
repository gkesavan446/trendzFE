import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Home from "../pages/Home.jsx";
import ProductDetails from "../pages/ProductDetails.jsx";
import Cart from "../pages/Cart.jsx";
import Orders from "../pages/Orders.jsx";
import Login from "../pages/Login.jsx";
import Signup from "../pages/Signup.jsx";
import ForgotPassword from "../pages/ForgotPassword.jsx";
import ResetPassword from "../pages/ResetPassword.jsx";
import AddProduct from "../pages/AddProduct.jsx";
import Success from "../pages/Success.jsx";
import Cancel from "../pages/Cancel.jsx";
import NotFound from "../pages/NotFound.jsx";
import MainLayout from "../layouts/MainLayout.jsx";
import Checkout from "../pages/Checkout.jsx";
import AdminRoute from "../components/AdminRoute.jsx";

function AppRoutes() {
  return (
    <Router>
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/product/:id" element={<ProductDetails />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/orders" element={<Orders />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/forgotpassword" element={<ForgotPassword />} />
          <Route path="/resetpassword" element={<ResetPassword />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/success" element={<Success />} />
          <Route path="/cancel" element={<Cancel />} />
          <Route path="*" element={<NotFound />} />
          <Route element={<AdminRoute />}>
            <Route path="/addproduct" element={<AddProduct />} />
          </Route>          
        </Route>
      </Routes>
    </Router>
  );
}

export default AppRoutes;