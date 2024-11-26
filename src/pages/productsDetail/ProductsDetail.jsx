import React, { useEffect, useState } from 'react'
import ProductsDetailHead from './productsDetailComponents/ProductsDetailHead'
import { useParams } from 'react-router-dom'
import ProductsDetailBody from './productsDetailComponents/ProductsDetailBody'
import Loading from '../../components/loading/Loading'

export default function ProductsDetail() {
    const [product, setProduct] = useState({})
    const [loading, setLoading] = useState(false)
    const { id } = useParams()

    const getProduct = async (id) => {
        setLoading(true)
        try {
            const response = {}
            setProduct(response?.data || {})
        } catch (error) {

        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        getProduct(id)
    }, [])
    return (
        <div className='flex j-center'>
            <Loading status={loading} />
            <div className="container">
                <ProductsDetailHead product={product} />
                <ProductsDetailBody product={product} />
            </div>
        </div>
    )
}
