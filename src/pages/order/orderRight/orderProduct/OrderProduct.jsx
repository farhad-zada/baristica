import React, { useEffect, useState } from 'react'
import styles from './orderProduct.module.css'
import Counter from '../../../../components/counter/Counter'
import { useDispatch, useSelector } from 'react-redux'
import { deleteFromCart } from '../../../../redux/slice'
import { Delete } from '../../../../icons'
export default function OrderProduct({ product, grindityText, weightText, codeText }) {
    const [cartCount, setCartCount] = useState(1)
    const { lang } = useSelector(state => state.baristica)
    const dispatch = useDispatch()

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
            <div className={styles.productImg}>
                <img src={product?.img ? product.img : ''} alt="" />
            </div>

            <div className="textContent">
                <p className="f12 fw400 darkGrey_color">
                    {codeText} {product?.code ? product.code : 'E10001'}
                </p>
                <h2 className="f20 fw700">
                    {product?.name ? product.name[lang] || product.name['az'] : 'COLOMBIA GESHA ANCESTRO'}
                </h2>
                <h3 className="f16 fw400 mt4 darkGrey_color">{grindityText} {product?.selectedGrinding ? product.selectedGrinding : 'эспрессо'}</h3>
                <h3 className="f16 fw400 mt4 darkGrey_color">{weightText} {product?.selectedWeight ? product.selectedWeight : '1000'} g</h3>
            </div>

            <Counter count={cartCount} setCount={setCartCount} />

            <div className="right flex a-center g20">
                <span className='f24 fw400 darkGrey_color'>{product?.price ? product.price / 100 * product.cartCount : '49'} ₼</span>
                <span className='pointer' onClick={() => deleteProduct(product._id)}>{Delete}</span>
            </div>
        </div>
    )
}
