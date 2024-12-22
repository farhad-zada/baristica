import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'

import ColorPicker from '../../../../components/colorPicker/ColorPicker';
import styles from '../coffee/coffeeDetails.module.css'
import { Bag } from '../../../../icons';
import pageText from '../../../../content/PagesText.json'
import { useNavigate } from 'react-router-dom';
const { productCard } = pageText

export default function MachineDetails({ product }) {
    const { lang } = useSelector(state => state.baristica)
    const [selectedGroup, setSelectedGroup] = useState(product?.category ? product.category : 2)
    const [linked, setLinked] = useState([])
    const [colors, setColors] = useState([]);

    const [groups, setGroups] = useState([])

    const handleColorSelect = (field,selectedColor) => {
        console.log('Выбранный цвет:', selectedColor);
    };

    const navigate = useNavigate()

    const changeProduct = (field,value) => {
        if (field === 'images.0') {

        }
        if (product[field] === value) {
            return
        } else {
            const newProduct = linked.find((link) => link.field === field && link.fieldValue === value)
            if (newProduct) {
                navigate(`/product/${newProduct.product}`)
            }
        }
    }
    console.log(groups)
    console.log(selectedGroup)
    useEffect(() => {
        if (JSON.stringify(product) !== '{}') {
            setLinked(product.linked)

            const groupFields = product.linked.filter((link) => link.field === 'category')
            const linkedGroups = groupFields.map((field) => field.fieldValue)
            setSelectedGroup(product.category)
            setGroups(product?.category ? [product?.category, ...linkedGroups] : [...linkedGroups])

            const imageFields = product.linked.filter((link) => link.field === 'images.0')
            setColors([{ field: "images.0", product: product._id, fieldValue: product.images[0] }, ...imageFields])
        }
    }, [product])

    return (
        <div>

            {colors.length
                ?
                <ColorPicker field={'images.0'} options={colors} onColorSelect={changeProduct} text={lang ? productCard[lang].color : ''} />
                :
                <></>
            }
            <h2 className="f16 fw700 mt20 darkGrey_color">
                {lang ? productCard[lang].groups : ''}
            </h2>
            <div className="productWeights flex g10 mt4 mb20">
                {
                    groups?.map((group, index) => (
                        <div className={group === selectedGroup ? styles.weightActive : styles.weight} key={index} onClick={() => { changeProduct('category', group) }}>
                            {group} {lang ? productCard[lang].weightValue : 'g'}
                        </div>
                    ))
                }
            </div>

            <div className="flex j-between a-center mt20">
                <span className='f32 fw400'>{product?.price ? product.price / 100 : 20} ₼</span>
                <button className={styles.addToCart + " flex g8 a-center border8 f20 fw400 white"}>
                    {Bag}
                    <span onClick={(e) => e.stopPropagation()}>{lang ? productCard[lang].machineBuy : ''}</span>
                </button>
            </div>

        </div>
    )
}
