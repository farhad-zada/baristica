import React, { useEffect, useState } from 'react'
import Characteristic from '../../../../components/characteristic/Characteristic'
import Counter from '../../../../components/counter/Counter'
import pageText from '../../../../content/PagesText.json'
import { useSelector } from 'react-redux'
import styles from './teaDetails.module.css'
import { Bag } from '../../../../icons'
import { useNavigate } from 'react-router-dom'
import ProductAddedModal from '../../../../components/productAddedModal/ProductAddedModal'
const { productCard } = pageText

export default function CoffeeDetails({ product }) {
    const { lang } = useSelector(state => state.baristica)
    const [selectedWeight, setSelectedWeight] = useState(product?.weight ? product.weight : '')
    const [weights, setWeights] = useState([])
    const [cartCount, setCartCount] = useState(1)
    const [productAdded, setProductAdded] = useState(false)
    const [cartProduct, setCartProduct] = useState({})

    const [linked, setLinked] = useState([])

    const navigate = useNavigate()

    const addToCart = () => {
        setProductAdded(true)
        setCartProduct({ ...product, cartCount: cartCount })
    }

    const changeProduct = (field, value) => {
        if (field === 'weight') {
            setSelectedWeight(value)
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


    useEffect(() => {
        if (JSON.stringify(product) !== '{}') {
            setLinked(product.linked)

            const weightFields = product.linked.filter((link) => link.field === 'weight')
            const linkedWeights = weightFields.map((field) => field.fieldValue)
            const sortedWeights = linkedWeights.sort((a, b) => a - b)
            setWeights(sortedWeights)
            setSelectedWeight(product.weight)

            setCartCount(1)
        }
    }, [product])


    return (
        <div className='mt24'>
            <ProductAddedModal product={cartProduct} status={productAdded} setStatus={setProductAdded} cartCount={cartCount} setCartCount={setCartCount} />

            <h3 className='f16 fw700 darkGrey_color'>{lang ? productCard[lang].profile : ''}</h3>
            <p className='f20 fw400 darkGrey_color'>{product?.profile[lang] ? product.profile[lang] || product.profile['az'] : 'ТЁМНЫЙ ШОКОЛАД - МЁД - СЛИВА - СПЕЦИИ'}</p>

            <div className="productCard_characteristics flex j-between mt24">
                <Characteristic content={{ text: lang ? productCard[lang].density : '', progress: product?.viscosity * 20 }} />
                <Characteristic content={{ text: lang ? productCard[lang].acidity : '', progress: product?.acidity * 20 }} />
                <Characteristic content={{ text: lang ? productCard[lang].sweetness : '', progress: product?.sweetness * 20 }} />
            </div>


            <h2 className="f16 fw700 mt20 darkGrey_color">
                {lang ? productCard[lang].weight : ''}
            </h2>

            <div className="productWeights flex g10 mt4 mb20">
                {
                    weights?.map((weight, index) => (
                        <div className={weight === selectedWeight ? styles.weightActive : styles.weight} key={index} onClick={() => { changeProduct('weight', weight) }}>
                            {weight}
                        </div>
                    ))
                }
            </div>

            <Counter count={cartCount} setCount={setCartCount} />

            <div className="flex j-between a-center mt20">
                <span className='f32 fw400'>{product?.price ? (product.price / 100 * cartCount).toFixed(2) : 20} ₼</span>
                <button className={styles.addToCart + " flex g8 a-center border8 f20 fw400 white"}>
                    {Bag}
                    <span onClick={(e) => { addToCart(); e.stopPropagation() }}>{lang ? productCard[lang].buyBtn : ''}</span>
                </button>
            </div>
        </div>
    )
}
