import React, { useState } from 'react'
import Counter from '../../../../components/counter/Counter';
import { useDispatch, useSelector } from 'react-redux'

import ColorPicker from '../../../../components/colorPicker/ColorPicker';
import styles from '../coffee/coffeeDetails.module.css'
import { Bag } from '../../../../icons';
import pageText from '../../../../content/PagesText.json'
import { addProductToCart } from '../../../../redux/slice';
const { productCard } = pageText

export default function AccesoriesDetails({ product }) {
    const [cartCount, setCartCount] = useState(1)
    const { lang } = useSelector(state => state.baristica)

    const dispatch = useDispatch()
    const colors = [
        { value: 'black', label: 'Черный', image: '/images/black-machine.png' },
        { value: 'red', label: 'Красный', image: '/images/red-machine.png' },
    ];

    const handleColorSelect = (selectedColor) => {
        console.log('Выбранный цвет:', selectedColor);
    };

    const addToCart = () => {
        // setCartCount(1)
        // setProductAdded(true)
        dispatch(addProductToCart({ ...product, cartCount: cartCount }))
        setCartCount(1)
    }
    return (
        <div>
            {
                product?.colors
                    ?
                    <ColorPicker options={colors} onColorSelect={handleColorSelect} text={lang ? productCard[lang].color : ''} />
                    :
                    <></>
            }
            {!product.deleted && (
                <>
                    <Counter count={cartCount} setCount={setCartCount} />
                    <div className="flex j-between a-center mt20">
                        <span className='f32 fw400'>{product?.price ? (product.price / 100 * cartCount).toFixed(2) : 20} ₼</span>
                        {product?.deleted ? (
                            <button disabled className={styles.addToCartDisabled + " flex g8 a-center border8 f20 fw400 white"}>
                                {Bag}
                                <span>{lang ? productCard[lang].buyBtn : ''}</span>
                            </button>
                        ) : (
                            <button className={styles.addToCart + " flex g8 a-center border8 f20 fw400 white"}>
                                {Bag}
                                <span onClick={(e) => { addToCart(); e.stopPropagation() }}>{lang ? productCard[lang].buyBtn : ''}</span>
                            </button>
                        )}
                    </div>
                </>
            )}

        </div>
    )
}
