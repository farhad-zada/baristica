import { useDispatch, useSelector } from "react-redux"
import style from './productCard.module.css'
import { Bag, Favorited, Feedback, Star } from "../../icons"
import Characteristic from "../characteristic/Characteristic"
import CustomSelect from "../customSelect/CustomSelect"
import { memo, useEffect, useState } from "react"
import Counter from "../counter/Counter"

import pageText from '../../content/PagesText.json'
import { useNavigate } from "react-router-dom"

import { setTabIdx } from "../../redux/slice"
import FavoritesService from "../../services/favorites.service"
import Loading from "../loading/Loading"
import ProductsService from "../../services/products.service"
import Error from "../error/Error"
import { handleApiReqRes } from '../../utils/handleApiReqRes.util';
import { getButtonText } from "../../utils/productCartButtonText"
import { showNewBadge } from "../../utils/showNewBadge"
import { handleCartButtonClick } from "../../utils/handleCartButtonClick"

const { productCard, categories, grindingOptionsTranslate } = pageText

const dripCoffeeAdditional = {
    az: 'ədəd',
    ru: "шт",
    en: "count"
}

const ProductCard = (props) => {
    const { product, width = 'auto', setModalProduct, setProductAdded, setCartProductCount } = props
    const { token, lang } = useSelector(state => state.baristica)

    const [activeProduct, setActiveProduct] = useState({})
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(false)
    const [message, setMessage] = useState("Something went wrong.")
    const [linked, setLinked] = useState()

    const [weightOptions, setWeightOptions] = useState([])
    const [defaultWeight, setDefaultWeight] = useState(200)

    const [grindingOptions, setGrindingOptions] = useState([])
    const [defaultGrinding, setDefaultGrinding] = useState('')
    const [selectedGrinding, setSelectedGrinding] = useState('')

    const [categoryGroups, setCategoryGroups] = useState([])
    const [defaultCategory, setDefaultCategory] = useState(2)

    const [cartCount, setCartCount] = useState(1)
    const favoriteService = new FavoritesService()
    const productsService = new ProductsService()

    const navigate = useNavigate()
    const dispatch = useDispatch()

    const addToCart = () => {
        setCartCount(1)
        setProductAdded(true)
        setModalProduct({ ...activeProduct, cartCount: cartCount, grindingOption: selectedGrinding })
        setCartProductCount(cartCount)
    }
    const addFavorite = async (id) => {
        if (token) {
            setLoading(true)
            try {
                const response = await favoriteService.addFavorite(token, id)
            } catch (error) {
                console.log(error)
            }
            finally {
                setLoading(false)
            }
        } else {
            navigate('/login')
        }
    }

    const changeGrinding = (field, value) => {
        const selected = grindingOptions.find((grinding) => grinding.text === value)
        setSelectedGrinding(selected.value)
    }

    const changeProduct = (field, value) => {
        if (field === 'weight') {
            setDefaultWeight(value)
        }

        let newProduct = null;
        if (activeProduct.productType === 'Machine') {
            newProduct = linked.find((link) => link.field === field && link.categoryText === value)
        }
        else {
            newProduct = linked.find((link) => link.field === field && link.fieldValue === value)
        }
        if (newProduct) {
            getProduct(newProduct.product)
            // navigate(`/product/${newProduct.product}`)

        }
    }

    const getProduct = async (id) => {
        setLoading(true)
        try {
            const request = productsService.getOneProduct(token, id)
            const response = await handleApiReqRes(request);
            setActiveProduct(response?.data || {})
        } catch (error) {
            setError(true)
            setMessage(error.message);
        } finally {
            setLoading(false)
        }
    }

    const getFilteredOptions = (category) => {
        // if (category === 'espresso') {
        //     return grindingOptions.filter(option => option.value === 'whole-bean'); // Только "dənli"
        // }
        if (category === 'filter') {
            return grindingOptions.filter(option => option.value !== 'whole-bean'); // Все, кроме "dənli"
        }
        return grindingOptions; // Полный список для других категорий
    };


    const setSelectContent = (type) => {
        if (type === 'Coffee') {
            return (
                <div className={style.productCard_selects + " flex j-between a-center"} onClick={(e) => e.stopPropagation()}>
                    {
                        activeProduct.category === 'drip'
                            ?
                            <span></span>
                            :
                            <CustomSelect
                                options={getFilteredOptions(product.category).map(option => option.text)}
                                defaultValue={defaultGrinding}
                                callBack={changeGrinding} />
                    }
                    {/*  TODO: Weight problem */}
                    {
                        activeProduct.category === 'drip'
                            ?
                            <span></span>
                            :
                            <CustomSelect field={'weight'} options={weightOptions} defaultValue={defaultWeight} additionalText={productCard[lang].weightValue} callBack={changeProduct} />
                    }

                    <Counter count={cartCount} setCount={setCartCount} />
                </div>
            )
        } else if (type === 'Machine') {
            if (product?.category && product.category !== 'grinder') {
                return (
                    <div className={style.productCard_selects + " flex j-between a-center"} onClick={(e) => e.stopPropagation()}>
                        <CustomSelect field={'category'} options={categoryGroups} defaultValue={defaultCategory} additionalText={''} callBack={changeProduct} />
                    </div>
                )
            } else {
                return <div className={style.line}></div>
            }
        } else if (type === 'Accessory') {
            return (
                <div className={style.productCard_selects + " flex j-between a-center"} onClick={(e) => e.stopPropagation()}>
                    <span></span>
                    <span></span>
                    <Counter count={cartCount} setCount={setCartCount} />
                </div>
            )
        } else if (type === 'Tea') {
            return (
                <div className={style.productCard_selects + " flex j-between a-center"} onClick={(e) => e.stopPropagation()}>

                    <CustomSelect field={'weight'} options={weightOptions} defaultValue={defaultWeight} additionalText={productCard[lang].weightValue} callBack={changeProduct} />
                    <Counter count={cartCount} setCount={setCartCount} />
                </div>
            )
        }
    }

    useEffect(() => {
        if (JSON.stringify(product) !== '{}') {
            setActiveProduct(product)
        }
    }, [product])

    useEffect(() => {
        if (JSON.stringify(activeProduct) !== '{}') {
            let linkedValues = activeProduct.linked.map((link) => { return { ...link, categoryText: categories[lang][link.fieldValue] } })
            setLinked(linkedValues)
            const weightFields = activeProduct?.linked?.filter((link) => link.field === 'weight')
            const linkedWeights = weightFields?.map((field) => field.fieldValue) || []

            setWeightOptions(linkedWeights)
            setDefaultWeight(activeProduct?.weight || 200)



            let categoryFields = activeProduct.linked.filter((link) => link.field === 'category')
            let linkedCategories = categoryFields.map((field) => field.fieldValue)

            categoryFields = categoryFields.map((category) => { return { ...category, categoryText: categories[lang][category.fieldValue] } })
            linkedCategories = linkedCategories.map((category) => { return categories[lang][category] })


            setCategoryGroups(linkedCategories)
            setDefaultCategory(product?.category ? categories[lang][product?.category] : '')

            setCartCount(1)
        }
    }, [activeProduct])

    useEffect(() => {
        if (lang && JSON.stringify(activeProduct) !== "{}" && activeProduct) {
            setGrindingOptions(grindingOptionsTranslate[lang])

            if (activeProduct.category === 'filter') {
                setDefaultGrinding(grindingOptionsTranslate[lang][1].text)
                setSelectedGrinding(grindingOptionsTranslate[lang][1].value)
            } else {
                setDefaultGrinding(grindingOptionsTranslate[lang][0].text)
                setSelectedGrinding(grindingOptionsTranslate[lang][0].value)
            }
        }
    }, [lang, activeProduct])

    useEffect(() => {
        return () => {
            setActiveProduct({})
        }
    }, [])

    return (
        <div className={style.productCard + ' pointer'} style={{ width: width }} onClick={() => { navigate(`/product/${activeProduct?._id}`) }}>

            <Loading status={loading} />
            <Error status={error} setStatus={setError} message={message} />
            <div className={style.productCard_head}>
                <div className="flex j-between">
                    <div className="productCard-head_left flex g8">

                        <span className={style.favorited} onClick={(e) => { e.stopPropagation(); addFavorite(activeProduct?._id) }}>
                            {Favorited}
                        </span>
                        <span className={style.star + " flex g8  f16 darkGrey_color fw400"} onClick={(e) => {
                            e.stopPropagation()
                            dispatch(setTabIdx(2))
                            navigate(`/product/${activeProduct?._id}`)
                        }}>
                            {Star}
                            <span>{activeProduct?.statistics?.ratings ? activeProduct.statistics.ratings.toFixed(1) : 0}</span>
                        </span>
                        <span className={style.feedback + " flex g8  f16 darkGrey_color fw400"} onClick={(e) => {
                            e.stopPropagation()
                            dispatch(setTabIdx(2))
                            navigate(`/product/${activeProduct?._id}/#stats`)
                        }}>
                            {Feedback}
                            <span>{activeProduct?.feedbacks ? activeProduct.feedbacks : 0}</span>
                        </span>
                    </div>
                    <div className={style.productCard_head_rightWrap}>
                        <span className={style.productCard_head_right + " f14 blueAccent fw400 text-upperCase"}>
                            {
                                activeProduct?.category ? categories[lang][activeProduct.category] : ''
                            }
                        </span>
                        {showNewBadge(activeProduct) ? (
                            <span className={style.newBadge + " f12 fw600 text-upperCase"}>New</span>
                        ) : null}
                    </div>
                </div>
                <h3 className="text-center darkGrey_color f16 fw400 mt20">{activeProduct?.code ? activeProduct.code : ''}</h3>
                <h2 className="text-center darkGrey_color f24 fw600 text-upperCase">{activeProduct?.name ? activeProduct.name[lang] : ''}</h2>
                <p className="text-center darkGrey_color f16 fw400">{activeProduct?.processingMethod ? activeProduct?.processingMethod[lang] : ''}</p>


            </div>
            <div className={style.productCard_body}>


                <div className={`${style.productCard_img} w-100 flex j-center`}>
                    <img src={activeProduct?.profileImage || ''} alt="" />
                </div>

                {activeProduct.productType === 'Accessory' || activeProduct.productType === 'Tea'
                    ?
                    <h2 className="text-center darkGrey_color fw400  limited-text">{activeProduct?.description ? activeProduct.description[lang] : ''}</h2>
                    :
                    <></>
                }

            </div>

            <div className="productCard_foot">

                {
                    activeProduct.productType === 'machine' || !product?.profile
                        ?
                        <></>
                        :
                        <p className={style.pagaraph + " text-center f16 fw400 darkGrey_color robotoFont"} style={{ maxWidth: "350px" }}>{activeProduct?.profile ? activeProduct.profile[lang] : ''}</p>
                }

                {
                    activeProduct?.productType === 'Coffee'
                        ?
                        <div className={style.productCard_characteristics + " flex j-between"}>
                            <Characteristic content={{ text: lang ? productCard[lang].density : '', progress: activeProduct?.viscocity * 20 }} />
                            <Characteristic content={{ text: lang ? productCard[lang].acidity : '', progress: activeProduct?.acidity * 20 }} />
                            <Characteristic content={{ text: lang ? productCard[lang].sweetness : '', progress: activeProduct?.sweetness * 20 }} />
                        </div>
                        :
                        <></>
                }

                {
                    setSelectContent(activeProduct.productType)
                }
                <div className="flex j-between a-center">
                    {product?.productType !== 'Machine'
                        ?
                        <span className="f24 fw400">{activeProduct?.price ? (activeProduct.price / 100 * cartCount).toFixed(2) : ''} ₼</span>

                        :
                        <span className="f24 fw400">{activeProduct?.price ? (activeProduct.price / 100 * cartCount) : ''} ₼</span>
                    }
                    <button
                        onClick={(e) => {
                            e.stopPropagation()
                            handleCartButtonClick(activeProduct, addToCart)
                        }}
                        className={style.addToCart + " flex g8 a-center border8 f20 fw400 white"}
                    >
                        {Bag}
                        {
                            <span> {getButtonText(activeProduct, productCard, lang)} </span>
                        }
                    </button>
                </div>

            </div>
        </div>
    )
}

export default memo(ProductCard)
