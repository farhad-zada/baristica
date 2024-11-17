import React, { useState } from 'react'
import Characteristic from '../../../../components/characteristic/Characteristic'
import Counter from '../../../../components/counter/Counter'
import pageText from '../../../../content/PagesText.json'
import { useSelector } from 'react-redux'
import styles from './coffeeDetails.module.css'
import CustomSelectBordered from '../../../../components/customSelectBordered/CustomSelectBordered'
import { Bag } from '../../../../icons'
const { productCard } = pageText

export default function CoffeeDetails({ product }) {
    const { lang } = useSelector(state => state.baristica)
    const [grindingOptions, setGrindingOptions] = useState(['grinding', 'grinding2'])
    const [defaultGrinding, setDefaultGrinding] = useState('grinding')
    const [selectedWeight, setSelectedWeight] = useState(product?.weights ? product.weights[0] : 200)
    const [weights, setWeights] = useState([200, 1000, 500])
    const [cartCount, setCartCount] = useState(1)

    return (
        <div className='mt24'>
            <h3 className='f16 fw700 darkGrey_color'>{lang ? productCard[lang].profile : ''}</h3>
            <p className='f20 fw400 darkGrey_color'>{product?.profile ? product.profile : 'ТЁМНЫЙ ШОКОЛАД - МЁД - СЛИВА - СПЕЦИИ'}</p>

            <div className="productCard_characteristics flex j-between mt24">
                <Characteristic content={{ text: lang ? productCard[lang].density : '', progress: 30 }} />
                <Characteristic content={{ text: lang ? productCard[lang].acidity : '', progress: 60 }} />
                <Characteristic content={{ text: lang ? productCard[lang].sweetness : '', progress: 90 }} />
            </div>

            <h2 className="f16 fw700 mt36 darkGrey_color">
                {lang ? productCard[lang].grindity : ''}
            </h2>

            <CustomSelectBordered options={grindingOptions} defaultValue={defaultGrinding} />

            <h2 className="f16 fw700 mt20 darkGrey_color">
                {lang ? productCard[lang].weight : ''}
            </h2>

            <div className="productWeights flex g10 mt4 mb20">
                {
                    weights?.map((weight, index) => (
                        <div className={weight === selectedWeight ? styles.weightActive : styles.weight} key={index} onClick={() => { setSelectedWeight(weight) }}>
                            {weight}
                        </div>
                    ))
                }
            </div>

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
