import React from 'react'
import styles from './loading.module.css'
import useBodyScrollLock from '../../hooks/useBodyScrollLock'
export default function Loading({ status }) {
    useBodyScrollLock(status)
    return (
        <div className={status ? styles.loaderActive : styles.loader}>
            <div className={styles.loader_spinner} style={{ left: "50%", width: "70px", height: "70px" }}>
            </div>
        </div>
    )
}
