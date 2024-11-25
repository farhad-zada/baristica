import React from 'react'
import style from "../wholesaleCss/info.module.css"
import infoBanner from "../../../assets/img/infoBanner.png"
import { useSelector } from 'react-redux';
import PagesText from '../../../content/PagesText.json';
const { wholesale } = PagesText;

const WholesaleInformation = () => {
  const { lang } = useSelector((state) => state.baristica);
  return (
    <div className={style.info} style={{backgroundImage: `url(${infoBanner})`}}>
      <div className={`${style.info_section}`}>
        <div className='flex'>
          <h1 className='white f84'>{wholesale[lang]?.info?.title}</h1>
          <p className='white f28'>{wholesale[lang]?.info?.description}</p>
        </div>
        <div className={`${style.info_grid}`}>
          {wholesale[lang]?.info?.list?.map((elem) => (
            <div className={`${style.info_grid_elem} border16`}>
              <h6 className="f48 f700 white">{elem?.title}</h6>
              <p className='white f28'>{elem?.lable}</p>
            </div>
          ))}
        </div>
      </div>
      <div className={style.cover}></div>
    </div>
  )
}

export default WholesaleInformation