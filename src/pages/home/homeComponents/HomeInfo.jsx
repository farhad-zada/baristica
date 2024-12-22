import React from 'react'
import style from '../homeCss/homeInfo.module.css'
import beansImg from '../../../assets/img/beans.jpeg'
import beansImg2 from '../../../assets/img/beans2.jpeg'
import { useSelector } from 'react-redux';

import PagesText from '../../../content/PagesText.json';

const { home } = PagesText;
const { body } = home;

const HomeInfo = () => {
  const { lang } = useSelector((state) => state.baristica);
  return (
    <div className='homeInfo gray flex j-center'>
      <div className='container'>
        <div className={`${style.homeInfo_section} flex a-end j-between`}>
          <div className={`${style.homeInfo_left} w-100 flex column`}>
            <h1 className='black f64 fw700'>{body[lang].info.title}</h1>
            <div className={`${style.homeInfo_text} f20`}>
              {body[lang].info.description.split('\n\n').map((paragraph, index) => (<p className='robotoFont' style={{marginBottom: "22px"}} key={index}>{paragraph}</p>))} 
            </div>
          </div>
          <div className={`${style.homeInfo_right} w-100 flex column`}>
            <div className={`${style.homeInfo_img} flex`}>
              <img src={beansImg} alt="" className={`${style.img} w-100 h-100`}/>
            </div>
            <div className={`${style.homeInfo_img} flex a-end j-end`} style={{marginRight: "80px"}}>
              <img src={beansImg2} alt="" className={`${style.img} w-100 h-100`}/>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default HomeInfo