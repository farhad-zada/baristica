import React from 'react'
// pages
import Home from './home/Home'
import Contacts from './contacts/Contacts'
import Products from './products/Products'
import ProductsDetail from './productsDetail/ProductsDetail'

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