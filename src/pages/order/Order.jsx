import React from 'react'
import AuthorizationHeading from '../../components/authorizationHeading/AuthorizationHeading'
import styles from './order.module.css'
import PageText from '../../content/PagesText.json'
import { useSelector } from 'react-redux';
import OrderLeft from './orderLeft/OrderLeft';
import OrderRight from './orderRight/OrderRight';

const { order } = PageText

export default function Order() {
    const { lang } = useSelector((state) => state.baristica);

    return (
        <div className={styles.order + ' flex j-center'}>
            <div className="container">
                <AuthorizationHeading heading={lang ? order[lang].heading : ''} />

                <div className="flex mt50 j-between g20">
                    <OrderLeft content={lang? order[lang] : {}} />
                    <OrderRight />
                </div>
            </div>
        </div>
    )
}
