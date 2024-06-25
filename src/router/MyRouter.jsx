import React, { useEffect, useState } from "react";
import { Navigate, Route, Routes, useNavigate } from "react-router";
import HomePage from "../pages/HomePage";
import AboutPage from "../pages/AboutPage";
import ShopPage from "../pages/ShopPage";
import LoginPage from "../pages/LoginPage";
import NoPage from "../pages/NoPage";
import DetalProduct from "../pages/DetalProduct";
import AdminPage from "../pages/admin/AdminPage";
import api, { getProducts } from "../api/index";
import ProductAdd from "../pages/admin/ProductAdd";
import ProductEdit from "../pages/admin/ProductEdit";
import ProductFrom from "../pages/admin/ProductFrom";
import Regiter from "../pages/Regiter";
import AuthFrom from "../pages/AuthFrom";
import PrivateRoute from "../components/PrivateRoute";
import LayoutAdmin from "../layouts/LayoutAdmin";
import LayoutClient from "../layouts/LayoutClient";

export default function MyRouter() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<LayoutClient />}>
          <Route index element={<HomePage />} />
          <Route path="/home" element={<Navigate to="/" />} />
          <Route path="/san-pham/:id" element={<DetalProduct />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/shop" element={<ShopPage />} />
          <Route path="*" element={<NoPage />} />

          <Route path="/regiter" element={<AuthFrom isRegiter={true} />} />
          <Route path="/login" element={<AuthFrom isRegiter={false} />} />
        </Route>

        {/* private router for admin */}
        <Route path="/admin" element={<PrivateRoute />}>
          <Route path="/admin" element={<AdminPage />} />
          <Route path="/admin/product-from" element={<ProductFrom />} />
          <Route path="/admin/product-from/:id" element={<ProductFrom />} />
        </Route>
      </Routes>
    </div>
  );
}
