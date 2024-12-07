import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'

import ColorPicker from '../../../../components/colorPicker/ColorPicker';
import styles from '../coffee/coffeeDetails.module.css'
import { Bag } from '../../../../icons';
import pageText from '../../../../content/PagesText.json'
const { productCard } = pageText

export default function MachineDetails({ product }) {
    const { lang } = useSelector(state => state.baristica)
    const [selectedGroup, setSelectedGroup] = useState(product?.weights ? product.weights[0] : 2)
    const [linked,setLinked] = useState([])
    const colors = [
        { value: 'black', label: 'Черный', image: '/images/black-machine.png' },
        { value: 'red', label: 'Красный', image: '/images/red-machine.png' },
    ];
    const [groups, setGroups] = useState([2, 3])

    const handleColorSelect = (selectedColor) => {
        console.log('Выбранный цвет:', selectedColor);
    };

    useEffect(() => {
        if (JSON.stringify(product) !== '{}') {
            setLinked(product.linked)

            const groupFields = product.linked.filter((link) => link.field === 'group')
            const linkedGroups = groupFields.map((field) => field.fieldValue)

            setGroups(product?.group ? [product?.group, ...linkedGroups]: [...linkedGroups])
            setSelectedGroup(product?.group ? product.group : '')
            
        }
    }, [product])
    
    return (
        <div>
           
            <ColorPicker options={colors} onColorSelect={handleColorSelect} text={lang ? productCard[lang].color : ''} />
        
            <h2 className="f16 fw700 mt20 darkGrey_color">
                {lang ? productCard[lang].groups : ''}
            </h2>
            <div className="productWeights flex g10 mt4 mb20">
                {
                    groups?.map((group, index) => (
                        <div className={group === group ? styles.weightActive : styles.weight} key={index} onClick={() => { setSelectedGroup(group) }}>
                            {group} {lang ? productCard[lang].weightValue : 'g'}
                        </div>
                    ))
                }
            </div>
            
            <div className="flex j-between a-center mt20">
                <span className='f32 fw400'>{product?.price ? product.price/100 : 20} ₼</span>
                <button className={styles.addToCart + " flex g8 a-center border8 f20 fw400 white"}>
                    {Bag}
                    <span onClick={(e) => e.stopPropagation()}>{lang ? productCard[lang].machineBuy : ''}</span>
                </button>
            </div>

        </div>
    )
}
