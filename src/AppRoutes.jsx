import React from "react";
import { Routes, Route } from "react-router-dom";
import { HomePage, ContactsPage, ProductsPage, ProductDetailPage, RegisterPage, ProfilePage, OrderPage, FavoritesPage, WholesalePage, SuccessPage, FailurePage, NotFoundPage } from "./pages/pages";
import { useSelector } from "react-redux";
import Login from "./pages/login/Login";

export default function AppRoutes() {
  const { lang, token } = useSelector((state) => state.baristica);

  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/contacts" element={<ContactsPage />} />
      <Route path="/products/:type" element={<ProductsPage />} />
      <Route path="/product/:id" element={<ProductDetailPage />} />
      <Route path="/wholesale" element={<WholesalePage />} />
      <Route path="/success" element={<SuccessPage />} />
      <Route path="/failure" element={<FailurePage />} />
      <Route path="*" element={<NotFoundPage />} />

      {
        token
          ?
          <></>
          :
          <Route path="/login" element={<Login />} />
      }
      {
        token
          ?
          <></>
          :
          <Route path="/register" element={<RegisterPage />} />
      }

      {
        token
          ?
          <Route path="/profile" element={<ProfilePage />} />
          :
          <></>
      }
      {
        token
          ?
          <Route path="/order" element={<OrderPage />} />
          :
          <></>
      }

      {
        token
          ?
          <Route path="/favorites" element={<FavoritesPage />} />
          :
          <></>
      }

    </Routes>
  );
}
