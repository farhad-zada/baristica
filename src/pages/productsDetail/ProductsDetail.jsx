import React, { useEffect, useState } from 'react'
import ProductsDetailHead from './productsDetailComponents/ProductsDetailHead'
import { useParams } from 'react-router-dom'
import ProductsDetailBody from './productsDetailComponents/ProductsDetailBody'

export default function ProductsDetail() {
    const [product, setProduct] = useState({})
    const {id} = useParams()

    const getProduct = async (id) => {
        try {
            const response = {}
            setProduct(response?.data || {})
        } catch (error) {
            
        }
    }

    useEffect(() => {
        getProduct(id)
    },[])
  return (
    <div className='flex j-center'>
        <div className="container">
            <ProductsDetailHead product={product} />
            <ProductsDetailBody product={product} />
        </div>
    </div>
  )
}
