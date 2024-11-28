import React from 'react'
import { useSelector } from 'react-redux'
import { Favorited, Feedback, Star } from '../../../icons'
import CoffeeDetails from './coffee/CoffeeDetails'
import AccesoriesDetails from './accesories/AccesoriesDetails'
import MachineDetails from './machine/MachineDetails'

export default function ProductsDetailHeadRight({ product }) {
    const { token, lang } = useSelector(state => state.baristica)
    const setByType = (type) => {
        switch (type) {
            case 'Coffee':
                return <CoffeeDetails product={product} />
                break;
            case 'Accesory':
                return <AccesoriesDetails product={product} />
                break;
            case 'Machine':
                return <MachineDetails product={product} />
                break;
            default:
                <MachineDetails product={product} />
                break;
        }
    }
    return (
        <div>
            <div className="flex g8">
                {
                    token
                        ?
                        <span>
                            {Favorited}
                        </span>
                        :
                        <></>
                }
                <span className="flex g8  f16 darkGrey_color fw400">
                    {Star}
                    <span>{product?.statistics?.ratings.toFixed(1)}</span>
                </span>
                <span className="flex g8  f16 darkGrey_color fw400">
                    {Feedback}
                    <span>{product?.feedbacks?.length ? product.feedbacks.length : 0}</span>
                </span>
            </div>

            <div className="flex j-between mt36">
                <span className="f14 darkGrey_color fw400">{product?.category ? product.category : 'Espresso'}</span>
                <span className="f14 darkGrey_color fw400">{product?.code ? product.code : 'E10001'}</span>
            </div>

            <h2 className="darkGrey_color fw600 f36">{product?.name ? product.name[lang] || product.name['az'] : 'BLEND NIGHTHAWK'}</h2>
            <p className="darkGrey_color f20 fw400 mt24">{product?.description ? product.description[lang] || product.name['az'] : 'Это изысканный эспрессо-бленд, состоящий на 60% из кофе из Бразилии и на 40% из Коста-Рики. Каждая чашка дарит богатый, насыщенный вкус, идеальный как для утреннего пробуждения, так и для вечернего наслаждения.'}</p>
            {
                setByType(product?.productType ? product.productType : 'Machine')
            }
        </div>
    )
}
