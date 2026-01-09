import React, { useEffect, useState } from 'react'
import styles from './cartProduct.module.css'
import Counter from "../../../../../components/counter/Counter"
import { Delete } from '../../../../../icons'
import { useDispatch, useSelector } from 'react-redux'
import { changeCartCount, deleteFromCart, finalSelectProduct, setFinalCart } from '../../../../../redux/slice'
import { useLocalStorage } from '../../../../../hooks/useLocalStorage'
import PageText from '../../../../../content/PagesText.json'

const { profile } = PageText
export default function CartProduct({ product, grindingOptionsTranslate, weightText, grindityText }) {
    const [cartCount, setCartCount] = useState(1)
    const { lang, cart } = useSelector(state => state.baristica)
    const { getItemFromStorage, setItemToStorage } = useLocalStorage('baristica')
    const dispatch = useDispatch()
    
    const isDeleted = product?.deleted

    const onCheckbox = (e, product) => {
        if (isDeleted) return;
        const { checked } = e.target
        dispatch(setFinalCart({ checked, product }))
        dispatch(finalSelectProduct({ id: product._id, selected: checked }))
    }

    const deleteProduct = (id) => {
        if (isDeleted) return;
        if (cart.length === 1) {
            const baristicaObj = getItemFromStorage()
            setItemToStorage({ ...baristicaObj, cart: [], finalCart: [] })
        }
        dispatch(deleteFromCart(id))
    }

    const findGrindingTranslation = (value) => {
        const option = grindingOptionsTranslate[lang].find((el) => el.value === value)?.text
        return option
    }

    const changeCount = (type) => {
        if (isDeleted) return;
        dispatch(changeCartCount({ id: product._id, type: type }))
    }

    useEffect(() => {
        if (JSON.stringify(product) !== '{}') {
            setCartCount(product.cartCount)
        } 
        if (product.deleted) {
            dispatch(finalSelectProduct({ id: product._id, selected: false }))
        }
    }, [product])

    return (
        <div className={`${styles.product} ${isDeleted ? styles.deletedProduct : ''}`}>
            {isDeleted && (
                <div className={styles.deletedBadge}>
                    <svg width="12" height="12" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                    </svg>
                    <span>{lang ? profile[lang].cart.product_deleted_notice : ''}</span>
                </div>
            )}
            
            <div className={styles.left + " flex a-center g20"}>
                <input 
                    type="checkbox" 
                    checked={product.selectedForOrder && !isDeleted} 
                    onChange={(e) => onCheckbox(e, product)} 
                    disabled={isDeleted}
                />
                <img 
                    src={product?.profileImage || ''} 
                    alt="" 
                    className={isDeleted ? styles.deletedImage : ''}
                />
                <div>
                    <h2 className={`robotoFont f20 fw700 mt4 darkGrey_color ${isDeleted ? styles.strikethrough : ''}`}>
                        {product?.name ? product.name[lang] || product.name['az'] : 'COLOMBIA GESHA ANCESTRO'}
                    </h2>
                    {
                        product.productType === 'Coffee'
                            ?
                            <>
                                <h3 className={`robotoFont f16 fw400 mt4 darkGrey_color ${isDeleted ? styles.strikethrough : ''}`}>
                                    {grindityText} {product?.grindingOption ? findGrindingTranslation(product.grindingOption) : 'эспрессо'}
                                </h3>
                                <h3 className={`robotoFont f16 fw400 mt4 darkGrey_color ${isDeleted ? styles.strikethrough : ''}`}>
                                    {weightText} {product?.weight ? product.weight : '1000'} g
                                </h3>
                            </>
                            :
                            <></>
                    }
                </div>
            </div>

            <Counter 
                count={product.cartCount} 
                callBack={changeCount} 
                disabled={isDeleted}
            />

            <div className={styles.right + " flex a-center g20"}>
                <span className={`f24 fw400 darkGrey_color ${isDeleted ? styles.strikethrough : ''}`}>
                    {product?.price ? product.price / 100 * cartCount : '49'} ₼
                </span>
                <span 
                    className={`pointer`} 
                    onClick={() => deleteProduct(product._id)}
                >
                    {Delete}
                </span>
            </div>
        </div>
    )
}