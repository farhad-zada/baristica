import React from 'react'
import { useSelector } from 'react-redux';

import style from '../productsCss/productType.module.css'
import SvgIcon from '../../../components/svgIcon/SvgIcon';
export default function ProductType({ type, width }) {
    const { lang } = useSelector((state) => state.baristica);

    return (
        <div className={`${style.productType} flex column g12`} style={{ width: width }}>
            <div className="flex j-center">
                {
                    <img src={type?.icon} alt="" />   
                }
            </div>
            <h2 className='f16 fw400 text-center'>{type?.text[lang]}</h2>
        </div>
    )
}
