import React, { useState } from 'react'
import { useSelector } from 'react-redux'

import ColorPicker from '../../../../components/colorPicker/ColorPicker';
import styles from '../coffee/coffeeDetails.module.css'
import { Bag } from '../../../../icons';
import pageText from '../../../../content/PagesText.json'
const { productCard } = pageText

export default function MachineDetails({ product }) {
    const { lang } = useSelector(state => state.baristica)
    const [selectedGroup, setSelectedGroup] = useState(product?.weights ? product.weights[0] : 2)

    const colors = [
        { value: 'black', label: 'Черный', image: '/images/black-machine.png' },
        { value: 'red', label: 'Красный', image: '/images/red-machine.png' },
    ];
    const [weights, setWeights] = useState([2, 3])

    const handleColorSelect = (selectedColor) => {
        console.log('Выбранный цвет:', selectedColor);
    };
    return (
        <div>
            <ColorPicker options={colors} onColorSelect={handleColorSelect} text={lang ? productCard[lang].color : ''} />
            <h2 className="f16 fw700 mt20 darkGrey_color">
                {lang ? productCard[lang].groups : ''}
            </h2>
            <div className="productWeights flex g10 mt4 mb20">
                {
                    weights?.map((weight, index) => (
                        <div className={weight === selectedGroup ? styles.weightActive : styles.weight} key={index} onClick={() => { setSelectedGroup(weight) }}>
                            {weight} {lang ? productCard[lang].weightValue : 'g'}
                        </div>
                    ))
                }
            </div>
            
            <div className="flex j-between a-center mt20">
                <span className='f32 fw400'>{product?.price ? product.price : 20} ₼</span>
                <button className={styles.addToCart + " flex g8 a-center border8 f20 fw400 white"}>
                    {Bag}
                    <span onClick={(e) => e.stopPropagation()}>{lang ? productCard[lang].machineBuy : ''}</span>
                </button>
            </div>

        </div>
    )
}
