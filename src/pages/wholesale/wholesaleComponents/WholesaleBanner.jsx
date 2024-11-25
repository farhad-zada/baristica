import React from 'react';
import bannerImage from '../../../assets/img/bannerWholesale.jpeg';
import PagesText from '../../../content/PagesText.json';
import { useSelector } from 'react-redux';
import style from '../wholesaleCss/banner.module.css';

const { wholesale } = PagesText;

const WholesaleBanner = () => {
  const { lang } = useSelector((state) => state.baristica);
  return (
    <div
      className={`${style.banner} flex j-center`}
      style={{ backgroundImage: `url(${bannerImage})` }}
    >
      <div className="container">
        <div className={`${style.banner_title} white`}>
          {wholesale[lang].banner.split('\n\n').map((paragraph, index) => (<p className='f96 fw700 white' key={index}>{paragraph}</p>))} 
        </div>
        <div className={style.cover}></div>
      </div>
    </div>
  );
};

export default WholesaleBanner;
