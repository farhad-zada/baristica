import { useDispatch, useSelector } from "react-redux"
import style from './productCard.module.css'
import { Bag, CartIcon, Favorited, Feedback, Star } from "../../icons"
import MockImg from '../../assets/img/coffe_mock.png'
import Characteristic from "../characteristic/Characteristic"
import CustomSelect from "../customSelect/CustomSelect"
import { memo, useEffect, useState } from "react"
import Counter from "../counter/Counter"

import pageText from '../../content/PagesText.json'
import { useNavigate } from "react-router-dom"
import ProductAddedModal from "../productAddedModal/ProductAddedModal"
import { addProductToCart } from "../../redux/slice"
import FavoritesService from "../../services/favorites.service"
import Loading from "../loading/Loading"
import ProductsService from "../../services/products.service"
import Error from "../error/Error"
const { productCard, categories, grindingOptionsTranslate, proccessingMethodTranslate } = pageText
const ProductCard = (props) => {
    const { product, width = 'auto' } = props
    const { token, lang } = useSelector(state => state.baristica)

    const [activeProduct, setActiveProduct] = useState({})
    const [productAdded, setProductAdded] = useState(false)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(false)
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
        // setCartCount(1)
        setProductAdded(true)
        dispatch(addProductToCart({ ...activeProduct, cartCount: cartCount, grindingOption: selectedGrinding }))
    }
    const addFavorite = async (id) => {
        setLoading(true)
        try {
            const response = await favoriteService.addFavorite(token, id)
        } catch (error) {
            console.log(error)
        }
        finally {
            setLoading(false)
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
        if (product[field] === value) {
            return
        } else {
            let newProduct = null;
            if (activeProduct.productType === 'Machine') {
                newProduct = linked.find((link) => link.field === field && link.categoryText === value)
            }
            else {
                newProduct = linked.find((link) => link.field === field && link.fieldValue === value)
            }
            console.log(value, newProduct, linked)
            if (newProduct) {
                getProduct(newProduct.product)
                // navigate(`/product/${newProduct.product}`)
            }
        }
    }

    const getProduct = async (id) => {
        setLoading(true)
        try {
            const response = await productsService.getOneProduct(token, id)
            setActiveProduct(response?.data || {})
        } catch (error) {
            setError(true)
        } finally {
            setLoading(false)
        }
    }

    const openWhatsApp = () => {
        const whatsappUrl = 'https://wa.me/+994514333003';
        window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
    };


    const setSelectContent = (type) => {
        if (type === 'Coffee') {
            return (
                <div className={style.productCard_selects + " flex j-between a-center"} onClick={(e) => e.stopPropagation()}>
                    <CustomSelect options={grindingOptions.map((grinding) => grinding.text)} defaultValue={defaultGrinding} callBack={changeGrinding} />

                    <CustomSelect field={'weight'} options={weightOptions} defaultValue={defaultWeight} additionalText={lang ? productCard[lang].weightValue : 'g'} callBack={changeProduct} />

                    <Counter count={cartCount} setCount={setCartCount} />
                </div>
            )
        } else if (type === 'Machine') {
            if (product?.category && product.category !== 'grinder') {
                console.log(product.category)
                return (
                    <div className={style.productCard_selects + " flex j-between a-center"} onClick={(e) => e.stopPropagation()}>
                        <CustomSelect field={'category'} options={categoryGroups} defaultValue={defaultCategory} additionalText={''} callBack={changeProduct} />
                    </div>
                )
            }
        } else if (type === 'Accessory') {
            return (
                <div className={style.productCard_selects + " flex j-between a-center"} onClick={(e) => e.stopPropagation()}>
                    <span></span>
                    <span></span>
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
            setWeightOptions([activeProduct?.weight, ...linkedWeights])
            setDefaultWeight(activeProduct?.weight || 200)


            let categoryFields = product.linked.filter((link) => link.field === 'category')
            let linkedCategories = categoryFields.map((field) => field.fieldValue)
            categoryFields = categoryFields.map((category) => { return { ...category, categoryText: categories[lang][category.fieldValue] } })
            linkedCategories = linkedCategories.map((category) => { return categories[lang][category] })

            setCategoryGroups(product?.category ? [categories[lang][product?.category], ...linkedCategories] : [...linkedCategories])
            setDefaultCategory(product?.category ? categories[lang][product?.category] : '')

            setCartCount(1)
        }
    }, [activeProduct])

    useEffect(() => {
        if (lang) {
            setGrindingOptions(grindingOptionsTranslate[lang])
            setDefaultGrinding(grindingOptionsTranslate[lang][0].text)
            setSelectedGrinding(grindingOptionsTranslate[lang][0].value)
        }
    }, [lang])

    useEffect(() => {
        return () => {
            setActiveProduct({})
        }
    }, [])

    return (
        <div className={style.productCard + ' pointer'} style={{ width: width }} onClick={() => { navigate(`/product/${activeProduct?._id}`) }}>
            <Loading status={loading} />
            <Error status={error} setStatus={setError} />

            <ProductAddedModal product={activeProduct} status={productAdded} setStatus={setProductAdded} cartCount={cartCount} setCartCount={setCartCount} />
            <div className={style.productCard_head}>
                <div className="flex j-between">
                    <div className="productCard-head_left flex g8">
                        {
                            token
                                ?
                                <span className={style.favorited} onClick={(e) => { e.stopPropagation(); addFavorite(activeProduct?._id) }}>
                                    {Favorited}
                                </span>
                                :
                                <></>
                        }
                        <span className={style.star + " flex g8  f16 darkGrey_color fw400"}>
                            {Star}
                            <span>{activeProduct?.statistics?.ratings ? activeProduct.statistics.ratings.toFixed(1) : 0}</span>
                        </span>
                        <span className={style.feedback + " flex g8  f16 darkGrey_color fw400"}>
                            {Feedback}
                            <span>{activeProduct?.feedbacks ? activeProduct.feedbacks : 0}</span>
                        </span>
                    </div>
                    <span className={style.productCard_head_right + " f14 blueAccent fw400 text-upperCase"}>
                        {
                            activeProduct?.category ? categories[lang][activeProduct.category] : ''

                        }
                    </span>
                </div>
                <h3 className="text-center darkGrey_color f16 fw400 mt20">{activeProduct?.code ? activeProduct.code : 'BFC-02002'}</h3>
                <h2 className="text-center darkGrey_color f24 fw600 text-upperCase">{activeProduct?.name ? activeProduct.name[lang] : 'COLOMBIA GESHA ANCESTRO'}</h2>
                <p className="text-center darkGrey_color f16 fw400">{activeProduct?.processingMethod ? `${proccessingMethodTranslate[lang][activeProduct.processingMethod]}` : ''}</p>

            </div>
            <div className={style.productCard_body}>


                <div className={`${style.productCard_img} w-100 flex j-center`}>
                    <img src={activeProduct?.images?.length ? activeProduct.images[0] : MockImg} alt="" />
                </div>



            </div>

            <div className="productCard_foot">

                {
                    activeProduct.productType === 'machine' || !product?.profile
                        ?
                        <></>
                        :
                        <p className={style.pagaraph + " text-center f16 fw400 darkGrey_color robotoFont"} style={{ maxWidth: "350px" }}>{activeProduct?.profile ? activeProduct.profile[lang] : 'БЕРГАМОТ - РОЗА - СИРЕНЬ - МАРАКУЙЯ'}</p>
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
                        <span className="f24 fw400">{activeProduct?.price ? (activeProduct.price / 100 * cartCount).toFixed(2) : 20} ₼</span>

                        :
                        <span className="f24 fw400">{activeProduct?.price ? (activeProduct.price / 100 * cartCount) : 20} ₼</span>
                    }
                    <button
                        onClick={(e) => {

                            if (activeProduct?.productType !== 'Machine') {
                                addToCart();
                            }

                            e.stopPropagation()
                        }}
                        className={style.addToCart + " flex g8 a-center border8 f20 fw400 white"}
                    >
                        {Bag}
                        {
                            product.productType === 'Machine'
                                ?
                                <span onClick={openWhatsApp}>{lang ? productCard[lang].machineBuy : ''}</span>
                                :
                                <span >{lang ? productCard[lang].buyBtn : ''}</span>
                        }
                    </button>
                </div>

            </div>
        </div>
    )
}

export default memo(ProductCard)