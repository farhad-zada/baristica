
import styles from './failure.module.css'

import pageText from '../../content/PagesText.json'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
const { failure } = pageText
export default function Failure() {
    const { lang } = useSelector(state => state.baristica)
    const navigate = useNavigate()
    return (
        <div className={styles.failure + ' flex j-center'}>

            <div className="container">
                <h2 className="f32 fw700 text-center">{lang ? failure[lang].heading : ''}</h2>
                <p className="f20 fw400 text-center">{lang ? failure[lang].text : ''}</p>
                <div className="flex j-center g10">
                    <span className={styles.button} onClick={() => navigate('/profile')}>{lang ? failure[lang].button : ''}</span>
                </div>
            </div>
        </div>
    )
}
