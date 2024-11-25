
import React from 'react'
import PagesText from '../../../content/PagesText.json';
import { useSelector } from 'react-redux';
import style from "../wholesaleCss/contact.module.css"
import { Link } from 'react-router-dom';

const { wholesale } = PagesText;

const WholesaleContact = () => {
    const { lang } = useSelector((state) => state.baristica);
    return (
      <div className={`${style.contact} flex j-center`}>
          <div className='container'>
            {wholesale[lang]?.contact?.title?.split('\n\n')?.map((paragraph, index) => (<h1 className={`${style.contact_title} f96 fw700`} key={index}>{paragraph}</h1>))}
            <div className={`${style.contact_item} border16 flex j-between a-center`}>
                <h3 className="f32 fw700">{wholesale[lang]?.contact?.label}</h3>
                <Link className={`${style.link} tifanny rounded fw600 f32 black`} to={wholesale[lang]?.contact?.href}>{wholesale[lang]?.contact?.link}</Link>
            </div>
            <hr style={{width: "90%", marginTop: "50px", marginBottom: "0"}}/>
          </div>
      </div>
    )
}

export default WholesaleContact