import React, { useEffect, useState } from 'react'
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
const { order, profile } = PageText

export default function OrderLeft({ content, delivery, setDelivery }) {
    const [formData, setFormData] = useState({
        name: "",
        phone: "",
        comment: ""
    })
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(false)
    const [errorMessage, setErrorMessage] = useState({})
    const [success, setSuccess] = useState(false)
    const [byCard, setByCard] = useState(true)
    const [selectedAddress, setSelectedAddress] = useState({})

    const [addresses, setAddresses] = useState([

    ])

    const [add, setAdd] = useState(false)

    const { lang, finalCart, user, token } = useSelector((state) => state.baristica);

    const ordersService = new OrdersService()

    const onSubmit = async () => {
        if((delivery && !formData.time) || (delivery && !formData.date)){

            setErrorMessage({
                az:'Zəhmət olmasa çatdırılma vaxtını və tarixini qeyd edin',
                ru:"Пожалуйста выберите  время и дату доставки",
                en:"Please set up delivery time and date"
            })
            setError(true)
            return
        }
        const data = {
            language: lang,
            order: {
                customer: {
                    name: formData.name,
                    phone: formData.phone
                },
                deliveryMethod: delivery ? 'delivery' : 'pickup',
                address: selectedAddress._id,
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

        setLoading(true)
        try {
            const response = await ordersService.createOrder(token, data)
            const url = response.data.redirect.redirect_url
            if (url) {
                window.location.href = url
            }
            setSuccess(true)

        } catch (error) {
            setError(true)
        } finally {
            setLoading(false)
        }
    }

    const handleInputChange = (name, value) => {
        setFormData((prev) => ({ ...prev, [name]: value }));
    }


    useEffect(() => {
        if (JSON.stringify(user) !== '{}') {
            setAddresses(user.addresses)
            setFormData({ name: user.name, phone: user.phone, comment: "" })
        }
    }, [user])

    useEffect(() => {
        if (addresses.length) {
            const mainAddress = addresses.find((address) => address.isMain === true) || addresses[0]
            setSelectedAddress(mainAddress)
        }
    }, [addresses])

    return (
        <div className={styles.orderLeft}>
            <Loading status={loading} />
            <Error status={error} setStatus={setError} message={errorMessage} />
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
                                        <UserAddress content={lang ? profile[lang].addresses : {}} address={address} selectedAddress={selectedAddress} setSelectedAddress={setSelectedAddress} radio={true} key={index} setAddresses={setAddresses} />
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
                                    <AddAddress setAddresses={setAddresses} setAdd={setAdd} />
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
