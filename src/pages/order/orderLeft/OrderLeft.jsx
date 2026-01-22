import { useEffect, useReducer, useState } from 'react'
import InputText from '../../../components/form/inputField/InputText'
import PageText from '../../../content/PagesText.json'
import { useSelector } from 'react-redux'
import styles from './orderLeft.module.css'
import UserAddress from '../../../components/userAddress/UserAddress'
import AddAddress from '../../../components/userAddress/add/AddAddress'
import AuthButton from '../../../components/form/button/AuthButton'
import OrdersService from '../../../services/orders.service'
import Loading from '../../../components/loading/Loading'
import Error from '../../../components/error/Error'
import Success from '../../../components/success/Success'
import { handleApiReqRes } from '../../../utils/handleApiReqRes.util';
import { addressReducer } from '../../../utils/addressReducer';

const { order, profile } = PageText

export default function OrderLeft({ content, delivery, setDelivery }) {

    const [formData, setFormData] = useState({
        name: "",
        phone: "",
        comment: "",
    })
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(false)
    const [message, setMessage] = useState("Something went wrong")
    const [success, setSuccess] = useState(false)
    const [byCard, setByCard] = useState(true)
    const [addresses, dispatch] = useReducer(addressReducer, []);

    const [add, setAdd] = useState(false)

    const { lang, finalCart, user, token } = useSelector((state) => state.baristica);

    const ordersService = new OrdersService()

    const onSubmit = async () => {
        if ((delivery && !formData.time) || (delivery && !formData.date)) {

            setMessage("Please set up delivery time and date")
            setError(true)
            return
        }

        let selectedAddressId = null;
        for (let addr of addresses) {
            if (addr.selected) {
                selectedAddressId = addr._id;
                break;
            } else if (addr.isPrimary) {
                selectedAddressId = addr._id;
            }
        }
        const data = {
            language: lang,
            order: {
                customer: {
                    name: formData.name,
                    phone: formData.phone
                },
                deliveryMethod: delivery ? 'delivery' : 'pickup',
                address: selectedAddressId,
                deliveryAddress: selectedAddressId,
                items: finalCart.map((product) => {
                    const { _id, cartCount, grindingOption } = product
                    return { product: _id, quantity: cartCount, grindingOption: grindingOption }
                }),
                paymentMethod: byCard ? 'card' : "cash",
                notes: formData.comment,
                deliveryHour: formData.time,
                deliveryDate: formData.date
            }
        }
        console.log(selectedAddressId);
        setLoading(true)
        try {
            const request = ordersService.createOrder(token, data)
            const response = await handleApiReqRes(request);
            const url = response.data.redirect.redirect_url
            if (url) {
                window.location.href = url
            }
            setSuccess(true)

        } catch (error) {
            setError(true)
            setMessage(error.message);
        } finally {
            setLoading(false)
        }
    }

    const handleInputChange = (name, value) => {
        setFormData((prev) => ({ ...prev, [name]: value }));
    }

    const formatDate = (date) => {
        return date.toISOString().split('T')[0]; // "2025-07-28"
    };

    const formatTime = (date) => {
        const hours = String(date.getHours()).padStart(2, '0');
        const minutes = String(date.getMinutes()).padStart(2, '0');
        return `${hours}:${minutes}`; // "15:30"
    };

    useEffect(() => {
        const now = new Date();
        const currentHour = now.getHours();
        const currentMinutes = now.getMinutes();

        let deliveryDate, deliveryTime;

        if (currentHour < 15) {
            // Round to next half-hour (e.g., 12:12 → 15:00, 12:32 → 15:30)
            let roundedHours = currentHour + 3;
            let roundedMinutes = 0;

            if (currentMinutes >= 30) {
                roundedMinutes = 30;
            }

            // Ensure time is in HH:MM format (e.g., 15:00, 15:30)
            const roundedTime = new Date(now);
            roundedTime.setHours(roundedHours, roundedMinutes, 0, 0);

            deliveryDate = formatDate(roundedTime);
            deliveryTime = formatTime(roundedTime);
        } else {
            // Tomorrow at 10:00
            const tomorrow = new Date(now);
            tomorrow.setDate(tomorrow.getDate() + 1);
            tomorrow.setHours(10, 0, 0, 0);
            deliveryDate = formatDate(tomorrow);
            deliveryTime = formatTime(tomorrow);
        }

        if (JSON.stringify(user) !== '{}') {
            dispatch({ type: 'INIT', payload: user.addresses });
            setFormData({ name: user.name, phone: user.phone, comment: "", time: deliveryTime, date: deliveryDate });
        }
    }, [user])

    // useEffect(() => {
    //     if (!addresses.length) return

    //     const alreadySelected = addresses.some(a => a.selected)
    //     if (alreadySelected) return

    //     const mainAddress =
    //         addresses.find(a => a.isPrimary) || addresses[0]

    //     dispatch({
    //         type: 'SET_SELECTED',
    //         payload: mainAddress._id
    //     })
    // }, [addresses])


    return (
        <div className={styles.orderLeft}>
            <Loading status={loading} />
            <Error status={error} setStatus={setError} message={message} />
            <Success status={success} setStatus={setSuccess} />
            <div className="orderInfo_component">
                <h2 className='f32 fw700'>{content ? content.personalInfoHeading : ''}</h2>
                <InputText
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder={lang ? order[lang].nameInput : ''}
                />

                <InputText
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    placeholder={lang ? order[lang].phoneInput : ''}
                />
            </div>

            {
                delivery
                    ?
                    <div className="orderInfo_component">
                        <h2 className='f32 fw700'>{content ? content.timeHeading : ''}</h2>
                        <div className="flex g20 mt20">
                            <InputText
                                name="time"
                                type='time'
                                value={formData.time}
                                onChange={handleInputChange}
                                placeholder={lang ? order[lang].nameInput : ''}
                            />

                            <InputText
                                name="date"
                                type='date'
                                value={formData.date}
                                onChange={handleInputChange}
                                placeholder={lang ? order[lang].phoneInput : ''}
                            />
                        </div>
                    </div>
                    :
                    <></>
            }

            <div className="orderInfo_component">
                <h2 className='f32 fw700'>{content ? content.placeHeading : ''}</h2>
                <div className='mt20'>
                    <label className={delivery ? styles.label : styles.labelActive}>
                        <input name='delivery' type="radio" checked={!delivery} onClick={() => setDelivery(false)} />
                        {content ? content.pickupInput : ''}
                    </label>

                </div>
                <div>
                    <label className={delivery ? styles.labelActive : styles.label}>
                        <input name='delivery' type="radio" onClick={() => setDelivery(true)} />
                        {content ? content.deliveryInput : ''}

                    </label>
                </div>

                {
                    delivery
                        ?
                        <>

                            {
                                addresses.length
                                    ?
                                    addresses.map((address, index) => (
                                        <UserAddress
                                            content={lang ? profile[lang].addresses : {}}
                                            address={address}
                                            radio={true}
                                            index={index + 1}
                                            dispatch={dispatch} />
                                    ))
                                    :
                                    <></>
                            }

                            <button
                                type='button'
                                className={styles.addBtn}
                                onClick={() => setAdd(!add)}
                            >
                                {lang ? profile[lang].addresses.addBtn : ''}
                            </button>

                            {
                                add
                                    ?
                                    <AddAddress dispatch={dispatch} setAdd={setAdd} />
                                    :
                                    <></>
                            }
                        </>
                        :
                        <></>
                }
            </div>

            <div className="orderInfo_component">
                <h2 className='f32 fw700'>{content ? content.commentHeading : ''}</h2>
                <InputText
                    name="comment"
                    value={formData.comment}
                    onChange={handleInputChange}
                    placeholder={lang ? order[lang].commentInput : ''}
                />
            </div>

            <div className="orderInfo_component">
                <h2 className='f32 fw700'>{content ? content.paymentHeading : ''}</h2>

                <div className="flex g20 mt20">
                    {
                        !delivery
                            ?
                            <div className="flex a-center g8 pointer" onClick={() => setByCard(false)}>
                                <span className={styles.circle} >
                                    {
                                        !byCard
                                            ?
                                            <span className={styles.blueCircle}></span>
                                            :
                                            <></>
                                    }
                                </span>
                                <span className='f20 fw400'>
                                    {content ? content.byCash : ''}
                                </span>
                            </div>
                            :
                            <></>
                    }


                    <div className="flex a-center g8 pointer" onClick={() => setByCard(true)}>
                        <span className={styles.circle} >
                            {
                                byCard
                                    ?
                                    <span className={styles.blueCircle}></span>
                                    :
                                    <></>
                            }
                        </span>
                        <span className='f20 fw400'>
                            {content ? content.byCard : ''}
                        </span>
                    </div>

                </div>

            </div>
            <AuthButton text={content ? content.submitBtn : ''} onClick={onSubmit} />
            <p className="mt20 f20 fw400 darkGrey_color">{content ? content.hint : ''}</p>
        </div >
    )
}
