import React, { useEffect, useState } from 'react'
import styles from './cartProduct.module.css'
import Counter from "../../../../../components/counter/Counter"
import { Delete } from '../../../../../icons'
import { useDispatch, useSelector } from 'react-redux'
import { deleteFromCart, setFinalCart } from '../../../../../redux/slice'


export default function CartProduct({ product, weightText, grindityText }) {
    const [cartCount, setCartCount] = useState(1)
    const { lang } = useSelector(state => state.baristica)
    const dispatch = useDispatch()
    const onCheckbox = (e, product) => {
        const { checked } = e.target
        dispatch(setFinalCart({ checked, product }))

    }

    const deleteProduct = (id) => {
        dispatch(deleteFromCart(id))
    }

    useEffect(() => {
        if (JSON.stringify(product) !== '{}') {
            setCartCount(product.cartCount)
        }
    }, [product])


    return (
        <div className={styles.product}>
            <div className="left flex a-center g20">
                <input type="checkbox" onChange={(e) => onCheckbox(e, product)} />
                <img src="" alt="" />
                <div>
                    <h2 className="f20 fw700 mt4 darkGrey_color">{product?.name ? product.name[lang] || product.name['az'] : 'COLOMBIA GESHA ANCESTRO'}</h2>
                    <h3 className="f16 fw400 mt4 darkGrey_color">{grindityText} {product?.selectedGrinding ? product.selectedGrinding : 'эспрессо'}</h3>
                    <h3 className="f16 fw400 mt4 darkGrey_color">{weightText} {product?.selectedWeight ? product.selectedWeight : '1000'} g</h3>
                </div>
            </div>

            <Counter count={cartCount} setCount={setCartCount} />

            <div className="right flex a-center g20">
                <span className='f24 fw400 darkGrey_color'>{product?.price ? product.price/100 * cartCount : '49'} ₼</span>
                <span className='pointer' onClick={() => deleteProduct(product._id)}>{Delete}</span>
            </div>
        </div>
    )
}
