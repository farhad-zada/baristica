
import styles from './notFound.module.css'

import pageText from '../../content/PagesText.json'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
const { notFound } = pageText
export default function NotFound() {
    const { lang } = useSelector(state => state.baristica)

    const navigate = useNavigate()
    return (
        <div className={styles.notFound + ' flex j-center'}>

            <div className="container">
                <h2 className="f200 fw700 text-center darkGrey_color">404</h2>
                <p className="f20 fw400 text-center">{lang ? notFound[lang].text : ''}</p>
                <div className="flex j-center">
                    <span className={styles.button} onClick={() => navigate('/')}>{lang ? notFound[lang].button : ''}</span>
                </div>
            </div>
        </div>
    )
}
