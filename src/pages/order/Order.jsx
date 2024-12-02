import React from 'react'
import AuthorizationHeading from '../../components/authorizationHeading/AuthorizationHeading'
import styles from './order.module.css'
import PageText from '../../content/PagesText.json'
import { useSelector } from 'react-redux';
import OrderLeft from './orderLeft/OrderLeft';
import OrderRight from './orderRight/OrderRight';

const { order } = PageText

export default function Order() {
    const { lang, finalCart } = useSelector((state) => state.baristica);

    return (
        <div className={styles.order + ' flex j-center'}>
            <div className="container">
                <div className={styles.order_title}>
                    <AuthorizationHeading heading={lang ? order[lang].heading : ''} />
                </div>
                {
                    finalCart.length
                    ?
                    <div className={`${styles.order_row} flex mt50 j-between g20`}>
                        <OrderLeft content={lang? order[lang] : {}} />
                        <OrderRight />
                    </div>
                :
                <p className="f24 fw400 darkGrey_color mt50">{lang ? order[lang].zeroProducts : ''}</p>
                }
                
            </div>
        </div>
    )
}
