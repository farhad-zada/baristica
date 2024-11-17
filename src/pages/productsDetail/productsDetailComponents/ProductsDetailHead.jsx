import React from 'react'
import ProductsDetailHeadLeft from './ProductsDetailHeadLeft'
import ProductsDetailHeadRight from './ProductsDetailHeadRight'
import styles from '../productDetailComponentsCss/productsDetailHead.module.css'

export default function ProductsDetailHead({ product }) {
    return (
        <div className={`${styles.productDetail_head} flex`}>
            <ProductsDetailHeadLeft product={product} />
            <ProductsDetailHeadRight product={product} />
        </div>
    )
}
