import React, { useState } from 'react'
import AuthorizationHeading from '../../components/authorizationHeading/AuthorizationHeading'
import styles from './favorites.module.css'
import PageText from '../../content/PagesText.json'
import { useDispatch, useSelector } from 'react-redux'
import ProductsList from '../products/productsComponents/ProductsList'

const { favorites } = PageText

export default function Favorites() {
    const [products, setProducts] = useState([1, 3, 2, 4])
    const { lang } = useSelector((state) => state.baristica);
    const dispatch = useDispatch()

    const addAllToCart = () => {

    }
    return (
        <div className={styles.favorites + ' flex j-center'}>
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
