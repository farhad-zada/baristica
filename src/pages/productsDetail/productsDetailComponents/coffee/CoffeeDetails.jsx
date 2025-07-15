import React, { useEffect, useState } from 'react'
import Characteristic from '../../../../components/characteristic/Characteristic'
import Counter from '../../../../components/counter/Counter'
import pageText from '../../../../content/PagesText.json'
import { useSelector } from 'react-redux'
import styles from './coffeeDetails.module.css'
import CustomSelectBordered from '../../../../components/customSelectBordered/CustomSelectBordered'
import { Bag } from '../../../../icons'
import { useNavigate } from 'react-router-dom'
import ProductAddedModal from '../../../../components/productAddedModal/ProductAddedModal'
const { productCard, grindingOptionsTranslate } = pageText

export default function CoffeeDetails({ product }) {
    const { lang } = useSelector(state => state.baristica)
    const [grindingOptions, setGrindingOptions] = useState([])
    const [defaultGrinding, setDefaultGrinding] = useState('')
    const [selectedGrinding, setSelectedGrinding] = useState('')
    const [selectedWeight, setSelectedWeight] = useState(product?.weight ? product.weight : '')
    const [weights, setWeights] = useState([])
    const [cartCount, setCartCount] = useState(1)
    const [productAdded, setProductAdded] = useState(false)
    const [cartProduct, setCartProduct] = useState({})

    const [linked, setLinked] = useState([])

    const navigate = useNavigate()

    const getFilteredOptions = (category) => {
        if (category === 'espresso') {
            // return grindingOptions.filter(option => option.value === 'whole-bean'); // Только "dənli"
        }
        if (category === 'filter') {
            return grindingOptions.filter(option => option.value !== 'whole-bean'); // Все, кроме "dənli"
        }
        return grindingOptions; // Полный список для других категорий
    };

    const addToCart = () => {
        // setCartCount(1)
        setProductAdded(true)
        setCartProduct({ ...product, cartCount: cartCount, grindingOption: selectedGrinding })
        // dispatch(addProductToCart({ ...product, cartCount: cartCount, grindingOption: selectedGrinding }))
        // setCartCount(1)
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

    const changeGrinding = (value) => {
        const selected = grindingOptions.find((grinding) => grinding.text === value)
        setSelectedGrinding(selected.value)
    }

    useEffect(() => {
        if (lang && JSON.stringify(product) !== "{}" && product) {
            setGrindingOptions(grindingOptionsTranslate[lang])

            if (product.category === 'filter') {
                setDefaultGrinding(grindingOptionsTranslate[lang][1].text)
                setSelectedGrinding(grindingOptionsTranslate[lang][1].value)
            } else {
                setDefaultGrinding(grindingOptionsTranslate[lang][0].text)
                setSelectedGrinding(grindingOptionsTranslate[lang][0].value)
            }
        }
    }, [lang, product])

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

    console.log(product);

    return (
        <div className='mt24'>
            <ProductAddedModal product={cartProduct} status={productAdded} setStatus={setProductAdded} cartCount={cartCount} setCartCount={setCartCount} />

            <h3 className='f16 fw700 darkGrey_color'>{lang ? productCard[lang].profile : ''}</h3>
            <p className='f20 fw400 darkGrey_color'>{product?.profile[lang] ? product.profile[lang] || product.profile['az'] : 'ТЁМНЫЙ ШОКОЛАД - МЁД - СЛИВА - СПЕЦИИ'}</p>

            <div className="productCard_characteristics flex j-between mt24">
                <Characteristic content={{ text: lang ? productCard[lang].density : '', progress: product?.viscocity * 20 }} />
                <Characteristic content={{ text: lang ? productCard[lang].acidity : '', progress: product?.acidity * 20 }} />
                <Characteristic content={{ text: lang ? productCard[lang].sweetness : '', progress: product?.sweetness * 20 }} />
            </div>



            {
                product.category === 'drip'
                    ?
                    <></>
                    :
                    <>
                        <h2 className="f16 fw700 mt36 darkGrey_color">
                            {lang ? productCard[lang].grindity : ''}
                        </h2>
                        <CustomSelectBordered
                            callBack={changeGrinding}
                            options={getFilteredOptions(product.category).map(option => option.text)}
                            defaultValue={defaultGrinding}
                        />
                    </>
            }

            {
                product.category === 'drip'
                    ?
                    <div className='mb20'></div>
                    :
                    <>
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
                    </>
            }


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
