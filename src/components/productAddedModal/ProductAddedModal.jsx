import React, { useEffect, useRef } from 'react'
import styles from './productAddedModal.module.css'
import { Delete, Close } from '../../icons'

import pageText from '../../content/PagesText.json'
import { useNavigate } from "react-router-dom"
import { useDispatch, useSelector } from 'react-redux'
import { useRefClickOutside } from '../../hooks/useRefClickOutside'
import useBodyScrollLock from '../../hooks/useBodyScrollLock'
import { addProductToCart, deleteFromCart, setProfileActiveTab } from '../../redux/slice'
import { useLocalStorage } from '../../hooks/useLocalStorage'
const { productAdded, profile, grindingOptionsTranslate } = pageText

export default function ProductAddedModal({ status, setStatus, product, cartCount, setCartCount }) {
    const { lang, cart, token } = useSelector(state => state.baristica)
    const { getItemFromStorage, setItemToStorage } = useLocalStorage('baristica')
    const showWeight = ['Coffee', 'Tea', 'Mixed'].includes(product?.productType)

    const navigate = useNavigate()
    const dispatch = useDispatch()
    const modalRef = useRef(null);

    const deleteProduct = (id) => {
        if (cart.length === 1) {
            const baristicaObj = getItemFromStorage()
            setItemToStorage({ ...baristicaObj, cart: [], finalCart: [] })
        }
        dispatch(deleteFromCart(id))
        setStatus(false)
        setCartCount(1)
    }

    const findGrindingTranslation = (value) => {
        const option = grindingOptionsTranslate[lang].find((el) => el.value === value)?.text
        return option
    }

    const add = () => {
        dispatch(addProductToCart({_id: product._id, price: product.price, cartCount: cartCount}))
        setStatus(false)
        setCartCount(1)
    }

    // Закрытие при клике вне компонента
    useRefClickOutside(
        modalRef,
        () => {
            if (status) {
                add();
            }
        }
    );
    useBodyScrollLock(status);


    return (
        <div className={status ? 'modal active' : 'modal'} onClick={(e) => { e.stopPropagation(); }}>
            <div className={`${styles.modal} modalContent`} ref={modalRef}>
                <div className={`${styles.modalContent_head} flex j-between`}>
                    <h2 className="f32 fw700">{lang ? productAdded[lang].heading : ''}</h2>
                    <span className='pointer' onClick={() => {
                        add()
                    }}>{Close}</span>
                </div>

                <div className={styles.product + " mt24 flex j-between a-center"}>
                    <div className={`${styles.text}`}>
                        <h2 className='f20 fw700  darkGrey_color'>{product?.name ? product.name[lang] : 'COLOMBIA GESHA ANCESTRO'}</h2>
                        {
                            product.productType === 'Coffee'
                                ?
                                <p className="f16 fw400 darkGrey_color mt6">{lang ? profile[lang].cart.grindity : ''} {product?.grindingOption ? findGrindingTranslation(product.grindingOption) : ' для турки (мелкий)'}</p>
                                :
                                <></>
                        }
                        <div className={`${styles.weights} flex g8`}>
                            {showWeight ? (
                                <span>{product?.weight ? product.weight : '1000'} {lang ? productAdded[lang].weightAdding : ''}</span>
                            ) : (
                                <></>
                            )}
                            <span>{cartCount ? cartCount : '2'} {lang ? productAdded[lang].countAdding : ''}</span>
                        </div>
                    </div>
                    <div className="img">
                        <img src={product?.profileImage || ''} alt="" />
                    </div>
                </div>

                <div className={styles.final + " flex j-between a-center mt24"}>
                    <h2 className='f36 fw400'>
                        {lang ? productAdded[lang].total : ''} {product?.price ? product.price / 100 * cartCount : 84} ₼
                    </h2>
                    <span className='pointer' onClick={() => deleteProduct(product._id)}>{Delete}</span>
                </div>

                <div className={styles.buttons + " flex j-between"}>
                    <button onClick={() => {
                        setStatus(false)
                        add()
                        if (token) {
                            dispatch(setProfileActiveTab('cart'))
                            navigate('/profile')
                        } else {
                            navigate('/login')
                        }
                    }} className={styles.greenBtn + ' w-48'}>{lang ? productAdded[lang].greenBtn : ''}</button>
                    <button onClick={() => { add() }} className={styles.whiteBtn + ' w-48'}>{lang ? productAdded[lang].whiteBtn : ''}</button>
                </div>
            </div>
        </div>
    )
}
