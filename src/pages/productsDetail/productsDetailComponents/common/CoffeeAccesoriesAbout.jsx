import React, { useEffect, useState } from 'react'
import styles from './CoffeeAccesoriesAbout.module.css'
import { useSelector } from "react-redux"

export default function CoffeeAccesoriesAbout({product}) {
    const { lang } = useSelector(state => state.baristica)
    const [about, setAbout] = useState({})

    useEffect(() => {
        if(JSON.stringify(product) !== '{}' && lang !=='en'){
            setAbout(product.about[lang])
        }
    },[product])
    return (
        <div className={styles.detailSection}>
            <h2 className='f20 fw400 darkGrey_color robotoFont'>{about.preface}</h2>

            <div className={styles.detail}>
                {
                    about?.body?.length && about?.body?.map((section) => (
                        <div className="section">
                            <h3 className='f24 fw700 darkGrey_color'>{section?.header}</h3>
                            <p className='darkGrey_color f20 fw400'>{section?.paragraph}</p>
                        </div>
                    ))
                }
            </div>
        </div>
    )
}
