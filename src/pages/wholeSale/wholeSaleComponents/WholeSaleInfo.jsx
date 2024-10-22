import React from 'react'
import { useSelector } from 'react-redux';
import style from "../wholeSaleCss/info.module.css"

import PagesText from '../../../content/PagesText.json';

const { wholesale } = PagesText;

const WholeSaleInfo = () => {
  const { lang } = useSelector((state) => state.baristica);
  return (
    <div className={`${style.wholeSaleInfo}`}>
        <div className='container'>
            <div className={`${style.wholeSaleInfo_section}`}>
                <h1 className='f96 fw400'>BARISTICA <span className='tifanny_color fw700'>COFFEE SHOP</span></h1>
                {wholesale[lang].info.split('\n\n').map((paragraph, index) => (<p className='f32 fw400 black' style={{marginBottom: "22px"}} key={index}>{paragraph}</p>))} 
            </div>
        </div>
    </div>
  )
}

export default WholeSaleInfo