
import styles from './success.module.css'

import pageText from '../../content/PagesText.json'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { useEffect } from 'react'
import { deleteFromCart, setFinalCartArr } from '../../redux/slice'
const { success } = pageText
export default function Success() {
    const { lang, cart, finalCart } = useSelector(state => state.baristica)

    const navigate = useNavigate()
    const dispatch = useDispatch()

    
    useEffect(() => {
        if(finalCart.length){
            finalCart.map((product) => {
                dispatch(deleteFromCart(product._id))
            })
            dispatch(setFinalCartArr([]))
        }
    }, [finalCart])
    return (
        <div className={styles.success + ' flex j-center'}>

            <div className="container">
                <h2 className="f32 fw700 text-center">{lang ? success[lang].heading : ''}</h2>
                <p className="f20 fw400 text-center">{lang ? success[lang].text : ''}</p>
                <div className="flex j-center">
                    <span className={styles.button} onClick={() => navigate('/')}>{lang ? success[lang].button : ''}</span>
                </div>
            </div>
        </div>
    )
}
