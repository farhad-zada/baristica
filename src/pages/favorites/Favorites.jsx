import React, { useEffect, useState } from 'react'
import AuthorizationHeading from '../../components/authorizationHeading/AuthorizationHeading'
import styles from './favorites.module.css'
import PageText from '../../content/PagesText.json'
import { useDispatch, useSelector } from 'react-redux'
import ProductsList from '../products/productsComponents/ProductsList'
import FavoritesService from '../../services/favorites.service'
import Loading from '../../components/loading/Loading'
import { addProductToCart } from '../../redux/slice'
import Error from '../../components/error/Error'

const { favorites } = PageText

export default function Favorites() {
    const [products, setProducts] = useState([])
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(false)

    const { lang, token } = useSelector((state) => state.baristica);
    const dispatch = useDispatch()
    const favoritesService = new FavoritesService()

    const addAllToCart = () => {
        products.map((product) => {
            if (product.productType !== 'Machine') {
                dispatch(addProductToCart({ ...product, cartCount: 1 }))
            }
        })
    }

    const getFavorites = async () => {
        setLoading(true)
        try {
            const response = await favoritesService.getFavorites(token)
            setProducts(response.data)
        } catch (error) {
            setError(true)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        getFavorites()
    }, [])

    return (
        <div className={styles.favorites + ' flex j-center'}>
            <Loading status={loading} />
            <Error status={error} setStatus={setError} />

            <div className="container">
                <AuthorizationHeading heading={lang ? favorites[lang].heading : ''} />
                <div className={styles.addAll}>
                    <button onClick={addAllToCart}>
                        {lang ? favorites[lang].addBtn : ''}
                    </button>
                </div>
                <ProductsList products={products} />
            </div>
        </div>
    )
}
