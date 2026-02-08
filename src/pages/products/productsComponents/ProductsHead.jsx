import React from 'react'
import { useSelector } from 'react-redux';
import styles from '../productsCss/productsHead.module.css'

import pageText from '../../../content/PagesText.json'
import { Phone } from '../../../icons';
import { openWhatsApp } from '../../../utils/openWhatsApp';
const {productsPage} = pageText
export default function ProductsHead({heading}) {
  const { lang } = useSelector((state) => state.baristica);

  return (
    <div className='flex j-between a-center'>
        <div className="left flex column g12">
            <h2 className='f36 fw700 text-upperCase'>{heading}</h2>
            <h3 className='f16 fw400 darkGrey_color robotoFont'>{lang ? productsPage[lang].subHeading : ''}</h3>
        </div>
        <div className={`${styles.right} flex a-center g12 pointer`} onClick={openWhatsApp}>
            {Phone}
            <div>
                <h2 className='f16 fw600 darkGrey_color'>{lang ? productsPage[lang].contactHeading : ''}</h2>
                <h3 className='f12 fw400 darkGrey_color robotoFont'>{lang ? productsPage[lang].contactSubHeading : ''}</h3>
            </div>
        </div>
    </div>
  )
}
