import { useDispatch, useSelector } from "react-redux"
import style from './productCard.module.css'
import { Bag, CartIcon, Favorited, Feedback, Star } from "../../icons"
import MockImg from '../../assets/img/coffe_mock.png'
import Characteristic from "../characteristic/Characteristic"
import CustomSelect from "../customSelect/CustomSelect"
import { memo, useState } from "react"
import Counter from "../counter/Counter"

import pageText from '../../content/PagesText.json'
import { useNavigate } from "react-router-dom"
import ProductAddedModal from "../productAddedModal/ProductAddedModal"
import { addProductToCart } from "../../redux/slice"
import FavoritesService from "../../services/favorites.service"
import Loading from "../loading/Loading"
const { productCard } = pageText
const ProductCard = (props) => {
    const { product, width = 'auto' } = props
    
    const { token, lang } = useSelector(state => state.baristica)

    const [productAdded, setProductAdded] = useState(false)
    const [loading, setLoading] = useState(false)

    const [weightOptions, setWeightOptions] = useState([200, 1000])
    const [defaultWeight, setDefaultWeight] = useState(200)

    const [grindingOptions, setGrindingOptions] = useState(['grinding', 'grinding'])
    const [defaultGrinding, setDefaultGrinding] = useState('grinding')

    const [cartCount, setCartCount] = useState(1)
    const favoriteService = new FavoritesService()

    const navigate = useNavigate()
    const dispatch = useDispatch()
    const addToCart = () => {
        setProductAdded(true)
        // setCartCount(1)
        dispatch(addProductToCart({ ...product, cartCount: cartCount }))
    }

    const addFavorite = async (id) => {
        setLoading(true)
        try {
            const response = await favoriteService.addFavorite(token, id)
        } catch (error) {
            console.log(error)
        }
        finally{
            setLoading(false)
        }
    }

    const setSelectContent = (type) => {
        if (type === 'Coffee') {
            return (
                <div className={style.productCard_selects + " flex j-between a-center"} onClick={(e) => e.stopPropagation()}>
                    <CustomSelect options={weightOptions} defaultValue={defaultWeight} additionalText={lang ? productCard[lang].weightValue : 'g'} />
                    <CustomSelect options={grindingOptions} defaultValue={defaultGrinding} />
                    <Counter count={cartCount} setCount={setCartCount} />
                </div>
            )
        } else if (type === 'Machine') {
            if (product?.group?.length) {
                return (
                    <div className={style.productCard_selects + " flex j-between a-center"} onClick={(e) => e.stopPropagation()}>
                        <CustomSelect options={weightOptions} defaultValue={defaultWeight} additionalText={lang ? productCard[lang].grindityValue : 'g'} />
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

    return (
        <div className={style.productCard + ' pointer'} style={{ width: width }} onClick={() => { navigate(`/product/${product?._id}`) }}>
            <ProductAddedModal product={product} status={productAdded} setStatus={setProductAdded} cartCount={cartCount} setCartCount={setCartCount} />
            <div className={style.productCard_head + " flex j-between"}>
                <div className="productCard-head_left flex g8">
                    {
                        token
                            ?
                            <span className={style.favorited} onClick={(e) => {e.stopPropagation();addFavorite(product?._id)}}>
                                {Favorited}
                            </span>
                            :
                            <></>
                    }
                    <span className="flex g8  f16 darkGrey_color fw400">
                        {Star}
                        <span>{product?.statistics?.ratings ? product.statistics.ratings : 2}</span>
                    </span>
                    <span className={style.feedback + " flex g8  f16 darkGrey_color fw400"}>
                        {Feedback}
                        <span>{product?.feedbacks ? product.feedbacks : 0}</span>
                    </span>
                </div>
                <span className="productCard-head_right blueAccent fw400 text-upperCase">
                    {product?.category ? product.category : 'Espresso'}
                </span>
            </div>
            <div className={style.productCard_body}>
                <h3 className="text-center darkGrey_color f16 fw400">{product?.code ? product.code : 'BFC-02002'}</h3>
                <h2 className="text-center darkGrey_color f24 fw600">{product?.name ? product.name[lang] : 'COLOMBIA GESHA ANCESTRO'}</h2>
                <p className="text-center darkGrey_color f16 fw400">{product?.processing ? product.processing : 'мытая ОБРАБОТКА'}</p>

                <div className={`${style.productCard_img} w-100 flex j-center`}>
                    <img src={product?.images?.length ? product.images[0] : MockImg} alt="" />
                </div>
                {
                    product.productType === 'machine' || !product?.profile
                    ?
                    <></>
                    :
                    <p className="text-center f16 fw400 darkGrey_color" style={{ maxWidth: "350px" }}>{product?.profile ? product.profile[lang] : 'БЕРГАМОТ - РОЗА - СИРЕНЬ - МАРАКУЙЯ'}</p>
                }

                {
                    product?.productType === 'Coffee'
                    ?
                    <div className={style.productCard_characteristics + " flex j-between"}>
                    <Characteristic content={{ text: lang ? productCard[lang].density : '', progress: product?.viscosity }} />
                    <Characteristic content={{ text: lang ? productCard[lang].acidity : '', progress: product?.acidity }} />
                    <Characteristic content={{ text: lang ? productCard[lang].sweetness : '', progress: product?.sweetness }} />
                </div>
                :
                <></>
                }

                {
                    setSelectContent(product.productType)
                }

                <div className="productCard_foot flex j-between a-center">
                    <span>{product?.price ? product.price/100 * cartCount : 20} ₼</span>
                    <button
                        onClick={(e) => {
                            addToCart();
                            e.stopPropagation()
                        }}
                        className={style.addToCart + " flex g8 a-center border8 f20 fw400 white"}
                    >
                        {Bag}
                        {
                            product.type === 'machine'
                                ?
                                <span >{lang ? productCard[lang].machineBuy : ''}</span>
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