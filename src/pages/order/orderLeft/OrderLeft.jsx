import React, { useState } from 'react'
import InputText from '../../../components/form/inputField/InputText'
import PageText from '../../../content/PagesText.json'
import { useSelector } from 'react-redux'
import styles from './orderLeft.module.css'
import UserAddress from '../../../components/userAddress/UserAddress'
import AddAddress from '../../../components/userAddress/add/AddAddress'
import AuthButton from '../../../components/form/button/AuthButton'
const { order, profile } = PageText

export default function OrderLeft({content}) {
    const [formData, setFormData] = useState({
        name: "",
        phone: "",
        comment: ""
    })

    const [delivery, setDelivery] = useState(false)
    const [byCard, setByCard] = useState(true)

    const [addresses, setAddresses] = useState([
        {
            id: 0,
            city: "Baku",
            street: "Ул. Зарифа Алиева 12",
            house: "кв. 14",
            main: false,
            selected: true
        },
        {
            id: 1,
            city: "Baku",
            street: "Ул. Зарифа Алиева 12",
            house: "кв. 14",
            main: false
        }
    ])

    const [add, setAdd] = useState(false)

    const { lang, finalCart } = useSelector((state) => state.baristica);

    const onSubmit = async () => {
        const data = {
            language: lang,
            order:{
                customer: {
                    name: formData.name,
                    phone: formData.phone
                },
                deliveryMethod: delivery ? 'delivery' : 'pickup',
                items: finalCart.map((product) => {
                    return {product: product._id, quantity: product.cartCount}
                })
            }
        }
        try {
            
        } catch (error) {
            
        }
    }

    const handleInputChange = (name, value) => {
        setFormData((prev) => ({ ...prev, [name]: value }));
    }
    return (
        <div className={styles.orderLeft}>
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

            <div className="orderInfo_component">
                <h2 className='f32 fw700'>{content ? content.placeHeading : ''}</h2>
                <div className='mt20'>
                    <label className={delivery ? styles.label : styles.labelActive}>
                        <input name='delivery' type="radio" onClick={() => setDelivery(false)} />
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
                                        <UserAddress address={address} radio={true} key={index} setAddresses={setAddresses} />
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
