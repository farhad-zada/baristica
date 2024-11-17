import React from 'react'
// pages
import Home from './home/Home'
import WholeSale from './wholeSale/WholeSale'
import Products from './products/Products'
import ProductsDetail from './productsDetail/ProductsDetail'

export const HomePage = () => {
    return (
        <Home />
    )
}

export const WholeSalePage = () => {
    return (
        <WholeSale />
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