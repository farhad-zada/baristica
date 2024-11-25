import React from 'react';
import bannerImage from '../../../assets/img/bannerWholesale.jpeg';
import style from '../wholesaleCss/banner.module.css';

const WholesaleBanner = () => {
  return (
    <div
      className={`${style.banner} flex j-center`}
      style={{ backgroundImage: `url(${bannerImage})` }}
    >
      <div className="container">
        <h1 className={`${style.banner_title} white f96`}>
          МЫ - ОБЖАРЩИКИ КОФЕ ДЛЯ БИЗНЕСА И ДОМА
        </h1>
        <div className={style.cover}></div>
      </div>
    </div>
  );
};

export default WholesaleBanner;
