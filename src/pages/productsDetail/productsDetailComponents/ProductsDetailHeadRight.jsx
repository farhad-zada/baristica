import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { Favorited, Feedback, Star } from '../../../icons'
import CoffeeDetails from './coffee/CoffeeDetails'
import AccesoriesDetails from './accesories/AccesoriesDetails'
import MachineDetails from './machine/MachineDetails'
import FavoritesService from '../../../services/favorites.service'
import Loading from '../../../components/loading/Loading'
import Error from '../../../components/error/Error'
import style from '../productDetailComponentsCss/productsDetailHeadRight.module.css'
import { useNavigate } from 'react-router-dom'

export default function ProductsDetailHeadRight({ product }) {
    const { token, lang } = useSelector(state => state.baristica)

    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(false)

    const favoriteService = new FavoritesService()
    const navigate = useNavigate()

    const addFavorite = async (id) => {
        setLoading(true)
        try {
            const response = await favoriteService.addFavorite(token, id)
        } catch (error) {
            setError(true)
        }
        finally {
            setLoading(false)
        }
    }

    const setByType = (type) => {
        switch (type) {
            case 'Coffee':
                return <CoffeeDetails product={product} />
                break;
            case 'Accessory':
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
            <Loading status={loading} />
            <Error status={error} setStatus={setError} />
            <div className="flex g8">
                {
                    token
                        ?
                        <span className={style.favorited} onClick={() => addFavorite(product._id)}>
                            {Favorited}
                        </span>
                        :
                        <></>
                }
                <span className="flex g8  f16 darkGrey_color fw400">
                    {Star}
                    <span>{product?.statistics?.ratings.toFixed(1)}</span>
                </span>
                <span className={style.feedback + " flex g8  f16 darkGrey_color fw400"}>
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
