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
        <div className={`${style.info_section_text} flex`}>
          <div>
            {wholesale[lang]?.info?.title?.split('\n\n')?.map((paragraph, index) => (<h1 className={`${style.title} white f84`} key={index}>{paragraph}</h1>))}
          </div>
          {/* <h1 className='white f84'>{wholesale[lang]?.info?.title}</h1> */}
          <div style={{paddingLeft: "30px"}} className={style.info_section_description}>
            {wholesale[lang]?.info?.description?.split('\n\n')?.map((paragraph, index) => (<p className='white f28' key={index}>{paragraph}</p>))}
          </div>
        </div>
        <div className={`${style.info_grid}`}>
          {wholesale[lang]?.info?.list?.map((elem, index) => (
            <div className={`grid-item ${index === 2 ? `grid-item-full ${style.info_grid_elem} border16` :  `${style.info_grid_elem} border16`}`}>
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