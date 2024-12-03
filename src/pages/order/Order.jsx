import React, { useEffect, useState } from 'react'
import AuthorizationHeading from '../../components/authorizationHeading/AuthorizationHeading'
import styles from './order.module.css'
import PageText from '../../content/PagesText.json'
import { useSelector } from 'react-redux';
import OrderLeft from './orderLeft/OrderLeft';
import OrderRight from './orderRight/OrderRight';
import DeliveryService from '../../services/delivery.service';
import Loading from '../../components/loading/Loading';

const { order } = PageText

export default function Order() {
    const { lang, finalCart, token } = useSelector((state) => state.baristica);

    const [deliveryFee, setDeliveryFee] = useState(0)
    const [loading, setLoading] = useState(false)

    const deliveryService = new DeliveryService()


    const getDeliveryFee = async () => {
        setLoading(true)
        try {
            const response = await deliveryService.getFee(token)
            setDeliveryFee(response.fee)
        } catch (error) {

        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        if (token) {
            getDeliveryFee()
        }
    }, [token])
    return (
        <div className={styles.order + ' flex j-center'}>
            <Loading status={loading} />
            <div className="container">
                <div className={styles.order_title}>
                    <AuthorizationHeading heading={lang ? order[lang].heading : ''} />
                </div>
                {
                    finalCart.length
                        ?
                        <div className={`${styles.order_row} flex mt50 j-between g20`}>
                            <OrderLeft content={lang ? order[lang] : {}} />
                            <OrderRight fee={deliveryFee} />
                        </div>
                        :
                        <p className="f24 fw400 darkGrey_color mt50">{lang ? order[lang].zeroProducts : ''}</p>
                }

            </div>
        </div>
    )
}
