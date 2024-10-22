import { useSelector } from "react-redux"
import style from './productCard.module.css'
import { Bag, CartIcon, Favorited, Feedback, Star } from "../../icons"
import MockImg from '../../assets/img/coffe_mock.png'
import Characteristic from "../characteristic/Characteristic"
import CustomSelect from "../customSelect/CustomSelect"
import { useState } from "react"
import Counter from "../counter/Counter"

const ProductCard = (props) => {
    const {product, width = '33%'} = props
    const {token} = useSelector(state => state.baristica)
    const [weightOptions,setWeightOptions] = useState([200,1000])
    const [defaultWeight, setDefaultWeight] = useState(200)

    const [grindingOptions,setGrindingOptions] = useState(['grinding', 'grinding'])
    const [defaultGrinding,setDefaultGrinding] = useState('grinding')

    const [cartCount,setCartCount] = useState(1)

    return(
        <div className={style.productCard} style={{width: width}}>
            <div className={style.productCard_head + " flex j-between"}>
                <div className="productCard-head_left flex a-center g8">
                    {
                        token
                        ?
                        <span>
                            {Favorited}
                        </span>
                        :
                        <></>
                    }
                    <span className="flex g8 a-center f16 darkGrey_color fw400">
                        {Star}
                        <span>10.0</span>
                    </span>
                    <span className="flex g8 a-center f16 darkGrey_color fw400"> 
                        {Feedback}
                        <span>{product?.feedbacks ? product.feedbacks : 0 }</span>
                    </span>
                </div>
                <span className="productCard-head_right blueAccent fw400">
                    {product?.type ? product.type : 'Espresso'}
                </span>
            </div>
            <div className={style.productCard_body}>
                <h3 className="text-center darkGrey_color f16 fw400">{product?.code ? product.code : 'BFC-02002'}</h3>
                <h2 className="text-center darkGrey_color f24 fw600">{product?.name ? product.name : 'COLOMBIA GESHA ANCESTRO'}</h2>
                <p className="text-center darkGrey_color f16 fw400">{product?.processing ? product.processing : 'мытая ОБРАБОТКА'}</p>

                <div className={`${style.productCard_img} w-100 flex j-center`}>
                    <img src={MockImg} alt="" />
                </div>
                <p className="text-center f16 fw400 darkGrey_color">{product?.compound ? product.compound : 'БЕРГАМОТ - РОЗА - СИРЕНЬ - МАРАКУЙЯ'}</p>

                <div className="productCard_characteristics flex j-between">
                    <Characteristic />
                    <Characteristic />
                    <Characteristic />
                </div>

                <div className={style.productCard_selects + " flex j-between"}>
                    <CustomSelect options={weightOptions} defaultValue={defaultWeight} additionalText={'gr'} />
                    <CustomSelect options={grindingOptions} defaultValue={defaultGrinding} />
                    <Counter count={cartCount} setCount={setCartCount} />
                </div>

                <div className="productCard_foot flex j-between a-center">
                    <span>{product?.price ? product.price : 20} ₼</span>
                    <button className={style.addToCart + " flex g8 a-center border8 f20 fw400 white"}>
                        {Bag}
                        <span>Buy</span>
                    </button>
                </div>
            </div>
        </div>
    )
}

export default ProductCard