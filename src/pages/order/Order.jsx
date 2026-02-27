import React, { useEffect, useState } from 'react'
import AuthorizationHeading from '../../components/authorizationHeading/AuthorizationHeading'
import styles from './order.module.css'
import PageText from '../../content/PagesText.json'
import { useSelector } from 'react-redux';
import OrderLeft from './orderLeft/OrderLeft';
import OrderRight from './orderRight/OrderRight';
import DeliveryService from '../../services/delivery.service';
import Loading from '../../components/loading/Loading';
import OrdersService from '../../services/orders.service';
import { handleApiReqRes } from '../../utils/handleApiReqRes.util';

const { order } = PageText

export default function Order() {
    const { lang, finalCart, token } = useSelector((state) => state.baristica);

    const [deliveryFee, setDeliveryFee] = useState(0)
    const [loading, setLoading] = useState(false)
    const [delivery, setDelivery] = useState(false)
    const [isFirstOrderDiscountActive, setIsFirstOrderDiscountActive] = useState(true)

    
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

    const getDiscountEligibility = async () => {
        if (!token) {
            setIsFirstOrderDiscountActive(true)
            return
        }

        try {
            const ordersService = new OrdersService()
            const [active, delivered] = await Promise.all([
                handleApiReqRes(ordersService.getOrders(token, 'active')),
                handleApiReqRes(ordersService.getOrders(token, 'delivered')),
            ])
            const activeOrders = active?.data?.orders || []
            const deliveredOrders = delivered?.data?.orders || []
            setIsFirstOrderDiscountActive(activeOrders.length + deliveredOrders.length === 0)
        } catch (error) {
            setIsFirstOrderDiscountActive(false)
        }
    }

    useEffect(() => {
        getDiscountEligibility()
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
                {/* <div className={styles.notice}>
                    <h3 className="f22 fw600 darkGrey_color">
                        {lang ? order[lang].shippingNoticeTitle : ''}
                    </h3>
                    <ul className={styles.noticeList}>
                        {(lang ? order[lang].shippingNoticeLines : []).map((line) => (
                            <li className="f18 fw400 darkGrey_color" key={line}>{line}</li>
                        ))}
                    </ul>
                </div> */}
                {
                    finalCart.length
                        ?
                        <div className={`${styles.order_row} flex mt50 j-between g20`}>
                            <OrderLeft delivery={delivery} setDelivery={setDelivery} content={lang ? order[lang] : {}} />
                            <OrderRight delivery={delivery} fee={deliveryFee} isFirstOrderDiscountActive={isFirstOrderDiscountActive} />
                        </div>
                        :
                        <p className="f24 fw400 darkGrey_color mt50">{lang ? order[lang].zeroProducts : ''}</p>
                }

            </div>
        </div>
    )
}
