import React from "react";
import { Routes, Route } from "react-router-dom";
import { HomePage, WholeSalePage } from "./pages/pages";

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/wholesalesite" element={<WholeSalePage />} />
      {/* <Route path="/catalog" element={<CatalogPage />} />
      <Route path="/products/:id" element={<ProductDetailPage />} />
      <Route path="/blogs" element={<BlogsPage />} />
      <Route path="/blog" element={<BlogPage />} />
      <Route path="/compare" element={<ComparePage />} />
      <Route path="/cart" element={<CartPage />} />
      <Route path="/cancel" element={<CancelPage />} />
      <Route path="/success" element={<SuccessPage />} />
      <Route path="/quiz" element={<QuizPage />} />
      <Route path="/personal_orders" element={<ProfileOrderPage />} />
      <Route path="/personal_address" element={<ProfileAddressPage />} /> */}
      {/* {
        token ? <Route path="/favorites" element={<FavoritesPage />} /> : <></>
      }
      {
        token
          ?
          <></>
          :
          <Route path="/login" element={<LoginPage />} />
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
          <Route path="/profileInner" element={<ProfileInnerPage />} />
          :
          <></>
      } */}
    </Routes>
  );
}
