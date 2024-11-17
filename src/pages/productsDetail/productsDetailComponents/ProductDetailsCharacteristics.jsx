import React, { useEffect, useState } from 'react'
import styles from '../productDetailComponentsCss/productsDetailCharacteristics.module.css'
import { useSelector } from 'react-redux';

export default function ProductDetailsCharacteristics({ product }) {
    const { lang } = useSelector((state) => state.baristica);
    const [chars, setChars] = useState([
        {
            name: { ru: 'Профиль:' },
            value: { ru: 'Тёмный шоколад - мёд - слива - специи' }
        },
        {
            name: { ru: 'Профиль:' },
            value: { ru: 'Тёмный шоколад' }
        },
        {
            name: { ru: 'Профиль:' },
            value: { ru: 'Тёмный шоколад - мёд - слива - специи' }
        },
        {
            name: { ru: 'Профиль:' },
            value: { ru: 'Тёмный шоколад - мёд - слива - специи' }
        },
        {
            name: { ru: 'Профиль:' },
            value: { ru: 'Тёмный шоколад - мёд - слива - специи' }
        },
        {
            name: { ru: 'Профиль:' },
            value: { ru: 'Тёмный шоколад - мёд - слива - специи' }
        },
    ])
    return (
        <div className={styles.productDetails_characteristics + ' flex column a-center'}>
            {
                chars.length && chars.map((char, key) => (
                    <div className={styles.characteristic + ' flex j-between w-100'} key={key}>
                        <span className='w-48 f24 fw700 darkGrey_color'>{lang ? char.name[lang] : ''}</span>
                        <span className='w-48 flex j-start f24 fw400 darkGrey_color'>{lang ? char.value[lang] : ''}</span>
                    </div>
                ))
            }
        </div>
    )
}
