import React from 'react'
// pages
import Home from './home/Home'
import Contacts from './contacts/Contacts'
import Products from './products/Products'
import ProductsDetail from './productsDetail/ProductsDetail'
import Login from './login/Login'
import Register from './register/Register'
import Profile from './profile/Profile'
import Order from './order/Order'
import Favorites from './favorites/Favorites'

export const HomePage = () => {
    return (
        <Home />
    )
}

export const ContactsPage = () => {
    return (
        <Contacts />
    )
}

export const ProductsPage = () => {
    return (
        <Products />
    )
}

export const ProductDetailPage = () => {
    return (
        <ProductsDetail />
    )
}

export const LoginPage = () => {
    return (
        <Login />
    )
}

export const RegisterPage = () => {
    return (
        <Register />
    )
}

export const ProfilePage = () => {
    return (
        <Profile />
    )
}

export const OrderPage = () => {
    return (
        <Order />
    )
}

export const FavoritesPage = () => {
    return(
        <Favorites />
    )
}