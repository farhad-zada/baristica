import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'

import ColorPicker from '../../../../components/colorPicker/ColorPicker';
import styles from '../coffee/coffeeDetails.module.css'
import { Bag } from '../../../../icons';
import pageText from '../../../../content/PagesText.json'
import { useNavigate } from 'react-router-dom';
const { productCard, categories } = pageText

export default function MachineDetails({ product }) {
    const { lang } = useSelector(state => state.baristica)
    const [selectedGroup, setSelectedGroup] = useState(product?.category ? product.category : 2)
    const [linked, setLinked] = useState([])
    const [colors, setColors] = useState([]);

    const [groups, setGroups] = useState([])

    const handleColorSelect = (field, selectedColor) => {
        console.log('Выбранный цвет:', selectedColor);
    };

    const navigate = useNavigate()

    const changeProduct = (field, value) => {
        console.log(field, value)
        // if (field === 'images.0') {

        // }
        if (product[field] === value) {
            return
        } else {
            let newProduct = null
            if (field === 'category') {
                newProduct = linked.find((link) => link.field === field && link.categoryText === value)
            } else {
                newProduct = linked.find((link) => link.field === field && link.fieldValue === value)
            }
            if (newProduct) {
                navigate(`/product/${newProduct.product}`)
            }
        }
    }


    useEffect(() => {
        if (JSON.stringify(product) !== '{}') {
            let linkedValues = product.linked.map((link) => { return { ...link, categoryText: categories[lang][link.fieldValue] } })
            setLinked(linkedValues)

            let groupFields = product.linked.filter((link) => link.field === 'category')
            groupFields = groupFields.map((field) => { return { ...field, categoryText: categories[lang][field.fieldValue] } })
            let linkedGroups = groupFields.map((field) => field.categoryText)


            setSelectedGroup(categories[lang][product.category])
            setGroups(product?.category ? [categories[lang][product?.category], ...linkedGroups] : [...linkedGroups])

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
            {
                product?.category === 'grinder'
                    ?
                    <></>
                    :
                    <>
                        <h2 className="f16 fw700 mt20 darkGrey_color">
                            {lang ? productCard[lang].groups : ''}
                        </h2>
                        <div className="productWeights flex g10 mt4 mb20">
                            {
                                groups?.map((group, index) => (
                                    <div className={group === selectedGroup ? styles.weightActive : styles.weight} key={index} onClick={() => { changeProduct('category', group) }}>
                                        {group}
                                    </div>
                                ))
                            }
                        </div>
                    </>
            }

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
