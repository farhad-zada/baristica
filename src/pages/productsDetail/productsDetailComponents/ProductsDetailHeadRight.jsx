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
            case 'coffee':
                return <CoffeeDetails product={product} />
                break;
            case 'accesories':
               return <AccesoriesDetails product={product} />
                break;
                case 'machine':
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
                    <span>10.0</span>
                </span>
                <span className="flex g8  f16 darkGrey_color fw400">
                    {Feedback}
                    <span>{product?.feedbacks?.length ? product.feedbacks.length : 0}</span>
                </span>
            </div>

            <div className="flex j-between mt36">
                <span className="f14 darkGrey_color fw400">{product?.type ? product.type : 'Espresso'}</span>
                <span className="f14 darkGrey_color fw400">{product?.model ? product.model : 'E10001'}</span>
            </div>

            <h2 className="darkGrey_color fw600 f36">{product?.name ? product.name : 'BLEND NIGHTHAWK'}</h2>
            <p className="darkGrey_color f20 fw400 mt24">{product?.description ? product.description : 'Это изысканный эспрессо-бленд, состоящий на 60% из кофе из Бразилии и на 40% из Коста-Рики. Каждая чашка дарит богатый, насыщенный вкус, идеальный как для утреннего пробуждения, так и для вечернего наслаждения.'}</p>
            {
                setByType(product?.type ? product.type : 'accesories')
            }
        </div>
    )
}
