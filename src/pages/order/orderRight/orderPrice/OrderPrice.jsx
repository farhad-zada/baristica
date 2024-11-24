import React from 'react'
import styles from './orderPrice.module.css'

export default function OrderPrice({ finalCart, text, lang }) {

    const calculateFinalPrice = (finalCart) => {
        return 100
    }

    const calculateProductPrice = (product) => {
        return 32
    }

    return (
        <div className={styles.priceComponent}>
            <div className="flex j-between a-center">
                <h2 className="f24 fw700">{lang ? text[lang].priceHeading : ''}</h2>
                <span className='f24 fw400 darkGrey_color'>{calculateFinalPrice(finalCart)} ₼</span>
            </div>

            <div className={styles.products}>
                {
                    finalCart.length && finalCart.map((product, index) => (
                        <div
                            className='flex j-between'
                            key={product?.id ? product.id : index}
                        >
                            <p className="flex g8 f16 fw400 darkGrey_color">
                                <span>{product?.cartCount ? product.cartCount : '1'}</span>
                                <span>X</span>
                                <span>{product?.name ? product.name : 'COLOMBIA GESHA ANCESTRO'}</span>
                            </p>
                            <p className="f24 fw400 darkGrey_color">
                                {calculateProductPrice(product)} ₼
                            </p>
                        </div>
                    ))
                }
            </div>

            <div className="flex j-between a-center">
                <h2 className="f24 fw700">
                    {lang ? text[lang].priceDeliveryHeading : ''}
                </h2>
                <p className="f24 fw400 darkGrey_color">
                    3 ₼
                </p>
            </div>

            <div className="flex j-between a-center mt20">
                <h2 className="f24 fw700">
                    {lang ? text[lang].discountHeading : ''}
                </h2>
                <p className="f24 fw400 darkGrey_color">
                    0 ₼
                </p>
            </div>

            <div className={styles.total + " flex j-between a-center mt20"}>
                <h2 className="f24 fw700">
                    {lang ? text[lang].total : ''}
                </h2>
                <p className="f24 fw400 darkGrey_color">
                    87 ₼
                </p>
            </div>
        </div>
    )
}
