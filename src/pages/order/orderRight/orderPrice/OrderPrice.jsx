import React from 'react'
import styles from './orderPrice.module.css'
import { calculateTotalPrice } from '../../../../utils/price.util'
import { getDiscountAmount } from '../../../../utils/discount.util'

export default function OrderPrice({ finalCart, delivery, text, lang, fee, isFirstOrderDiscountActive }) {


    const calculateProductPrice = (product) => {
        return (product.price / 100 * product.cartCount)
    }

    const subtotal = calculateTotalPrice(finalCart)
    const discountAmount = isFirstOrderDiscountActive ? getDiscountAmount(subtotal) : 0
    const deliveryAmount = delivery ? fee / 100 : 0
    const total = subtotal - discountAmount + deliveryAmount

    return (
        <div className={styles.priceComponent}>
            <div className="flex j-between a-center">
                <h2 className="f24 fw700">{lang ? text[lang].priceHeading : ''}</h2>
                <span className='f24 fw400 darkGrey_color'>{subtotal.toFixed(2)} ₼</span>
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
                                <span>{product?.name ? product.name[lang] || product.name['az'] : 'COLOMBIA GESHA ANCESTRO'}</span>
                            </p>
                            <p className="f24 fw400 darkGrey_color">
                                {calculateProductPrice(product).toFixed(2)} ₼
                            </p>
                        </div>
                    ))
                }
            </div>

            {
                delivery
                ?
                <div className="flex j-between a-center">
                <h2 className="f24 fw700">
                    {lang ? text[lang].priceDeliveryHeading : ''}
                </h2>
                <p className="f24 fw400 darkGrey_color">
                    {fee/100} ₼
                </p>
            </div>
            :
            <> </>
            }

            <div className="flex j-between a-center mt20">
                <h2 className="f24 fw700">
                    {lang ? text[lang].discountHeading : ''}
                </h2>
                <p className="f24 fw400 darkGrey_color">
                    -{discountAmount.toFixed(2)} ₼
                </p>
            </div>

            <div className={styles.total + " flex j-between a-center mt20"}>
                <h2 className="f24 fw700">
                    {lang ? text[lang].total : ''}
                </h2>
                <p className="f24 fw400 darkGrey_color">
                    {total.toFixed(2)} ₼
                </p>
            </div>
        </div>
    )
}
