import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Favorited, Feedback, Star } from '../../../icons'
import CoffeeDetails from './coffee/CoffeeDetails'
import AccesoriesDetails from './accesories/AccesoriesDetails'
import MachineDetails from './machine/MachineDetails'
import FavoritesService from '../../../services/favorites.service'
import Loading from '../../../components/loading/Loading'
import Error from '../../../components/error/Error'
import style from '../productDetailComponentsCss/productsDetailHeadRight.module.css'
import { useNavigate } from 'react-router-dom'
import pageText from '../../../content/PagesText.json'
import { setTabIdx } from '../../../redux/slice'
const { categories } = pageText

export default function ProductsDetailHeadRight({ product }) {
    const { token, lang } = useSelector(state => state.baristica)

    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(false)

    const favoriteService = new FavoritesService()
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const addFavorite = async (id) => {
        if(token){
            setLoading(true)
        try {
            const response = await favoriteService.addFavorite(token, id)
        } catch (error) {
            setError(true)
        }
        finally {
            setLoading(false)
        }
        } else{
            navigate('/login')
        }
    }

    const scrollToElement = (id) => {
        const element = document.getElementById(id);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
    };

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
                <CoffeeDetails product={product} />
                break;
        }
    }
    return (
        <div className='w-100'>
            <Loading status={loading} />
            <Error status={error} setStatus={setError} />
            <div className="flex g8">

                <span className={style.favorited} onClick={() => addFavorite(product._id)}>
                    {Favorited}
                </span>
                <span className={`${style.star} flex g8  f16 darkGrey_color fw400`}>
                    {Star}
                    <span>{product?.statistics?.ratings.toFixed(1)}</span>
                </span>
                <span className={style.feedback + " flex g8  f16 darkGrey_color fw400"} onClick={() => {
                    dispatch(setTabIdx(2))
                    scrollToElement('stats')
                }}>
                    {Feedback}
                    <span>{product?.feedbacks?.length ? product.feedbacks.length : 0}</span>
                </span>
            </div>

            <div className="flex j-between mt36">
                <span className="f16 darkGrey_color fw400 robotoFont">{product?.category ? categories[lang][product.category] : ''}</span>
                <span className="f16 darkGrey_color fw400 robotoFont">{product?.code ? product.code : 'E10001'}</span>
            </div>

            <h2 className="darkGrey_color fw600 f36">{product?.name ? product.name[lang] || product.name['az'] : 'BLEND NIGHTHAWK'}</h2>
            <p className="darkGrey_color f20 fw400 mt24 robotoFont">{product?.description ? product.description[lang] || product.name['az'] : 'Это изысканный эспрессо-бленд, состоящий на 60% из кофе из Бразилии и на 40% из Коста-Рики. Каждая чашка дарит богатый, насыщенный вкус, идеальный как для утреннего пробуждения, так и для вечернего наслаждения.'}</p>
            {
                setByType(product?.productType ? product.productType : 'Machine')
            }
        </div>
    )
}
