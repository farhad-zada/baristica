import React from 'react'
import ProductCard from '../../../components/productCard/ProductCard'
import styles from '../productsCss/productsList.module.css'
export default function ProductsList({products}) {
  return (
    <div className={`${styles.productsList}`}>
        {
            products?.length && products.map((product, index) => (
                <ProductCard product={product} width={'15%'} />
            ))
        }
    </div>
  )
}
