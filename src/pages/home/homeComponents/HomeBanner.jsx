import React from 'react'
import style from '../homeCss/homeBanner.module.css'
import bannerImage from '../../../assets/img/banner.jpeg'
import { useSelector } from 'react-redux'

import PagesText from '../../../content/PagesText.json';
import { Link } from 'react-router-dom';

// Import your icons here or define them as components
import { Accessories, CoffeeDevice, CoffeeIcon, Present } from '../../../icons';
import Loading from '../../../components/loading/Loading';
// You can import other icons similarly

const { home } = PagesText;
const { head } = home;

const HomeBanner = () => {
  const { lang } = useSelector((state) => state.baristica);

  const bannerStyle = {
    position: 'relative',
    backgroundImage: `url(${bannerImage})`,
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    maxHeight: '684px',
    height: '684px',
    width: '100%',
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
      // Add more cases here for other icons
      default:
        return null;
    }
  };

  return (
    <div className={style.homeBanner + ' flex j-center'} style={bannerStyle}>
      <div className={`${style.homeBanner_dark}`}></div>
      <div className='container h-100'>
        <div className={`${style.homeBanner_section} flex column a-start j-center`}>
          <h1 className='white f96 fw700'>{head[lang].title}</h1>
          <div className={`${style.menu} flex a-center`}>
            {head[lang].links?.map((link) => (
              <Link to={link.link} className={`${style.menu_elem} flex a-center rounded white`} key={link.title}>
                {getIcon(link.icon)} 
                <span className="f32 fw400">{link.title}</span>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default HomeBanner;
