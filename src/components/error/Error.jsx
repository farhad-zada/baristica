import React, { useRef } from 'react'
import styles from './error.module.css'
import { ErrorIcon } from '../../icons'
import { useSelector } from 'react-redux'

import pageText from '../../content/PagesText.json'

const { error } = pageText

export default function Error({ status, setStatus, message= "" }) {
    const { lang } = useSelector(state => state.baristica)
    const modalRef = useRef(null)

    return (
        <div className={status ? 'modal active' : 'modal'} onClick={(e) => e.stopPropagation()}>
            <div className={styles.errorPopup + " modalContent"} ref={modalRef}>
                <div className="flex j-center">
                    {ErrorIcon}
                </div>
                <h2 className="f24 fw700 text-center">{lang ? error[lang].heading : ''}</h2>
                <p className="f16 fw400 text-center">{message ? message[lang] : error[lang].text }</p>
                <div className="flex j-center">
                    <span className={styles.closeBtn} onClick={() => setStatus(false)}>OK</span>
                </div>
            </div>
        </div>
    )
}
