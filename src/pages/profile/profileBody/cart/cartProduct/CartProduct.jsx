import React, { useEffect, useState } from 'react'
import styles from './cartProduct.module.css'
import Counter from "../../../../../components/counter/Counter"
import { Delete } from '../../../../../icons'
import { useDispatch, useSelector } from 'react-redux'
import { changeCartCount, deleteFromCart, finalSelectProduct, setFinalCart } from '../../../../../redux/slice'
import { useLocalStorage } from '../../../../../hooks/useLocalStorage'


export default function CartProduct({ product, weightText, grindityText }) {
    const [cartCount, setCartCount] = useState(1)
    const { lang, cart } = useSelector(state => state.baristica)
    const { getItemFromStorage, setItemToStorage } = useLocalStorage('baristica')

    const dispatch = useDispatch()
    const onCheckbox = (e, product) => {
        const { checked } = e.target
        dispatch(setFinalCart({ checked, product }))
        dispatch(finalSelectProduct({ id: product._id, selected: checked }))
    }

    const deleteProduct = (id) => {
        if (cart.length === 1) {
            const baristicaObj = getItemFromStorage()
            setItemToStorage({ ...baristicaObj, cart: [], finalCart: [] })
        }
        dispatch(deleteFromCart(id))

    }

    const changeCount = (type) => {
        dispatch(changeCartCount({ id: product._id, type: type }))
    }

    useEffect(() => {
        if (JSON.stringify(product) !== '{}') {
            setCartCount(product.cartCount)
        }
    }, [product])


    return (
        <div className={styles.product}>
            <div className={styles.left + " flex a-center g20"}>
                <input type="checkbox" checked={product.selectedForOrder} onChange={(e) => onCheckbox(e, product)} />
                <img src={product?.profileImage || ''} alt="" />
                <div>
                    <h2 className="robotoFont f20 fw700 mt4 darkGrey_color">{product?.name ? product.name[lang] || product.name['az'] : 'COLOMBIA GESHA ANCESTRO'}</h2>
                    <h3 className="robotoFont f16 fw400 mt4 darkGrey_color">{grindityText} {product?.selectedGrinding ? product.selectedGrinding : 'эспрессо'}</h3>
                    <h3 className="robotoFont f16 fw400 mt4 darkGrey_color">{weightText} {product?.selectedWeight ? product.selectedWeight : '1000'} g</h3>
                </div>
            </div>

            <Counter count={product.cartCount} callBack={changeCount} />

            <div className={styles.right + " flex a-center g20"}>
                <span className='f24 fw400 darkGrey_color'>{product?.price ? product.price / 100 * cartCount : '49'} ₼</span>
                <span className='pointer' onClick={() => deleteProduct(product._id)}>{Delete}</span>
            </div>
        </div>
    )
}
