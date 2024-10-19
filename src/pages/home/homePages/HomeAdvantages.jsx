import React from 'react'
import style from '../homeCss/homeAdvantages.module.css'
import { useSelector } from 'react-redux';

import PagesText from '../../../content/PagesText.json';

import { TruckIcon, PreparingIcon, BeanIcon, TeamIcon } from '../../../icons';

const { home } = PagesText;
const { body } = home;

const HomeAdvantages = () => {
  const { lang } = useSelector((state) => state.baristica);

  const getIcon = (iconName) => {
    switch (iconName) {
      case 'TruckIcon':
        return TruckIcon;
      case 'PreparingIcon':
        return PreparingIcon;
      case 'BeanIcon':
          return BeanIcon;
      case 'TeamIcon':
          return TeamIcon;
      // Add more cases here for other icons
      default:
        return null;
    }
  };
  
  return (
    <div className='homeAdvantages darkGray'>
      <div className='container'>
        <div className={`${style.homeAdvantages_section}`}>
          {body[lang].advantages?.map((advantage) => (
            <div className="advantage">
              <div className={`${style.advantage_head} flex a-center`}>
                {getIcon(advantage.icon)}
                <h4 className='white f24 fw600'>{advantage.title}</h4>
              </div>
              <p className={`${style.advantage_body} grey`}>
                {advantage.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default HomeAdvantages