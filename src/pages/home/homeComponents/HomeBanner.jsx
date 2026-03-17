import React from 'react'
import style from '../homeCss/homeBanner.module.css'
import bannerImage from '../../../assets/img/banner.jpg'
import { useSelector } from 'react-redux'

import BanerText from "../../../content/BanerText.json";

const HomeBanner = () => {
  const { lang } = useSelector((state) => state.baristica);
  const bigAttentionPart = BanerText.bigAttentionPart;

  return (
    <div
      className={`${style.homeBanner} flex j-center a-center`}
      style={{ backgroundImage: `url(${bannerImage})` }}
      id="homestore"
    >
      <div className={style.homeBanner_dark} aria-hidden="true"></div>
      <div className={`container ${style.homeBanner_container}`}>
        <div className={style.homeBanner_section}>
          <h1 className={style.homeBanner_h1}>
            {bigAttentionPart[lang]?.map((part, index) => (
              part.weight === 'strong'
                ? <strong key={index}>{part.value}</strong>
                : <span key={index}>{part.value}</span>
            ))}
          </h1>
          <p className={style.homeBanner_h2}>
            {BanerText.secondary[lang]}
          </p>
          <div className={`${style.menu} flex a-center`}></div>
        </div>
      </div>
    </div>
  );
}

export default HomeBanner;
