import React from 'react'
import ProductType from './ProductType'
import styles from '../productsCss/productTypes.module.css'

export default function ProductTypes({ content }) {
    
    return (
        <div className={`${styles.productTypes} flex`}>
            {
                content.map((element, index) => (
                    <ProductType width={content.length ? `${100 / content.length}%` : '100%'} type={element} key={index} />
                ))
            }
        </div>
    )
}
