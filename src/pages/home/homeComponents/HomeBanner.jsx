import React from 'react'
import style from '../homeCss/homeBanner.module.css'
import bannerImage from '../../../assets/img/banner.jpg'
import { useSelector } from 'react-redux'

import PagesText from '../../../content/PagesText.json';
import BanerText from "../../../content/BanerText.json";

// Import your icons here or define them as components
import { Accessories, CoffeeDevice, CoffeeIcon, Present, Prize } from '../../../icons';
// You can import other icons similarly


const HomeBanner = () => {
  const { lang } = useSelector((state) => state.baristica);
  const bigAttentionPart = BanerText.bigAttentionPart;

  const bannerStyle = {
    position: 'relative',
    backgroundImage: `url(${bannerImage})`,
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    maxHeight: '684px',
    height: '684px',
    width: '100%',
    fontFamily: 'Oswald, sans-serif',
    fontSize: '12px',
    zIndex: 1,  // Ensure the content is above the overlay
  };

  // This function returns the icon based on the icon name provided in the JSON
  const getIcon = (iconName) => {
    switch (iconName) {
      case 'CoffeeIcon':
        return CoffeeIcon;
      case 'Accessories':
        return Accessories;
      case 'CoffeeDevice':
        return CoffeeDevice;
      case 'Present':
        return Present;
      case 'Prize':
        return Prize;
      default:
        return null;
    }
  };

  return (
    <div className={style.homeBanner + ' flex j-center'} style={bannerStyle} id="homestore">
      <div className={`${style.homeBanner_dark}`}></div>
      <div className={style.homeBanner_container + ' flex j-center a-center'}>
        <div className={`${style.homeBanner_section} flex column a-start j-center`}>
          <h1 className={style.homeBanner_h1}>
            {bigAttentionPart[lang]?.map((part, index) => (
              part.weight === 'strong'
                ? <strong key={index}>{part.value}</strong>
                : <span key={index}>{part.value}</span>
            ))}
          </h1>
          <h2 className={style.homeBanner_h2}>
            {BanerText.secondary[lang]}
          </h2>
          <div className={`${style.menu} flex a-center`}>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HomeBanner;
