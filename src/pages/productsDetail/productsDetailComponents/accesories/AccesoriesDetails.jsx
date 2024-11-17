import React, { useState } from 'react'
import Counter from '../../../../components/counter/Counter';
import { useSelector } from 'react-redux'

import ColorPicker from '../../../../components/colorPicker/ColorPicker';
import styles from '../coffee/coffeeDetails.module.css'
import { Bag } from '../../../../icons';
import pageText from '../../../../content/PagesText.json'
const { productCard } = pageText

export default function AccesoriesDetails({ product }) {
    const [cartCount, setCartCount] = useState(1)
    const { lang } = useSelector(state => state.baristica)

    const colors = [
        { value: 'black', label: 'Черный', image: '/images/black-machine.png' },
        { value: 'red', label: 'Красный', image: '/images/red-machine.png' },
    ];

    const handleColorSelect = (selectedColor) => {
        console.log('Выбранный цвет:', selectedColor);
    };
    return (
        <div>
            <ColorPicker options={colors} onColorSelect={handleColorSelect} text={lang ? productCard[lang].color : ''} />
            <Counter count={cartCount} setCount={setCartCount} />
            <div className="flex j-between a-center mt20">
                <span className='f32 fw400'>{product?.price ? product.price : 20} ₼</span>
                <button className={styles.addToCart + " flex g8 a-center border8 f20 fw400 white"}>
                    {Bag}
                    <span onClick={(e) => e.stopPropagation()}>{lang ? productCard[lang].buyBtn : ''}</span>
                </button>
            </div>

        </div>
    )
}
