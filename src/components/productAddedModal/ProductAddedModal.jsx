import React, { useRef } from 'react'
import styles from './productAddedModal.module.css'
import { Delete, Close } from '../../icons'

import pageText from '../../content/PagesText.json'
import { useNavigate } from "react-router-dom"
import { useDispatch, useSelector } from 'react-redux'
import { useRefClickOutside } from '../../hooks/useRefClickOutside'
import useBodyScrollLock from '../../hooks/useBodyScrollLock'
import { deleteFromCart, setProfileActiveTab } from '../../redux/slice'
const { productAdded } = pageText

export default function ProductAddedModal({ status, setStatus, product }) {
    const { lang } = useSelector(state => state.baristica)
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const modalRef = useRef(null);

    const deleteProduct = (id) => {
        dispatch(deleteFromCart(id))
        setStatus(false)
    }

    // Закрытие при клике вне компонента
    useRefClickOutside(modalRef, () => setStatus(false));
    useBodyScrollLock(status);
    
    return (
        <div className={status ? 'modal active' : 'modal'} onClick={(e) => e.stopPropagation()}>
            <div className="modalContent" ref={modalRef}>
                <div className="modalContent_head flex j-between">
                    <h2 className="f32 fw700">{lang ? productAdded[lang].heading : ''}</h2>
                    <span className='pointer' onClick={() => {
                        setStatus(false)
                    }}>{Close}</span>
                </div>

                <div className={styles.product + " mt24 flex j-between a-center"}>
                    <div className="text">
                        <h2 className='f20 fw700  darkGrey_color'>{product?.name ? product.name[lang] : 'COLOMBIA GESHA ANCESTRO'}</h2>
                        <p className="f16 fw400 darkGrey_color mt6">{product?.selectedGrinding ? product.selectedGrinding : 'Помол: для турки (мелкий)'}</p>
                        <div className="flex g8">
                            <span>{product?.selectedWeight ? product.selectedWeight : '1000'} {lang ? productAdded[lang].weightAdding : ''}</span>
                            <span>{product?.cartCount ? product.cartCount : '2'} {lang ? productAdded[lang].countAdding : ''}</span>
                        </div>
                    </div>
                    <div className="img">
                        <img src={product?.img ? product.img : ''} alt="" />
                    </div>
                </div>

                <div className={styles.final + " flex j-between a-center mt24"}>
                    <h2 className='f36 fw400'>
                        {lang ? productAdded[lang].total : ''} {product?.finalPrice ? product.finalPrice : 84} ₼
                    </h2>
                    <span className='pointer' onClick={() => deleteProduct(product.id)}>{Delete}</span>
                </div>

                <div className={styles.buttons + " flex j-between"}>
                    <button onClick={() => {
                        setStatus(false)
                        dispatch(setProfileActiveTab('cart'))
                        navigate('/profile')
                    }} className={styles.greenBtn + ' w-48'}>{lang ? productAdded[lang].greenBtn : ''}</button>
                    <button onClick={() => setStatus(false)} className={styles.whiteBtn + ' w-48'}>{lang ? productAdded[lang].whiteBtn : ''}</button>
                </div>
            </div>
        </div>
    )
}
