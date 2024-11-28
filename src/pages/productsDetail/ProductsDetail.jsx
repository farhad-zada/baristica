import React, { useEffect, useState } from 'react'
import ProductsDetailHead from './productsDetailComponents/ProductsDetailHead'
import { useLocation, useParams } from 'react-router-dom'
import ProductsDetailBody from './productsDetailComponents/ProductsDetailBody'
import Loading from '../../components/loading/Loading'
import ProductsService from '../../services/products.service'
import { useSelector } from 'react-redux'

export default function ProductsDetail() {
    const {token} = useSelector(state => state.baristica)
    const [product, setProduct] = useState({})
    const [loading, setLoading] = useState(false)
    const { id } = useParams()
  const { pathname } = useLocation();


    const productsService = new ProductsService()
    const getProduct = async (id) => {
        setLoading(true)
        try {
            const response = await productsService.getOneProduct(token, id)
            setProduct(response?.data || {})
        } catch (error) {

        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        getProduct(id)
    }, [pathname])
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
