import React from 'react'
import PagesText from '../../../content/PagesText.json';
import { useSelector } from 'react-redux';
import style from "../wholesaleCss/offer.module.css"
import { Link } from 'react-router-dom';

const { wholesale } = PagesText;

const WholesaleOffer = () => {
    const { lang } = useSelector((state) => state.baristica);
    return (
      <div className={`${style.offer} flex j-center`}>
          <div className='container'>
            {wholesale[lang]?.offer?.title?.split('\n\n')?.map((paragraph, index) => (<h1 className={`${style.offer_title} f64`} key={index}>{paragraph}</h1>))}
            <div className={`${style.offer_item} border16 flex j-between a-center`}>
                <h3 className="f32 fw700">{wholesale[lang]?.offer?.label}</h3>
                <Link className={`${style.link} tifanny rounded fw600 f32 black`} to={wholesale[lang]?.offer?.href}>{wholesale[lang]?.offer?.link}</Link>
            </div>
          </div>
      </div>
    )
}

export default WholesaleOffer