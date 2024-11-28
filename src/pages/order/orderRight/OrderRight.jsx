import React from 'react'
import styles from './orderRight.module.css'
import { useSelector } from 'react-redux';
import OrderProduct from './orderProduct/OrderProduct';

import PageText from '../../../content/PagesText.json'
import OrderPrice from './orderPrice/OrderPrice';

const { profile, order } = PageText
export default function OrderRight() {
    const { lang, finalCart } = useSelector((state) => state.baristica);
    return (
        <div className={styles.orderRight}>
            {
                finalCart.length && finalCart.map((product, index) => (
                    <OrderProduct
                        key={product?._id ? product._id : index}
                        product={product}
                        weightText={lang ? profile[lang].cart.weight : ''}
                        grindityText={lang ? profile[lang].cart.grindity : ''}
                        codeText={lang ? profile[lang].cart.codeText : ''}
                    />
                ))
            }
            <OrderPrice finalCart={finalCart} text={order} lang={lang} />
        </div>
    )
}
