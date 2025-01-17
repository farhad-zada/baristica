import React, { useEffect, useState } from 'react'
import ProductsDetailHead from './productsDetailComponents/ProductsDetailHead'
import { useLocation, useParams } from 'react-router-dom'
import ProductsDetailBody from './productsDetailComponents/ProductsDetailBody'
import Loading from '../../components/loading/Loading'
import ProductsService from '../../services/products.service'
import { useDispatch, useSelector } from 'react-redux'
import Error from '../../components/error/Error'
import { setTabIdx } from '../../redux/slice'

export default function ProductsDetail() {
    const { token } = useSelector(state => state.baristica)
    const [product, setProduct] = useState({})
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(false)
    const { id } = useParams()
    const { pathname } = useLocation();

    const dispatch = useDispatch()
    const productsService = new ProductsService()
    const getProduct = async (id) => {
        setLoading(true)
        try {
            const response = await productsService.getOneProduct(token, id)
            setProduct(response?.data || {})
        } catch (error) {
            setError(true)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        getProduct(id)
    }, [pathname])

    useEffect(() => {
        return () => {
            dispatch(setTabIdx(null))
        }
    },[])
    return (
        <div className='flex j-center'>
            <Loading status={loading} />
            <Error status={error} setStatus={setError} />

            {
                JSON.stringify(product) !== '{}'
                    ?
                    <div className="container">
                        <ProductsDetailHead product={product} />
                        <ProductsDetailBody product={product} />
                    </div>
                    :
                    <></>
            }
        </div>
    )
}
