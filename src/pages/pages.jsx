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
import Wholesale from './wholesale/Wholesale'
import Success from './success/Success'
import Failure from './failure/Failure'
import NotFound from './notFound/NotFound'

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

export const WholesalePage = () => {
    return(
        <Wholesale />
    )
}

export const SuccessPage = () => {
    return(
        <Success />
    )
}

export const FailurePage = () => {
    return(
        <Failure />
    )
}

export const NotFoundPage = () => {
    return(
        <NotFound />
    )
}