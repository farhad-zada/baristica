import React, { useRef } from 'react'
import styles from './success.module.css'
import { SuccessIcon } from '../../icons'
import { useSelector } from 'react-redux'

import pageText from '../../content/PagesText.json'
import { useNavigate } from 'react-router-dom'

const { successPopup } = pageText

export default function Success({ status, setStatus, navigateTo }) {
    const { lang } = useSelector(state => state.baristica)
    const modalRef = useRef(null)

    const navigate = useNavigate()

    return (
        <div className={status ? 'modal active' : 'modal'} onClick={(e) => e.stopPropagation()}>
            <div className={styles.errorPopup + " modalContent"} ref={modalRef}>
                <div className="flex j-center">
                    {SuccessIcon}
                </div>
                <h2 className="f24 fw700 text-center">{lang ? successPopup[lang].heading : ''}</h2>
                <p className="f16 fw400 text-center">{lang ? successPopup[lang].text : ''}</p>
                <div className="flex j-center">
                    <span className={styles.closeBtn} onClick={() => {
                        setStatus(false)
                        if(navigateTo !== 'no'){
                        navigate('/')
                        }
                    }}>OK</span>
                </div>
            </div>
        </div>
    )
}
