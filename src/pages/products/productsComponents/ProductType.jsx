import React from 'react';
import { useSelector } from 'react-redux';

import style from '../productsCss/productType.module.css';

export default function ProductType({ type, width, isActive, onClick }) {
    const { lang } = useSelector((state) => state.baristica);

    return (
        <div
            className={`${style.productType} ${isActive ? style.active : ''} flex column g12`}
            style={{ width: width }}
            onClick={onClick}
        >
            <div className={`flex j-center ${style.iconWrapper}`}>
                <img
                    src={type?.icon}
                    alt=""
                    className={`${style.icon} ${isActive ? style.activeIcon : ''}`}
                />
            </div>
            <h2 className={`f16 fw400 text-center ${isActive ? style.activeText : ''}`}>
                {type?.text[lang]}
            </h2>
        </div>
    );
}
