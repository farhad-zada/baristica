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
import Pagination from '../../components/pagination/Pagination'

const { favorites } = PageText

export default function Favorites() {
    const [products, setProducts] = useState([])
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(false)
    const [message, setMessage] = useState("Something went wrong.")
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    const { lang, token } = useSelector((state) => state.baristica);
    const dispatch = useDispatch()
    const favoritesService = new FavoritesService()

    const handlePageChange = (page) => {
        setCurrentPage(page);
        window.scrollTo(0, 0);
    };

    const addAllToCart = () => {
        products.map((product) => {
            if (product.productType !== 'Machine') {
                dispatch(addProductToCart({ ...product, cartCount: 1 }))
            }
        })
    }

    const getFavorites = async (page) => {
        setLoading(true)
        try {
            const response = await favoritesService.getFavorites(token, page)
             if (response.status >= 400) {
                throw new Error("Couldn't fetch favorites: Application backend is down.");
            }
            setProducts(response.data)
        } catch (error) {
            setError(true)
            setMessage(error.message);
        } finally {
            setLoading(false)
        }
    }

    // useEffect(() => {
    //     getFavorites()
    // }, [])

    useEffect(() => {
        getFavorites(currentPage)
    }, [currentPage])

    return (
        <div className={styles.favorites + ' flex j-center'}>
            <Loading status={loading} />
            <Error status={error} setStatus={setError} message={message} />

            <div className="container">
                <AuthorizationHeading heading={lang ? favorites[lang].heading : ''} />
                <div className={styles.addAll}>
                    <button onClick={addAllToCart}>
                        {lang ? favorites[lang].addBtn : ''}
                    </button>
                </div>
                <ProductsList products={products} />
                <Pagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPageChange={handlePageChange}
                />
            </div>
        </div>
    )
}
